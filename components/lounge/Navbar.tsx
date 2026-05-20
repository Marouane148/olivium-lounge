'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Menu', href: '#menu' },
  { label: 'Avis', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 2.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex flex-col items-start group"
          >
            <span className="text-gold-gradient font-display text-2xl font-semibold leading-none tracking-wide group-hover:opacity-80 transition-opacity">
              L'Olivium
            </span>
            <span className="text-[#C8A96B]/50 text-[10px] tracking-[0.5em] uppercase mt-0.5">
              Lounge
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#F5F5F5]/60 hover:text-[#C8A96B] text-sm tracking-wider uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A96B] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('#reservation')}
              className="px-6 py-2.5 border border-[#C8A96B]/60 text-[#C8A96B] text-sm tracking-wider uppercase hover:bg-[#C8A96B] hover:text-[#0B0B0B] transition-all duration-300 rounded-sm font-medium"
            >
              Réserver
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#C8A96B] p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 glass-dark flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 pt-24">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#F5F5F5]/80 hover:text-[#C8A96B] text-2xl font-display tracking-widest uppercase transition-colors duration-300"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                onClick={() => handleNavClick('#reservation')}
                className="mt-4 px-10 py-3 bg-[#C8A96B] text-[#0B0B0B] text-sm tracking-wider uppercase font-semibold rounded-sm hover:bg-[#D4BA82] transition-colors"
              >
                Réserver
              </motion.button>
            </div>
            <div className="divider-gold mx-8 mb-12 opacity-30" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
