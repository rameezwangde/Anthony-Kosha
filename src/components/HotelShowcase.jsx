import { hotelInfo } from '../data/roomData';
import './HotelShowcase.css';

export default function HotelShowcase({ activeKey, onSelect }) {
  return (
    <section className="hotel-showcase-section" id="hotels">
      <div className="showcase-container">
        <div className="section-header">
          <span className="section-label">Step 1 · Accommodations</span>
          <h2 className="section-title">Select Your Preferred Hotel</h2>
          <p className="section-subtitle">
            We have secured exclusive wedding rate blocks at two premier properties in Al Habtoor City, Dubai.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="hotel-tab-bar">
          {Object.values(hotelInfo).map((hotel) => {
            const isSelected = activeKey === hotel.key;
            return (
              <button
                key={hotel.key}
                className={`hotel-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelect(hotel.key)}
                type="button"
              >
                <span className="tab-category">{hotel.categoryTag}</span>
                <span className="tab-name">{hotel.shortName}</span>
                {isSelected && <span className="tab-check">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Featured Property Showcase Card Grid */}
        <div className="showcase-grid">
          {Object.values(hotelInfo).map((hotel) => {
            const isSelected = activeKey === hotel.key;
            return (
              <div
                key={hotel.key}
                className={`hotel-feature-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelect(hotel.key)}
              >
                <div className={`hotel-card-banner banner-${hotel.key}`}>
                  <div className="banner-badge">{hotel.categoryTag}</div>
                  <h3 className="hotel-card-title">{hotel.shortName}</h3>
                  <div className="hotel-card-tagline">{hotel.tagline}</div>
                </div>

                <div className="hotel-card-content">
                  <h4 className="hotel-full-name">{hotel.name}</h4>
                  <p className="hotel-desc">{hotel.desc}</p>

                  <div className="hotel-perks-list">
                    {hotel.perks.map((perk, i) => (
                      <span key={i} className="perk-chip">
                        <span className="perk-icon">✦</span> {perk}
                      </span>
                    ))}
                  </div>

                  <div className="hotel-card-footer">
                    <button
                      className={`select-hotel-btn ${isSelected ? 'active' : ''}`}
                      type="button"
                    >
                      {isSelected ? '✓ Currently Selected' : 'Select This Hotel →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
