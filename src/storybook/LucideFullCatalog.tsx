import { useMemo, useState } from 'react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import {
  iconColor,
  iconSize,
  iconStrokeWidth,
  type IconColorToken,
  type IconSizeToken,
  type IconStrokeToken,
} from '@/tokens/icons';
import { getLucideIconCount, getLucideRegistry } from './lucideRegistry';

const PAGE_SIZE = 96;

function resolveSize(size: IconSizeToken | number): number {
  return typeof size === 'number' ? size : iconSize[size];
}

type LucideFullCatalogProps = {
  size?: IconSizeToken | number;
  color?: IconColorToken;
  stroke?: IconStrokeToken;
};

export function LucideFullCatalog({
  size = 'lg',
  color = 'strong',
  stroke = 'regular',
}: LucideFullCatalogProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const registry = useMemo(() => getLucideRegistry(), []);
  const iconCount = useMemo(() => getLucideIconCount(), [registry]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return registry;
    return registry.filter(
      ({ id, importName }) =>
        id.includes(q) || importName.toLowerCase().includes(q),
    );
  }, [query, registry]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const onSearchChange = (value: string) => {
    setQuery(value);
    setPage(0);
  };

  return (
    <>
      <div className="openui-icon-search">
        <label className="openui-icon-search__label" htmlFor="lucide-full-search">
          Search all Lucide icons
        </label>
        <input
          id="lucide-full-search"
          className="openui-icon-search__input"
          type="search"
          placeholder="e.g. arrow-left, Home, wifi…"
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <p className="openui-icon-catalog-meta">
          Showing {filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–
          {Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} of{' '}
          {filtered.length}
          {query ? '' : ` (${iconCount} ids in lucide-react)`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="openui-icon-catalog-empty">No icons match your search.</p>
      ) : (
        <>
          <div className="openui-icon-grid">
            {slice.map(({ id, importName }) => (
              <div key={id} className="openui-icon-grid__item" title={id}>
                <div className="openui-icon-grid__glyph">
                  <DynamicIcon
                    name={id as IconName}
                    size={resolveSize(size)}
                    color={iconColor[color]}
                    strokeWidth={iconStrokeWidth[stroke]}
                    aria-hidden
                  />
                </div>
                <p className="openui-icon-grid__name">{importName}</p>
                <p className="openui-icon-grid__id">{id}</p>
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="openui-icon-pagination" aria-label="Icon pages">
              <button
                type="button"
                className="openui-icon-pagination__btn"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Previous
              </button>
              <span className="openui-icon-pagination__status">
                Page {safePage + 1} of {pageCount}
              </span>
              <button
                type="button"
                className="openui-icon-pagination__btn"
                disabled={safePage >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
