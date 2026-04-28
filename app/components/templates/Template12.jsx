import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template12({ settings, timeLeft, isAdmin }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template12Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

    .template-12-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? "transparent" : "#fbfaf8"};
      background-image: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "none"};
      background-size: cover;
      background-position: center;
      color: #121212;
      font-family: 'Assistant', sans-serif;
      text-align: center;
      padding: 40px;
      position: relative;
    }

    .t12-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? "rgba(255,255,255,0.6)" : "transparent"};
        z-index: 1;
    }

    .t12-content {
      position: relative;
      z-index: 10;
      max-width: 800px;
      width: 100%;
    }

    .t12-logo {
      margin-bottom: ${isAdmin ? "25px" : "40px"};
      display: ${logoUrl && logoUrl !== "" && logoUrl !== "null" ? "block" : "none"};
    }

    .t12-logo img {
      max-height: ${isAdmin ? "50px" : "80px"};
      width: auto;
      object-fit: contain;
    }

    .t12-subtitle {
      font-size: ${isAdmin ? "12px" : "14px"};
      font-weight: 400;
      color: #121212;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 12px;
      opacity: 0.7;
    }

    .t12-title {
      font-family: 'Playfair Display', serif;
      font-size: ${isAdmin ? "clamp(36px, 5vw, 54px)" : "clamp(48px, 8vw, 84px)"};
      font-weight: 400;
      font-style: italic;
      line-height: 1.2;
      margin-bottom: 24px;
      color: #121212;
    }

    .t12-desc {
      font-size: ${isAdmin ? "16px" : "18px"};
      line-height: 1.8;
      color: rgba(18, 18, 18, 0.75);
      margin-bottom: ${isAdmin ? "30px" : "50px"};
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .t12-timer {
      display: flex;
      justify-content: center;
      gap: ${isAdmin ? "30px" : "50px"};
      margin-bottom: ${isAdmin ? "40px" : "70px"};
      border-top: 1px solid rgba(0,0,0,0.08);
      border-bottom: 1px solid rgba(0,0,0,0.08);
      padding: 30px 0;
    }

    .t12-time-box {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .t12-num {
      font-size: ${isAdmin ? "38px" : "54px"};
      font-weight: 300;
      color: #121212;
      line-height: 1;
    }

    .t12-label {
      font-size: 11px;
      text-transform: uppercase;
      color: #121212;
      font-weight: 400;
      letter-spacing: 0.1rem;
      margin-top: 10px;
      opacity: 0.5;
    }

    .t12-form-container {
        max-width: 440px;
        margin: 0 auto ${isAdmin ? "30px" : "50px"};
    }

    .t12-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .t12-form input {
      flex: 1;
      padding: 15px 20px;
      border: 1px solid rgba(18, 18, 18, 0.2);
      background: #fff;
      font-size: 15px;
      outline: none;
      color: #121212;
      text-align: center;
      border-radius: 0;
      transition: border 0.3s ease;
    }

    .t12-form input:focus {
        border-color: #121212;
    }

    .t12-form button {
      background: #121212;
      color: #fff;
      border: 1px solid #121212;
      padding: 15px 30px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 0;
    }

    .t12-form button:hover {
      background: #fff;
      color: #121212;
    }

    .t12-social {
      display: flex;
      justify-content: center;
      gap: 30px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .t12-social a {
      color: rgba(18, 18, 18, 0.4);
      font-size: 22px;
      transition: color 0.3s ease;
    }

    .t12-social a:hover {
      color: #121212;
    }
  `;

  return (
    <div className="template-12-container">
      <style>{template12Styles}</style>
      <div className="t12-overlay" />
      
      <div className="t12-content">
        <div className="t12-logo">
           {logoUrl && logoUrl !== "" && logoUrl !== "null" && (
             <img src={logoUrl} alt="Logo" />
           )}
        </div>

        {(countdownTitle === undefined || countdownTitle === null) ? <div className="t12-subtitle">Launching In...</div> : countdownTitle !== "" && <div className="t12-subtitle">{countdownTitle}</div>}

        <h1 className="t12-title">{(title === undefined || title === null) ? "Our new store is opening soon" : title}</h1>

        <p className="t12-desc">{(description === undefined || description === null) ? "Be the first to know when we launch and get exclusive early access to our collections." : description}</p>

        <div className="t12-timer">
          <div className="t12-time-box">
            <span className="t12-num">{pad(timeLeft.days)}</span>
            <span className="t12-label">Days</span>
          </div>
          <div className="t12-time-box">
            <span className="t12-num">{pad(timeLeft.hours)}</span>
            <span className="t12-label">Hours</span>
          </div>
          <div className="t12-time-box">
            <span className="t12-num">{pad(timeLeft.minutes)}</span>
            <span className="t12-label">Minutes</span>
          </div>
          <div className="t12-time-box">
            <span className="t12-num">{pad(timeLeft.seconds)}</span>
            <span className="t12-label">Seconds</span>
          </div>
        </div>

        <div className="t12-form-container">
            <form className="t12-form">
                <input type="email" placeholder="Email address" readOnly />
                <button type="button">Notify me</button>
            </form>
        </div>

        <ul className="t12-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
