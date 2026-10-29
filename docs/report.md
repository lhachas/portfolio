# INFORME FINAL — Evolución v3.0 "Azul Clásico" · Portafolio LHachaS

**Fecha:** 2026-10-28 · **Metodología:** Spec-Driven Development (spec → plan → implementación → validación → cierre)
**Base:** `main` @ `190ce19` (v2.2.0) → **Entrega:** `main` @ serie de commits v3 (ver §3)
**Evidencia:** `docs/evidence/baseline/` (antes) · `docs/evidence/final/` (después)

---

## 1. Resumen ejecutivo

Evolución rotunda del portafolio (Astro 7 + Tailwind v4 + GSAP + Remotion) sin reescrituras ni regresiones: el pipeline estable (`validate:content` + `verify-build-security.mjs`) permaneció **verde en cada tarea** y se extendió con nuevos controles. La identidad "solid minimalist" se profundiza con una **familia cromática única anclada en el Azul Clásico** (`#3f87f5`), tipografía de lectura premium, **iconografía oficial de marca (svgl.app) vendorizada**, un hero con motion refinado y controlado, y SEO ajustado a rangos de display. Cero glassmorphism, cero pastel, cero arcoíris.

## 2. Fases ejecutadas

| Fase | Entregable | Estado |
| :-- | :-- | :-- |
| F1 Auditoría y Spec | `docs/spec.md` — 9 dominios, 30 criterios AC-* medibles | ✅ |
| F2 Plan | `docs/plan.md` — T0–T9 con criterios y commits | ✅ |
| F3 Implementación | T1–T7 (8 commits convencionales) | ✅ |
| F4 Validación iterativa | 3 bucles: build + preview + 24 capturas reales + evals medibles; 5 desviaciones detectadas → corregidas → reverificadas | ✅ 100% |
| F5 Cierre | README v3, este informe, commits, evidencia | ✅ |

## 3. Cambios aplicados (por tarea → commit)

| Tarea | Commit | Contenido |
| :-- | :-- | :-- |
| T1 | `refactor(theme): unify accent palettes into single typed SSOT module` | `src/data/accents.ts`; `Layout.astro` anti-flash vía `define:vars`; `StyleSwitcher.astro` y `Hero.astro` importan el SSOT (elimina triplicación) |
| T2 | `feat(theme): adopt classic-blue harmonic slots and tokenized status colors` | Slots Océano & Pizarra en `global.css`; `--brand-purple` y utilidades eliminadas; semáforo de estados tokenizado (`--status-success/warning/error`) |
| T3 | `feat(content): migrate card accents to harmonic ocean-and-slate palette` | Migración determinista por matiz en `portfolio.yml` + `portfolio-en.yml` (paridad posicional ES/EN); temas del StyleSwitcher como rampas monocromáticas |
| T4 | `feat(ui): Manrope body typography, hero motion polish and neutral logo chips` | Manrope 400–700 para cuerpo; Oswald reservado a display/uppercase; `.hero-arch-strip`; rails monocromos; magnético en CTAs; reveal con máscara del H1; chips neutros para logos |
| T5 | `feat(icons): vendor official svgl brand logos and retire legacy icon fonts` | 24 SVG oficiales (svgl.app) en `src/assets/icons/brand/`; `BrandIcon.astro` + `src/data/brandIcons.ts` (saneamiento build-time, variantes light/dark); stroke unificado a 2; fuentes `icofont`/`technology-icons` y CSS de plugins eliminados; verificador extendido |
| T6 | (incluido en T4/T7 commits) | `Hero.astro`: `slotIndex i%3`, dots solo en dark, magnético CTAs, clip-path H1 |
| T7 | `feat(seo): concise ES/EN titles and descriptions within display range` | `color-scheme`, `og:image:type`; títulos ≤60 chars; descripciones 155/159 chars |
| F4 | `fix(ui): dark-mode accent text contrast, official social chips and one-line hero strip` | `color-mix` para texto sobre acento en dark; chips sociales oficiales (retira estilos inline sólidos); icono de canal teñido; tira del hero en una línea ≥1280px |
| F5 | `docs(v3): final report, spec updates and README v3` | Este documento, AC-C1 refinada, README (Astro 7, §6 v3, roadmap) |

## 4. Matriz de aceptación (spec → resultado)

