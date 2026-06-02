import React, { useEffect, useRef } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const EcoLogoIcon = () => (
  <svg style={{ height: "64px", width: "64px", margin: "0 auto", color: "#10B981" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Template27({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;
  const canvasRef = useRef(null);

  const defaultBg = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1080&auto=format&fit=crop";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() * 0.5) - 0.25,
        speedY: (Math.random() * 0.5) - 0.25
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#F0FDF4",
      color: "#1F2937",
      height: "100%",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

      {/* Background & Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('${bgImageUrl && bgImageUrl !== "null" ? bgImageUrl : defaultBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(240, 253, 244, 1) 0%, rgba(240, 253, 244, 0.7) 50%, rgba(240, 253, 244, 1) 100%)",
        zIndex: 2
      }} />

      {/* Particles Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}
      />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1rem", maxWidth: "600px" }}>

        {/* Top Section */}
        <div className="t27-top-section" style={{ marginBottom: "2rem" }}>
          {logoUrl && logoUrl !== "null" ? (
            <img src={logoUrl} alt="Logo" style={{ height: "40px", width: "auto", objectFit: "contain", margin: "0 auto 1.5rem" }} />
          ) : (
            <EcoLogoIcon />
          )}
          <h1 style={{ fontSize: "3.2rem", fontWeight: 700, color: "#1F2937", margin: 0, lineHeight: 1.1 }}>
            {(title === undefined || title === null) ? (
              <>Join the <span style={{ color: "#10B981" }}>Movement</span></>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: title.split(' ').map((w, i) => i === 0 ? `<span style="color: #10B981">${w}</span>` : w).join(' ') }} />
            )}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#4B5563", marginTop: "1rem", lineHeight: 1.6 }}>
            {description === undefined || description === null ? "We're building a sustainable future. Be the first to join our clean energy revolution." : description}
          </p>
        </div>

        {/* Countdown */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { l: "Days", v: timeLeft.days },
            { l: "Hours", v: timeLeft.hours },
            { l: "Mins", v: timeLeft.minutes },
            { l: "Secs", v: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{pad(item.v)}</div>
              <div style={{ fontSize: "0.55rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>{item.l}</div>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }}>
          <div className="t27-form-wrap">
            <input
              type="email"
              placeholder="Enter email address"
              disabled
              className="t27-input-preview"
            />
            <button
              disabled
              className="t27-submit-preview"
            >
              Stay Updated
            </button>
          </div>
        </div>

        <style>{`
          .t27-social {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 0;
            margin: 2.5rem 0 0;
          }
          .t27-social li {
            list-style: none;
          }
          .t27-social li a {
            color: #4B5563!important;
            display: flex;
          }
          .t27-form-wrap {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }
          @media (min-width: 640px) {
            .t27-form-wrap {
              flex-direction: row;
            }
          }
          .t27-input-preview {
            flex-grow: 1;
            background: #FFFFFF !important;
            border: 1px solid #D1D5DB !important;
            color: #1F2937 !important;
            padding: 0 1.5rem !important;
            border-radius: 9999px !important;
            transition: all 0.3s ease !important;
            outline: none !important;
            text-align: center !important;
            height: 48px !important;
            box-sizing: border-box !important;
            font-size: 0.9rem;
          }
          .t27-submit-preview {
            background-color: #10B981 !important;
            color: #fff !important;
            border: none !important;
            padding: 0 2rem !important;
            border-radius: 9999px !important;
            transition: all 0.3s ease !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            height: 48px !important;
            box-sizing: border-box !important;
            font-size: 0.9rem;
          }
          .t27-submit-preview:hover {
            background-color: #059669 !important;
          }
        `}</style>
        <ul className="t27-social">
          <StorefrontSocialLinks links={socialLinks} size={22} />
        </ul>
      </div>
    </div>
  );
}
