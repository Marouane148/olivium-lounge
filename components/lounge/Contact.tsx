'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Star } from 'lucide-react';
import { business } from '@/lib/business';

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

const infos = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: business.streetAddress,
    sub: `${business.postalCode} ${business.addressLocality}`,
    href: business.googleMapsUrl,
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: business.telephoneDisplay,
    href: `tel:${business.telephone}`,
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun – Dim',
    sub: `${business.openingHours.opens} – ${business.openingHours.closes}`,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-[#0B0B0B]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Nous trouver</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Venez nous <span className="text-gold-gradient italic">rendre visite</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Info cards */}
          <FadeIn delay={0.1} className="lg:col-span-2 space-y-5">
            {infos.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 glass p-5 rounded-sm hover:border-[#C8A96B]/30 transition-all duration-400"
                  >
                    <div className="w-11 h-11 rounded-sm bg-[#556B2F]/20 flex items-center justify-center shrink-0 group-hover:bg-[#556B2F]/40 transition-colors">
                      <info.icon size={18} className="text-[#C8A96B]" />
                    </div>
                    <div>
                      <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-0.5">{info.label}</p>
                      <p className="text-[#F5F5F5]/85 text-sm font-medium group-hover:text-[#C8A96B] transition-colors">{info.value}</p>
                      {info.sub && <p className="text-[#F5F5F5]/50 text-xs">{info.sub}</p>}
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-5 glass p-5 rounded-sm">
                    <div className="w-11 h-11 rounded-sm bg-[#556B2F]/20 flex items-center justify-center shrink-0">
                      <info.icon size={18} className="text-[#C8A96B]" />
                    </div>
                    <div>
                      <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-0.5">{info.label}</p>
                      <p className="text-[#F5F5F5]/85 text-sm font-medium">{info.value}</p>
                      {info.sub && <p className="text-[#F5F5F5]/50 text-xs">{info.sub}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social */}
            <div className="glass p-5 rounded-sm">
              <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-4">Réseaux sociaux</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2.5 border border-[#F5F5F5]/10 rounded-sm hover:border-[#C8A96B]/40 hover:text-[#C8A96B] text-[#F5F5F5]/50 transition-all duration-300 text-sm"
                >
                  <Instagram size={15} />
                  <span className="font-light">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2.5 border border-[#F5F5F5]/10 rounded-sm hover:border-[#C8A96B]/40 hover:text-[#C8A96B] text-[#F5F5F5]/50 transition-all duration-300 text-sm"
                >
                  <Facebook size={15} />
                  <span className="font-light">Facebook</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Google Maps embed */}
          <FadeIn delay={0.3} className="lg:col-span-3">
            <div className="relative rounded-sm overflow-hidden h-[420px] border border-[#C8A96B]/10">
              <iframe
                src={`https://www.google.com/maps?q=${business.latitude},${business.longitude}&hl=fr&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(80%) invert(90%) hue-rotate(180deg) brightness(0.7) contrast(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="L'Olivium Lounge - Carte"
              />
              {/* Map overlay badge */}
              <div className="absolute bottom-4 left-4 glass px-4 py-2.5 rounded-sm">
                <p className="text-[#C8A96B] text-xs font-semibold tracking-wider">{business.name}</p>
                <p className="text-[#F5F5F5]/50 text-xs">{business.addressLocality}</p>
              </div>
              {/* Rating + review CTA badge */}
              <a
                href={business.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute top-4 right-4 glass px-4 py-2.5 rounded-sm flex items-center gap-2 hover:border-[#C8A96B]/40 transition-colors"
              >
                <Star size={14} className="text-[#C8A96B] fill-[#C8A96B]" />
                <span className="text-[#F5F5F5]/85 text-xs font-semibold">{business.ratingValue.toString().replace('.', ',')}</span>
                <span className="text-[#F5F5F5]/40 text-xs">({business.reviewCount})</span>
                <span className="text-[#C8A96B] text-xs ml-1 group-hover:underline">Laisser un avis</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
