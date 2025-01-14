import React, { useEffect, useState, useRef } from 'react';
import { 
  Construction, 
  Blocks,
  Waves, 
  Mountain, 
  Building,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Check,
  Package,
  Truck,
  Clock,
  Shield,
  Phone
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type SubProduct = Database['public']['Tables']['sub_products']['Row'];
type ProductDetails = Database['public']['Tables']['product_details']['Row'];
type ProductImage = Database['public']['Tables']['product_images']['Row'];

const iconMap: Record<string, LucideIcon> = {
  Construction,
  Blocks,
  Waves,
  Mountain,
  Building
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    // Add intersection observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (productsRef.current) {
      const cards = productsRef.current.querySelectorAll('.card');
      cards.forEach((card) => {
        card.classList.add('opacity-0');
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchProductData(selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchProductData = async (productId: string) => {
    try {
      // Fetch sub-products
      const { data: subProductsData, error: subProductsError } = await supabase
        .from('sub_products')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: true });

      if (subProductsError) throw subProductsError;
      setSubProducts(subProductsData || []);

      // Fetch product details
      const { data: detailsData, error: detailsError } = await supabase
        .from('product_details')
        .select('*')
        .eq('product_id', productId)
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') throw detailsError;
      setProductDetails(detailsData);

      // Fetch product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });

      if (imagesError) throw imagesError;
      setProductImages(imagesData || []);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setProductDetails(null);
    setProductImages([]);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % (productImages.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (productImages.length - 1 || 0) : prev - 1
    );
  };

  return (
    <section id="products" className="py-20 bg-sb-darker relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sb-dark to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 stagger-children">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-sb-green/20 text-sb-green text-sm font-medium">
            Our Products
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Quality Materials for Every Need
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            From foundation to finishing, we provide all the materials you need
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : (
          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = iconMap[product.icon] || Construction;
              return (
                <div
                  key={product.id}
                  className="card group cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-sb-green p-2 rounded-full animate-float">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sb-green transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-400">{product.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Product Details Modal */}
      {showModal && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={handleModalClick}
        >
          <div 
            ref={modalRef}
            className="bg-sb-lighter rounded-lg border border-gray-800 w-full max-h-[90vh] overflow-y-auto relative animate-modal-slide-up max-w-6xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Images and Basic Info */}
              <div className="relative">
                {/* Carousel Section */}
                <div className="relative h-64 md:h-96">
                  <img
                    src={productImages[currentImageIndex]?.image_url || selectedProduct.image_url}
                    alt={productImages[currentImageIndex]?.alt_text || selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {productImages.length > 1 && (
                    <>
                      {/* Carousel Navigation */}
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Carousel Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {productImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'bg-sb-green w-8' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="bg-sb-darker p-4 rounded-lg border border-gray-800">
                    <Clock className="h-5 w-5 text-sb-green mb-2" />
                    <h5 className="text-white font-medium">Delivery Time</h5>
                    <p className="text-gray-400 text-sm">
                      {productDetails?.delivery_info.delivery_time || '24-48 hours'}
                    </p>
                  </div>
                  <div className="bg-sb-darker p-4 rounded-lg border border-gray-800">
                    <Package className="h-5 w-5 text-sb-green mb-2" />
                    <h5 className="text-white font-medium">Min. Order</h5>
                    <p className="text-gray-400 text-sm">
                      {productDetails?.delivery_info.minimum_order || '10 tons'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="p-6 border-l border-gray-800">
                {/* Close Button */}
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-sb-darker text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Product Title and Description */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-gray-300">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Technical Specifications */}
                {productDetails?.technical_specs && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-sb-green mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(productDetails.technical_specs)
                        .filter(([key]) => key !== 'features')
                        .map(([key, value]) => (
                          <div key={key} className="bg-sb-darker p-3 rounded-lg">
                            <div className="text-sm text-gray-400">
                              {key.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </div>
                            <div className="text-white font-medium">{value as string}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Available Sizes */}
                {productDetails?.available_sizes && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-sb-green mb-4">Available Sizes</h4>
                    <div className="flex flex-wrap gap-3">
                      {productDetails.available_sizes.map((size) => (
                        <div key={size} className="px-4 py-2 rounded-lg bg-sb-darker border border-gray-800 text-white">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {productDetails?.certifications && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-sb-green mb-4 flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {productDetails.certifications.map((cert) => (
                        <div key={cert} className="flex items-center px-3 py-1 rounded-full bg-green-900/20 text-green-400 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Information */}
                {productDetails?.delivery_info && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-sb-green mb-4 flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Delivery Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-sb-darker p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Coverage</div>
                        <div className="text-white font-medium">
                          {productDetails.delivery_info.coverage}
                        </div>
                      </div>
                      <div className="bg-sb-darker p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Transport Modes</div>
                        <div className="text-white font-medium">
                          {(productDetails.delivery_info.transport_modes as string[]).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Button */}
                <button className="w-full bg-sb-green hover:bg-sb-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact for Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;