import type { Meta, StoryObj } from '@storybook/react-vite';
import { lazy, Suspense, useState } from 'react';
import { Icon } from '@/components/Icon';
import { iconCatalog } from '@/components/Icon/iconCatalog';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const LucideFullCatalog = lazy(() =>
  import('@/storybook/LucideFullCatalog').then((m) => ({
    default: m.LucideFullCatalog,
  })),
);

const meta = {
  title: 'Foundational/Icons/Catalog',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function CuratedIconGrid({ query = '' }: { query?: string }) {
  const q = query.trim().toLowerCase();

  return (
    <>
      {iconCatalog.map((group) => {
        const icons = group.icons.filter(
          (item) =>
            !q ||
            item.name.toLowerCase().includes(q) ||
            group.label.toLowerCase().includes(q),
        );
        if (icons.length === 0) return null;

        return (
          <Section
            key={group.id}
            title={group.label}
            meta={`${icons.length}`}
          >
            <div className="openui-icon-grid">
              {icons.map(({ name, icon }) => (
                <div key={name} className="openui-icon-grid__item">
                  <div className="openui-icon-grid__glyph">
                    <Icon icon={icon} size="lg" color="strong" />
                  </div>
                  <p className="openui-icon-grid__name">{name}</p>
                </div>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}

const curatedTotal = iconCatalog.reduce((n, g) => n + g.icons.length, 0);

export const Curated: Story = {
  render: function CuratedCatalogStory() {
    const [query, setQuery] = useState('');

    return (
      <DocPage
        eyebrow="Foundational · Icons"
        title="Curated icons"
        description={`${curatedTotal} hand-picked icons for typical mobile patterns (nav, actions, status). Import from @/components/Icon/icons. The full Lucide library has 1,700+ ids — see “All Lucide”.`}
      >
        <Panel>
          <div className="openui-icon-search">
            <label className="openui-icon-search__label" htmlFor="icon-search">
              Search curated set
            </label>
            <input
              id="icon-search"
              className="openui-icon-search__input"
              type="search"
              placeholder="e.g. chevron, user, alert…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </Panel>
        <Panel>
          <CuratedIconGrid query={query} />
        </Panel>
      </DocPage>
    );
  },
};

export const AllLucide: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Icons"
      title="All Lucide icons"
      description="Complete Lucide React set (1,700+ icon ids, including aliases). Icons load on demand via DynamicIcon — only import named icons in app code for smallest bundles. See lucide.dev/icons."
    >
      <Panel>
        <Suspense fallback={<p>Loading icon catalog…</p>}>
          <LucideFullCatalog />
        </Suspense>
      </Panel>
    </DocPage>
  ),
};
