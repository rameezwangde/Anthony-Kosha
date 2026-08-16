import { useEffect } from 'react';
import './PhotoModal.css';

export default function PhotoModal({ isOpen, image, title, caption, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="luxury-modal-backdrop"
      onClick={(e) => {
        if (e.target.classList.contains('luxury-modal-backdrop')) onClose();
      }}
    >
      <div className="luxury-modal-card animate-in">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-image-container">
          <img src={image} alt={title} />
        </div>
        <div className="modal-footer-meta">
          <span className="modal-caption-text">{caption}</span>
          <span className="modal-tag">Official Room Photo</span>
        </div>
      </div>
    </div>
  );
}
