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

  return (
    <section className="hotel-section" id="hotels-section">
      <div className="site-container">
        <div className="hotel-section-grid">
          {/* Left Column: Introduction */}
          <div className="hotel-intro-col">
            <span className="section-tag">01 · YOUR WEDDING HOTEL</span>
            <h2 className="section-heading-large">Choose Your Stay</h2>
            <p className="section-subtext">
              Selected Dubai hotels, curated for Anthony &amp; Kosha's wedding celebration.
            </p>
          </div>

          {/* Right Column: Hotel Landscape Cards */}
          <div className="hotel-cards-col">
            {Object.values(hotelInfo).map((hotel) => {
              const isSelected = activeKey === hotel.key;
              return (
                <div
                  key={hotel.key}
                  className={`ref-hotel-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelect(hotel.key)}
                >
                  <img src={getHotelImg(hotel.key)} alt={hotel.name} className="ref-hotel-card-bg" />
                  <div className="ref-hotel-card-gradient" />

                  {/* Top Selection Pill */}
                  <div className={`ref-hotel-pill ${isSelected ? 'selected' : ''}`}>
                    {isSelected ? '✓ SELECTED' : 'SELECT'}
                  </div>

                  {/* Bottom Text Content Overlay */}
                  <div className="ref-hotel-card-body">
                    <h3 className="ref-hotel-name">{hotel.name}</h3>
                    <div className="ref-hotel-location">{hotel.location}</div>
                    <div className="ref-hotel-tagline">{hotel.tagline}</div>
                    <div className="ref-hotel-explore">
                      Explore {hotel.shortName} →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
