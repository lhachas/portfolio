export interface NavItem {
  id: string;
  icon: string;
  label: string;
}

export interface SocialLinkItem {
  id: 'linkedin' | 'github' | 'whatsapp' | 'facebook' | 'instagram' | 'email';
  name: string;
  handle: string;
  url: string;
  icon: string;
  brandColor: string;
  brandHoverColor: string;
}

export interface HeroMetricItem {
  value: string;
  label: string;
  detail: string;
  icon: string;
  accentColor: string;
}

export interface HeroArchPillItem {
  icon: string;
  label: string;
  brandColor: string;
}

export interface SkillItem {
  name: string;
  level: string;
  icon: string;
  brandColor: string;
  detail?: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
  items: SkillItem[];
  tags: string[];
}

export interface ExperienceHighlight {
  label: string;
  text: string;
}

export interface ExperienceItem {
  id: string;
  stepNumber: string;
  title: string;
  company: string;
  clientOrDomain: string;
  date: string;
  shortDate: string;
  location: string;
  color: string;
  summary: string;
  highlights: ExperienceHighlight[];
  technologies: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  badgeLabel: string;
  deliverables: string[];
}

export interface EducationItem {
  category: string;
  institution: string;
  detail: string;
  period: string;
  icon: string;
  accentColor: string;
  badgeText: string;
}

export interface CourseItem {
  name: string;
  provider: 'Udemy' | 'Platzi';
  providerColor: string;
  date: string;
  domain: string;
}

const rawBase = import.meta.env.BASE_URL || '/';
export const basePath = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
export const withBase = (path: string): string => `${basePath}${path.replace(/^\/+/, '')}`;

