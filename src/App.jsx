import { useState } from 'react';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import HotelSection from './components/HotelSection';
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

  // Calculate current progress step (1=Hotel, 2=Room, 3=Form, 4=Payment)
  const currentStep = selectedRoom ? 3 : 1;

  return (
    <div className="app-root">
      {/* 1. Cinematic Luxury Hero */}
      <Hero />

      {/* 2. Four-Stage Booking Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* 3. Hotel Selection Section */}
      <HotelSection activeKey={activeKey} onSelect={handleHotelSelect} />

      {/* 4. Room Grid Section (2x2 Horizontal Cards) */}
      <RoomGrid
        activeKey={activeKey}
        selectedRoom={selectedRoom}
        onSelectRoom={handleRoomSelect}
        onViewPhoto={handleOpenPhotoModal}
      />

      {/* 5. Reservation Form & Deep Burgundy Booking Summary Card */}
      <ReservationPortal selectedRoom={selectedRoom} hotelName={currentHotelName} />

      {/* 6. Footer */}
      <Footer />

      {/* Lightbox Photo Modal */}
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
