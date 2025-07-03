"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AuroraBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || theme !== "dark") {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(600px circle at 0% 0%, rgba(52, 211, 153, 0.15), transparent 50%), radial-gradient(800px circle at 80% 100%, rgba(16, 185, 129, 0.1), transparent 50%), radial-gradient(400px circle at 40% 40%, rgba(52, 211, 153, 0.1), transparent 50%)",
            "radial-gradient(600px circle at 100% 0%, rgba(16, 185, 129, 0.15), transparent 50%), radial-gradient(800px circle at 0% 100%, rgba(52, 211, 153, 0.1), transparent 50%), radial-gradient(400px circle at 60% 60%, rgba(16, 185, 129, 0.1), transparent 50%)",
            "radial-gradient(600px circle at 0% 100%, rgba(52, 211, 153, 0.15), transparent 50%), radial-gradient(800px circle at 100% 0%, rgba(16, 185, 129, 0.1), transparent 50%), radial-gradient(400px circle at 20% 80%, rgba(52, 211, 153, 0.1), transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Additional floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        initial={{ top: "20%", left: "10%" }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        initial={{ top: "60%", right: "15%" }}
      />
    </div>
  )
}