export const profileData = {
  name: 'Leonel Hacha Salazar',
  brandPrefix: 'L',
  brandHighlight: 'Hacha',
  brandSuffix: 'S',
  roleHeadline: 'Senior Backend Developer | Full Stack Developer',
  availabilityBadge: 'Disponible · Senior Backend & Full-Stack · Remoto LATAM / Global',
  typedStrings: [
    'Leonel Hacha Salazar',
    'Senior Backend Developer',
    'Full Stack Developer',
    'Especialista Node.js & NestJS',
    'Arquitecto Cloud AWS & Java',
  ],
  yearsExperience: '9+',
  location: 'Espinar, Cusco, Perú',
  phone: '+51 959 034 122',
  phoneClean: '+51959034122',
  email: 'lionelsh.salazar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leonel-hacha-salazar',
  github: 'https://github.com/LHachaS',
  whatsapp: 'https://wa.link/lr47pf',
  facebook: 'https://facebook.com/Leonel.Hacha.Salazar',
  instagram: 'https://www.instagram.com/leonelhacha',
  cvBackendUrl: withBase('/assets/cv/CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf'),
  cvBaufestUrl: withBase('/assets/cv/CV-Leonel-Hacha-Salazar-Backend-Bit-2026.pdf'),
  heroGreeting: '¡Hola, bienvenido!',
  heroSubtitle:
    'Desarrollador Senior con más de 9 años construyendo plataformas financieras, retail y logística de alta concurrencia. Especialista en Node.js, TypeScript, NestJS, Java (Spring Boot/WebFlux), Angular, React y arquitecturas Serverless & Event-Driven en AWS.',
  heroArchitecturePills: [
    { icon: 'icon-nodejs', label: 'Node.js · TypeScript · NestJS', brandColor: '#339933' },
    { icon: 'icon-java', label: 'Java 15/17/21 · Spring WebFlux', brandColor: '#E76F00' },
    { icon: 'icon-ec3', label: 'AWS Serverless · EDA · Hexagonal', brandColor: '#EA6A15' },
    { icon: 'icon-angular', label: 'Angular · React · Full-Stack', brandColor: '#DD0031' },
  ] as HeroArchPillItem[],
  heroMetrics: [
    {
      value: '9+ Años',
      label: 'Trayectoria Senior',
      detail: 'Banca Digital, Retail & IoT',
      icon: 'icofont-badge',
      accentColor: '#cdb30c',
    },
    {
      value: '5 Líneas',
      label: 'Productos Banca Digital',
      detail: 'Core Temenos, Onfido & LexisNexis',
      icon: 'icofont-bank-alt',
      accentColor: '#2563eb',
    },
    {
      value: '6 Flujos Core',
      label: 'Ciclo Financiero AWS',
      detail: 'Lambda, SQS, Step Fn & DynamoDB',
      icon: 'icofont-cloud',
      accentColor: '#ea6a15',
    },
    {
      value: 'End-to-End',
      label: 'Calidad & Observabilidad',
      detail: 'DDD, Clean Code & CI/CD',
      icon: 'icofont-architecture-alt',
      accentColor: '#0d9488',
    },
  ] as HeroMetricItem[],
  aboutLead:
    'Desarrollador Senior con más de 9 años de experiencia construyendo soluciones de software escalables y mantenibles para la industria financiera, retail y tecnología automotriz.',
  aboutRoleTitle: 'Senior Backend &',
  aboutRoleHighlight: 'Full-Stack Developer',
  aboutParagraphs: [
    'Experto en desarrollo backend con Node.js, TypeScript, NestJS, Java (15/17/21) y Spring Boot/WebFlux, complementado con desarrollo frontend moderno en Angular, React y Vue.js. Especializado en arquitecturas Serverless, Event-Driven (EDA) y Hexagonal sobre AWS, integración de APIs REST, GraphQL y SOAP, bases de datos SQL/NoSQL y despliegue de contenedores en Docker y Kubernetes.',
    'Priorizo la calidad del código mediante Clean Code, Domain-Driven Design (DDD), patrones de diseño, testing automatizado (Jest, JUnit, TestContainers, Mockito), observabilidad distribuida (New Relic, Prometheus, Grafana, AWS CloudWatch) y automatización CI/CD en entornos de alcance internacional, potenciando el ciclo de ingeniería con herramientas de desarrollo asistido por IA (GitHub Copilot, Claude, ChatGPT y Cursor).',
  ],
  coreStackPills: [
    'Node.js',
    'TypeScript',
    'NestJS',
    'Angular',
    'React',
    'Java (15/17/21)',
    'Spring Boot & WebFlux',
    'AWS Serverless',
    'Microservices',
    'Event-Driven (EDA)',
    'Arquitectura Hexagonal',
    'PostgreSQL & DynamoDB',
    'Docker & Kubernetes',
  ],
  softSkills: [
    'Resolución de problemas',
    'Pensamiento analítico',
    'Comunicación efectiva',
    'Trabajo en equipo',
    'Adaptabilidad',
    'Autonomía',
    'Aprendizaje continuo',
    'Liderazgo técnico colaborativo',
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Quechua', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio' },
  ],
};

export const socialLinks: SocialLinkItem[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/in/leonel-hacha-salazar',
    url: profileData.linkedin,
    icon: 'icofont-linkedin',
    brandColor: '#0A66C2',
    brandHoverColor: '#004182',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@LHachaS',
    url: profileData.github,
    icon: 'icofont-github',
    brandColor: '#24292F',
    brandHoverColor: '#111418',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: profileData.phone,
    url: profileData.whatsapp,
    icon: 'icofont-whatsapp',
    brandColor: '#25D366',
    brandHoverColor: '#1DA851',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Leonel.Hacha.Salazar',
    url: profileData.facebook,
    icon: 'icofont-facebook',
    brandColor: '#1877F2',
    brandHoverColor: '#0d65d9',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@leonelhacha',
    url: profileData.instagram,
    icon: 'icofont-instagram',
    brandColor: '#E4405F',
    brandHoverColor: '#C13584',
  },
  {
    id: 'email',
    name: 'Email',
    handle: profileData.email,
    url: `mailto:${profileData.email}`,
    icon: 'icofont-envelope',
    brandColor: '#EA4335',
    brandHoverColor: '#C5221F',
  },
];

