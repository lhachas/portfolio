# SPEC — Evolución "Azul Clásico" del Portafolio LHachaS (v3.0)

**Proyecto:** `portfolio-lhachas` (Astro 7 + Tailwind CSS v4 + GSAP 3 + Remotion)
**Alcance:** Evolución visual/motion/SEO sobre la base estable v2.2.0, sin reescritura de framework y sin romper módulos estables (SSOT bilingüe, política de CVs, pipeline de seguridad, routing dinámico, i18n ES/EN).
**Método:** Spec-Driven Development. Esta spec es la fuente de verdad de la Fase 4 (validación). Cada criterio es verificable por inspección de código, build, o evidencia visual capturada.

---

## 0. Principios rectores

1. **Solid Minimalist estricto:** 100% colores sólidos. Prohibido `backdrop-filter`, `blur()`, glassmorphism, y colores pastel (saturación baja tipo `#a5b4fc`, `#fbcfe8`, etc.) en cualquier superficie de UI.
2. **Azul Clásico como único acento rector:** `#3f87f5` (hover `#2563eb`). Toda la decoración cromática deriva de su familia (azules/cianes/pizarra). Única excepción: colores oficiales de marca social (LinkedIn `#0A66C2`, GitHub `#24292F`, WhatsApp `#25D366`, Facebook `#1877F2`, Instagram `#E4405F`, Email `#EA4335`) y logos oficiales de tecnologías.
3. **SSOT intocable:** todo texto/URL/dato sigue viniendo de `src/content/portfolio/portfolio(-en).yml` + esquema Zod. Cero hardcodeo nuevo en `.astro`.
4. **Estabilidad primero:** cada tarea debe pasar `npm run validate:content` y `npm run build` antes de considerarse completa.
5. **Motion con respeto:** toda animación respeta `prefers-reduced-motion: reduce` y `pointer: fine` para efectos de mouse.

---

## 1. Sistema cromático — Armonía "Azul Clásico"

### 1.1 Diagnóstico (auditoría F1)

| ID | Hallazgo | Evidencia |
| :-- | :-- | :-- |
| AUD-C1 | Slots de acento en familia arcoíris (`#7c3aed` violeta, `#0d9488` teal, `#ea580c` naranja, `#059669` verde, `#e11d48` rosa) usados en tarjetas métricas, canvas del hero, timeline, skills, proyectos. | `src/styles/global.css:19-24`, capturas `live-es-*-1440-hero.png` |
| AUD-C2 | Mapa de paletas de acento **duplicado 3 veces** (`Layout.astro:192-199`, `StyleSwitcher.astro:74-81`, fallbacks en `Hero.astro:396-400`) — riesgo de desincronización. | grep `#7c3aed` → 3 archivos |
| AUD-C3 | Token muerto `--brand-purple: #8060cf` y utilidades `.text-purple-brand`/`.bg-purple-brand` sin propósito en la paleta azul. | `global.css:15,1385-1391` |
| AUD-C4 | Canvas del hero dibuja rails multicolor (naranja/violeta/teal) con puntos endpoint visibles que ensucian el modo claro. | captura `live-es-light-1440-hero.png` |

### 1.2 Tokens oficiales (Estado = contrato)

Familia de acentos **Océano & Pizarra** (todos sólidos, saturación alta, sin pastel, familia azul/cian/pizarra):

```
--accent-1: #3f87f5  /* Azul Clásico — marca rectora  */
--accent-2: #0e7490  /* Cian técnico profundo          */
--accent-3: #1e3a8a  /* Azul marino                    */
--accent-4: #155e75  /* Petróleo                       */
--accent-5: #475569  /* Pizarra técnica (neutro frío)  */
--accent-6: #1d4ed8  /* Azul royal                     */
```

Reglas:
- Las tarjetas de una misma fila rotan los slots 1→4 en orden (anti-monotonía **se conserva**, ahora dentro de una sola familia armónica).
- Hover/active de tarjeta y sombras: siempre el propio `--card-accent` del slot; prohibido introducir matices cálidos.
- Los 6 temas del `StyleSwitcher` se conservan (módulo estable), pero **cada tema** define su familia como rampa monocromática de su matiz + pizarra (ej. Ámbar: `#cdb30c → #b45309 → #92400e → #78350f + #57534e`), jamás un arcoíris.

### 1.3 Superficies (se mantienen, se endurecen)

- Modo claro: `--th-primary #ffffff`, `--th-secondary #f1f5f9`, hero `#f8fafc`, navbar sólido oscuro `#14171f` (identidad existente).
- Modo oscuro: `--th-primary #1e222d`, `--th-secondary #161922`, hero `#14171f`.
- Sombra firma "drop-shadow arquitectónica": `0 4px 0 <color sólido>` (sin blur) — se conserva como identidad.

