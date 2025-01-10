import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="py-20 bg-sb-dark">
        <div className="text-center text-gray-400">Loading testimonials...</div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-sb-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sb-darker/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sb-green/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-sb-green/20 text-sb-green text-sm font-medium">
            Client Testimonials
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon background */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sb-green/10">
            <Quote className="w-24 h-24" />
          </div>

          {/* Testimonial card */}
          <div className="relative bg-sb-lighter rounded-lg border border-gray-800 p-8 md:p-12">
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex flex-col items-center">
                <img
                  src={currentTestimonial.image_url}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full border-4 border-sb-green/20 mb-6"
                />
                <blockquote className="text-xl md:text-2xl text-gray-300 text-center mb-8 italic">
                  "{currentTestimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-400">
                    {currentTestimonial.role}
                  </div>
                  <div className="text-sb-green">
                    {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-sb-green w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;