export const navItems: NavItem[] = [
  {
    id: 'home',
    icon: 'icofont-ui-home',
    label: 'Inicio',
  },
  {
    id: 'about',
    icon: 'icofont-man-in-glasses',
    label: 'Sobre Mí',
  },
  {
    id: 'skills',
    icon: 'icofont-certificate-alt-1',
    label: 'Mis Habilidades',
  },
  {
    id: 'experiences',
    icon: 'icofont-architecture-alt',
    label: 'Mis Experiencias',
  },
  {
    id: 'services',
    icon: 'icofont-responsive',
    label: 'Servicios',
  },
  {
    id: 'contact',
    icon: 'icofont-support',
    label: 'Contacto',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages-frameworks',
    icon: 'icofont-console',
    title: 'Lenguajes y Frameworks',
    subtitle: 'Desarrollo backend transaccional, interfaces reactivas modernas y contratos API estandarizados',
    accentColor: '#2563eb',
    items: [
      { name: 'Node.js, TypeScript & NestJS', level: '95%', icon: 'icon-nodejs', brandColor: '#339933' },
      { name: 'Java (15/17/21) & Spring Boot/WebFlux', level: '88%', icon: 'icon-java', brandColor: '#E76F00' },
      { name: 'Angular, React, Vue.js & RxJS', level: '90%', icon: 'icon-angular', brandColor: '#DD0031' },
      { name: 'APIs REST, GraphQL, SOAP & OpenAPI', level: '95%', icon: 'icon-opensource', brandColor: '#E10098' },
      { name: 'C# / .NET Core & PHP / Laravel', level: '84%', icon: 'icon-csharp', brandColor: '#512BD4' },
    ],
    tags: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'Angular',
      'React',
      'Vue.js',
      'Java (15/17/21)',
      'Spring Boot',
      'Spring WebFlux',
      'RxJS',
      'C# / .NET Core',
      'RESTful APIs',
      'GraphQL',
      'SOAP',
      'OpenAPI / Swagger',
    ],
  },
  {
    id: 'cloud-distributed',
    icon: 'icofont-cloud',
    title: 'Cloud y Sistemas Distribuidos',
    subtitle: 'Arquitecturas Serverless, Event-Driven (EDA), Hexagonal y contenedores en AWS y Kubernetes',
    accentColor: '#ea6a15',
    items: [
      { name: 'AWS Serverless (Lambda, SQS, Step Fn)', level: '94%', icon: 'icon-ec3', brandColor: '#EA6A15' },
      { name: 'AWS Cloud (EKS, S3, API Gateway, RDS)', level: '92%', icon: 'icon-ec3', brandColor: '#0284C7' },
      { name: 'Microservicios & Event-Driven (EDA)', level: '94%', icon: 'icon-opensource', brandColor: '#0D9488' },
      { name: 'Arquitectura Hexagonal & Sistemas Dist.', level: '92%', icon: 'icon-opensource', brandColor: '#2563EB' },
      { name: 'Docker, Kubernetes & CI/CD Pipelines', level: '88%', icon: 'icon-git', brandColor: '#2496ED' },
    ],
    tags: [
      'AWS Lambda',
      'Amazon SQS',
      'DynamoDB',
      'Step Functions',
      'Amazon S3',
      'API Gateway',
      'AWS EKS',
      'Microservicios',
      'Serverless',
      'Event-Driven (EDA)',
      'Arquitectura Hexagonal',
      'Docker',
      'Kubernetes',
      'GitLab CI/CD',
      'GitHub Actions',
    ],
  },
  {
    id: 'data-observability',
    icon: 'icofont-database',
    title: 'Base de Datos, Calidad y Observabilidad',
    subtitle: 'Persistencia SQL/NoSQL, testing automatizado, telemetría distribuida y diseño limpio',
    accentColor: '#0d9488',
    items: [
      { name: 'PostgreSQL, MySQL, SQL Server & Redis', level: '92%', icon: 'icon-postgres', brandColor: '#336791' },
      { name: 'DynamoDB, MongoDB, TypeORM & Prisma', level: '92%', icon: 'icon-database', brandColor: '#10AA50' },
      { name: 'Testing (Jest, JUnit, TestContainers)', level: '90%', icon: 'icon-opensource', brandColor: '#99425B' },
      { name: 'Observabilidad (New Relic, Prometheus)', level: '88%', icon: 'icon-opensource', brandColor: '#E6522C' },
      { name: 'Clean Code, DDD & Patrones de Diseño', level: '92%', icon: 'icon-opensource', brandColor: '#4F46E5' },
    ],
    tags: [
      'PostgreSQL',
      'DynamoDB',
      'MongoDB',
      'Redis',
      'MySQL',
      'TypeORM',
      'Prisma',
      'JPA / Hibernate',
      'Jest',
      'JUnit',
      'TestContainers',
      'Mockito',
      'New Relic',
      'Prometheus',
      'Grafana',
      'CloudWatch',
      'Clean Code',
      'DDD',
    ],
  },
  {
    id: 'ai-assisted-dev',
    icon: 'icofont-automation',
    title: 'Desarrollo Asistido por IA y Seguridad',
    subtitle: 'Ingeniería aumentada con IA, análisis de vulnerabilidades OWASP, documentación C4 e integraciones críticas',
    accentColor: '#7c3aed',
    items: [
      { name: 'IA Aplicada (Copilot, Claude, Cursor)', level: '95%', icon: 'icon-opensource', brandColor: '#7C3AED' },
      { name: 'Refactorización Legacy & Auto-Testing', level: '92%', icon: 'icon-opensource', brandColor: '#059669' },
      { name: 'Seguridad Aplicativa (OWASP & Auth0)', level: '90%', icon: 'icon-opensource', brandColor: '#EB5424' },
      { name: 'Documentación Técnica (OpenAPI & C4)', level: '94%', icon: 'icon-opensource', brandColor: '#0284C7' },
      { name: 'Fintech Core (Temenos, Onfido, Lexis)', level: '92%', icon: 'icon-opensource', brandColor: '#D97706' },
    ],
    tags: [
      'GitHub Copilot',
      'Claude',
      'ChatGPT',
      'Cursor',
      'Refactorización Legacy',
      'Seguridad OWASP',
      'Pruebas Unitarias/Integración',
      'OpenAPI',
      'Modelo C4',
      'Temenos Transact',
      'Onfido Studio',
      'LexisNexis',
      'Auth0',
      'Puppeteer',
    ],
  },
];

