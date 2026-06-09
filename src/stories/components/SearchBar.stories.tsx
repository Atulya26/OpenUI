import { useState, type ChangeEvent, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, MapPin, Search } from '@/components/Icon/icons';
import { ListRow } from '@/components/ListRow';
import { ListSection } from '@/components/ListSection';
import { SearchBar } from '@/components/SearchBar';
import { Stack } from '@/components/Stack';
import { Text } from '@/components/Text';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/SearchBar',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SpecCell({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="openui-input-spec-cell">
      <div className="openui-input-spec-cell__example">{children}</div>
      <div className="openui-input-spec-cell__copy">
        <span>{label}</span>
        <p>{note}</p>
      </div>
    </div>
  );
}

function ClearableSearchExample() {
  const [query, setQuery] = useState('Weekend stays');

  return (
    <SearchBar
      aria-label="Search places"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onClear={() => setQuery('')}
    />
  );
}

function RecentSearchesScreen() {
  const recentSearches = [
    { title: 'Coffee near Union Square', description: 'Nearby places', icon: MapPin },
    { title: 'Quiet hotel lobbies', description: 'Saved filter', icon: Search },
    { title: 'Morning workout classes', description: 'Yesterday', icon: Clock },
  ];
  const [query, setQuery] = useState('');
  const visibleSearches = query
    ? recentSearches.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      )
    : recentSearches;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="sm">
          <Text as="h1" variant="screenTitle">
            Explore
          </Text>
          <SearchBar
            aria-label="Search recent places"
            placeholder="Places, events, people"
            value={query}
            onChange={handleSearchChange}
            onClear={() => setQuery('')}
          />
        </Stack>

        <ListSection
          title={query ? 'Matching searches' : 'Recent searches'}
          variant="soft"
        >
          {visibleSearches.length > 0 ? (
            visibleSearches.map((item) => (
              <ListRow
                key={item.title}
                as="div"
                leadingIcon={item.icon}
                title={item.title}
                description={item.description}
                trailingIcon={null}
              />
            ))
          ) : (
            <ListRow
              as="div"
              leadingIcon={Search}
              title="No recent matches"
              description="Try a broader search."
              trailingIcon={null}
            />
          )}
        </ListSection>
      </Stack>
    </DeviceFrame>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="SearchBar"
      description="A mobile-first search control with a soft filled field, tokenized search icon, an inline clear action, and native input props."
    >
      <Panel>
        <Section
          title="Core states"
          description="SearchBar keeps a compact iOS-like fill while preserving a 44px touch target and one clear focus treatment."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Idle" note="Uncontrolled search input with a native placeholder.">
              <SearchBar aria-label="Search" placeholder="Search" />
            </SpecCell>
            <SpecCell label="Focused" note="Focus turns the field white and strengthens the field edge.">
              <SearchBar aria-label="Focused search" defaultValue="Restaurants" autoFocus />
            </SpecCell>
            <SpecCell label="Read-only" note="Keeps the value readable without edit affordances.">
              <SearchBar aria-label="Saved search" value="Saved route" readOnly />
            </SpecCell>
            <SpecCell label="Disabled" note="Unavailable search is muted and non-editable.">
              <SearchBar aria-label="Disabled search" value="Unavailable" disabled />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Actions and feedback"
          description="Clear appears inside the field only when there is editable content. A separate Cancel action is reserved for full-screen search modes."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Clear action" note="Works with controlled values and returns focus to the input.">
              <ClearableSearchExample />
            </SpecCell>
            <SpecCell label="Small" note="Dense search rows still keep the 44px hit target.">
              <SearchBar aria-label="Small search" size="sm" defaultValue="Compact query" />
            </SpecCell>
            <SpecCell label="Error" note="Validation feedback uses a single error stroke.">
              <SearchBar aria-label="Search error" status="error" value="Unsupported filter" readOnly />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Device use case"
          description="A recent-searches composition inside the iPhone safe area and 370px content lane."
        >
          <div className="openui-device-story-layout">
            <RecentSearchesScreen />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
