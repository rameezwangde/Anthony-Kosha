import { useEffect, useRef } from 'react';
import './PaymentPanel.css';

export default function PaymentPanel({ selectedRoom, hotelName }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (selectedRoom && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedRoom]);

  if (!selectedRoom) return null;

  const hasPaymentUrl = !!selectedRoom.paymentUrl;

  const handleClick = (e) => {
    if (!hasPaymentUrl) {
      e.preventDefault();
      alert('The secure payment link for this room has not been added yet.');
    }
  };

  return (
    <div className="payment-panel animate-in" ref={panelRef}>
      <div className="payment-panel-content">
        <div className="payment-eyebrow">Step 3 · Secure Payment</div>
        <h3 className="payment-title">{selectedRoom.name}</h3>
        <p className="payment-copy">
          Selected at {hotelName}. Continue to the secure checkout assigned to this room type.
        </p>
        <div className="payment-note">
          {hasPaymentUrl
            ? 'You will open the secure external payment page in a new tab.'
            : 'The room-selection flow is ready. Add the real secure payment URL for this room to activate checkout.'}
        </div>
      </div>
      <a
        className={`payment-btn ${!hasPaymentUrl ? 'disabled' : ''}`}
        href={hasPaymentUrl ? selectedRoom.paymentUrl : '#'}
        target={hasPaymentUrl ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-disabled={!hasPaymentUrl}
      >
        {hasPaymentUrl ? 'Proceed to Payment ↗' : 'Payment Link Pending'}
      </a>
    </div>
  );
}
