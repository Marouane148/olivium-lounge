'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Beef, Sandwich, Soup, Utensils, Wind, CupSoda, IceCreamCone } from 'lucide-react';
import FadeIn from './FadeIn';
import TiltCard from './TiltCard';
import ChichaMiniSceneLoader from './hero3d/ChichaMiniSceneLoader';

const categories = [
  {
    id: 'plats',
    icon: UtensilsCrossed,
    label: 'Nos Plats',
    items: [
      { name: 'Ojja merguez', price: '9€' },
      { name: 'Ojja escalope', price: '9€' },
      { name: 'Plat du jour tunisien', price: '9€' },
      { name: 'Assiette de grillade', price: '9€' },
    ],
  },
  {
    id: 'burgers',
    icon: Beef,
    label: 'Nos Burgers',
    items: [
      { name: 'Moster', desc: 'Steak, œuf, bacon, cheddar', price: '9€' },
      { name: 'Radical', desc: 'Steak, œuf, cheddar, gorgonzola', price: '9€' },
      { name: "Burger L'Olivium", desc: 'Steak, œuf, cheddar, oignons caramélisés, sauce maison', price: '9€' },
    ],
  },
  {
    id: 'sandwichs',
    icon: Sandwich,
    label: 'Nos Sandwichs',
    items: [
      { name: 'Moster', desc: '2 steaks, œuf, bacon', price: '9€' },
      { name: 'Tandoori', desc: 'Poulet paprika', price: '9€' },
      { name: "L'Olivium", desc: 'Escalope, fromage, sauce champignon', price: '9€' },
    ],
  },
  {
    id: 'pates',
    icon: Soup,
    label: 'Nos Pâtes',
    items: [
      { name: 'À la crème', price: '9€' },
      { name: 'Bolognaise', price: '9€' },
      { name: '4 Fromages', price: '9€' },
    ],
  },
  {
    id: 'paninis',
    icon: Utensils,
    label: 'Nos Paninis',
    items: [
      { name: 'Panini poulet', price: '6€' },
      { name: 'Panini 4 fromages', price: '6€' },
      { name: 'Panini thon', price: '6€' },
    ],
  },
  {
    id: 'chichas',
    icon: Wind,
    label: 'Nos Chichas',
    signature: true,
    flavors: ['Mi Amor', 'Hawaï', 'Love', 'Menthe', 'Pomme', 'Swiss Bonbon'],
    items: [
      { name: 'Chicha classique', price: '15€' },
      { name: 'Chicha Kaloud', price: '20€' },
      { name: 'Chicha Quasar', price: '20€' },
      { name: 'Tête supplémentaire', price: '10€' },
    ],
  },
  {
    id: 'smoothies',
    icon: CupSoda,
    label: 'Nos Smoothies',
    items: [
      { name: 'Fraise', price: '9€' },
      { name: 'Ananas', price: '9€' },
      { name: 'Fruits rouges', price: '9€' },
      { name: 'Avocado', desc: 'Avocat, banane, dates, amandes', price: '9€' },
    ],
  },
  {
    id: 'crepes',
    icon: IceCreamCone,
    label: 'Nos Crêpes',
    items: [
      { name: 'Nutella banane', price: '9€' },
      { name: 'Spéculoos Caramel beurre salé', price: '9€' },
    ],
  },
];

function MenuCard({ item, i }: { item: { name: string; desc?: string; price: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.5 }}
      className="group"
      style={{ perspective: 800 }}
    >
      <TiltCard className="glass p-6 rounded-sm hover:border-[#C8A96B]/25 transition-all duration-500 hover:shadow-gold overflow-hidden h-full">
        <div className="flex-1">
          <h4 className="font-display text-lg text-[#F5F5F5] font-medium mb-2 group-hover:text-[#C8A96B] transition-colors duration-300">
            {item.name}
          </h4>
          {item.desc && <p className="text-[#F5F5F5]/45 text-sm leading-relaxed font-light">{item.desc}</p>}
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F5F5F5]/5">
          <div className="w-6 h-[1px] bg-[#C8A96B]/40" />
          <span className="text-gold-gradient font-display text-xl font-semibold">{item.price}</span>
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#C8A96B]/60 to-transparent group-hover:w-full transition-all duration-700" />
      </TiltCard>
    </motion.div>
  );
}

export default function Menu() {
  const [active, setActive] = useState('chichas');
  const current = categories.find((c) => c.id === active)!;
  const isSignature = Boolean(current.signature);

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
        <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-3 mb-14">
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
            className={isSignature ? 'grid lg:grid-cols-5 gap-10 items-start' : ''}
          >
            {isSignature && (
              <div className="lg:col-span-2 relative">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-[#C8A96B]/15 bg-gradient-to-b from-[#1a1712] to-[#0B0B0B]">
                  <ChichaMiniSceneLoader />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#C8A96B] text-[#0B0B0B] text-[10px] tracking-[0.3em] uppercase font-semibold rounded-sm">
                      Signature
                    </span>
                  </div>
                </div>
                <div className="mt-6 glass p-5 rounded-sm">
                  <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-3">Nos goûts</p>
                  <div className="flex flex-wrap gap-2">
                    {current.flavors?.map((flavor) => (
                      <span
                        key={flavor}
                        className="px-3 py-1.5 border border-[#C8A96B]/20 text-[#C8A96B]/80 text-xs rounded-full"
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={`grid sm:grid-cols-2 ${isSignature ? 'lg:col-span-3' : 'lg:grid-cols-3'} gap-4`}>
              {current.items.map((item, i) => (
                <MenuCard key={item.name} item={item} i={i} />
              ))}
            </div>
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
