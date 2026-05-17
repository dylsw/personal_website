'use client';

import { useEffect, useRef } from 'react';

const COUNT = 90;
const LINK_DIST = 130;
const SPEED = 0.25;

interface P {
  x: number; y: number;
  vx: number; vy: number;
  r: number; a: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.25 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,215,230,${p.a})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,205,225,${(1 - d / LINK_DIST) * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const start = () => { cancelAnimationFrame(animId); draw(); };

    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) start(); };

    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%',
          width: '60%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.09) 0%, transparent 70%)',
          animation: 'glow-1 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '55%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)',
          animation: 'glow-2 26s ease-in-out infinite',
        }} />
      </div>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" />
    </>
  );
}
