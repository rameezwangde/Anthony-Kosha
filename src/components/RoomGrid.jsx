import { useState } from 'react';
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
  const [filterCategory, setFilterCategory] = useState('All');
  const rooms = roomData[activeKey] || [];

  const filteredRooms = filterCategory === 'All'
    ? rooms
    : rooms.filter((r) => r.category === filterCategory);

  return (
    <section className="room-grid-section" id="rooms">
      <div className="grid-container">
        <div className="grid-header">
          <div>
            <span className="section-label">Step 2 · Room Selection</span>
            <h2 className="section-title">Explore {hotelName.split(' ')[0]} Rooms</h2>
          </div>

          {/* Filter Pills */}
          <div className="category-filter-bar">
            {['All', 'Deluxe', 'Suite'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'All' ? 'All Room Categories' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="editorial-rooms-grid">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isSelected={selectedRoom?.value === room.value}
              onSelect={() => onSelectRoom(room)}
              onViewPhoto={() => onViewPhoto(room)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