### Cromática
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-C1 | 0 hexes arcoíris fuera de excepciones documentadas | ✅ | grep: solo `accents.ts` (temas), tokens `--status-*`, `themes.hex` YML |
| AC-C2 | Tokens `--accent-1..6` = spec §1.2 | ✅ | `global.css:18-24` |
| AC-C3 | Mapa de paletas en un único módulo TS | ✅ | `src/data/accents.ts` + consumidores |
| AC-C4 | Cero matices fuera de familia en decoración (light/dark, 1440/375) | ✅ | `f-1440-{light,dark}-0-hero.png`, `b4-1440-light-hero.png` |
| AC-C5 | 0 `backdrop-filter`/`blur(` | ✅ | grep src = 0 |
| AC-C6 | Acentos YML en familia con paridad ES/EN | ✅ | migración determinista por matiz |

### Tipografía
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-T1/T2 | Manrope en body/p; URL de fonts con Manrope+swap | ✅ | `global.css` body block; `Layout.astro` |
| AC-T3 | Cuerpo legible, sin desbordes ni viudas | ✅ | capturas 1440/375 light+dark |
| AC-T4 | Victor Mono (typing) y Caveat (firma) intactos | ✅ | capturas hero/footer |

### Iconografía
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-I1 | ≥18 SVG oficiales vendorizados | ✅ | 24 SVG (con variantes dark) |
| AC-I2 | Logos oficiales renderizados (hero, skills, contacto, footer) | ✅ | `b3-1440-light-footer.png`, `b3-1440-light-contact.png`, `f-1440-light-skills.png` |
| AC-I3 | 0 referencias icofont/technology-icons en dist; assets legacy eliminados | ✅ | verificador extendido PASS |
| AC-I4 | SVG sin `<script>`/refs remotas | ✅ | sanitizer build-time + verificador |
| AC-I5 | Stroke UI uniforme (2), currentColor | ✅ | 47 attrs `stroke-width="2"` |

### Motion / Hero
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-M1 | Rails monocromos; sin dots flotantes en claro | ✅ | `b4-1440-light-hero.png` |
| AC-M2 | Magnético en status pill + 2 CTAs | ✅ | código (`Hero.astro` selectores) |
| AC-M3 | reduced-motion: video oculto, todo visible | ✅ | eval `{videoHidden:true, revealVisible:true}` + `f-375-light-2-reduced-motion.png` |
| AC-M4 | Hero dark íntegro (video, typing, métricas) | ✅ | `b2-1440-dark-hero.png` |

### UI/UX / Responsive
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-U1/U2 | Secciones coherentes, waves sin costuras, patrón de tarjetas uniforme | ✅ | capturas about/skills/projects/experiences/services/contact/footer × light/dark |
| AC-U3 | Focus ring visible | ✅ | regla global `:focus-visible` (outline 2px azul) — verificación por código |
| AC-R1 | Capturas 375/768/1440 × light/dark sin desbordes | ✅ | `f-375-*`, `f-768-*`, `f-1440-*` |
| AC-R2 | `scrollWidth == clientWidth` en 375 | ✅ | eval → `375/375` |
| AC-R3 | Menú móvil con morph de iconos | ✅ | `f-375-light-1-menu-open.png` |

### SEO / Contenido / Clean code
| AC | Criterio | Resultado | Evidencia |
| :-- | :-- | :-- | :-- |
| AC-S1 | `color-scheme` + `og:image:type` en dist ES/EN | ✅ | grep dist = True/True |
| AC-S2 | Título ≤60; descripción 120–165 | ✅ | 47 / 155 (ES) · 159 (EN) |
| AC-S3 | `verify-build-security.mjs` verde | ✅ | 21 checks PASS (incl. nuevos) |
| AC-D1 | `validate:content` verde | ✅ | exit 0 en cada tarea |
| AC-D2 | Sin contenido nuevo hardcodeado en componentes | ✅ | diffs solo tokens/clases/estructuras |
| AC-D3 | Paridad posicional ES/EN de acentos | ✅ | mismo mapeo por valor en ambos YML |
| AC-K1 | `--brand-purple` = 0 refs | ✅ | grep = 0 |
| AC-K2–K4 | Verificador extendido + build + tsc verdes | ✅ | exit 0 |

## 5. Desviaciones encontradas y corregidas (F4)

