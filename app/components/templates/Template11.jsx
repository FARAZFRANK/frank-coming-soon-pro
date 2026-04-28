import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template11({ settings, timeLeft, isAdmin }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const template11Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

    .template-11-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: #f7f7f7;
      color: #1a1a1a;
      font-family: 'Montserrat', sans-serif;
      position: relative;
      overflow: hidden;
      padding: ${isAdmin ? "40px 20px" : "0"};
    }

    .t11-image-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 70%;
      height: 100%;
      background-image: url(${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? bgImageUrl : "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"});
      background-size: cover;
      background-position: center;
      z-index: 1;
    }

    .t11-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.05);
    }

    .t11-card {
      position: relative;
      z-index: 10;
      background: #ffffff;
      padding: ${isAdmin ? "50px 51px" : "80px 100px"};
      width: ${isAdmin ? "450px" : "650px"};
      margin-right: ${isAdmin ? "5%" : "10%"};
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15);
      text-align: left;
      border-radius: 2px;
    }

    .t11-logo {
      margin-bottom: ${isAdmin ? "30px" : "50px"};
      display: ${logoUrl && logoUrl !== "" && logoUrl !== "null" ? "block" : "none"};
    }

    .t11-logo img {
      max-height: ${isAdmin ? "40px" : "60px"};
      width: auto;
      object-fit: contain;
    }

    .t11-subtitle {
      font-size: ${isAdmin ? "11px" : "13px"};
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      margin-bottom: 20px;
    }

    .t11-title {
      font-family: 'Playfair Display', serif;
      font-size: ${isAdmin ? "clamp(30px, 4vw, 42px)" : "clamp(42px, 6vw, 64px)"};
      font-weight: 400;
      line-height: 1.2;
      margin-bottom: 24px;
      font-style: italic;
    }

    .t11-desc {
      font-size: ${isAdmin ? "14px" : "16px"};
      line-height: 1.8;
      color: #555;
      margin-bottom: ${isAdmin ? "30px" : "40px"};
    }

    .t11-timer {
      display: flex;
      gap: ${isAdmin ? "25px" : "40px"};
      margin-bottom: ${isAdmin ? "40px" : "60px"};
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
    }

    .t11-time-box {
      display: flex;
      flex-direction: column;
    }

    .t11-num {
      font-size: ${isAdmin ? "28px" : "36px"};
      font-weight: 500;
      color: #1a1a1a;
      line-height: 1;
    }

    .t11-label {
      font-size: 10px;
      text-transform: uppercase;
      color: #aaa;
      font-weight: 600;
      letter-spacing: 0.1em;
      margin-top: 5px;
    }

    .t11-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      margin-bottom: ${isAdmin ? "30px" : "50px"};
    }

    .t11-form input {
      padding: 15px 18px;
      border: 1px solid #e8e8e8;
      background: #fdfdfd;
      font-size: 15px;
      outline: none;
      color: #1a1a1a;
      transition: all 0.3s ease;
    }

    .t11-form input:focus {
        border-color: #1a1a1a;
        background: #fff;
    }

    .t11-form button {
      background: #1a1a1a;
      color: #fff;
      border: none;
      padding: 18px 30px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 13px;
    }

    .t11-form button:hover {
      background: #333;
      letter-spacing: 0.25em;
    }

    .t11-social {
      display: flex;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .t11-social a {
      color: #ccc;
      font-size: 20px;
      transition: color 0.3s ease;
    }

    .t11-social a:hover {
      color: #1a1a1a;
    }

    @media (max-width: 991px) {
        .t11-image-bg {
            width: 100%;
            height: 50%;
        }
        .template-11-container {
            flex-direction: column;
            justify-content: flex-end;
            background: white;
        }
        .t11-card {
            width: 100%;
            margin-right: 0;
            padding: 40px 30px;
            box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
        }
    }
  `;

  return (
    <div className="template-11-container">
      <style>{template11Styles}</style>

      <div className="t11-image-bg">
        <div className="t11-image-overlay" />
      </div>

      <div className="t11-card">
        <div className="t11-logo">
          {logoUrl && logoUrl !== "" && logoUrl !== "null" && (
            <img src={logoUrl} alt="Logo" />
          )}
        </div>

        {(countdownTitle === undefined || countdownTitle === null) ? <div className="t11-subtitle">Launching In...</div> : countdownTitle !== "" && <div className="t11-subtitle">{countdownTitle}</div>}

        <h1 className="t11-title">{(title === undefined || title === null) ? "A sophisticated launch awaits" : title}</h1>

        <p className="t11-desc">{(description === undefined || description === null) ? "Our atelier is currently perfecting a new range of artisanal pieces. Join our inner circle for an exclusive first look." : description}</p>

        <div className="t11-timer">
          <div className="t11-time-box">
            <span className="t11-num">{pad(timeLeft.days)}</span>
            <span className="t11-label">Days</span>
          </div>
          <div className="t11-time-box">
            <span className="t11-num">{pad(timeLeft.hours)}</span>
            <span className="t11-label">Hours</span>
          </div>
          <div className="t11-time-box">
            <span className="t11-num">{pad(timeLeft.minutes)}</span>
            <span className="t11-label">Mins</span>
          </div>
          <div className="t11-time-box">
            <span className="t11-num">{pad(timeLeft.seconds)}</span>
            <span className="t11-label">Secs</span>
          </div>
        </div>

        <form className="t11-form">
          <input type="email" placeholder="Email address" readOnly />
          <button type="button">Join the Circle</button>
        </form>

        <ul className="t11-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
