import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type WhatsAppClick = Database['public']['Tables']['whatsapp_clicks']['Insert'];

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  };

  const handleClick = async () => {
    try {
      const clickData: WhatsAppClick = {
        device_type: getDeviceType(),
        user_agent: navigator.userAgent
      };

      // Get location if available
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              enableHighAccuracy: true
            });
          });
          
          clickData.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (error) {
          console.log('Location access denied or error occurred');
        }
      }

      // Record the click
      await supabase.from('whatsapp_clicks').insert(clickData);
    } catch (error) {
      console.error('Error recording WhatsApp click:', error);
    }
  };

  return (
    <a
      href="https://wa.me/919220436229?text=Hi%20Rawkit,%20I%20want%20to%20inquire%20about%20building%20materials!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`
        flex items-center gap-2 bg-green-500 hover:bg-green-600 
        text-white font-semibold py-3 px-4 rounded-full 
        shadow-lg transition-all duration-300 ease-in-out
        hover:shadow-green-500/20 hover:shadow-xl
        ${isHovered ? 'pr-6 scale-105' : 'pr-4'}
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