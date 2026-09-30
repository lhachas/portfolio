import { getEntry } from 'astro:content';
import type { PortfolioContent } from '../content.config';

export type { PortfolioContent };

/**
 * Resuelve rutas relativas de archivos estáticos (imágenes, PDFs, favicon)
 * respetando el `base` configurado en `astro.config.mjs` (ej. `/portfolio`).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Obtiene y valida en tiempo de compilación el contenido centralizado del portafolio
 * desde `src/content/portfolio/portfolio.yml` a través de Astro Content Collections + Zod.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const entry = await getEntry('portfolio', 'portfolio');
  if (!entry) {
    throw new Error(
      'No se encontró el archivo central de contenido en src/content/portfolio/portfolio.yml.',
    );
  }
  return entry.data;
}
