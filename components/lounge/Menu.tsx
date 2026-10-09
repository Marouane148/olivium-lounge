import Link from 'next/link';
import FadeIn from './FadeIn';
import MenuPhoto from './MenuPhoto';
import { homeItems } from '@/lib/menu';

// Version courte de la carte : quelques articles mis en avant (lus depuis lib/menu.ts)
// et un bouton vers la carte complète /menu.
export default function Menu() {
  const items = homeItems();

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
            Une sélection de nos incontournables.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map((item) => (
              <li key={item.name} className="glass rounded-sm overflow-hidden border border-[#C8A96B]/10">
                <MenuPhoto src={item.image} className="aspect-square w-full" />
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-base sm:text-lg text-[#F5F5F5] font-medium leading-snug">{item.fullName ?? item.name}</h3>
                  <span className="text-gold-gradient font-display text-lg sm:text-xl font-semibold mt-2 inline-block">{item.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.3} className="text-center mt-14">
          <Link
            href="/menu"
            className="inline-block px-10 py-4 bg-[#C8A96B] text-[#0B0B0B] text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,107,0.4)]"
          >
            Voir toute la carte
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
