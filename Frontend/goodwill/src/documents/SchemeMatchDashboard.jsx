import React from "react";
import "./SchemeMatchDashboard.css";
import { Link } from "react-router-dom";

const schemes = [
  {
    id: "SM-104",
    title: "PM Vishwakarma Yojana",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    benefit: "Up to ₹15,000 toolkit grant + ₹500/day training stipend.",
    category: "Artisan Support",
    deadline: "31 May 2026",
    progress: 92,
    status: "New",
    match: "94%",
  },
  {
    id: "SM-221",
    title: "Pradhan Mantri Awas Yojana",
    ministry: "Ministry of Housing and Urban Affairs",
    benefit: "Subsidy for affordable housing and low-cost loans.",
    category: "Housing",
    deadline: "15 June 2026",
    progress: 82,
    status: "Hot",
    match: "86%",
  },
  {
    id: "SM-078",
    title: "National Scholarship Scheme",
    ministry: "Ministry of Education",
    benefit: "Up to ₹20,000 per year for eligible students.",
    category: "Education",
    deadline: "10 July 2026",
    progress: 79,
    status: "Featured",
    match: "81%",
  },
];

const SchemeMatchDashboard = () => {
  const stats = [
    { label: "Impact Score", value: "84", accent: true },
    { label: "Matched Schemes", value: "12" },
    { label: "New Alerts", value: "3" },
  ];

  return (
    <div className="sm-dash-container">
      <main className="sm-dash-main">
        <section className="sm-profile-summary">
          <div>
            <h1 className="sm-dash-title">Your Dashboard</h1>
            <p className="sm-dash-subtitle">
              Review the latest scheme matches and take action on the best fits.
            </p>
          </div>

          <div className="sm-stats-group">
            {stats.map(({ label, value, accent }) => (
              <div key={label} className="sm-stat-box">
                <span className="sm-stat-label">{label}</span>
                <span className={`sm-stat-value ${accent ? "sm-text-accent" : ""}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="sm-scheme-grid">
          {schemes.map((scheme) => (
            <article key={scheme.id} className="sm-scheme-card">
              <div className="sm-card-header">
                <div className="sm-tag-group">
                  <span className={`sm-badge ${scheme.status === "New" ? "sm-badge-new" : "sm-badge-urgent"}`}>
                    {scheme.status}
                  </span>
                  <span className="sm-badge sm-badge-standard">ID: {scheme.id}</span>
                </div>
                <p className="sm-ministry-text">{scheme.ministry}</p>
                <h2 className="sm-scheme-title">{scheme.title}</h2>
              </div>

              <div className="sm-card-body">
                <div className="sm-benefit-box">
                  <span className="sm-benefit-label">Package benefit</span>
                  <span className="sm-benefit-value">{scheme.benefit}</span>
                </div>
                <p className="sm-match-reason">
                  {scheme.category} • Match {scheme.match} • Deadline {scheme.deadline}
                </p>
              </div>

              <div className="sm-card-footer">
                <div className="sm-score-header">
                  <span className="sm-score-label">Match Score</span>
                  <span className="sm-score-number">{scheme.progress}%</span>
                </div>
                <div className="sm-progress-track">
                  <div className="sm-progress-fill" style={{ width: `${scheme.progress}%` }} />
                </div>
                <Link to="/detail" className="sm-btn-apply">
                  View Details <span className="sm-arrow">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SchemeMatchDashboard;
