import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const Template9 = ({ settings, timeLeft }) => {
  const { title, description, logoUrl, socialLinks } = settings;

  const starStyles = `
    .template-nine-preview {
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      font-family: 'Raleway', sans-serif;
      color: #fff;
    }

    .stars-container {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .star {
      position: absolute;
      background: #fff;
      border-radius: 50%;
      opacity: 0.5;
      animation: twinkle var(--duration) ease-in-out infinite;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .nine-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 20px;
      width: 100%;
      max-width: 800px;
    }

    .nine-logo {
      height: 40px;
      width: auto;
      margin-bottom: 20px;
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
    }

    .nine-h1 {
    font-size: clamp(1.2rem, 3vw, 2.5rem);
    font-weight: 200;
    letter-spacing: clamp(4px, 1vw, 12px);
    text-transform: uppercase;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: clamp(10px, 1.5vw, 25px);
    background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.4));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    }

    .nine-p {
      font-size: clamp(0.6rem, 0.9vw, 0.8rem);
      font-weight: 300;
      max-width: 450px;
      letter-spacing: 1px;
      opacity: 0.6;
      margin: 0 auto 25px;
      text-transform: uppercase;
    }

    .nine-counter {
      display: flex;
      justify-content: center;
      gap: clamp(6px, 1.5vw, 20px);
      margin-bottom: 30px;
    }

    .nine-time-unit {
      width: clamp(40px, 7vw, 70px);
      height: clamp(40px, 7vw, 70px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(5px);
    }

    .nine-time-val {
      font-size: clamp(0.9rem, 2vw, 1.8rem);
      font-weight: 700;
      display: block;
    }

    .nine-time-label {
      font-size: clamp(0.35rem, 0.5vw, 0.6rem);
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.4;
    }

    .nine-form {
      max-width: 320px;
      margin: 0 auto 20px;
      display: flex;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50px;
      padding: 4px;
      backdrop-filter: blur(10px);
    }

    .nine-input {
      flex: 1;
      padding: 8px 15px;
      background: transparent;
      border: none;
      color: #fff;
      font-size: clamp(0.6rem, 0.8vw, 0.75rem);
      outline: none;
    }

    .nine-input:focus {
      outline: none;
      box-shadow: none;
    }

    .nine-btn {
      background: #fff;
      color: #0c101b;
      border: none;
      border-radius: 40px;
      padding: 0 15px;
      font-weight: 950;
      font-size: clamp(0.5rem, 0.7vw, 0.7rem);
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }

    .nine-btn:hover {
      background: rgba(255,255,255,0.8);
      transform: scale(1.05);
    }

    .nine-social {
      display: flex;
      justify-content: center;
      gap: 15px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nine-social li a {
      color: #fff;
      opacity: 0.3;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nine-social li a:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  `;

  return (
    <div className="template-nine-preview">
      <style>{starStyles}</style>

      <div className="nine-content">
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="nine-logo" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
        )}
        <h1 className="nine-h1">{title === undefined || title === null ? "Coming Soon" : title}</h1>
        <p className="nine-p">{description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

        <div className="nine-counter">
          <div className="nine-time-unit">
            <span className="nine-time-val">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="nine-time-label">D</span>
          </div>
          <div className="nine-time-unit">
            <span className="nine-time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="nine-time-label">H</span>
          </div>
          <div className="nine-time-unit">
            <span className="nine-time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="nine-time-label">M</span>
          </div>
          <div className="nine-time-unit">
            <span className="nine-time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="nine-time-label">S</span>
          </div>
        </div>

        <div className="nine-form">
          <input type="email" placeholder="YOUR EMAIL ADDRESS" className="nine-input" readOnly />
          <button className="nine-btn">SUBSCRIBE</button>
        </div>

        <ul className="nine-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
};

export default Template9;
