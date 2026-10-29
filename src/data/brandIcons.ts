/**
 * Registro build-time de logos oficiales de marca (vendorizados desde svgl.app).
 *
 * Contrato (docs/spec.md §3):
 * - Los SVG viven en `src/assets/icons/brand/*.svg` (cero red en runtime, CSP-safe).
 * - `brandIconNames` alimenta la resolución de `Icon.astro` y `BrandIcon.astro`.
 * - `sanitizeBrandSvg` rechaza en build cualquier SVG con `<script>` o
 *   referencias remotas (AC-I4).
 */

const brandModules = import.meta.glob('../assets/icons/brand/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** Mapa clave→SVG en bruto. Claves sin sufijo = variante clara/base; `-dark` = variante oscura. */
export const brandRegistry: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    Object.entries(brandModules).map(([path, svg]) => [path.split('/').pop()!.replace(/\.svg$/, ''), svg]),
  ),
);

/** Nombres base disponibles (sin sufijo de variante). */
export const brandIconNames: ReadonlySet<string> = new Set(
  Object.keys(brandRegistry).filter((key) => !key.endsWith('-dark')),
);

/** Guardia de seguridad en build para SVG vendorizados. */
export function sanitizeBrandSvg(svg: string, name: string): string {
  if (/<script/i.test(svg) || /href\s*=\s*["']https?:/i.test(svg)) {
    throw new Error(`[brandIcons] SVG de marca inseguro detectado: ${name}`);
  }
  return svg;
}
