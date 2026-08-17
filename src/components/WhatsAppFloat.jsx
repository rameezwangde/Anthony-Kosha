import React from 'react';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  return (
    <a 
      href="https://wa.me/971501785852" 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="whatsapp-icon" 
      />
    </a>
  );
}
