import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer id="footer" className="bg-sb-darker border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {/* About Us */}
          <div className="max-w-sm">
            <Logo />
            <p className="text-gray-400 mb-6 mt-6">
              We're revolutionizing the construction materials industry with 
              reliable products and lightning-fast delivery. Our commitment 
              to quality and service sets us apart.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:mx-auto lg:w-64">
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Email</p>
                <a href="mailto:contact@rawkit.com" 
                  className="text-white hover:text-sb-purple transition-colors">
                  contact@rawkit.com
                </a>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <a href="tel:+1234567890" 
                  className="text-white hover:text-sb-purple transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p className="text-white">
                  123 Construction Avenue<br />
                  Building District, BL 12345<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-auto lg:w-64">
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                Products
              </a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#careers" className="text-gray-400 hover:text-white transition-colors">
                Careers
              </a>
              <a href="#blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Rawkit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;