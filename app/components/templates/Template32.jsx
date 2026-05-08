import React, { useEffect, useRef } from "react";
import { getPlatformColor, getPlatformIcon } from "../socialMediaUtils";

export default function Template32({ settings, timeLeft }) {
  const { 
    title, 
    description, 
    logoUrl, 
    bgImageUrl,
    socialLinks,
  } = settings;

  let socialList = [];
  try {
    socialList = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;
  } catch(e) {}

  const hasBg = bgImageUrl && bgImageUrl !== 'null' && bgImageUrl !== '';

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let frames = 0;
    let score = 0;
    let gameSpeed = 5;
    let isGameOver = false;
    let animationFrameId;

    const dino = {
        x: 80,
        y: 160,
        w: 24,
        h: 24,
        dy: 0,
        jumpForce: 13,
        originalY: 160,
        grounded: false
    };

    let obstacles = [];

    function drawDino() {
        ctx.fillStyle = "#3b82f6";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
        ctx.beginPath();
        ctx.roundRect(dino.x, dino.y, dino.w, dino.h, 8);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(dino.x + 12, dino.y + 12, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawObstacles() {
        ctx.fillStyle = "#ef4444";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(239, 68, 68, 0.8)";
        for(let i=0; i<obstacles.length; i++) {
            let obs = obstacles[i];
            ctx.beginPath();
            ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }

    function drawGround() {
        ctx.beginPath();
        ctx.moveTo(0, 190);
        ctx.lineTo(canvas.width, 190);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.stroke();
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        for(let i=0; i<canvas.width; i+=60) {
            let x = (i - (frames * gameSpeed * 0.5) % 60 + 60) % canvas.width;
            ctx.beginPath();
            ctx.arc(x, 190, 1.5, 0, Math.PI*2);
            ctx.fill();
        }
    }

    function update() {
        if(isGameOver) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        dino.dy += 0.5;
        dino.y += dino.dy;

        if (dino.y + dino.h > 190) {
            dino.y = 190 - dino.h;
            dino.dy = 0;
            dino.grounded = true;
        } else {
            dino.grounded = false;
        }

        if (frames % 120 === 0 || (frames % 80 === 0 && Math.random() > 0.6 && frames > 400)) {
            let obsHeight = Math.random() > 0.5 ? 25 : 40;
            obstacles.push({
                x: canvas.width,
                y: 190 - obsHeight,
                w: 20,
                h: obsHeight
            });
        }

        for(let i=0; i<obstacles.length; i++) {
            let obs = obstacles[i];
            obs.x -= gameSpeed;

            if(
                dino.x < obs.x + obs.w &&
                dino.x + dino.w > obs.x &&
                dino.y < obs.y + obs.h &&
                dino.y + dino.h > obs.y
            ) {
                isGameOver = true;
            }
        }

        obstacles = obstacles.filter(obs => obs.x + obs.w > 0);

        drawGround();
        drawDino();
        drawObstacles();
        
        // Draw score inside canvas
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "bold 16px 'Space Grotesk', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("Score: " + Math.floor(score/10), canvas.width - 20, 30);
        
        // Instruction
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.font = "bold 12px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE OR CLICK TO JUMP!", canvas.width / 2, 30);

        if(isGameOver) {
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            ctx.roundRect(canvas.width/2 - 100, canvas.height/2 - 40, 200, 80, 8);
            ctx.fill();
            ctx.fillStyle = "#ef4444";
            ctx.font = "bold 24px 'Space Grotesk', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height/2);
            ctx.fillStyle = "#94a3b8";
            ctx.font = "12px 'Inter', sans-serif";
            ctx.fillText("Click to Restart", canvas.width / 2, canvas.height/2 + 20);
        } else {
            score++;
            if (score % 100 === 0) gameSpeed += 0.2;
            frames++;
            animationFrameId = requestAnimationFrame(update);
        }
    }

    function jump() {
        if (dino.grounded && !isGameOver) {
            dino.dy = -dino.jumpForce;
            dino.grounded = false;
        }
        if (isGameOver) {
            isGameOver = false;
            obstacles = [];
            score = 0;
            frames = 0;
            gameSpeed = 5;
            dino.y = dino.originalY;
            dino.dy = 0;
            update();
        }
    }

    const handleKeyDown = (e) => {
        if(e.code === "Space") {
            e.preventDefault();
            jump();
        }
    };
    
    const handlePointerDown = (e) => {
        e.preventDefault();
        jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("pointerdown", handlePointerDown);

    update();

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        if(canvas) canvas.removeEventListener("pointerdown", handlePointerDown);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const template32Styles = `
    .template-32-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${hasBg ? 'transparent' : '#0f172a'};
        background-image: ${hasBg ? `url('${bgImageUrl}')` : 'radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 100%)'};
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        font-family: 'Inter', sans-serif;
        color: #f8fafc;
        padding: 2rem 1rem;
        box-sizing: border-box;
    }

    .t32-content {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 3rem 2rem;
        max-width: 850px;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .t32-logo img {
        margin-bottom: 1.5rem;
        max-height: 60px;
        width: auto;
        object-fit: contain;
    }

    .t32-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        margin-bottom: 1rem;
        color: #ffffff;
        letter-spacing: -0.02em;
        line-height: 1.1;
        background: linear-gradient(to bottom right, #ffffff 30%, #94a3b8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .t32-desc {
        font-size: 1.125rem;
        color: #94a3b8;
        margin-bottom: 2.5rem;
        line-height: 1.6;
        max-width: 600px;
    }

    .t32-dino-game {
        width: 100%;
        margin: 0 auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        background: #020617;
        box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.8);
        position: relative;
        overflow: hidden;
        aspect-ratio: 4 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .t32-dino-game canvas {
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
    }

    .t32-social {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        list-style: none;
        padding: 0;
        margin-top: 3rem;
    }

    .t32-social a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        color: #ffffff;
        transition: all 0.2s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .t32-social a:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 640px) {
        .t32-content {
            padding: 2rem 1.25rem;
        }
        .t32-dino-game {
            aspect-ratio: 2 / 1;
        }
    }
  `;

  return (
    <div className="template-32-container">
      <style>{template32Styles}</style>
      {settings.customFont !== 'Inter' && settings.customFont !== 'Space Grotesk' && (
         <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      )}

      <div className="t32-content">
        {logoUrl && logoUrl !== 'null' && logoUrl !== '' && (
          <div className="t32-logo">
            <img src={logoUrl} alt="Logo" />
          </div>
        )}

        <h1 className="t32-title">{title === undefined || title === null ? "Coming Soon" : title}</h1>
        <p className="t32-desc">{description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description}</p>

        <div className="t32-dino-game">
            <canvas ref={canvasRef} width="800" height="200"></canvas>
        </div>

        {socialList && Object.keys(socialList).length > 0 && (
          <ul className="t32-social">
            {Object.entries(socialList).map(([platform, url]) => {
              if (url && url !== "@" && url !== "") {
                return (
                  <li key={platform}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {getPlatformIcon(platform)}
                    </a>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