1. **Contraste dark:** etiquetas de métricas y textos de experiencia en marino/petróleo ilegibles sobre `#1e222d` → variantes aclaradas con `color-mix(in oklab, …, white 45%)` solo en dark.
2. **Icono de correo invisible:** chip pasó a neutro y el stroke heredaba blanco → teñido con el color del canal.
3. **Logos oficiales en botones sólidos:** los SVG oficiales traen fondo propio (blobs al invertir) → sistema unificado chip neutro + borde de marca + logo natural; estilos inline sólidos retirados de `Footer.astro`/`About.astro`.
4. **Tira del hero en 2 filas:** Manrope ensanchó los pills → padding/tipografía compactados + `.hero-arch-strip` con expansión ≥1280px → una sola línea.
5. **Descripciones SEO 167–172 chars** → recorte a 155/159 dentro del rango.

## 8. Bucle v3.1 — Dirección unificada (decisión del cliente)

Tras la revisión del cliente, se fijó la dirección única del sistema y se ejecutó en una pasada:

1. **Iconos: "Oficial en todas partes".** Todos los chips muestran logo oficial multicolor (svgl.app): se incorporaron **Jest, Grafana, Swagger, GitHub Copilot, Cursor, Postman, GitLab, Apache Kafka, Nx, Kubernetes** y se remapearon los ítems de skills (cloud→Kubernetes/EKS, EDA→Kafka, Hexagonal→Nx, Testing→Jest, Observabilidad→Grafana, IA→Copilot, Refactor→Cursor, Pruebas→Postman, Documentación→Swagger). Solo 2 conceptos puros sin marca (Clean Code/DDD, OWASP) usan insignia rellena del pilar con glifo blanco, como sub-sistema deliberado de "práctica de ingeniería". Prohibido mezclar outline y logos en una misma lista.
2. **Tipografía: pareja disciplinada.** Oswald 500 exclusivo de títulos/etiquetas uppercase (peso 300→500 para presencia) y Manrope para todo el cuerpo.
3. **Color: azul estricto.** Verde de disponibilidad → azul (`--brand-gold`); bordes de marca social eliminados (chips neutros con borde gris-azulado; la identidad vive solo en el logo oficial); feedback de éxito del formulario en azul; error mantiene rojo universal.

Evidencia: `docs/evidence/final/b6-*.png` (skills claro/oscuro con 100% logos oficiales y barras por pilar; contacto con canales neutros). Commit: `feat(ui): official logos everywhere, disciplined type pairing and strict blue palette`.

## 9. Cómo repetir la validación

```bash
npm ci && npm run build && npm run preview
# en otra terminal:
agent-browser set viewport 1440 900
agent-browser open http://localhost:4321/portfolio/
agent-browser wait --load networkidle && agent-browser screenshot capture.png
# dark determinista: http://localhost:4321/portfolio/?theme=dark
# reduced motion: agent-browser set media light reduced-motion
```

## 7. Declaración final de aceptación

Con la totalidad de la matriz AC-* en verde, evidencia visual real comparada contra la spec en todos los breakpoints (375/768/1440) y ambos modos (claro/oscuro), y el pipeline de seguridad y contenido en verde: **el portafolio es armonioso (una sola familia cromática anclada en el Azul Clásico), consistente (un único sistema de tokens, tipografía e iconografía), premium (jerarquía tipográfica, motion refinado y controlado, iconografía oficial de marca), seguro (CSP intacta, SVG saneados, CVs con política por idioma, verificador extendido en CI) y visualmente indistinguible del trabajo humano de élite.**

