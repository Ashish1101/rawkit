import React, { useEffect, useRef } from 'react';
import { Hexagon, Triangle } from 'lucide-react';

const LogoExport = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This code will help visualize the logo for screenshot
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = '#1C1C1C';
      containerRef.current.style.padding = '20px';
      containerRef.current.style.display = 'inline-block';
    }
  }, []);

  return (
    <div ref={containerRef}>
      <div className="relative flex items-center">
        {/* Logo mark */}
        <div className="relative">
          <Hexagon 
            className="w-32 h-32 text-[#6F3AFF]" 
            strokeWidth={1.5}
          />
          <Triangle 
            className="w-16 h-16 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            strokeWidth={2.5}
            fill="currentColor"
          />
        </div>
        
        {/* Logo text */}
        <div className="ml-8">
          <div className="flex items-baseline">
            <h1 className="text-6xl font-bold text-white tracking-tight">
              Rawkit
            </h1>
            <div className="w-3 h-3 bg-[#6F3AFF] rounded-full ml-2 mb-2" />
          </div>
          <div className="flex items-center">
            <div className="h-1 w-12 bg-gradient-to-r from-[#6F3AFF] to-transparent mr-4" />
            <p className="text-xl text-gray-400 uppercase tracking-widest font-medium">
              Materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoExport;