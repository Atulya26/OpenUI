import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ActionSheet,
  Button,
  Dialog,
  Stack,
  Text,
  VisuallyHidden,
} from '@/components';
import { Share2, Trash2 } from '@/components/Icon/icons';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Overlay Primitives',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogPrimitiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        title="Shared overlay plumbing"
        description="This dialog uses Portal, FocusTrap, and usePresence while keeping the Dialog API stable."
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button appearance="transparent" onClick={() => setOpen(false)}>
              Later
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </>
        }
      />
    </>
  );
}

function ActionSheetPrimitiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button appearance="outline" onClick={() => setOpen(true)}>
        Open action sheet
      </Button>
      <ActionSheet
        open={open}
        title="Reservation actions"
        description="Focus stays in the sheet until it closes."
        onClose={() => setOpen(false)}
        actions={[
          {
            id: 'share',
            label: 'Share request',
            description: 'Send this inquiry to a teammate.',
            icon: Share2,
            tone: 'primary',
          },
          {
            id: 'cancel',
            label: 'Cancel request',
            description: 'Release the reserved dates.',
            icon: Trash2,
            tone: 'destructive',
          },
        ]}
      />
    </>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Overlay primitives"
      description="Shared infrastructure for root stacking, modal focus containment, hidden accessible labels, and exit-before-unmount animation."
    >
      <Panel>
        <Section
          title="Primitive contract"
          description="These utilities stay small and behavior-focused so Dialog, Sheet, Select, Toast, and future popovers do not duplicate infrastructure."
        >
          <div className="openui-overlay-primitive-grid">
            <div className="openui-overlay-primitive-card">
              <span className="openui-overlay-primitive-card__label">Portal</span>
              <Text variant="secondary" color="sub">
                Sends fixed overlays to the document root while contained previews stay local.
              </Text>
            </div>
            <div className="openui-overlay-primitive-card">
              <span className="openui-overlay-primitive-card__label">FocusTrap</span>
              <Text variant="secondary" color="sub">
                Loops Tab focus, handles Escape, and restores focus to the opener.
              </Text>
            </div>
            <div className="openui-overlay-primitive-card">
              <span className="openui-overlay-primitive-card__label">usePresence</span>
              <Text variant="secondary" color="sub">
                Keeps closing surfaces mounted until their exit animation completes.
              </Text>
            </div>
            <div className="openui-overlay-primitive-card">
              <span className="openui-overlay-primitive-card__label">VisuallyHidden</span>
              <Text variant="secondary" color="sub">
                Keeps assistive labels available without adding visible interface chrome.
              </Text>
            </div>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Overlay consumers"
          description="Dialog and ActionSheet now share the same portal, focus, Escape, and presence behavior."
        >
          <Stack direction="horizontal" gap="sm" wrap>
            <DialogPrimitiveDemo />
            <ActionSheetPrimitiveDemo />
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Assistive-only copy"
          description="Use VisuallyHidden for semantic text that should be announced but not visible."
        >
          <button className="openui-overlay-primitive-hidden-demo" type="button">
            42
            <VisuallyHidden> unread notifications</VisuallyHidden>
          </button>
        </Section>
      </Panel>
    </DocPage>
  ),
};
