"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

// REMOVIDO: O estado que guardava a posição do mouse.
// const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Calibrando a plataforma...
          </motion.p>
        </div>
      </div>
    )
  }

  const glowVariants = {
    hover: {
      boxShadow:
        "0 0 0 1px rgba(54, 190, 130, 0.3), 0 0 20px rgba(54, 190, 130, 0.2), 0 0 40px rgba(54, 190, 130, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const cardGlowVariants = {
    hover: {
      boxShadow:
        "0 0 0 1px rgba(54, 190, 130, 0.4), 0 0 30px rgba(54, 190, 130, 0.15), 0 0 60px rgba(54, 190, 130, 0.05)",
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
  
  // REMOVIDO: Todo o componente MagneticButton foi removido daqui.

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  // NOTE: Eu combinei os dois 'stagger' em um só, pois eram idênticos.

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      
      <div
        className="fixed inset-0 pointer-events-none z-5 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(54, 190, 130, 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <AuroraBackground />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              GeOver
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Plataforma", "Recursos", "Preços", "Sobre"].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg hover:border-[#36be82]/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Command className="w-4 h-4" />
                <span className="hidden sm:inline">Buscar</span>
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={glowVariants}
                whileHover="hover"
              >
                <Button className="bg-[#36be82] hover:bg-[#2da66f] text-white font-medium">Comece Grátis</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powered by AI
            </Badge>
          </motion.div>
         
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
          >
            Sua Jornada na Área{" "}
            <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">
              Geoespacial
            </span>{" "}
            Começa Aqui
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="max-w-3xl mx-auto text-xl text-muted-foreground mb-12"
          >
            Acesse projetos, publique serviços e desenvolva sua carreira com IA, tecnologia e dados de mercado.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* CORRIGIDO: O MagneticButton foi removido. Agora temos um motion.div simples. */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={glowVariants}
              whileHover="hover"
            >
              <Button
                size="lg"
                className="bg-[#36be82] hover:bg-[#2da66f] text-white text-lg px-8 py-4 rounded-xl font-medium"
              >
                Comece grátis por 30 dias
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={cardGlowVariants}
              whileHover="hover"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-xl font-medium border-border/50 hover:border-[#36be82]/50"
              >
                Ver Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ChallengesSolutions />

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
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
        {/* Large Feature Card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 lg:col-span-3 md:row-span-2"
        >
          <motion.div variants={cardGlowVariants} whileHover="hover">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#36be82]/30 transition-all duration-300 group">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-[#36be82]/10 dark:bg-[#36be82]/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-[#36be82]/20 dark:group-hover:bg-[#36be82]/30 transition-colors"
                    variants={iconHoverVariants}
                    whileHover="hover"
                  >
                    <Brain className="w-8 h-8 text-[#36be82]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">GeOver Agent</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Seu assistente IA para propostas, contratos e orçamentos. Automatize tarefas complexas e foque
                    no que realmente importa.
                  </p>
                </div>
                <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#36be82] animate-pulse"></div>
                    Processando orçamento automaticamente...
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Medium Feature Card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 lg:col-span-2"
        >
          <motion.div variants={cardGlowVariants} whileHover="hover">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#36be82]/30 transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-[#36be82]/10 dark:bg-[#36be82]/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-[#36be82]/20 dark:group-hover:bg-[#36be82]/30 transition-colors"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <BarChart3 className="w-6 h-6 text-[#36be82]" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Simulação de Orçamento</h3>
                <p className="text-muted-foreground">
                  Estimativas inteligentes com base em dados de mercado em tempo real.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Small Feature Card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 lg:col-span-1"
        >
          <motion.div variants={cardGlowVariants} whileHover="hover">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#36be82]/30 transition-all duration-300 group">
              <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-[#36be82]/10 dark:bg-[#36be82]/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-[#36be82]/20 dark:group-hover:bg-[#36be82]/30 transition-colors"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <Target className="w-6 h-6 text-[#36be82]" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">Precisão</h3>
                <p className="text-sm text-muted-foreground">99.9% de acurácia</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Wide Feature Card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-4 lg:col-span-3"
        >
          <motion.div variants={cardGlowVariants} whileHover="hover">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#36be82]/30 transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-[#36be82]/10 dark:bg-[#36be82]/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-[#36be82]/20 dark:group-hover:bg-[#36be82]/30 transition-colors"
                  variants={iconHoverVariants}
                  whileHover="hover"
                >
                  <TrendingUp className="w-6 h-6 text-[#36be82]" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Portfólio com Ranking</h3>
                <p className="text-muted-foreground mb-4">
                  Conquiste visibilidade com destaque automatizado baseado em performance.
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex-1 h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#36be82] to-[#2da66f]"
                        style={{ width: `${100 - i * 15}%` }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>

  {/* Value Proposition */}
  <section className="py-20 px-6 relative">
    <div className="max-w-6xl mx-auto">
      <PointCloudAnimation>
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
      </PointCloudAnimation>
    </div>
  </section>

  {/* Pricing Section */}
  <section className="py-20 px-6 relative">
    <div className="max-w-6xl mx-auto">
      <PointCloudAnimation>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Encontre o plano perfeito para você</h2>
        </motion.div>
      </PointCloudAnimation>

      <motion.div
        variants={listStaggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {[
          {
            name: "Standard",
            price: "R$47",
            period: "/mês",
            features: ["Perfil público e portfólio", "Candidatura a projetos", "Modelos de contrato"],
            buttonText: "Começar",
            buttonVariant: "outline" as const,
            popular: false,
          },
          {
            name: "Plus",
            price: "R$97",
            period: "/mês",
            features: [
              "Tudo do Standard",
              "Simulação de competência técnica",
              "Visibilidade aumentada",
              "GeOver Agent",
            ],
            buttonText: "Começar Teste Gratuito",
            buttonVariant: "default" as const,
            popular: true,
          },
          {
            name: "Pro",
            price: "R$197",
            period: "/mês",
            features: [
              "Tudo do Plus",
              "Zero taxa de intermediação",
              "Benchmark regional e ranking",
              "Suporte prioritário 24h",
            ],
            buttonText: "Fale com Vendas",
            buttonVariant: "secondary" as const,
            popular: false,
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-[#36be82] text-white px-4 py-1 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}
            <motion.div variants={cardGlowVariants} whileHover="hover">
              <Card
                className={`bg-card/50 backdrop-blur-sm border-border/50 h-full group hover:border-[#36be82]/30 transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-[#36be82]/20" : ""
                }`}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#36be82] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.buttonVariant === "default" ? (
                    <MagneticButton mousePosition={mousePosition}>
                      <Button
                        className="w-full bg-[#36be82] hover:bg-[#2da66f] text-white"
                        variant={plan.buttonVariant}
                      >
                        {plan.buttonText}
                      </Button>
                    </MagneticButton>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={cardGlowVariants}
                      whileHover="hover"
                    >
                      <Button
                        className={`w-full ${
                          plan.buttonVariant === "outline"
                            ? "border-border/50 hover:border-[#36be82]/50 hover:bg-[#36be82]/10"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        variant={plan.buttonVariant}
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>

  {/* Footer */}
  <footer className="py-12 px-6 border-t border-border/50 relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <div className="mb-4 md:mb-0">
          <div className="text-2xl font-bold mb-2">GeOver</div>
          <p className="text-muted-foreground">© 2025 GeOver. Todos os direitos reservados.</p>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            LinkedIn
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            YouTube
          </Link>
        </div>
      </motion.div>
    </div>
  </footer>


export default HomePage
