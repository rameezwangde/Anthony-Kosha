import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ activeHotelName, selectedRoom }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`luxury-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-monogram">A &amp; K</span>
          <span className="brand-divider">|</span>
          <span className="brand-tag">Dubai 2026</span>
        </div>

        <nav className="nav-links">
          <button type="button" onClick={() => scrollToSection('hotels')}>The Hotels</button>
          <button type="button" onClick={() => scrollToSection('rooms')}>Rooms &amp; Suites</button>
          <button type="button" onClick={() => scrollToSection('portal')}>Reservation Portal</button>
        </nav>

        <div className="nav-right">
          {selectedRoom ? (
            <div className="nav-status-pill">
              <span className="dot pulse"></span>
              <span className="pill-text">{selectedRoom.name.split('·')[0]}</span>
            </div>
          ) : (
            <div className="nav-status-pill inactive">
              <span className="pill-text">{activeHotelName.split(' ')[0]} Active</span>
            </div>
          )}
          <button className="nav-cta-btn" type="button" onClick={() => scrollToSection('portal')}>
            Reserve Stay
          </button>
        </div>
      </div>
    </header>
  );
}
