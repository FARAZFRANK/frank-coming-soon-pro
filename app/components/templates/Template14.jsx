import React, { useRef, useEffect } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const GOLD = "#ffe8b7";
const DARK = "rgb(10,10,10)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template14({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks } = settings;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const clockItems = [
    { val: timeLeft.days,    cls: "days",    label: "D" },
    { val: timeLeft.hours,   cls: "hours",   label: "H" },
    { val: timeLeft.minutes, cls: "minutes", label: "M" },
    { val: timeLeft.seconds, cls: "seconds", label: "S" },
  ];

  const template14Styles = `
    .t14-social {
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 28px;
      margin: 0;
      padding: 0;
    }
    .t14-social li a {
      color: #ffe8b7;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .t14-social li a:hover {
      opacity: 0.7;
      transform: translateY(-3px);
    }
  `;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#1a0e08" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito+Sans:wght@300;600&display=swap" rel="stylesheet" />
      <style>{template14Styles}</style>

      {/* Background Video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={settings.videoUrl || "https://cdn.pixabay.com/video/2022/02/13/107573-678540733_large.mp4"} type="video/mp4" />
      </video>

      {/* ── Layer 1: Global dark overlay ── */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1 }} />

      {/* ── Layer 2: Dark center grid panel (matching CSS grid-overlay) ── */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%", height: "100%",
        width: "78%", maxWidth: "900px",
        background: "rgba(0,0,0,0.48)",
        transform: "translate3d(-50%, 0, 0)",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* ── Layer 3: Centered Content ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "16px 40px",
      }}>

        {/* Logo */}
        {logoUrl && logoUrl !== "null" && logoUrl !== "" && (
          <img src={logoUrl} alt="Logo"
            style={{ height: "44px", width: "auto", objectFit: "contain", marginBottom: "12px" }}
          />
        )}

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 0, marginBottom: "8px" }}>
          {clockItems.map(({ val, cls }) => (
            <div key={cls} style={{
              display: "flex", alignItems: "baseline",
              padding: "6px 12px",
              borderRight: (cls === "days" || cls === "hours" || cls === "minutes")
                ? "none" : "none",
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.4rem, 4.5vw, 2.6rem)",
                fontWeight: 700, color: GOLD, lineHeight: 1,
              }}>{pad(val)}</span>
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.7rem", color: GOLD,
                marginLeft: "4px", fontWeight: 400, opacity: 0.75,
              }}>{cls[0].toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Gold Stroke Title */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.6rem, 5.5vw, 4rem)",
          lineHeight: 1.05,
          color: "rgba(10, 10, 10, 0.65)",
          textShadow: "0 4px 25px rgba(0, 0, 0, 0.8)",
          WebkitTextStrokeWidth: "1.5px",
          WebkitTextStrokeColor: GOLD,
          textTransform: "uppercase",
          letterSpacing: "4px",
          margin: "0 0 14px",
        }}>{title === undefined || title === null ? "Coming Soon" : title}</h1>

        {/* Email form */}
        <div style={{ width: "100%", maxWidth: "360px", margin: "0 auto 14px" }}>
          <div style={{
            display: "flex",
            border: "1px solid rgba(255,232,183,0.25)",
            overflow: "hidden",
          }}>
            <input type="email" placeholder="Email Address" readOnly style={{
              flex: 1, height: "44px", padding: "0 14px",
              background: "rgba(0,0,0,0.7)", color: GOLD,
              border: "none", outline: "none",
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.78rem",
            }} />
            <button type="button" style={{
              background: GOLD, color: "#111",
              border: "none", padding: "0 16px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "1px", cursor: "pointer",
              whiteSpace: "nowrap",
            }}>NOTIFY ME</button>
          </div>
        </div>

        {/* Social icons — horizontal centered */}
        <ul className="t14-social">
          <StorefrontSocialLinks links={socialLinks} size={18} />
        </ul>
      </div>
    </div>
  );
}
