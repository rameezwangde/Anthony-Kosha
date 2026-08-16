import RoomCard from './RoomCard';
import { roomData } from '../data/roomData';
import './RoomGrid.css';

export default function RoomGrid({
  activeKey,
  hotelName,
  selectedRoom,
  onSelectRoom,
  onViewPhoto,
}) {
  const rooms = roomData[activeKey] || [];

  return (
    <section className="room-section" id="rooms-section">
      <div className="site-container">
        {/* Section Header with Active Hotel Name */}
        <div className="room-section-header">
          <span className="section-tag">02 · SELECT YOUR ROOM · {hotelName?.toUpperCase()}</span>
          <h2 className="section-heading-large">Find Your Stay at {hotelName}</h2>
          <p className="section-subtext">
            Thoughtfully selected rooms and suites for Anthony &amp; Kosha's wedding celebration at {hotelName}.
          </p>
        </div>

        {/* 2 Column x 2 Row Grid */}
        <div className="ref-rooms-grid">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isSelected={selectedRoom?.value === room.value}
              onSelect={() => onSelectRoom(room)}
              onViewPhoto={() => onViewPhoto(room)}
            />
          ))}
        </div>

        {/* VIEW MORE ROOMS Outlined Button */}
        <div className="view-more-rooms-wrap">
          <button type="button" className="view-more-rooms-btn">
            VIEW MORE ROOMS AT {hotelName?.toUpperCase().split(' ')[0]}
          </button>
        </div>
      </div>
    </section>
  );
}
