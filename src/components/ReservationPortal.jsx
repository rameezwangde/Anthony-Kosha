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

  // Calculate stay duration in nights
  const stayNights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.checkIn, formData.checkOut]);

  // Calculate total price if priceNum exists
  const totalPrice = useMemo(() => {
    if (!selectedRoom?.priceNum || stayNights <= 0) return null;
    return selectedRoom.priceNum * stayNights;
  }, [selectedRoom, stayNights]);

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

    const priceSummary = totalPrice
      ? `Estimated Rate: ${totalPrice.toLocaleString()} AED (${stayNights} nights @ ${selectedRoom.priceNum} AED/night) + card processing charges`
      : `Rate: ${selectedRoom.priceDisplay} (${selectedRoom.feeNote})`;

    const summary = `ANTHONY & KOSHA · WEDDING RESERVATION

Dedicated Hotel: ${hotelName}
Room Category: ${selectedRoom.value}
${priceSummary}

Guest Name: ${formData.guestName}
Guests: ${formData.guestCount}
Mobile / WhatsApp: ${formData.phone}
Email: ${formData.email}
Check-In Date: ${formData.checkIn}
Check-Out Date: ${formData.checkOut} (${stayNights} Nights)
Special Requests: ${formData.requests || 'None'}`;

    setSummaryText(summary);
    setShowSummary(true);
  };

  const hasPaymentUrl = !!selectedRoom?.paymentUrl;

  const handlePaymentClick = (e) => {
    if (!hasPaymentUrl) {
      e.preventDefault();
      alert(`The official payment link for ${hotelName} is pending update by event organizers.`);
    }
  };

  return (
    <section className="portal-section" id="portal">
      <div className="portal-container">
        <div className="section-header">
          <span className="section-label">Step 3 &amp; 4 · Dedicated Checkout</span>
          <h2 className="section-title">{hotelName.split(' ')[0]} Reservation Form</h2>
          <p className="section-subtitle">
            Complete your stay details below for <strong>{hotelName}</strong>. Standard rates: Deluxe Single 800 AED / Deluxe Double 875 AED per night.
          </p>
        </div>

        <div className="portal-split-layout">
          {/* Left Column: Live Stay Summary & Price Breakdown */}
          <div className="portal-card booking-summary-card">
            <div className="card-header">
              <span className="card-tag">{hotelName.split(' ')[0]} Selection</span>
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

                  {/* Price Rate Highlight Box */}
                  <div className="live-rate-highlight">
                    <div className="rate-amount-line">
                      <span className="rate-lbl">Nightly Rate:</span>
                      <strong className="rate-val">{selectedRoom.priceDisplay}</strong>
                    </div>
                    <span className="rate-card-fee">* {selectedRoom.feeNote}</span>

                    {totalPrice && (
                      <div className="calculated-total-row">
                        <span>Estimated Total ({stayNights} Nights):</span>
                        <strong>{totalPrice.toLocaleString()} AED</strong>
                      </div>
                    )}
                  </div>

                  <p className="selected-room-desc">{selectedRoom.desc}</p>
                </div>
              </div>
            ) : (
              <div className="no-selection-placeholder">
                <div className="placeholder-icon">🏨</div>
                <h4>Select a Room for {hotelName.split(' ')[0]}</h4>
                <p>Choose between Deluxe Single (800 AED) or Deluxe Double (875 AED) above.</p>
                <button
                  type="button"
                  className="placeholder-select-btn"
                  onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Room Rates ↑
                </button>
              </div>
            )}

            {/* Payment Section */}
            <div className="payment-action-block">
              <div className="payment-guarantee-note">
                🔒 <span>SSL Encrypted Checkout · Direct to Hotel</span>
              </div>

              <a
                className={`portal-payment-btn ${!hasPaymentUrl ? 'disabled' : ''}`}
                href={hasPaymentUrl ? selectedRoom.paymentUrl : '#'}
                target={hasPaymentUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={handlePaymentClick}
              >
                {hasPaymentUrl ? `Pay via ${hotelName.split(' ')[0]} Checkout ↗` : 'Payment Link Pending'}
              </a>

              <div className="payment-terms-fine">
                Deluxe Single: 800 AED/night · Deluxe Double: 875 AED/night (+ card charges)
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Hotel Reservation Form */}
          <div className="portal-card guest-form-card">
            <div className="card-header">
              <span className="card-tag">Dedicated Form</span>
              <h3>{hotelName.split(' ')[0]} Guest Reservation</h3>
            </div>

            <form onSubmit={handleSubmit} className="luxury-form">
              <div className="form-group">
                <label htmlFor="guestName">Guest Full Name *</label>
                <input
                  id="guestName"
                  type="text"
                  required
                  placeholder="e.g. John Smith"
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

              {/* Check-In / Check-Out */}
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
                  ✨ Stay Duration: <strong>{stayNights} Nights</strong>
                  {totalPrice && (
                    <span className="total-est-tag"> · Total: {totalPrice.toLocaleString()} AED (+ card charges)</span>
                  )}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="requests">Special Requests (Optional)</label>
                <textarea
                  id="requests"
                  placeholder="Connecting rooms, extra bed, accessibility, flight arrival time..."
                  value={formData.requests}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="form-submit-btn">
                Submit {hotelName.split(' ')[0]} Reservation Details
              </button>
            </form>

            {showSummary && (
              <div className="summary-drawer animate-in">
                <div className="drawer-header">
                  <h4>Reservation Details Preview</h4>
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
