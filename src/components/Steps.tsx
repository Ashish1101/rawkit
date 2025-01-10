import React from 'react';
import { Search, MessageSquare, Truck } from 'lucide-react';

const steps = [
  {
    title: 'Choose a Product',
    description: 'Browse our wide range of building materials',
    icon: Search
  },
  {
    title: 'Request a Quote',
    description: 'Click on "Chat with Us" or fill in the inquiry form',
    icon: MessageSquare
  },
  {
    title: 'Get it Delivered',
    description: 'Fast delivery, directly to your site',
    icon: Truck
  }
];

const Steps = () => {
  return (
    <section className="py-20 bg-sb-dark relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-sb-green/10 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-sb-green/5 via-sb-green/10 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-sb-green/20 text-sb-green text-sm font-medium">
            Simple Process
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Get your building materials in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="text-center relative group"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-sb-green/20 rounded-full transform rotate-6 group-hover:rotate-12 transition-transform" />
                    <div className="relative bg-sb-green rounded-full p-5 transform group-hover:scale-105 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;