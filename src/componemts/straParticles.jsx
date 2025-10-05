import React, { useRef, useEffect } from "react";

// Effet de particules étoiles animées pour le fond
export default function StarParticles({ count = 22 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.4 + Math.random() * 2.5,
      dx: 0.4 + Math.random() * 0.9,
      dy: 0.2 + Math.random() * 0.7,
      twinkle: Math.random() * 2 * Math.PI,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.save();
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(s.twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe600";
        ctx.shadowColor = "#fffbe6";
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
        s.x += s.dx * 0.2;
        s.y += s.dy * 0.18;
        s.twinkle += 0.04 + Math.random() * 0.03;
        if (s.x > canvas.width) s.x = 0;
        if (s.y > canvas.height) s.y = 0;
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
