import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CircleAlert,
  CircleCheck,
  Field,
  Info,
  Input,
  Lock,
  Mail,
  Phone,
  Search,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Input',
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

function ClearableInputExample() {
  const [query, setQuery] = useState('Recent bookings');

  return (
    <Input
      aria-label="Search trips"
      leadingIcon={Search}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      clearable
      onClear={() => setQuery('')}
    />
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Input fields"
      description="Mobile inputs use one clean outline: soft filled idle state, white focused surface, and semantic validation states for form feedback."
    >
      <Panel>
        <Section
          title="Core states"
          description="Input states describe interaction and availability. Focus shifts the field from grey fill to a white active surface without adding a second outline."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Default" note="Ready for text entry with soft fill and outline.">
              <Input aria-label="Name" placeholder="Full name" />
            </SpecCell>
            <SpecCell label="Focused" note="Active entry uses white fill and primary focus treatment.">
              <Input aria-label="Focused email" defaultValue="alex@example.com" autoFocus />
            </SpecCell>
            <SpecCell label="Disabled" note="Unavailable and removed from editing.">
              <Input aria-label="Disabled email" value="team@example.com" disabled />
            </SpecCell>
            <SpecCell label="Read-only" note="Readable value that cannot be edited.">
              <Input aria-label="Account ID" value="OPENUI-2048" readOnly />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Validation"
          description="Status communicates field-level feedback. Error maps to aria-invalid; success and warning remain advisory."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Default" note="No validation feedback yet.">
              <Input aria-label="Default input" placeholder="Enter value" />
            </SpecCell>
            <SpecCell label="Success" note="Valid value or confirmed availability.">
              <Input aria-label="Success input" status="success" trailingIcon={CircleCheck} value="Available" readOnly />
            </SpecCell>
            <SpecCell label="Warning" note="Allowed, but needs attention.">
              <Input aria-label="Warning input" status="warning" trailingIcon={Info} value="Almost full" readOnly />
            </SpecCell>
            <SpecCell label="Error" note="Invalid value; sets aria-invalid.">
              <Input aria-label="Error input" status="error" trailingIcon={CircleAlert} value="Missing @" readOnly />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Size"
          description="Sizes adjust field height and inset while staying at or above the mobile 44px touch target."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Small" note="Dense repeated form rows.">
              <Input aria-label="Small input" size="sm" placeholder="Small" />
            </SpecCell>
            <SpecCell label="Regular" note="Default mobile form size.">
              <Input aria-label="Regular input" size="md" placeholder="Regular" />
            </SpecCell>
            <SpecCell label="Large" note="Prominent entry fields or setup flows.">
              <Input aria-label="Large input" size="lg" placeholder="Large" />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Icons and actions"
          description="Icons sit inside the field using the OpenUI Icon wrapper. Clear and reveal actions are accessible controls."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Leading icon" note="Helps identify expected content.">
              <Input aria-label="Email" leadingIcon={Mail} placeholder="you@example.com" />
            </SpecCell>
            <SpecCell label="Trailing icon" note="Use for advisory status or field context.">
              <Input aria-label="Username" trailingIcon={User} placeholder="Username" />
            </SpecCell>
            <SpecCell label="Clear action" note="Caller-owned value clearing for search-like fields.">
              <ClearableInputExample />
            </SpecCell>
            <SpecCell label="Password reveal" note="Toggles password visibility without changing layout.">
              <Input aria-label="Password" leadingIcon={Lock} defaultValue="openui-pass" revealable />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Field anatomy"
          description="Field resolves label, required marker, optional text, info affordance, hint, and validation messages into the input accessibility contract."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Hint" note="Supportive copy before validation.">
              <Field
                label="Change Label"
                required
                optionalText="Optional"
                infoLabel="More information"
                hint="This is a hint text to help user."
                inputProps={{ leadingIcon: User, placeholder: 'Placeholder text...' }}
              />
            </SpecCell>
            <SpecCell label="Optional" note="Optional metadata stays with the label.">
              <Field
                label="Company"
                optionalText="Optional"
                infoLabel="Company is optional"
                inputProps={{ placeholder: 'OpenUI Labs' }}
              />
            </SpecCell>
            <SpecCell label="Error" note="Validation message sets the input error state.">
              <Field
                label="Change Label"
                required
                optionalText="Optional"
                infoLabel="More information"
                error="This is a hint text to help user."
                inputProps={{ leadingIcon: User, value: 'Placeholder text...', readOnly: true }}
              />
            </SpecCell>
            <SpecCell label="Success" note="Positive field-level confirmation.">
              <Field
                label="Username"
                success="Username is available."
                inputProps={{ value: 'alex_openui', readOnly: true }}
              />
            </SpecCell>
            <SpecCell label="Warning" note="Advisory state without blocking entry.">
              <Field
                label="Storage limit"
                warning="You are close to the limit."
                inputProps={{ value: '92% used', readOnly: true }}
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const MobileFormUseCases: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Mobile input use cases"
      description="Fields fill the iPhone content area inside safe margins and use mobile keyboard hints where appropriate."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Account
                </Text>
                <Text variant="secondary" color="sub">
                  Common mobile form inputs inside the 370px content area.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Field
                  label="Email"
                  required
                  infoLabel="Email requirements"
                  hint="We will send confirmation here."
                  inputProps={{ type: 'email', inputMode: 'email', leadingIcon: Mail, placeholder: 'you@example.com' }}
                />
                <Field
                  label="Password"
                  inputProps={{ leadingIcon: Lock, defaultValue: 'openui-pass', revealable: true }}
                />
                <Field
                  label="Phone"
                  optionalText="Optional"
                  infoLabel="Phone is optional"
                  inputProps={{ type: 'tel', inputMode: 'tel', leadingIcon: Phone, placeholder: '+1 555 0100' }}
                />
                <Field
                  label="Invite code"
                  success="Code applied."
                  inputProps={{ status: 'success', trailingIcon: CircleCheck, value: 'OPENUI', readOnly: true }}
                />
              </Stack>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
