import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template23({ settings, timeLeft }) {
  const { title, description, countdownTitle, logoUrl, socialLinks, bgImageUrl } = settings;

  const defaultBg = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      fontFamily: "'Roboto Condensed', sans-serif",
      background: "#111827",
      color: "#f3f4f6",
      overflow: "hidden"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />

      {/* Left Image Side */}
      <div style={{
        flex: "0 0 45%",
        backgroundImage: `url('${bgImageUrl || defaultBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          right: "-1px",
          width: "30px",
          height: "100%",
          background: "linear-gradient(to top right, #111827 49.5%, transparent 50%)",
          zIndex: 2
        }} />
      </div>

      {/* Right Content Side */}
      <main style={{
        flex: "0 0 55%",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "left"
      }}>
        <div style={{ maxWidth: "450px", marginLeft: "4rem" }}>

          {logoUrl && logoUrl !== "null" ? (
            <div style={{ marginBottom: "1.5rem" }}>
              <img src={logoUrl} alt="Logo" style={{ maxHeight: "35px", width: "auto", objectFit: "contain" }} />
            </div>
          ) : null}

          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "2.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            lineHeight: "1.1",
            marginBottom: "1rem",
            color: "#FBBF24"
          }}>
            {title === undefined || title === null ? "Construction" : title}
          </h1>

          <p style={{ fontSize: "1rem", color: "#9ca3af", marginBottom: "2rem", lineHeight: "1.6" }}>
            {description === undefined || description === null ? "Join us for our major launch! Something big is coming soon." : description}
          </p>


          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "2rem" }}>
            {[
              { v: timeLeft.days, l: "Days" },
              { v: timeLeft.hours, l: "Hours" },
              { v: timeLeft.minutes, l: "Mins" },
              { v: timeLeft.seconds, l: "Secs" }
            ].map((i, idx) => (
              <div key={idx} style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: "1" }}>{pad(i.v)}</div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "#9CA3AF", marginTop: "2px" }}>{i.l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "0.8rem" }}>{countdownTitle === undefined || countdownTitle === null || countdownTitle === "" ? "Get construction updates and launch news." : countdownTitle}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <input type="email" placeholder="Email address" disabled style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid #374151", borderRadius: "4px", padding: "10px 15px", color: "#fff", fontSize: "0.85rem" }} />
              <button disabled style={{ backgroundColor: "#FBBF24", border: "none", borderRadius: "4px", padding: "10px 20px", color: "#111827", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase" }}>
                Keep Me Posted
              </button>
            </div>
          </div>

          <style>{`.t23-social { list-style: none; display: flex; gap: 15px; align-items: center; padding: 0; margin: 0; } .t23-social li { list-style: none; } .t23-social li a { color: #9ca3af !important; display: flex; }`}</style>
          <ul className="t23-social">
            <StorefrontSocialLinks links={socialLinks} size={18} />
          </ul>
        </div>
      </main>
    </div>
  );
}
