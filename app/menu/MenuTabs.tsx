'use client';

import { useEffect, useRef, useState } from 'react';

type Tab = { id: string; label: string };

/**
 * Barre d'onglets collante + comportements de la page /menu :
 * défilement vers la rubrique, onglet actif selon la rubrique visible,
 * apparition en fondu au défilement (désactivée si prefers-reduced-motion).
 */
export default function MenuTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const barRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  // Apparition au défilement
  useEffect(() => {
    const root = document.querySelector('.mn');
    const els = Array.from(document.querySelectorAll<HTMLElement>('.mn-reveal'));
    if (!root || !('IntersectionObserver' in window)) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    root.classList.add('mn-js');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('mn-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('mn-js');
    };
  }, []);

  // Onglet actif = dernière rubrique dont le haut a passé la barre
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      let current = tabs[0]?.id ?? '';
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= 120) current = t.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tabs]);

  // Garde l'onglet actif visible dans la barre
  useEffect(() => {
    const btn = barRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const bar = barRef.current;
    if (btn && bar) {
      bar.scrollTo({ left: btn.offsetLeft - bar.clientWidth / 2 + btn.clientWidth / 2, behavior: 'smooth' });
    }
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActive(id);
    lockUntil.current = Date.now() + 900;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav className="mn-tabs" aria-label="Rubriques de la carte">
      <div className="mn-tabs-scroll" ref={barRef}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="mn-tab"
            aria-current={active === t.id ? 'true' : undefined}
            onClick={() => go(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
