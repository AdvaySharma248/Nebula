'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  className?: string
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    const val = num / 1_000_000
    return val % 1 === 0 ? `${val}M` : `${val.toFixed(1)}M`
  }
  if (num >= 1_000) {
    const val = num / 1_000
    return val % 1 === 0 ? `${val}K` : `${val.toFixed(1)}K`
  }
  return num.toString()
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const motionVal = useMotionValue(0)
  const display = useTransform(motionVal, (v) => formatNumber(Math.round(v)))
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animate(motionVal, value, {
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94], // ease-out cubic
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [motionVal, value])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
