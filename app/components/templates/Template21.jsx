import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template21({ settings, timeLeft }) {
  const { title, description, logoUrl, socialLinks, countdownTitle } = settings;

  const clockItems = [
    { val: timeLeft.days,    label: "Days" },
    { val: timeLeft.hours,   label: "Hours" },
    { val: timeLeft.minutes, label: "Mins" },
    { val: timeLeft.seconds, label: "Secs" },
  ];

  const t21Styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@300;400&display=swap');
    .t21-wrap { font-family: 'Lato', sans-serif; }
    .t21-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #B88A8A; margin-bottom: 1rem; }
    .t21-h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 600; line-height: 1.1; margin-bottom: 0.8rem; color: #3D3232; }
    .t21-desc { font-size: 0.85rem; color: #6d5b5b; line-height: 1.7; margin-bottom: 1.4rem; max-width: 85%; margin-left: auto; margin-right: auto; }
    .t21-cdown-label { font-size: 0.75rem; color: #968484; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.8rem; }
    .t21-clock { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1.4rem; }
    .t21-clock-num { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 700; color: #3D3232; line-height: 1; }
    .t21-clock-lbl { font-size: 0.6rem; color: #968484; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 3px; }
    .t21-form-msg { font-size: 0.75rem; color: #968484; margin-bottom: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .t21-form-row { display: flex; gap: 8px; max-width: 340px; margin: 0 auto 1.2rem; }
    .t21-input-fake { flex: 1; padding: 8px 16px; border-radius: 99px; border: 1px solid #DCD0D0; background: transparent; font-size: 0.75rem; text-align: center; color: #888; }
    .t21-btn-fake { background: #B88A8A; color: #fff; border: none; padding: 0 20px; border-radius: 99px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .t21-social-row { display: flex; justify-content: center; gap: 12px; margin-top: 0.5rem; padding: 0; }
    .t21-social-row li { list-style: none; }
    .t21-social-row li a { color: #5C4B4B; background: white; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
    .t21-social-row li a svg { width: 14px; height: 14px; }
  `;

  return (
    <div className="t21-wrap" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#FBF6F5", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <style>{t21Styles}</style>

      {/* Background */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        backgroundImage: `url('${settings.bgImageUrl || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780&auto=format&fit=crop"}')`,
        backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "520px", textAlign: "center" }}>

        {/* Logo / Brand Name */}
        {logoUrl && logoUrl !== "null" && logoUrl !== "" ? (
          <img src={logoUrl} alt="Logo" style={{ height: "36px", width: "auto", objectFit: "contain", marginBottom: "1rem", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        ) : (
          <div className="t21-brand">Aura</div>
        )}

        {/* Title */}
        <h1 className="t21-h1">{title === undefined || title === null ? "Coming Soon" : title}</h1>

        {/* Description */}
        <p className="t21-desc">{description === undefined || description === null ? "Our next collection is almost ready for you. Sign up for early access." : description}</p>

        {/* Countdown */}
        <div>
          {(countdownTitle === undefined || countdownTitle === null) ? <p className="t21-cdown-label">Launching In...</p> : countdownTitle !== "" && <p className="t21-cdown-label">{countdownTitle}</p>}
          <div className="t21-clock">
            {clockItems.map(({ val, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className="t21-clock-num">{pad(val)}</span>
                <span className="t21-clock-lbl">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email Form */}
        <p className="t21-form-msg">Be the first to know.</p>
        <div className="t21-form-row">
          <input type="email" placeholder="Your email address" disabled className="t21-input-fake" />
          <button disabled className="t21-btn-fake">Join</button>
        </div>

        {/* Social Icons */}
        <ul className="t21-social-row">
          <StorefrontSocialLinks links={socialLinks} size={14} />
        </ul>
      </div>
    </div>
  );
}
