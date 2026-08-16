import './ProgressBar.css';

export default function ProgressBar({ currentStep = 1 }) {
  const steps = [
    { num: '01', label: 'HOTEL', targetId: 'hotels-section' },
    { num: '02', label: 'ROOM', targetId: 'rooms-section' },
    { num: '03', label: 'STAY DETAILS', targetId: 'reservation-section' },
    { num: '04', label: 'PAYMENT', targetId: 'reservation-section' },
  ];

  const handleStepClick = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate fill percentage for progress line (0% to 100%)
  const fillPercentage = ((Math.min(currentStep, steps.length) - 1) / (steps.length - 1)) * 100;

  return (
    <section className="progress-section-wrapper" id="booking-flow-section">
      <div className="site-container">
        <div className="progress-card-pill">
          <div className="progress-bar-inner">
            {/* Single continuous background track & filled progress line */}
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${fillPercentage}%` }}
              />
            </div>

            <div className="progress-steps-flex">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                return (
                  <div
                    key={step.num}
                    className={`progress-step-item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                    onClick={() => handleStepClick(step.targetId)}
                  >
                    <div className="step-circle">
                      {isCompleted ? (
                        <span className="step-check-icon">✓</span>
                      ) : (
                        <span className="step-number">{step.num}</span>
                      )}
                    </div>

                    <div className="step-text-group">
                      <span className="step-label">{step.label}</span>
                      <span className="step-status">
                        {isCompleted ? 'COMPLETED' : isActive ? 'ACTIVE STEP' : 'NEXT STEP'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
