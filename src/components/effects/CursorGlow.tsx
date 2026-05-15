'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function subscribeToPointerCoarse(callback: () => void) {
  const mediaQuery = window.matchMedia('(pointer: coarse)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getPointerCoarseSnapshot() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function getPointerCoarseServerSnapshot() {
  return false; // Default to non-touch for SSR
}

export default function CursorGlow({
  className = '',
}: {
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useSyncExternalStore(
    subscribeToPointerCoarse,
    getPointerCoarseSnapshot,
    getPointerCoarseServerSnapshot
  );

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use rAF to throttle updates to animation frames
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 150);
        cursorY.set(e.clientY - 150);
      });

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[1] ${className}`}
      style={{
        x: springX,
        y: springY,
        width: 300,
        height: 300,
        background:
          'radial-gradient(circle, rgba(124,77,255,0.15) 0%, rgba(124,77,255,0.05) 30%, transparent 70%)',
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}
