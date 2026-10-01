import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const solidHexColor = z
  .string()
  .regex(
    /^#[0-9a-fA-F]{6}$/,
    'El color debe ser un hexadecimal sólido de 6 dígitos (ej. #cdb30c). Prohibido usar rgba() o transparencias.',
  );

const officialCvPath = z
  .string()
  .regex(
    /^\/assets\/cv\/CV-Leonel-Hacha-Salazar-Backend-2026-(ES|EN)\.pdf$/,
    'Solo se permiten públicamente los 2 CV oficiales en formato PDF: CV-Leonel-Hacha-Salazar-Backend-2026-(ES|EN).pdf. Los archivos .docx deben permanecer privados en src/assets/cv-source/.',
  );

const officialCvFilename = z
  .string()
  .regex(
    /^CV-Leonel-Hacha-Salazar-Backend-2026-(ES|EN)\.pdf$/,
    'El nombre de archivo público debe corresponder exclusivamente a uno de los 2 CV oficiales en PDF.',
  );

export const portfolioSchema = z.object({
  seo: z.object({
    siteUrl: z.string().url(),
    alternateUrl: z.string().url(),
    siteName: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(10),
    keywords: z.string().min(1),
    locale: z.string().min(2),
    alternateLocale: z.string().min(2),
    language: z.string().min(2),
    alternateLanguage: z.string().min(2),
    themeColor: solidHexColor,
    dateModified: z.string().min(1),
    ogImage: z.string().min(1),
    ogImageAlt: z.string().min(1),
    favicon: z.string().min(1),
    skipToContentLabel: z.string().min(1),
    schemaOrg: z.object({
      givenName: z.string().min(1),
      familyName: z.string().min(1),
      jobTitle: z.string().min(1),
      worksFor: z.string().min(1),
      addressLocality: z.string().min(1),
      addressCountry: z.string().min(2),
      knowsLanguageCodes: z.array(z.string().min(2)).min(1),
      alumniOf: z
        .array(
          z.object({
            type: z.string().min(1),
            name: z.string().min(1),
          }),
        )
        .min(1),
    }),
  }),

  profile: z.object({
    name: z.string().min(1),
    brandPrefix: z.string().min(1),
    brandHighlight: z.string().min(1),
    brandSuffix: z.string().min(1),
    avatarImage: z.string().min(1),
    avatarAlt: z.string().min(1),
    profilePhoto: z.string().min(1),
    profilePhotoAlt: z.string().min(1),
    roleHeadline: z.string().min(1),
    yearsExperience: z.string().min(1),
    yearsExperienceBadgeSuffix: z.string().min(1),
    location: z.string().min(1),
    locationShort: z.string().min(1),
    modality: z.string().min(1),
    phone: z.string().min(1),
    phoneClean: z.string().min(1),
    email: z.string().email(),
    linkedin: z.string().url(),
    github: z.string().url(),
    whatsapp: z.string().url(),
    whatsappDirectBase: z.string().url(),
    facebook: z.string().url(),
    instagram: z.string().url(),
    cvPrimary: z.object({
      id: z.string().min(1),
      langCode: z.enum(['es', 'en']),
      url: officialCvPath,
      filename: officialCvFilename,
      badge: z.string().min(1),
      icon: z.string().min(1),
      ariaLabel: z.string().min(1),
      labelHero: z.string().min(1),
      labelAbout: z.string().min(1),
      labelContact: z.string().min(1),
      labelFooter: z.string().min(1),
    }),
    languages: z
      .array(
        z.object({
          name: z.string().min(1),
          level: z.string().min(1),
        }),
      )
      .min(1),
  }),

  navigation: z.object({
    ariaLabel: z.string().min(1),
    brandAriaLabel: z.string().min(1),
    themeToggleAriaLabel: z.string().min(1),
    themeToggleTitle: z.string().min(1),
    mobileMenuAriaLabel: z.string().min(1),
    languageSwitcher: z.object({
      currentCode: z.string().min(2),
      targetCode: z.string().min(2),
      targetHref: z.string().min(1),
      ariaLabel: z.string().min(1),
      title: z.string().min(1),
      cursorLabel: z.string().min(1),
    }),
    items: z
      .array(
        z.object({
          id: z.string().min(1),
          icon: z.string().min(1),
          label: z.string().min(1),
        }),
      )
      .min(1),
  }),

  styleSwitcher: z.object({
    ariaLabel: z.string().min(1),
    title: z.string().min(1),
    toggleAriaLabel: z.string().min(1),
    backToTopAriaLabel: z.string().min(1),
    themes: z
      .array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          hex: solidHexColor,
          hoverHex: solidHexColor,
          className: z.string().min(1),
        }),
      )
      .min(1),
  }),

  socialLinks: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        handle: z.string().min(1),
        url: z.string().min(1),
        icon: z.string().min(1),
        brandColor: solidHexColor,
        brandHoverColor: solidHexColor,
        showInHero: z.boolean(),
        showInAbout: z.boolean(),
      }),
    )
    .min(1),

  hero: z.object({
    sectionAriaLabel: z.string().min(1),
    availabilityBadge: z.string().min(1),
    availabilityCursorLabel: z.string().min(1),
    greeting: z.string().min(1),
    titlePrefix: z.string().min(1),
    typedStrings: z.array(z.string().min(1)).min(1),
    subtitle: z.string().min(1),
    architecturePillsAriaLabel: z.string().min(1),
    architecturePills: z
      .array(
        z.object({
          icon: z.string().min(1),
          label: z.string().min(1),
          brandColor: solidHexColor,
        }),
      )
      .min(1),
    primaryCta: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      cursorLabel: z.string().min(1),
    }),
    secondaryCta: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      cursorLabel: z.string().min(1),
    }),
    cvCtaCursorLabel: z.string().min(1),
    metrics: z
      .array(
        z.object({
          value: z.string().min(1),
          label: z.string().min(1),
          detail: z.string().min(1),
          icon: z.string().min(1),
          accentColor: solidHexColor,
        }),
      )
      .min(1),
    scrollIndicator: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      ariaLabel: z.string().min(1),
    }),
  }),

  about: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    lead: z.string().min(1),
    roleTitle: z.string().min(1),
    roleHighlight: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    coreStackLabel: z.string().min(1),
    coreStackPills: z.array(z.string().min(1)).min(1),
    cvButtonCursorLabel: z.string().min(1),
    contactButtonLabel: z.string().min(1),
    contactButtonCursorLabel: z.string().min(1),
    educationVerifiedLabel: z.string().min(1),
    education: z
      .array(
        z.object({
          category: z.string().min(1),
          institution: z.string().min(1),
          detail: z.string().min(1),
          period: z.string().min(1),
          icon: z.string().min(1),
          accentColor: solidHexColor,
          badgeText: z.string().min(1),
        }),
      )
      .min(1),
    trainingShowcase: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      coursesHeading: z.string().min(1),
      coursesPeriodBadge: z.string().min(1),
      courseDomainPrefix: z.string().min(1),
      competenciesHeading: z.string().min(1),
      providerSummaryBadges: z
        .array(
          z.object({
            label: z.string().min(1),
            icon: z.string().min(1),
            color: solidHexColor,
          }),
        )
        .min(1),
      courses: z
        .array(
          z.object({
            name: z.string().min(1),
            provider: z.string().min(1),
            providerColor: solidHexColor,
            date: z.string().min(1),
            domain: z.string().min(1),
          }),
        )
        .min(1),
      softSkills: z.array(z.string().min(1)).min(1),
      engineeringFocusCallout: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    }),
  }),

  skillsSection: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    subtitle: z.string().min(1),
    filterAriaLabel: z.string().min(1),
    filterAllLabel: z.string().min(1),
    pillarPrefixLabel: z.string().min(1),
    domainsCountSuffix: z.string().min(1),
    verifiedStackHeading: z.string().min(1),
    categories: z
      .array(
        z.object({
          id: z.string().min(1),
          icon: z.string().min(1),
          title: z.string().min(1),
          subtitle: z.string().min(1),
          accentColor: solidHexColor,
          items: z
            .array(
              z.object({
                name: z.string().min(1),
                level: z.string().min(1),
                icon: z.string().min(1),
                brandColor: solidHexColor,
              }),
            )
            .min(1),
          tags: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1),
  }),

  projectsSection: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    subtitle: z.string().min(1),
    filterAriaLabel: z.string().min(1),
    filterAllLabel: z.string().min(1),
    filters: z
      .array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
        }),
      )
      .min(1),
    carouselPrevLabel: z.string().optional(),
    carouselNextLabel: z.string().optional(),
    carouselDragHint: z.string().optional(),
    carouselCounterLabel: z.string().optional(),
    problemLabel: z.string().min(1),
    solutionLabel: z.string().min(1),
    architectureLabel: z.string().min(1),
    impactLabel: z.string().min(1),
    stackLabel: z.string().min(1),
    repoButtonLabel: z.string().min(1),
    demoButtonLabel: z.string().min(1),
    viewAllGithubLabel: z.string().min(1),
    viewAllGithubUrl: z.string().url(),
    items: z
      .array(
        z.object({
          id: z.string().min(1),
          title: z.string().min(1),
          tagline: z.string().min(1),
          category: z.enum([
            'backend-api',
            'cloud-microservices',
            'enterprise-tools',
            'web-fullstack',
          ]),
          categoryLabel: z.string().min(1),
          badge: z.string().min(1),
          accentColor: solidHexColor,
          icon: z.string().min(1),
          repoUrl: z.string().url(),
          demoUrl: z.string().url().optional(),
          architecture: z.string().min(1),
          problem: z.string().min(1),
          solution: z.string().min(1),
          impact: z.string().min(1),
          stack: z.array(z.string().min(1)).min(1),
          highlights: z.array(z.string().min(1)).min(1),
          stats: z
            .array(
              z.object({
                label: z.string().min(1),
                value: z.string().min(1),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
  }),

  experiencesSection: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    subtitle: z.string().min(1),
    toggleCompactLabel: z.string().min(1),
    toggleDetailedLabel: z.string().min(1),
    items: z
      .array(
        z.object({
          id: z.string().min(1),
          stepNumber: z.string().min(1),
          title: z.string().min(1),
          company: z.string().min(1),
          clientOrDomain: z.string().min(1),
          date: z.string().min(1),
          shortDate: z.string().min(1),
          location: z.string().min(1),
          color: solidHexColor,
          summary: z.string().min(1),
          highlights: z
            .array(
              z.object({
                label: z.string().min(1),
                text: z.string().min(1),
              }),
            )
            .min(1),
          technologies: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1),
  }),

  servicesSection: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    subtitle: z.string().min(1),
    deliverablesHeading: z.string().min(1),
    items: z
      .array(
        z.object({
          icon: z.string().min(1),
          title: z.string().min(1),
          accentColor: solidHexColor,
          badgeLabel: z.string().min(1),
          description: z.string().min(1),
          deliverables: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1),
  }),

  contactSection: z.object({
    sectionIcon: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleHighlight: z.string().min(1),
    subtitle: z.string().min(1),
    channelsTitlePrefix: z.string().min(1),
    channelsTitleHighlight: z.string().min(1),
    channels: z
      .array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
          value: z.string().min(1),
          href: z.string().optional(),
          icon: z.string().min(1),
          color: solidHexColor,
          cursorLabel: z.string().optional(),
          external: z.boolean(),
        }),
      )
      .min(1),
    cvCard: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    form: z.object({
      titlePrefix: z.string().min(1),
      titleHighlight: z.string().min(1),
      subtitlePrefix: z.string().min(1),
      activeStatusBadge: z.string().min(1),
      quickTopicsLabel: z.string().min(1),
      quickTopicsAriaLabel: z.string().min(1),
      quickTopics: z.array(z.string().min(1)).min(1),
      fields: z.object({
        nameLabel: z.string().min(1),
        namePlaceholder: z.string().min(1),
        nameError: z.string().min(1),
        emailLabel: z.string().min(1),
        emailPlaceholder: z.string().min(1),
        emailError: z.string().min(1),
        subjectLabel: z.string().min(1),
        subjectPlaceholder: z.string().min(1),
        subjectError: z.string().min(1),
        messageLabel: z.string().min(1),
        messagePlaceholder: z.string().min(1),
        messageError: z.string().min(1),
      }),
      whatsappCtaLabel: z.string().min(1),
      whatsappCtaCursorLabel: z.string().min(1),
      submitLabel: z.string().min(1),
      submitLoadingLabel: z.string().min(1),
      submitCursorLabel: z.string().min(1),
      validationBannerError: z.string().min(1),
      rateLimitMessagePrefix: z.string().min(1),
      rateLimitMessageSuffix: z.string().min(1),
      successTitlePrefix: z.string().min(1),
      successBodyPrefix: z.string().min(1),
      successBodyMiddle: z.string().min(1),
      fallbackTitle: z.string().min(1),
      fallbackDescriptionPrefix: z.string().min(1),
      fallbackDescriptionSuffix: z.string().min(1),
      fallbackEmailButtonLabel: z.string().min(1),
      fallbackWhatsappButtonLabel: z.string().min(1),
    }),
  }),

  footer: z.object({
    ariaLabel: z.string().min(1),
    brandSummary: z.string().min(1),
    availabilityBadge: z.string().min(1),
    navColumnTitle: z.string().min(1),
    navColumnBadge: z.string().min(1),
    navAriaLabel: z.string().min(1),
    cvDownloadHeading: z.string().min(1),
    channelsColumnTitle: z.string().min(1),
    channelsColumnBadge: z.string().min(1),
    channelsDescription: z.string().min(1),
    copyrightPrefix: z.string().min(1),
    stackBadgeLabel: z.string().min(1),
    stackBadgeValue: z.string().min(1),
    designBadgeLabel: z.string().min(1),
    designBadgeValue: z.string().min(1),
  }),
}).superRefine((data, ctx) => {
  const isEnglish = data.seo.language.toLowerCase().startsWith('en');
  const expectedSuffix = isEnglish ? 'EN.pdf' : 'ES.pdf';
  const expectedLang = isEnglish ? 'en' : 'es';

  if (data.profile.cvPrimary.langCode !== expectedLang) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El idioma del CV (${data.profile.cvPrimary.langCode}) no coincide con el idioma activo del portafolio (${data.seo.language}).`,
      path: ['profile', 'cvPrimary', 'langCode'],
    });
  }

  if (!data.profile.cvPrimary.filename.endsWith(expectedSuffix)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El archivo de CV (${data.profile.cvPrimary.filename}) debe corresponder exclusivamente al idioma activo "${data.seo.language}" (*-${expectedSuffix}).`,
      path: ['profile', 'cvPrimary', 'filename'],
    });
  }

  if (!data.profile.cvPrimary.url.endsWith(expectedSuffix)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `La URL del CV (${data.profile.cvPrimary.url}) debe apuntar exclusivamente al PDF del idioma activo "${data.seo.language}" (*-${expectedSuffix}).`,
      path: ['profile', 'cvPrimary', 'url'],
    });
  }
});

export type PortfolioContent = z.infer<typeof portfolioSchema>;

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/portfolio' }),
  schema: portfolioSchema,
});

export const collections = {
  portfolio,
};
