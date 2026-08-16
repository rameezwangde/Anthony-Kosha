import './Hero.css';

export default function Hero() {
  const scrollToHotels = () => {
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortal = () => {
    document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="luxury-hero">
      <div className="hero-radial-glow" />
      <div className="hero-radial-glow-secondary" />

      <div className="hero-container">
        {/* Left Column: Editorial Headlines & Metadata */}
        <div className="hero-left animate-in">
          <div className="gold-badge">
            <span className="badge-sparkle">✨</span>
            Official Wedding Celebration Stay
          </div>

          <h1 className="hero-main-title">
            Anthony <span className="title-ampersand">&amp;</span> Kosha
          </h1>

          <div className="hero-script-tag">
            Invite you to celebrate their union in Dubai
          </div>

          <p className="hero-description">
            We are delighted to welcome you to our official wedding hotel hub. Browse our handpicked luxury properties, select your room preference, and reserve your stay seamlessly.
          </p>

          {/* Quick Metadata Cards */}
          <div className="hero-meta-grid">
            <div className="meta-card">
              <span className="meta-icon">📍</span>
              <div>
                <span className="meta-label">Location</span>
                <strong className="meta-val">Al Habtoor City, Dubai</strong>
              </div>
            </div>

            <div className="meta-card">
              <span className="meta-icon">📅</span>
              <div>
                <span className="meta-label">Wedding Dates</span>
                <strong className="meta-val">24 – 27 November 2026</strong>
              </div>
            </div>

            <div className="meta-card">
              <span className="meta-icon">🏨</span>
              <div>
                <span className="meta-label">Official Hotels</span>
                <strong className="meta-val">Hilton, V Hotel &amp; Habtoor Palace</strong>
              </div>
            </div>
          </div>

          {/* CTA Group */}
          <div className="hero-actions">
            <button type="button" className="hero-primary-btn" onClick={scrollToHotels}>
              Explore Accommodations <span className="arrow-down">↓</span>
            </button>
            <button type="button" className="hero-secondary-btn" onClick={scrollToPortal}>
              Guest Concierge
            </button>
          </div>
        </div>

        {/* Right Column: Floating Gold-Framed Crest Showcase Card */}
        <div className="hero-right animate-in animate-in-delay-2">
          <div className="gold-crest-frame">
            <div className="frame-corner corner-tl" />
            <div className="frame-corner corner-tr" />
            <div className="frame-corner corner-bl" />
            <div className="frame-corner corner-br" />

            <div className="crest-image-wrapper">
              <img src="/logo.png" alt="Anthony & Kosha Wedding Crest" className="crest-logo-img" />
            </div>

            <div className="crest-card-footer">
              <span className="rate-status-dot" />
              <span className="rate-status-text">Official Guest Rate Lock Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
