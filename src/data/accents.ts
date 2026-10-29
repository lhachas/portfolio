/**
 * SSOT del sistema de acentos dinámicos (enfoque original del portafolio).
 *
 * - Azul Clásico #3f87f5 como acento por defecto y 6 temas sólidos conmutables.
 * - Cada tema define su familia de 6 slots (anti-monotonía por fila), igual que
 *   en la v2: acentos vivos por tarjeta/etiqueta.
 * - **Derivados brillantes para modo oscuro** (`ACCENT_PALETTES_DARK`): los
 *   saturados de claro se pierden sobre la base navy (#211E3C); en dark se
 *   aplican aclarados con `brightenHex` (mezcla con blanco 42%).
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

/** Mezcla un hex con blanco (amount 0..1) — derivados brillantes para superficies oscuras. */
export function brightenHex(hex: string, amount = 0.42): SolidHex {
  const n = hex.replace('#', '');
  const channel = (i: number) => {
    const v = parseInt(n.slice(i, i + 2), 16);
    return Math.round(v + (255 - v) * amount)
      .toString(16)
      .padStart(2, '0');
  };
  return (`#${channel(0)}${channel(2)}${channel(4)}` as SolidHex);
}

/** Familias derivadas brillantes para modo oscuro (calculadas del mapa claro). */
export const ACCENT_PALETTES_DARK: Record<string, readonly SolidHex[]> = Object.fromEntries(
  Object.entries(ACCENT_PALETTES).map(([key, slots]) => [key, slots.map((s) => brightenHex(s, 0.42))]),
);

/** Slots por defecto derivados brillantes (modo oscuro). */
export const DEFAULT_SLOTS_DARK: readonly SolidHex[] =
  ACCENT_PALETTES_DARK[DEFAULT_ACCENT.primary] ?? DEFAULT_SLOTS;

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
 * Resuelve los 6 slots para un color primario dado, según el tema activo.
 * Temas desconocidos caen a la familia del primario con slots default de respaldo.
 */
export function resolveAccentSlots(primary: string, isDark = false): readonly SolidHex[] {
  const normalized = normalizeAccentHex(primary);
  if (isDark) {
    return ACCENT_PALETTES_DARK[normalized] ?? [normalized, ...DEFAULT_SLOTS_DARK.slice(1)];
  }
  return ACCENT_PALETTES[normalized] ?? [normalized, ...DEFAULT_SLOTS.slice(1)];
}
