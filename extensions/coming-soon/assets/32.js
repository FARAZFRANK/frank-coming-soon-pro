(function() {
    const canvas = document.getElementById("dinoCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const gameOverText = document.getElementById("gameOverText");
    const scoreText = document.getElementById("scoreText");

    let frames = 0;
    let score = 0;
    let gameSpeed = 5;
    let isGameOver = false;

    const dino = {
        x: 80,
        y: 160,
        w: 24,
        h: 24,
        dy: 0,
        jumpForce: 13,
        originalY: 160,
        grounded: false,
        jumpTimer: 0
    };

    let obstacles = [];

    function drawDino() {
        ctx.fillStyle = "#3b82f6"; // bright blue
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
        ctx.beginPath();
        ctx.roundRect(dino.x, dino.y, dino.w, dino.h, 8);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Inner core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(dino.x + 12, dino.y + 12, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawObstacles() {
        ctx.fillStyle = "#ef4444"; // vibrant red
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
        
        // Moving particles on ground
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
        
        // Background / Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dino physics
        dino.dy += 0.5; // gravity
        dino.y += dino.dy;

        if (dino.y + dino.h > 190) {
            dino.y = 190 - dino.h;
            dino.dy = 0;
            dino.grounded = true;
        } else {
            dino.grounded = false;
        }

        // Obstacles
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

            // Collision
            if(
                dino.x < obs.x + obs.w &&
                dino.x + dino.w > obs.x &&
                dino.y < obs.y + obs.h &&
                dino.y + dino.h > obs.y
            ) {
                isGameOver = true;
                gameOverText.style.display = "block";
            }
        }

        // Remove off-screen obstacles
        obstacles = obstacles.filter(obs => obs.x + obs.w > 0);

        drawGround();
        drawDino();
        drawObstacles();

        score++;
        if (score % 100 === 0) {
            gameSpeed += 0.2;
        }
        scoreText.innerText = "Score: " + Math.floor(score/10);

        frames++;
        requestAnimationFrame(update);
    }

    function jump() {
        if (dino.grounded && !isGameOver) {
            dino.dy = -dino.jumpForce;
            dino.grounded = false;
        }
        if (isGameOver) {
            reset();
        }
    }

    function reset() {
        isGameOver = false;
        gameOverText.style.display = "none";
        obstacles = [];
        score = 0;
        frames = 0;
        gameSpeed = 5;
        dino.y = dino.originalY;
        dino.dy = 0;
        requestAnimationFrame(update);
    }

    window.addEventListener("keydown", function(e) {
        if(e.code === "Space") {
            e.preventDefault();
            jump();
        }
    });

    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        jump();
    });
    
    canvas.addEventListener("mousedown", function(e) {
        e.preventDefault();
        jump();
    });

    // Resize handler for responsive canvas
    function resizeCanvas() {
        const wrapper = document.querySelector('.dino-game-wrapper');
        if(wrapper) {
            const w = Math.min(800, wrapper.clientWidth);
            canvas.style.width = w + "px";
            // Keep aspect ratio roughly 4:1
            canvas.style.height = (w / 4) + "px";
        }
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Start
    requestAnimationFrame(update);
})();
