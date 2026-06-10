import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const stylePath = join(root, 'dist/styles.css');

const rawBudgetBytes = Number(process.env.OPENUI_CSS_RAW_BUDGET_BYTES ?? 1_185_000);
const gzipBudgetBytes = Number(process.env.OPENUI_CSS_GZIP_BUDGET_BYTES ?? 785_000);

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

let rawBytes;
let gzipBytes;

try {
  rawBytes = statSync(stylePath).size;
  gzipBytes = gzipSync(readFileSync(stylePath)).length;
} catch (error) {
  console.error(
    'OpenUI CSS budget check failed: dist/styles.css is missing. Run npm run build first.',
  );
  process.exit(1);
}

const failures = [];

if (rawBytes > rawBudgetBytes) {
  failures.push(`raw ${formatKb(rawBytes)} > ${formatKb(rawBudgetBytes)}`);
}

if (gzipBytes > gzipBudgetBytes) {
  failures.push(`gzip ${formatKb(gzipBytes)} > ${formatKb(gzipBudgetBytes)}`);
}

if (failures.length > 0) {
  console.error('OpenUI CSS budget check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `OpenUI CSS budget check passed: raw ${formatKb(rawBytes)} / ${formatKb(rawBudgetBytes)}, ` +
    `gzip ${formatKb(gzipBytes)} / ${formatKb(gzipBudgetBytes)}`,
);
