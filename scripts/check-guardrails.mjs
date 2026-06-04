import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function walk(dir, extensions, files = []) {
  for (const entry of readdirSync(join(root, dir))) {
    const full = join(root, dir, entry);
    const rel = relative(root, full);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      walk(rel, extensions, files);
    } else if (extensions.some((ext) => rel.endsWith(ext))) {
      files.push(rel);
    }
  }

  return files;
}

function fail(message) {
  failures.push(message);
}

function findCssDeclarationValues(source, property) {
  const values = [];
  const pattern = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'g');
  let match;

  while ((match = pattern.exec(source)) !== null) {
    values.push(match[1].trim());
  }

  return values;
}

const main = read('src/main.tsx');
for (const required of [
  "./tokens/tokens.css",
  "./tokens/typography.css",
  "./tokens/layout.css",
  "./tokens/radius.css",
  "./tokens/shadows.css",
  "./styles/global.css",
]) {
  if (!main.includes(required)) {
    fail(`src/main.tsx must import ${required}`);
  }
}

const layoutCss = read('src/tokens/layout.css');
for (const variable of [
  '--layout-margin-horizontal',
  '--layout-content-width',
  '--layout-inset-screen-x',
  '--layout-touch-target-min',
  '--device-screen-width',
  '--device-screen-height',
  '--device-safe-area-top',
  '--device-safe-area-bottom',
  '--device-content-width',
]) {
  if (!layoutCss.includes(variable)) {
    fail(`src/tokens/layout.css is missing ${variable}`);
  }
}

const typographyCss = read('src/tokens/typography.css');
if (!typographyCss.includes('--text-large-title-font-weight: 700')) {
  fail('screen titles must be bold: --text-large-title-font-weight should be 700');
}

const radiusCss = read('src/tokens/radius.css');
for (const variable of [
  '--radius-md',
  '--radius-control',
  '--layout-radius-md',
]) {
  if (!radiusCss.includes(variable)) {
    fail(`src/tokens/radius.css is missing ${variable}`);
  }
}

const shadowsCss = read('src/tokens/shadows.css');
for (const variable of [
  '--shadow-none',
  '--shadow-elevation-none',
  '--shadow-regular-x-small',
  '--shadow-card-large',
  '--shadow-custom-medium',
  '--shadow-component-custom-input-active',
]) {
  if (!shadowsCss.includes(variable)) {
    fail(`src/tokens/shadows.css is missing ${variable}`);
  }
}

for (const [file, selector] of [
  ['src/styles/global.css', '.openui-app-screen'],
  ['src/styles/storybook.css', '.openui-device-frame__viewport'],
]) {
  const source = read(file);
  if (!source.includes(selector) || !source.includes('scrollbar-width: none')) {
    fail(`${file} must hide visible scrollbar chrome for ${selector}`);
  }
}

const productFiles = [
  ...walk('src/components', ['.ts', '.tsx', '.css']),
  'src/main.tsx',
  'src/styles/global.css',
];

const rawColor = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/;
for (const file of productFiles) {
  const source = read(file);
  if (rawColor.test(source)) {
    fail(`${file} contains a raw color; use --color-* tokens in product UI`);
  }

  for (const value of findCssDeclarationValues(source, 'border-radius')) {
    if (!value.startsWith('var(--radius-')) {
      fail(`${file} contains a non-semantic border-radius (${value}); use --radius-* tokens in product UI`);
    }
  }

  for (const value of findCssDeclarationValues(source, 'box-shadow')) {
    if (!value.startsWith('var(--shadow-')) {
      fail(`${file} contains a non-token box-shadow (${value}); use --shadow-* tokens in product UI`);
    }
  }

  if (file.startsWith('src/components') && source.includes('@/storybook')) {
    fail(`${file} imports Storybook-only code`);
  }
}

for (const [file, expected] of [
  ['src/components/Button/Button.css', ['border-radius: var(--radius-control)', 'box-shadow: var(--shadow-component-fancy-button-primary)']],
  ['src/components/Input/Input.css', ['border-radius: var(--radius-control)', 'box-shadow: var(--shadow-component-custom-input-default)']],
  ['src/components/Card/Card.css', ['border-radius: var(--radius-surface)', 'box-shadow: var(--shadow-surface-card)']],
]) {
  const source = read(file);
  for (const snippet of expected) {
    if (!source.includes(snippet)) {
      fail(`${file} must include ${snippet}`);
    }
  }
}

const componentsIndex = read('src/components/index.ts');
if (componentsIndex.includes('DeviceFrame') || componentsIndex.includes('storybook')) {
  fail('src/components/index.ts must not export Storybook utilities');
}

if (failures.length > 0) {
  console.error('OpenUI guardrail check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OpenUI guardrail check passed.');
