import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="sm-hero-container">
      {/* HERO SECTION */}
      <main className="sm-hero-main">
        {/* Left Side: Content Anchor */}
        <section className="sm-content-section">
          <div className="sm-hackathon-badge">NxtGen Heist 2026</div>

          <h1 className="sm-headline">
            Rs. 1.7L Cr <span className="sm-text-dim">Unclaimed.</span>
            <br />
            <span className="sm-text-accent">Find what's yours.</span>
          </h1>

          <p className="sm-description">
            India has over 2,500 government schemes. Most citizens qualify for thousands in benefits but never know it.
            <strong> SchemeMatch uses Gemini AI to score and match you to the welfare you deserve.</strong>
          </p>

          <div className="sm-cta-group">
            <Link to="/register" className="sm-btn-primary sm-link">Build Your Profile</Link>
            <a href="#how-it-works" className="sm-video-link sm-link">
              <div className="sm-play-icon"></div>
              How It Works
            </a>
          </div>
        </section>

        {/* Right Side: Visual Hook */}
        <section className="sm-visual-section">
          <div className="sm-abstract-bg"></div>

          <div className="sm-impact-card">
            <div className="sm-card-header">
              <div className="sm-spinner"></div>
              <span className="sm-id-tag">ID: 2026-SM</span>
            </div>
            <h3 className="sm-card-title">Personal Impact Score</h3>
            <div className="sm-score-display">
              84<span className="sm-score-max">/100</span>
            </div>
            <div className="sm-progress-track">
              <div className="sm-progress-fill"></div>
            </div>
            <p className="sm-match-details">Match: <span>OBC / Maharashtra</span></p>
          </div>

          <div className="sm-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80"
              alt="Digital India"
              className="sm-hero-img"
            />
          </div>
        </section>
      </main>

      <div className="sm-scroll-hint">
        <span>Discover</span>
        <div className="sm-scroll-line"></div>
      </div>

      <div className="sm-about-inline-container" id="about">
        <section className="sm-about-hero">
          <span className="sm-badge sm-badge-orange">NxtGen Heist 2026 | Dyal Singh College</span>
          <div className="sm-about-grid">
            <div className="sm-about-copy">
              <p className="sm-about-kicker">Why SchemeMatch matters</p>
              <h2 className="sm-about-title">Bridging the Rs. 1.7L Cr welfare gap with clearer guidance and faster discovery.</h2>
              <p className="sm-about-subtitle">
                SchemeMatch turns dense scheme documents into simple next steps. Instead of asking citizens to search across disconnected portals, we surface relevant benefits based on profile, eligibility, and likely impact.
              </p>

              <div className="sm-about-signal-row">
                <div className="sm-about-signal">
                  <span className="sm-signal-value">2,500+</span>
                  <span className="sm-signal-label">schemes brought into one guided experience</span>
                </div>
                <div className="sm-about-signal">
                  <span className="sm-signal-value">80 Cr+</span>
                  <span className="sm-signal-label">people who may miss welfare they already qualify for</span>
                </div>
              </div>
            </div>

            <div className="sm-about-highlights">
              <div className="sm-about-metric">
                <span className="sm-metric-label">One profile</span>
                <p className="sm-metric-copy">Fill your basic details once and let SchemeMatch reuse them across all relevant recommendations.</p>
              </div>
              <div className="sm-about-metric">
                <span className="sm-metric-label">Smart ranking</span>
                <p className="sm-metric-copy">Prioritize schemes by fit and likely value instead of guessing which application matters most.</p>
              </div>
              <div className="sm-about-metric">
                <span className="sm-metric-label">Trusted path</span>
                <p className="sm-metric-copy">Move from discovery to official portals with clearer context, less confusion, and better confidence.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sm-about-features" id="features">
          <h2 className="sm-section-heading">What makes SchemeMatch different</h2>
          <p className="sm-section-subtitle">Built to reduce friction, explain eligibility clearly, and help users act on the right opportunity first.</p>

          <div className="sm-feature-grid">
            <article className="sm-feature-card">
              <div className="sm-feature-icon">AI</div>
              <h3 className="sm-feature-title">Personal Eligibility</h3>
              <p className="sm-feature-copy">No generic recommendations. Every scheme is filtered against age, income, state, category, and occupation before it reaches you.</p>
            </article>
            <article className="sm-feature-card">
              <div className="sm-feature-icon">Fast</div>
              <h3 className="sm-feature-title">Instant Shortlisting</h3>
              <p className="sm-feature-copy">See your strongest-fit schemes in minutes without reading through confusing portal pages and long rulebooks.</p>
            </article>
            <article className="sm-feature-card">
              <div className="sm-feature-icon">Clear</div>
              <h3 className="sm-feature-title">Readable Explanations</h3>
              <p className="sm-feature-copy">We translate policy-heavy language into simpler reasoning so users know why a scheme appears in their shortlist.</p>
            </article>
            <article className="sm-feature-card">
              <div className="sm-feature-icon">Safe</div>
              <h3 className="sm-feature-title">Secure and Lightweight</h3>
              <p className="sm-feature-copy">Start with basic profile details first, then continue to official portals without unnecessary upload friction up front.</p>
            </article>
          </div>
        </section>

        <section className="sm-process-section" id="how-it-works">
          <div className="sm-process-header">
            <h2 className="sm-section-heading">How the process works</h2>
            <p className="sm-section-subtitle">From profile setup to application handoff, every step is designed to be simple, fast, and actionable.</p>
          </div>

          <div className="sm-process-grid">
            <div className="sm-process-card">
              <span className="sm-process-step">1</span>
              <h3>Create a quick profile</h3>
              <p>Share only the essentials like age, income range, state, category, and occupation through guided fields.</p>
            </div>
            <div className="sm-process-card">
              <span className="sm-process-step">2</span>
              <h3>Scan official criteria</h3>
              <p>Our matching engine compares your profile against scheme rules and highlights the strongest practical fits.</p>
            </div>
            <div className="sm-process-card">
              <span className="sm-process-step">3</span>
              <h3>Prioritize what matters</h3>
              <p>Recommendations are ranked by relevance and likely impact so users can focus on the best next move first.</p>
            </div>
            <div className="sm-process-card">
              <span className="sm-process-step">4</span>
              <h3>Continue with confidence</h3>
              <p>Follow clear application guidance and move to the official portal with a stronger sense of what to expect.</p>
            </div>
          </div>
        </section>

        <section className="sm-about-vision">
          <div className="sm-vision-panel">
            <span className="sm-cta-pretitle">Citizen-first design</span>
            <h2 className="sm-vision-heading">Designed to unlock benefits for every citizen, not just confident internet users.</h2>
            <p className="sm-vision-text">SchemeMatch is built for clarity, accessibility, and speed. It helps first-time users discover benefits without needing to decode fragmented websites or bureaucratic language.</p>
            <ul className="sm-vision-list">
              <li><span>01</span> Vernacular-ready guidance for regional language expansion.</li>
              <li><span>02</span> Mobile-first flows that still work in low-bandwidth conditions.</li>
              <li><span>03</span> Clear reasoning that explains why a scheme appears in your shortlist.</li>
              <li><span>04</span> Alert-ready architecture for future matched-scheme notifications.</li>
            </ul>
          </div>

          <div className="sm-about-cta">
            <span className="sm-cta-pretitle">Get started today</span>
            <h2 className="sm-cta-heading">Discover the welfare benefits already meant for you.</h2>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="sm-btn-primary-large"
            >
              Create Your Free Profile
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
