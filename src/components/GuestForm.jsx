import { useState } from 'react';
import './GuestForm.css';

export default function GuestForm({ selectedRoom, hotelName }) {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    guestCount: '',
    checkIn: '',
    checkOut: '',
    requests: '',
    bedPreference: '',
  });
  const [summaryText, setSummaryText] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      alert('Please select a room type first.');
      document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const { guestName, phone, email, guestCount, checkIn, checkOut, requests, bedPreference } = formData;
    const isDoubleRoom = selectedRoom?.id?.includes('-deluxe-double');

    if (isDoubleRoom && !bedPreference) {
      alert('Please select your bed preference.');
      return;
    }

    if (checkOut <= checkIn) {
      alert('Please choose a check-out date after check-in.');
      return;
    }

    const text = `ANTHONY & KOSHA · WEDDING HOTEL STAY

Hotel: ${hotelName}
Room: ${selectedRoom.value}
${isDoubleRoom ? `Bed Preference: ${bedPreference}\n` : ''}Guest: ${guestName}
Guests: ${guestCount}
Mobile / WhatsApp: ${phone}
Email: ${email}
Check-in: ${checkIn}
Check-out: ${checkOut}
Special requests: ${requests || 'None'}`;

    setSummaryText(text);
    setShowSummary(true);
  };

  return (
    <form className="formbox animate-in" id="guestForm" onSubmit={handleSubmit}>
      <div className="label">Guest Information</div>
      <h2 className="title" style={{ fontSize: '34px' }}>Stay details</h2>
      <p className="copy" style={{ marginBottom: '20px' }}>
        Enter the guest details for the selected stay. You can review the information before completing payment.
      </p>

      <div className="formgrid">
        <div>
          <label className="flabel" htmlFor="guestName">Guest name</label>
          <input
            id="guestName"
            value={formData.guestName}
            onChange={handleChange}
            required
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="flabel" htmlFor="phone">Mobile / WhatsApp</label>
          <input
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+971 / international number"
          />
        </div>
        <div>
          <label className="flabel" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label className="flabel" htmlFor="guestCount">Number of guests</label>
          <select
            id="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </select>
        </div>
        {selectedRoom?.id?.includes('-deluxe-double') && (
          <div>
            <label className="flabel" htmlFor="bedPreference">Bed preference</label>
            <select
              id="bedPreference"
              value={formData.bedPreference}
              onChange={handleChange}
              required
            >
              <option value="">Select preference</option>
              <option value="2 Twin Beds">2 Twin Beds</option>
              <option value="1 King Bed">1 King Bed</option>
            </select>
          </div>
        )}
        <div>
          <label className="flabel" htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="flabel" htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="full">
          <label className="flabel" htmlFor="requests">Special requests</label>
          <textarea
            id="requests"
            value={formData.requests}
            onChange={handleChange}
            placeholder="Connecting rooms, children, extra bed, accessibility, airport arrival, etc."
          />
        </div>
      </div>

      <div className="actions">
        <div className="fine">
          Final rate, room availability, cancellation terms and payment conditions should be displayed on the secure payment checkout linked to the selected room.
        </div>
        <button className="primary-btn" type="submit">
          Review Guest Details
        </button>
      </div>

      {showSummary && (
        <div className="summary show">
          <pre id="summaryText">{summaryText}</pre>
        </div>
      )}
    </form>
  );
}
