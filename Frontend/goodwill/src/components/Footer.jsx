import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sm-footer">
      <div className="sm-footer-content">
        {/* Brand Section */}
        <div className="sm-footer-brand">
          <div className="sm-footer-logo">
            <span className="sm-footer-icon">SM</span>
            <span className="sm-footer-name">SchemeMatch</span>
          </div>
          <p className="sm-footer-tagline">
            Bridging India's ₹1.7L Crore welfare gap. AI-powered scheme matching for every citizen.
          </p>
        </div>

        {/* Links Grid */}
        <div className="sm-footer-grid">
          {/* Product */}
          <div className="sm-footer-column">
            <h4 className="sm-footer-heading">Product</h4>
            <ul className="sm-footer-list">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">How It Works</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="sm-footer-column">
            <h4 className="sm-footer-heading">Company</h4>
            <ul className="sm-footer-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="sm-footer-column">
            <h4 className="sm-footer-heading">Resources</h4>
            <ul className="sm-footer-list">
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="sm-footer-column">
            <h4 className="sm-footer-heading">Legal</h4>
            <ul className="sm-footer-list">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="sm-footer-social">
          <h4 className="sm-footer-heading">Follow Us</h4>
          <div className="sm-social-links">
            <a href="#twitter" className="sm-social-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 0 11-4s1-8.5 0-9.5a9.45 9.45 0 00-5-1.5" />
              </svg>
            </a>
            <a href="#linkedin" className="sm-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#github" className="sm-social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#instagram" className="sm-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="currentColor"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Attribution */}
      <div className="sm-footer-bottom">
        <p className="sm-footer-copyright">
          &copy; {currentYear} SchemeMatch. Built with passion for the NxtGen Heist 2026 hackathon at Dyal Singh College.
        </p>
        <p className="sm-footer-legal">
          All rights reserved. Not affiliated with government agencies.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
