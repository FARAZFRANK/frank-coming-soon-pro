import React, { useEffect, useRef } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template22({ settings, timeLeft }) {
  const { title, description, logoUrl, socialLinks } = settings;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let w = (canvas.width = canvas.parentElement.offsetWidth);
    let h = (canvas.height = canvas.parentElement.offsetHeight);

    const colors = ["#FFD700", "#F06292", "#4FC3F7", "#AED581", "#BA68C8"];
    const numConfetti = 100;
    const pieces = [];

    class Piece {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h - h;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 2 + 1;
        this.rotation = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
      }
      update() {
        this.y += this.speed;
        this.rotation += this.spin * 2;
        if (this.y > h) {
          this.y = -20;
          this.x = Math.random() * w;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const init = () => {
      for (let i = 0; i < numConfetti; i++) pieces.push(new Piece());
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

    const handleResize = () => {
      w = (canvas.width = canvas.parentElement.offsetWidth);
      h = (canvas.height = canvas.parentElement.offsetHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "relative",
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(45deg, #4A148C 0%, #880E4F 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      overflow: "hidden"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;700&display=swap" rel="stylesheet" />

      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />

      <main style={{
        position: "relative",
        zIndex: 1,
        width: "90%",
        maxWidth: "500px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        padding: "1.5rem 2rem",
        textAlign: "center",
        margin: "1rem auto"
      }}>
        {logoUrl && (
          <div style={{ marginBottom: "1.5rem" }}>
            <img src={logoUrl} alt="Logo" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
          </div>
        )}


        <p style={{ textTransform: "uppercase", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#F06292", marginBottom: "0.5rem" }}>
          Get Ready To
        </p>

        <h1 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "2.8rem",
          textTransform: "uppercase",
          lineHeight: "1",
          color: "#ffffff",
          margin: "0.75rem 0",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}>
          {title === undefined || title === null ? "Coming Soon" : title}
        </h1>

        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", padding: "0 1rem", lineHeight: "1.5" }}>
          {description === undefined || description === null ? "Something big is coming! Please sign up for our newsletter to receive exclusive updates." : description}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "1.5rem" }}>
          {[
            { v: timeLeft.days, l: "Days" },
            { v: timeLeft.hours, l: "Hours" },
            { v: timeLeft.minutes, l: "Mins" },
            { v: timeLeft.seconds, l: "Secs" }
          ].map((i, idx) => (
            <div key={idx} style={{ background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "10px", flex: 1 }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.6rem", lineHeight: "1" }}>{pad(i.v)}</div>
              <div style={{ fontSize: "0.45rem", textTransform: "uppercase", color: "#E1BEE7", marginTop: "2px" }}>{i.l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem" }}>Don't miss the party!</p>
          <div style={{ display: "flex", gap: "10px", flexDirection: "row", alignItems: "center" }}>
            <input type="email" placeholder="Enter your email" disabled style={{ flex: 1, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "40px", padding: "10px 15px", color: "#fff", fontSize: "0.75rem", textAlign: "center", outline: "none" }} />
            <button disabled style={{ backgroundImage: "linear-gradient(90deg, #F06292 0%, #FFA726 50%, #FFD600 100%)", border: "none", borderRadius: "40px", padding: "10px 20px", color: "#311B92", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", boxShadow: "0 4px 15px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </div>
        </div>

        <style>{`.t22-social { list-style: none; display: flex; justify-content: center; gap: 20px; padding: 0; margin: 0; } .t22-social li { list-style: none; } .t22-social li a { color: #fff !important; opacity: 0.9; display: flex; }`}</style>
        <ul className="t22-social">
          <StorefrontSocialLinks links={socialLinks} size={22} />
        </ul>
      </main>
    </div>
  );
}
