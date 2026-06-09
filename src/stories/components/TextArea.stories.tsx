import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Stack, Text } from '@/components';
import { TextArea, TextAreaField } from '@/components/TextArea';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/TextArea',
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

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TextArea"
      description="TextArea is the multiline companion to Input: mobile soft outlined, tokenized, and focused with one clean active border."
    >
      <Panel>
        <Section
          title="Core states"
          description="The control uses the same idle, focused, disabled, and read-only language as Input without adding a second focus outline."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Default" note="Ready for longer text with comfortable multiline insets.">
              <TextArea aria-label="Note" placeholder="Write a note..." />
            </SpecCell>
            <SpecCell label="Focused" note="Active entry uses the primary border and white surface.">
              <TextArea aria-label="Focused note" defaultValue="Bring the boarding pass and charger." autoFocus />
            </SpecCell>
            <SpecCell label="Disabled" note="Unavailable and removed from editing.">
              <TextArea aria-label="Disabled note" value="Locked by policy." disabled />
            </SpecCell>
            <SpecCell label="Read-only" note="Readable text that cannot be edited.">
              <TextArea aria-label="Read-only note" value="Synced from workspace template." readOnly />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Validation"
          description="Status mirrors Input. Error and invalid both set aria-invalid on the native textarea."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Default" note="No validation feedback yet.">
              <TextArea aria-label="Default status" placeholder="Add context..." />
            </SpecCell>
            <SpecCell label="Success" note="Confirmed or accepted content.">
              <TextArea aria-label="Success status" status="success" value="Summary saved." readOnly />
            </SpecCell>
            <SpecCell label="Warning" note="Allowed, but needs attention.">
              <TextArea aria-label="Warning status" status="warning" value="This is a little short." readOnly />
            </SpecCell>
            <SpecCell label="Error" note="Invalid content; sets aria-invalid.">
              <TextArea aria-label="Error status" status="error" value="Missing required detail." readOnly />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Size and rows"
          description="Sizes tune inset and vertical rhythm. Rows set the starting height, while maxRows caps growth for long notes."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Small" note="Dense repeated notes or compact forms.">
              <TextArea aria-label="Small textarea" size="sm" minRows={3} placeholder="Small" />
            </SpecCell>
            <SpecCell label="Regular" note="Default mobile form textarea.">
              <TextArea aria-label="Regular textarea" size="md" minRows={4} placeholder="Regular" />
            </SpecCell>
            <SpecCell label="Large" note="Prominent setup or journaling fields.">
              <TextArea aria-label="Large textarea" size="lg" minRows={5} placeholder="Large" />
            </SpecCell>
            <SpecCell label="Max rows" note="Useful when the field sits inside a constrained mobile form.">
              <TextArea
                aria-label="Max rows textarea"
                minRows={3}
                maxRows={4}
                defaultValue="The textarea can start compact while preventing an oversized edit area in a stacked phone layout."
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Field anatomy"
          description="TextAreaField keeps label, hint, required marker, optional text, status message, and described-by wiring together without changing Input."
        >
          <div className="openui-input-spec-grid">
            <SpecCell label="Hint" note="Supportive copy before validation.">
              <TextAreaField
                label="Trip note"
                required
                infoLabel="Trip note requirements"
                hint="Keep it short enough to scan on mobile."
                textAreaProps={{ placeholder: 'Add note...', minRows: 4 }}
              />
            </SpecCell>
            <SpecCell label="Counter" note="Counter is optional and tied to maxLength.">
              <TextAreaField
                label="Internal note"
                optionalText="Optional"
                textAreaProps={{
                  defaultValue: 'Guest prefers a quiet room.',
                  maxLength: 140,
                  showCount: true,
                }}
              />
            </SpecCell>
            <SpecCell label="Error" note="Validation message drives error status.">
              <TextAreaField
                label="Cancellation reason"
                error="Add at least one concrete reason."
                textAreaProps={{ value: 'Need to cancel.', readOnly: true }}
              />
            </SpecCell>
            <SpecCell label="Success" note="Positive confirmation without extra decoration.">
              <TextAreaField
                label="Support reply"
                success="Reply is ready to send."
                textAreaProps={{ value: 'Thanks for the details. We can help with that.', readOnly: true }}
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const LongNoteForm: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TextArea mobile form"
      description="A realistic long-note form inside the iPhone content lane, using the product shell provided by DeviceFrame."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <Stack gap="lg">
              <Stack gap="sm">
                <Text as="h1" variant="screenTitle">
                  Visit notes
                </Text>
                <Text variant="secondary" color="sub">
                  Capture the context a teammate needs before the next follow-up.
                </Text>
              </Stack>

              <Stack gap="sm">
                <TextAreaField
                  label="Summary"
                  required
                  hint="One or two lines is enough."
                  textAreaProps={{
                    minRows: 3,
                    maxRows: 5,
                    placeholder: 'What changed since the last visit?',
                  }}
                />
                <TextAreaField
                  label="Details"
                  optionalText="Optional"
                  textAreaProps={{
                    minRows: 6,
                    maxRows: 8,
                    maxLength: 280,
                    showCount: true,
                    defaultValue:
                      'Customer is interested in the shared workspace plan, but wants pricing clarity before inviting finance.',
                  }}
                />
                <TextAreaField
                  label="Risk"
                  warning="Mention any blocker if this needs manager review."
                  textAreaProps={{
                    minRows: 3,
                    placeholder: 'Add blocker...',
                  }}
                />
              </Stack>

              <Button fullWidth>Save note</Button>
            </Stack>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
