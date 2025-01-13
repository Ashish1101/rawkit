import React, { useState, useEffect } from 'react';

const heroImages = [
  {
    url: "https://dev-uno1.s3.ap-south-1.amazonaws.com/crusher_zone_hero_image.jpg",
    alt: "Crusher zone operations"
  },
  {
    url: "https://dev-uno1.s3.ap-south-1.amazonaws.com/truck_carrying_agg_hero_image.jpg",
    alt: "Truck carrying aggregates"
  },
  {
    url: "https://dev-uno1.s3.ap-south-1.amazonaws.com/mining.avif",
    alt: "Mining operations"
  },
  {
    url: "https://dev-uno1.s3.ap-south-1.amazonaws.com/truck_convoy_hero_image.jpg",
    alt: "Truck convoy"
  }
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    setIsVisible(true);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="hero" className="relative h-screen">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sb-darker via-transparent to-sb-dark z-10" />
      
      {/* Image carousel */}
      {heroImages.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sb-dark/70" />
        </div>
      ))}
      
      {/* Content */}
      <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center max-w-4xl mx-auto stagger-children">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-sb-green/10 text-sb-green/80 text-sm font-medium animate-pulse-glow">
            Building Materials Made Simple
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-text-shimmer">
            Reliable Building Materials,<br />Delivered Fast
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto text-gray-400">
            Quality construction materials for your projects, when you need them
          </p>
        </div>
      </div>
      
      {/* Image navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentImage 
                ? 'bg-sb-green w-8' 
                : 'bg-white/30 hover:bg-white/50'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Modern scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30">
        <div 
          className="relative flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors group cursor-pointer"
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-sb-green to-transparent group-hover:h-12 transition-all duration-300" />
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sb-dark to-transparent z-10" />
    </div>
  );
};

export default Hero;