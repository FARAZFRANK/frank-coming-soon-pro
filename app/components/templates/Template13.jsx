import React, { useRef, useEffect } from "react";

import { StorefrontSocialLinks } from "../SocialIcons";

const WHITE = "rgba(255,255,255,0.9)";
const DIM = "rgba(255,255,255,0.55)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template13({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks } = settings;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => { });
  }, []);

  const clockItems = [
    { val: timeLeft.days, cls: "days", label: "DAYS" },
    { val: timeLeft.hours, cls: "hours", label: "HOURS" },
    { val: timeLeft.minutes, cls: "minutes", label: "MIN" },
    { val: timeLeft.seconds, cls: "seconds", label: "SEC" },
  ];

  const hasSocial = socialLinks?.facebook || socialLinks?.twitter || socialLinks?.youtube || socialLinks?.instagram;

  const template13Styles = `
    .t13-social {
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      bottom: 3rem;
      left: 1rem;
      z-index: 6;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .t13-social li {
      position: relative;
      padding: 0.2rem 0;
    }
    .t13-social li a {
      display: flex;
      align-items: center;
      width: 30px;
      height: 30px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.5rem;
      transition: color 0.3s ease;
    }
    .t13-social li a:hover {
      color: #ffffff;
    }
    @media only screen and (max-width: 900px) {
      .t13-social {
        position: static;
        flex-direction: row;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
      }
    }
  `;

  return (
    <div className="template-thirteen-container" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito+Sans:wght@300;600&display=swap" rel="stylesheet" />
      <style>{template13Styles}</style>

      {/* Background Video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={settings.videoUrl || "https://cdn.pixabay.com/video/2023/09/13/180386-864121573_large.mp4"} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "rgba(0,0,0,0.25)", zIndex: 2 }} />

      {/* ── CENTERED MAIN CONTENT ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "20px 60px",
      }}>

        {/* Logo */}
        {logoUrl && logoUrl !== "null" && logoUrl !== "" && (
          <img src={logoUrl} alt="Logo"
            style={{ height: "50px", width: "auto", objectFit: "contain", marginBottom: "14px" }}
          />
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
          lineHeight: 1.1,
          color: "#ffffff",
          letterSpacing: "-0.5px",
          margin: "0 0 18px",
          textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}>{title === undefined || title === null ? "Coming Soon" : title}</h1>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: "0" }}>
          {clockItems.map(({ val, cls }) => (
            <div key={cls} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "6px 18px",
              borderRight: (cls === "days" || cls === "hours" || cls === "minutes")
                ? "1px solid rgba(255,255,255,0.15)" : "none",
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.6rem, 4.5vw, 3rem)",
                fontWeight: 700, color: WHITE, lineHeight: 1,
              }}>{pad(val)}</span>
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.6rem", fontWeight: 600,
                color: DIM, textTransform: "uppercase",
                letterSpacing: "2px", marginTop: "4px",
              }}>{cls.toUpperCase().slice(0, 1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOCIAL ICONS — Left side vertical ── */}
      <ul className="t13-social">
        <StorefrontSocialLinks links={socialLinks} size={24} />
      </ul>
    </div>
  );
}
