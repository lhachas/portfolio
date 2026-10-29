# Auditoría Visual por Secciones — v3.4 (Fases 1–2)

**Método:** capturas reales del servidor de desarrollo (HMR) con agent-browser, revisión por diseño gráfico/product design. Evidencia: `docs/evidence/final/` (series `a1-*` y `a2-*`) y series previas (`b6/b7/b8`, `f-*`).
**Nota de alcance:** Educación, Certificaciones e Idiomas viven dentro de la sección Perfil (training showcase + education cards + idiomas), auditadas como parte de ella.

| Sección | Consistencia | Coherencia | Buenas prácticas | Score | Hallazgos (severidad) |
| :-- | :--: | :--: | :--: | :--: | :-- |
| **Hero Header** | 9.5 | 9.5 | 9.5 | **9.5** | F2: composición centrada genérica sin huella (media) → **resuelto en F3** (rúbrica de marca dibujada, marco blueprint + HUD, cursor de bloque). Fondo de dos sistemas → **resuelto v3.3** (canvas único). |
| **Perfil (incl. educación, certificaciones, idiomas)** | 9 | 9 | 9 | **9.0** | Chips de idiomas con dot de color por idioma: deliberado (identidad), contraste correcto en ambos modos. Sin acciones. |
| **Habilidades** | 9.5 | 9.5 | 9 | **9.3** | 100% logos oficiales svgl por ítem; barras en acento del pilar; filtros accesibles (roles tablist/tab). Sin acciones. |
| **Proyectos** | 9 | 9.5 | 9 | **9.2** | Carrusel scroll-snap con HUD y contador; logos GitHub oficiales; jerarquía problema→solución→impacto clara. Sin acciones. |
| **Experiencia** | 9 | 9 | 9 | **9.0** | Timeline con espina central, headers por etapa con color de etapa, vista ejecutiva/detallada. Sin acciones. |
| **Soluciones** | 9 | 9.5 | 9 | **9.2** | 3 pilares con numeral, medallón diamante y top-border por acento; entregables como sub-tarjetas. Sin acciones. |
| **Contacto** | 9 | 9 | 9 | **9.0** | Canales con logo oficial sobre chip neutro; formulario con validación, honeypot y estados tokenizados; download CV condicional por idioma. Sin acciones. |
| **Footer** | 9 | 9 | 9 | **9.0** | 3 columnas ejecutivas, chips sociales neutros con logo oficial, CV PDF por idioma. Sin acciones. |

**Criterio de cierre (≥9/10 por sección): CUMPLIDO.**

## Fase 2 — Diagnóstico del Hero (fondo por fondo, componente por componente)

| Capa/Componente | Diagnóstico | Acción |
| :-- | :-- | :-- |
| Fondo Remotion (video) | Descartado en v3.3: lattice con elementos cortados = "debris" | ✅ reemplazado por canvas único |
| Canvas `hero-circuit-canvas` | Topología determinista (semilla fija), retícula blueprint, nodos-chip, trazas con pulsos; temático y accesible | ✅ conservado |
| Overlay | Fundido radial + lateral + inferior a `--hero-bg` (transición con onda perfecta) | ✅ conservado |
| Tipografía H1 | Oswald prefijo + Victor Mono itálica tecleada (firma cinética) | ✅ conservada |
| **Huella de marca** | **Ausente** (genérico) → **rúbrica caligráfica LHachaS dibujada bajo el H1** (SVG `BrandRubric` con `pathLength`, animada por GSAP, estática con reduced-motion) | ✅ nuevo |
| **Marco** | Sin estructura → **esquinas blueprint de registro** (accent, ocultas <1024px) + **micro-etiqueta HUD** mono compuesta desde el SSOT (`LHachaS // Espinar, Cusco`) | ✅ nuevo |
| Cursor de tecleo | `\|` textual por defecto (tell de IA) → **bloque pulsante** redondeado en acento | ✅ nuevo |
| Status pill | Sólida, pulso, magnética | ✅ conservada |
| Pills de arquitectura | Badges de color de marca + glifo blanco, una línea ≥1280px | ✅ conservadas |
| CTAs | Sólido + outline, magnéticos | ✅ conservados |
| Métricas | Multipilar con etiqueta en acento (legible dark/light) | ✅ conservadas |
| Scroll indicator | Mouse animado con rueda pulsante | ✅ conservado |
| Mouse effects | Tilt 3D de métricas, parallax de escena, magnéticos — solo `pointer: fine`, sin reduced-motion | ✅ conservados |
