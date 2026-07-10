'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Sparkles, Clock, Shield } from 'lucide-react';

const highlights = [
  {
    icon: Leaf,
    title: 'Chichas Artisanales',
    desc: 'Des mélanges soigneusement sélectionnés pour une expérience sensorielle unique.',
  },
  {
    icon: Sparkles,
    title: 'Ambiance Exclusive',
    desc: 'Un cadre pensé dans les moindres détails pour vous transporter.',
  },
  {
    icon: Clock,
    title: 'Ouvert Tard',
    desc: "Profitez de notre lounge jusqu'à 2h du matin, 7j/7.",
  },
  {
    icon: Shield,
    title: 'Prestige & Discrétion',
    desc: 'Un espace privatisable pour vos soirées les plus exclusives.',
  },
];

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-[#0B0B0B]">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#C8A96B]/30" />
      <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full bg-[#C8A96B]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Notre histoire</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Bienvenue chez
            <br />
            <span className="text-gold-gradient italic">L'Olivium Lounge</span>
          </h2>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Text */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-[#F5F5F5]/70 text-lg leading-[1.9] font-light">
                Un espace raffiné pensé pour offrir une expérience lounge unique, mêlant ambiance chaleureuse,
                chichas premium et moments exclusifs. Chez L'Olivium, chaque détail est une invitation
                à la détente absolue.
              </p>
              <p className="text-[#F5F5F5]/50 text-base leading-[1.8] font-light">
                Inspiré des lounges les plus prestigieux de Dubaï, Paris et Soho House, notre établissement
                cultive l'art de l'hospitalité avec une attention portée aux moindres détails — de la sélection
                de nos tabacs à la curation musicale soigneusement choisie pour chaque soirée.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#C8A96B]" />
                  <span className="text-[#C8A96B] text-sm tracking-[0.3em] uppercase font-light">
                    Depuis 2020 — Le Pré-Saint-Gervais
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn delay={0.35} className="relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="/gallery/olivium-6.jpg"
                alt="Intérieur L'Olivium Lounge"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent" />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 glass p-5 rounded-sm shadow-dark-lg">
              <p className="text-[#C8A96B] font-display text-3xl font-bold">5★</p>
              <p className="text-[#F5F5F5]/60 text-xs tracking-widest uppercase mt-1">Expérience Premium</p>
            </div>
          </FadeIn>
        </div>

        {/* Highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="group glass p-7 rounded-sm hover:border-[#C8A96B]/30 transition-all duration-500 hover:shadow-gold">
                <div className="w-12 h-12 rounded-sm bg-[#556B2F]/20 flex items-center justify-center mb-5 group-hover:bg-[#556B2F]/40 transition-colors duration-500">
                  <item.icon size={22} className="text-[#C8A96B]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#F5F5F5] mb-3">{item.title}</h3>
                <p className="text-[#F5F5F5]/50 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
