# Portafolio Profesional - Leonel Hacha Salazar (LHachaS)

Portafolio de ingeniería de software de **Leonel Hacha Salazar** (**Senior Backend Developer | Full Stack Developer**), migrado y evolucionado desde Angular 13 a **Astro 5** y **Tailwind CSS v4** preservando rigurosamente la identidad visual original de la marca (`LHachaS`) y actualizando el contenido técnico con el CV **2026** (+9 años de experiencia en Banca Digital, Retail/Logística, IoT Automotriz y Sistemas Empresariales).

---

## Arquitectura y Stack Tecnológico

- **Framework Core:** [Astro 5](https://astro.build/) (`output: 'static'`, Zero-JS por defecto con islas de interactividad nativa).
- **Estilos y Tokens:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + arquitectura de tokens CSS (`--brand-gold: #cdb30c`, `--brand-primary: #8060cf`, soporte dual `data-theme="light"` y `data-theme="dark"` sin FOUC).
- **Tipografía e Iconografía Original:** `Oswald` (`300/400/500/600/700`) como sistema tipográfico unificado, `Victor Mono` (`italic`) en el titular dinámico del Hero, `Icofont` y `Technology Icons`.
- **Divisores de Sección Ondulados (`.wave`):** Curvas SVG horizontales puras ancladas al borde superior de cada sección (`top: -1px` y proyección ascendente `.about .wave`) sin interferencia de líneas rectas.
- **Capa Interactiva de Élite (`InteractiveCursor.astro`):**
  - Cursor interactivo dual con interpolación spring a 60fps (`.cursor-dot` + `.cursor-ring`) y etiquetas contextuales (`data-cursor-label`), desactivado automáticamente en pantallas táctiles (`pointer: coarse`).
  - Spotlight radial dinámico (`--mouse-x`, `--mouse-y`) sobre tarjetas `.card-box`, `.inner-content` y `.spotlight-card`.
  - Micro-interacciones magnéticas (`[data-magnetic]`) en botones principales (`.btn-brand`) e íconos sociales (`.social-icon-btn`).
  - Constelación de partículas HTML5 `<canvas>` conectada interactivamente al cursor en el Hero.
  - Barra superior de progreso de lectura y animaciones escalonadas (`IntersectionObserver`) con soporte estricto para `prefers-reduced-motion: reduce`.

---

## Estructura del Repositorio

```text
portfolio/
├── public/
│   ├── assets/
│   │   ├── css/plugins/        # icofont.css & technology-icons.css
│   │   ├── cv/                 # CVs 2026 actualizados en PDF
│   │   ├── fonts/              # Fuentes WOFF/WOFF2 de Icofont y Technology Icons
│   │   └── images/             # cartographer.png, iam-4.jpg y icons/boy.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experiences.astro
│   │   ├── Services.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── StyleSwitcher.astro
│   │   └── InteractiveCursor.astro
│   ├── data/
│   │   └── portfolio.ts        # Fuente única de verdad (CV 2026)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css          # Sistema de diseño, ondas SVG, cursor y tokens
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Comandos de Ejecución y Revisión

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (http://localhost:4321)
npm run dev

# 3. Compilar versión estática de producción en dist/
npm run build

# 4. Previsualizar compilación de producción localmente
npm run preview
```
