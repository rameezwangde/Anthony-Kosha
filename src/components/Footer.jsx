import './Footer.css';

export default function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="footer-gold-divider" />

      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Monogram */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrap">
              <img src="/logo.png" alt="Anthony & Kosha Crest" className="footer-logo-img" />
            </div>
            <div className="footer-tagline">Four Days to Forever</div>
            <p className="footer-copy">
              We look forward to hosting you for an unforgettable celebration of love, laughter, and lifelong memories in Dubai.
            </p>
          </div>

          {/* Col 2: Accommodations */}
          <div className="footer-col">
            <h4 className="footer-heading">Official Accommodations</h4>
            <ul className="footer-list">
              <li>
                <strong>Hilton Dubai Al Habtoor City</strong>
                <span>Al Habtoor City, Business Bay, Dubai</span>
              </li>
              <li>
                <strong>V Hotel Dubai, Curio Collection</strong>
                <span>Al Habtoor City, Business Bay, Dubai</span>
              </li>
              <li>
                <strong>Habtoor Palace Dubai, LXR Hotels</strong>
                <span>Al Habtoor City, Business Bay, Dubai</span>
              </li>
              <li>
                <strong>Swissôtel Al Murooj Dubai</strong>
                <span>Downtown Dubai</span>
              </li>
              <li>
                <strong>Holiday Inn Express Dubai - Safa Park</strong>
                <span>Safa Park, Dubai</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Key Dates */}
          <div className="footer-col">
            <h4 className="footer-heading">Event Details</h4>
            <ul className="footer-list">
              <li>
                <strong>Dates:</strong> 24 – 27 November 2026
              </li>
              <li>
                <strong>Location:</strong> Dubai, United Arab Emirates
              </li>
              <li>
                <strong>Guest Rate Lock:</strong> Active &amp; Exclusive
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-list">
              <li>
                <strong>Christina</strong>
                <span>Transport Coordinator</span>
              </li>
              <li>
                <a href="tel:+971501785852" className="footer-contact-link">📞 +971 50 178 5852</a>
              </li>
              <li>
                <a href="mailto:christina@three60events.com" className="footer-contact-link">✉️ christina@three60events.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-symbol">◆</div>
          <p>© 2026 Anthony &amp; Kosha Wedding Celebration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
