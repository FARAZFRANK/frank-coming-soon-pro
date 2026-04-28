import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template28({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template28Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500&display=swap');

    .template-twenty-eight-container {
      font-family: 'Inter', sans-serif;
      color: #E5E7EB;
      position: relative;
      width: 100%;
      min-height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: transparent;
      padding: 40px 20px;
      box-sizing: border-box;
    }

    .t28-background {
      position: absolute;
      inset: 0;
      z-index: 1;
      background-image: url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"}');
      background-size: cover;
      background-position: center;
      animation: t28-kenburns 30s ease-out infinite;
    }

    @keyframes t28-kenburns {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .t28-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.8);
      z-index: 2;
    }

    .t28-content {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 800px;
      text-align: center;
      animation: t28-fadeIn 1.5s ease-out;
    }

    @keyframes t28-fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .t28-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      line-height: 0.9;
      font-size: clamp(3rem, 6cqw, 84px);
      color: #fff;
      margin: 16px 0 32px;
    }

    .t28-highlight {
      color: #FDE047;
    }

    .t28-divider {
      height: 5px;
      width: 80px;
      background-color: #FDE047;
      margin: 0 auto 24px;
    }

    .t28-countdown {
      display: flex;
      justify-content: center;
      gap: clamp(16px, 3cqw, 40px);
      margin-bottom: 40px;
    }

    .t28-countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .t28-countdown-number {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      font-size: clamp(2.5rem, 5cqw, 64px);
    }

    .t28-countdown-label {
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.15em;
      color: #9CA3AF;
      margin-top: 8px;
    }

    .t28-subscription {
      max-width: 450px;
      margin: 0 auto;
    }

    .t28-subscription-prompt {
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #9CA3AF;
      font-size: 12px;
      font-weight: 500;
    }

    .t28-form {
      display: flex;
      gap: 12px;
      flex-direction: column;
    }

    @media (min-width: 480px) {
      .t28-form {
        flex-direction: row;
      }
    }

    .t28-input {
      flex-grow: 1;
      background: transparent;
      border: 1px solid #4B5563;
      color: #fff;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
    }

    .t28-submit {
      background-color: #FDE047;
      color: #000;
      border: none;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 13px;
      white-space: nowrap;
      cursor: pointer;
    }

    .t28-social {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 40px;
      list-style: none;
      padding: 0;
    }

    .t28-social a {
      color: #fff;
      font-size: 18px;
      opacity: 0.8;
      transition: 0.3s;
    }

    .t28-social a:hover {
      color: #FDE047;
      opacity: 1;
    }
  `;

  const titleText = (title === undefined || title === null) ? "START YOUR JOURNEY" : title;
  const titleWords = titleText.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div className="template-twenty-eight-container">
      <style>{template28Styles}</style>
      <div className="t28-background">&nbsp;</div>
      <div className="t28-overlay">&nbsp;</div>

      <div className="t28-content">
        <div className="t28-top-section">
          {logoUrl && logoUrl !== "null" ? (
            <img src={logoUrl} alt="Logo" style={{ height: "40px", width: "auto", objectFit: "contain", margin: "0 auto 32px" }} />
          ) : (
            <div style={{ marginBottom: "24px" }}>
              <svg style={{ height: "48px", width: "48px", margin: "0 auto" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 8V16L12 22L21 16V8L12 2Z" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 8L12 13L21 8" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V13" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <h1 className="t28-title">
            {firstWord} <span className="t28-highlight">{restOfTitle}</span>
          </h1>
          <div className="t28-divider"></div>
          <p style={{ color: "#9CA3AF", marginBottom: "40px", fontSize: "20px", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto" }}>
            {description === undefined || description === null ? "Push your limits and redefine what's possible. Our premium training facility is opening soon." : description}
          </p>
        </div>

        <div className="t28-countdown">
          <div className="t28-countdown-item">
            <div className="t28-countdown-number">{pad(timeLeft.days)}</div>
            <div className="t28-countdown-label">Days</div>
          </div>
          <div className="t28-countdown-item">
            <div className="t28-countdown-number">{pad(timeLeft.hours)}</div>
            <div className="t28-countdown-label">Hours</div>
          </div>
          <div className="t28-countdown-item">
            <div className="t28-countdown-number">{pad(timeLeft.minutes)}</div>
            <div className="t28-countdown-label">Mins</div>
          </div>
          <div className="t28-countdown-item">
            <div className="t28-countdown-number">{pad(timeLeft.seconds)}</div>
            <div className="t28-countdown-label">Secs</div>
          </div>
        </div>

        <div className="t28-subscription">
          <p className="t28-subscription-prompt">Get Early Access</p>
          <div className="t28-form">
            <input type="email" placeholder="Enter email" className="t28-input" readOnly />
            <button className="t28-submit">Request Invite</button>
          </div>
        </div>

        <ul className="t28-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
