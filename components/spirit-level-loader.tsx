"use client"

import { motion } from "framer-motion"

interface SpiritLevelLoaderProps {
  size?: number
  className?: string
}

export function SpiritLevelLoader({ size = 80, className = "" }: SpiritLevelLoaderProps) {
  const bubbleVariants = {
    initial: { x: -size * 0.3, y: size * 0.2 },
    animate: {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.5,
      },
    },
  }

  const containerVariants = {
    animate: {
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        variants={containerVariants}
        animate="animate"
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Outer Circle */}
        <div
          className="absolute inset-0 rounded-full border-2 border-[#36be82]/30 bg-background/50 backdrop-blur-sm"
          style={{ width: size, height: size }}
        />

        {/* Inner Circle Guide */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#36be82]/20"
          style={{ width: size * 0.3, height: size * 0.3 }}
        />

        {/* Center Dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#36be82]/40"
          style={{ width: 2, height: 2 }}
        />

        {/* Bubble */}
        <motion.div
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#36be82] to-[#2da66f] shadow-lg"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            boxShadow: "0 0 20px rgba(54, 190, 130, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Bubble Highlight */}
          <div
            className="absolute top-1 left-1 rounded-full bg-white/40"
            style={{ width: size * 0.08, height: size * 0.08 }}
          />
        </motion.div>

        {/* Level Lines */}
        <div className="absolute top-1/2 left-2 right-2 h-px bg-[#36be82]/20 transform -translate-y-1/2" />
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-[#36be82]/20 transform -translate-x-1/2" />
      </motion.div>
    </div>
  )
}
