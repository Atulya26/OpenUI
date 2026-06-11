import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Field, Input, Stack, Text } from '@/components';
import { useKeyboardInset, useSafeArea } from '@/hooks';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

type KeyboardAvoidanceArgs = {
  simulateKeyboard: boolean;
  showSafeArea: boolean;
};

const simulatedKeyboardInset = 'calc(var(--space-10) + var(--space-10) + var(--space-8))';

const meta = {
  title: 'Foundational/Layout/Keyboard Avoidance',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    simulateKeyboard: true,
    showSafeArea: true,
  },
  argTypes: {
    simulateKeyboard: {
      control: 'boolean',
      description: 'Uses a tokenized CSS inset when Storybook cannot open a real mobile keyboard.',
    },
    showSafeArea: {
      control: 'boolean',
      description: 'Shows DeviceFrame safe-area guides.',
    },
  },
} satisfies Meta<KeyboardAvoidanceArgs>;

export default meta;
type Story = StoryObj<KeyboardAvoidanceArgs>;

function KeyboardAvoidanceDevice({
  simulateKeyboard,
  showSafeArea,
}: KeyboardAvoidanceArgs) {
  const safeArea = useSafeArea();
  const keyboard = useKeyboardInset({
    simulatedInset: simulateKeyboard ? simulatedKeyboardInset : undefined,
  });

  return (
    <div className="openui-device-story-layout">
      <DeviceFrame showSafeArea={showSafeArea}>
        <div
          className={[
            'openui-keyboard-demo',
            simulateKeyboard && 'openui-keyboard-demo--simulated',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            ...safeArea.style,
            ...keyboard.style,
          }}
        >
          <div className="openui-keyboard-demo__body">
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Check in
                </Text>
                <Text variant="secondary" color="sub">
                  Confirm the arrival details before sending the host an
                  update.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Field
                  label="Guest name"
                  inputProps={{
                    autoComplete: 'name',
                    defaultValue: 'Alex Morgan',
                  }}
                />
                <Field
                  label="Arrival note"
                  hint="Add anything the host should know before you arrive."
                  inputProps={{
                    placeholder: 'Lobby entrance, late arrival',
                  }}
                />
              </Stack>
            </Stack>
          </div>

          <footer className="openui-keyboard-demo__footer">
            <Text variant="label" color="sub">
              Quick reply
            </Text>
            <div className="openui-keyboard-demo__composer">
              <Input
                aria-label="Quick reply message"
                placeholder="Message"
                inputMode="text"
              />
              <Button size="md">Send</Button>
            </div>
          </footer>

          <div className="openui-keyboard-demo__keyboard" aria-hidden="true" />
        </div>
      </DeviceFrame>
    </div>
  );
}

export const FooterInset: Story = {
  render: (args) => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Keyboard avoidance"
      description="useKeyboardInset reads visualViewport on device and exposes CSS variables that fixed footers, sheets, and input bars can translate above the on-screen keyboard."
    >
      <Panel>
        <Section
          title="Footer above keyboard"
          description="The story uses DeviceFrame safe areas. Simulation mode replaces the live viewport inset with a tokenized CSS expression for repeatable Storybook review."
        >
          <KeyboardAvoidanceDevice {...args} />
        </Section>
      </Panel>
    </DocPage>
  ),
};
