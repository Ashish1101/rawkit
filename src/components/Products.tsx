import React, { useEffect, useState } from 'react';
import { 
  Construction, 
  Blocks,
  Waves, 
  Mountain, 
  Building,
  LucideIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];

const iconMap: Record<string, LucideIcon> = {
  Construction,
  Blocks,
  Waves,
  Mountain,
  Building
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <section id="products" className="py-20 bg-sb-darker relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sb-dark to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = iconMap[product.icon] || Construction;
              return (
                <div
                  key={product.id}
                  className="card group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-sb-green p-2 rounded-full">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    <button className="text-sb-green hover:text-sb-green/90 font-semibold inline-flex items-center space-x-2 group">
                      <span>Learn More</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;