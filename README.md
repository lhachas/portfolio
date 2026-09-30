# Portafolio Profesional - Leonel Hacha Salazar (LHachaS)

Portafolio de ingeniería de software de **Leonel Hacha Salazar** (**Senior Backend Developer | Full Stack Developer**), construido con **Astro**, **Tailwind CSS v4**, **GSAP** y **Astro Content Collections + Zod**, respetando una identidad visual **100% Solid Minimalist** (cero glassmorphism, cero transparencias difusas) y con **100% del contenido centralizado en un único archivo YAML editable sin tocar código** (`src/content/portfolio/portfolio.yml`).

---

## Guía Rápida: ¿Cómo Actualizar la Información sin Saber Programación ni HTML?

Todo el texto, datos personales, experiencias laborales, habilidades, cursos, certificaciones, idiomas, enlaces a CVs, redes sociales, formulario de contacto, pie de página y metadatos SEO viven en **un único archivo**:

👉 **`src/content/portfolio/portfolio.yml`**

Ningún componente `.astro` ni página HTML tiene textos fijos escritos adentro. Cuando cambias cualquier texto en `src/content/portfolio/portfolio.yml`, toda la página web (incluyendo Google SEO, tarjetas de LinkedIn/WhatsApp y secciones visuales) se actualiza automáticamente.

### Reglas Básicas de Edición (YAML)
1. **Edita solo lo que está entre comillas `""` después de los dos puntos `:`**
   - Ejemplo: `phone: "+51 959 034 122"` → puedes cambiarlo a `phone: "+51 999 888 777"`.
2. **Respeta los espacios al inicio de cada línea (indentación):**
   - Usa siempre espacios (nunca la tecla Tabulador) y mantén los bloques alineados tal como están.
3. **Colores 100% sólidos en formato hexadecimal de 6 dígitos (`#RRGGBB`):**
   - Ejemplo válido: `"#cdb30c"`, `"#2563eb"`, `"#0d9488"`.
   - Si por error escribes un color inválido o con transparencia (`rgba(...)`), el sistema de validación automática (**Zod**) te avisará exactamente en qué línea está el error antes de publicar.

### Ejemplos Prácticos de Actualización

#### 1. Cambiar tu teléfono, correo, ubicación o enlace de CV
Abre `src/content/portfolio/portfolio.yml` en la sección `# 2. DATOS PERSONALES E IDENTIDAD DE MARCA`:
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
    labelHero: "Descargar CV 2026"
```
*(Si tienes un nuevo archivo PDF de CV, súbelo a la carpeta `public/assets/cv/` y pon su nombre en `url` y `filename`).*

#### 2. Agregar una nueva Experiencia Laboral a la Línea de Tiempo
Ve a la sección `# 8. SECCIÓN MIS EXPERIENCIAS` (`experiencesSection.items`) y copia el primer bloque que empieza con `- id:`:
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
      summary: "Resumen corto de tu rol principal en una o dos oraciones."
      highlights:
        - label: "Logro Principal 1"
          text: "Descripción detallada del logro técnico y de negocio."
      technologies:
        - "Node.js"
        - "TypeScript"
        - "AWS"
```

#### 3. Agregar un nuevo Curso o Certificación
Ve a la sección `# 6. SECCIÓN SOBRE MÍ` → `trainingShowcase` → `courses` y añade un bloque con guion:
```yaml
      - name: "Nombre del Nuevo Curso o Certificación"
        provider: "Udemy"
        providerColor: "#A435F0"
        date: "10/2026"
        domain: "Arquitectura Cloud"
```

#### 4. Editar directamente desde el navegador en GitHub (sin instalar nada)
1. Entra a tu repositorio en GitHub y abre `src/content/portfolio/portfolio.yml`.
2. Haz clic en el ícono del lápiz (**Edit this file**) arriba a la derecha.
3. Modifica los textos que desees y haz clic en el botón verde **Commit changes...**.
4. GitHub validará automáticamente que todos los datos sean correctos y publicará la web actualizada en `https://lhachas.github.io/portfolio/` en menos de 1 minuto.

---

## Estructura del Repositorio

```text
portfolio/
├── public/
│   ├── assets/
│   │   ├── css/plugins/               # icofont.css & technology-icons.css
│   │   ├── cv/                        # CVs 2026 actualizados en PDF
│   │   ├── fonts/                     # Fuentes WOFF/WOFF2 de Icofont y Technology Icons
│   │   └── images/                    # cartographer.png, iam-4.jpg y icons/boy.png
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── content/
│   │   └── portfolio/
│   │       └── portfolio.yml          # ★ ÚNICA FUENTE DE VERDAD (100% del contenido editable)
│   ├── content.config.ts              # Esquema Zod estricto de validación en build-time
│   ├── data/
│   │   └── portfolio.ts               # Cargador tipado de Content Collection (0% texto embebido)
│   ├── components/
│   │   ├── Navbar.astro               # Navegación superior + selector claro/oscuro sólido
│   │   ├── Hero.astro                 # Hero Product Designer con GSAP + ScrollTrigger + Canvas
│   │   ├── About.astro                # Sobre Mí + Bento Cards Educación + Drawer Cursos/Skills
│   │   ├── Skills.astro               # 4 Pilares de Ingeniería con filtros y barras animadas
│   │   ├── Experiences.astro          # Línea del tiempo interconectada de 6 etapas sólidas
│   │   ├── Services.astro             # Servicios ejecutivos y entregables clave
│   │   ├── Contact.astro              # Canales oficiales + Formulario funcional anti-XSS
│   │   ├── Footer.astro               # Footer ejecutivo de 3 columnas sin solapamiento de onda
│   │   ├── StyleSwitcher.astro        # Selector de 6 colores sólidos de acento
│   │   └── InteractiveCursor.astro    # Cursor spring dual y barra de progreso superior
│   ├── layouts/
│   │   └── Layout.astro               # SEO, OpenGraph, JSON-LD Schema.org y CSP endurecida
│   ├── pages/
│   │   └── index.astro                # Ensamblaje de secciones del portafolio
│   └── styles/
│       └── global.css                 # Tokens de diseño 100% sólidos y curvas SVG (.wave)
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
