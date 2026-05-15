'use client';

import { motion } from 'framer-motion';

interface GradientOrb {
  id: number;
  x: string;
  y: string;
  size: number;
  color1: string;
  color2: string;
  duration: number;
  delay: number;
}

const orbs: GradientOrb[] = [
  {
    id: 1,
    x: '20%',
    y: '30%',
    size: 600,
    color1: 'rgba(60,20,120,0.4)',
    color2: 'rgba(30,10,80,0.1)',
    duration: 20,
    delay: 0,
  },
  {
    id: 2,
    x: '70%',
    y: '60%',
    size: 500,
    color1: 'rgba(0,40,100,0.35)',
    color2: 'rgba(0,20,60,0.1)',
    duration: 25,
    delay: 2,
  },
  {
    id: 3,
    x: '50%',
    y: '20%',
    size: 450,
    color1: 'rgba(0,80,100,0.2)',
    color2: 'rgba(0,40,60,0.05)',
    duration: 22,
    delay: 4,
  },
  {
    id: 4,
    x: '30%',
    y: '70%',
    size: 550,
    color1: 'rgba(40,10,90,0.3)',
    color2: 'rgba(20,5,50,0.08)',
    duration: 28,
    delay: 1,
  },
  {
    id: 5,
    x: '80%',
    y: '25%',
    size: 400,
    color1: 'rgba(0,60,90,0.25)',
    color2: 'rgba(0,30,50,0.05)',
    duration: 24,
    delay: 3,
  },
];

export default function MeshGradient({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color1}, ${orb.color2}, transparent 70%)`,
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
