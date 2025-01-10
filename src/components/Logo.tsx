import React from 'react';
import { Hexagon, Triangle } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative flex items-center group">
      {/* Logo mark */}
      <div className="relative">
        {/* Background hexagon */}
        <Hexagon 
          className="w-10 h-10 text-sb-green transform transition-transform group-hover:rotate-12 duration-300" 
          strokeWidth={1.5}
        />
        {/* Foreground triangle */}
        <Triangle 
          className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-transform group-hover:scale-110 duration-300" 
          strokeWidth={2.5}
          fill="currentColor"
        />
      </div>
      
      {/* Logo text */}
      <div className="ml-3">
        <div className="flex items-baseline">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Rawkit
          </h1>
          <div className="w-1.5 h-1.5 bg-sb-green rounded-full ml-1 mb-1 animate-pulse" />
        </div>
        <div className="flex items-center">
          <div className="h-0.5 w-4 bg-gradient-to-r from-sb-green to-transparent mr-2" />
          <p className="text-[0.65rem] text-gray-400 uppercase tracking-widest font-medium">
            Materials
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logo;