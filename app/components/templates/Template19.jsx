import React, { useRef, useEffect, useState } from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

export default function Template19({ settings, timeLeft }) {
  const { title, logoUrl, socialLinks } = settings || {};
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  // Performance refs for game loop
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(true);
  const lastScoreSyncRef = useRef(0);

  // Constants
  const alienColors = ['#FF4081', '#7C4DFF', '#00BCD4', '#76FF03', '#FFC107'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let stars = [];
    let bullets = [];
    let enemies = [];
    let explosions = [];
    let lastBulletTime = 0;
    let lastEnemyTime = 0;

    // Player
    const player = {
      x: 100,
      y: 300,
      width: 60, height: 40,
      speed: 8
    };

    const keys = { left: false, right: false };

    class Star {
      constructor() {
        this.reset();
        this.y = Math.random() * 500;
        this.blinkSpeed = 0.05 + Math.random() * 0.05;
      }
      reset() {
        this.x = Math.random() * 1000;
        this.y = 0;
        this.size = 0.5 + Math.random() * 2;
        this.opacity = Math.random();
        this.increasing = Math.random() < 0.5;
      }
      update() {
        this.y += 0.2;
        if (this.y > 600) this.reset();
        if (this.increasing) {
          this.opacity += this.blinkSpeed;
          if (this.opacity >= 1) this.increasing = false;
        } else {
          this.opacity -= this.blinkSpeed;
          if (this.opacity <= 0) this.increasing = true;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawTank = (x, y, time) => {
      ctx.save();
      ctx.translate(x, y);
      const hoverOffset = Math.sin(time / 500) * 3;
      ctx.translate(0, hoverOffset);
      const centerX = 30;

      // Tread/Wheels
      ctx.fillStyle = '#5D4037';
      ctx.beginPath(); ctx.arc(12, 34, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(48, 34, 8, 0, Math.PI * 2); ctx.fill();

      // Body 
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(0, 12, 60, 20);

      // Turret
      ctx.fillStyle = '#2E7D32';
      ctx.beginPath(); ctx.arc(centerX, 16, 15, 0, Math.PI * 2); ctx.fill();

      // Cannon
      const recoil = Math.max(0, 6 - ((time - lastBulletTime) / 40));
      ctx.fillRect(26, -6 + recoil, 8, 24);
      ctx.restore();
    };

    const drawAlien = (x, y, color, time) => {
      ctx.save();
      ctx.translate(x + 30, y + 30);
      const scale = 1 + Math.sin(time / 500) * 0.1;
      ctx.scale(scale, scale);
      ctx.fillStyle = color || '#FFC107';
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.quadraticCurveTo(30, 0, 0, 32);
      ctx.quadraticCurveTo(-30, 0, 0, -32);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-10, -6, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(10, -6, 5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };

    const drawExplosion = (exp) => {
      const rad = exp.radius * (31 - exp.lifetime);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 100, 0, ${exp.lifetime / 30})`;
      ctx.arc(exp.x, exp.y, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    const collision = (r1, r2) => {
      return r1.x < r2.x + r2.width && r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;
    };

    stars = Array(50).fill().map(() => new Star());

    const update = (timestamp) => {
      if (!gameActiveRef.current) return;
      if (keys.left && player.x > 0) player.x -= player.speed;
      if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;

      stars.forEach(s => s.update());

      if (timestamp - lastBulletTime > 300) {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 16, speed: 5 });
        lastBulletTime = timestamp;
      }

      if (timestamp - lastEnemyTime > 1800) {
        enemies.push({
          x: Math.random() * (canvas.width - 60), y: -60,
          width: 60, height: 60, speed: 1.4,
          color: alienColors[Math.floor(Math.random() * alienColors.length)]
        });
        lastEnemyTime = timestamp;
      }

      bullets.forEach((b, i) => {
        b.y -= b.speed;
        if (b.y < 0) bullets.splice(i, 1);
      });

      enemies.forEach((e, i) => {
        e.y += e.speed;
        if (e.y > canvas.height) enemies.splice(i, 1);
        if (collision(player, e)) {
          gameActiveRef.current = false;
          setGameActive(false);
        }
        bullets.forEach((b, j) => {
          if (collision(b, e)) {
            explosions.push({ x: e.x + 15, y: e.y + 15, radius: 2, lifetime: 30 });
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            scoreRef.current += 10;
            if (timestamp - lastScoreSyncRef.current > 500) {
              setScore(scoreRef.current);
              lastScoreSyncRef.current = timestamp;
            }
          }
        });
      });

      explosions = explosions.filter(exp => {
        exp.lifetime -= 1;
        return exp.lifetime > 0;
      });
    };

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => s.draw());
      if (gameActiveRef.current) drawTank(player.x, player.y, timestamp);
      bullets.forEach(b => {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });
      enemies.forEach(e => drawAlien(e.x, e.y, e.color, timestamp));
      explosions.forEach(drawExplosion);
    };

    const loop = (timestamp) => {
      update(timestamp);
      draw(timestamp);
      animationId = requestAnimationFrame(loop);
    };

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        player.y = canvas.height - 100;
        player.x = canvas.width / 2 - 30;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const keydown = (e) => {
      if (e.key === 'ArrowLeft') keys.left = true;
      if (e.key === 'ArrowRight') keys.right = true;
      if ((e.key === 'r' || e.key === 'Enter') && !gameActiveRef.current) {
        gameActiveRef.current = true;
        setGameActive(true);
        scoreRef.current = 0;
        setScore(0);
        enemies = [];
        bullets = [];
        explosions = [];
      }
    };
    const keyup = (e) => {
      if (e.key === 'ArrowLeft') keys.left = false;
      if (e.key === 'ArrowRight') keys.right = false;
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  }, []);

  return (
    <div className="template-nineteen-container" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "linear-gradient(to bottom, #000044, #000000)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {!gameActive && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 10, color: "#ff4081", fontSize: "1.2rem", textAlign: "center",
          background: "rgba(0,0,0,0.85)", padding: "1.5rem", border: "4px solid #ff4081",
          fontFamily: "'Press Start 2P', cursive"
        }}>
          GAME OVER<br /><br />
          SCORE: {score}<br /><br />
          PRESS 'ENTER' TO RESTART
        </div>
      )}

      <div className="t19-overlay-content" style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem 1rem" }}>
        <div className="t19-top" style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 6, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2.5rem", pointerEvents: "none" }}>
          <div style={{ color: "#fff", fontSize: "0.8rem", fontFamily: "'Press Start 2P', cursive", pointerEvents: "auto" }}>SCORE: {score}</div>
          {logoUrl && (
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "1rem" }}>
              <img src={logoUrl} alt="Logo" style={{ height: "50px", width: "auto", objectFit: "contain" }} />
            </div>
          )}
          <div style={{ position: "relative" }}>
            <style>{`
              .t19-social-backend a { color: #fff; display: block; opacity: 0.8; transition: 0.3s; filter: drop-shadow(0 0 5px rgba(0, 255, 0, 0.5)); }
              .t19-social-backend a:hover { opacity: 1; color: #00ff00; filter: drop-shadow(0 0 10px #00ff00); transform: scale(1.1) translateY(-2px); }
            `}</style>
            <ul className="t19-social-backend" style={{ display: "flex", gap: "18px", listStyle: "none", padding: 0, margin: 0, pointerEvents: "auto", alignItems: "center" }}>
              <StorefrontSocialLinks links={socialLinks} size={28} />
            </ul>
          </div>
        </div>

        <div className="t19-center" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="t19-clock" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", pointerEvents: "auto" }}>
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} style={{ color: "#00ff00", fontSize: "1.5rem", textShadow: "0 0 10px #00ff00", fontFamily: "'Press Start 2P', cursive", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {pad(timeLeft[unit])}
                <span style={{ fontSize: "0.4rem", color: "#fff", marginTop: "4px" }}>{unit.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: "4rem", color: "transparent", WebkitTextStroke: "1px #fff", textTransform: "uppercase", marginTop: "20px", letterSpacing: "2px" }}>{title === undefined || title === null ? "COMING SOON" : title}</h1>
        </div>
      </div>
    </div >
  );
}
