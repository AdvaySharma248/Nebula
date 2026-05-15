'use client'

import { BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKS = 4

const activityData: number[][] = [
  [3, 7, 2, 8, 5, 1, 6],
  [5, 9, 4, 6, 8, 3, 2],
  [2, 6, 8, 3, 7, 5, 4],
  [7, 4, 5, 9, 2, 6, 3],
]

function getIntensity(value: number): string {
  if (value <= 2) return 'rgba(124, 77, 255, 0.1)'
  if (value <= 4) return 'rgba(124, 77, 255, 0.25)'
  if (value <= 6) return 'rgba(124, 77, 255, 0.45)'
  if (value <= 8) return 'rgba(124, 77, 255, 0.65)'
  return 'rgba(124, 77, 255, 0.85)'
}

export default function ActivityHeatmap() {
  const [tooltip, setTooltip] = useState<{ day: string; week: number; value: number } | null>(null)

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-nebula-primary" />
          <h3 className="text-sm font-semibold text-white">Activity</h3>
        </div>
      </div>

      <div className="relative">
        {/* Day labels */}
        <div className="flex justify-between mb-1.5 px-0.5">
          {DAYS.map((day) => (
            <span key={day} className="text-[9px] text-nebula-text-secondary w-6 text-center">
              {day.charAt(0)}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1">
          {activityData.map((week, weekIdx) => (
            <div key={weekIdx} className="flex gap-1 justify-between">
              {week.map((value, dayIdx) => (
                <motion.div
                  key={`${weekIdx}-${dayIdx}`}
                  className="w-6 h-6 rounded-md cursor-pointer relative"
                  style={{ background: getIntensity(value) }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIdx * 7 + dayIdx) * 0.015, duration: 0.2 }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: '0 0 8px rgba(124, 77, 255, 0.4)',
                  }}
                  onHoverStart={() =>
                    setTooltip({ day: DAYS[dayIdx], week: weekIdx + 1, value })
                  }
                  onHoverEnd={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 glass-strong px-2 py-1 rounded-md text-xs text-white whitespace-nowrap z-10"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {tooltip.day}, Week {tooltip.week}: {tooltip.value} posts
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[9px] text-nebula-text-secondary">Less</span>
        {[0.1, 0.25, 0.45, 0.65, 0.85].map((opacity, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ background: `rgba(124, 77, 255, ${opacity})` }}
          />
        ))}
        <span className="text-[9px] text-nebula-text-secondary">More</span>
      </div>
    </div>
  )
}
