'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Wind, Wine, Droplets, Utensils } from 'lucide-react';

const categories = [
  {
    id: 'chichas',
    icon: Wind,
    label: 'Chichas',
    items: [
      { name: 'Classique Al Fakher', desc: 'Tabac traditionnel aux saveurs authentiques', price: '18€', badge: 'Signature' },
      { name: 'Double Pomme', desc: 'La classique revisitée avec des pommes fraîches', price: '18€' },
      { name: 'Menthe Glacée', desc: 'Fraîcheur intense, idéale pour commencer la soirée', price: '18€' },
      { name: 'Tropical Paradise', desc: 'Mangue, ananas, fruits de la passion', price: '22€', badge: 'Premium' },
      { name: 'Fusion Rose & Litchi', desc: 'Mariage floral et fruité, exclusivité maison', price: '25€', badge: 'Exclusif' },
      { name: 'Black Ice', desc: 'Mélange mystérieux aux notes de réglisse et menthe', price: '22€', badge: 'Best-seller' },
    ],
  },
  {
    id: 'cocktails',
    icon: Wine,
    label: 'Cocktails',
    items: [
      { name: 'Olivium Signature', desc: 'Gin, citron vert, sirop doré, eau de rose', price: '14€', badge: 'Signature' },
      { name: 'Smoky Negroni', desc: 'Gin fumé, Campari, vermouth doux, zeste orange', price: '15€' },
      { name: 'Midnight Spritz', desc: 'Prosecco, cassis, fleur de sureau, framboise', price: '13€' },
      { name: 'Golden Whisky Sour', desc: 'Whisky single malt, citron, miel, blanc d\'oeuf', price: '16€' },
      { name: 'Arabian Night', desc: 'Vodka, sirop de rose, cardamome, lychee', price: '15€', badge: 'Premium' },
    ],
  },
  {
    id: 'mocktails',
    icon: Droplets,
    label: 'Mocktails',
    items: [
      { name: 'Garden Breeze', desc: 'Concombre, menthe, citron vert, eau pétillante', price: '9€' },
      { name: 'Sunset Passion', desc: 'Mangue, maracuja, gingembre, jus d\'ananas', price: '10€', badge: 'Signature' },
      { name: 'Virgin Rose', desc: 'Lychee, eau de rose, framboise, citron', price: '9€' },
      { name: 'Spicy Ginger', desc: 'Gingembre frais, citron, miel, menthe', price: '9€' },
      { name: 'Blue Ocean', desc: 'Fleur de mauve, citron, sirop de coco, grenadine', price: '11€', badge: 'Premium' },
    ],
  },
  {
    id: 'desserts',
    icon: Utensils,
    label: 'Desserts',
    items: [
      { name: 'Baklava Maison', desc: 'Pâtisserie orientale au miel, pistaches et noix', price: '8€', badge: 'Maison' },
      { name: 'Kunafa Royale', desc: 'Fromage, semoule, sirop de fleur d\'oranger', price: '10€' },
      { name: 'Fondant Chocolat Noir', desc: 'Coulant intense, glace vanille bourbon', price: '9€' },
      { name: 'Crème Brûlée Cardamome', desc: 'Classique revisité aux épices orientales', price: '9€', badge: 'Premium' },
      { name: 'Plateau Pâtisseries', desc: 'Sélection de 5 pièces orientales artisanales', price: '16€', badge: 'Partage' },
    ],
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

export default function Menu() {
  const [active, setActive] = useState('chichas');
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="relative py-32 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0B0B 0%, #0F0F0F 50%, #0B0B0B 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[#556B2F]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Nos créations</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            La <span className="text-gold-gradient italic">Carte</span>
          </h2>
          <p className="text-[#F5F5F5]/50 text-base mt-5 max-w-lg mx-auto font-light">
            Une sélection raffinée pour satisfaire toutes les envies.
          </p>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`group flex items-center gap-2.5 px-6 py-3 text-sm tracking-wider uppercase transition-all duration-400 rounded-sm border ${
                active === cat.id
                  ? 'bg-[#C8A96B] text-[#0B0B0B] border-[#C8A96B] font-semibold'
                  : 'border-[#F5F5F5]/10 text-[#F5F5F5]/50 hover:border-[#C8A96B]/40 hover:text-[#C8A96B]'
              }`}
            >
              <cat.icon size={15} />
              {cat.label}
            </button>
          ))}
        </FadeIn>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {current.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group glass p-6 rounded-sm hover:border-[#C8A96B]/25 transition-all duration-500 hover:shadow-gold relative overflow-hidden"
              >
                {item.badge && (
                  <span className="absolute top-4 right-4 text-[10px] tracking-[0.4em] uppercase text-[#C8A96B]/60 font-light">
                    {item.badge}
                  </span>
                )}
                <div className="flex items-start justify-between gap-4 pr-16">
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-[#F5F5F5] font-medium mb-2 group-hover:text-[#C8A96B] transition-colors duration-300">
                      {item.name}
                    </h4>
                    <p className="text-[#F5F5F5]/45 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F5F5F5]/5">
                  <div className="w-6 h-[1px] bg-[#C8A96B]/40" />
                  <span className="text-gold-gradient font-display text-xl font-semibold">{item.price}</span>
                </div>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#C8A96B]/60 to-transparent group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center mt-14">
          <p className="text-[#F5F5F5]/40 text-sm font-light">
            Carte complète disponible sur place • Demandez nos suggestions du moment
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
