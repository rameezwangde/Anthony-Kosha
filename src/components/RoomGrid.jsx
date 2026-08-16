import { useState, useEffect } from 'react';
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
  const [showAllRooms, setShowAllRooms] = useState(false);

  // Reset showAllRooms when changing hotels
  useEffect(() => {
    setShowAllRooms(false);
  }, [activeKey]);

  const allRooms = roomData[activeKey] || [];
  const visibleRooms = showAllRooms ? allRooms : allRooms.slice(0, 2);
  const hasMoreRooms = allRooms.length > 2;

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

        {/* Room Grid */}
        <div className="ref-rooms-grid">
          {visibleRooms.map((room) => (
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
        {hasMoreRooms && !showAllRooms && (
          <div className="view-more-rooms-wrap">
            <button 
              type="button" 
              className="view-more-rooms-btn"
              onClick={() => setShowAllRooms(true)}
            >
              VIEW MORE ROOMS AT {hotelName?.toUpperCase().split(' ')[0]}
            </button>
          </div>
        )}

        {/* Disclaimer Section */}
        <div className="room-disclaimer-wrap" style={{ marginTop: '2rem', textAlign: 'center', maxWidth: '800px', margin: '3rem auto 0', padding: '1rem', borderTop: '1px solid rgba(201, 154, 69, 0.2)' }}>
          <p style={{ fontSize: '0.85rem', color: '#4A4A4A', opacity: 0.85, lineHeight: '1.6' }}>
            <strong style={{ color: '#76052D' }}>Disclaimer:</strong> The Tourism Dirham Fee of AED 20 per night, per bedroom is applicable when booking guest rooms &amp; suites and will be collected during your stay at the property and is not reflected in the room rate. This hotel offers a bespoke Family Experience.
          </p>
        </div>
      </div>
    </section>
  );
}
