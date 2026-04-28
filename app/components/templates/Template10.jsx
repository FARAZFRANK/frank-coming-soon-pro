import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const Template10 = ({ settings, timeLeft }) => {
  const { title, description, logoUrl, socialLinks } = settings;

  const studioStyles = `
    .template-ten-preview {
      width: 100%;
      height: 100%;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #1a1a1a;
      font-family: 'Poppins', sans-serif;
      padding: 40px;
      text-align: center;
      position: relative;
    }

    .studio-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
    }

    .studio-logo {
      width: 55px;
      margin-bottom: 35px;
      padding: 10px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .studio-h1 {
      font-size: 46px;
      font-weight: 700;
      color: #111;
      margin-bottom: 30px;
      letter-spacing: -0.5px;
    }

    .studio-p {
      font-size: 16px;
      color: #666;
      max-width: 500px;
      margin: 0 auto 45px;
      line-height: 1.6;
    }

    .studio-counter {
      display: flex;
      gap: 16px;
      margin-bottom: 45px;
    }

    .studio-time-box {
      background: #fff;
      min-width: 70px;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      border: 1px solid rgba(0,0,0,0.02);
    }

    .studio-time-val {
      font-size: 28px;
      font-weight: 800;
      display: block;
      color: #3b82f6;
    }

    .studio-time-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      color: #999;
    }

    .studio-form {
      width: 100%;
      max-width: 420px;
      display: flex;
      gap: 10px;
      margin-bottom: 40px;
    }

    .studio-input {
      flex: 1;
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 10px;
      padding: 16px 20px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;
    }

    .studio-input:focus {
      border-color: #3b82f6;
      box-shadow: none;
    }

    .studio-btn {
      background: #111;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 0 25px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
    }

    .studio-social {
      display: flex;
      justify-content: center;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .studio-social li a {
      color: #111;
      opacity: 0.5;
      font-size: 20px;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .studio-social li a:hover {
      opacity: 1;
      color: #3b82f6;
    }
  `;

  return (
    <div className="template-ten-preview">
      <style>{studioStyles}</style>
      <div className="studio-accent"></div>

      {logoUrl && (
        <img src={logoUrl} alt="Logo" className="studio-logo" style={{ width: "55px", height: "auto", objectFit: "contain" }} />
      )}
      
      <h1 className="studio-h1">{title === undefined || title === null ? "Coming Soon" : title}</h1>
      <p className="studio-p">{description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

      <div className="studio-counter">
        <div className="studio-time-box">
          <span className="studio-time-val">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="studio-time-label">Days</span>
        </div>
        <div className="studio-time-box">
          <span className="studio-time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="studio-time-label">Hrs</span>
        </div>
        <div className="studio-time-box">
          <span className="studio-time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="studio-time-label">Min</span>
        </div>
        <div className="studio-time-box">
          <span className="studio-time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="studio-time-label">Sec</span>
        </div>
      </div>

      <div className="studio-form">
        <input type="email" placeholder="Enter your email address" className="studio-input" readOnly />
        <button className="studio-btn">Notify Me</button>
      </div>

      <ul className="studio-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
    </div>
  );
};

export default Template10;
