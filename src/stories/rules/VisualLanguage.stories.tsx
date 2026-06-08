import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Bell,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Check,
  ChevronRight,
  Field,
  Icon,
  IconButton,
  Input,
  ListRow,
  Search,
  Separator,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Rules/Visual Language',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STATE_RULES = [
  {
    title: 'Idle',
    description: 'Quiet surface, clear label, no decorative noise.',
  },
  {
    title: 'Focus',
    description: 'One visible keyboard treatment; no stacked mobile outlines.',
  },
  {
    title: 'Selected control',
    description: 'Dark filled state for active toggles and action controls.',
  },
  {
    title: 'Selected surface',
    description: 'Tinted surface with stronger stroke for chosen content.',
  },
  {
    title: 'Validation',
    description: 'One semantic stroke and message; do not over-decorate.',
  },
  {
    title: 'Disabled',
    description: 'Muted, flat, and clearly unavailable.',
  },
] as const;

function TasteRuleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card variant="outline" padding="sm">
      <Stack gap="xs">
        <Text as="h3" variant="listTitle">{title}</Text>
        <Text variant="tertiary" color="sub">{description}</Text>
      </Stack>
    </Card>
  );
}

export const Contract: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Rules"
      title="Visual language"
      description="OpenUI should feel like a premium mobile app kit: quiet canvas, crisp controls, restrained depth, decisive states, and examples that fit the iPhone content lane."
    >
      <Panel>
        <Section
          title="Surface hierarchy"
          description="Use the quietest surface that still separates content. Elevation explains hierarchy; it should not decorate every block."
        >
          <div className="openui-visual-surface-grid">
            <Card variant="plain" className="openui-visual-canvas-sample">
              <CardHeader>
                <Text as="h3" variant="listTitle">Canvas</Text>
                <Text variant="tertiary" color="sub">Screen background only.</Text>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Text as="h3" variant="listTitle">Surface</Text>
                <Text variant="tertiary" color="sub">Default grouped content.</Text>
              </CardHeader>
            </Card>
            <Card variant="soft">
              <CardHeader>
                <Text as="h3" variant="listTitle">Soft</Text>
                <Text variant="tertiary" color="sub">Secondary grouping.</Text>
              </CardHeader>
            </Card>
            <Card variant="outline">
              <CardHeader>
                <Text as="h3" variant="listTitle">Outline</Text>
                <Text variant="tertiary" color="sub">Low emphasis boundary.</Text>
              </CardHeader>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <Text as="h3" variant="listTitle">Elevated</Text>
                <Text variant="tertiary" color="sub">Important module.</Text>
              </CardHeader>
            </Card>
            <Card selected>
              <CardHeader>
                <Text as="h3" variant="listTitle">Selected</Text>
                <Text variant="tertiary" color="sub">Chosen surface state.</Text>
              </CardHeader>
            </Card>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="State contract"
          description="State treatment changes by component role. Controls can go dark when selected; larger surfaces stay quieter and keep content readable."
        >
          <div className="openui-visual-state-grid">
            {STATE_RULES.map((rule) => (
              <TasteRuleCard key={rule.title} {...rule} />
            ))}
          </div>
          <Separator />
          <div className="openui-visual-state-demo-grid">
            <Card padding="sm">
              <Stack gap="sm">
                <Button variant="primary" selected leadingIcon={Check}>
                  Following
                </Button>
                <Text variant="tertiary" color="sub">Selected control: decisive dark fill.</Text>
              </Stack>
            </Card>
            <Card selected padding="sm">
              <Stack direction="horizontal" align="center" gap="sm">
                <Icon icon={Check} size="md" color="primary" />
                <Stack gap="xs">
                  <Text variant="listTitle">Personal plan</Text>
                  <Text variant="tertiary" color="sub">Selected surface: tint plus border.</Text>
                </Stack>
              </Stack>
            </Card>
            <Card padding="sm">
              <Field
                label="Username"
                success="Username is available."
                inputProps={{ value: 'alex_openui', readOnly: true, status: 'success' }}
              />
            </Card>
            <Card padding="sm">
              <Stack direction="horizontal" align="center" gap="sm">
                <IconButton icon={Bell} label="Disabled notifications" disabled />
                <Text variant="tertiary" color="sub">Disabled controls lose elevation and action color.</Text>
              </Stack>
            </Card>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Mobile fit"
          description="Components should be judged in the 370px content lane. Full-width means app content width, not unsafe screen edge."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">Today</Text>
                  <Text variant="secondary" color="sub">
                    A compact phone screen using the current OpenUI base language.
                  </Text>
                </Stack>

                <Input aria-label="Search" leadingIcon={Search} placeholder="Search cards and rows" />

                <Card variant="elevated" radius="large">
                  <CardHeader>
                    <Text as="h2" variant="cardTitle">Identity check</Text>
                    <Text variant="tertiary" color="sub">One focused task, one full-width action.</Text>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="primary" fullWidth leadingIcon={User}>
                      Continue setup
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <ListRow leadingIcon={User} title="Profile" description="Name and photo" />
                  <ListRow selected leadingIcon={Bell} title="Notifications" trailingIcon={null} />
                  <ListRow leadingIcon={Check} title="Completed" trailingText="Done" trailingIcon={null} />
                  <ListRow
                    leadingIcon={ChevronRight}
                    title="Next step"
                    description="Review account access"
                    showDivider={false}
                  />
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
