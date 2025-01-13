import React, { useEffect, useState, useRef } from 'react';
import { 
  Construction, 
  Blocks,
  Waves, 
  Mountain, 
  Building,
  X,
  ExternalLink,
  LucideIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type SubProduct = Database['public']['Tables']['sub_products']['Row'];

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
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

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
      fetchSubProducts(selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchSubProducts = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('sub_products')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setSubProducts(data || []);
    } catch (error) {
      console.error('Error fetching sub-products:', error);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
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

      {/* Sub-products Modal */}
      {showModal && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={handleModalClick}
        >
          <div 
            ref={modalRef}
            className="bg-sb-lighter rounded-lg border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-hidden relative animate-modal-slide-up"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedProduct.title} Products
                  </h3>
                  <p className="text-gray-400">{selectedProduct.description}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {subProducts.map((subProduct, index) => (
                  <div 
                    key={subProduct.id}
                    className="bg-sb-darker rounded-lg border border-gray-800 overflow-hidden hover:border-sb-green/50 transition-all duration-300 hover:scale-[1.02] group animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={subProduct.image_url}
                        alt={subProduct.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sb-darker to-transparent opacity-60" />
                      <div className="absolute bottom-2 left-2">
                        <div className="text-xs font-medium text-sb-green bg-sb-darker/80 px-2 py-1 rounded-full">
                          {subProduct.brand}
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-white group-hover:text-sb-green transition-colors line-clamp-1">
                        {subProduct.name}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {subProduct.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-sb-green hover:text-sb-green/80 transition-colors text-xs font-medium mt-2"
                      >
                        Learn more
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;