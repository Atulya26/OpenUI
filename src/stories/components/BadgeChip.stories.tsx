import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Check,
  CircleAlert,
  CircleCheck,
  Clock,
  Filter,
  Input,
  MapPin,
  Search,
  Stack,
  Star,
  Text,
  Users,
} from '@/components';
import { Badge, type BadgeTone, type BadgeVariant } from '@/components/Badge';
import { Chip } from '@/components/Chip';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Badge and Chip',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const badgeTones: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'error'];
const badgeVariants: BadgeVariant[] = ['soft', 'outline', 'solid'];

function SpecCell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="openui-button-spec-cell">
      <div className="openui-button-spec-cell__example">{children}</div>
      <div className="openui-button-spec-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function RemovableChipDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <Stack direction="horizontal" gap="sm" align="center" wrap>
      {visible ? (
        <Chip
          removable
          onRemove={() => setVisible(false)}
          leadingIcon={MapPin}
          aria-label="Chelsea, removable filter"
        >
          Chelsea
        </Chip>
      ) : (
        <Chip onClick={() => setVisible(true)} leadingIcon={MapPin}>
          Restore
        </Chip>
      )}
      <Chip selected leadingIcon={Star}>
        Top rated
      </Chip>
    </Stack>
  );
}

function FilterRowDemo() {
  const [selected, setSelected] = useState('open');

  return (
    <Stack direction="horizontal" gap="sm" wrap>
      <Chip
        selected={selected === 'open'}
        onClick={() => setSelected('open')}
        leadingIcon={Clock}
      >
        Open now
      </Chip>
      <Chip
        selected={selected === 'nearby'}
        onClick={() => setSelected('nearby')}
        leadingIcon={MapPin}
      >
        Nearby
      </Chip>
      <Chip
        selected={selected === 'groups'}
        onClick={() => setSelected('groups')}
        leadingIcon={Users}
      >
        Groups
      </Chip>
    </Stack>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Badge and Chip"
      description="Badges are compact read-only metadata. Chips are compact filter controls with a real pressed state and mobile tap target."
    >
      <Panel>
        <Section
          title="Badge variants"
          description="Tone communicates status; variant controls visual weight. Badges stay non-interactive."
        >
          <Stack gap="md">
            {badgeVariants.map((variant) => (
              <Stack key={variant} gap="xs">
                <Text variant="label" color="sub">
                  {variant}
                </Text>
                <Stack direction="horizontal" gap="sm" wrap>
                  {badgeTones.map((tone) => (
                    <Badge
                      key={`${tone}-${variant}`}
                      tone={tone}
                      variant={variant}
                      leadingIcon={tone === 'success' ? CircleCheck : tone === 'error' ? CircleAlert : undefined}
                    >
                      {tone}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Badge sizes"
          description="Small fits counts and tight metadata; regular works for status beside list and card titles."
        >
          <div className="openui-button-spec-grid">
            <SpecCell title="Small" description="Tiny count, label, or secondary metadata.">
              <Badge size="sm" tone="primary">
                12
              </Badge>
            </SpecCell>
            <SpecCell title="Regular" description="Default status label with optional leading icon.">
              <Badge tone="success" leadingIcon={CircleCheck}>
                Synced
              </Badge>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Chip states"
          description="Chips are button-based, 44px tappable controls. Selected maps to aria-pressed."
        >
          <div className="openui-button-spec-grid">
            <SpecCell title="Default" description="Available filter or compact token action.">
              <Chip leadingIcon={Filter}>Filter</Chip>
            </SpecCell>
            <SpecCell title="Selected" description="Committed filter state with decisive filled control language.">
              <Chip selected leadingIcon={Check}>Selected</Chip>
            </SpecCell>
            <SpecCell title="Disabled" description="Visible but not currently available.">
              <Chip disabled leadingIcon={Clock}>Soon</Chip>
            </SpecCell>
            <SpecCell title="Removable" description="Tap the close affordance, or press Delete / Backspace while focused.">
              <RemovableChipDemo />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Filter row"
          description="Rows wrap within the phone lane and keep every chip reachable as a normal button."
        >
          <FilterRowDemo />
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const MobileSearchFilters: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Mobile search filters"
      description="Badges and chips inside a 370px content lane with search, filters, and status metadata."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame>
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Places
                </Text>
                <Input leadingIcon={Search} placeholder="Search nearby" aria-label="Search nearby" />
              </Stack>

              <Stack gap="sm">
                <Stack direction="horizontal" gap="sm" wrap>
                  <Chip selected leadingIcon={Clock}>
                    Open
                  </Chip>
                  <Chip leadingIcon={MapPin}>Nearby</Chip>
                  <Chip removable onRemove={() => undefined} aria-label="Remove patios filter">
                    Patios
                  </Chip>
                </Stack>
                <Stack direction="horizontal" gap="sm" wrap>
                  <Badge tone="primary">18 matches</Badge>
                  <Badge tone="success" leadingIcon={CircleCheck}>
                    Updated
                  </Badge>
                </Stack>
              </Stack>

              <Stack gap="sm">
                <Card>
                  <CardHeader>
                    <Stack direction="horizontal" justify="between" align="start" gap="md">
                      <Stack gap="xs">
                        <Text as="h2" variant="cardTitle">
                          Northline Market
                        </Text>
                        <Text variant="tertiary" color="sub">
                          Coffee, snacks, and outdoor seating
                        </Text>
                      </Stack>
                      <Badge tone="success" size="sm">
                        Open
                      </Badge>
                    </Stack>
                  </CardHeader>
                  <CardBody>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Badge tone="neutral" variant="outline" size="sm">
                        0.4 mi
                      </Badge>
                      <Badge tone="primary" variant="soft" size="sm" leadingIcon={Star}>
                        4.8
                      </Badge>
                    </Stack>
                  </CardBody>
                </Card>

                <Card variant="soft">
                  <CardHeader>
                    <Stack direction="horizontal" justify="between" align="start" gap="md">
                      <Stack gap="xs">
                        <Text as="h2" variant="cardTitle">
                          Verdan Studio
                        </Text>
                        <Text variant="tertiary" color="sub">
                          Quiet tables, booking required
                        </Text>
                      </Stack>
                      <Badge tone="warning" size="sm">
                        Busy
                      </Badge>
                    </Stack>
                  </CardHeader>
                </Card>
              </Stack>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
