import './ProgressBar.css';

export default function ProgressBar({ currentStep = 1 }) {
  const steps = [
    { num: '01', label: 'HOTEL' },
    { num: '02', label: 'ROOM' },
    { num: '03', label: 'STAY DETAILS' },
    { num: '04', label: 'PAYMENT' },
  ];

  return (
    <div className="progress-section-wrapper" id="booking-flow-section">
      <div className="site-container">
        <div className="progress-bar-container">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum <= currentStep;

            return (
              <div key={step.num} className="progress-step-item">
                {/* Connecting Line (before element, except first) */}
                {idx > 0 && <div className={`progress-line ${idx < currentStep ? 'active' : ''}`} />}

                <div className={`step-circle ${isActive ? 'active' : ''}`}>
                  <span>{step.num}</span>
                </div>
                <div className={`step-label ${isActive ? 'active' : ''}`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
