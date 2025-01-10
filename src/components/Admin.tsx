import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Insert'];
type Testimonial = Database['public']['Tables']['testimonials']['Insert'];

const Admin = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'products' | 'testimonials'>('products');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = JSON.parse(jsonInput);
      const { error } = await supabase
        .from(type)
        .insert(Array.isArray(data) ? data : [data]);

      if (error) throw error;

      setMessage('Data added successfully!');
      setJsonInput('');
    } catch (error) {
      console.error('Error:', error);
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const sampleData = {
    products: {
      title: "Steel",
      description: "High-grade steel for strong foundations and structural integrity.",
      image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1684",
      icon: "Construction"
    },
    testimonials: {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "BuildTech Construction",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      quote: "Rawkit has transformed how we source materials. Their reliability and speed have become invaluable to our projects."
    }
  };

  return (
    <div className="min-h-screen bg-sb-dark py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>
        
        <div className="bg-sb-lighter p-6 rounded-lg border border-gray-800">
          <div className="mb-6">
            <label className="block text-white mb-2">Select Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'products' | 'testimonials')}
              className="w-full bg-sb-dark text-white border border-gray-800 rounded-md p-2"
            >
              <option value="products">Products</option>
              <option value="testimonials">Testimonials</option>
            </select>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white mb-2">JSON Data</label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-64 bg-sb-dark text-white border border-gray-800 rounded-md p-4 font-mono"
                placeholder={`// Paste your JSON here\n${JSON.stringify(sampleData[type], null, 2)}`}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-sb-green hover:bg-sb-green/90 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Add Data
              </button>
              
              <button
                type="button"
                onClick={() => setJsonInput(JSON.stringify(sampleData[type], null, 2))}
                className="text-sb-green hover:text-sb-green/90 font-semibold transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-md ${
              message.includes('Error') ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;