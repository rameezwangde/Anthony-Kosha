import './HotelCard.css';

export default function HotelCard({ hotel, isSelected, onSelect }) {
  return (
    <article
      className={`hotel-card ${isSelected ? 'selected' : ''}`}
      data-key={hotel.key}
      onClick={onSelect}
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
      <div className="hotel-card-art">
        <strong className="hotel-card-name">{hotel.shortName}</strong>
        <small className="hotel-card-tagline">{hotel.tagline}</small>
      </div>
      <div className="hotel-card-status">
        {isSelected ? 'Selected' : 'Select'}
      </div>
      <div className="hotel-card-info">
        <h3>{hotel.name}</h3>
        <p>{hotel.desc}</p>
      </div>
    </article>
  );
}
