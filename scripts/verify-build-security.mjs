import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const PUBLIC_CV_DIR = path.join(PUBLIC_DIR, 'assets', 'cv');
const SOURCE_CV_DIR = path.join(ROOT, 'src', 'assets', 'cv-source');
const DIST_DIR = path.join(ROOT, 'dist');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');

const EXPECTED_PUBLIC_PDFS = [
  'CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf',
  'CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf',
];

const EXPECTED_REPO_DOCX = [
  'CV-Leonel-Hacha-Salazar-Backend-2026-EN.docx',
  'CV-Leonel-Hacha-Salazar-Backend-2026-ES.docx',
];

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

let errors = 0;
function fail(msg) {
  console.error(`❌ [SECURITY/CV AUDIT FAIL]: ${msg}`);
  errors++;
}
function pass(msg) {
  console.log(`✅ [SECURITY/CV AUDIT PASS]: ${msg}`);
}

// 1. Verify .docx files are preserved inside src/assets/cv-source/ (repo-only backup)
for (const docx of EXPECTED_REPO_DOCX) {
  const docxPath = path.join(SOURCE_CV_DIR, docx);
  if (!fs.existsSync(docxPath)) {
    fail(`Missing editable CV source in repository: src/assets/cv-source/${docx}`);
  } else {
    pass(`Editable CV source preserved in repo (non-public): src/assets/cv-source/${docx}`);
  }
}

// 2. Verify zero .docx/.doc or Bit-2026 files in public/
const publicFiles = walkFiles(PUBLIC_DIR);
const exposedDocxInPublic = publicFiles.filter((f) => /\.(docx?|odt)$/i.test(f));
if (exposedDocxInPublic.length > 0) {
  fail(`Found exposed Word/editable files in public/: ${exposedDocxInPublic.join(', ')}`);
} else {
  pass('Zero .docx/.doc files present anywhere in public/');
}

const actualPublicCvs = fs.existsSync(PUBLIC_CV_DIR)
  ? fs.readdirSync(PUBLIC_CV_DIR).sort()
  : [];
if (JSON.stringify(actualPublicCvs) !== JSON.stringify(EXPECTED_PUBLIC_PDFS)) {
  fail(
    `public/assets/cv/ must contain ONLY [${EXPECTED_PUBLIC_PDFS.join(', ')}], found: [${actualPublicCvs.join(', ')}]`,
  );
} else {
  pass(`public/assets/cv/ contains exclusively the 2 official PDF CVs: ${actualPublicCvs.join(', ')}`);
}

// 3. Verify zero hardcoded CV filenames in Astro components
const componentFiles = walkFiles(COMPONENTS_DIR).filter((f) => f.endsWith('.astro'));
for (const file of componentFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (/CV-Leonel-Hacha-Salazar/i.test(content) || /\.docx/i.test(content)) {
    fail(`Hardcoded CV filename or .docx reference found in component: ${path.relative(ROOT, file)}`);
  }
}
pass('Zero hardcoded CV filenames or .docx references in src/components/*.astro');

// 3b. Verify README.md aligns with SSOT, PDF-only public links, and non-generic branding
const readmePath = path.join(ROOT, 'README.md');
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8');
  if (/Portafolio de ingenier[ií]a de software/i.test(readme)) {
    fail('README.md contains generic legacy phrase "Portafolio de ingeniería de software"');
  } else if (/\]\([^)]*\.docx\)/i.test(readme)) {
    fail('README.md must not link to any .docx file');
  } else if (
    !readme.includes('src/content/portfolio/portfolio.yml') ||
    !readme.includes('src/content/portfolio/portfolio-en.yml')
  ) {
    fail('README.md must reference both centralized YAML Single Source of Truth files');
  } else {
    pass('README.md verified: executive branding, SSOT links, and PDF-only public resume links');
  }
}

