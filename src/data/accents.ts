/**
 * SSOT del sistema de acentos dinámicos "Océano & Pizarra".
 *
 * Contrato (docs/spec.md §1.2):
 * - Azul Clásico #3f87f5 como acento rector; toda la decoración deriva de su
 *   familia (azules / cianes / pizarra). 100% sólidos, cero transparencias.
 * - Cada tema seleccionable del StyleSwitcher define una familia monocromática
 *   (rampa de su propio matiz + pizarra técnica), jamás un arcoíris.
 * - Este módulo es la ÚNICA fuente del mapa de paletas: `Layout.astro` lo
 *   inyecta en el script anti-flash vía `define:vars` (build-time) y
 *   `StyleSwitcher.astro` / `Hero.astro` lo importan directamente.
 */

/** Hexadecimal sólido de 6 dígitos (#RRGGBB); la longitud se valida en runtime con `isSolidHex`. */
export type SolidHex = `#${string}`;

export interface AccentTheme {
  /** Clave = color primario en minúsculas (coincide con `data-accent-color`). */
  primary: SolidHex;
  /** Color primario por defecto del sitio (Azul Clásico). */
  slots: readonly SolidHex[];
}

/** Acento rector por defecto. */
export const DEFAULT_ACCENT = {
  primary: '#3f87f5' as SolidHex,
  hover: '#2563eb' as SolidHex,
} as const;

/**
 * Familia "Océano & Pizarra" — slots por defecto (tema Azul Clásico).
 * Orden pensado para rotación anti-monotonía por fila (slots 1→4):
 * azul clásico → cian técnico → azul marino → petróleo → pizarra → azul royal.
 */
export const DEFAULT_SLOTS: readonly SolidHex[] = [
  '#3f87f5',
  '#0e7490',
  '#1e3a8a',
  '#155e75',
  '#475569',
  '#1d4ed8',
];

/**
 * Mapa completo de familias por tema (6 paletas sólidas, cada una armónica
 * dentro de su propio matiz + pizarra). Claves en minúsculas.
 */
export const ACCENT_PALETTES: Record<string, readonly SolidHex[]> = {
  // Azul Clásico (default) — familia azul/cian/pizarra
  '#3f87f5': ['#3f87f5', '#0e7490', '#1e3a8a', '#155e75', '#475569', '#1d4ed8'],
  // Oro LHachaS — rampa ámbar/marrón profundo + pizarra
  '#cdb30c': ['#cdb30c', '#b45309', '#92400e', '#78350f', '#57534e', '#a16207'],
  // Rosa Intenso — rampa rosa/frambuesa profunda + pizarra
  '#ff546c': ['#ff546c', '#e11d48', '#be123c', '#9f1239', '#475569', '#881337'],
  // Ámbar Dorado — rampa dorado/naranja quemado + pizarra
  '#f2b31a': ['#f2b31a', '#d97706', '#b45309', '#92400e', '#57534e', '#ca8a04'],
  // Púrpura Original — rampa violeta profunda + pizarra
  '#8060cf': ['#8060cf', '#6d28d9', '#5b21b6', '#4c1d95', '#475569', '#312e81'],
  // Cian Tech — rampa cian/petróleo + pizarra
  '#37b8df': ['#37b8df', '#0e7490', '#0891b2', '#155e75', '#475569', '#1e3a8a'],
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

/**
 * Resuelve los 6 slots para un color primario dado.
 * Temas desconocidos (p. ej. valor legacy en localStorage) caen a la familia
 * Océano & Pizarra con el primario solicitado al frente.
 */
export function resolveAccentSlots(primary: string): readonly SolidHex[] {
  const normalized = normalizeAccentHex(primary);
  return ACCENT_PALETTES[normalized] ?? [normalized, ...DEFAULT_SLOTS.slice(1)];
}
