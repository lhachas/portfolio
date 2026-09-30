# Portafolio Profesional Bilingüe (ES / EN) - Leonel Hacha Salazar (LHachaS)

Portafolio de ingeniería de software de **Leonel Hacha Salazar** (**Senior Backend Developer | Full Stack Developer**), construido con **Astro**, **Tailwind CSS v4**, **GSAP** y **Astro Content Collections + Zod**, respetando una identidad visual **100% Solid Minimalist** (cero glassmorphism, cero transparencias difusas) y con **100% del contenido centralizado en archivos YAML bilingües editables sin tocar código** (`src/content/portfolio/portfolio.yml` para Español y `src/content/portfolio/portfolio-en.yml` para Inglés).

---

## Guía Rápida: ¿Cómo Actualizar la Información sin Saber Programación ni HTML?

Todo el texto, datos personales, experiencias laborales, habilidades, formación continua, competencias, idiomas, enlaces a los 4 CVs oficiales (`ES.pdf`, `EN.pdf`, `ES.docx`, `EN.docx`), redes sociales, formulario de contacto, pie de página y metadatos SEO viven exclusivamente en:

- 🇪🇸 **Español (`/portfolio/`):** **`src/content/portfolio/portfolio.yml`**
- 🇺🇸 **Inglés (`/portfolio/en/`):** **`src/content/portfolio/portfolio-en.yml`**

Ningún componente `.astro` ni página HTML tiene textos fijos escritos adentro. Cuando cambias cualquier texto en los archivos YAML, toda la página web (incluyendo Google SEO, etiquetas `hreflang`, tarjetas de LinkedIn/WhatsApp y secciones visuales) se actualiza automáticamente.

### CVs Oficiales Válidos (Única Fuente de Verdad Documental)
Los únicos 4 archivos de CV autorizados en `public/assets/cv/` (validados por expresión regular en compilación mediante `src/content.config.ts`) son:
1. `CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf`
2. `CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf`
3. `CV-Leonel-Hacha-Salazar-Backend-2026-ES.docx`
4. `CV-Leonel-Hacha-Salazar-Backend-2026-EN.docx`

### Reglas Básicas de Edición (YAML)
1. **Edita solo lo que está entre comillas `""` después de los dos puntos `:`**
   - Ejemplo: `phone: "+51 959 034 122"` → puedes cambiarlo a `phone: "+51 999 888 777"`.
2. **Respeta los espacios al inicio de cada línea (indentación):**
   - Usa siempre espacios (nunca la tecla Tabulador) y mantén los bloques alineados tal como están.
3. **Colores 100% sólidos en formato hexadecimal de 6 dígitos (`#RRGGBB`):**
   - Ejemplo válido: `"#cdb30c"`, `"#2563eb"`, `"#0d9488"`.
   - Si por error escribes un color inválido o con transparencia (`rgba(...)`), el sistema de validación automática (**Zod**) te avisará exactamente en qué línea está el error antes de publicar.

### Ejemplos Prácticos de Actualización

#### 1. Cambiar tu teléfono, correo, ubicación o enlaces de CV
Abre `src/content/portfolio/portfolio.yml` (y su par en inglés `portfolio-en.yml`) en la sección `# 2. DATOS PERSONALES E IDENTIDAD DE MARCA`:
```yaml
profile:
  name: "Leonel Hacha Salazar"
  roleHeadline: "Senior Backend Developer | Full Stack Developer"
  yearsExperience: "9+"
  location: "Espinar, Cusco, Perú"
  phone: "+51 959 034 122"
  phoneClean: "+51959034122"
  email: "lionelsh.salazar@gmail.com"
  cvPrimary:
    url: "/assets/cv/CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf"
    filename: "CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf"
    labelHero: "CV 2026 (ES · PDF)"
```

