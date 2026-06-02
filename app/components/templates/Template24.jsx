import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const SmileyIcon = () => (
  <div style={{
    width: "70px",
    height: "70px",
    margin: "0 auto 1.5rem",
    background: "#EBF4FF",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <svg style={{ height: "40px", width: "40px" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#007AFF" strokeWidth="1.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9.5" cy="9.5" r="1.5" fill="#007AFF" />
      <circle cx="14.5" cy="9.5" r="1.5" fill="#007AFF" />
    </svg>
  </div>
);

export default function Template24({ settings, timeLeft }) {
  const { title, description, logoUrl, countdownTitle, socialLinks } = settings;

  const clockItems = [
    { label: "Days", v: timeLeft.days },
    { label: "Hours", v: timeLeft.hours },
    { label: "Minutes", v: timeLeft.minutes },
    { label: "Seconds", v: timeLeft.seconds }
  ];

  const t24Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap');
    
    .t24-wrap {
      font-family: 'Roboto', sans-serif;
      background-color: #F4F7FC;
      position: relative;
      overflow-y: auto;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 40px 20px;
    }

    .t24-bg-circle {
      position: absolute;
      background-color: rgba(0, 122, 255, 0.08);
      border-radius: 50%;
    }

    .t24-main {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 700px;
      text-align: center;
    }

    .t24-logo-container {
      margin-bottom: 1.2rem;
    }

    .t24-logo-img {
      height: 46px;
      width: auto;
      object-fit: contain;
      margin: 0 auto;
    }

    .t24-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 700;
      margin: 0 0 1rem 0;
      color: #1a202c !important;
      line-height: 1.25;
    }

    .t24-highlight {
      color: #007AFF !important;
    }

    .t24-desc {
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      color: #4b5563;
      max-width: 600px;
      margin: 0 auto 1.8rem auto;
      line-height: 1.6;
    }

    .t24-countdown {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 2rem;
      width: 100%;
      max-width: 480px;
    }

    .t24-countdown-box {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 12px 6px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
    }

    .t24-countdown-number {
      font-family: 'Poppins', sans-serif;
      color: #007AFF;
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 700;
      line-height: 1.1;
    }

    .t24-countdown-label {
      color: #4A5568;
      font-weight: 500;
      font-size: 0.65rem;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .t24-subscription {
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
    }

    .t24-form-prompt {
      margin-bottom: 0.8rem;
      font-size: 1.05rem;
      color: #2D3748;
      font-weight: 600;
    }

    .t24-form {
      display: flex;
      gap: 8px;
      height: 48px;
      align-items: center;
    }

    .t24-input {
      flex: 1;
      background: #ffffff;
      border: 1px solid #CBD5E0;
      color: #2D3748;
      padding: 0 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      height: 100%;
      outline: none;
      box-sizing: border-box;
    }

    .t24-submit {
      background-color: #007AFF;
      color: #fff;
      border: none;
      padding: 0 22px;
      border-radius: 6px;
      font-weight: 600;
      cursor: not-allowed;
      white-space: nowrap;
      font-size: 0.9rem;
      height: 100%;
    }

    .t24-social {
      list-style: none;
      display: flex;
      gap: 12px;
      padding: 0;
      margin: 2rem 0 0 0;
    }

    .t24-social li {
      list-style: none;
    }

    .t24-social li a {
      color: #007AFF !important;
      background: #fff;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    .t24-social li a svg {
      width: 15px;
      height: 15px;
    }
  `;

  return (
    <div className="t24-wrap">
      <style>{t24Styles}</style>

      {/* Floating Background Circles to mimic t24-shape */}
      <div className="t24-bg-circle" style={{ width: "120px", height: "120px", top: "10%", left: "5%" }} />
      <div className="t24-bg-circle" style={{ width: "80px", height: "80px", top: "20%", right: "8%" }} />
      <div className="t24-bg-circle" style={{ width: "50px", height: "50px", bottom: "15%", left: "10%" }} />
      <div className="t24-bg-circle" style={{ width: "100px", height: "100px", bottom: "10%", right: "5%" }} />

      <main className="t24-main">
        {/* Logo Section */}
        <div className="t24-logo-container">
          {logoUrl && logoUrl !== "null" && logoUrl !== "" ? (
            <img src={logoUrl} alt="Logo" className="t24-logo-img" />
          ) : (
            <SmileyIcon />
          )}
        </div>

        {/* Title */}
        <h1 className="t24-title">
          <span className="t24-highlight">
            {title === undefined || title === null ? "Level Up Your Skills" : title}
          </span>
        </h1>

        {/* Description */}
        <p className="t24-desc">
          {description === undefined || description === null ? "Our new online learning platform is coming soon. Sign up for early access and exclusive discounts." : description}
        </p>

        {/* Countdown Grid */}
        <div className="t24-countdown">
          {clockItems.map((item, idx) => (
            <div key={idx} className="t24-countdown-box">
              <div className="t24-countdown-number">{pad(item.v)}</div>
              <div className="t24-countdown-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        <div className="t24-subscription">
          <p className="t24-form-prompt">
            {countdownTitle === undefined || countdownTitle === null || countdownTitle === "" ? "Get notified when we launch!" : countdownTitle}
          </p>
          <div className="t24-form">
            <input type="email" placeholder="Enter your email address" disabled className="t24-input" />
            <button disabled className="t24-submit">Notify Me</button>
          </div>
        </div>

        {/* Social Links */}
        <ul className="t24-social">
          <StorefrontSocialLinks links={socialLinks} size={15} />
        </ul>
      </main>
    </div>
  );
}
