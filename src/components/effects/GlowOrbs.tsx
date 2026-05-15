'use client';

import { motion } from 'framer-motion';

interface GlowOrb {
  id: number;
  size: number;
  color: string;
  glowColor: string;
  x: string;
  y: string;
  floatX: number[];
  floatY: number[];
  duration: number;
  opacity: number;
}

const glowOrbs: GlowOrb[] = [
  {
    id: 1,
    size: 180,
    color: 'rgba(124,77,255,0.08)',
    glowColor: 'rgba(124,77,255,0.15)',
    x: '10%',
    y: '15%',
    floatX: [0, 15, -10, 8, 0],
    floatY: [0, -20, 10, -15, 0],
    duration: 18,
    opacity: 0.6,
  },
  {
    id: 2,
    size: 220,
    color: 'rgba(0,229,255,0.06)',
    glowColor: 'rgba(0,229,255,0.12)',
    x: '80%',
    y: '25%',
    floatX: [0, -12, 18, -8, 0],
    floatY: [0, 15, -12, 20, 0],
    duration: 22,
    opacity: 0.5,
  },
  {
    id: 3,
    size: 160,
    color: 'rgba(255,77,166,0.06)',
    glowColor: 'rgba(255,77,166,0.1)',
    x: '65%',
    y: '75%',
    floatX: [0, 20, -15, 10, 0],
    floatY: [0, -18, 12, -8, 0],
    duration: 20,
    opacity: 0.5,
  },
  {
    id: 4,
    size: 200,
    color: 'rgba(124,77,255,0.05)',
    glowColor: 'rgba(124,77,255,0.1)',
    x: '25%',
    y: '70%',
    floatX: [0, -18, 12, -6, 0],
    floatY: [0, 10, -20, 15, 0],
    duration: 25,
    opacity: 0.4,
  },
  {
    id: 5,
    size: 140,
    color: 'rgba(0,229,255,0.05)',
    glowColor: 'rgba(0,229,255,0.08)',
    x: '50%',
    y: '45%',
    floatX: [0, 10, -14, 6, 0],
    floatY: [0, -12, 16, -10, 0],
    duration: 19,
    opacity: 0.35,
  },
];

export default function GlowOrbs({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {glowOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            opacity: orb.opacity,
            background: `radial-gradient(circle, ${orb.glowColor}, ${orb.color}, transparent 70%)`,
            boxShadow: `0 0 ${orb.size / 2}px ${orb.glowColor}, 0 0 ${orb.size}px ${orb.color}`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: orb.floatX,
            y: orb.floatY,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
