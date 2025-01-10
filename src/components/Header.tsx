import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveButton(sectionId);
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
              className={`transition-colors ${
                activeButton === 'hero' 
                  ? 'text-sb-green' 
                  : 'text-gray-300 hover:text-sb-green'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('footer')} 
              className={`transition-colors ${
                activeButton === 'footer' 
                  ? 'text-sb-green' 
                  : 'text-gray-300 hover:text-sb-green'
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('footer')} 
              className={`transition-colors ${
                activeButton === 'footer-contact' 
                  ? 'text-sb-green' 
                  : 'text-gray-300 hover:text-sb-green'
              }`}
            >
              Contact Us
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className={`${
                activeButton === 'products' 
                  ? 'bg-sb-green text-white' 
                  : 'bg-sb-purple hover:bg-sb-green text-white'
              } px-4 py-2 rounded-md transition-colors`}
            >
              Products
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-sb-green transition-colors"
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
                className={`w-full text-left transition-colors py-2 ${
                  activeButton === 'hero' 
                    ? 'text-sb-green' 
                    : 'text-gray-300 hover:text-sb-green'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('footer')} 
                className={`w-full text-left transition-colors py-2 ${
                  activeButton === 'footer' 
                    ? 'text-sb-green' 
                    : 'text-gray-300 hover:text-sb-green'
                }`}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('footer')} 
                className={`w-full text-left transition-colors py-2 ${
                  activeButton === 'footer-contact' 
                    ? 'text-sb-green' 
                    : 'text-gray-300 hover:text-sb-green'
                }`}
              >
                Contact Us
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className={`w-full transition-colors px-4 py-2 rounded-md ${
                  activeButton === 'products' 
                    ? 'bg-sb-green text-white' 
                    : 'bg-sb-purple hover:bg-sb-green text-white'
                }`}
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