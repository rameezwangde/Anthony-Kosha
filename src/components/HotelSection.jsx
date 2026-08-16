import { hotelInfo } from '../data/roomData';
import './HotelSection.css';

export default function HotelSection({ activeKey, onSelect }) {
  const hiltonImg = "https://www.valueaddedtravel.com/assets/components/phpthumbof/cache/exterior.baad4e193154fe2018b6b5b828f3f075.jpg";
  const vhotelImg = "https://media-cdn.holidaycheck.com/w_1280,h_720,c_fit,q_auto,f_auto/ugc/images/83c4fa4e-570e-48be-9eb7-ecf52ffa5219";
  const habtoorImg = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/15/28/77/hotel-exterior.jpg?w=700&h=-1&s=1";

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
