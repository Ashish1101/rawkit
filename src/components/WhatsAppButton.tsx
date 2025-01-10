import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type WhatsAppClick = Database['public']['Tables']['whatsapp_clicks']['Insert'];

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const redirectToWhatsApp = () => {
    window.open(
      "https://wa.me/919220436229?text=Hi%20Rawkit,%20I%20want%20to%20inquire%20about%20building%20materials!",
      '_blank'
    );
  };

  const handleLocationAndRedirect = async () => {
    setIsLoading(true);
    const clickData: WhatsAppClick = {
      device_type: getDeviceType(),
      user_agent: navigator.userAgent
    };

    try {
      if (navigator.geolocation) {
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
      }
    } catch (error) {
      console.log('Location access denied or error occurred');
    }

    try {
      await supabase.from('whatsapp_clicks').insert(clickData);
    } catch (error) {
      console.error('Error recording WhatsApp click:', error);
    }

    setIsLoading(false);
    setShowModal(false);
    redirectToWhatsApp();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="#"
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

      {/* Location Permission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-sb-lighter rounded-lg border border-gray-800 p-6 max-w-md w-full relative animate-slide-up">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-semibold text-white mb-4">
              Location Access
            </h3>
            
            <p className="text-gray-300 mb-6">
              To serve you better, we'd like to know your location. This helps us provide more accurate delivery estimates and service options.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleLocationAndRedirect}
                disabled={isLoading}
                className={`
                  flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold 
                  py-2 px-4 rounded-md transition-colors relative
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isLoading ? 'Processing...' : 'Allow & Continue'}
              </button>
              
              <button
                onClick={() => {
                  setShowModal(false);
                  redirectToWhatsApp();
                }}
                disabled={isLoading}
                className="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;