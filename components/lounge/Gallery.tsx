'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    src: '/gallery/olivium-1.jpg',
    alt: "Salon lounge L'Olivium avec médaillon arbre et banquettes",
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/gallery/olivium-6.jpg',
    alt: 'Chicha et banquettes en velours vert',
    span: '',
  },
  {
    src: '/gallery/olivium-2.jpg',
    alt: 'Couloir décoré, tableaux et éclairage ambiance',
    span: '',
  },
  {
    src: '/gallery/olivium-4.jpg',
    alt: "Espace écran et enseigne néon L'Olivium",
    span: '',
  },
  {
    src: '/gallery/olivium-3.jpg',
    alt: 'Salle principale et bar',
    span: 'col-span-2',
  },
  {
    src: '/gallery/olivium-5.jpg',
    alt: 'Coin détente et tables basses',
    span: '',
  },
];

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-32 px-6 overflow-hidden bg-[#0B0B0B]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Atmosphère</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Notre <span className="text-gold-gradient italic">Galerie</span>
          </h2>
          <p className="text-[#F5F5F5]/50 text-base mt-5 max-w-lg mx-auto font-light">
            Plongez dans l'ambiance unique de L'Olivium Lounge.
          </p>
        </FadeIn>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.08} className={img.span}>
              <div
                className="group relative w-full h-full overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#C8A96B]/60 flex items-center justify-center bg-[#0B0B0B]/50 backdrop-blur-sm">
                    <ZoomIn size={18} className="text-[#C8A96B]" />
                  </div>
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C8A96B]/25 transition-colors duration-500 rounded-sm pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0B0B0B]/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox} alt="" className="w-full h-full object-contain rounded-sm" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0B0B0B]/80 border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] hover:bg-[#C8A96B]/20 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
