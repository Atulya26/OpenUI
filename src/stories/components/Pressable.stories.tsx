import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  IconButton,
  Pressable,
  Stack,
  Text,
} from '@/components';
import { Bell, Check, Download } from '@/components/Icon/icons';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Pressable',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PressableDemo() {
  const [event, setEvent] = useState('Waiting for press');

  return (
    <Stack gap="sm">
      <Pressable
        as="button"
        className="openui-pressable-story-card"
        haptic="selection"
        onPressStart={(interaction) => setEvent(`${interaction.type} press started`)}
        onPressEnd={(interaction) => setEvent(`${interaction.type} press ended`)}
      >
        <span>Press target</span>
        <small>Shared state layer, scale feedback, and haptic metadata.</small>
      </Pressable>
      <Text variant="secondary" color="sub">
        {event}
      </Text>
    </Stack>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Pressable"
      description="The shared mobile interaction primitive for press scale, state layers, compact hit areas, and future haptic bindings."
    >
      <Panel>
        <Section
          title="Interaction contract"
          description="Use Pressable under components that need tactile mobile feedback. It emits press lifecycle callbacks and data-haptic metadata without owning business behavior or calling browser vibration APIs."
        >
          <div className="openui-pressable-story-grid">
            <PressableDemo />
            <Stack gap="sm">
              <Pressable
                as="button"
                className="openui-pressable-story-pill"
                stateLayer="primary"
                haptic="light"
              >
                Primary state layer
              </Pressable>
              <Pressable
                as="button"
                className="openui-pressable-story-pill openui-pressable-story-pill--danger"
                stateLayer="danger"
                haptic="warning"
              >
                Danger state layer
              </Pressable>
              <Pressable
                as="button"
                className="openui-pressable-story-pill"
                disabled
              >
                Disabled pressable
              </Pressable>
            </Stack>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Haptic metadata"
          description="The public haptic prop uses PressableHaptic: none, light, selection, medium, success, warning, destructive, or error. Values other than none are emitted as data-haptic for native shells to bind."
        >
          <Stack gap="sm">
            <Text variant="secondary" color="sub">
              Use selection for selected-value changes, success for positive confirmations, warning or destructive for destructive confirmation, light for neutral presses, and medium for long press when supported.
            </Text>
            <Stack direction="horizontal" gap="sm" wrap>
              <Button haptic="light">Neutral press</Button>
              <Button haptic="success" leadingIcon={Check}>
                Success
              </Button>
              <IconButton
                icon={Bell}
                label="Selection haptic"
                haptic="selection"
                appearance="outline"
              />
            </Stack>
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Initial consumers"
          description="Button and IconButton now share the Pressable feedback core while preserving their visual variants, sizes, and accessibility contracts."
        >
          <Stack direction="horizontal" gap="sm" wrap>
            <Button leadingIcon={Download}>Download</Button>
            <Button selected leadingIcon={Check}>
              Following
            </Button>
            <IconButton icon={Bell} label="Notifications" appearance="outline" />
            <IconButton icon={Bell} label="Selected notifications" selected />
          </Stack>
        </Section>
      </Panel>
    </DocPage>
  ),
};
