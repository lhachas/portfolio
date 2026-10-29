/**
 * SSOT del sistema de acentos dinámicos (enfoque original del portafolio).
 *
 * - Azul Clásico #3f87f5 como acento por defecto y 6 temas sólidos conmutables.
 * - Cada tema define su familia de 6 slots (anti-monotonía por fila), igual que
 *   en la v2: acentos vivos por tarjeta/etiqueta.
 * - Este módulo es la ÚNICA fuente del mapa: `Layout.astro` lo inyecta en el
 *   script anti-flash vía `define:vars` (build-time) y `StyleSwitcher.astro` /
 *   `Hero.astro` lo importan directamente.
 */

/** Hexadecimal sólido de 6 dígitos (#RRGGBB); la longitud se valida en runtime con `isSolidHex`. */
export type SolidHex = `#${string}`;

/** Acento rector por defecto. */
export const DEFAULT_ACCENT = {
  primary: '#3f87f5' as SolidHex,
  hover: '#2563eb' as SolidHex,
} as const;

/** Slots por defecto (tema Azul Clásico) — mapa original v2. */
export const DEFAULT_SLOTS: readonly SolidHex[] = [
  '#3f87f5',
  '#7c3aed',
  '#0d9488',
  '#ea580c',
  '#059669',
  '#e11d48',
];

/** Mapa oficial de familias por tema (mapa original v2). Claves en minúsculas. */
export const ACCENT_PALETTES: Record<string, readonly SolidHex[]> = {
  '#3f87f5': ['#3f87f5', '#7c3aed', '#0d9488', '#ea580c', '#059669', '#e11d48'],
  '#cdb30c': ['#cdb30c', '#0d9488', '#ea580c', '#7c3aed', '#059669', '#d97706'],
  '#ff546c': ['#ff546c', '#7c3aed', '#0d9488', '#ea580c', '#059669', '#d97706'],
  '#f2b31a': ['#f2b31a', '#0d9488', '#7c3aed', '#ea580c', '#059669', '#e11d48'],
  '#8060cf': ['#8060cf', '#0d9488', '#ea580c', '#e11d48', '#059669', '#d97706'],
  '#37b8df': ['#37b8df', '#7c3aed', '#ea580c', '#059669', '#e11d48', '#d97706'],
} as const;

/** Validación estricta de hex sólido (espejo del esquema Zod de contenido). */
export function isSolidHex(value: string): value is SolidHex {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

/** Normaliza un hex a minúsculas si es válido; si no, devuelve el default. */
export function normalizeAccentHex(value: string | null | undefined): SolidHex {
  const candidate = (value ?? '').toLowerCase();
  return isSolidHex(candidate) ? (candidate as SolidHex) : DEFAULT_ACCENT.primary;
}

/** Resuelve los 6 slots para un color primario dado (fallback = mapa original). */
export function resolveAccentSlots(primary: string): readonly SolidHex[] {
  const normalized = normalizeAccentHex(primary);
  return ACCENT_PALETTES[normalized] ?? [normalized, ...DEFAULT_SLOTS.slice(1)];
}
