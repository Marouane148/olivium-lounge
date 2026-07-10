'use client';

import { motion } from 'framer-motion';
import { Flame, Leaf } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const accents = [
  { Icon: Flame, color: '#FF8A45', top: '12%', left: '6%', size: 22, duration: 7, delay: 0 },
  { Icon: Leaf, color: '#7A9A45', top: '65%', left: '90%', size: 20, duration: 8.5, delay: 1.2 },
  { kind: 'bubble' as const, color: '#C8A96B', top: '35%', left: '92%', size: 14, duration: 6, delay: 0.6 },
];

// Small ambient floating decorations (ember, mint leaf, smoke bubble).
// Pure CSS/motion — no extra WebGL context, kept subtle and low-opacity.
export default function FloatingAccents() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {accents.map((a, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: a.top, left: a.left }}
          animate={{ y: [0, -16, 0], rotate: [0, 6, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: a.duration, delay: a.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {a.kind === 'bubble' ? (
            <div
              className="rounded-full blur-[2px]"
              style={{ width: a.size, height: a.size, background: a.color, boxShadow: `0 0 16px ${a.color}` }}
            />
          ) : (
            <a.Icon size={a.size} color={a.color} style={{ filter: `drop-shadow(0 0 8px ${a.color}80)` }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
