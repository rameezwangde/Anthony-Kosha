import { useState } from 'react';
import './RoomCard.css';

export default function RoomCard({ room, index, isSelected, onSelect, onViewPhoto }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      className={`room-card ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        if (e.target.closest('.room-view-btn')) return;
        onSelect();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="room-card-photo">
        {!imgLoaded && <div className="room-card-skeleton" />}
        <img
          src={room.img}
          alt={room.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
      </div>
      <div className="room-card-dot">
        {isSelected && <span>✓</span>}
      </div>
      <div className="room-card-body">
        <div className="room-card-num">
          {String(index + 1).padStart(2, '0')} · Room Type
        </div>
        <h4>{room.name}</h4>
        <p>{room.desc}</p>
        <button
          type="button"
          className="room-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewPhoto();
          }}
        >
          View room photo
        </button>
      </div>
    </article>
  );
}
