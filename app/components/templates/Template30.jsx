import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template30({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template30Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

    .template-30-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      background-color: #ffffff;
      color: #111827;
    }

    .t30-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 80px;
      position: relative;
      background-color: #ffffff;
    }

    .t30-right {
      flex: 1;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .t30-logo {
      margin-bottom: 2rem;
    }

    .t30-logo img {
      height: 60px;
      width: auto;
      object-fit: contain;
    }

    .t30-subtitle {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 16px;
    }

    .t30-title {
      font-size: 56px;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 24px;
      letter-spacing: -1px;
      color: #111827;
    }

    .t30-desc {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 40px;
      max-width: 480px;
    }

    .t30-timer {
      display: flex;
      gap: 24px;
      margin-bottom: 48px;
    }

    .t30-time-box {
      display: flex;
      flex-direction: column;
    }

    .t30-num {
      font-size: 36px;
      font-weight: 800;
      color: #111827;
      line-height: 1;
    }

    .t30-label {
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 600;
      color: #9ca3af;
      margin-top: 8px;
      letter-spacing: 1px;
    }

    .t30-form {
      display: flex;
      max-width: 400px;
      gap: 12px;
      margin-bottom: 40px;
    }

    .t30-form input {
      flex: 1;
      padding: 14px 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      background: #f9fafb;
      color: #111827;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .t30-form input:focus {
      border-color: #111827;
    }

    .t30-form button {
      padding: 14px 28px;
      background-color: #111827;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      white-space: nowrap;
    }

    .t30-form button:hover {
      background-color: #374151;
    }

    .t30-social {
      display: flex;
      gap: 24px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .t30-social a {
      color: #4b5563;
      font-size: 20px;
      transition: color 0.3s ease;
    }

    .t30-social a:hover {
      color: #111827;
    }
  `;

  return (
    <div className="template-30-container">
      <style>{template30Styles}</style>

      <div className="t30-left">
        <div className="t30-logo">
          <img src={logoUrl && logoUrl !== "" && logoUrl !== "null" ? logoUrl : "/templates/logo-w.png"} alt="Logo" />
        </div>

        {(countdownTitle === undefined || countdownTitle === null) ? <div className="t30-subtitle">Launching In...</div> : countdownTitle !== "" && <div className="t30-subtitle">{countdownTitle}</div>}
        <h1 className="t30-title">{title === undefined || title === null ? "We are launching soon." : title}</h1>
        <p className="t30-desc">{description === undefined || description === null ? "Enter your email to be the first to know when we go live and get an exclusive discount." : description}</p>

        <div className="t30-timer">
          <div className="t30-time-box">
            <span className="t30-num">{pad(timeLeft.days)}</span>
            <span className="t30-label">Days</span>
          </div>
          <div className="t30-time-box">
            <span className="t30-num">{pad(timeLeft.hours)}</span>
            <span className="t30-label">Hours</span>
          </div>
          <div className="t30-time-box">
            <span className="t30-num">{pad(timeLeft.minutes)}</span>
            <span className="t30-label">Mins</span>
          </div>
          <div className="t30-time-box">
            <span className="t30-num">{pad(timeLeft.seconds)}</span>
            <span className="t30-label">Secs</span>
          </div>
        </div>

        <form className="t30-form">
          <input type="email" placeholder="Your email address" readOnly />
          <button type="button">NOTIFY ME</button>
        </form>

        <ul className="t30-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>

      <div className="t30-right" style={{
        backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-2.png')"
      }}>
      </div>
    </div>
  );
}