export const experiencesData: ExperienceItem[] = [
  {
    id: 'baufest-qik',
    stepNumber: '01',
    title: 'Desarrollador Backend',
    company: 'Baufest | Cliente: Qik Banco Digital Dominicano S.A.',
    clientOrDomain: 'Banca Digital / Fintech',
    date: 'Mar 2024 - Ago 2026',
    shortDate: '2024 - 2026',
    location: 'República Dominicana (Remoto)',
    color: '#cdb30c',
    summary:
      'Diseño y evolución de servicios backend financieros, integraciones bancarias críticas y flujos transaccionales serverless y orientados a eventos sobre AWS.',
    highlights: [
      {
        label: 'Arquitectura de Productos Financieros',
        text: 'Diseñé y evolucioné servicios backend para 5 líneas de productos financieros (Certificados de Depósito y seguros de tarjeta de crédito, vida, hogar y préstamos) dentro de un ecosistema de banca digital, aplicando Arquitectura Hexagonal y patrones DDD.',
      },
      {
        label: 'Integraciones Críticas y Onboarding',
        text: 'Desarrollé APIs REST/GraphQL y microservicios para la gestión transaccional de tarjetas, usuarios y cuentas; integré servicios de biometría y prueba de vida (Onfido Studio), validación de señales de riesgo/fraude (LexisNexis Risk Solutions) y comunicación con el core bancario Temenos Transact.',
      },
      {
        label: 'Ciclo de Vida y Arquitectura Cloud',
        text: 'Implementé 6 operaciones críticas del ciclo de vida financiero (apertura, cancelación anticipada, cierre, bloqueo, desbloqueo y renovación automática) con sincronización de datos y notificaciones en tiempo real, sobre una arquitectura AWS Serverless y Event-Driven (Lambda, SQS, Step Functions, DynamoDB).',
      },
      {
        label: 'Calidad, Operación y CI/CD',
        text: 'Garanticé la resiliencia y mantenibilidad del sistema mediante pruebas unitarias con Jest, monitoreo distribuido con AWS CloudWatch y despliegue continuo con pipelines en GitLab CI/CD, participando en code reviews y soporte a incidencias en producción.',
      },
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'TypeORM',
      'Prisma',
      'Redis',
      'REST',
      'GraphQL',
      'Temenos Transact',
      'Onfido Studio',
      'LexisNexis',
      'AWS Lambda',
      'Amazon SQS',
      'DynamoDB',
      'Amazon RDS',
      'Amazon S3',
      'API Gateway',
      'Step Functions',
      'CloudWatch',
      'Docker',
      'Jest',
      'GitLab CI/CD',
      'Scrum',
    ],
  },
  {
    id: 'baufest-cencosud',
    stepNumber: '02',
    title: 'Desarrollador Backend',
    company: 'Baufest | Cliente: Cencosud - Delivery as a Service (DaaS)',
    clientOrDomain: 'Retail / Logística',
    date: 'Feb 2022 - Ago 2023',
    shortDate: '2022 - 2023',
    location: 'Latinoamérica (Remoto)',
    color: '#ea6a15',
    summary:
      'Desarrollo de servicios reactivos y microservicios distribuidos en AWS y Kubernetes para el core logístico e integración de operadores de última milla.',
    highlights: [
      {
        label: 'Core Logístico y Flujos de Entrega',
        text: 'Diseñé, desarrollé y mantuve componentes backend para 4 operaciones clave de la plataforma DaaS (Delivery as a Service): emisión, devolución, reagendamiento y seguimiento en tiempo real de órdenes de entrega.',
      },
      {
        label: 'Integración Resiliente de Operadores Logísticos',
        text: 'Integré múltiples operadores logísticos (Couriers) mediante APIs REST/SOAP, aplicando patrones de diseño, reintentos, recuperación ante fallos y gestión de estados para fortalecer continuidad y trazabilidad operativa.',
      },
      {
        label: 'Servicios Reactivos y Cloud-Native',
        text: 'Construí servicios reactivos con Java/Spring WebFlux y microservicios Node.js/NestJS con RxJS, desplegados en arquitecturas distribuidas sobre AWS y Kubernetes.',
      },
      {
        label: 'Automatización, Observabilidad y DevOps',
        text: 'Automaticé la generación y almacenamiento masivo de etiquetas de despacho con Puppeteer y Amazon S3; incorporé testing, monitoreo con Prometheus/Grafana, observabilidad con New Relic y pipelines GitLab CI/CD.',
      },
    ],
    technologies: [
      'Java 15',
      'Spring Boot',
      'Spring WebFlux',
      'Node.js',
      'TypeScript',
      'NestJS',
      'RxJS',
      'PostgreSQL',
      'TypeORM',
      'REST',
      'SOAP',
      'AWS',
      'Docker',
      'Kubernetes',
      'Gradle',
      'Jest',
      'Puppeteer',
      'Prometheus',
      'Grafana',
      'New Relic',
      'GitLab CI/CD',
      'Scrumban',
    ],
  },
  {
    id: 'payqa',
    stepNumber: '03',
    title: 'Desarrollador Backend',
    company: 'Payqa Soluciones S.A.C.',
    clientOrDomain: 'Aplicación Móvil / Cliente de EE. UU.',
    date: 'Ago 2021 - Dic 2021',
    shortDate: 'Ago - Dic 2021',
    location: 'Estados Unidos (Remoto)',
    color: '#0d9488',
    summary:
      'Diseño e implementación de microservicios y funciones serverless para la API backend de una plataforma móvil internacional en tiempo real.',
    highlights: [
      {
        label: 'Arquitectura Serverless Cloud',
        text: 'Diseñé e implementé microservicios y funciones serverless con NestJS, TypeScript y AWS Lambda para la API backend de una aplicación móvil internacional orientada a la interconexión e interacción en tiempo real entre usuarios.',
      },
      {
        label: 'Seguridad, Identidad y Contratos API',
        text: 'Integré Auth0, MongoDB/TypeORM y documentación Swagger/OpenAPI, reforzando autenticación, persistencia y mantenibilidad.',
      },
      {
        label: 'Calidad e Integración Continua',
        text: 'Configuré pipelines de integración continua en GoCD, aplicando principios de arquitectura modular y patrones de diseño para garantizar código desacoplado, mantenible y con alta cobertura de pruebas.',
      },
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'TypeORM',
      'MongoDB',
      'AWS Lambda',
      'API Gateway',
      'Auth0',
      'REST',
      'Swagger/OpenAPI',
      'Java',
      'Spring Boot',
      'GoCD',
    ],
  },
  {
    id: 'autosense',
    stepNumber: '04',
    title: 'Desarrollador Full Stack',
    company: 'Autosense International - California, EE. UU.',
    clientOrDomain: 'Tecnología Automotriz / IoT',
    date: 'Jun 2021 - Jul 2021',
    shortDate: 'Jun - Jul 2021',
    location: 'California, EE. UU. (Remoto)',
    color: '#2563eb',
    summary:
      'Solución Full Stack end-to-end para la ingesta, procesamiento y generación automatizada de reportes de telemetría vehicular.',
    highlights: [
      {
        label: 'Procesamiento de Datos Automotrices',
        text: 'Diseñé y desarrollé una solución end-to-end para la ingesta, transformación y estructuración automatizada de datos de telemetría y logs de dispositivos de control de alcoholemia vehicular, convirtiendo información cruda en reportes ejecutivos.',
      },
      {
        label: 'Arquitectura Full Stack Monorepo',
        text: 'Construí la aplicación web en un ecosistema monorepo con Nx, integrando un frontend reactivo en Angular (RxJS) y un backend modular en NestJS/TypeORM sobre MySQL.',
      },
      {
        label: 'Automatización de Reportes y DevOps',
        text: 'Implementé un motor de generación masiva de reportes PDF dinámicos utilizando Puppeteer y configuré el flujo de CI/CD con GitHub Actions, automatizando el despliegue en servidores VPS sobre Nginx como proxy inverso.',
      },
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'Angular',
      'Nx',
      'RxJS',
      'TypeORM',
      'MySQL',
      'REST',
      'Puppeteer',
      'GitHub Actions',
      'Nginx',
      'VPS',
    ],
  },
  {
    id: 'recomsac',
    stepNumber: '05',
    title: 'Desarrollador Full Stack',
    company: 'RECOMSAC E.I.R.L.',
    clientOrDomain: 'Tecnología Educativa / EdTech',
    date: 'Feb 2020 - Jun 2021',
    shortDate: '2020 - 2021',
    location: 'Lima, Perú',
    color: '#7c3aed',
    summary:
      'Diseño e implementación integral de una plataforma web de gestión académica en arquitectura monorepo Nx con Angular y NestJS.',
    highlights: [
      {
        label: 'Plataforma EdTech Integral',
        text: 'Diseñé e implementé una plataforma web de gestión escolar compuesta por 5 módulos centrales: control de asistencia, registro de calificaciones, administración de cursos, gestión de usuarios y control académico.',
      },
      {
        label: 'Ecosistema Full Stack y Persistencia',
        text: 'Desarrollé APIs REST modulares con NestJS y TypeScript conectadas a un frontend dinámico en Angular (arquitectura monorepo Nx), modelando esquemas relacionales optimizados en MySQL mediante TypeORM.',
      },
      {
        label: 'Generación de Reportes y Deployment',
        text: 'Automaticé la emisión de libretas de notas, certificados y reportes académicos oficiales con Puppeteer, y configuré la entrega continua mediante GitHub Actions para despliegues en servidores VPS optimizados con Nginx.',
      },
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'Angular',
      'Nx',
      'RxJS',
      'TypeORM',
      'MySQL',
      'REST',
      'Puppeteer',
      'GitHub Actions',
      'Nginx',
      'VPS',
    ],
  },
  {
    id: 'alpha-ingenieros',
    stepNumber: '06',
    title: 'Programador de Sistemas Informáticos',
    company: 'Alpha Ingenieros E.I.R.L.',
    clientOrDomain: 'Software Empresarial / ERP & Punto de Venta',
    date: 'Ene 2016 - Ago 2019',
    shortDate: '2016 - 2019',
    location: 'Cusco, Perú',
    color: '#059669',
    summary:
      'Desarrollo de software empresarial a medida para facturación electrónica, POS, e-commerce y gestión de restaurantes.',
    highlights: [
      {
        label: 'Desarrollo de Software Empresarial',
        text: 'Desarrollé e implementé soluciones a medida para 4 dominios de negocio: facturación electrónica, punto de venta (POS), e-commerce y gestión de restaurantes, utilizando C#, .NET Core, PHP (Laravel) y JavaScript.',
      },
      {
        label: 'Bases de Datos y Mantenimiento Legacy',
        text: 'Diseñé esquemas relacionales, procedimientos almacenados (stored procedures), triggers y consultas complejas en SQL Server y MySQL; asimismo, mantuve y evolucioné sistemas críticos heredados en Visual FoxPro y Delphi.',
      },
    ],
    technologies: [
      'C#',
      '.NET Framework',
      '.NET Core',
      'WinForms',
      'Visual FoxPro',
      'Delphi',
      'PHP',
      'Laravel',
      'SQL Server',
      'MySQL',
      'JavaScript',
      'HTML',
      'CSS',
      'jQuery',
      'Git',
      'Nginx',
      'Apache',
    ],
  },
];