## 12. Bucle v3.4 — Auditoría fina del Hero (dirección del cliente)
Hallazgos sobre capturas del cliente (1446×1189 oscuro / 1487×1024 claro-oro): (1) **media**: la rúbrica era de ancho fijo y quedaba huérfana cuando el texto tecleado estaba corto; (2) **baja**: densidad del fondo insuficiente en viewports altos. Correcciones: la rúbrica ahora es **ancla absoluta bajo el span tecleado** (`preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke`) y subraya exactamente el ancho escrito, keystroke a keystroke; el canvas sube a 6 filas en viewports altos. Nota: la barra inferior centrada que aparece en desarrollo es la **Astro Dev Toolbar** (solo existe en `astro dev`; no se publica). Evidencia: `docs/evidence/final/a3-*.png`.
### v3.4b — Zona de exclusión del circuito y rúbrica de trazo único
En tema Oro sobre claro se detectaron colisiones: nodos rellenos y trazas del canvas sobre la zona del H1. El generador ahora calcula una **zona de exclusión** desde el rectángulo del contenido (`#hero-tilt-stage` + padding 26px): los nodos se empujan fuera de ella y las trazas cuyo recorrido la cruce se omiten — el circuito **enmarca el contenido, jamás lo cruza**. Además `BrandRubric` incorpora `variant="underline"` (trazo simple sin lazo, `non-scaling-stroke`) que se estira limpio a cualquier ancho; el lazo cruzado se reserva para la firma del navbar. Evidencia: `a4-1215-light-gold-fixed.png` (tema Oro), `a4-1446-dark-fixed.png`.
### v3.4c — Fix definitivo de la fragmentación de la rúbrica
Causa raíz confirmada en vivo: la combinación `pathLength` + `stroke-dasharray` (legado de GSAP) + `vector-effect: non-scaling-stroke` + `preserveAspectRatio="none"` dispara un bug de Chromium que parte el trazo en segmentos. Solución: **eliminar el dash por completo** y revelar la rúbrica con `clip-path` (inset derecho 100% → 0) — mismo efecto de dibujo izquierda→derecha, sin dashing, continuo en cualquier ancho y tema. Regla muerta de reduced-motion removida. Evidencia: `a6-*-continuous.png` (subrayado continuo verificado en claro y oscuro).
## 13. v3.5 — Modo oscuro con derivados de #211E3C (dirección del cliente)
El cliente proporcionó la base del modo oscuro deseado: **#211E3C** (azul-violeta profundo, hue ≈247°), ya que el grafito anterior "se veía muy oscuro y no armonizaba con los componentes de colores de cada sección". Se diseñó la **escalera de elevación derivada** y se migró todo el CSS: base `#211E3C` (hero/secciones/inputs), tarjetas `#2A2750` (`th-primary`), franja alterna `#1D1A36` (`th-secondary`), bordes `#3E3A6B`, pills `#2E2B55`, pista de skills `#1A1830`, sombras `#14122A`. El chrome (navbar, footer, chips de botones, switcher, back-to-top, tooltip del cursor) se tokenizó (`--chrome-*`): grafito en claro (sin cambio visual) y **derivados navy-violeta en oscuro**. El overlay del canvas pasó a la base navy `rgba(33,30,60,…)`. Resultado: los acentos oro/violeta/naranja de las secciones resaltan sobre la base en lugar de perderse. Evidencia: `docs/evidence/final/a7-1440-dark-navy-{hero,about,skills,footer}.png`.
### v3.5b — Footer independiente y armonización de las secciones de contenido
Dos inconsistencias post-migración: (1) el footer se fundía con Contacto porque `--chrome-bg` dark (`#1D1A36`) era idéntico a `--th-secondary`; corregido con jerarquía de elevación: **footer `#2A2750` (elevado, con onda visible) vs Contacto `#1D1A36` (profundo)** — secciones claramente independientes. (2) Saturación de color en Educación/Prácticas: cada tarjeta acumulaba 3–4 hues (chip de icono + badge relleno + pill de provider rellena + check + borde). Principio aplicado: **un acento por tarjeta** (borde superior + pequeños guiños) y chips en lenguaje neutro — badges `outline` con texto en acento (mismo lenguaje que los tech-pills), checks atenuados y soft-skills **uniformes en oro** (repetición = ritmo, sin arcoíris). Evidencia: `a8-1440-dark-footer-separated.png`, `a8-1440-DARK-practices-harmony.png`, `a8-1440-LIGHT-practices-harmony.png`.
### v3.5c — Derivados brillantes de acento en oscuro (legibilidad)
Auditoría del cliente sobre navy: los acentos saturados de claro (#3f87f5, etc.) aplicados tal cual sobre `#2A2750` producían tono-sobre-tono — títulos de tarjeta, badges outline y tech-pills "se perdían". Fix estándar de dark-theming: `--heading-color`/`--label-color` y las clases de acento pequeño (provider-badge, edu-icon-badge, period/date pills, tech-pills del timeline) se **aclaran con `color-mix(acento, blanco 40-50%)` solo en `[data-theme="dark"]`** — derivados brillantes que resaltan sin tocar el modo claro. Evidencia: `a9-1440-dark-bright-{about,experiences}.png`.
### v3.5d — Habilidades: unificación por pilar (restaurada tras el revert v3.2)
El barrido integral detectó que la unificación por pilar de Habilidades (v3.2) quedó revertida al restaurar `Skills.astro` desde el commit base: chips, barras y tech-pills volvían a usar el `brandColor` de cada ítem (arcoíris verde/azul/rojo/rosa/violeta/naranja/cian). Re-aplicado: `--skill-brand` y `--card-accent` de las tech-pills se heredan del **pilar** (familia Océano & Pizarra con derivados brillantes en dark). Evidencia: `a11-1440-dark-skills-harmony.png` (Pilar 01 azul uniforme, Pilar 02 teal uniforme).
## 14. v4.0 — Auditoría de contenido + PT Sans Narrow global

### Tipografía
Oswald → **PT Sans Narrow** (400/700) como tipografía global del portafolio. Cambios: Google Fonts URL en Layout.astro, 7 declaraciones `font-family` en global.css, remapeo de pesos intermedios (300/500 → 400, 600 → 700). Victor Mono (typing) y Caveat (firma) se conservan para sus usos específicos.

### Auditoría de contenido (hallazgos y correcciones aplicadas)
| Hallazgo | Severidad | Corrección |
| :-- | :-- | :-- |
| Hero subtitle = dump de keywords con "más de 9 años de experiencia construyendo..." | Alta | "Llevo más de 9 años construyendo backend para banca digital, retail y logística. Trabajo con Node.js, Java y AWS, y me enfoco en arquitecturas que aguantan producción real." |
| About lead repetía hero subtitle casi verbatim | Alta | "Diseño y desarrollo software desde 2016. He pasado por banca digital, retail, logística, automotriz y educación, siempre del lado del backend." |
| About paragraphs: lista tecnológica densa sin narrativa | Media | Reescritos en primera persona, tono directo, menos stack-dump |
| Footer brandSummary repetía el stack completo del hero | Media | "Backend developer especializado en arquitecturas distribuidas para banca y retail. Trabajo remoto internacional desde Cusco, Perú." |
| Contact subtitle: formal, largo, pasivo | Media | "Si tienes un proyecto backend o una posición que encaje con mi perfil, escríbeme. Respondo rápido por cualquiera de estos canales." |
| Services/Experiences subtitles con clichés ("preparadas para alta concurrencia", "Más de 9 años de trayectoria") | Media | Reescritos concisos y descriptivos |
| EN: mismos patrones de cliché y redundancia | Media | 8 reescrituras espejo aplicadas |

### Checklist de validación
- [x] Sin redundancias hero/about/footer (cada sección aporta información única)
- [x] Sin clichés IA ("robusto", "escalable y mantenible", "end-to-end", "fortalecí la resiliencia")
- [x] Voz consistente ES/EN (primera persona, tono profesional cercano)
- [x] Contenido centralizado en portfolio.yml / portfolio-en.yml (cero hardcodeo)
- [x] Alineado a CVs 2026 ES/EN (fechas, empresas, tecnologías, logros verificables)
- [x] PT Sans Narrow aplicada globalmente con jerarquía 400/700
- [x] Build verde + security audit verde
### v4.1 — Jerarquía tipográfica bold + dos colores consistentes
- Títulos en **700** (PT Sans Narrow bold): `.home-title`, `.title`, `.subsection-title`, `.card-title`, `.item-title` — antes 400 (se veían delgados).
- **Dos colores en títulos de sección, consistentes en ambos modos**: prefijo navy (claro) / blanco (dark) + highlight dorado vía `.title span.font-medium`. En dark `[data-theme="dark"] .title, .subsection-title { color: var(--txt-primary) }`.
- Pesos de span protegidos contra síntesis (`.font-medium` → 700 explícito).
### v4.2 — Normalización integral de pesos tipográficos
Auditoría: 56 usos de utilidades Tailwind (`font-light` 300, `font-medium` 500, `font-semibold` 600) + 11 estilos inline en componentes con pesos no nativos de PT Sans Narrow (400/700) → el navegador sintetizaba pesos y cada componente renderizaba distinto. Corrección: mapeo semántico único (300→400, 500→700, 600→700) aplicado en (1) las 11 reglas inline de Projects/Skills y (2) override unlayered de las utilidades Tailwind en global.css (`.font-light`→400, `.font-medium`→700, `.font-semibold`→700). Jerarquía final: **700** = títulos/subtítulos/card titles/item titles/labels/badges; **400** = cuerpo, descripciones, placeholders. Evidencia: `a17-1440-dark-projects-weights.png`.