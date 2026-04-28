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
      width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0a0a0a",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      
      <div style={{
        width: "600px", height: "400px", border: "3px solid #95BF47", background: "rgba(149, 191, 71, 0.03)",
        borderRadius: "12px", position: "relative", zIndex: 2, maxWidth: "90%", maxHeight: "55%", marginBottom: "20px"
      }}>
        <canvas ref={canvasRef} width="600" height="400" style={{ width: "100%", height: "100%" }} />
        
        {!gameActive && (
          <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "rgba(10, 10, 10, 0.95)", border: "2px solid #95BF47", padding: "30px",
              textAlign: "center", borderRadius: "20px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)", zIndex: 10
          }}>
              <div style={{ color: "#95BF47", fontSize: "20px", fontWeight: "900", textTransform: "uppercase" }}>{msg}</div>
              <div style={{ fontSize: "10px", marginTop: "15px", color: "#FFB100", fontWeight: "700" }}>SCORE: {score}</div>
              <div style={{ fontSize: "8px", marginTop: "15px", color: "#fff", lineHeight: "2", opacity: 0.7 }}>
                  USE ARROW KEYS TO MOVE<br/>
                  PRESS 'ENTER' TO START
              </div>
          </div>
        )}
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5 }}>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "15px" }}>
          {["DAYS", "HOURS", "MINS", "SECS"].map((unit) => (
            <div key={unit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#fff", fontSize: "2rem", fontWeight: "900" }}>{pad(timeLeft[unit.toLowerCase().replace('mins', 'minutes').replace('secs', 'seconds')])}</span>
              <span style={{ color: "#FFB100", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase" }}>{unit}</span>
            </div>
          ))}
        </div>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "900", color: "#fff", textTransform: "uppercase", margin: 0 }}>{title || "COMING SOON"}</h1>
      </div>

      <div style={{ position: "absolute", top: "30px", left: "30px", background: "rgba(255, 177, 0, 0.1)", border: "1px solid #FFB100", padding: "8px 16px", color: "#FFB100", fontWeight: "900", fontSize: "12px", borderRadius: "6px" }}>
        XP: {score}
      </div>
    </div>
  );
};

export default Template20;
