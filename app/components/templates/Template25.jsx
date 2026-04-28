import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template25({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const defaultBg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop";

  return (
    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: "#fdfdfd",
      color: "#333",
      height: "100%",
      width: "100%",
      display: "flex",
      overflow: "hidden"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      
      {/* Split Layout */}
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        
        {/* Left Image Side */}
        <div style={{
          flex: "0 0 50%",
          backgroundImage: `url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : defaultBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          height: "100%"
        }} />

        {/* Right Content Side */}
        <div style={{
          flex: "0 0 50%",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}>
          <div style={{ width: "100%", maxWidth: "320px" }}>
            
            {/* Logo */}
            <div style={{ marginBottom: "2.5rem" }}>
              {logoUrl && logoUrl !== "null" ? (
                <img src={logoUrl} alt="Logo" style={{ height: "25px", width: "auto", objectFit: "contain", margin: "0 auto" }} />
              ) : (
                <div style={{ letterSpacing: "0.5em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 500 }}>Aura</div>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "1.5rem"
            }}>
              {title === undefined || title === null ? "Coming Soon" : title}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              marginBottom: "2rem",
              lineHeight: 1.8,
              fontWeight: 300
            }}>
              {description === undefined || description === null ? "Discover the exclusive new collection. Join our private list for early access and runway updates." : description}
            </p>

            {/* Countdown */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { l: "Days", v: timeLeft.days },
                { l: "Hours", v: timeLeft.hours },
                { l: "Mins", v: timeLeft.minutes },
                { l: "Secs", v: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#111", lineHeight: 1 }}>{pad(item.v)}</div>
                  <div style={{ fontSize: "0.45rem", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>{item.l}</div>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 500, marginBottom: "1rem" }}>Join the exclusive preview list.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  disabled 
                  style={{ 
                    background: "transparent", 
                    border: "none", 
                    borderBottom: "1px solid #ccc", 
                    padding: "0.5rem 0", 
                    textAlign: "center", 
                    fontSize: "0.8rem" 
                  }} 
                />
                <button 
                  disabled 
                  style={{ 
                    background: "#111", 
                    color: "#fff", 
                    padding: "0.8rem", 
                    fontSize: "0.65rem", 
                    letterSpacing: "0.2em", 
                    textTransform: "uppercase", 
                    fontWeight: 500 
                  }}
                >
                  Notify Me
                </button>
              </div>
            </div>

            {/* Social */}
            <style>{`.t25-social{list-style:none;display:flex;justify-content:center;gap:1.5rem;padding:0;margin:0}.t25-social li{list-style:none}.t25-social li a{color:#999!important;display:flex}`}</style>
            <ul className="t25-social">
              <StorefrontSocialLinks links={socialLinks} size={18} />
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
}