// 4. If dist/ exists, verify the final production bundle
if (fs.existsSync(DIST_DIR)) {
  const distFiles = walkFiles(DIST_DIR);
  const exposedDocxInDist = distFiles.filter((f) => /\.(docx?|odt)$/i.test(f));
  if (exposedDocxInDist.length > 0) {
    fail(`Found exposed .docx/.doc files in production build dist/: ${exposedDocxInDist.join(', ')}`);
  } else {
    pass('Zero .docx/.doc files present anywhere in production bundle dist/');
  }

  const distCvDir = path.join(DIST_DIR, 'assets', 'cv');
  const actualDistCvs = fs.existsSync(distCvDir) ? fs.readdirSync(distCvDir).sort() : [];
  if (JSON.stringify(actualDistCvs) !== JSON.stringify(EXPECTED_PUBLIC_PDFS)) {
    fail(
      `dist/assets/cv/ must contain ONLY [${EXPECTED_PUBLIC_PDFS.join(', ')}], found: [${actualDistCvs.join(', ')}]`,
    );
  } else {
    pass(`dist/assets/cv/ contains exclusively the 2 official PDF CVs: ${actualDistCvs.join(', ')}`);
  }

  const htmlFiles = distFiles.filter((f) => f.endsWith('.html'));
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    if (/\.docx/i.test(html)) {
      fail(`Found .docx reference in generated HTML: ${path.relative(ROOT, htmlFile)}`);
    }
  }
  pass(`Verified ${htmlFiles.length} generated HTML pages contain zero .docx references or links`);

  // 5. Verify strict single-language conditional CV download per active locale
  const esHtmlPath = path.join(DIST_DIR, 'index.html');
  const enHtmlPath = path.join(DIST_DIR, 'en', 'index.html');

  if (fs.existsSync(esHtmlPath)) {
    const esHtml = fs.readFileSync(esHtmlPath, 'utf8');
    const hasEsPdf = esHtml.includes('CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf');
    const hasEnPdf = esHtml.includes('CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf');
    if (!hasEsPdf) {
      fail('dist/index.html (Spanish locale) is missing CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf');
    } else if (hasEnPdf) {
      fail('dist/index.html (Spanish locale) must NOT expose CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf simultaneously');
    } else {
      pass('dist/index.html (ES) exposes exclusively CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf (0 EN CV links)');
    }
  }

  if (fs.existsSync(enHtmlPath)) {
    const enHtml = fs.readFileSync(enHtmlPath, 'utf8');
    const hasEnPdf = enHtml.includes('CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf');
    const hasEsPdf = enHtml.includes('CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf');
    if (!hasEnPdf) {
      fail('dist/en/index.html (English locale) is missing CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf');
    } else if (hasEsPdf) {
      fail('dist/en/index.html (English locale) must NOT expose CV-Leonel-Hacha-Salazar-Backend-2026-ES.pdf simultaneously');
    } else {
      pass('dist/en/index.html (EN) exposes exclusively CV-Leonel-Hacha-Salazar-Backend-2026-EN.pdf (0 ES CV links)');
    }
  }

  // 6. Verify zero off-palette black text overrides or --brand-primary overwrites in generated HTML
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const rel = path.relative(ROOT, htmlFile);
    if (html.includes('yiq >= 150') || html.includes("setProperty('--brand-primary'")) {
      fail(`${rel} contains legacy YIQ black text override or --brand-primary gold overwrite`);
    }
    if (!html.includes('about-cta-row')) {
      fail(`${rel} is missing .about-cta-row single-line desktop / 2x2 mobile profile CTA layout`);
    }
    if (html.includes('100% Solid Minimalist · Content Collections')) {
      fail(`${rel} contains obsolete badge text '100% Solid Minimalist · Content Collections'`);
    }
    if (html.includes('junto con interfaces frontend')) {
      fail(`${rel} contains obsolete phrasing 'junto con interfaces frontend'`);
    }
    if (!html.includes('brand-signature')) {
      fail(`${rel} is missing personal BrandSignature`);
    }
  }
  pass('Verified all generated HTML pages enforce crisp #ffffff contrast, BrandSignature, and updated badge copy');
}

if (errors > 0) {
  process.exit(1);
}

