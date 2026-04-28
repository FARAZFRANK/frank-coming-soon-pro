import React, { useRef, useEffect } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const WHITE = "#ffffff";
const WHITE_DIM = "rgba(255,255,255,0.7)";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template18({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks, showSubscriberForm } = settings;
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

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#000" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Background Video */}
      <video key={settings.videoUrl || "default"} ref={videoRef} autoPlay muted loop playsInline
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={settings.videoUrl || "https://cdn.pixabay.com/video/2019/04/03/22555-328624767_large.mp4"} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1 }} />

      {/* ── TOP: Logo then Social ── */}
      <div style={{
        position: "absolute", top: "2rem", left: 0, right: 0,
        zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}>
        {logoUrl && logoUrl !== "null" && logoUrl !== "" && (
          <img src={logoUrl} alt="Logo"
            style={{ height: "45px", width: "auto", objectFit: "contain" }}
          />
        )}

        <style>{`.t18-social{list-style:none;display:flex;gap:20px;align-items:center;padding:0;margin:0}.t18-social li{list-style:none}.t18-social li a{color:#fff!important;display:flex;opacity:0.9}`}</style>
        <ul className="t18-social">
          <StorefrontSocialLinks links={socialLinks} size={18} />
        </ul>
      </div>

      {/* ── CENTER: Countdown + Outline Title + Form ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", paddingTop: "5vh",
      }}>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "1.5rem", marginBottom: "1rem" }}>
          {clockItems.map(({ val, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                fontWeight: 600, color: WHITE,
              }}>{pad(val)}</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem", color: WHITE,
                marginLeft: "5px", fontWeight: 700,
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* OUTLINE Title (Thin + GIF) */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "5rem",
          color: "transparent",
          WebkitTextStroke: "1px #ffffff",
          textTransform: "uppercase",
          letterSpacing: "2px",
          margin: "0.5rem 0 1rem",
          lineHeight: 1.1,
          textAlign: "center",
          backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFyZGFxeDJmZ3BlcnlnNXliYWFyYW5tNTY4dno0a2pldnJ5aGprbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U3qYN8S0j3bpK/giphy.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          mixBlendMode: "lighten",
          width: "90%",
        }}>{title === undefined || title === null ? "Coming Soon" : title}</h1>

        {/* Subscription Form (Match Image) */}
        <div style={{ width: "90%", maxWidth: "250px" }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", height: "35px", overflow: "hidden", borderRadius: "2px" }}>
            <input type="email" placeholder="Email Address" disabled
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "rgba(255,255,255,0.7)", padding: "0 10px",
                outline: "none", fontSize: "0.7rem"
              }}
            />
            <button disabled
              style={{
                background: "#d0d0d0", color: "#1a1a1a", border: "none",
                padding: "0 15px", fontWeight: 600, textTransform: "uppercase",
                cursor: "default", fontSize: "0.6rem"
              }}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
