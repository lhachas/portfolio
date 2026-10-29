# PLAN — Ejecución Spec "Azul Clásico" (Fases 2–5)

Derivado de [`docs/spec.md`](./spec.md). Tareas ordenadas por dependencia; cada una es acotada, testeable y cierra con commit convencional. **Regla:** no se avanza a la siguiente tarea sin que la actual pase `npm run validate:content` (y `build` cuando aplique).

## T0 · Línea base congelada ✅
- `validate:content` verde (exit 0) sobre `main` limpio.
- Evidencia base capturada: `docs/evidence/baseline/live-es-{light,dark}-{1440,375}-*.png`.

## T1 · SSOT de acentos (`src/data/accents.ts`)
**Objetivo:** eliminar la triplicación del mapa de paletas (AUD-C2).
**Archivos:** nuevo `src/data/accents.ts`; `src/layouts/Layout.astro` (inline anti-flash consume el mapa vía `define:vars`, build-time); `src/components/StyleSwitcher.astro` (script procesado que importa el módulo); `src/components/Hero.astro` (fallbacks importan el módulo).
**Criterios:** AC-C3. Diff garantiza mismo comportamiento (aplicar primario/hover/6 slots + evento `portfolio:accent-change`).
**Commit:** `refactor(theme): unify accent palettes into single typed SSOT module`

## T2 · Tokens cromáticos en `global.css`
**Objetivo:** familia Océano & Pizarra §1.2; eliminar `--brand-purple` y utilidades huérfanas (AUD-C1/C3).
**Archivos:** `src/styles/global.css`; usos de `.text-purple-brand`/`.bg-purple-brand` si existieran.
**Criterios:** AC-C1, AC-C2, AC-K1.
**Commit:** `feat(theme): adopt classic-blue anchored harmonic accent family`

## T3 · Migración de acentos en contenido (YML ES/EN)
**Objetivo:** todos los `accentColor`/`brandColor`/`color` de tarjetas pertenecen a la familia activa; paridad posicional ES/EN (AUD-C1).
**Archivos:** `src/content/portfolio/portfolio.yml`, `portfolio-en.yml`, sección `styleSwitcher.themes` (nombres/labels coherentes con cada familia monocromática).
**Criterios:** AC-C6, AC-D1, AC-D3.
**Commit:** `feat(content): migrate card accents to harmonic ocean-and-slate palette`

## T4 · Tipografía Manrope para cuerpo
**Objetivo:** legibilidad premium (AUD-T1).
**Archivos:** `src/layouts/Layout.astro` (URL fonts), `src/styles/global.css` (body/p/detail-copy), sin tocar display Oswald.
**Criterios:** AC-T1–T4.
**Commit:** `feat(typography): introduce Manrope body face with Oswald display pairing`

## T5 · Iconografía oficial svgl vendorizada
**Objetivo:** logos de marca oficiales, sin fuentes legacy (AUD-I1/I2).
**Archivos:** `src/assets/icons/brand/*.svg` (descargados de svgl.app, light/dark según disponibilidad), `src/components/Icon.astro` (registro brand `import.meta.glob … ?raw` + saneamiento + stroke 2 en set UI), limpieza de `public/assets/css/plugins/*` y `public/assets/fonts/*` si 0 referencias, `scripts/verify-build-security.mjs` (checks AC-I3/AC-K2b).
**Criterios:** AC-I1–I5.
**Commit:** `feat(icons): vendor official svgl brand logos and retire legacy icon fonts`

## T6 · Hero premium: rails monocromos y magnético en CTAs
**Objetivo:** coherencia cromática del canvas + microinteracción magnética controlada (§4).
**Archivos:** `src/components/Hero.astro` (canvas rails → slots familia + sin dots flotantes en claro; magnetic targets ampliados; reveal H1 con clip-path, ≤1.4s).
**Criterios:** AC-M1, AC-M2, AC-M4 (AC-M3 se valida en F4).
**Commit:** `feat(hero): monochrome signal rails, magnetic CTAs and masked headline reveal`

## T7 · SEO técnico
**Objetivo:** color-scheme nativo correcto + OG completo (§7).
**Archivos:** `src/layouts/Layout.astro` (`meta color-scheme`, `og:image:type`); ajuste YML si título/description exceden rango.
**Criterios:** AC-S1–S3.
**Commit:** `feat(seo): declare color-scheme and complete Open Graph image metadata`

## T8 · Fase 4 — Validación iterativa (bucle)
1. `npm run build` (debe incluir verificador extendido) → verde.
2. `npm run preview` + agent-browser: capturas viewport y por sección en **375/768/1440 × light/dark** sobre `http://localhost:4321/portfolio/`.
3. Checks medibles por `eval`: `scrollWidth === clientWidth` en 375; foco visible; `prefers-reduced-motion` (set media reduced-motion).
4. Comparar contra cada AC-* de la spec; registrar ✅/❌ + evidencia en `docs/evidence/final/`; corregir y repetir hasta 100%.

## T9 · Fase 5 — Cierre
- README actualizado (Astro 7, sistema de diseño v3, iconografía oficial, evidencia, roadmap).
- Informe final `docs/report.md` con spec→plan→cambios→evidencias→checklist AC-*.
- Commits convencionales por tarea; push no se realiza sin confirmación del usuario.

## Mapa de riesgos y mitigación
| Riesgo | Mitigación |
| :-- | :-- |
| Cambio de body font altera alturas | Validación por breakpoint tras T4; line-heights ya normalizados en CSS |
| SVG oficial multicolor rompe contraste en badges | Badges usan superficie sólida propia; variante dark de svgl en tema oscuro |
| StyleSwitcher deja de aplicar en primer paint | Inline anti-flash en `Layout` se mantiene y se alimenta por `define:vars` |
| Verificador estricto falla con nuevos assets | Checks nuevos son aditivos; no se modifican los existentes |
