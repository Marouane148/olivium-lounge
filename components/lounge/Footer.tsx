'use client';

import { Instagram, Facebook, MapPin, Phone, Clock } from 'lucide-react';

const links = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Menu', href: '#menu' },
  { label: 'Avis', href: '#reviews' },
  { label: 'Réservation', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#F5F5F5]/5 bg-[#080808]">
      {/* Top accent */}
      <div className="divider-gold opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="text-gold-gradient font-display text-3xl font-semibold leading-none">L'Olivium</p>
              <p className="text-[#C8A96B]/40 text-[10px] tracking-[0.5em] uppercase mt-1">Lounge</p>
            </div>
            <p className="text-[#F5F5F5]/40 text-sm leading-relaxed font-light mb-6">
              Un espace raffiné mêlant chichas premium, cocktails créatifs et ambiance lounge exclusive.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm border border-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5]/40 hover:border-[#C8A96B]/50 hover:text-[#C8A96B] transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm border border-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5]/40 hover:border-[#C8A96B]/50 hover:text-[#C8A96B] transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#F5F5F5]/70 text-xs tracking-[0.4em] uppercase font-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-[#F5F5F5]/40 text-sm hover:text-[#C8A96B] transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-0 sm:mt-10 lg:mt-0">
            <h4 className="text-[#F5F5F5]/70 text-xs tracking-[0.4em] uppercase font-medium mb-6 hidden lg:block">&nbsp;</h4>
            <ul className="space-y-3">
              {links.slice(4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-[#F5F5F5]/40 text-sm hover:text-[#C8A96B] transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F5F5]/70 text-xs tracking-[0.4em] uppercase font-medium mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#C8A96B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#F5F5F5]/50 text-sm font-light leading-relaxed">
                    7 Avenue du Belvédère<br />93310 Le Pré-Saint-Gervais
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#C8A96B] shrink-0" />
                <a href="tel:+33616461770" className="text-[#F5F5F5]/50 text-sm font-light hover:text-[#C8A96B] transition-colors">
                  +33 6 16 46 17 70
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-[#C8A96B] shrink-0" />
                <p className="text-[#F5F5F5]/50 text-sm font-light">11h00 – 02h00 • 7j/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F5F5F5]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F5F5]/25 text-xs font-light tracking-wider">
            &copy; {new Date().getFullYear()} L'Olivium Lounge — Tous droits réservés
          </p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-[1px] bg-[#C8A96B]/30" />
            <p className="text-[#C8A96B]/40 text-xs tracking-widest uppercase">Luxe • Authenticité • Excellence</p>
            <div className="w-4 h-[1px] bg-[#C8A96B]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
