import React, { useEffect, useState } from 'react';
import './SchemeMatchAbout.css';
import { useNavigate } from 'react-router-dom';


const SchemeMatchAbout = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  return (
    <div className={`sm-about-container ${isVisible ? 'fade-in' : ''}`}>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="sm-back-btn-about"
        aria-label="Back to home"
      >
        ← Back to Home
      </button>

      <main className="sm-about-main">
        {/* Header Section */}
        <section className="sm-about-hero" data-aos="fade-up">
          <div className="sm-badge sm-badge-orange">NxtGen Heist 2026 · Dyal Singh College</div>
          <h1 className="sm-about-title">Bridging the ₹1.7L Crore Gap</h1>
          <p className="sm-about-subtitle">
            India has over 2,500 government schemes, yet ₹1.7L Cr in welfare funds goes unclaimed yearly. Over 80 Crore citizens are eligible for benefits but remain uninformed. We built SchemeMatch to fix that.
          </p>
        </section>

        {/* The Analogy Section */}
        <section className="sm-analogy-section" data-aos="fade-up">
          <div className="sm-analogy-card">
            <h2 className="sm-analogy-title">The Problem</h2>
            <p>Finding government schemes today is like wandering through a massive, unmapped forest. Citizens spend hours navigating 30+ confusing portals, deciphering complex jargon, and still miss out on benefits they're eligible for.</p>
          </div>
          <div className="sm-analogy-divider">→</div>
          <div className="sm-analogy-card sm-card-highlight">
            <h2 className="sm-analogy-title">The Solution</h2>
            <p>SchemeMatch is your intelligent GPS for welfare benefits. Our AI instantly analyzes your profile against 2,500+ schemes and calculates your personal Impact Score - showing exactly which benefits matter most to YOU.</p>
          </div>
        </section>

        {/* Step-by-Step Timeline */}
        <section className="sm-timeline-section" data-aos="fade-up">
          <h2 className="sm-section-heading">How It Works</h2>
          
          <div className="sm-timeline">
            <div className="sm-timeline-step">
              <div className="sm-step-number">1</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Smart Profile Creation</h3>
                <p className="sm-step-desc">
                  Answer simple questions about your age, income, location, category, and occupation. Our AI understands context - no need for complex forms or sensitive documents upfront.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">2</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">AI-Powered Analysis</h3>
                <p className="sm-step-desc">
                  Gemini AI reads through complex government scheme rulebooks and instantly matches your profile against eligibility criteria. It understands nuances that traditional systems miss.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">3</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Personal Impact Ranking</h3>
                <p className="sm-step-desc">
                  Get a 0-100 Impact Score for each matched scheme. See your personalized dashboard ranked by financial benefit and ease of application - focus on what matters most.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">4</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Seamless Application</h3>
                <p className="sm-step-desc">
                  Apply directly through official portals with pre-filled information. Our system tracks your applications and sends notifications when new schemes match your profile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sm-about-cta" data-aos="fade-up">
          <h2 className="sm-cta-heading">Don't let ₹1.7L crores go unclaimed. Your benefits are waiting.</h2>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="sm-btn-primary-large"
          >
            Start Your Free Profile
          </button>
        </section>
        <section className="sm-about-cta" data-aos="fade-up">
          <h2 className="sm-cta-heading">Don't let ₹1.7L crores go unclaimed. Your benefits are waiting.</h2>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="sm-btn-primary-large"
          >
            Start Your Free Profile
          </button>
        </section>

      </main>
    </div>
  );
};

export default SchemeMatchAbout;