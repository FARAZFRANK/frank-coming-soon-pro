import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const Template8 = ({ settings, timeLeft }) => {
  const { title, description, socialLinks } = settings;

  const monoStyles = `
    .template-eight-preview {
      width: 100%;
      height: 100%;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Inter', sans-serif;
      padding: 40px;
      text-align: center;
    }

    .mono-h1 {
      font-size: 40px;
      font-weight: 200;
      text-transform: uppercase;
      letter-spacing: 12px;
      margin-bottom: 20px;
    }

    .mono-p {
      font-size: 10px;
      max-width: 453px;
      line-height: 2;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.6;
      margin-bottom: 40px;
    }

    .mono-counter {
      display: flex;
      gap: 30px;
      margin-bottom: 50px;
      border-top: 1px solid rgba(255,255,255,0.1);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 20px 0;
    }

    .mono-time-unit {
      min-width: 50px;
    }

    .mono-time-val {
      font-size: 20px;
      font-weight: 300;
      display: block;
      margin-bottom: 5px;
    }

    .mono-time-label {
      font-size: 7px;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.4;
    }

    .mono-form {
      width: 100%;
      max-width: 300px;
      position: relative;
      margin-bottom: 40px;
    }

    .mono-input {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      padding: 10px 0;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      outline: none;
      transition: border-color 0.3s;
    }

    .mono-input:focus {
      border-bottom-color: #fff;
      box-shadow: none;
    }

    .mono-btn {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      color: #fff;
      border: none;
      font-weight: 900;
      font-size: 10px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .mono-social {
      display: flex;
      justify-content: center;
      gap: 25px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .mono-social li a {
      color: #fff;
      opacity: 0.4;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mono-social li a:hover {
      opacity: 1;
    }
  `;

  return (
    <div className="template-eight-preview">
      <style>{monoStyles}</style>

      <h1 className="mono-h1">{title === undefined || title === null ? "Coming Soon" : title}</h1>
      <p className="mono-p">{description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

      <div className="mono-counter">
        <div className="mono-time-unit">
          <span className="mono-time-val">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="mono-time-label">Days</span>
        </div>
        <div className="mono-time-unit">
          <span className="mono-time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="mono-time-label">Hours</span>
        </div>
        <div className="mono-time-unit">
          <span className="mono-time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="mono-time-label">Minutes</span>
        </div>
        <div className="mono-time-unit">
          <span className="mono-time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="mono-time-label">Seconds</span>
        </div>
      </div>

      <div className="mono-form">
        <input type="email" placeholder="Email Address" className="mono-input" readOnly />
        <button className="mono-btn">Join</button>
      </div>

      <ul className="mono-social">
        <StorefrontSocialLinks links={socialLinks} />
      </ul>
    </div>
  );
};

export default Template8;
