'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, PenLine } from 'lucide-react';

import { business } from '@/lib/business';
import FadeIn from './FadeIn';

const ratingBreakdown = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 3 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 5 },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-32 px-6 overflow-hidden bg-[#0B0B0B]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C8A96B]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Avis Google</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            Ce qu'ils <span className="text-gold-gradient italic">disent</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="glass p-10 md:p-14 rounded-sm grid md:grid-cols-5 gap-10 items-center">
            {/* Score */}
            <div className="md:col-span-2 text-center md:text-left md:border-r md:border-[#F5F5F5]/10 md:pr-10">
              <p className="text-gold-gradient font-display text-6xl font-bold leading-none">
                {business.ratingValue.toString().replace('.', ',')}
              </p>
              <div className="flex gap-1 justify-center md:justify-start my-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="text-[#C8A96B] fill-[#C8A96B]" />
                ))}
              </div>
              <p className="text-[#F5F5F5]/60 text-sm">Basé sur {business.reviewCount} avis Google</p>
            </div>

            {/* Breakdown */}
            <div className="md:col-span-3 space-y-2.5">
              {ratingBreakdown.map((r) => (
                <div key={r.stars} className="flex items-center gap-3">
                  <span className="text-[#F5F5F5]/50 text-xs w-3">{r.stars}</span>
                  <Star size={12} className="text-[#C8A96B] fill-[#C8A96B] shrink-0" />
                  <div className="flex-1 h-1.5 rounded-full bg-[#F5F5F5]/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-[#C8A96B]"
                    />
                  </div>
                  <span className="text-[#F5F5F5]/40 text-xs w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 border border-[#F5F5F5]/20 text-[#F5F5F5]/80 text-sm tracking-[0.2em] uppercase font-light hover:border-[#C8A96B]/60 hover:text-[#C8A96B] transition-all duration-300"
          >
            <ExternalLink size={16} />
            Voir les {business.reviewCount} avis
          </a>
          <a
            href={business.googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 bg-[#C8A96B] text-[#0B0B0B] text-sm tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(200,169,107,0.4)] transition-all duration-300"
          >
            <PenLine size={16} />
            Laisser un avis
          </a>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.4} className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-[#F5F5F5]/5">
          {[
            { value: business.ratingValue.toString().replace('.', ','), label: 'Note moyenne', sub: 'Google Reviews' },
            { value: String(business.reviewCount), label: 'Avis clients', sub: 'Vérifiés Google' },
            { value: business.priceRange, label: 'Panier moyen', sub: 'Par personne' },
          ].map((stat) => (
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
