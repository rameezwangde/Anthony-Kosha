import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HotelShowcase from './components/HotelShowcase';
import RoomGrid from './components/RoomGrid';
import ReservationPortal from './components/ReservationPortal';
import PhotoModal from './components/PhotoModal';
import Footer from './components/Footer';
import { hotelInfo } from './data/roomData';
import './App.css';

function App() {
  const [activeKey, setActiveKey] = useState('hilton');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    image: '',
    title: '',
    caption: '',
  });

  const handleHotelSelect = (key) => {
    setActiveKey(key);
    setSelectedRoom(null); // Reset selected room when hotel switches
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleOpenPhotoModal = (room) => {
    setModalState({
      isOpen: true,
      image: room.img,
      title: room.name,
      caption: `${room.name} · ${hotelInfo[activeKey].name}`,
    });
  };

  const handleClosePhotoModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const currentHotelName = hotelInfo[activeKey].name;

  return (
    <div className="app-root">
      <Navbar activeHotelName={currentHotelName} selectedRoom={selectedRoom} />
      <Hero />
      <main className="main-content">
        <HotelShowcase activeKey={activeKey} onSelect={handleHotelSelect} />
        <RoomGrid
          activeKey={activeKey}
          hotelName={currentHotelName}
          selectedRoom={selectedRoom}
          onSelectRoom={handleRoomSelect}
          onViewPhoto={handleOpenPhotoModal}
        />
        <ReservationPortal selectedRoom={selectedRoom} hotelName={currentHotelName} />
      </main>
      <Footer />

      <PhotoModal
        isOpen={modalState.isOpen}
        image={modalState.image}
        title={modalState.title}
        caption={modalState.caption}
        onClose={handleClosePhotoModal}
      />
    </div>
  );
}

export default App;