### 1.4 Criterios de aceptación — Cromática

| ID | Criterio | Verificación |
| :-- | :-- | :-- |
| AC-C1 | `grep -E "#7c3aed\|#ea580c\|#ea6a15\|#059669\|#e11d48\|#8060cf\|#d97706\|#8b5cf6"` en `src/` devuelve **0 coincidencias**, con tres excepciones documentadas: (a) el mapa de familias de `src/data/accents.ts` (temas del StyleSwitcher), (b) los tokens semánticos de estado `--status-success/--status-warning/--status-error` definidos una sola vez en `global.css` (semántica universal de formularios, no decoración) y (c) las definiciones de tema `styleSwitcher.themes.hex` en el YML (SSOT del selector). | grep |
| AC-C2 | Los tokens `--accent-1..6` en `global.css` coinciden exactamente con §1.2. | lectura |
| AC-C3 | El mapa de paletas vive en **un único módulo TS** (`src/data/accents.ts`); `Layout.astro` (inline anti-flash vía inyección build-time) y `StyleSwitcher.astro` lo consumen de ahí. | lectura de código |
| AC-C4 | En capturas light y dark a 1440 y 375, ningún elemento decorativo (rails del canvas, bordes de tarjeta, badges de métricas) presenta un matiz fuera de la familia azul/cian/pizarra (excepto logos de marca). | evidencia visual |
| AC-C5 | Cero ocurrencias de `backdrop-filter`/`blur(` en `src/**` (ya cumple hoy; debe seguir cumpliendo). | grep |
| AC-C6 | Los colores de acento por-tarjeta en ambos YML pertenecen al conjunto {§1.2} o a la familia del tema activo, con emparejamiento idéntico ES/EN por posición. | script/grep |

---

## 2. Tipografía

### 2.1 Diagnóstico

- AUD-T1: Cuerpo de texto en **Oswald 300** (condensada de display) — legibilidad subóptima en párrafos largos; jerarquía apoyada solo en 300/500.

### 2.2 Contrato

| Rol | Fuente | Uso |
| :-- | :-- | :-- |
| Display / títulos / labels uppercase | **Oswald** (300/400/500/600) | `h1-h6`, `.title`, `.label-c`, nav, botones uppercase |
| Cuerpo de lectura | **Manrope** (400/500/600/700) | `body`, `p`, `.body-copy`, `.detail-copy`, tarjetas |
| Código / typing | **Victor Mono** | `.typing`, snippets |
| Firma manuscrita | **Caveat** | `BrandSignature` |

- `body { font-family: 'Manrope', …; font-weight: 400; line-height: 1.7; letter-spacing: 0.01em; }`
- Párrafos con `text-wrap: pretty`; títulos ya tienen `text-wrap: balance`.
- Auto-cargadas vía Google Fonts en `Layout.astro` (una sola petición CSS2 con `display=swap`).

### 2.3 Criterios de aceptación — Tipografía

| ID | Criterio | Verificación |
| :-- | :-- | :-- |
| AC-T1 | El CSS de `body` y `p` usa `Manrope`; Oswald queda reservado a display/uppercase. | lectura |
| AC-T2 | La URL de Google Fonts incluye `Manrope:wght@400;500;600;700` y `display=swap`. | lectura de `Layout.astro` |
| AC-T3 | En capturas 1440/375, ningún párrafo desborda su contenedor ni presenta líneas viudas evidentes; el cuerpo se percibe distinto (no condensado) del título. | evidencia visual |
| AC-T4 | El bloque `.typing` y la firma `.brand-signature-text` conservan Victor Mono / Caveat. | lectura + evidencia |

---

## 3. Iconografía oficial (svgl.app / yesicon.app)

### 3.1 Diagnóstico

- AUD-I1: Los iconos de marca (Node.js, Java, AWS, Angular, NestJS, GraphQL, .NET, Postgres…) son **trazos propios aproximados** dentro de `Icon.astro` (el path de NestJS incluso es incorrecto), no logos oficiales.
- AUD-I2: Existen dos fuentes de iconos legacy (`icofont`, `technology-icons`) en `public/assets/` cuyo uso efectivo es nulo tras el mapa de alias (todos los nombres YML ya resuelven a SVG inline).

### 3.2 Contrato

