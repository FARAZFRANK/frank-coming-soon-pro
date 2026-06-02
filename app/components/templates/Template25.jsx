import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template25({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const defaultBg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop";

  const t25Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500&display=swap');
    
    .t25-wrap {
      font-family: 'Montserrat', sans-serif;
      background-color: #fdfdfd;
      color: #333;
      height: 100%;
      width: 100%;
      display: flex;
      overflow: hidden;
    }

    .t25-split {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .t25-img-side {
      flex: 0 0 50%;
      background-size: cover;
      background-position: center 30%;
      height: 100%;
    }

    .t25-info-side {
      flex: 0 0 50%;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
    }

    .t25-inner-card {
      width: 100%;
      max-width: 320px;
    }

    .t25-logo-box {
      margin-bottom: 1rem;
    }

    .t25-logo-img {
      height: 25px;
      width: auto;
      object-fit: contain;
      margin: 0 auto;
    }

    .t25-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.4rem, 3.5vw, 2rem);
      font-weight: 700;
      line-height: 1.15;
      margin: 0 0 0.8rem 0;
    }

    .t25-desc {
      font-size: clamp(0.7rem, 2vw, 0.8rem);
      color: #6b7280;
      margin: 0 0 1.2rem 0;
      line-height: 1.6;
      font-weight: 300;
    }

    .t25-clock {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.2rem;
    }

    .t25-clock-number {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: #111;
      line-height: 1;
    }

    .t25-clock-label {
      font-size: 0.5rem;
      color: #888;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .t25-sub-section {
      margin-bottom: 1.2rem;
      width: 100%;
    }

    .t25-prompt {
      font-size: 0.72rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .t25-form-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .t25-input-field {
      background: #fcfcfc !important;
      border: 1px solid #ddd !important;
      color: #333;
      padding: 0 12px;
      text-align: left;
      border-radius: 4px;
      font-size: 0.8rem;
      height: 38px;
      box-sizing: border-box;
      outline: none;
    }

    .t25-submit-btn {
      background-color: #111;
      color: #fff;
      border: 1px solid #111;
      padding: 0 15px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.7rem;
      height: 38px;
      border-radius: 4px;
      cursor: not-allowed;
      box-sizing: border-box;
    }

    .t25-social-list {
      border-top: 1px solid #eee;
      padding-top: 0.8rem;
      display: flex;
      justify-content: center;
      gap: 1.2rem;
      list-style: none;
      padding-left: 0;
      margin: 0;
    }

    .t25-social-list li {
      list-style: none;
    }

    .t25-social-list li a {
      color: #999 !important;
      font-size: 1.1rem;
      display: flex;
    }
  `;

  return (
    <div className="t25-wrap">
      <style>{t25Styles}</style>
      
      <div className="t25-split">
        {/* Left Image Side */}
        <div 
          className="t25-img-side"
          style={{ backgroundImage: `url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : defaultBg}')` }}
        />

        {/* Right Content Side */}
        <div className="t25-info-side">
          <div className="t25-inner-card">
            
            {/* Logo */}
            <div className="t25-logo-box">
              {logoUrl && logoUrl !== "null" ? (
                <img src={logoUrl} alt="Logo" className="t25-logo-img" />
              ) : (
                <div style={{ letterSpacing: "0.5em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 500 }}>Aura</div>
              )}
            </div>

            {/* Title */}
            <h1 className="t25-title">
              {title === undefined || title === null ? "Coming Soon" : title}
            </h1>

            {/* Description */}
            <p className="t25-desc">
              {description === undefined || description === null ? "Discover the exclusive new collection. Join our private list for early access and runway updates." : description}
            </p>

            {/* Countdown */}
            <div className="t25-clock">
              {[
                { l: "Days", v: timeLeft.days },
                { l: "Hours", v: timeLeft.hours },
                { l: "Mins", v: timeLeft.minutes },
                { l: "Secs", v: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i}>
                  <div className="t25-clock-number">{pad(item.v)}</div>
                  <div className="t25-clock-label">{item.l}</div>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <div className="t25-sub-section">
              <p className="t25-prompt">Join the exclusive preview list.</p>
              <div className="t25-form-row">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  disabled 
                  className="t25-input-field"
                />
                <button 
                  disabled 
                  className="t25-submit-btn"
                >
                  Notify Me
                </button>
              </div>
            </div>

            {/* Social */}
            <ul className="t25-social-list">
              <StorefrontSocialLinks links={socialLinks} size={15} />
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}
