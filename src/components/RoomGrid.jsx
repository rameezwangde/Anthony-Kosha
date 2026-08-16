import RoomCard from './RoomCard';
import { roomData } from '../data/roomData';
import './RoomGrid.css';

export default function RoomGrid({
  activeKey,
  selectedRoom,
  onSelectRoom,
  onViewPhoto,
}) {
  const rooms = roomData[activeKey] || [];

  return (
    <section className="room-section" id="rooms-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="room-section-header">
          <span className="section-tag">02 · SELECT YOUR ROOM</span>
          <h2 className="section-heading-large">Find Your Perfect Stay</h2>
          <p className="section-subtext">
            Thoughtfully selected rooms and suites for the celebration.
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
            VIEW MORE ROOMS
          </button>
        </div>
      </div>
    </section>
  );
}
