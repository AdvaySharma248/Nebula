'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface StatsCounterProps {
  label: string
  value: number
  suffix?: string
}

export default function StatsCounter({ label, value, suffix = '' }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: 'easeOut',
      })
      return controls.stop
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [rounded])

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="text-3xl md:text-4xl font-black gradient-text">
        {displayValue}{suffix}
      </span>
      <span className="text-sm md:text-base text-[#94A3B8] font-medium">
        {label}
      </span>
    </motion.div>
  )
}
