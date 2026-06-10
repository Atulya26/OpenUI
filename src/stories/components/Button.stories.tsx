import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Bell,
  Button,
  Check,
  Download,
  IconButton,
  MoreHorizontal,
  Search,
  Settings,
  Share2,
  Stack,
  Text,
  Trash2,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Button',
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
  children: React.ReactNode;
}) {
  return (
    <div className="openui-button-spec-cell">
      <div className="openui-button-spec-cell__example">{children}</div>
      <div className="openui-button-spec-cell__copy">
        <span>{label}</span>
        <p>{note}</p>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Buttons"
      description="Action controls use variant for intent, appearance for surface, and selected for a committed pressed state."
    >
      <Panel>
        <Section
          title="Intent and appearance"
          description="Variant communicates meaning; appearance controls visual weight."
        >
          <div className="openui-button-matrix">
            <div className="openui-button-matrix__header" />
            <div className="openui-button-matrix__header">Fill</div>
            <div className="openui-button-matrix__header">Outline</div>
            <div className="openui-button-matrix__header">Transparent</div>

            <div className="openui-button-matrix__label">
              <span>Default</span>
              <p>Neutral actions like save, continue, or open.</p>
            </div>
            <Button variant="default">Save</Button>
            <Button variant="default" appearance="outline">Save</Button>
            <Button variant="default" appearance="transparent">Save</Button>

            <div className="openui-button-matrix__label">
              <span>Primary</span>
              <p>The main action on a screen or form.</p>
            </div>
            <Button variant="primary">Continue</Button>
            <Button variant="primary" appearance="outline">Continue</Button>
            <Button variant="primary" appearance="transparent">Continue</Button>

            <div className="openui-button-matrix__label">
              <span>Destructive</span>
              <p>Actions that delete, remove, cancel, or reset.</p>
            </div>
            <Button variant="destructive">Delete</Button>
            <Button variant="destructive" appearance="outline">Delete</Button>
            <Button variant="destructive" appearance="transparent">Delete</Button>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="States"
          description="States are behavior, not separate variants. Selected uses a darker fill and maps to aria-pressed; loading maps to aria-busy."
        >
          <div className="openui-button-spec-grid">
            <SpecCell label="Default" note="Ready to receive a tap or click.">
              <Button>Continue</Button>
            </SpecCell>
            <SpecCell label="Selected" note="A toggle action that is currently on.">
              <Button selected leadingIcon={Check}>Following</Button>
            </SpecCell>
            <SpecCell label="Loading" note="Work is in progress; the control is temporarily disabled.">
              <Button loading>Saving</Button>
            </SpecCell>
            <SpecCell label="Disabled" note="Unavailable because the action cannot run yet.">
              <Button disabled>Continue</Button>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Icon placement"
          description="Use icons to clarify action type, direction, or consequence. Avoid decorative icons that repeat the label."
        >
          <div className="openui-button-spec-grid">
            <SpecCell label="Leading icon" note="Best when the icon identifies the action.">
              <Button leadingIcon={Download}>Download</Button>
            </SpecCell>
            <SpecCell label="Trailing icon" note="Best for direction, sharing, or disclosure.">
              <Button trailingIcon={Share2}>Share</Button>
            </SpecCell>
            <SpecCell label="Both sides" note="Rare; use when the trailing icon adds separate meaning.">
              <Button leadingIcon={Bell} trailingIcon={Check}>Notify</Button>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Size and width"
          description="Size controls control height and emphasis. Width is a layout choice: use fullWidth when the action should fill the 370px iPhone content area."
        >
          <div className="openui-button-spec-grid">
            <SpecCell label="Small" note="Compact repeated actions.">
              <Button size="sm">Small</Button>
            </SpecCell>
            <SpecCell label="Regular" note="Default action size.">
              <Button size="md">Regular</Button>
            </SpecCell>
            <SpecCell label="Large" note="High-emphasis standalone actions.">
              <Button size="lg">Large</Button>
            </SpecCell>
            <SpecCell label="Extra large" note="Prominent height for a single high-emphasis action.">
              <Button size="xl">Extra large</Button>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Icon buttons"
          description="Icon-only actions are compact controls for navigation bars, rows, and toolbars. Every icon button needs an accessible label."
        >
          <div className="openui-button-spec-grid">
            <SpecCell label="Sizes" note="Small, regular, and large touch targets.">
              <Stack direction="horizontal" gap="sm" wrap>
                <IconButton icon={Search} label="Search" size="sm" />
                <IconButton icon={Settings} label="Settings" size="md" />
                <IconButton icon={MoreHorizontal} label="More options" size="lg" />
              </Stack>
            </SpecCell>
            <SpecCell label="Appearance" note="Fill, outline, and transparent surfaces.">
              <Stack direction="horizontal" gap="sm" wrap>
                <IconButton icon={Search} label="Search" appearance="fill" />
                <IconButton icon={Settings} label="Settings" appearance="outline" />
                <IconButton icon={MoreHorizontal} label="More options" />
              </Stack>
            </SpecCell>
            <SpecCell label="Selected" note="Pressed toggle state for active tools or filters.">
              <IconButton icon={Bell} label="Notifications enabled" variant="primary" selected />
            </SpecCell>
            <SpecCell label="Destructive" note="Dangerous icon-only action. Use labels carefully.">
              <IconButton icon={Trash2} label="Delete" variant="destructive" appearance="outline" />
            </SpecCell>
            <SpecCell label="Disabled" note="Unavailable icon-only action.">
              <IconButton icon={Share2} label="Share" disabled />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const MobileFullWidth: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Full-width mobile buttons"
      description="Full-width actions fill the content area inside the iPhone safe-area margins."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Actions
                </Text>
                <Text variant="secondary" color="sub">
                  Extended actions span the 370px content width without entering unsafe screen edges.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Button size="xl" fullWidth leadingIcon={Check}>
                  Confirm booking
                </Button>
                <Button size="lg" fullWidth appearance="outline" trailingIcon={Share2}>
                  Share details
                </Button>
                <Button fullWidth appearance="transparent" variant="destructive" leadingIcon={Trash2}>
                  Cancel request
                </Button>
              </Stack>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