1. **Logos de tecnología y redes sociales = SVGs oficiales** descargados de **svgl.app** (API `https://api.svgl.app`) y **vendorizados** en `src/assets/icons/brand/*.svg` (cero peticiones de red en runtime; compatible con CSP `img-src 'self' data:`; se inlinean en build con `import … ?raw`).
2. Set oficial requerido: `nodejs, typescript, java, spring, angular, react, aws, docker, kubernetes, postgresql, redis, mongodb, graphql, nestjs, dotnet*, github, linkedin, whatsapp, facebook, instagram, prisma*` (`*` = si svgl no lo publica, se documenta el fallback: SVG oficial del vendor o el inline actual, anotado en este documento).
3. **Iconos de UI** (home, mail, chevrons, terminal, etc.) = set outline propio de `Icon.astro` (compatible con la línea editorial yesicon-style, stroke 1.8–2, un solo grosor). Se unifica el grosor de stroke a `2` en el set outline.
4. Variantes light/dark de svgl (AWS, GitHub, React, MongoDB): se selecciona la variante según `[data-theme]` cuando exista.
5. Se eliminan `public/assets/css/plugins/icofont.css`, `public/assets/css/plugins/technology-icons.css` y sus fuentes **solo si** el build de verificación confirma 0 referencias (script de verificación extendido).
6. `Icon.astro` expone un registro `brand` derivado de `import.meta.glob('/src/assets/icons/brand/*.svg', { query: '?raw', import: 'default', eager: true })` con `set:html` (los SVG vendorizados se sanea que no contengan `<script>`).

### 3.3 Criterios de aceptación — Iconografía

| ID | Criterio | Verificación |
| :-- | :-- | :-- |
| AC-I1 | Existen ≥18 SVGs oficiales vendorizados en `src/assets/icons/brand/` con procedencia documentada (ruta svgl). | listado de archivos + tabla en este doc |
| AC-I2 | En el HTML generado, los pills/badges de tecnología del hero y skills renderizan los logos oficiales (evidencia visual: logo AWS real, NestJS real, etc. en light y dark). | evidencia visual |
| AC-I3 | Ningún HTML generado referencia `icofont`/`technology-icons` por red o `<i class="icofont-…">` visible (0 fallbacks activos); los assets legacy se eliminan o quedan 0 referencias. | grep sobre `dist/` |
| AC-I4 | Los SVG vendorizados no contienen `<script>` ni referencias remotas (`href="http…`). | grep sobre `src/assets/icons/brand/` |
| AC-I5 | El stroke del set de UI es uniforme (2) y todos los iconos UI renderizan con `currentColor`. | lectura |

---

## 4. Hero premium, motion y microinteracciones

### 4.1 Contrato

1. **Entrada orquestada (GSAP):** se conserva la timeline existente (stagger 0.08s) y se refina con máscara de reveal en el H1 (clip-path). Duración total ≤ 1.4s.
2. **Typewriter** (Victor Mono italic) se conserva con sus tiempos.
3. **Efectos de mouse controlados** (solo `pointer: fine` y sin reduced-motion):
   - Tilt 3D de tarjetas métricas (≤5°) — existente, se conserva.
   - Parallax/tilt del stage (≤5°, traslación ≤14px) — existente, se conserva.
   - Magnético en `hero-status-pill` + ambos CTAs del hero (amplitud ≤0.24 del offset, retorno `elastic`).
   - Canvas de topología: **rails monocromos** (familia §1.2, opacidad ≤0.5 en claro), sin puntos endpoint flotantes en modo claro; spring physics existente.
4. **Microinteracciones globales** (ya presentes, se consolidan como contrato): lift `-6px` + sombra `0 8px 0 <accent>` en tarjetas; botones con `translateY(-4px)` hover / `-1px` active; pill de tech con relleno de acento en hover; focus ring `outline 2px var(--brand-gold)` visible en todo control.
5. `prefers-reduced-motion: reduce` ⇒ sin video, sin canvas, sin tilt/magnético, reveals instantáneos (código existente debe seguir pasando).

### 4.2 Criterios de aceptación — Motion

| ID | Criterio | Verificación |
| :-- | :-- | :-- |
| AC-M1 | Con `?theme=light`, los rails del canvas usan únicamente colores de la familia §1.2 y no hay dots de colores cálidos flotantes. | evidencia visual |
| AC-M2 | Los 3 CTAs del hero (status pill, primario, secundario) tienen efecto magnético y retorno suave; verifica en preview con mouse-over simulado (eval JS que despacha mousemove) o inspección de listeners. | código + evidencia |
| AC-M3 | Emulando `prefers-reduced-motion`, la página renderiza completa sin animaciones pendientes (todo visible, video oculto). | captura con `set media light reduced-motion` |
| AC-M4 | No se rompe ningún comportamiento existente del hero (typing, video dark, métricas). | build + capturas dark |

---

## 5. UI/UX, fondos y separadores por sección

1. **Waves** superiores como único separador de secciones (regla existente "zero straight lines" se conserva) — colores `--wave-fill/--wave-primary-fill` neutros.
2. **Ritmo de superficies:** alternancia `th-primary / th-secondary` se mantiene; se corrige cualquier costura (`translateY(-1px)`) tras el cambio de tokens.
3. **Medallón de sección** `.title-icon` se mantiene (identidad) con acento azul rector.
4. **Jerarquía de tarjetas**: top-border 4px del acento + drop-shadow sólida — consistente en Skills, Projects, Experiences, Services, Contact, Footer (verificación visual cruzada).
5. **Navbar**: idéntico en ambos temas (identidad oscura sólida) — se conserva.
6. **Focus visible** en 100% de controles interactivos (ya implementado; verificar en capturas de teclado).

