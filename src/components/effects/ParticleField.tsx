'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const COLORS = [
  'rgba(124,77,255,0.3)',
  'rgba(0,229,255,0.2)',
  'rgba(255,255,255,0.1)',
];

const CONNECTION_DISTANCE = 120;
const CONNECTION_OPACITY = 0.08;

export default function ParticleField({
  particleCount = 80,
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const createParticle = useCallback(
    (width: number, height: number): Particle => {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        color: COLORS[colorIndex],
        opacity: Math.random() * 0.5 + 0.3,
      };
    },
    []
  );

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(width, height)
      );
    },
    [particleCount, createParticle]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      dimensionsRef.current = { width, height };

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const resizeCtx = canvas.getContext('2d');
      if (resizeCtx) {
        resizeCtx.scale(dpr, dpr);
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawConnections = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity =
              CONNECTION_OPACITY * (1 - dist / CONNECTION_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,77,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const updateParticle = (particle: Particle, width: number, height: number) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges with padding
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Update and draw particles
      for (const particle of particles) {
        updateParticle(particle, width, height);
        drawParticle(particle);
      }

      // Draw connections
      drawConnections(particles);

      animationRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    initParticles(dimensionsRef.current.width, dimensionsRef.current.height);

    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  // Reinitialize particles when count changes
  useEffect(() => {
    initParticles(dimensionsRef.current.width, dimensionsRef.current.height);
  }, [particleCount, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
