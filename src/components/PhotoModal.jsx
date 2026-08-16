import { useEffect } from 'react';
import './PhotoModal.css';

export default function PhotoModal({ isOpen, image, title, caption, onClose }) {
  // Lock body scroll when modal is open
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

  // Handle escape key press
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
      className="modal show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal')) onClose();
      }}
    >
      <div className="modal-card animate-in">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img src={image} alt={title} />
        <div className="modal-caption">{caption}</div>
      </div>
    </div>
  );
}