#### 2. Agregar una nueva Experiencia Laboral a la Línea de Tiempo
Ve a la sección `# 8. SECCIÓN EXPERIENCIA PROFESIONAL` (`experiencesSection.items`) y copia el primer bloque que empieza con `- id:`:
```yaml
    - id: "nueva-empresa-2027"
      stepNumber: "01"
      title: "Senior Backend Architect"
      company: "Nombre de la Empresa | Cliente"
      clientOrDomain: "Fintech / Banca Digital"
      date: "Sep 2026 - Actualidad"
      shortDate: "2026 - Hoy"
      location: "Remoto LATAM"
      color: "#cdb30c"
      summary: "Resumen ejecutivo de tu rol principal en una o dos oraciones orientadas a impacto."
      highlights:
        - label: "Logro Principal 1"
          text: "Descripción detallada del logro técnico, arquitectura y valor de negocio."
      technologies:
        - "Node.js"
        - "TypeScript"
        - "AWS"
```

#### 3. Agregar una nueva Línea de Formación Continua o Especialización
Ve a la sección `# 6. SECCIÓN PERFIL PROFESIONAL` → `trainingShowcase` → `courses` y añade un bloque con guion:
```yaml
      - name: "Nombre de la Especialización Técnica"
        provider: "Cloud & Distributed"
        providerColor: "#2563eb"
        date: "2026"
        domain: "AWS, Kubernetes y Resiliencia"
```

---

## Estructura del Repositorio

```text
portfolio/
├── public/
│   ├── assets/
│   │   ├── css/plugins/               # icofont.css & technology-icons.css
│   │   ├── cv/                        # 4 CVs Oficiales 2026 (ES/EN en PDF y DOCX)
│   │   ├── fonts/                     # Fuentes WOFF/WOFF2 de Icofont y Technology Icons
│   │   └── images/                    # cartographer.png, iam-4.jpg y icons/boy.png
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── content/
│   │   └── portfolio/
│   │       ├── portfolio.yml          # ★ FUENTE DE VERDAD ESPAÑOL (100% del contenido ES)
│   │       └── portfolio-en.yml       # ★ FUENTE DE VERDAD INGLÉS (100% del contenido EN)
│   ├── content.config.ts              # Esquema Zod estricto (valida CVs oficiales y hex sólidos)
│   ├── data/
│   │   └── portfolio.ts               # Cargador tipado bilingüe (getPortfolioContent('es' | 'en'))
│   ├── components/
│   │   ├── Navbar.astro               # Navegación + selector ES/EN + selector claro/oscuro sólido
│   │   ├── Hero.astro                 # Hero Product Designer con GSAP + ScrollTrigger + Canvas
│   │   ├── About.astro                # Perfil Profesional + Bento Educación + Desarrollo Continuo
│   │   ├── Skills.astro               # 4 Pilares Técnicos del CV 2026 con filtros interactivos
│   │   ├── Experiences.astro          # Línea del tiempo interconectada de 6 etapas sólidas
│   │   ├── Services.astro             # Arquitectura y Soluciones con entregables verificables
│   │   ├── Contact.astro              # Canales oficiales + 4 CVs + Formulario funcional anti-XSS
│   │   ├── Footer.astro               # Footer ejecutivo de 3 columnas sin solapamiento de onda
│   │   ├── StyleSwitcher.astro        # Selector de 6 colores sólidos con propagación total CSS
│   │   └── InteractiveCursor.astro    # Cursor spring dual y barra de progreso superior
│   ├── layouts/
│   │   └── Layout.astro               # SEO bilingüe, hreflang, OpenGraph, JSON-LD y CSP
│   ├── pages/
│   │   ├── index.astro                # Ruta principal en Español (/portfolio/)
│   │   └── en/
│   │       └── index.astro            # Ruta en Inglés (/portfolio/en/)
│   └── styles/
│       └── global.css                 # Tokens de diseño 100% sólidos y propagación de acento
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Comandos de Validación, Compilación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Validar el archivo YAML y tipos TypeScript con el esquema Zod
npm run validate:content

# 3. Iniciar servidor local de desarrollo (http://localhost:4321/portfolio/)
npm run dev

# 4. Compilar versión estática de producción en dist/ (incluye validación Zod)
npm run build

# 5. Previsualizar compilación de producción localmente
npm run preview
```
