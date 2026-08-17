import React from 'react';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  const handleMailClick = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Inquiry: Anthony & Kosha Wedding");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:christina@three60events.com?subject=${subject}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=christina@three60events.com&su=${subject}`, '_blank');
    }
  };

  return (
    <div className="floating-contact-group">
      {/* Mail Button */}
      <a 
        href="#"
        onClick={handleMailClick}
        className="contact-float mail-float" 
        aria-label="Email us"
      >
        <span className="contact-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M20,4H4C2.9,4 2,4.9 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V6C22,4.9 21.1,4 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z" />
          </svg>
        </span>
      </a>

      {/* Call Button */}
      <a 
        href="tel:+971501785852" 
        className="contact-float call-float" 
        aria-label="Call us"
      >
        <span className="contact-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
          </svg>
        </span>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/971501785852" 
        className="contact-float whatsapp-float" 
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
    </div>
  );
}
