import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template6({ settings, timeLeft, isAdmin }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template6Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:wght@700;900&display=swap');

    .template-6-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? "transparent" : "#ffffff"};
      background-image: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "none"};
      background-size: cover;
      background-position: center;
      color: #000000;
      font-family: 'Outfit', sans-serif;
      text-align: center;
      padding: ${isAdmin ? "20px 40px" : "40px"};
      position: relative;
    }

    .t6-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? "rgba(255,255,255,0.7)" : "transparent"};
        z-index: 1;
    }

    .t6-content {
      position: relative;
      z-index: 10;
      max-width: 800px;
      width: 100%;
    }

    .t6-logo {
      margin-bottom: ${isAdmin ? "30px" : "50px"};
      display: ${logoUrl && logoUrl !== "" && logoUrl !== "null" ? "block" : "none"};
    }

    .t6-logo img {
      max-height: ${isAdmin ? "55px" : "80px"};
      width: auto;
      object-fit: contain;
    }

    .t6-subtitle {
      font-size: ${isAdmin ? "13px" : "16px"};
      font-weight: 600;
      color: #000;
      text-transform: uppercase;
      letter-spacing: 5px;
      margin-bottom: ${isAdmin ? "15px" : "25px"};
      opacity: 0.6;
    }

    .t6-title {
      font-family: 'Playfair Display', serif;
      font-size: ${isAdmin ? "clamp(40px, 6vw, 70px)" : "clamp(48px, 8vw, 90px)"};
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: ${isAdmin ? "20px" : "30px"};
      color: #000;
    }

    .t6-desc {
      font-size: ${isAdmin ? "17px" : "20px"};
      line-height: ${isAdmin ? "1.6" : "1.7"};
      color: #333;
      margin-bottom: ${isAdmin ? "30px" : "50px"};
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      font-weight: 300;
    }

    .t6-timer {
      display: flex;
      justify-content: center;
      gap: ${isAdmin ? "40px" : "60px"};
      margin-bottom: ${isAdmin ? "40px" : "70px"};
    }

    .t6-time-box {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .t6-num {
      font-size: ${isAdmin ? "48px" : "64px"};
      font-weight: 300;
      color: #000;
      letter-spacing: -2px;
      border-bottom: 2px solid #000;
      padding-bottom: ${isAdmin ? "20px" : "8px"};
      margin-bottom: ${isAdmin ? "10px" : "15px"};
    }

    .t6-label {
      font-size: ${isAdmin ? "11px" : "13px"};
      text-transform: uppercase;
      color: #000;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .t6-form {
      display: flex;
      max-width: 600px;
      width: 100%;
      margin: 0 auto ${isAdmin ? "30px" : "60px"};
      border: 2px solid #000;
      padding: 6px;
      background: white;
    }

    .t6-form input {
      flex: 1;
      padding: 15px 20px;
      border: none;
      background: transparent;
      font-size: 16px;
      outline: none;
      color: #000;
    }

    .t6-form button {
      background: #000;
      color: #fff;
      border: none;
      padding: 15px 30px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .t6-form button:hover {
      opacity: 0.8;
    }

    .t6-social {
      display: flex;
      justify-content: center;
      gap: 25px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .t6-social a {
      color: #000000;
      font-size: 22px;
      transition: opacity 0.3s ease;
    }

    .t6-social a:hover {
      opacity: 0.5;
    }
  `;

  return (
    <div className="template-6-container">
      <style>{template6Styles}</style>
      <div className="t6-overlay" />

      <div className="t6-content">
        <div className="t6-logo">
          {logoUrl && logoUrl !== "" && logoUrl !== "null" && (
            <img src={logoUrl} alt="Logo" />
          )}
        </div>

        {(countdownTitle === undefined || countdownTitle === null) ? <div className="t6-subtitle">Launching In...</div> : countdownTitle !== "" && <div className="t6-subtitle">{countdownTitle}</div>}

        <h1 className="t6-title">{(title === undefined || title === null) ? "Something Big is Brewing" : title}</h1>

        <p className="t6-desc">{(description === undefined || description === null) ? "We're currently working on creating a new and exciting experience for you. Sign up now to be the first to know when we launch." : description}</p>

        <div className="t6-timer">
          <div className="t6-time-box">
            <span className="t6-num">{pad(timeLeft.days)}</span>
            <span className="t6-label">Days</span>
          </div>
          <div className="t6-time-box">
            <span className="t6-num">{pad(timeLeft.hours)}</span>
            <span className="t6-label">Hours</span>
          </div>
          <div className="t6-time-box">
            <span className="t6-num">{pad(timeLeft.minutes)}</span>
            <span className="t6-label">Min</span>
          </div>
          <div className="t6-time-box">
            <span className="t6-num">{pad(timeLeft.seconds)}</span>
            <span className="t6-label">Sec</span>
          </div>
        </div>

        <form className="t6-form">
          <input type="email" placeholder="Email address" readOnly />
          <button type="button">Notify Me</button>
        </form>

        <ul className="t6-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
