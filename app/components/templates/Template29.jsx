import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template29({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template29Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Nunito+Sans:wght@300;400;600&display=swap');

    .template-twenty-nine-container {
      font-family: 'Nunito Sans', sans-serif;
      background: #F0F7F7;
      color: #4A5568;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .t29-background {
      position: absolute;
      inset: 0;
      z-index: 1;
      background-image: url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : "/templates/29_bg.png"}');
      background-size: cover;
      background-position: left center;
    }

    .t29-card {
      position: relative;
      z-index: 10;
      width: 90%;
      max-width: 700px;
      padding: 56px 48px;
      background: #ffffff;
      box-shadow: 0 20px 50px rgba(0,0,0,0.05);
      border-radius: 16px;
      text-align: center;
      animation: t29-fadeIn 1.5s ease-out;
    }

    @keyframes t29-fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .t29-title {
      font-family: 'Lora', serif;
      font-weight: 600;
      color: #2C5282;
      font-size: 42px;
      line-height: 1.2;
      margin-bottom: 8px;
    }

    .t29-tagline {
      font-size: 18px;
      font-weight: 300;
      color: #718096;
      margin-bottom: 24px;
    }

    .t29-divider {
      height: 2px;
      width: 100px;
      background-color: #38A169;
      margin: 24px auto;
      opacity: 0.5;
    }

    .t29-countdown {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 40px;
    }

    .t29-countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;
    }

    .t29-countdown-number {
      font-family: 'Nunito Sans', sans-serif;
      font-weight: 600;
      color: #2D3748;
      line-height: 1;
      font-size: 42px;
    }

    .t29-countdown-label {
      color: #718096;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 8px;
    }

    .t29-subscription {
      background: #F8FAFC;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 32px;
    }

    .t29-subscription-prompt {
      font-weight: 600;
      color: #4A5568;
      margin-bottom: 16px;
      font-size: 15px;
    }

    .t29-form {
      display: flex;
      gap: 8px;
    }

    .t29-input {
      flex-grow: 1;
      background: #fff;
      border: 1px solid #CBD5E0;
      color: #1A202C;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
    }

    .t29-submit {
      background-color: #38A169;
      color: #fff;
      border: none;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      white-space: nowrap;
    }

    .t29-social {
      display: flex;
      justify-content: center;
      gap: 24px;
      list-style: none;
      padding: 0;
    }

    .t29-social a {
      color: #A0AEC0;
      font-size: 20px;
      transition: 0.3s;
    }

    .t29-social a:hover {
      color: #2C5282;
    }
  `;

  return (
    <div className="template-twenty-nine-container">
      <style>{template29Styles}</style>
      <div className="t29-background">&nbsp;</div>

      <div className="t29-card">
        <div className="t29-top-section">
          {logoUrl && logoUrl !== "null" ? (
            <img src={logoUrl} alt="Logo" style={{ height: "40px", width: "auto", objectFit: "contain", margin: "0 auto 24px" }} />
          ) : (
            <div style={{ marginBottom: "24px" }}>
              <svg style={{ height: "48px", width: "48px", margin: "0 auto" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#38A169" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#2C5282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <h1 className="t29-title">{title === undefined || title === null ? "Compassionate Care" : title}</h1>
          <p className="t29-tagline">A new standard of healthcare is coming soon.</p>
          <div className="t29-divider"></div>
          <p style={{ color: "#718096", marginBottom: "40px", fontSize: "20px", lineHeight: "1.6" }}>
            {description === undefined || description === null ? "We are committed to providing world-class medical services to our community. Our state-of-the-art facility will be opening its doors soon." : description}
          </p>
        </div>

        <div className="t29-countdown">
          <div className="t29-countdown-item">
            <div className="t29-countdown-number">{pad(timeLeft.days)}</div>
            <div className="t29-countdown-label">Days</div>
          </div>
          <div className="t29-countdown-item">
            <div className="t29-countdown-number">{pad(timeLeft.hours)}</div>
            <div className="t29-countdown-label">Hours</div>
          </div>
          <div className="t29-countdown-item">
            <div className="t29-countdown-number">{pad(timeLeft.minutes)}</div>
            <div className="t29-countdown-label">Mins</div>
          </div>
          <div className="t29-countdown-item">
            <div className="t29-countdown-number">{pad(timeLeft.seconds)}</div>
            <div className="t29-countdown-label">Secs</div>
          </div>
        </div>

        <div className="t29-subscription">
          <p className="t29-subscription-prompt">Receive updates and opening day information.</p>
          <div className="t29-form">
            <input type="email" placeholder="Enter email" className="t29-input" readOnly />
            <button className="t29-submit">Keep Me Informed</button>
          </div>
        </div>

        <ul className="t29-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
