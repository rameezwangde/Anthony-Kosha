import { useState } from 'react';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import HotelSelector from './components/HotelSelector';
import RoomGrid from './components/RoomGrid';
import PaymentPanel from './components/PaymentPanel';
import GuestForm from './components/GuestForm';
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
    setSelectedRoom(null); // Reset selected room when hotel changes
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
    <>
      <TopBar />
      <Hero />
      <main className="main-container">
        <IntroSection />
        <HotelSelector activeKey={activeKey} onSelect={handleHotelSelect} />
        <RoomGrid
          activeKey={activeKey}
          hotelName={currentHotelName}
          selectedRoom={selectedRoom}
          onSelectRoom={handleRoomSelect}
          onViewPhoto={handleOpenPhotoModal}
        />
        <PaymentPanel selectedRoom={selectedRoom} hotelName={currentHotelName} />
        <GuestForm selectedRoom={selectedRoom} hotelName={currentHotelName} />
      </main>
      <Footer />

      <PhotoModal
        isOpen={modalState.isOpen}
        image={modalState.image}
        title={modalState.title}
        caption={modalState.caption}
        onClose={handleClosePhotoModal}
      />
    </>
  );
}

export default App;
