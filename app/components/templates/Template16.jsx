import React, { useRef, useEffect } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const WHITE    = "#ffffff";
const WHITE_DIM = "rgba(255,255,255,0.75)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template16({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks } = settings;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const clockItems = [
    { val: timeLeft.days,    label: "D" },
    { val: timeLeft.hours,   label: "H" },
    { val: timeLeft.minutes, label: "M" },
    { val: timeLeft.seconds, label: "S" },
  ];

  const template16Styles = `
    .t16-social {
      list-style: none;
      display: flex;
      gap: 18px;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .t16-social li {
      list-style: none;
    }
    .t16-social li a {
      color: rgba(255, 255, 255, 0.85);
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .t16-social li a:hover {
      color: #ffffff;
      transform: translateY(-2px);
    }
    .t16-social li a svg {
      width: 18px;
      height: 18px;
    }
  `;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0d1117" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{template16Styles}</style>

      {/* Background Video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.6)" }}>
        <source src={settings.videoUrl || "https://videos.pexels.com/video-files/7670836/7670836-uhd_2560_1440_30fps.mp4"} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)", zIndex: 1 }} />

      {/* ── TOP BAR: Logo left + Social right ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 5,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 30px",
      }}>
        {logoUrl && logoUrl !== "null" && logoUrl !== "" ? (
          <img src={logoUrl} alt="Logo"
            style={{ height: "38px", width: "auto", objectFit: "contain" }}
          />
        ) : (
          <div style={{ width: "40px" }} />
        )}

        <ul className="t16-social">
          <StorefrontSocialLinks links={socialLinks} size={18} />
        </ul>
      </div>

      {/* ── CENTER: Countdown + Outline Title ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "70px 30px 30px",
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

        {/* OUTLINE Title — transparent fill, white stroke */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 7vw, 5.5rem)",
          lineHeight: 1,
          color: "transparent",
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
