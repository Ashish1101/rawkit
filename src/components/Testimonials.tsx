import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,207,142,0.1),transparent_70%)]" />
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

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 rounded-full bg-sb-lighter/80 backdrop-blur border border-gray-800 text-gray-400 hover:text-white hover:border-sb-green/50 transition-all hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 rounded-full bg-sb-lighter/80 backdrop-blur border border-gray-800 text-gray-400 hover:text-white hover:border-sb-green/50 transition-all hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonial cards */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12">
              <Quote className="w-20 h-20 text-sb-green/10" />
            </div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-sb-lighter via-sb-lighter to-sb-darker rounded-2xl border border-gray-800 p-8 md:p-12 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-sb-green/20 rounded-full blur-2xl transition-all group-hover:blur-3xl" />
                  <div className="relative w-28 h-28 rounded-full border-4 border-sb-green/20 overflow-hidden transition-transform group-hover:scale-105">
                    <img
                      src={currentTestimonial.image_url}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                <StarRating rating={currentTestimonial.rating} />

                <blockquote className="text-xl md:text-2xl text-gray-300 my-8 max-w-3xl">
                  {currentTestimonial.quote}
                </blockquote>

                <div className="flex flex-col items-center">
                  <div className="font-semibold text-white text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-400">
                    {currentTestimonial.role}
                  </div>
                  <div className="text-sb-green mt-1">
                    {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`group relative h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-12 bg-sb-green' : 'w-2 bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div className={`
                    absolute inset-0 bg-sb-green rounded-full blur-md opacity-50
                    transition-opacity duration-300
                    ${index === currentIndex ? 'opacity-50' : 'opacity-0 group-hover:opacity-25'}
                  `} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;