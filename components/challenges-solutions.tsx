"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

export function ChallengesSolutions() {
  const challenges = ["Dados Desorganizados", "Orçamentos Incertos", "Falta de Visibilidade", "Processos Manuais"]

  const solutions = [
    "Portfólio Centralizado",
    "Análise de Mercado com IA",
    "Ranking Automatizado",
    "Automação Inteligente",
  ]

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: 0.5,
      },
    },
  } as const

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.6, -0.05, 0.01, 0.99] as const 
      } 
    }
  } as const

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0 }
  } as const

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Transformamos{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Desafios</span>{" "}
            em{" "}
            <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">Soluções</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 relative">
          {/* Challenges Column */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Desafios Atuais
            </h3>
            {challenges.map((challenge, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-red-500/5 border-red-500/20 hover:border-red-500/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <span className="text-lg font-medium">{challenge}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#36be82] mb-8 flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              Soluções GeOver
            </h3>
            {solutions.map((solution, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-[#36be82]/5 border-[#36be82]/20 hover:border-[#36be82]/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#36be82]" />
                      <span className="text-lg font-medium">{solution}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated SVG Path */}
          <motion.svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            width="200"
            height="400"
            viewBox="0 0 200 400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M 20 50 Q 100 100 180 150 Q 100 200 20 250 Q 100 300 180 350"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              variants={pathVariants}
              style={{
                filter: "drop-shadow(0 0 8px rgba(54, 190, 130, 0.4))",
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#36be82" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Topographic Contour Lines */}
          <motion.svg
            className="absolute inset-0 pointer-events-none opacity-20"
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M 0 ${100 + i * 80} Q 200 ${120 + i * 80} 400 ${100 + i * 80} Q 600 ${80 + i * 80} 800 ${100 + i * 80}`}
                stroke="#36be82"
                strokeWidth="1"
                fill="none"
                variants={pathVariants}
                transition={{ delay: i * 0.2 }}
              />
            ))}
          </motion.svg>
        </div>
      </div>
    </section>
  )
}
