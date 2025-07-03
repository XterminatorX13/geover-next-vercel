"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Zap,
  TrendingUp,
  Brain,
  Star,
  Command,
  MapPin,
  FileText,
  Download,
  Share2,
  Shield,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Satellite,
  Building,
  CheckCircle,
  Search,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuroraBackground } from "@/components/aurora-background"
import { SpiritLevelLoader } from "@/components/spirit-level-loader"

const HomePage = () => {
  const [commandOpen, setCommandOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [typedText, setTypedText] = useState("")
  const [currentStep, setCurrentStep] = useState(0)

  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const isHeroInView = useInView(heroRef)
  const isStatsInView = useInView(statsRef)

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

  // Typing animation effect
  useEffect(() => {
    const text = "Gerando proposta técnica completa..."
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
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
        "0 0 0 1px rgba(52, 211, 153, 0.3), 0 0 20px rgba(52, 211, 153, 0.2), 0 0 40px rgba(52, 211, 153, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const cardGlowVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow:
        "0 0 0 1px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.15), 0 0 60px rgba(52, 211, 153, 0.05)",
      transition: { duration: 0.3 },
    },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const stats = [
    { number: 3218, label: "Propostas geradas com IA", suffix: "" },
    { number: 15000, label: "Profissionais analisados", suffix: "+" },
    { number: 97, label: "Projetos entregues no prazo", suffix: "%" },
    { number: 40, label: "Redução de custo operacional", suffix: "%" },
  ]

  const AnimatedNumber = ({ number, suffix }: { number: number; suffix: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (isStatsInView) {
        const timer = setInterval(() => {
          setCount((prev) => {
            const increment = Math.ceil(number / 50)
            if (prev + increment >= number) {
              clearInterval(timer)
              return number
            }
            return prev + increment
          })
        }, 50)
        return () => clearInterval(timer)
      }
    }, [isStatsInView, number])

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2334D399' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      <AuroraBackground />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold text-[#34D399]" whileHover={{ scale: 1.05 }}>
              GeOver
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Plataforma", "Recursos", "Preços", "Sobre"].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#34D399] hover:bg-[#10B981] text-black font-medium">Comece Agora</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <Badge
              variant="secondary"
              className="mb-8 px-6 py-3 text-base bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20"
            >
              <Zap className="w-5 h-5 mr-2" />
              Powered by IA Multiagente Autônoma
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Seu trabalho mais rápido, preciso
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#34D399] to-[#10B981] bg-clip-text text-transparent">
              e com dados de mercado
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-muted-foreground">em tempo real</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Bem-vindo à Era da Automação</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto"
          >
            A GeOver conecta, executa e dá visibilidade. Da proposta ao portfólio — com inteligência.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div variants={glowVariants} whileHover="hover">
              <Button
                size="lg"
                className="bg-[#34D399] hover:bg-[#10B981] text-black text-lg px-8 py-4 rounded-xl font-semibold"
              >
                Comece Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-xl border-[#34D399]/50 hover:bg-[#34D399]/10 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Explorar Recursos
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">O Que Você Vê ao Entrar</h2>
            <p className="text-xl text-muted-foreground">Sua nova central de comando profissional</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div variants={cardGlowVariants} whileHover="hover" className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-black font-bold text-xl">
                      JS
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">João Silva</h3>
                      <p className="text-muted-foreground">CREA-SP 123456</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4 text-[#34D399]" />
                        <span className="text-sm">São Paulo, SP</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20">
                        <Satellite className="w-3 h-3 mr-1" />
                        Topógrafo GNSS
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20">
                        <Building className="w-3 h-3 mr-1" />
                        Cadastro Rural
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20">
                        <Clock className="w-3 h-3 mr-1" />
                        Prazo de Excelência
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Opportunities */}
            <motion.div variants={cardGlowVariants} whileHover="hover" className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Oportunidades em Destaque</h3>
                    <Button size="sm" variant="outline" className="border-[#34D399]/50 bg-transparent">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar Mais
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Levantamento Topográfico - Condomínio Residencial",
                        company: "Construtora ABC",
                        location: "Campinas, SP",
                        budget: "R$ 15.000 - R$ 25.000",
                        urgency: "Alta",
                        deadline: "15 dias",
                      },
                      {
                        title: "Cadastro Rural - Fazenda 500ha",
                        company: "Agropecuária XYZ",
                        location: "Ribeirão Preto, SP",
                        budget: "R$ 8.000 - R$ 12.000",
                        urgency: "Média",
                        deadline: "30 dias",
                      },
                    ].map((opportunity, index) => (
                      <div
                        key={index}
                        className="border border-border/50 rounded-lg p-4 hover:border-[#34D399]/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{opportunity.title}</h4>
                            <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                          </div>
                          <Badge variant={opportunity.urgency === "Alta" ? "destructive" : "secondary"}>
                            {opportunity.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {opportunity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {opportunity.deadline}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#34D399]">{opportunity.budget}</span>
                          <Button size="sm" className="bg-[#34D399] hover:bg-[#10B981] text-black">
                            Enviar Proposta
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GeOver Agent Section */}
      <section className="py-20 px-6 relative bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Como Funciona o <span className="text-[#34D399]">GeOver Agent</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Essa IA não conversa. Trabalha. Gera, organiza e entrega documentos reais.
            </p>

            {/* Typing Animation */}
            <div className="bg-card/50 backdrop-blur-sm border border-[#34D399]/20 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#34D399] animate-pulse"></div>
                <span className="font-mono text-[#34D399]">{typedText}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Leitura Automática",
                description: "Analisa editais e descrições de obra automaticamente",
                icon: FileText,
                active: currentStep === 0,
              },
              {
                step: 2,
                title: "Preenchimento Inteligente",
                description: "Gera cláusulas, escopo, prazo e custo baseado em dados reais",
                icon: Brain,
                active: currentStep === 1,
              },
              {
                step: 3,
                title: "Geração em PDF",
                description: "Proposta técnica completa pronta para envio",
                icon: Download,
                active: currentStep === 2,
              },
              {
                step: 4,
                title: "Integração Total",
                description: "Conecta com Notion, Excel, WhatsApp e ERPs",
                icon: Share2,
                active: currentStep === 3,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={cardGlowVariants}
                whileHover="hover"
                className={`relative ${step.active ? "ring-2 ring-[#34D399]/50" : ""}`}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        step.active ? "bg-[#34D399] text-black" : "bg-[#34D399]/10 text-[#34D399]"
                      }`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-bold ${
                        step.active ? "bg-[#34D399] text-black" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" className="bg-[#34D399] hover:bg-[#10B981] text-black font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Baixar Proposta Pronta
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Selos e Competências Técnicas</h2>
            <p className="text-xl text-muted-foreground">
              Cada selo é gerado com base em dados reais, entregas confirmadas e validação técnica
            </p>
            <p className="text-lg text-muted-foreground mt-2">Não é voto, é auditoria.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Satellite, title: "SIG e GNSS Profissional", color: "bg-blue-500/10 text-blue-500" },
              { icon: Building, title: "Cadastro Rural Validado", color: "bg-green-500/10 text-green-500" },
              { icon: Clock, title: "Entregas no Prazo", color: "bg-orange-500/10 text-orange-500" },
              { icon: CheckCircle, title: "Qualidade Técnica Confirmada", color: "bg-purple-500/10 text-purple-500" },
              { icon: Search, title: "Auditoria Territorial IA", color: "bg-red-500/10 text-red-500" },
              { icon: Users, title: "Reputação Aprovada por Pares", color: "bg-indigo-500/10 text-indigo-500" },
            ].map((badge, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="group">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}
                    >
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold">{badge.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Profile Preview Section */}
      <section className="py-20 px-6 relative bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Veja Seu Perfil Como o Mercado Verá</h2>
          </motion.div>

          <motion.div variants={cardGlowVariants} whileHover="hover" className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] mx-auto mb-4 flex items-center justify-center text-black font-bold text-2xl">
                    JS
                  </div>
                  <h3 className="text-2xl font-bold">João Silva</h3>
                  <p className="text-muted-foreground">CREA-SP 123456 • Topografia e Geodésia</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <MapPin className="w-4 h-4 text-[#34D399]" />
                    <span>São Paulo, SP</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3">Projetos Entregues</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Levantamentos Topográficos</span>
                        <span className="text-sm font-semibold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cadastros Rurais</span>
                        <span className="text-sm font-semibold">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Projetos GNSS</span>
                        <span className="text-sm font-semibold">31</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Avaliações</h4>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[#34D399] text-[#34D399]" />
                      ))}
                      <span className="text-sm font-semibold">4.9/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Baseado em 89 avaliações</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-[#34D399] hover:bg-[#10B981] text-black">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar Portfólio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planos</h2>
            <p className="text-xl text-muted-foreground">Escolha o plano ideal para seu crescimento</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Standard",
                price: "R$ 47",
                period: "/mês",
                features: [
                  "Portfólio e perfil básico",
                  "Visibilidade no mercado",
                  "Candidatura técnica",
                  "Busca de oportunidades",
                  "7,5% taxa de intermediação",
                ],
                buttonText: "Começar",
                popular: false,
              },
              {
                name: "Plus",
                price: "R$ 97",
                period: "/mês",
                features: [
                  "IA para propostas automáticas",
                  "Simulação de competência técnica",
                  "Dashboard avançado",
                  "Suporte prioritário",
                  "5% taxa de intermediação",
                ],
                buttonText: "Mais Popular",
                popular: true,
              },
              {
                name: "Pro",
                price: "R$ 197",
                period: "/mês",
                features: [
                  "IA Multiagente completa",
                  "API e integrações",
                  "Dashboard executivo",
                  "Suporte técnico 24/7",
                  "0% taxa de intermediação",
                ],
                buttonText: "Máximo Poder",
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={cardGlowVariants}
                whileHover="hover"
                className={`relative ${plan.popular ? "ring-2 ring-[#34D399]/50" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-[#34D399] text-black px-4 py-1 rounded-full font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300 h-full">
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
                          <Check className="w-5 h-5 text-[#34D399] mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-[#34D399] hover:bg-[#10B981] text-black"
                          : "border-[#34D399]/50 hover:bg-[#34D399]/10"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="#" className="text-[#34D399] hover:underline font-semibold">
              🔗 Soluções para empresas e órgãos públicos → ver detalhes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 relative bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Impacto Real</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#34D399] mb-2">
                  <AnimatedNumber number={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Segurança e Conformidade</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "AES-256", desc: "Criptografia militar" },
              { icon: CheckCircle, title: "SOC 2 Type II", desc: "Auditoria certificada" },
              { icon: FileText, title: "LGPD + GDPR", desc: "Conformidade total" },
              { icon: TrendingUp, title: "99.99% Uptime", desc: "Disponibilidade garantida" },
              { icon: Share2, title: "Integrações", desc: "Sistemas públicos e privados" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#34D399]/10 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-[#34D399]" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 relative bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">FAQ</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "O que é IA Multiagente?",
                answer:
                  "Sistema com múltiplas inteligências que atuam juntas para gerar contratos, propostas e dashboards automaticamente. Cada agente tem uma especialidade específica, trabalhando em conjunto para entregar resultados precisos.",
              },
              {
                question: "É seguro usar?",
                answer:
                  "Sim. A plataforma é criptografada, auditável e certificada com padrões internacionais. Utilizamos criptografia AES-256, certificação SOC 2 Type II e total conformidade com LGPD e GDPR.",
              },
              {
                question: "Preciso saber mexer em sistemas complexos?",
                answer:
                  "Não. Você verá tudo em cards, com botões simples e assistente visual que faz tudo com você. A interface foi projetada para ser intuitiva e familiar, similar aos aplicativos que você já usa.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-[#34D399]/30 transition-all duration-300">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-semibold">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#34D399]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {openFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#34D399] mb-4">GeOver</div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              A GeOver é mais que uma plataforma. É a nova camada de infraestrutura digital do mercado geoespacial.
              <br />
              <strong>Automatizada. Auditável. Escalável.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-[#34D399] hover:bg-[#10B981] text-black font-semibold">
                Quero Me Cadastrar
              </Button>
              <Button size="lg" variant="outline" className="border-[#34D399]/50 hover:bg-[#34D399]/10 bg-transparent">
                Quero Contratar Profissionais
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog Técnico
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>
            <p className="text-muted-foreground">© 2025 GeOver. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Command Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCommandOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#34D399] hover:bg-[#10B981] text-black rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center z-40 group"
        style={{
          boxShadow: "0 8px 32px rgba(52, 211, 153, 0.3)",
        }}
      >
        <Command className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
      </motion.button>

      {/* Command Menu */}
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}

export default HomePage
