import './Hero.css';

export default function Hero() {
  const scrollToHotels = () => {
    document.getElementById('booking-flow-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cinematic-hero">
      {/* Background Image Overlay */}
      <div className="hero-bg-overlay" />

      <div className="hero-content-wrapper">
        {/* A&K Crest Logo */}
        <div className="hero-crest-wrap">
          <img src="/logo.png" alt="Anthony & Kosha Crest" className="hero-crest-logo" />
        </div>

        {/* Sub-tagline */}
        <div className="hero-subtag">OFFICIAL WEDDING STAY · DUBAI 2026</div>

        {/* Main Serif Title */}
        <h1 className="hero-title">Anthony &amp; Kosha</h1>

        {/* Ornamental Divider */}
        <div className="hero-ornament-divider">
          <span className="divider-line" />
          <span className="divider-diamond">◆</span>
          <span className="divider-line" />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle">Your stay for a celebration to remember.</p>

        {/* Date & Location Pill */}
        <div className="hero-date-location">
          24 — 27 NOVEMBER 2026 · DUBAI
        </div>

        {/* Burgundy CTA Button */}
        <button type="button" className="hero-explore-btn" onClick={scrollToHotels}>
          EXPLORE YOUR STAY <span className="arrow-down">↓</span>
        </button>
      </div>
    </section>
  );
}
