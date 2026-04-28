import React, { useRef, useEffect } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const WHITE    = "#ffffff";
const WHITE_DIM = "rgba(255,255,255,0.8)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template15({ settings, timeLeft }) {
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

  const hasSocial = socialLinks?.facebook || socialLinks?.twitter || socialLinks?.youtube || socialLinks?.instagram;

  const template15Styles = `
    .t15-social {
      list-style: none;
      display: flex;
      gap: 18px;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .t15-social li a {
      color: rgba(255, 255, 255, 0.85);
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .t15-social li a:hover {
      color: #ffffff;
      transform: translateY(-2px);
    }
    .t15-social li a svg {
      width: 18px;
      height: 18px;
    }
  `;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{template15Styles}</style>

      {/* Background Video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={settings.videoUrl || "https://videos.pexels.com/video-files/7670835/7670835-uhd_2560_1440_30fps.mp4"} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1 }} />

      {/* ── TOP BAR: Logo left + Social right ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 5,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 36px",
      }}>
        {/* Logo */}
        {logoUrl && logoUrl !== "null" && logoUrl !== "" ? (
          <img src={logoUrl} alt="Logo"
            style={{ height: "40px", width: "auto", objectFit: "contain" }}
          />
        ) : (
          <div style={{ width: "40px" }} /> /* spacer when no logo */
        )}

        {/* Social icons */}
        <ul className="t15-social">
          <StorefrontSocialLinks links={socialLinks} size={18} />
        </ul>
      </div>

      {/* ── BOTTOM LEFT: Countdown + Title ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        zIndex: 5,
        padding: "0 36px 28px",
      }}>
        {/* Countdown */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: "4px" }}>
          {clockItems.map(({ val, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", marginRight: "6px" }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.2rem, 3.5vw, 2.4rem)",
                fontWeight: 700, color: WHITE,
              }}>{pad(val)}</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem", color: WHITE_DIM,
                marginLeft: "3px", fontWeight: 600,
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Large White Title */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 6.5vw, 5.5rem)",
          lineHeight: 1,
          color: WHITE,
          textTransform: "uppercase",
          letterSpacing: "3px",
          margin: 0,
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: WHITE,
        }}>{title === undefined || title === null ? "Coming Soon" : title}</h1>
      </div>
    </div>
  );
}
