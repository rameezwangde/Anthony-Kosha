import HotelCard from './HotelCard';
import { hotelInfo } from '../data/roomData';
import './HotelSelector.css';

export default function HotelSelector({ activeKey, onSelect }) {
  return (
    <section className="section animate-in">
      <div className="label">Step 1</div>
      <h2 className="title">Choose your hotel.</h2>
      <div className="hotel-grid">
        {Object.values(hotelInfo).map((hotel) => (
          <HotelCard
            key={hotel.key}
            hotel={hotel}
            isSelected={activeKey === hotel.key}
            onSelect={() => onSelect(hotel.key)}
          />
        ))}
      </div>
    </section>
  );
}
