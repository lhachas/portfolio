import { getEntry } from 'astro:content';
import type { PortfolioContent } from '../content.config';

export type { PortfolioContent };
export type PortfolioLocale = 'es' | 'en';

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
 * desde `src/content/portfolio/portfolio.yml` (ES) o `src/content/portfolio/portfolio-en.yml` (EN)
 * a través de Astro Content Collections + Zod.
 */
export async function getPortfolioContent(locale: PortfolioLocale = 'es'): Promise<PortfolioContent> {
  const entryId = locale === 'en' ? 'portfolio-en' : 'portfolio';
  const entry = await getEntry('portfolio', entryId);
  if (!entry) {
    throw new Error(
      `No se encontró el archivo central de contenido para el idioma "${locale}" (${entryId}.yml) en src/content/portfolio/.`,
    );
  }
  return entry.data;
}
