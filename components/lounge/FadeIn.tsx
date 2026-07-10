'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

// Depth-style scroll reveal: fades, rises and scales up slightly, approximating
// a translateZ emergence without needing a 3D perspective context.
//
// Note: this deliberately does NOT animate `filter` (e.g. blur). Combining an
// animated filter with an absolutely-positioned descendant (like a floating
// badge over an image) triggers a Chromium containing-block/repaint bug where
// the descendant's position can get stuck at a stale layout after the filter
// settles. transform + opacity are the only properties animated here.
export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
