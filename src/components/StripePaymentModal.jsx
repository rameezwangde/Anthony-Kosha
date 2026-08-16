import { useState } from 'react';
import './StripePaymentModal.css';

export default function StripePaymentModal({
  isOpen,
  onClose,
  bookingDetails,
  onPaymentSuccess,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isTest1Aed, setIsTest1Aed] = useState(false);
  const [cardData, setCardData] = useState({
    name: bookingDetails?.formData?.guestName || '',
    cardNumber: '',
    expDate: '',
    cvc: '',
  });

  if (!isOpen || !bookingDetails) return null;

  const { selectedRoom, hotelName, formData } = bookingDetails;

  // Calculate stay duration (nights)
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 3; // Default 3 nights
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 3;
  };

  const nights = calculateNights();
  const ratePerNight = selectedRoom?.priceNum || 800;
  const normalSubtotal = ratePerNight * nights;
  const normalCardFee = Math.round(normalSubtotal * 0.029 + 1); // 2.9% + 1 DHS Stripe fee
  const normalGrandTotal = normalSubtotal + normalCardFee;

  // 1 AED Test Mode vs Normal Pricing Calculation
  const subtotal = isTest1Aed ? 1 : normalSubtotal;
  const cardFee = isTest1Aed ? 0 : normalCardFee;
  const grandTotal = isTest1Aed ? 1 : normalGrandTotal;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCardData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Stripe Gateway API authorization
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      if (onPaymentSuccess) {
        onPaymentSuccess({
          transactionId: 'ch_' + Math.random().toString(36).substr(2, 9),
          grandTotal,
          currency: 'DHS',
          isTest1Aed,
        });
      }
    }, 1800);
  };

  // Direct 1 AED Payment Link Handler (opens Stripe Dashboard test link if configured)
  const handleOpen1AedLink = () => {
    const testUrl = import.meta.env?.VITE_STRIPE_TEST_1AED_PAYMENT_URL || 'https://buy.stripe.com/test_1aed';
    const prefilledUrl = `${testUrl}?prefilled_email=${encodeURIComponent(formData.email || '')}&client_reference_id=${encodeURIComponent(formData.guestName || 'TestUser')}`;
    window.open(prefilledUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="stripe-modal-backdrop" onClick={onClose}>
      <div className="stripe-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="stripe-modal-close" onClick={onClose}>✕</button>

        {!paymentSuccess ? (
          <>
            {/* Header */}
            <div className="stripe-modal-header">
              <div className="stripe-brand-badge">
                <span className="stripe-logo-text">stripe</span>
                <span className="stripe-secure-pill">🔒 SECURE CHECKOUT</span>
              </div>
              <h3 className="stripe-modal-title">Complete Reservation Payment</h3>
              <p className="stripe-modal-subtitle">Official Wedding Booking Gateway for Anthony & Kosha</p>

              {/* 1 AED Test Mode Banner & Switch */}
              <div className="stripe-test-toggle-card">
                <div className="test-toggle-left">
                  <span className="test-badge">🧪 TESTING MODE</span>
                  <span className="test-desc">Toggle to test a 1 AED (1 DHS) charge</span>
                </div>

                <label className="switch-toggle">
                  <input
                    type="checkbox"
                    checked={isTest1Aed}
                    onChange={(e) => setIsTest1Aed(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="stripe-modal-grid">
              {/* Order Summary Column */}
              <div className="stripe-summary-col">
                <h4 className="stripe-col-heading">Booking Summary</h4>

                <div className="stripe-summary-item">
                  <span className="sum-label">HOTEL</span>
                  <span className="sum-val">{hotelName}</span>
                </div>

                <div className="stripe-summary-item">
                  <span className="sum-label">ROOM CATEGORY</span>
                  <span className="sum-val">{selectedRoom?.name}</span>
                </div>

                <div className="stripe-summary-item">
                  <span className="sum-label">GUEST</span>
                  <span className="sum-val">{formData?.guestName || 'Valued Guest'}</span>
                </div>

                <div className="stripe-summary-item">
                  <span className="sum-label">DATES</span>
                  <span className="sum-val">{formData?.checkIn || '24 Nov'} — {formData?.checkOut || '27 Nov'} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                </div>

                <div className="stripe-price-breakdown">
                  {isTest1Aed ? (
                    <div className="test-1aed-active-banner">
                      ⚡ <strong>1 AED Test Mode Enabled</strong>
                      <span>Pay 1 DHS for real/test transaction testing</span>
                    </div>
                  ) : (
                    <>
                      <div className="price-row">
                        <span>Room Rate ({nights} nights × {ratePerNight} DHS)</span>
                        <span>{normalSubtotal.toLocaleString()} DHS</span>
                      </div>
                      <div className="price-row">
                        <span>Card Processing Charge</span>
                        <span>+{normalCardFee} DHS</span>
                      </div>
                    </>
                  )}

                  <div className="price-row total-row">
                    <span>TOTAL PAYABLE</span>
                    <span className="grand-total">{grandTotal.toLocaleString()} DHS</span>
                  </div>
                </div>

                <div className="stripe-guarantee-note">
                  🔒 Encrypted with 256-bit SSL encryption. Direct reservation lock to wedding block.
                </div>
              </div>

              {/* Stripe Payment Form Column */}
              <div className="stripe-form-col">
                <h4 className="stripe-col-heading">Pay via Credit / Debit Card</h4>

                <form onSubmit={handlePaySubmit} className="stripe-card-form">
                  <div className="stripe-input-group">
                    <label htmlFor="name">CARDHOLDER NAME</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Name on card"
                      value={cardData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="stripe-input-group">
                    <label htmlFor="cardNumber">CARD NUMBER</label>
                    <div className="card-input-wrap">
                      <input
                        id="cardNumber"
                        type="text"
                        required
                        maxLength="19"
                        placeholder="4242 •••• •••• 4242"
                        value={cardData.cardNumber}
                        onChange={handleInputChange}
                      />
                      <span className="card-icons">💳</span>
                    </div>
                  </div>

                  <div className="stripe-input-row">
                    <div className="stripe-input-group">
                      <label htmlFor="expDate">EXPIRATION</label>
                      <input
                        id="expDate"
                        type="text"
                        required
                        maxLength="5"
                        placeholder="MM / YY"
                        value={cardData.expDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="stripe-input-group">
                      <label htmlFor="cvc">CVC / CVV</label>
                      <input
                        id="cvc"
                        type="text"
                        required
                        maxLength="4"
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="stripe-submit-btn"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="spinner-wrap">
                        <span className="spinner" /> Authorizing Payment...
                      </span>
                    ) : (
                      `Pay ${grandTotal.toLocaleString()} DHS Now →`
                    )}
                  </button>
                </form>

                {/* Secondary Option: Direct 1 AED Payment Link */}
                <div className="direct-1aed-link-wrapper">
                  <span className="or-divider">OR</span>
                  <button
                    type="button"
                    className="stripe-1aed-link-btn"
                    onClick={handleOpen1AedLink}
                  >
                    🔗 Open Official 1 AED Stripe Payment Link ↗
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Payment Success Confirmation View */
          <div className="stripe-success-card">
            <div className="success-icon-wrap">✓</div>
            <h3 className="success-title">Payment & Reservation Confirmed!</h3>
            <p className="success-message">
              Thank you, <strong>{formData.guestName}</strong>! Your stay at <strong>{hotelName}</strong> ({selectedRoom.name}) is officially confirmed for Anthony & Kosha's wedding celebration.
            </p>

            <div className="success-receipt-box">
              <div className="receipt-row">
                <span>Transaction ID:</span>
                <strong>ch_{Math.random().toString(36).substr(2, 9)}</strong>
              </div>
              <div className="receipt-row">
                <span>Amount Paid:</span>
                <strong>{grandTotal.toLocaleString()} DHS {isTest1Aed ? '(1 AED Test Mode)' : ''}</strong>
              </div>
              <div className="receipt-row">
                <span>Confirmation Email:</span>
                <strong>{formData.email}</strong>
              </div>
            </div>

            <button className="success-done-btn" onClick={onClose}>
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
