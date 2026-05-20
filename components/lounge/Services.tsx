'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wind, Wine, Music2, Umbrella, Users, Wifi } from 'lucide-react';

const services = [
  {
    icon: Wind,
    title: 'Chichas Premium',
    desc: 'Une sélection de tabacs artisanaux et de mélanges exclusifs pour une expérience sensorielle incomparable.',
    tag: 'Signature',
  },
  {
    icon: Wine,
    title: 'Cocktails & Mocktails',
    desc: 'Des créations originales élaborées par nos mixologues, avec des ingrédients de première qualité.',
    tag: 'Bar',
  },
  {
    icon: Music2,
    title: 'Ambiance Musicale',
    desc: 'Une programmation musicale soignée, de la lounge house aux sonorités orientales premium.',
    tag: 'DJ & Sets',
  },
  {
    icon: Umbrella,
    title: 'Terrasse Lounge',
    desc: 'Profitez de notre espace extérieur intimiste, conçu pour les soirées sous les étoiles.',
    tag: 'Outdoor',
  },
  {
    icon: Users,
    title: 'Soirées Privées',
    desc: "Privatisez l'espace pour vos événements exclusifs : anniversaires, soirées d'entreprise, célébrations.",
    tag: 'Événements',
  },
  {
    icon: Wifi,
    title: 'Wi-Fi & Confort',
    desc: "Un cadre moderne avec Wi-Fi haut débit, canapés grand confort et service attentionné.",
    tag: 'Premium',
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

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0B0B 0%, #111111 50%, #0B0B0B 100%)' }}>
      {/* Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#C8A96B]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Ce que nous offrons</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Nos <span className="text-gold-gradient italic">Services</span>
          </h2>
          <p className="text-[#F5F5F5]/50 text-base mt-5 max-w-xl mx-auto font-light leading-relaxed">
            Chaque service est pensé pour vous offrir le meilleur de l'expérience lounge premium.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="group relative glass p-8 rounded-sm overflow-hidden hover:border-[#C8A96B]/25 transition-all duration-500 hover:shadow-gold hover:-translate-y-1">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96B]/0 to-[#556B2F]/0 group-hover:from-[#C8A96B]/5 group-hover:to-[#556B2F]/5 transition-all duration-700 pointer-events-none rounded-sm" />

                {/* Tag */}
                <div className="absolute top-6 right-6">
                  <span className="text-[#C8A96B]/40 text-[10px] tracking-[0.4em] uppercase font-light">
                    {service.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-[#556B2F]/30 to-[#556B2F]/10 flex items-center justify-center border border-[#556B2F]/30 group-hover:border-[#C8A96B]/40 transition-colors duration-500">
                    <service.icon size={24} className="text-[#C8A96B]" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-semibold text-[#F5F5F5] mb-3 group-hover:text-[#C8A96B] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#F5F5F5]/50 text-sm leading-relaxed font-light">{service.desc}</p>
                </div>

                {/* Bottom line animation */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#C8A96B]/60 to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
