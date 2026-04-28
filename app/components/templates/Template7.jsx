import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const Template7 = ({ settings, timeLeft }) => {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const glassStyles = `
    .template-seven-preview {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      position: relative;
      overflow: hidden;
      font-family: 'Outfit', sans-serif;
      color: #fff;
    }

    .mesh-gradient {
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
      filter: blur(100px);
      animation: mesh-rotate 30s linear infinite;
      z-index: 1;
    }

    @keyframes mesh-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .glass-box {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 40px;
      width: 90%;
      max-width: 600px;
      text-align: center;
      z-index: 5;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .glass-logo {
      height: 50px;
      width: auto;
      margin-bottom: 25px;
    }

    .glass-h1 {
      font-size: clamp(1.5rem, 4vw, 2.8rem);
      font-weight: 900;
      margin: 10px 0 15px;
      line-height: 1.2;
      color: #ffffff;
    }

    .glass-p {
      font-size: clamp(0.7rem, 1vw, 0.9rem);
      opacity: 0.8;
      line-height: 1.6;
      max-width: 450px;
      margin: 0 auto 30px;
    }

    .glass-counter {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
    }

    .glass-time-unit {
      text-align: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 10px 15px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      min-width: 70px;
    }

    .glass-time-val {
      font-size: clamp(1.2rem, 2.5vw, 2rem);
      font-weight: 900;
      display: block;
    }

    .glass-time-label {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.6;
      margin-top: 2px;
    }

    .glass-form {
      display: flex;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      padding: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 400px;
      margin: 0 auto 30px;
    }

    .glass-input {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 0.8rem;
      padding: 10px 15px;
      flex: 1;
      outline: none;
    }

    .glass-input:focus {
      outline: none;
      box-shadow: none;
    }

    .glass-btn {
      background: #fff;
      color: #0f172a;
      border: none;
      border-radius: 10px;
      padding: 8px 20px;
      font-weight: 900;
      font-size: 0.7rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .glass-btn:hover {
      transform: translateY(-1px);
    }

    .glass-social {
      display: flex;
      justify-content: center;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .glass-social li a {
      color: #fff;
      opacity: 0.6;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glass-social li a:hover {
      opacity: 1;
    }
  `;

  return (
    <div className="template-seven-preview">
      <style>{glassStyles}</style>
      <div className="mesh-gradient"></div>
      
      <div class="glass-box">
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="glass-logo" style={{ height: "50px", width: "auto", objectFit: "contain", marginBottom: "25px" }} />
        )}
        <h1 className="glass-h1">{title === undefined || title === null ? "Coming Soon" : title}</h1>
        <p className="glass-p">{description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

        <div className="glass-counter">
          <div className="glass-time-unit">
            <span className="glass-time-val">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="glass-time-label">Days</span>
          </div>
          <div className="glass-time-unit">
            <span className="glass-time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="glass-time-label">Hrs</span>
          </div>
          <div className="glass-time-unit">
            <span className="glass-time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="glass-time-label">Min</span>
          </div>
          <div className="glass-time-unit">
            <span className="glass-time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="glass-time-label">Sec</span>
          </div>
        </div>

        <div className="glass-form">
          <input type="email" placeholder="Enter your email" className="glass-input" readOnly />
          <button className="glass-btn">NOTIFY</button>
        </div>

        <ul className="glass-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
};

export default Template7;
