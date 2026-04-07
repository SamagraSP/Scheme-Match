import React from "react";
import "./SchemeMatchDetail.css";
import { Link } from "react-router-dom";

const SchemeMatchDetail = () => {
  // Example logic inside a React component in your goodwill folder

  const _sendReservationData = async (reservationDetails) => {
    try {
      // 1. Construct the full URL to the backend
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/reservation/send`;

      // 2. Send the payload
      const response = await fetch(backendUrl, {
        method: "POST", // Must match your backend route and CORS allowed methods
        headers: {
          "Content-Type": "application/json",
        },
        // reservationDetails should be an object matching what your reservation controller expects
        body: JSON.stringify(reservationDetails),
      });

      const data = await response.json();

      // 3. Handle the backend's response
      if (data.success) {
        console.log("Success:", data.message);
        // Trigger success UI here
      } else {
        console.error("Failed:", data.message);
        // Trigger error UI here
      }
    } catch (error) {
      // This catches network errors (e.g., backend is offline)
      console.error("Network or Server Error:", error);
    }
  };

  // Simulated data: In your actual app, you'd fetch this using the scheme ID from the URL params
  const scheme = {
    id: "SM-104",
    title: "PM Vishwakarma Yojana",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    description:
      "A central sector scheme to support traditional artisans and craftspeople through skill upgrading, toolkit incentives, and collateral-free credit support.",
    benefit:
      "Up to ₹15,000 toolkits + ₹500/day training stipend + up to ₹3 Lakh collateral-free loan.",
    deadline: "31 May 2026",
    impactScore: 84,
    isNew: true,
    officialLink: "https://www.myscheme.gov.in/schemes/pm-vishwakarma",
    eligibility: [
      "Must be an artisan or craftsperson working with hands and tools.",
      "Minimum age of 18 years on the date of registration.",
      "Must be engaged in one of the 18 family-based traditional trades.",
      "Should not have availed loans under similar central/state schemes in the past 5 years.",
    ],
    documents: [
      "Aadhaar Card",
      "Voter ID Card",
      "Proof of Occupation (Self-declaration)",
      "Bank Account Details",
      "Caste Certificate (if applicable)",
    ],
    aiReasoning:
      "Strong match. Your profile indicates you are an artisan in Maharashtra. The ₹15,000 toolkit grant directly impacts your stated income bracket. Act quickly, as the deadline is approaching.",
  };

  return (
    <div className="sm-detail-container">
      <main className="sm-detail-main">
        {/* Back Navigation */}
        <Link to="/dashboard" className="sm-btn-back">
          <span className="sm-arrow-left">←</span>
          Back to Dashboard
        </Link>

        <div className="sm-detail-header">
          <div className="sm-tag-group">
            {scheme.isNew && (
              <span className="sm-badge sm-badge-new">Newly Launched</span>
            )}
            <span className="sm-badge sm-badge-standard">ID: {scheme.id}</span>
          </div>
          <h1 className="sm-detail-title">{scheme.title}</h1>
          <p className="sm-detail-ministry">{scheme.ministry}</p>
        </div>

        <div className="sm-detail-grid">
          {/* Left Column: Data Breakdown */}
          <div className="sm-info-column">
            <section className="sm-info-section">
              <h2 className="sm-section-heading">Overview</h2>
              <p className="sm-section-text">{scheme.description}</p>
            </section>

            <section className="sm-info-section">
              <h2 className="sm-section-heading">Estimated Benefits</h2>
              <div className="sm-benefit-highlight">
                <div className="sm-check-icon">✓</div>
                <p>{scheme.benefit}</p>
              </div>
            </section>

            <section className="sm-info-section">
              <h2 className="sm-section-heading">Eligibility Criteria</h2>
              <ul className="sm-criteria-list">
                {scheme.eligibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="sm-info-section">
              <h2 className="sm-section-heading">Required Documents</h2>
              <ul className="sm-document-list">
                {scheme.documents.map((doc, index) => (
                  <li key={index}>
                    <span className="sm-doc-icon">📄</span> {doc}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="sm-action-column">
            <div className="sm-sticky-card">
              <div className="sm-score-block">
                <h3 className="sm-score-title">Your Impact Score</h3>
                <div className="sm-score-display">
                  {scheme.impactScore}
                  <span className="sm-score-max">/100</span>
                </div>
                <div className="sm-progress-track">
                  <div
                    className="sm-progress-fill"
                    style={{ width: `${scheme.impactScore}%` }}
                  ></div>
                </div>
                <div className="sm-ai-reasoning">
                  <span className="sm-ai-label">✨ Gemini Analysis:</span>
                  <p>{scheme.aiReasoning}</p>
                </div>
              </div>

              <div className="sm-deadline-block">
                <span className="sm-deadline-label">Application Deadline</span>
                <span className="sm-deadline-date">{scheme.deadline}</span>
              </div>

              {/* Logic: Target "_blank" ensures MyScheme opens in a new tab so they don't lose your app */}
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sm-btn-apply-large"
              >
                Apply on MyScheme.gov.in <span>↗</span>
              </a>

              <p className="sm-disclaimer">
                You will be redirected to the official government portal to
                complete your application.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchemeMatchDetail;