import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const SpoonForkIcon = () => (
  <svg style={{ height: "64px", width: "64px", margin: "0 auto" }} viewBox="0 0 24 24" fill="#D4A762">
    <path d="M16.2,12.8c-0.3-0.2-0.6-0.3-1-0.3c-0.8,0-1.5,0.3-2.1,0.8c-0.6,0.5-0.9,1.3-0.9,2.1c0,0.8,0.3,1.5,0.8,2.1 c0.5,0.6,1.2,0.9,2.1,0.9c0.8,0,1.5-0.3,2.1-0.8c0.6-0.5,0.9-1.3,0.9-2.1c0-0.5-0.1-1-0.4-1.4C17.3,13.6,16.8,13.1,16.2,12.8z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8 S16.4,20,12,20z M18,10h-4V4h-4v6H6l6,6L18,10z" />
  </svg>
);

export default function Template26({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const defaultBg = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080&auto=format&fit=crop";

  return (
    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: "#1a1a1a",
      color: "#e0e0e0",
      height: "100%",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" />

      {/* Background Mockup */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : defaultBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1
      }} />
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1rem", maxWidth: "600px" }}>

        {/* Header */}
        <div className="t26-top-section" style={{ marginBottom: "1.5rem" }}>
          {logoUrl && logoUrl !== "null" ? (
            <img src={logoUrl} alt="Logo" style={{ height: "35px", width: "auto", objectFit: "contain", margin: "0 auto 1.2rem", display: "block" }} />
          ) : (
            <SpoonForkIcon />
          )}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, color: "#D4A762", margin: 0, lineHeight: 1.1 }}>
            {title === undefined || title === null ? "Aroma Excellence" : title}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "1rem", lineHeight: 1.6, fontWeight: 300 }}>
            {description === undefined || description === null ? "Our master chefs are preparing a symphony of flavors. Join the waitlist for exclusive opening week reservations." : description}
          </p>
        </div>



        {/* Countdown */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { l: "Days", v: timeLeft.days },
            { l: "Hours", v: timeLeft.hours },
            { l: "Minutes", v: timeLeft.minutes },
            { l: "Seconds", v: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(26, 26, 26, 0.5)",
              border: "1px solid rgba(212, 167, 98, 0.2)",
              backdropFilter: "blur(4px)",
              borderRadius: "8px",
              padding: "0.8rem 0.5rem"
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#F3EFE0", lineHeight: 1 }}>{pad(item.v)}</div>
              <div style={{ fontSize: "0.6rem", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>{item.l}</div>
            </div>


          ))}
        </div>

        {/* Subscription */}
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <input type="email" placeholder="Enter email" disabled style={{ flex: 1, background: "rgba(26,26,26,0.7)", border: "1px solid rgba(212,167,98,0.4)", borderRadius: "6px", padding: "0.6rem 1rem", color: "#fff", fontSize: "0.9rem" }} />
            <button disabled style={{ background: "#D4A762", color: "#1a1a1a", border: "none", padding: "0.6rem 1.2rem", borderRadius: "6px", fontWeight: 700, fontSize: "0.9rem" }}>Notify Me</button>
          </div>
        </div>



        <style>{`.t26-social{list-style:none;display:flex;justify-content:center;gap:1.5rem;padding:0;margin:2rem 0 0}.t26-social li{list-style:none}.t26-social li a{color:#999!important;display:flex}`}</style>
        <ul className="t26-social">
          <StorefrontSocialLinks links={socialLinks} size={22} />
        </ul>
      </div>
    </div>
  );
}