export const servicesData: ServiceItem[] = [
  {
    icon: 'icofont-code',
    title: 'Arquitectura Backend & Microservicios',
    accentColor: '#2563eb',
    badgeLabel: 'Core Transaccional',
    description:
      'Diseño, desarrollo y evolución de microservicios escalables y APIs REST, GraphQL y SOAP con Node.js, TypeScript, NestJS y Java (Spring Boot / WebFlux), aplicando Arquitectura Hexagonal, DDD y Clean Code para banca digital, retail y logística.',
    deliverables: [
      'APIs REST, GraphQL, SOAP & OpenAPI',
      'Integración Core Bancario & Biometría',
      'Arquitectura Hexagonal & Domain-Driven Design',
    ],
  },
  {
    icon: 'icofont-responsive',
    title: 'Desarrollo Full-Stack & Ecosistemas Web',
    accentColor: '#0d9488',
    badgeLabel: 'Monorepo & Persistencia',
    description:
      'Construcción integral de aplicaciones web modernas con Angular, React y Vue.js en monorepos Nx, conectadas a persistencia SQL/NoSQL optimizada (PostgreSQL, MySQL, MongoDB, DynamoDB, Redis) y motores de generación documental con Puppeteer.',
    deliverables: [
      'Interfaces Reactivas en Angular & React',
      'Persistencia con TypeORM, Prisma & Hibernate',
      'Automatización de Reportes PDF & S3',
    ],
  },
  {
    icon: 'icofont-automation',
    title: 'Cloud AWS, Observabilidad & IA Aplicada',
    accentColor: '#7c3aed',
    badgeLabel: 'Serverless & DevSecOps',
    description:
      'Implementación de arquitecturas Serverless y Event-Driven en AWS (Lambda, SQS, Step Functions, EKS), contenedores Docker/Kubernetes, pipelines CI/CD, observabilidad (New Relic, Prometheus, Grafana, CloudWatch) e ingeniería asistida por IA.',
    deliverables: [
      'AWS Serverless, Event-Driven & EKS',
      'Testing (Jest, JUnit, TestContainers) & CI/CD',
      'Refactorización, Seguridad OWASP & Docs C4 con IA',
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    category: 'Educación Superior',
    institution: 'Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)',
    detail: 'Instituto de Sistemas · Formación en Análisis, Diseño de Sistemas e Ingeniería de Software.',
    period: 'Cusco, Perú',
    icon: 'icofont-graduate-alt',
    accentColor: '#2563eb',
    badgeText: 'Analista de Sistemas',
  },
  {
    category: 'Formación Técnica',
    institution: 'SENATI · Servicio Nacional de Adiestramiento en Trabajo Industrial',
    detail: 'Formación Profesional Técnica Industrial orientada a automatización, procesos técnicos y soporte de sistemas.',
    period: 'Cusco, Perú',
    icon: 'icofont-automation',
    accentColor: '#ea6a15',
    badgeText: 'Técnico Industrial',
  },
  {
    category: 'Idiomas & Certificación',
    institution: 'Español & Quechua (Nativo) · Inglés Técnico (Intermedio)',
    detail: 'Actualización ejecutiva continua en Microservicios, Serverless AWS, Seguridad OWASP Top 10, SOLID, DDD e IA Aplicada.',
    period: '2023 - 2026',
    icon: 'icofont-badge',
    accentColor: '#0d9488',
    badgeText: '10+ Certificaciones',
  },
];

export const coursesData: CourseItem[] = [
  { name: 'The OWASP Top 10 - Deep Dive', provider: 'Udemy', providerColor: '#A435F0', date: '07/2025', domain: 'Seguridad Aplicativa' },
  { name: 'Principios SOLID y Clean Code. Escribe código de calidad', provider: 'Udemy', providerColor: '#A435F0', date: '07/2025', domain: 'Arquitectura & Calidad' },
  { name: 'The Complete Microservices & Event-Driven Architecture', provider: 'Udemy', providerColor: '#A435F0', date: '07/2025', domain: 'Sistemas Distribuidos' },
  { name: 'DevOps, CI/CD (Continuous Integration/Delivery)', provider: 'Udemy', providerColor: '#A435F0', date: '07/2025', domain: 'DevOps & Automatización' },
  { name: 'DevOps TOTAL: Docker, Kubernetes, Jenkins, AWS & Git', provider: 'Udemy', providerColor: '#A435F0', date: '06/2024', domain: 'Cloud & Contenedores' },
  { name: 'GitHub Copilot & IA Aplicada al Desarrollo', provider: 'Udemy', providerColor: '#A435F0', date: '06/2024', domain: 'Ingeniería con IA' },
  { name: 'The Complete Automation PyTest Course', provider: 'Udemy', providerColor: '#A435F0', date: '06/2024', domain: 'Testing Automatizado' },
  { name: 'Curso de Backend con NestJS (Certificado)', provider: 'Platzi', providerColor: '#079146', date: '06/2023', domain: 'Backend Node.js' },
  { name: 'Curso de Serverless Framework en AWS', provider: 'Platzi', providerColor: '#079146', date: '06/2023', domain: 'AWS Serverless' },
  { name: 'Curso de Java SE Orientado a Objetos', provider: 'Platzi', providerColor: '#079146', date: '06/2023', domain: 'Backend Java' },
];

export const colorThemes = [
  { id: 'default', name: 'Azul Clásico', hex: '#3f87f5', hoverHex: '#3879dc', className: 'color1' },
  { id: 'pink', name: 'Rosa Intenso', hex: '#ff546c', hoverHex: '#e04359', className: 'color2' },
  { id: 'yellow', name: 'Ámbar Dorado', hex: '#f2b31a', hoverHex: '#e8ad1e', className: 'color3' },
  { id: 'green', name: 'Oro LHachaS', hex: '#cdb30c', hoverHex: '#299654', className: 'color4' },
  { id: 'purple', name: 'Púrpura Original', hex: '#8060cf', hoverHex: '#634aa0', className: 'color5' },
  { id: 'light-blue', name: 'Cian Tech', hex: '#37b8df', hoverHex: '#2aa1c5', className: 'color6' },
];
