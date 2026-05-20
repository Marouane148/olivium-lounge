'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    avatar: 'S',
    rating: 5,
    date: 'Novembre 2024',
    text: "Une expérience absolument incroyable. L'ambiance est à couper le souffle, les chichas sont de qualité supérieure et le service est impeccable. Je recommande vivement pour une soirée hors du commun.",
  },
  {
    name: 'Karim B.',
    avatar: 'K',
    rating: 5,
    date: 'Octobre 2024',
    text: "Le meilleur lounge chicha de Paris et environs. L'Olivium a réussi à créer quelque chose d'unique : un mariage parfait entre luxe, authenticité et convivialité. Les cocktails sont divins.",
  },
  {
    name: 'Camille D.',
    avatar: 'C',
    rating: 5,
    date: 'Décembre 2024',
    text: "Nous avons organisé notre soirée d'anniversaire ici et c'était parfait. L'équipe est aux petits soins, la déco est sublime et l'ambiance musicale crée vraiment quelque chose de spécial.",
  },
  {
    name: 'Alexandre R.',
    avatar: 'A',
    rating: 5,
    date: 'Janvier 2025',
    text: "Le rapport qualité-prix est imbattable pour un établissement de ce standing. Les mélanges de chicha sont originaux et de grande qualité. Un endroit où l'on a envie de revenir chaque semaine.",
  },
  {
    name: 'Yasmine K.',
    avatar: 'Y',
    rating: 5,
    date: 'Février 2025',
    text: "Enfin un lounge à la hauteur de mes attentes ! Décoration soignée, personnel agréable et professionnel, sélection de tabacs premium. L'Olivium est devenu ma nouvelle adresse favorite.",
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

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section id="reviews" className="relative py-32 px-6 overflow-hidden bg-[#0B0B0B]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C8A96B]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Témoignages</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Ce qu'ils <span className="text-gold-gradient italic">disent</span>
          </h2>
        </FadeIn>

        {/* Slider */}
        <FadeIn delay={0.2}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="glass p-10 md:p-14 rounded-sm relative overflow-hidden"
              >
                {/* Quote icon */}
                <div className="absolute top-8 right-10 opacity-10">
                  <Quote size={80} className="text-[#C8A96B]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: reviews[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#C8A96B] fill-[#C8A96B]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#F5F5F5]/80 text-lg md:text-xl leading-[1.8] font-light font-display italic mb-8 relative z-10">
                  "{reviews[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#556B2F] to-[#3D4D22] flex items-center justify-center text-[#C8A96B] font-semibold text-lg font-display">
                    {reviews[current].avatar}
                  </div>
                  <div>
                    <p className="text-[#F5F5F5] font-semibold text-base">{reviews[current].name}</p>
                    <p className="text-[#F5F5F5]/40 text-sm font-light">{reviews[current].date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === current ? 'w-8 h-2 bg-[#C8A96B]' : 'w-2 h-2 bg-[#F5F5F5]/20 hover:bg-[#F5F5F5]/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5]/50 hover:border-[#C8A96B]/50 hover:text-[#C8A96B] transition-all duration-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5]/50 hover:border-[#C8A96B]/50 hover:text-[#C8A96B] transition-all duration-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.3} className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-[#F5F5F5]/5">
          {[
            { value: '5.0', label: 'Note moyenne', sub: 'Google Reviews' },
            { value: '500+', label: 'Clients satisfaits', sub: 'Chaque mois' },
            { value: '100%', label: 'Premium', sub: 'Expérience garantie' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-gold-gradient font-display text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-[#F5F5F5]/70 text-sm mt-1 font-medium">{stat.label}</p>
              <p className="text-[#F5F5F5]/30 text-xs font-light">{stat.sub}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
