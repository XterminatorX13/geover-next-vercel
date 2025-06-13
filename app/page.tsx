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
          <motion.div {...fadeInUp} transition={{ delay: 0.4, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

      {/* Features Section - Bento Grid */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Uma plataforma construída para <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">performance</span></h2>
          </motion.div>
          
          {/* CORRIGIDO: Linha de texto aleatória removida daqui. */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-[800px]">
            {/* O Bento Grid deve ser colado aqui */}
            {/* Exemplo de card para você colar os outros */}
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }} className="md:col-span-2 lg:col-span-3 md:row-span-2">
              <motion.div variants={cardGlowVariants} whileHover="hover">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#36be82]/30 transition-all duration-300 group">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <motion.div className="w-16 h-16 rounded-2xl bg-[#36be82]/10 dark:bg-[#36be82]/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-[#36be82]/20 dark:group-hover:bg-[#36be82]/30 transition-colors" variants={iconHoverVariants} whileHover="hover">
                        <Brain className="w-8 h-8 text-[#36be82]" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4">GeOver Agent</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">Seu assistente IA para propostas, contratos e orçamentos. Automatize tarefas complexas e foque no que realmente importa.</p>
                    </div>
                    <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground"><div className="w-2 h-2 rounded-full bg-[#36be82] animate-pulse"></div>Processando orçamento automaticamente...</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            {/* ... cole os outros cards do seu bento grid aqui ... */}
          </motion.div>
        </div>
      </section>

      {/* ... Resto do seu código para Value Proposition, Pricing, Footer ... */}

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}

export default HomePage
