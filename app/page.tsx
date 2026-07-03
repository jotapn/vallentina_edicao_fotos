"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, ChevronDown, Camera, Image, Sun, Crop, Layers, Palette } from "lucide-react";
import { ComparisonSlider } from "@/components/comparison-slider";

const IMAGES = {
  hero: "/generated-elegant-architectural-interior-photograp-1782826860705.png",
  beforeAfter: "/generated-interior-photography-before-and-after-co-1782826882286.png",
  portfolio: [
    "/generated-modern-luxury-bathroom-interior-photogra-1782826898762.png",
    "/generated-minimalist-modern-kitchen-interior-photo-1782826899919.png",
    "/generated-modern-building-facade-architecture-phot-1782826898926.png",
    "/generated-elegant-bedroom-interior-photography-neu-1782826901327.png",
    "/generated-modern-home-office-interior-photography--1782826919552.png",
    "/generated-luxury-living-room-with-high-ceilings-ch-1782826919956.png",
  ],
};

const SERVICES = [
  { icon: Camera, title: "Edição de fotos de arquitetura", description: "Valorizamos a geometria, as linhas e a luz natural de cada ambiente, destacando o projeto arquitetônico com precisão e sensibilidade estética." },
  { icon: Image, title: "Tratamento de imagens de interiores", description: "Cada cômodo ganha vida com cores equilibradas, texturas preservadas e uma atmosfera que convida a entrar — perfeito para portfólios e catálogos." },
  { icon: Sun, title: "Correção de luz, cor e perspectiva", description: "Ajustamos balanço de branco, exposição e distorções geométricas para que a imagem reflita fielmente a beleza do espaço real." },
  { icon: Crop, title: "Remoção de imperfeições", description: "Eliminamos elementos indesejados, fios aparentes, sombras incômodas e pequenos defeitos sem perder a naturalidade da cena." },
  { icon: Layers, title: "Realce de materiais e texturas", description: "Mármore, madeira, concreto, tecidos — cada material é tratado para revelar sua textura e profundidade com fidelidade tátil." },
  { icon: Palette, title: "Padronização visual para portfólios", description: "Criamos uma identidade visual coesa para seu acervo de imagens, garantindo harmonia entre todas as fotos do seu portfólio ou site." },
];

