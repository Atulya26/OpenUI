import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];
const externalSystemName = ['al' + 'ign', 'ui'].join(String.raw`\s*`);
const externalSlug = ['al' + 'ign', 'ui'].join('-');
const externalFileKey = 'uUbwm' + 'KRHEIIaSIUSoTsmL6';
const legacyMetadataKey = 'excludedFrom' + ('Al' + 'ign');
const forbiddenExternalRefs = [
  new RegExp(externalSystemName, 'i'),
  new RegExp(externalSlug, 'i'),
  new RegExp(externalFileKey, 'i'),
  new RegExp(legacyMetadataKey, 'i'),
];

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

function hasExactCssDeclaration(source, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[;{}\\n])\\s*${escaped}\\s*:`, 'm').test(source);
}

function findUngatedHoverLines(source) {
  const lines = [];
  const stack = [];
  let index = 0;

  while (index < source.length) {
    if (source.startsWith('@media', index)) {
      const openBraceIndex = source.indexOf('{', index);
      if (openBraceIndex === -1) {
        break;
      }
      stack.push({
        type: 'media',
        header: source.slice(index, openBraceIndex),
      });
      index = openBraceIndex + 1;
      continue;
    }

    if (source[index] === '{') {
      stack.push({ type: 'block', header: '' });
      index += 1;
      continue;
    }

    if (source[index] === '}') {
      stack.pop();
      index += 1;
      continue;
    }

    if (source.startsWith(':hover', index)) {
      const isPointerHoverGated = stack.some(
        (entry) => entry.type === 'media' && entry.header.includes('hover: hover'),
      );
      if (!isPointerHoverGated) {
        lines.push(source.slice(0, index).split('\n').length);
      }
    }

    index += 1;
  }

  return lines;
}

function findEnterKeyframesWithoutExit(source) {
  const missing = [];
  const keyframeNames = new Set();
  const pattern = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    keyframeNames.add(match[1]);
  }

  for (const name of keyframeNames) {
    if (!name.endsWith('-in')) {
      continue;
    }

    const exitName = name.replace(/-in$/, '-out');
    if (!keyframeNames.has(exitName)) {
      missing.push(`${name} → ${exitName}`);
    }
  }

  return missing;
}

function isTokenizedTransition(value) {
  if (value.startsWith('var(--motion-transition-')) {
    return true;
  }

  return (
    value.includes('var(--motion-duration-') &&
    value.includes('var(--motion-ease-') &&
    !/\b\d+(ms|s)\b/.test(value)
  );
}

const main = read('src/main.tsx');
const packageJson = JSON.parse(read('package.json'));
for (const required of [
  "./tokens/tokens.css",
  "./tokens/surfaces.css",
  "./tokens/typography.css",
  "./tokens/layout.css",
  "./tokens/radius.css",
  "./tokens/shadows.css",
  "./tokens/motion.css",
  "./tokens/elevation.css",
  "./styles/global.css",
]) {
  if (!main.includes(required)) {
    fail(`src/main.tsx must import ${required}`);
  }
}

const storybookPreview = read('.storybook/preview.tsx');
for (const required of [
  "../src/tokens/tokens.css",
  "../src/tokens/surfaces.css",
  "../src/tokens/typography.css",
  "../src/tokens/layout.css",
  "../src/tokens/radius.css",
  "../src/tokens/shadows.css",
  "../src/tokens/motion.css",
  "../src/tokens/elevation.css",
  "../src/styles/global.css",
  "../src/styles/storybook.css",
]) {
  if (!storybookPreview.includes(required)) {
    fail(`.storybook/preview.tsx must import ${required}`);
  }
}

if (!packageJson.devDependencies?.['@storybook/test-runner']) {
  fail('package.json must include @storybook/test-runner for Storybook regression checks');
}
for (const script of ['test:storybook', 'test:visual', 'check:css-budget']) {
  if (!packageJson.scripts?.[script]) {
    fail(`package.json must define ${script}`);
  }
}
if (!packageJson.scripts?.check?.includes('check:css-budget')) {
  fail('package.json check script must run check:css-budget after build');
}
if (!read('.storybook/test-runner.ts').includes('visualMatrix')) {
  fail('.storybook/test-runner.ts must define the light/dark × density visualMatrix');
}
for (const snippet of ['dir: ', 'interactiveSelectors', '44×44']) {
  if (!read('.storybook/test-runner.ts').includes(snippet)) {
    fail(`.storybook/test-runner.ts must include ${snippet} for RTL and touch-target coverage`);
  }
}

const layoutCss = read('src/tokens/layout.css');
for (const variable of [
  '--layout-margin-horizontal',
  '--layout-content-width',
  '--layout-inset-screen-x',
  '--layout-gap-inline-2xs',
  '--layout-border-hairline',
  '--layout-touch-target-min',
  '--layout-hit-area-inset-compact',
  '--device-screen-width',
  '--device-screen-height',
  '--device-safe-area-top',
  '--device-safe-area-bottom',
  '--device-content-width',
  '--control-height-sm',
  '--control-height-md',
  '--control-height-lg',
  '--control-height-xl',
  '--control-pad-x-sm',
  '--control-pad-x-md',
  '--control-pad-x-lg',
  '--control-pad-x-xl',
]) {
  if (!layoutCss.includes(variable)) {
    fail(`src/tokens/layout.css is missing ${variable}`);
  }
}
if (!layoutCss.includes('--space-half')) {
  fail('src/tokens/layout.css must define --space-half for optical 2px insets');
}
if (!layoutCss.includes('[data-density="compact"]')) {
  fail('src/tokens/layout.css must define a [data-density="compact"] override block');
}
if (!layoutCss.includes('--layout-content-width: var(--device-content-width)')) {
  fail('src/tokens/layout.css must alias --layout-content-width to --device-content-width');
}

const tokensCss = read('src/tokens/tokens.css');
for (const variable of [
  '--color-overlay-scrim',
  '--color-state-layer-pressed-neutral',
  '--color-state-layer-pressed-primary',
  '--color-state-layer-pressed-on-fill',
  '--color-state-layer-pressed-danger',
  '--color-state-layer-selected',
]) {
  if (!tokensCss.includes(variable)) {
    fail(`src/tokens/tokens.css is missing ${variable}`);
  }
}

const typographyCss = read('src/tokens/typography.css');
if (!typographyCss.includes('--text-large-title-font-weight: 700')) {
  fail('screen titles must be bold: --text-large-title-font-weight should be 700');
}
for (const variable of [
  '--text-title1-emphasized-font-weight',
  '--text-title2-emphasized-font-weight',
  '--text-title3-emphasized-font-weight',
  '--text-numeric-tabular',
]) {
  if (!typographyCss.includes(variable)) {
    fail(`src/tokens/typography.css is missing ${variable}`);
  }
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
  '--shadow-ring-canvas',
  '--shadow-ring-stroke',
  '--shadow-ring-neutral-ink',
  '--shadow-elevation-none',
  '--shadow-regular-x-small',
  '--shadow-card-large',
  '--shadow-surface-card-mobile',
  '--shadow-custom-medium',
  '--shadow-component-custom-input-active',
]) {
  if (!shadowsCss.includes(variable)) {
    fail(`src/tokens/shadows.css is missing ${variable}`);
  }
}
if (!shadowsCss.includes(":root[data-theme='dark']")) {
  fail('src/tokens/shadows.css must define dark-theme shadow overrides');
}
if (/#[0-9a-fA-F]{3,8}\b/.test(shadowsCss)) {
  fail('src/tokens/shadows.css must not contain baked hex colors; use --shadow-ring-* or --color-* variables');
}

const surfacesCss = read('src/tokens/surfaces.css');
for (const variable of [
  '--surface-glass-bg',
  '--surface-glass-bg-strong',
  '--surface-glass-border',
  '--surface-glass-blur',
]) {
  if (!surfacesCss.includes(variable)) {
    fail(`src/tokens/surfaces.css is missing ${variable}`);
  }
}
if (!surfacesCss.includes('@supports')) {
  fail('src/tokens/surfaces.css must provide @supports-gated glass tokens with opaque fallbacks');
}

const motionCss = read('src/tokens/motion.css');
for (const variable of [
  '--motion-duration-feedback',
  '--motion-duration-enter',
  '--motion-ease-enter',
  '--motion-ease-expressive',
  '--motion-transition-feedback',
  '--motion-transition-surface',
]) {
  if (!motionCss.includes(variable)) {
    fail(`src/tokens/motion.css is missing ${variable}`);
  }
}

const elevationCss = read('src/tokens/elevation.css');
for (const variable of [
  '--z-base',
  '--z-sticky',
  '--z-dropdown',
  '--z-backdrop',
  '--z-sheet',
  '--z-modal',
  '--z-toast',
  '--elevation-level-0',
  '--elevation-card-shadow',
  '--elevation-card-z',
  '--elevation-overlay-shadow',
]) {
  if (!elevationCss.includes(variable)) {
    fail(`src/tokens/elevation.css is missing ${variable}`);
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
const componentDimensionProperties = [
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'max-height',
  'inline-size',
  'block-size',
  'min-inline-size',
  'min-block-size',
  'max-inline-size',
  'max-block-size',
];
const inlinePhysicalProperties = [
  'left',
  'right',
  'margin-left',
  'margin-right',
  'padding-left',
  'padding-right',
  'border-left',
  'border-right',
  'border-left-color',
  'border-right-color',
  'border-left-width',
  'border-right-width',
  'border-left-style',
  'border-right-style',
  'inset-left',
  'inset-right',
];
const fractionalGapCalc = /calc\([^;{]*var\(--layout-gap-[^)]*\)\s*\/\s*2/;
for (const file of productFiles) {
  const source = read(file);
  if (rawColor.test(source)) {
    fail(`${file} contains a raw color; use --color-* tokens in product UI`);
  }

  for (const value of findCssDeclarationValues(source, 'border-radius')) {
    if (!value.startsWith('var(--radius-') && value !== 'inherit') {
      fail(`${file} contains a non-semantic border-radius (${value}); use --radius-* tokens in product UI`);
    }
  }

  for (const value of findCssDeclarationValues(source, 'box-shadow')) {
    if (!value.startsWith('var(--shadow-')) {
      fail(`${file} contains a non-token box-shadow (${value}); use --shadow-* tokens in product UI`);
    }
  }

  for (const value of findCssDeclarationValues(source, 'transition')) {
    if (!isTokenizedTransition(value)) {
      fail(`${file} contains a non-token transition (${value}); use --motion-transition-* tokens in product UI`);
    }
  }

  for (const value of findCssDeclarationValues(source, 'animation')) {
    if (!value.includes('var(--motion-duration-') || /\b\d+(ms|s)\b/.test(value)) {
      fail(`${file} contains a non-token animation (${value}); use --motion-* tokens in product UI`);
    }
  }

  for (const value of findCssDeclarationValues(source, 'z-index')) {
    const allowed =
      value.startsWith('var(--z-') ||
      value.startsWith('var(--elevation-') ||
      value === 'auto' ||
      value === 'inherit' ||
      value === 'initial' ||
      value.startsWith('calc(var(--z-') ||
      value.startsWith('calc(var(--elevation-');
    if (!allowed) {
      fail(`${file} contains a non-token z-index (${value}); use --z-* or --elevation-* tokens in product UI`);
    }
  }

  if (file.startsWith('src/components') && source.includes('@/storybook')) {
    fail(`${file} imports Storybook-only code`);
  }

  if (file.startsWith('src/components') && file.endsWith('.css')) {
    const ungatedHoverLines = findUngatedHoverLines(source);
    if (ungatedHoverLines.length > 0) {
      fail(`${file} has :hover outside @media (hover: hover) at line(s) ${ungatedHoverLines.join(', ')}`);
    }

    if (fractionalGapCalc.test(source)) {
      fail(`${file} contains calc(var(--layout-gap-*) / 2); use --layout-gap-inline-2xs`);
    }

    if (/\.openui-[^{]*story[-_]/.test(source) || /story-/.test(source)) {
      fail(`${file} contains Storybook-only CSS; move story helpers to src/styles/storybook.css`);
    }

    if (hasExactCssDeclaration(source, 'text-box')) {
      fail(`${file} uses text-box trimming; preserve full token line boxes to avoid clipped Inter glyphs`);
    }

    const missingExitKeyframes = findEnterKeyframesWithoutExit(source);
    if (missingExitKeyframes.length > 0) {
      fail(`${file} defines enter keyframes without paired exit keyframes: ${missingExitKeyframes.join(', ')}`);
    }

    for (const property of componentDimensionProperties) {
      for (const value of findCssDeclarationValues(source, property)) {
        if (value.includes('--layout-gap-')) {
          fail(`${file} uses --layout-gap-* as a ${property} dimension (${value}); use a control token or component dimension variable`);
        }
      }
    }

    for (const property of inlinePhysicalProperties) {
      if (hasExactCssDeclaration(source, property)) {
        fail(`${file} uses physical inline property ${property}; use logical inline/block properties for RTL-safe components`);
      }
    }
  }
}

for (const file of [
  'src/components/Button/Button.css',
  'src/components/IconButton/IconButton.css',
  'src/components/Card/Card.css',
  'src/components/ListRow/ListRow.css',
  'src/components/Chip/Chip.css',
  'src/components/SegmentedControl/SegmentedControl.css',
  'src/components/TabBar/TabBar.css',
  'src/components/Select/Select.css',
  'src/components/Input/Input.css',
  'src/components/SearchBar/SearchBar.css',
]) {
  const source = read(file);
  if (!source.includes('--color-state-layer-')) {
    fail(`${file} must use --color-state-layer-* for pressed/touch feedback`);
  }
}

for (const [file, expected] of [
  ['src/components/Button/Button.css', ['border-radius: var(--radius-control)', 'box-shadow: var(--shadow-component-fancy-button-primary)', 'transition: var(--motion-transition-feedback)']],
  ['src/components/Input/Input.css', ['border-radius: var(--radius-control)', 'box-shadow: var(--shadow-component-custom-input-default)', 'transition: var(--motion-transition-feedback)']],
  ['src/components/Card/Card.css', ['border-radius: var(--radius-surface)', 'box-shadow: var(--shadow-surface-card)', 'transition: var(--motion-transition-surface)']],
]) {
  const source = read(file);
  for (const snippet of expected) {
    if (!source.includes(snippet)) {
      fail(`${file} must include ${snippet}`);
    }
  }
}

for (const file of [
  'src/components/Button/Button.css',
  'src/components/Input/Input.css',
  'src/components/Select/Select.css',
  'src/components/SearchBar/SearchBar.css',
  'src/components/IconButton/IconButton.css',
]) {
  const source = read(file);
  if (!source.includes('var(--control-height-')) {
    fail(`${file} must size controls from --control-height-* tokens`);
  }
}

for (const file of [
  'src/components/Button/Button.css',
  'src/components/Input/Input.css',
  'src/components/Select/Select.css',
  'src/components/SearchBar/SearchBar.css',
]) {
  const source = read(file);
  if (!source.includes('var(--control-pad-x-')) {
    fail(`${file} must pad controls from --control-pad-x-* tokens`);
  }
}

const componentsIndex = read('src/components/index.ts');
if (componentsIndex.includes('DeviceFrame') || componentsIndex.includes('storybook')) {
  fail('src/components/index.ts must not export Storybook utilities');
}
if (!componentsIndex.includes("from './Pressable'")) {
  fail('src/components/index.ts must export Pressable and its public types');
}
for (const exportName of [
  "from './Portal'",
  "from './FocusTrap'",
  "from './VisuallyHidden'",
  "from './Presence'",
]) {
  if (!componentsIndex.includes(exportName)) {
    fail(`src/components/index.ts must export ${exportName.replace("from './", '').replace("'", '')}`);
  }
}
for (const file of [
  'src/components/Button/Button.tsx',
  'src/components/IconButton/IconButton.tsx',
]) {
  if (!read(file).includes('<Pressable')) {
    fail(`${file} must use Pressable for shared mobile press feedback`);
  }
}
for (const file of [
  'src/components/Dialog/Dialog.tsx',
  'src/components/Sheet/Sheet.tsx',
  'src/components/ActionSheet/ActionSheet.tsx',
]) {
  const source = read(file);
  for (const snippet of ['<Portal', '<FocusTrap', 'usePresence']) {
    if (!source.includes(snippet)) {
      fail(`${file} must use ${snippet} for shared overlay layering, focus, and presence behavior`);
    }
  }
}
for (const snippet of [
  'dragToDismiss',
  'onPointerDown={beginDrag}',
  'onPointerMove={updateDrag}',
  'onPointerUp={endDrag}',
]) {
  if (!read('src/components/Sheet/Sheet.tsx').includes(snippet)) {
    fail(`src/components/Sheet/Sheet.tsx must include ${snippet} for drag-to-dismiss behavior`);
  }
}
for (const snippet of [
  '--openui-sheet-drag-y',
  '--openui-sheet-scrim-opacity',
  'openui-sheet--dragging',
]) {
  if (!read('src/components/Sheet/Sheet.css').includes(snippet)) {
    fail(`src/components/Sheet/Sheet.css must include ${snippet} for drag-to-dismiss styling`);
  }
}
for (const file of [
  'src/components/Select/Select.tsx',
  'src/components/Toast/Toast.tsx',
]) {
  if (!read(file).includes('usePresence')) {
    fail(`${file} must use usePresence for exit-before-unmount behavior`);
  }
}
for (const snippet of [
  '<Portal',
  'autoDismissDuration',
  'pauseAutoDismiss',
  'beginSwipe',
  'stackDepth',
]) {
  if (!read('src/components/Toast/Toast.tsx').includes(snippet)) {
    fail(`src/components/Toast/Toast.tsx must include ${snippet} for Toast v2 choreography`);
  }
}
for (const snippet of [
  '--openui-toast-stack-depth',
  '--openui-toast-swipe-x',
  'openui-toast-viewport--stacked',
  'prefers-reduced-transparency',
]) {
  if (!read('src/components/Toast/Toast.css').includes(snippet)) {
    fail(`src/components/Toast/Toast.css must include ${snippet} for Toast v2 styling`);
  }
}
for (const snippet of [
  'navigation?: ReactNode',
  'scrollCollapse',
  '--nav-collapse',
  'data-scrolled',
]) {
  if (!read('src/components/Screen/Screen.tsx').includes(snippet)) {
    fail(`src/components/Screen/Screen.tsx must include ${snippet} for scroll-driven navigation collapse`);
  }
}
for (const snippet of [
  'collapsible?: boolean',
  'openui-navigation-bar--collapsible',
  'openui-navigation-bar__large-title-shell',
]) {
  if (!read('src/components/NavigationBar/NavigationBar.tsx').includes(snippet)) {
    fail(`src/components/NavigationBar/NavigationBar.tsx must include ${snippet} for large-title collapse`);
  }
}
for (const snippet of [
  '--navigation-bar-collapse-progress',
  'calc(1 - var(--navigation-bar-collapse-progress))',
  'openui-navigation-bar__collapse-title-shell',
]) {
  if (!read('src/components/NavigationBar/NavigationBar.css').includes(snippet)) {
    fail(`src/components/NavigationBar/NavigationBar.css must include ${snippet} for large-title collapse styling`);
  }
}

const externalReferenceFiles = [
  'package.json',
  'README.md',
  ...walk('docs', ['.md']),
  ...walk('src', ['.ts', '.tsx', '.css', '.json']),
];

try {
  statSync(join(root, 'docs/superpowers'));
  fail('docs/superpowers must not exist; remove dead audit artifact directories');
} catch (error) {
  if (error?.code !== 'ENOENT') {
    throw error;
  }
}

for (const [file, snippets] of [
  ['docs/README.md', ['Storybook', 'test:visual', 'surfaces.css', 'check:css-budget']],
  ['docs/COMPONENT-RULES.md', ['Storybook-only CSS', 'src/styles/storybook.css', 'logical inline', 'Pressable', 'Portal', 'FocusTrap', 'VisuallyHidden', 'Toast choreography', 'Scroll navigation']],
  ['docs/PATTERN-RULES.md', ['Collapsing large-title screen', '--nav-collapse']],
  ['docs/LAYOUT-RULES.md', ['logical inline', '44×44']],
  ['docs/MOTION-RULES.md', ['enter', 'exit']],
  ['docs/TYPOGRAPHY-RULES.md', ['--text-numeric-tabular', 'Text emphasized', 'Do not use `text-box`']],
]) {
  const source = read(file);
  for (const snippet of snippets) {
    if (!source.includes(snippet)) {
      fail(`${file} must mention ${snippet} so docs stay aligned with guardrails`);
    }
  }
}

for (const file of externalReferenceFiles) {
  const source = read(file);
  for (const pattern of forbiddenExternalRefs) {
    if (pattern.test(source)) {
      fail(`${file} contains an external design-system reference (${pattern})`);
    }
  }
}

if (failures.length > 0) {
  console.error('OpenUI guardrail check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OpenUI guardrail check passed.');
