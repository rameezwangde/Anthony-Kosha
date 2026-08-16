import './Hero.css';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-circle hero-circle-left" />
      <div className="hero-circle hero-circle-right" />
      <div className="hero-content animate-in">
        <div className="hero-logo">
          <img src="/logo.png" alt="Anthony & Kosha — A&K crest" />
        </div>
        <div className="hero-kicker">A New Beginning</div>
        <h1 className="hero-title">
          Anthony <span className="hero-ampersand">&</span> Kosha
        </h1>
        <p className="hero-subtitle">
          Select your wedding hotel, explore the room category and continue directly to its secure payment link.
        </p>
        <div className="hero-date">
          <span className="hero-date-diamond">◆</span>
          Dubai · 24–27 November 2026
          <span className="hero-date-diamond">◆</span>
        </div>
      </div>
    </header>
  );
}
