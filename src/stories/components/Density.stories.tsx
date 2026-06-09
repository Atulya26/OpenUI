import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  IconButton,
  Input,
  Screen,
  Search,
  SearchBar,
  Select,
  Stack,
  Text,
} from '@/components';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Density',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const destinationOptions = [
  { value: 'nearby', label: 'Nearby stays' },
  { value: 'saved', label: 'Saved places' },
  { value: 'recent', label: 'Recent searches' },
];

function Controls() {
  return (
    <Stack gap="sm" style={{ maxWidth: 'var(--device-content-width)' }}>
      <Button variant="primary" size="md">
        Continue
      </Button>
      <Input aria-label="Email" size="md" placeholder="Email" />
      <SearchBar aria-label="Search stays" placeholder="Search stays" />
      <Select
        aria-label="Destination"
        placeholder="Choose destination"
        options={destinationOptions}
      />
      <IconButton icon={Search} size="md" label="Search" appearance="outline" />
    </Stack>
  );
}

function DensitySpec({
  density,
  title,
  description,
}: {
  density?: 'compact';
  title: string;
  description: string;
}) {
  return (
    <div data-density={density}>
      <Stack gap="sm">
        <Stack gap="xs">
          <Text variant="listTitle">{title}</Text>
          <Text variant="secondary" color="sub">
            {description}
          </Text>
        </Stack>
        <Controls />
      </Stack>
    </div>
  );
}

function PhoneDensityExample() {
  return (
    <Screen density="compact">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Compact setup
          </Text>
          <Text variant="secondary" color="sub">
            Controls inherit compact density from the screen shell.
          </Text>
        </Stack>
        <Controls />
      </Stack>
    </Screen>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Density"
      description="Comfortable is the default control sizing. Compact retunes the shared control height and padding scale through data-density without per-component density props."
    >
      <Panel>
        <Section
          title="Comfortable vs compact"
          description="Compact is available for dense mobile surfaces, but sm/md fall below 44px until Phase 2 expanded hit areas land."
        >
          <Stack direction="horizontal" gap="lg" wrap>
            <DensitySpec
              title="Comfortable"
              description="Default sizing: sm 44px, md 48px, lg 56px."
            />
            <DensitySpec
              density="compact"
              title="Compact"
              description="Tighter sizing: sm 36px, md 40px, lg 44px."
            />
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Screen density"
          description="Screen density applies data-density to the app shell so controls inherit the compact scale."
        >
          <PhoneDensityExample />
        </Section>
      </Panel>
    </DocPage>
  ),
};
