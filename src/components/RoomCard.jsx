import { useState } from 'react';
import './RoomCard.css';

export default function RoomCard({ room, isSelected, onSelect, onViewPhoto }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      className={`luxury-room-card ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        if (e.target.closest('.photo-quick-view-btn')) return;
        onSelect();
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      {/* Photo Container */}
      <div className="room-photo-box">
        {!imgLoaded && <div className="photo-skeleton" />}
        <img
          src={room.img}
          alt={room.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        <div className="photo-overlay-gradient" />

        {/* Category Pill */}
        <span className="room-category-pill">{room.category}</span>

        {/* Price Tag Overlay */}
        <div className="photo-price-badge">
          <span className="badge-rate">{room.priceDisplay}</span>
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          className="photo-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewPhoto();
          }}
          title="View High-Res Photo"
        >
          🔍 View Photo
        </button>

        {/* Selection Indicator Badge */}
        {isSelected && (
          <div className="room-selected-badge">
            <span>✓ Selected</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="room-card-details">
        <div className="room-title-price-row">
          <h4 className="room-title">{room.name}</h4>
          <div className="room-price-block">
            <span className="price-tag-large">{room.priceDisplay}</span>
            <span className="price-fee-note">{room.feeNote}</span>
          </div>
        </div>

        <p className="room-desc">{room.desc}</p>

        {/* Feature Tags */}
        <div className="room-tags-row">
          {room.tags?.map((tag, i) => (
            <span key={i} className="room-tag-pill">{tag}</span>
          ))}
        </div>

        {/* Select Action */}
        <div className="room-card-action">
          <button
            type="button"
            className={`room-select-btn ${isSelected ? 'active' : ''}`}
          >
            {isSelected ? '✓ Selected for Booking' : 'Select Room Category'}
          </button>
        </div>
      </div>
    </article>
  );
}
