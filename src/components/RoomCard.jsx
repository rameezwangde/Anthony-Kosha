import './RoomCard.css';

export default function RoomCard({ room, isSelected, onSelect, onViewPhoto }) {
  // Determine guest icon text
  let guestIconText = '2 Guests';
  const guestTag = room.tags?.find(t => t.toLowerCase().includes('guest') || t.toLowerCase().includes('occupancy'));
  if (guestTag) {
    if (guestTag.toLowerCase().includes('single') || guestTag.includes('1 Guest')) guestIconText = '1 Guest';
    else if (guestTag.toLowerCase().includes('double') || guestTag.includes('2 Guests')) guestIconText = '2 Guests';
    else {
      const numMatch = guestTag.match(/\d+/);
      if (numMatch) guestIconText = `${numMatch[0]} Guests`;
    }
  } else if (room.name.toLowerCase().includes('single')) {
    guestIconText = '1 Guest';
  }

  const isSingle = room.value.toLowerCase().includes('single');
  const bedText = room.tags?.find(t => t.toLowerCase().includes('bed')) || (isSingle ? 'King Bed' : 'Twin Beds');

  return (
    <div
      className={`ref-horizontal-room-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {/* Left Image Column (approx 38-42% width) */}
      <div className="ref-room-img-col">
        <img src={room.img} alt={room.name} className="ref-room-img" />
      </div>

      {/* Right Info Column */}
      <div className="ref-room-info-col">
        {/* Top Right Circular Selection Indicator */}
        <div className={`ref-room-circle-check ${isSelected ? 'selected' : ''}`}>
          {isSelected && <span>✓</span>}
        </div>

        <div className="ref-room-category">{room.category} ROOM</div>
        <h4 className="ref-room-name">{room.name}</h4>

        {/* Price Display */}
        <div className="ref-room-price-display">
          <span className="price-main">{room.priceDisplay}</span>
          {room.feeNote && <span className="price-sub"> {room.feeNote}</span>}
        </div>

        {/* Person & Bed Icons Row */}
        <div className="ref-room-meta-row">
          <span className="meta-item">👤 {guestIconText}</span>
          <span className="meta-item">🛏 {bedText}</span>
        </div>

        <p className="ref-room-desc">{room.desc}</p>

        {/* View Gallery Link */}
        <button
          type="button"
          className="ref-view-gallery-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewPhoto();
          }}
        >
          View Gallery →
        </button>
      </div>
    </div>
  );
}
