import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <header className="bg-sb-darker border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Right section - Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('footer')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('footer')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact Us
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="bg-sb-purple hover:bg-sb-purple/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              Products
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className="absolute right-0 top-0 h-full w-64 bg-sb-darker border-l border-gray-800 shadow-xl">
          <div className="flex flex-col p-6">
            <div className="space-y-6">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="w-full text-left text-gray-300 hover:text-white transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('footer')} 
                className="w-full text-left text-gray-300 hover:text-white transition-colors py-2"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('footer')} 
                className="w-full text-left text-gray-300 hover:text-white transition-colors py-2"
              >
                Contact Us
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className="w-full bg-sb-purple hover:bg-sb-purple/90 text-white px-4 py-2 rounded-md transition-colors"
              >
                Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;