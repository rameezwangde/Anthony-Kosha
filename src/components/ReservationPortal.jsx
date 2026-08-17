import React, { useState } from 'react';
import PhoneInputPkg from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './ReservationPortal.css';

const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

export default function ReservationPortal({ selectedRoom, hotelName }) {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    guestCount: '',
    checkIn: '',
    checkOut: '',
    requests: '',
    offeredPrice: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
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

    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (checkOutDate <= checkInDate) {
      alert('Please select a check-out date that is after your check-in date.');
      return;
    }

    // Calculate exact number of nights
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (selectedRoom.priceNum && selectedRoom.priceNum > 0) {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomName: selectedRoom.name,
            priceNum: selectedRoom.priceNum,
            nights,
            customerEmail: formData.email,
            customerName: formData.guestName,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate checkout session');
        }
        
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert('There was an error connecting to the payment gateway. Please try again.');
      }
    } else {
      const subject = encodeURIComponent(`Booking Inquiry: ${selectedRoom.name}`);
      const body = encodeURIComponent(`Hello Wedding Team,

I would like to request a booking for the following room:
Room: ${selectedRoom.name}
Hotel: ${hotelName}
Guest Name: ${formData.guestName}
Email: ${formData.email}
Mobile: ${formData.phone}
Guests: ${formData.guestCount}
Check-In: ${formData.checkIn}
Check-Out: ${formData.checkOut}
Offered Price (per night): ${formData.offeredPrice ? formData.offeredPrice + ' AED' : 'Not specified'}
Special Requests: ${formData.requests}

Looking forward to your confirmation.`);
      
      window.location.href = `mailto:360eventsdxb@gmail.com?subject=${subject}&body=${body}`;
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

  // Calculate dynamic total price
  let displayNights = 0;
  let totalPrice = 0;
  if (formData.checkIn && formData.checkOut) {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    if (checkOutDate > checkInDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      displayNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (selectedRoom?.priceNum > 0) {
        totalPrice = displayNights * selectedRoom.priceNum;
      }
    }
  }

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
                  <PhoneInput
                    country={'ae'}
                    enableSearch={true}
                    disableSearchIcon={true}
                    searchPlaceholder="Search country..."
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone: '+' + phone }))}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      id: 'phone'
                    }}
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

              {selectedRoom && (!selectedRoom.priceNum || selectedRoom.priceNum === 0) && (
                <div className="form-field-group full-width">
                  <label htmlFor="offeredPrice">OFFERED PRICE PER NIGHT (AED)</label>
                  <input
                    id="offeredPrice"
                    type="number"
                    placeholder="Enter your proposed price in AED"
                    value={formData.offeredPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

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
                  {selectedRoom && (!selectedRoom.priceNum || selectedRoom.priceNum === 0) 
                    ? 'Mail Us →'
                    : 'Continue to Secure Payment →'}
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

            {/* Dynamic Total Price */}
            {displayNights > 0 && totalPrice > 0 && (
              <>
                <div className="summary-divider" />
                <div className="summary-data-block">
                  <span className="summary-lbl">TOTAL EST. ({displayNights} NIGHT{displayNights > 1 ? 'S' : ''})</span>
                  <div className="summary-main-val" style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>{totalPrice.toLocaleString()} AED</div>
                  <div className="summary-sub-val">* Including taxes and fees</div>
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
              {selectedRoom && (!selectedRoom.priceNum || selectedRoom.priceNum === 0) 
                ? 'MAIL US →'
                : 'CONTINUE TO SECURE PAYMENT →'}
            </button>

            <div className="summary-footer-lock">
              {selectedRoom && (!selectedRoom.priceNum || selectedRoom.priceNum === 0)
                ? <span>✉️ Send your request directly to our team</span>
                : <span>🔒 Stripe 256-bit SSL Encrypted Payment</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
