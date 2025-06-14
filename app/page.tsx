Perfeito. Entendi.

A imagem e o link para o vscode.dev me dão o contexto completo da sua estrutura de arquivos atual. A sua organização está limpa e segue os padrões do Shadcn UI, com os componentes de UI em components/ui e os componentes mais complexos diretamente em components.

Você está na etapa final de refatoração para performance, e eu vou te guiar passo a passo. Vamos usar a sua estrutura de arquivos existente para fazer a otimização.

O Plano Final de Refatoração (Otimização Máxima)

O objetivo é transformar seu app/page.tsx (que atualmente é um arquivo monolítico com todo o código) em um "orquestrador" enxuto, onde cada seção é um componente separado e carregado de forma inteligente.

Siga estes passos.

Passo 1: Crie a Pasta das Seções

Dentro da sua pasta components, crie uma nova subpasta chamada sections. É aqui que vamos colocar os pedaços da sua landing page.

Passo 2: O Trabalho de "Recortar e Colar"

Você vai abrir seu app/page.tsx atual e começar a mover as seções para seus novos arquivos.

Crie src/components/sections/hero.tsx:

Crie este novo arquivo.

Volte para app/page.tsx, encontre a primeira tag <section> (a que contém o título "Sua Jornada...").

Recorte (Ctrl+X) todo o bloco, da <section> de abertura até a </section> de fechamento.

Cole dentro de um novo componente Hero no arquivo hero.tsx.

Adicione os imports necessários no topo do hero.tsx (para motion, Button, Badge, Link, etc.).

Exemplo do hero.tsx:

"use client" // Necessário por causa das animações
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
// ... adicione outros imports que ele usar

export const Hero = () => {
  // Se você tiver variantes de animação SÓ usadas aqui, mova-as para cá também
  const fadeInUp = { /* ... */ }
  const glowVariants = { /* ... */ }

  return (
    <section className="pt-32 pb-20 px-6 relative">
      {/* SEU CÓDIGO JSX DO HERO VAI AQUI */}
    </section>
  );
};


Crie src/components/sections/features.tsx:

Faça o mesmo para a seção do "Bento Grid". Recorte a <section> inteira do page.tsx e cole-a em um novo componente Features dentro deste arquivo.

Adicione todos os imports necessários (Card, CardContent, Brain, BarChart3, etc.).

Crie src/components/sections/value-prop.tsx:

Faça o mesmo para a seção com o título "O futuro da topografia é inteligente".

Crie src/components/sections/pricing.tsx:

Faça o mesmo para a seção "Encontre o plano perfeito para você".

Crie src/components/sections/main-footer.tsx:

Faça o mesmo para a tag <footer>.

Passo 3: A Montagem Final em app/page.tsx

Depois de mover todo o JSX para seus respectivos arquivos, seu app/page.tsx estará quase vazio. Agora é a hora de colar o código otimizado.

Substitua todo o conteúdo do seu app/page.tsx por este código final:

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
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Tsx
IGNORE_WHEN_COPYING_END

Depois de fazer essa refatoração, seu page.tsx será apenas um orquestrador limpo, e o Next.js poderá carregar o código de cada seção de forma independente e preguiçosa, resultando na performance máxima que você precisa.