**Criterios:** AC-U1: capturas por sección (about→footer) en light/dark muestran superficies alternadas coherentes y separadores wave sin costuras. AC-U2: ningún card rompe el patrón top-border/sombra de su familia. AC-U3: tab order y focus ring visibles en nav y form (captura con foco).

---

## 6. Responsive

- Breakpoints de verificación obligatorios: **375, 768, 1024, 1440** × **light/dark**.
- Hero: stack correcto en ≤640 (pills envueltos, métricas 2×2, CTAs full-width sin desborde horizontal — `overflow-x: clip` ya en `html/body`).
- Timeline: variante de espina izquierda ≤1024 (existente) sin solapes.
- `about-cta-row`: 2×2 en <640, 1 línea ≥640 (contrato existente, verificado por `verify-build-security.mjs`).
- Ningún scroll horizontal en 375 (medible: `document.documentElement.scrollWidth <= 375`).

**Criterios:** AC-R1: capturas 375/768/1440 light+dark sin desbordes; AC-R2: `scrollWidth === viewportWidth` en 375 (comprobación por eval); AC-R3: menú móvil abre/cierra con morph de iconos (captura abierta).

---

## 7. SEO

Estado actual fuerte (canonical, hreflang×3, JSON-LD @graph, OG/Twitter, sitemap bilingüe con xhtml:link, robots con bloqueo .docx). Mejoras contractuales:

1. `<meta name="color-scheme" content="light dark" />` — evita mismatch de controles nativos en dark.
2. `og:image:type` (`image/webp` o el MIME real) añadido.
3. Verificación: título ≤60 chars y description 120–165 chars en ES y EN (los valores vienen del YML; se ajusta contenido si excede).
4. JSON-LD válido (sin cambios de esquema; parse check en build del informe).

**Criterios:** AC-S1: los 3 puntos presentes en `dist/index.html` y `dist/en/index.html`; AC-S2: longitudes dentro de rango (informe); AC-S3: `verify-build-security.mjs` sigue en verde.

---

## 8. Contenido centralizado (SSOT)

- Prohibido introducir texto/URL/colores nuevos fuera de YML + `src/data/*`.
- Los acentos por tarjeta (skills/projects/experiences/services/contact/hero metrics) se **actualizan en el YML** al set §1.2 (mismo emparejamiento ES/EN por posición).
- Zod sigue siendo el guardián (hex sólido, CV por idioma, enums de categoría).

**Criterios:** AC-D1: `validate:content` verde; AC-D2: diff de componentes sin strings de contenido nuevos (solo claves/tokens); AC-D3: paridad de posición ES/EN en accentColors (script de comprobación o revisión de diff).

---

## 9. Clean code y seguridad

1. Mapa de acentos: **una sola fuente** (`src/data/accents.ts`), inyectado al inline anti-flash por `define:vars` (build-time) — elimina triplicación (AUD-C2).
2. Sin dependencias nuevas de runtime (GSAP/Tailwind/Astro ya presentes). Los SVG se vendorizan (no CDN en runtime).
3. Eliminación de código muerto: `--brand-purple` y utilidades `.text-purple-brand`/`.bg-purple-brand` si 0 usos tras la migración.
4. `verify-build-security.mjs` extendido con 2 comprobaciones: (a) 0 referencias `icofont|technology-icons` en `dist/`; (b) presencia de tokens §1.2 en el CSS emitido.
5. CSP sin cambios (no se suman orígenes).

**Criterios:** AC-K1: grep `--brand-purple` = 0 en `src/` tras migración; AC-K2: verificador extendido pasa; AC-K3: `npm run build` exit 0; AC-K4: `tsc --noEmit` sin errores.

---

## 10. Fuera de alcance (esta evolución)

- No se migran frameworks, ni se cambia el pipeline de deploy.
- No se toca el contenido profesional (textos YML) salvo acentos cromáticos y longitudes SEO si exceden rango.
- No se rehace la sección Remotion (video dark se conserva tal cual).
- No se implementan Playwright E2E (queda en roadmap; la validación F4 es con agente de navegador real).

---

## 11. Matriz de trazabilidad Fase 4

Cada AC-* se validará en el informe final con estado ✅/❌ + evidencia (`docs/evidence/…`). La Fase 3 no se considera cerrada hasta que `validate:content` + `build` estén verdes; la Fase 4 no cierra hasta 100% de AC-* en verde tras N bucles de corrección.
