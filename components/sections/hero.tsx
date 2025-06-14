<section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Badge variant="secondary" className="mb-6 px-4 py-2"><Zap className="w-4 h-4 mr-2" />Powered by AI</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-normal leading-snug mb-6 md:mb-8 break-words">
            Sua Jornada na Área <span className="bg-gradient-to-r from-[#36be82] to-[#2da66f] bg-clip-text text-transparent">Geoespacial</span> Começa Aqui
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }} className="max-w-3xl mx-auto text-xl text-muted-foreground mb-12">
            Acesse projetos, publique serviços e desenvolva sua carreira com IA, tecnologia e dados de mercado.
          </motion.p>
          
          {/* CORRIGIDO: A transição foi movida para uma prop direta no componente */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div  whileTap={{ scale: 0.95 }} variants={glowVariants} whileHover="hover">
              <Button size="lg" className="bg-[#36be82] hover:bg-[#2da66f] text-white text-lg px-8 py-4 rounded-xl font-medium">Comece grátis por 30 dias</Button>
            </motion.div>
            <motion.div  whileTap={{ scale: 0.95 }} variants={cardGlowVariants} whileHover="hover">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl font-medium border-border/50 hover:border-[#36be82]/50">Ver Demo</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
