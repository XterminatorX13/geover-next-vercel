"use client" // É um componente cliente porque usa hooks (useState, useEffect)

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'

// --- Componentes Essenciais (Carregados Imediatamente) ---
import { Hero } from '@/components/sections/hero'
import { MainFooter } from '@/components/sections/main-footer' // O footer é leve, pode carregar direto
import { SpiritLevelLoader } from "@/components/spirit-level-loader"
import { AuroraBackground } from "@/components/aurora-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { motion } from "framer-motion"
import { Command } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// --- Placeholder de Carregamento para Componentes Dinâmicos ---
const SectionSkeleton = () => <div className="w-full h-[70vh] bg-transparent" />

// --- Componentes Pesados (Carregados sob Demanda) ---
const DynamicChallenges = dynamic(() => import('@/components/challenges-solutions').then(mod => mod.ChallengesSolutions), { ssr: false, loading: SectionSkeleton })
const DynamicFeatures = dynamic(() => import('@/components/sections/features').then(mod => mod.Features), { ssr: false, loading: SectionSkeleton })
const DynamicValueProp = dynamic(() => import('@/components/sections/value-prop').then(mod => mod.ValueProp), { ssr: false, loading: SectionSkeleton })
const DynamicPricing = dynamic(() => import('@/components/sections/pricing').then(mod => mod.Pricing), { ssr: false, loading: SectionSkeleton })

const HomePage = () => {
  const [commandOpen, setCommandOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  // As definições de animação podem ficar aqui ou ser movidas para um arquivo utils
  const glowVariants = {
    hover: {
      boxShadow: "0 0 0 1px rgba(54, 190, 130, 0.3), 0 0 20px rgba(54, 190, 130, 0.2), 0 0 40px rgba(54, 190, 130, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30" style={{ backgroundImage: `radial-gradient(circle, rgba(54, 190, 130, 0.15) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
      <AuroraBackground />

      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>GeOver</motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["Plataforma", "Recursos", "Preços", "Sobre"].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">{item}</Link></motion.div>
              ))}
              <motion.button onClick={() => setCommandOpen(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg hover:border-[#36be82]/50 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Command className="w-4 h-4" /><span className="hidden sm:inline">Buscar</span><kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">⌘K</kbd></motion.button>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={glowVariants} whileHover="hover"><Button className="bg-[#36be82] hover:bg-[#2da66f] text-white font-medium">Comece Grátis</Button></motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <main>
        <Hero />
        <DynamicChallenges />
        <DynamicFeatures />
        <DynamicValueProp />
        <DynamicPricing />
      </main>
      
      <MainFooter />
      
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}

export default HomePage
