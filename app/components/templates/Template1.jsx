import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template1({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const templateOneStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Outfit:wght@300;400;600&display=swap');

    .template-one-container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
      color: #fff;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
    }

    .template-one-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%);
      z-index: 2;
    }

    .home-particles {
      position: absolute;
      inset: 0;
      opacity: 0.2;
      z-index: 1;
      background: transparent;
    }

    .home-content {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 900px;
      padding: 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .home-logo {
      position: relative;
      margin-bottom: 30px;
      z-index: 10;
    }

    .home-logo img {
      height: 48px;
      width: auto;
      object-fit: contain;
    }

    .home-content h3 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 24px;
      opacity: 0.8;
    }

    .home-content h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 64px;
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 32px;
      letter-spacing: -1px;
    }

    .home-content p {
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      max-width: 600px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }

    .home-content__clock {
      display: flex;
      gap: 24px;
      margin-bottom: 40px;
      justify-content: center;
    }

    .time {
      font-size: 32px;
      font-weight: 800;
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .time span {
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      opacity: 0.9;
      text-transform: uppercase;
      font-weight: 400;
    }

    .mc-form {
      display: flex;
      width: 100%;
      max-width: 420px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }

    .mc-form input {
      flex: 1;
      padding: 12px 20px;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 14px;
    }

    .mc-form button {
      padding: 0 24px;
      background: #e9127b;
      color: #fff;
      border: none;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 1px;
    }

    .home-social {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 30px;
      list-style: none;
      padding: 0;
    }

    .home-social a {
      color: #fff;
      font-size: 25px;
      transition: 0.3s;
    }

    .home-social li:hover a {
      opacity: 1;
      color: #e9127b;
    }
  `;

  return (
    <div className="template-one-container" style={{
      backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-1.png')"
    }}>
      <style>{templateOneStyles}</style>
      <div className="home-particles">&nbsp;</div>

      <div className="home-content">
        <div className="home-logo">
          <img src={logoUrl && logoUrl !== "" && logoUrl !== "null" ? logoUrl : "/templates/logo-w.png"} alt="Logo" />
        </div>
        {(countdownTitle === undefined || countdownTitle === null) ? <h3 className="t1-subtitle">Launching In...</h3> : countdownTitle !== "" && <h3 className="t1-subtitle">{countdownTitle}</h3>}

        <div className="home-content__clock">
          <div className="time">{pad(timeLeft.days)} <span>D</span></div>
          <div className="time">{pad(timeLeft.hours)} <span>H</span></div>
          <div className="time">{pad(timeLeft.minutes)} <span>M</span></div>
          <div className="time">{pad(timeLeft.seconds)} <span>S</span></div>
        </div>

        <h1>{(title === undefined || title === null) ? "Coming Soon" : title}</h1>
        <p>{(description === undefined || description === null) ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

        <div className="mc-form">
          <input type="email" placeholder="Email Address" readOnly />
          <button>NOTIFY ME</button>
        </div>

        <ul className="home-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>
      </div>
    </div>
  );
}
