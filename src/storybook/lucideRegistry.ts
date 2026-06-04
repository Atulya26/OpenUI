import { iconNames, type IconName } from 'lucide-react/dynamic';

/** Kebab-case Lucide id → PascalCase import name (e.g. `arrow-left` → `ArrowLeft`) */
export function lucideKebabToImportName(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export type LucideRegistryEntry = {
  id: IconName;
  importName: string;
};

let registryCache: LucideRegistryEntry[] | null = null;

/** Full Lucide set — built on first use. */
export function getLucideRegistry(): LucideRegistryEntry[] {
  if (!registryCache) {
    registryCache = (iconNames as IconName[]).map((id) => ({
      id,
      importName: lucideKebabToImportName(id),
    }));
  }
  return registryCache;
}

export function getLucideIconCount(): number {
  return getLucideRegistry().length;
}
