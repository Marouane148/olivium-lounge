import fs from 'node:fs';
import path from 'node:path';

// Vignettes des listes : pour chaque photo `/menu/xxx.webp` (800 × 800), la version
// 400 × 400 s'appelle `/menu/xxx-sm.webp`. Si elle n'existe pas, on retombe sur la grande.
// (Réservé au rendu côté serveur.)
export function smallImage(src?: string): string | undefined {
  if (!src) return src;
  const small = src.replace(/\.(webp|jpe?g|png)$/i, '-sm.$1');
  if (small === src) return src;
  return fs.existsSync(path.join(process.cwd(), 'public', small)) ? small : src;
}
