import React, { useRef, useEffect } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const WHITE = "#ffffff";
const WHITE_DIM = "rgba(255,255,255,0.85)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template17({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks } = settings;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => { });
  }, []);

  const clockItems = [
    { val: timeLeft.days, label: "D" },
    { val: timeLeft.hours, label: "H" },
    { val: timeLeft.minutes, label: "M" },
    { val: timeLeft.seconds, label: "S" },
  ];

  const hasSocial = socialLinks?.facebook || socialLinks?.twitter || socialLinks?.youtube || socialLinks?.instagram;

  const template17Styles = `
    .t17-social {
      list-style: none;
      display: flex;
      gap: 16px;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .t17-social li a {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .t17-social li a:hover {
      color: #ffffff;
      transform: translateY(-2px);
    }
    .t17-social li a svg {
      width: 17px; height: 17px;
    }
  `;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{template17Styles}</style>

      {/* Colorful abstract background video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={settings.videoUrl || "https://awplife.com/wp-content/uploads/2026/04/123.mp4"} type="video/mp4" />
      </video>

      {/* Light overlay — let colorful video show through */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 1 }} />

      {/* ── TOP CENTER: Logo then Social (VERTICAL STACK) ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "16px 20px 10px",
        gap: "30px",
      }}>
        {/* Logo */}
        {logoUrl && logoUrl !== "null" && logoUrl !== "" && (
          <img src={logoUrl} alt="Logo"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        )}

        <ul className="t17-social">
          <StorefrontSocialLinks links={socialLinks} size={17} />
        </ul>
      </div>

      {/* ── CENTER: Countdown + Solid White Title ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "110px 30px 30px", /* top padding to avoid logo overlap */
      }}>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 0, marginBottom: "6px" }}>
          {clockItems.map(({ val, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", padding: "4px 10px" }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.3rem, 3.5vw, 2.4rem)",
                fontWeight: 700, color: WHITE,
              }}>{pad(val)}</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem", color: WHITE_DIM,
                marginLeft: "3px", fontWeight: 600,
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* SOLID WHITE Title — both fill AND stroke are white */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 6.5vw, 5rem)",
          lineHeight: 1.05,
          color: WHITE,
          WebkitTextStrokeWidth: "1.5px",
          WebkitTextStrokeColor: WHITE,
          textTransform: "uppercase",
          letterSpacing: "3px",
          margin: 0,
          textAlign: "center",
        }}>{title === undefined || title === null ? "Coming Soon" : title}</h1>
      </div>
    </div>
  );
}
