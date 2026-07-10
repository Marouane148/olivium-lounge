'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Hero3D from './hero3d/Hero3D';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="L'Olivium Lounge ambiance"
          className="w-full h-full object-cover object-center scale-110"
        />
        {/* Layered overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/60 to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-transparent to-[#0B0B0B]/50" />
      </motion.div>

      {/* 3D scene: chicha + fumée animée + verre */}
      <Hero3D />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/40 pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C8A96B]/40 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C8A96B]/40 to-transparent hidden lg:block" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[1px] bg-[#C8A96B]/60" />
          <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase font-light">
            Le Pré-Saint-Gervais
          </span>
          <div className="w-12 h-[1px] bg-[#C8A96B]/60" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-6"
        >
          <span className="block text-[#F5F5F5]">L'expérience</span>
          <span className="block text-gold-gradient italic">lounge premium</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.1 }}
          className="text-[#F5F5F5]/50 text-sm sm:text-base tracking-[0.35em] uppercase mb-12 font-light"
        >
          Chicha&nbsp;&nbsp;•&nbsp;&nbsp;Ambiance&nbsp;&nbsp;•&nbsp;&nbsp;Cocktails&nbsp;&nbsp;•&nbsp;&nbsp;Luxe
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => handleScroll('#reservation')}
            className="group relative px-10 py-4 bg-[#C8A96B] text-[#0B0B0B] text-sm tracking-[0.3em] uppercase font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,107,0.4)]"
          >
            <span className="relative z-10">Réserver</span>
            <div className="absolute inset-0 bg-[#D4BA82] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
          <button
            onClick={() => handleScroll('#menu')}
            className="group px-10 py-4 border border-[#F5F5F5]/30 text-[#F5F5F5]/80 text-sm tracking-[0.3em] uppercase font-light hover:border-[#C8A96B]/60 hover:text-[#C8A96B] transition-all duration-500"
          >
            Voir la carte
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => handleScroll('#about')}
        >
          <span className="text-[#F5F5F5]/30 text-[10px] tracking-[0.4em] uppercase">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="text-[#C8A96B]/60" size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
