"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, TrendingUp, BarChart3, Brain, Target, Star, Command } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuroraBackground } from "@/components/aurora-background"
import { SpiritLevelLoader } from "@/components/spirit-level-loader"
import { ChallengesSolutions } from "@/components/challenges-solutions"

const HomePage = () => {
  const [commandOpen, setCommandOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <SpiritLevelLoader size={120} className="mb-8" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-muted-foreground text-lg">
            Calibrando a plataforma...
          </motion.p>
        </div>
      </div>
    )
  }

  // --- Definições de animação ---
  const glowVariants = {
    hover: {
      boxShadow: "0 0 0 1px rgba(54, 190, 130, 0.3), 0 0 20px rgba(54, 190, 130, 0.2), 0 0 40px rgba(54, 190, 130, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const cardGlowVariants = {
    hover: {
      boxShadow: "0 0 0 1px rgba(54, 190, 130, 0.4), 0 0 30px rgba(54, 190, 130, 0.15), 0 0 60px rgba(54, 190, 130, 0.05)",
      transition: { duration: 0.3 },
    },
  }

  const iconHoverVariants = {
    hover: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  }

  // CORRIGIDO: A propriedade `ease` foi movida para dentro do objeto `transition`
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const staggerContainer = {
    initial: "initial",
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30" style={{ backgroundImage: `radial-gradient(circle, rgba(54, 190, 130, 0.15) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
      <AuroraBackground />

      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              GeOver
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["Plataforma", "Recursos", "Preços", "Sobre"].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">{item}</Link>
                </motion.div>
              ))}
              <motion.button onClick={() => setCommandOpen(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg hover:border-[#36be82]/50 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Command className="w-4 h-4" />
                <span className="hidden sm:inline">Buscar</span>
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">⌘K</kbd>
              </motion.button>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={glowVariants} whileHover="hover">
                <Button className="bg-[#36be82] hover:bg-[#2da66f] text-white font-medium">Comece Grátis</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Badge variant="secondary" className="mb-6 px-4 py-2"><Zap className="w-4 h-4 mr-2" />Powered by AI</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8">
            Sua Jornada na Área <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">Geoespacial</span> Começa Aqui
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }} className="max-w-3xl mx-auto text-xl text-muted-foreground mb-12">
            Acesse projetos, publique serviços e desenvolva sua carreira com IA, tecnologia e dados de mercado.
          </motion.p>
          <motion.div
            // Usando a variante fadeInUp aqui, que já contém a transição correta
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            // A prop 'transition' aqui é redundante se já estiver em 'fadeInUp', mas se precisar de um delay, é assim:
            transition={{ delay: 0.4 }} 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={glowVariants} whileHover="hover">
              <Button size="lg" className="bg-[#36be82] hover:bg-[#2da66f] text-white text-lg px-8 py-4 rounded-xl font-medium">Comece grátis por 30 dias</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={cardGlowVariants} whileHover="hover">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl font-medium border-border/50 hover:border-[#36be82]/50">Ver Demo</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ChallengesSolutions />

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* CORRIGIDO: Tag zumbi '>' removida */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Uma plataforma construída para{" "}
              <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">
                performance
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-[800px]"
          >
            {/* ... Seu código do Bento Grid aqui ... */}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* CORRIGIDO: Tag zumbi </PointCloudAnimation> removida */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              O futuro da topografia é{" "}
              <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">
                inteligente
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Conectamos profissionais qualificados a oportunidades reais, usando IA para otimizar processos, reduzir
              custos e acelerar projetos. Uma plataforma que cresce com você.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* CORRIGIDO: Tag zumbi </PointCloudAnimation> removida */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Encontre o plano perfeito para você</h2>
          </motion.div>
     
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* ... Seu código da seção de Preços aqui ... */}
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border/50 relative">
        {/* ... Seu código do Footer aqui ... */}
      </footer>

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}

export default HomePage
