import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const MonitorIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const ChatIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
);

const SmileyIcon = () => (
  <svg style={{ height: "52px", width: "52px", margin: "0 auto 0.5rem" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#007AFF" strokeWidth="1.5" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5S9 10.329 9 9.5z" fill="#007AFF" />
    <path d="M13.5 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5z" fill="#007AFF" />
  </svg>
);

export default function Template24({ settings, timeLeft }) {
  const { title, description, logoUrl, socialLinks } = settings;

  const t24Styles = `
    .t24-social { list-style: none; display: flex; justify-content: center; gap: 1rem; padding: 0; margin: 1rem 0 0; }
    .t24-social li { list-style: none; }
    .t24-social li a { color: #007AFF !important; display: flex; }
    .t24-social li a svg { width: 20px; height: 20px; }
  `;

  return (
    <div style={{
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#F4F7FC",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      <style>{t24Styles}</style>

      {/* Animated Circles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[
          { w: 100, t: "10%", l: "5%" },
          { w: 60, t: "20%", l: "80%" },
          { w: 30, t: "70%", l: "15%" },
          { w: 80, t: "80%", l: "90%" },
          { w: 40, t: "50%", l: "50%" }
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            width: s.w, height: s.w,
            top: s.t, left: s.l,
            backgroundColor: "rgba(0, 122, 255, 0.08)",
            borderRadius: "50%"
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1.2rem", maxWidth: "580px", width: "100%" }}>

        {/* Top Section */}
        <div className="t24-top-section" style={{ marginBottom: "1.2rem" }}>
          {logoUrl && logoUrl !== "null" && logoUrl !== "" ? (
            <img src={logoUrl} alt="Logo" style={{ height: "32px", width: "auto", objectFit: "contain", margin: "0 auto 0.8rem", display: "block" }} />
          ) : (
            <SmileyIcon />
          )}
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a202c", margin: "0 0 0.4rem" }}>
            <span style={{ color: "#007AFF" }}>{title === undefined || title === null ? "Coming Soon" : title}</span>
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#4a5568", margin: 0, lineHeight: 1.6 }}>
            {description === undefined || description === null ? "Join our community of over 50,000 students learning from industry experts." : description}
          </p>
        </div>

        {/* Countdown */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", marginBottom: "1.2rem" }}>
          {[
            { l: "Days", v: timeLeft.days },
            { l: "Hours", v: timeLeft.hours },
            { l: "Minutes", v: timeLeft.minutes },
            { l: "Seconds", v: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.3rem", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "#007AFF" }}>{pad(item.v)}</div>
              <div style={{ fontSize: "0.55rem", color: "#4A5568", fontWeight: 500 }}>{item.l}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem", marginBottom: "1.2rem" }}>
          {[
            { t: "Expert-Led", d: "Learn from industry pros.", i: <MonitorIcon /> },
            { t: "Interactive", d: "Engage with hands-on labs.", i: <ChatIcon /> },
            { t: "Community", d: "Connect with 50k+ peers.", i: <UsersIcon /> }
          ].map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "8px", padding: "0.8rem 0.5rem", border: "1px solid #E2E8F0", textAlign: "center" }}>
              <div style={{ backgroundColor: "#EBF4FF", color: "#007AFF", borderRadius: "50%", padding: "0.4rem", display: "inline-flex", marginBottom: "0.4rem", width: "30px", height: "30px" }}>
                {f.i}
              </div>
              <h3 style={{ fontSize: "0.65rem", fontWeight: 700, margin: "0 0 0.2rem" }}>{f.t}</h3>
              <p style={{ fontSize: "0.55rem", color: "#4a5568", margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div style={{ maxWidth: "360px", margin: "0 auto" }}>
          <p style={{ marginBottom: "0.5rem", fontSize: "0.72rem", color: "#2d3748", fontWeight: 600 }}>Get notified when we launch!</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="email" placeholder="Email address" disabled style={{ flex: 1, padding: "0.55rem 0.8rem", borderRadius: "4px", border: "1px solid #cbd5e0", fontSize: "0.65rem" }} />
            <button disabled style={{ background: "#007AFF", color: "#fff", border: "none", padding: "0.55rem 1rem", borderRadius: "4px", fontWeight: 600, fontSize: "0.65rem", whiteSpace: "nowrap" }}>Notify Me</button>
          </div>
        </div>

        {/* Social Icons */}
        <ul className="t24-social">
          <StorefrontSocialLinks links={socialLinks} size={20} />
        </ul>
      </div>
    </div>
  );
}
