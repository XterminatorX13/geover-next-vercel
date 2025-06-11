"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PointCloudAnimationProps {
  children: React.ReactNode
  className?: string
  gridSize?: number
  delay?: number
}

export function PointCloudAnimation({ children, className = "", gridSize = 12, delay = 0 }: PointCloudAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  // Generate grid points
  const points = Array.from({ length: gridSize * gridSize }, (_, i) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    return {
      id: i,
      x: (col / (gridSize - 1)) * 100,
      y: (row / (gridSize - 1)) * 100,
      delay: Math.random() * 0.3,
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const pointVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      backgroundColor: "#36be82",
    },
    visible: (custom: number) => ({
      scale: [0, 1.2, 0],
      opacity: [0, 1, 0],
      backgroundColor: ["#36be82", "#2da66f", "transparent"],
      transition: {
        duration: 0.6,
        delay: custom,
        ease: "easeOut",
      },
    }),
    final: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2, delay: 0.6 },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className={`relative ${className}`}>
      {/* Point Cloud Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {points.map((point) => (
          <motion.div
            key={point.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            variants={pointVariants}
            custom={point.delay}
            initial="hidden"
            animate={isVisible ? ["visible", "final"] : "hidden"}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div variants={contentVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </div>
  )
}
