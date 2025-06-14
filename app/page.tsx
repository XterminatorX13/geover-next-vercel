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
