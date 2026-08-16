import { useState } from 'react';
import './ReservationPortal.css';

export default function ReservationPortal({ selectedRoom, hotelName }) {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    guestCount: '',
    checkIn: '',
    checkOut: '',
    requests: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      alert('Please select a room first.');
      document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!formData.guestName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Please fill in your name, mobile, and email address before proceeding.');
      return;
    }

    if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('Please select a check-out date that is after your check-in date.');
      return;
    }

    const paymentUrl = import.meta.env.VITE_STRIPE_PAYMENT_URL;

    if (paymentUrl) {
      // Build prefilled Stripe Checkout URL
      const separator = paymentUrl.includes('?') ? '&' : '?';
      const prefilledUrl = `${paymentUrl}${separator}prefilled_email=${encodeURIComponent(formData.email)}&client_reference_id=${encodeURIComponent(formData.guestName)}`;
      window.open(prefilledUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Room selection saved! The official payment gateway link is pending activation.`);
    }
  };

  // Format date helper for the summary card
  const formatDateDisplay = (dateStr, fallbackText) => {
    if (!dateStr) return { main: fallbackText, sub: 'Select Date' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { main: dateStr, sub: '' };
    const dayNum = d.getDate();
    const monthStr = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const yearStr = d.getFullYear();
    const weekdayStr = d.toLocaleString('en-US', { weekday: 'long' });
    return {
      main: `${dayNum} ${monthStr} ${yearStr}`,
      sub: weekdayStr,
    };
  };

  const checkInDisplay = formatDateDisplay(formData.checkIn, 'Select Date');
  const checkOutDisplay = formatDateDisplay(formData.checkOut, 'Select Date');

  // Room thumbnail
  const roomThumbnail = selectedRoom?.img || "https://www.hilton.com/im/en/DXBAHHI/22071978/dxbah-room-bedroom.jpg?ch=2992&cw=5000&gravity=NorthWest&impolicy=crop&rh=700&rw=1100&xposition=0&yposition=171";

  return (
    <section className="reservation-section" id="reservation-section">
      <div className="site-container">
        <div className="ref-reservation-layout">
          {/* Left Column (~68% width): Reservation Form */}
          <div className="ref-form-card">
            <span className="section-tag">03 · YOUR RESERVATION</span>
            <h2 className="section-heading-large">Complete Your Stay</h2>
            <p className="form-subtext">Just a few details before we take you to secure payment.</p>

            <form onSubmit={handleSubmit} className="ref-guest-form">
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="guestName">GUEST NAME</label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.guestName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="phone">MOBILE / WHATSAPP</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+971 / international number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="guestCount">NUMBER OF GUESTS</label>
                  <select
                    id="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5+ Guests">5+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label htmlFor="checkIn">CHECK-IN</label>
                  <input
                    id="checkIn"
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="checkOut">CHECK-OUT</label>
                  <input
                    id="checkOut"
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field-group full-width">
                <label htmlFor="requests">SPECIAL REQUESTS</label>
                <textarea
                  id="requests"
                  placeholder="Connecting rooms, children, extra bed, accessibility, airport arrival, etc."
                  value={formData.requests}
                  onChange={handleChange}
                />
              </div>

              <div className="form-footer-bar">
                <div className="security-note">
                  🔒 <span>Your information is secure and protected by Stripe.</span>
                </div>

                <button type="submit" className="continue-payment-btn">
                  Continue to Secure Payment →
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (~32% width): Deep Burgundy Booking Summary Card */}
          <div className="ref-summary-card">
            <div className="summary-title-row">
              <h3>YOUR STAY</h3>
              <div className="summary-gold-line" />
            </div>

            {/* Selected Hotel & Room Thumbnail Box */}
            <div className="summary-property-box">
              <img src={roomThumbnail} alt="Selected Room" className="summary-room-thumb" />
              <div className="summary-property-info">
                <h4>{hotelName}</h4>
                <div className="summary-room-name">{selectedRoom ? selectedRoom.name : 'Select a Room Above'}</div>
              </div>
            </div>

            {/* Selected Room Rate & Fee Details */}
            {selectedRoom && (
              <>
                <div className="summary-divider" />
                <div className="summary-data-block">
                  <span className="summary-lbl">ROOM RATE</span>
                  <div className="summary-main-val">{selectedRoom.priceDisplay}</div>
                  <div className="summary-sub-val">* {selectedRoom.feeNote}</div>
                </div>
              </>
            )}

            <div className="summary-divider" />

            {/* Check-In */}
            <div className="summary-data-block">
              <span className="summary-lbl">CHECK-IN</span>
              <div className="summary-main-val">{checkInDisplay.main}</div>
              <div className="summary-sub-val">{checkInDisplay.sub}</div>
            </div>

            <div className="summary-divider" />

            {/* Check-Out */}
            <div className="summary-data-block">
              <span className="summary-lbl">CHECK-OUT</span>
              <div className="summary-main-val">{checkOutDisplay.main}</div>
              <div className="summary-sub-val">{checkOutDisplay.sub}</div>
            </div>

            <div className="summary-divider" />

            {/* Guests */}
            <div className="summary-data-block">
              <span className="summary-lbl">GUESTS</span>
              <div className="summary-main-val">{formData.guestCount || 'Select Guests'}</div>
            </div>

            {/* Dynamic Guest Details */}
            {(formData.guestName || formData.phone || formData.email) && (
              <>
                <div className="summary-divider" />
                <div className="summary-data-block">
                  <span className="summary-lbl">GUEST DETAILS</span>
                  {formData.guestName && <div className="summary-main-val" style={{marginBottom: '4px'}}>{formData.guestName}</div>}
                  {formData.phone && <div className="summary-sub-val" style={{color: '#EAE0D0', marginBottom: '2px'}}>{formData.phone}</div>}
                  {formData.email && <div className="summary-sub-val" style={{color: '#EAE0D0'}}>{formData.email}</div>}
                </div>
              </>
            )}

            {/* Gold Action Button */}
            <button
              type="button"
              className="summary-gold-cta-btn"
              onClick={handleSubmit}
            >
              CONTINUE TO SECURE PAYMENT →
            </button>

            <div className="summary-footer-lock">
              🔒 <span>Stripe 256-bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
