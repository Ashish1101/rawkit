import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/919220436229?text=Hi%20Rawkit,%20I%20want%20to%20inquire%20about%20building%20materials!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        flex items-center gap-2 bg-green-500 hover:bg-green-600 
        text-white font-semibold py-3 px-4 rounded-full 
        shadow-lg transition-all duration-300 ease-in-out
        ${isHovered ? 'pr-6' : 'pr-4'}
      `}>
        <MessageCircle className={`h-6 w-6 ${isHovered ? 'scale-110' : ''} transition-transform duration-300`} />
        <span className={`
          whitespace-nowrap overflow-hidden transition-all duration-300
          ${isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
        `}>
          Chat with us
        </span>
      </div>
    </a>
  );
};

export default WhatsAppButton;