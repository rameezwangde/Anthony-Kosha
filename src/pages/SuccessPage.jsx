import { Link } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  return (
    <div className="success-page-container">
      <div className="success-card">
        <div className="success-icon">✨</div>
        <h1 className="success-title">Reservation Confirmed</h1>
        
        <p className="success-message">
          Thank you for confirming your stay for the Anthony & Kosha wedding celebration! 
          Your payment has been successfully processed.
        </p>

        <p className="email-status success">
          ✓ A detailed confirmation has been sent to your email.
        </p>

        <div className="success-actions">
          <Link to="/" className="success-home-btn">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
