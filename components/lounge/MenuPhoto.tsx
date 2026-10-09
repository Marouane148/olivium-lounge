/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import './menu-photo.css';

// Case photo de la carte. Si `src` manque ou si le fichier est introuvable,
// la case élégante avec icône reste visible (alt vide = pas d'icône d'image cassée).
export default function MenuPhoto({
  src,
  className = '',
  style,
  priority = false,
}: {
  src?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <div className={`mn-ph ${className}`} style={style}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10" />
        <path d="M17 3c-2 1.5-3 4-3 7 0 1.5 1 2.5 3 2.5V21" />
      </svg>
      {src && (
        <img
          src={src}
          alt=""
          width={600}
          height={600}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
}
