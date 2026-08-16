import { useState, useMemo } from 'react';
import './ReservationPortal.css';

export default function ReservationPortal({ selectedRoom, hotelName }) {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    guestCount: '2 Guests',
    checkIn: '2026-11-24',
    checkOut: '2026-11-27',
    requests: '',
  });

  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState('');

  // Calculate stay duration
  const stayNights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.checkIn, formData.checkOut]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGuestPillClick = (count) => {
    setFormData((prev) => ({ ...prev, guestCount: count }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      alert('Please select a room category first.');
      document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('Please select a check-out date that is after your check-in date.');
      return;
    }

    const summary = `ANTHONY & KOSHA · WEDDING RESERVATION SUMMARY

Hotel: ${hotelName}
Room Category: ${selectedRoom.value}
Guest Name: ${formData.guestName}
Guests: ${formData.guestCount}
Mobile / WhatsApp: ${formData.phone}
Email: ${formData.email}
Check-In: ${formData.checkIn}
Check-Out: ${formData.checkOut} (${stayNights} Nights)
Special Requests: ${formData.requests || 'None'}`;

    setSummaryText(summary);
    setShowSummary(true);
  };

  const hasPaymentUrl = !!selectedRoom?.paymentUrl;

  const handlePaymentClick = (e) => {
    if (!hasPaymentUrl) {
      e.preventDefault();
      alert('The official hotel payment link for this category is pending update by the event organizers.');
    }
  };

  return (
    <section className="portal-section" id="portal">
      <div className="portal-container">
        <div className="section-header">
          <span className="section-label">Step 3 &amp; 4 · Checkout Portal</span>
          <h2 className="section-title">Complete Your Reservation</h2>
          <p className="section-subtitle">
            Review your selected accommodation details and enter guest information to finalize your wedding stay.
          </p>
        </div>

        <div className="portal-split-layout">
          {/* Left Column: Live Booking Summary & Instant Payment Trigger */}
          <div className="portal-card booking-summary-card">
            <div className="card-header">
              <span className="card-tag">Selection Overview</span>
              <h3>Live Stay Summary</h3>
            </div>

            {selectedRoom ? (
              <div className="active-selection-box">
                <div className="selection-img-wrap">
                  <img src={selectedRoom.img} alt={selectedRoom.name} />
                </div>
                <div className="selection-info">
                  <span className="hotel-name-badge">{hotelName}</span>
                  <h4 className="selected-room-name">{selectedRoom.name}</h4>
                  <p className="selected-room-desc">{selectedRoom.desc}</p>
                </div>
              </div>
            ) : (
              <div className="no-selection-placeholder">
                <div className="placeholder-icon">🏨</div>
                <h4>No Room Selected Yet</h4>
                <p>Please choose a room category from the selection grid above to proceed with booking.</p>
                <button
                  type="button"
                  className="placeholder-select-btn"
                  onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Choose Room ↑
                </button>
              </div>
            )}

            {/* Payment Section inside Left Card */}
            <div className="payment-action-block">
              <div className="payment-guarantee-note">
                🔒 <span>SSL Encrypted Hotel Direct Checkout</span>
              </div>

              <a
                className={`portal-payment-btn ${!hasPaymentUrl ? 'disabled' : ''}`}
                href={hasPaymentUrl ? selectedRoom.paymentUrl : '#'}
                target={hasPaymentUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={handlePaymentClick}
              >
                {hasPaymentUrl ? 'Proceed to Payment ↗' : 'Payment Link Pending'}
              </a>

              <div className="payment-terms-fine">
                {hasPaymentUrl
                  ? 'Clicking will open the secure hotel payment page in a new tab.'
                  : 'Room selection is saved. Real payment gateway URLs will activate checkout directly.'}
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Guest Information Form */}
          <div className="portal-card guest-form-card">
            <div className="card-header">
              <span className="card-tag">Guest Details</span>
              <h3>Stay Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="luxury-form">
              <div className="form-group">
                <label htmlFor="guestName">Full Name *</label>
                <input
                  id="guestName"
                  type="text"
                  required
                  placeholder="e.g. Lord & Lady Smith"
                  value={formData.guestName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Mobile / WhatsApp *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Guest Count Pill Selector */}
              <div className="form-group">
                <label>Number of Guests *</label>
                <div className="guest-pills-row">
                  {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      className={`guest-pill ${formData.guestCount === pill ? 'active' : ''}`}
                      onClick={() => handleGuestPillClick(pill)}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Night Counter */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check-In Date *</label>
                  <input
                    id="checkIn"
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">Check-Out Date *</label>
                  <input
                    id="checkOut"
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {stayNights > 0 && (
                <div className="stay-duration-pill">
                  ✨ Duration of stay: <strong>{stayNights} Nights</strong>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="requests">Special Requests (Optional)</label>
                <textarea
                  id="requests"
                  placeholder="e.g. Connecting rooms, extra bed, dietary preferences, late arrival..."
                  value={formData.requests}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="form-submit-btn">
                Review Guest Summary
              </button>
            </form>

            {showSummary && (
              <div className="summary-drawer animate-in">
                <div className="drawer-header">
                  <h4>Reservation Summary</h4>
                  <button type="button" onClick={() => setShowSummary(false)}>✕</button>
                </div>
                <pre>{summaryText}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
