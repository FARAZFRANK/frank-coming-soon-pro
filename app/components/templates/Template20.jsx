import React, { useEffect, useRef, useState } from "react";

const Template20 = ({ settings, timeLeft }) => {
  const { title } = settings || {};
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [msg, setMsg] = useState("READY?");

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const gridSize = 20;
    let w = 600;
    let h = 400;
    let rows = h / gridSize;
    let cols = w / gridSize;
    
    let snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
    let food = {x: 10, y: 10};
    let dx = 1, dy = 0;
    let nextDx = 1, nextDy = 0;
    let gameSpeed = 130;
    let lastTime = 0;
    let active = false;

    const spawnFood = () => {
      food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      };
    };

    const restart = () => {
      snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
      dx = 1; dy = 0;
      nextDx = 1; nextDy = 0;
      gameSpeed = 130;
      setScore(0);
      spawnFood();
      active = true;
      setGameActive(true);
    };

    const gameOver = () => {
      active = false;
      setGameActive(false);
      setMsg("Wasted");
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && dy === 0) nextDx = 0, nextDy = -1;
      if (e.key === 'ArrowDown' && dy === 0) nextDx = 0, nextDy = 1;
      if (e.key === 'ArrowLeft' && dx === 0) nextDx = -1, nextDy = 0;
      if (e.key === 'ArrowRight' && dx === 0) nextDx = 1, nextDy = 0;
      if (e.key === 'Enter' && !active) restart();
    };

    window.addEventListener('keydown', handleKeyDown);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Food
      ctx.fillStyle = '#FFB100';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFB100';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 4, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((s, i) => {
        ctx.shadowBlur = i === 0 ? 15 : 0;
        ctx.shadowColor = '#95BF47';
        ctx.fillStyle = i === 0 ? '#fff' : '#95BF47';
        ctx.fillRect(s.x * gridSize + 1, s.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      ctx.shadowBlur = 0;
    };

    const loop = (time) => {
      if (active && time - lastTime > gameSpeed) {
        lastTime = time;
        dx = nextDx; dy = nextDy;
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};

        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || 
            snake.some(s => s.x === head.x && s.y === head.y)) {
          gameOver();
        } else {
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            setScore(prev => prev + 100);
            spawnFood();
            if (gameSpeed > 70) gameSpeed -= 2;
          } else {
            snake.pop();
          }
        }
      }
      draw();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ 
      width: "100%", minHeight: "100%", position: "relative", overflowY: "auto", background: "#0a0a0a",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", 
      fontFamily: "'Inter', sans-serif", padding: "30px 20px 20px 20px", boxSizing: "border-box"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      
      {/* Responsive Canvas Game Box - scaled beautifully to fit card */}
      <div style={{
        position: "relative", width: "100%", maxWidth: "460px", aspectRatio: "3/2",
        border: "3px solid #95BF47", background: "rgba(149, 191, 71, 0.03)",
        borderRadius: "12px", boxShadow: "0 0 30px rgba(149, 191, 71, 0.15)",
        marginBottom: "15px", zIndex: 2
      }}>
        <canvas ref={canvasRef} width="600" height="400" style={{ width: "100%", height: "100%", display: "block" }} />
        
        {!gameActive && (
          <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "rgba(10, 10, 10, 0.96)", border: "2px solid #95BF47", padding: "15px 25px",
              textAlign: "center", borderRadius: "14px", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)", zIndex: 10,
              width: "80%", maxWidth: "270px"
          }}>
              <div style={{ color: "#95BF47", fontSize: "20px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px" }}>{msg}</div>
              <div style={{ fontSize: "10px", marginTop: "10px", color: "#FFB100", fontWeight: "700" }}>SCORE: {score}</div>
              <div style={{ fontSize: "8px", marginTop: "10px", color: "#fff", lineHeight: "1.8", opacity: 0.7 }}>
                  USE ARROW KEYS TO MOVE<br/>
                  PRESS 'ENTER' TO START
              </div>
          </div>
        )}
      </div>

      {/* Info elements below the game console */}
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5, textAlign: "center" }}>
        
        {/* Countdown Clock */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
          {["DAYS", "HOURS", "MINS", "SECS"].map((unit) => (
            <div key={unit} style={{ 
              display: "flex", flexDirection: "column", alignItems: "center",
              background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "6px 12px", borderRadius: "8px", minWidth: "65px"
            }}>
              <span style={{ color: "#fff", fontSize: "1.4rem", fontWeight: "900", lineHeight: "1.1" }}>
                {pad(timeLeft[unit.toLowerCase().replace('mins', 'minutes').replace('secs', 'seconds')])}
              </span>
              <span style={{ color: "#95BF47", fontSize: "0.6rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
                {unit}
              </span>
            </div>
          ))}
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: "1.8rem", fontWeight: "900", color: "#fff", textTransform: "uppercase", 
          margin: "5px 0 15px 0", letterSpacing: "-1px", lineHeight: "1.1" 
        }}>
          {title || "COMING SOON"}
        </h1>

        {/* Retro Neon Subscribe Form */}
        <div style={{ width: "100%", maxWidth: "400px", margin: "5px auto 0 auto" }}>
          <div style={{
            display: "flex", width: "100%", border: "1px solid rgba(149, 191, 71, 0.3)",
            borderRadius: "6px", overflow: "hidden", height: "46px",
            background: "rgba(149, 191, 71, 0.03)", alignItems: "center",
            boxShadow: "0 0 10px rgba(149, 191, 71, 0.05)"
          }}>
            <input 
              type="email" 
              placeholder={settings.inputPlaceholder || "Your Email Address"}
              disabled 
              style={{
                flex: 1, height: "100%", background: "transparent", border: "none",
                fontSize: "0.95rem", padding: "0 12px", outline: "none", color: "#fff",
                cursor: "not-allowed"
              }} 
            />
            <button style={{
              background: "#95BF47", color: "#000", border: "none",
              padding: "0 20px", fontWeight: "700", fontSize: "0.85rem",
              whiteSpace: "nowrap", height: "100%", cursor: "not-allowed"
            }}>
              {settings.buttonText || "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Floating XP Score Box */}
      <div style={{ 
        position: "absolute", top: "20px", left: "20px", background: "rgba(255, 177, 0, 0.1)", 
        border: "1px solid #FFB100", padding: "6px 12px", color: "#FFB100", fontWeight: "900", 
        fontSize: "12px", borderRadius: "5px", textTransform: "uppercase", letterSpacing: "1px", zIndex: 100
      }}>
        XP: {score}
      </div>
    </div>
  );
};

export default Template20;
