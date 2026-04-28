import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template31({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template31Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

    .template-31-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      background-color: #faf9f6;
      color: #1a1a1a;
      overflow: hidden;
      font-family: 'Outfit', sans-serif;
    }

    /* Left Content */
    .t31-content {
      flex: 1.2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 30px 8%;
      position: relative;
      z-index: 10;
    }

    .t31-logo {
      margin-bottom: 20px;
    }

    .t31-logo img {
      max-height: 40px;
      width: auto;
      object-fit: contain;
    }

    .t31-subtitle {
      font-size: 11px;
      font-weight: 800;
      color: #ff4757;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 10px;
      display: inline-block;
      padding: 4px 10px;
      background: rgba(255, 71, 87, 0.1);
      border-radius: 50px;
    }

    .t31-title {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 15px;
      letter-spacing: -1px;
      color: #111;
    }

    .t31-desc {
      font-size: 15px;
      line-height: 1.6;
      color: #555;
      margin-bottom: 25px;
      max-width: 450px;
      font-weight: 300;
    }

    /* Minimal Line Timer */
    .t31-timer {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }

    .t31-time-box {
      display: flex;
      align-items: baseline;
      gap: 6px;
      border-bottom: 2px solid #e1e1e1;
      padding-bottom: 6px;
      min-width: 50px;
    }

    .t31-num {
      font-size: 24px;
      font-weight: 800;
      color: #111;
    }

    .t31-label {
      font-size: 11px;
      text-transform: uppercase;
      color: #888;
      font-weight: 600;
      letter-spacing: 1px;
    }

    /* Floating Pill Form */
    .t31-form {
      display: flex;
      max-width: 400px;
      background: #fff;
      padding: 6px;
      border-radius: 60px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
      margin-bottom: 30px;
      border: 1px solid #f0f0f0;
    }

    .t31-form input {
      flex: 1;
      padding: 15px 25px;
      border: none;
      background: transparent;
      font-size: 15px;
      font-family: 'Outfit', sans-serif;
      outline: none;
    }
    
    .t31-form input::placeholder {
      color: #aaa;
    }

    .t31-form button {
      padding: 15px 35px;
      background-color: #ff4757;
      color: #fff;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .t31-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 71, 87, 0.3);
    }

    .t31-social {
      display: flex;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .t31-social a {
      color: #111;
      font-size: 20px;
      transition: color 0.3s ease;
      display: flex;
      background: #fff;
      padding: 12px;
      border-radius: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,0.03);
    }

    .t31-social a:hover {
      color: #ff4757;
    }

    /* Right Organic Blob */
    .t31-visual-pane {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .t31-blob-wrapper {
      position: absolute;
      width: 120%;
      height: 120%;
      right: -20%;
      top: -10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .t31-blob {
      width: 100%;
      height: 100%;
      max-width: 800px;
      max-height: 800px;
      background-size: cover;
      background-position: center;
      /* The pure CSS magic: Morphing organic shape */
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: morph 8s ease-in-out infinite both alternate;
      box-shadow: inset 0 0 0 10px rgba(255,255,255,0.2), 0 30px 60px rgba(0,0,0,0.1);
    }

    @keyframes morph {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
      67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    }

    /* Decorative floating elements */
    .t31-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff4757, #ff9f43);
      opacity: 0.2;
      filter: blur(40px);
      z-index: 1;
    }
  `;

  return (
    <div className="template-31-container">
      <style>{template31Styles}</style>

      {/* Subtle blurry decorations */}
      <div className="t31-circle" style={{ width: '300px', height: '300px', top: '-100px', left: '-100px' }}>&nbsp;</div>
      <div className="t31-circle" style={{ width: '400px', height: '400px', bottom: '-200px', right: '30%' }}>&nbsp;</div>

      <div className="t31-content">
        <div className="t31-logo">
          <img src={logoUrl && logoUrl !== "" && logoUrl !== "null" ? logoUrl : "/templates/logo-w.png"} alt="Logo" />
        </div>

        {(countdownTitle === undefined || countdownTitle === null) ? <div className="t31-subtitle">Launching In...</div> : countdownTitle !== "" && <div className="t31-subtitle">{countdownTitle}</div>}

        <h1 className="t31-title">{title === undefined || title === null ? "Something Magic Is Coming" : title}</h1>

        <p className="t31-desc">{description === undefined || description === null ? "We are building an experience like no other. Sign up right now to get an invite to the exclusive world premiere." : description}</p>

        <div className="t31-timer">
          <div className="t31-time-box">
            <span className="t31-num">{pad(timeLeft.days)}</span>
            <span className="t31-label">D</span>
          </div>
          <div className="t31-time-box">
            <span className="t31-num">{pad(timeLeft.hours)}</span>
            <span className="t31-label">H</span>
          </div>
          <div className="t31-time-box">
            <span className="t31-num">{pad(timeLeft.minutes)}</span>
            <span className="t31-label">M</span>
          </div>
          <div className="t31-time-box">
            <span className="t31-num">{pad(timeLeft.seconds)}</span>
            <span className="t31-label">S</span>
          </div>
        </div>

        <form className="t31-form">
          <input type="email" placeholder="Enter your email address..." readOnly />
          <button type="button">Get Notified</button>
        </form>

        <ul className="t31-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>

      <div className="t31-visual-pane">
        <div className="t31-blob-wrapper">
          <div className="t31-blob" style={{
            backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-3.png')"
          }}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
