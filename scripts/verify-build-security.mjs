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
}

if (errors > 0) {
  process.exit(1);
}
