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
    <section className="section">
      <div className="room-head">
        <div>
          <div className="label">Step 2</div>
          <h2 className="title" style={{ marginBottom: 0 }}>
            View &amp; select your room.
          </h2>
        </div>
        <div className="selected-hotel-label">{hotelName}</div>
      </div>
      <div className="rooms-grid">
        {rooms.map((room, i) => (
          <RoomCard
            key={`${activeKey}-${i}`}
            room={room}
            index={i}
            isSelected={selectedRoom?.value === room.value}
            onSelect={() => onSelectRoom(room)}
            onViewPhoto={() => onViewPhoto(room)}
          />
        ))}
      </div>
    </section>
  );
}