const PROCESS_STEPS = [
  { number: "01", title: "Envio das imagens", description: "Você envia suas fotos brutas por WeTransfer, Google Drive ou WhatsApp. Recebo e analiso cada imagem com atenção aos detalhes." },
  { number: "02", title: "Edição profissional personalizada", description: "Cada foto é tratada individualmente com correção de cor, luz, perspectiva e refinamento estético alinhado ao seu estilo e necessidades." },
  { number: "03", title: "Entrega final em alta qualidade", description: "Devolvo as imagens editadas em alta resolução, prontas para uso em portfólios, redes sociais, sites e materiais impressos." },
];

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4 font-medium">{children}</p>;
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-tight ${className}`}>{children}</h2>;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicos", label: "Serviços" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#processo", label: "Processo" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-neutral-100 shadow-sm"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className={`text-lg font-medium tracking-tight transition-colors duration-300 ${scrolled ? "text-neutral-900" : "text-white"}`}>
            Vallentina<span className={`font-light ${scrolled ? "text-neutral-300" : "text-white/50"}`}> Monteiro</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-300 tracking-wide ${scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-white/80 hover:text-white"}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#orcamento"
              className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 tracking-wide ${
                scrolled
                  ? "text-neutral-900 border border-neutral-300 hover:border-neutral-900"
                  : "text-white border border-white/50 hover:bg-white hover:text-neutral-900"
              }`}
            >
              Solicitar orçamento
            </a>
          </nav>

          <button
            className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? "text-neutral-700" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#orcamento"
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-neutral-900 border border-neutral-300 text-center py-3 rounded-full hover:border-neutral-900 transition-colors"
              >
                Solicitar orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={IMAGES.hero} alt="Fotografia de arquitetura" className="w-full h-full object-cover" width={1920} height={1080} decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xs tracking-[0.3em] uppercase text-white/70 mb-6 font-medium">
            Edição profissional de fotografia
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
            Edição de fotos de arquitetura com <span className="font-medium">olhar refinado</span> e acabamento profissional
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed font-light">
            Tratamento de imagens para arquitetos, designers de interiores, fotógrafos e imobiliárias que desejam apresentar seus projetos com mais elegância, luz e impacto visual.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#orcamento" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-100 transition-all duration-300 shadow-lg shadow-black/10">
              Solicitar orçamento <ArrowRight size={16} />
            </a>
            <a href="#antes-depois" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/40 text-white text-sm hover:bg-white/15 transition-all duration-300">
              Ver antes e depois
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section id="antes-depois" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <SectionLabel>Comparação visual</SectionLabel>
          <SectionTitle className="mb-12">Antes <span className="font-medium">&</span> Depois</SectionTitle>
        </FadeInSection>
        <FadeInSection className="mt-4">
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">Arraste a linha central para comparar o resultado da edição. Cada imagem é tratada com cuidado para revelar a verdadeira beleza do ambiente.</p>
        </FadeInSection>
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <ComparisonSlider beforeImage={IMAGES.beforeAfter} afterImage={IMAGES.hero} alt="Comparação de edição de fotografia de interiores" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-center">
          <FadeInSection className="md:col-span-3">
            <SectionLabel>Sobre</SectionLabel>
            <SectionTitle className="mb-6">Olhar preciso para cada detalhe</SectionTitle>
            <div className="space-y-4 text-neutral-500 leading-relaxed font-light">
              <p className="text-base md:text-lg">Sou Vallentina Monteiro, editora de fotos especializada em arquitetura e interiores. Meu trabalho é revelar a essência de cada espaço — a luz que atravessa uma janela, a textura de um revestimento, a harmonia das cores e a precisão das linhas arquitetônicas.</p>
              <p className="text-base md:text-lg">Com anos de experiência tratando imagens para arquitetos, designers, construtoras e imobiliárias, desenvolvi um olhar apurado para transformar fotografias brutas em imagens que comunicam sofisticação, conforto e qualidade.</p>
              <p className="text-base md:text-lg">Cada projeto é único. Por isso, dedico atenção personalizada a cada imagem, respeitando o estilo do profissional e a alma do ambiente, para entregar um resultado que supere expectativas.</p>
            </div>
          </FadeInSection>
          <FadeInSection className="md:col-span-2">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-200 shadow-sm">
              <img src={IMAGES.portfolio[3]} alt="Interior elegante" className="w-full h-full object-cover" width={600} height={800} decoding="async" />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <SectionLabel>Serviços</SectionLabel>
          <SectionTitle className="mb-4">O que posso fazer por suas imagens</SectionTitle>
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mb-16 leading-relaxed font-light">Tratamento profissional de fotografia com foco em arquitetura, interiores e imagens institucionais.</p>
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <FadeInSection key={service.title} className="h-full">
              <div className="group p-8 h-full rounded-2xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-neutral-900 transition-colors duration-500">
                  <service.icon size={20} className="text-neutral-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{service.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <SectionLabel>Portfólio</SectionLabel>
          <SectionTitle className="mb-4">Trabalhos selecionados</SectionTitle>
          <p className="text-neutral-500 text-base md:text-lg max-w-xl mb-16 leading-relaxed font-light">Uma amostra do meu trabalho com edição de imagens de arquitetura e interiores.</p>
        </FadeInSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {IMAGES.portfolio.map((src, idx) => (
            <FadeInSection key={src} className="h-full">
              <div className="group relative overflow-hidden rounded-xl bg-neutral-200 shadow-sm cursor-pointer">
                <img src={src} alt={`Projeto de arquitetura e interiores ${idx + 1}`} className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-105" width={600} height={450} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="processo" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <SectionLabel>Processo de trabalho</SectionLabel>
          <SectionTitle className="mb-16">Simples, direto e feito para você</SectionTitle>
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {PROCESS_STEPS.map((step) => (
            <FadeInSection key={step.number}>
              <div className="relative">
                <span className="text-6xl md:text-7xl font-light text-neutral-100 leading-none block mb-6 select-none">{step.number}</span>
                <h3 className="text-xl font-medium text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-light text-sm">{step.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
        <div className="hidden md:block relative mt-[-80px] mx-16">
          <svg width="100%" height="2" viewBox="0 0 1 1" preserveAspectRatio="none" className="text-neutral-100">
            <line x1="0" y1="0" x2="1" y2="0" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="orcamento" className="py-24 md:py-32 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <FadeInSection>
          <p className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-6 font-medium">Vamos trabalhar juntos</p>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-6">Transforme suas imagens em <span className="font-medium">apresentações visuais</span> de alto padrão.</h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">Solicite um orçamento personalizado e descubra como posso ajudar a valorizar seu portfólio com edições que fazem a diferença.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-100 transition-all duration-300 shadow-xl">
              Fale com Vallentina <ArrowRight size={16} />
            </a>
            <a href="mailto:contato@vallentinamonteiro.com" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-neutral-600 text-neutral-300 text-sm hover:bg-neutral-800 hover:text-white transition-all duration-300">
              Enviar e-mail
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <p className="text-lg font-medium text-white mb-2">Vallentina<span className="text-neutral-600 font-light"> Monteiro</span></p>
            <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-xs">Edição profissional de fotos de arquitetura e interiores</p>
          </div>
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-5 font-medium">Links</p>
            <nav className="space-y-3">
              {[{ href: "#servicos", label: "Serviços" }, { href: "#portfolio", label: "Portfólio" }, { href: "#processo", label: "Processo" }, { href: "#orcamento", label: "Orçamento" }].map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-neutral-400 hover:text-white transition-colors duration-300">{link.label}</a>
              ))}
            </nav>
          </div>
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-5 font-medium">Contato</p>
            <div className="space-y-4">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors duration-300"><span className="w-2 h-2 rounded-full bg-green-500/60" /> WhatsApp</a>
              <a href="https://instagram.com/vallentinamonteiro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors duration-300"><span className="w-2 h-2 rounded-full bg-pink-500/60" /> Instagram</a>
              <a href="mailto:contato@vallentinamonteiro.com" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors duration-300"><span className="w-2 h-2 rounded-full bg-blue-500/60" /> contato@vallentinamonteiro.com</a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600 font-light">&copy; {new Date().getFullYear()} Vallentina Monteiro. Todos os direitos reservados.</p>
          <p className="text-xs text-neutral-700 font-light">Edição profissional de fotografia de arquitetura e interiores</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BeforeAfter />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Cta />
      <Footer />
    </main>
  );
}