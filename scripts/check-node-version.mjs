const version = process.versions.node.split('.').map(Number);
const [major, minor] = version;

const supported =
  (major === 20 && minor >= 19) ||
  (major === 22 && minor >= 12) ||
  major > 22;

if (!supported) {
  console.error(
    `OpenUI requires Node.js 20.19+ or 22.12+. Current version: ${process.version}.`,
  );
  console.error('Run `nvm use` from the repo root to use the version in .nvmrc.');
  process.exit(1);
}
