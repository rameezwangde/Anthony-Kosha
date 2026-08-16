import { hotelInfo } from '../data/roomData';
import './HotelSection.css';

export default function HotelSection({ activeKey, onSelect }) {
  const hiltonImg = "https://www.hilton.com/im/en/DXBAHHI/22071978/dxbah-room-bedroom.jpg?ch=2992&cw=5000&gravity=NorthWest&impolicy=crop&rh=700&rw=1100&xposition=0&yposition=171";
  const vhotelImg = "https://www.hilton.com/im/en/DXBVHQQ/20266740/king-deluxe-room-room-view.jpg?ch=2992&cw=5000&gravity=NorthWest&impolicy=crop&rh=700&rw=1100&xposition=0&yposition=171";
  const habtoorImg = "https://www.hilton.com/im/en/DXBAHHI/22449022/dxbah-grand-canal-suite-bedroom-view.jpg?ch=2992&cw=5000&gravity=NorthWest&impolicy=crop&rh=700&rw=1100&xposition=0&yposition=171";

  const getHotelImg = (key) => {
    if (key === 'vhotel') return vhotelImg;
    if (key === 'habtoorpalace') return habtoorImg;
    return hiltonImg;
  };

  const selectedHotel = hotelInfo[activeKey];

  return (
    <section className="hotel-section" id="hotels-section">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="hotel-centered-header">
          <span className="section-tag">01 · YOUR WEDDING HOTEL</span>
          <h2 className="section-heading-large">Choose Your Stay</h2>
          <p className="section-subtext centered">
            Three exceptional Dubai hotels, selected for Anthony &amp; Kosha's wedding celebration.
          </p>
        </div>

        {/* 3 Column Grid Layout on Desktop */}
        <div className="hotel-cards-3col-grid">
          {Object.values(hotelInfo).map((hotel) => {
            const isSelected = activeKey === hotel.key;
            return (
              <div
                key={hotel.key}
                className={`ref-hotel-card-v2 ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelect(hotel.key)}
              >
                <div className="card-image-box">
                  <img src={getHotelImg(hotel.key)} alt={hotel.name} className="ref-hotel-card-bg" />
                  <div className="ref-hotel-card-gradient" />

                  {/* Top Right Badge */}
                  <div className={`ref-hotel-pill ${isSelected ? 'selected' : ''}`}>
                    {isSelected ? '✓ SELECTED' : 'SELECT'}
                  </div>

                  {/* Property Tag */}
                  <div className="card-category-tag">{hotel.categoryTag}</div>
                </div>

                <div className="ref-hotel-card-body-v2">
                  <h3 className="ref-hotel-name-v2">{hotel.shortName}</h3>
                  <div className="ref-hotel-fullname">{hotel.name}</div>
                  <div className="ref-hotel-tagline-v2">{hotel.tagline}</div>

                  {/* Perks row */}
                  <div className="hotel-perks-row">
                    {hotel.perks?.slice(0, 2).map((perk, idx) => (
                      <span key={idx} className="hotel-perk-badge">✦ {perk}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`select-hotel-action-btn ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected ? '✓ Currently Selected' : `Select ${hotel.shortName}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hotel Confirmation Notification Banner */}
        {selectedHotel && (
          <div className="selected-hotel-confirmation-banner animate-in">
            <div className="confirmation-left">
              <span className="confirmation-icon">✨</span>
              <div>
                <span className="confirmation-tag">ACTIVE SELECTION</span>
                <h4 className="confirmation-title">{selectedHotel.name}</h4>
              </div>
            </div>
            <div className="confirmation-right">
              <span className="confirmation-status-pill">✓ Hotel Locked</span>
              <a
                href="#rooms-section"
                className="scroll-to-rooms-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Rooms Below ↓
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
