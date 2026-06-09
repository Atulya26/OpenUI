import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, ListRow, Stack, Text } from '@/components';
import { Checkbox } from '@/components/Checkbox';
import { Radio } from '@/components/Radio';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Selection Controls',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SpecCell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="openui-list-row-spec-cell">
      <div className="openui-list-row-spec-cell__example">{children}</div>
      <div className="openui-list-row-spec-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function PreferencesSample() {
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [productNews, setProductNews] = useState(false);
  const [theme, setTheme] = useState('system');

  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Preferences
          </Text>
          <Text variant="secondary" color="sub">
            Compact controls in tappable rows inside the iPhone content lane.
          </Text>
        </Stack>

        <Card>
          <ListRow
            as="div"
            title="Weekly summary"
            description="A short digest every Monday"
            trailingIcon={null}
            trailingSlot={
              <Checkbox
                aria-label="Weekly summary"
                size="sm"
                checked={weeklySummary}
                onChange={(event) => setWeeklySummary(event.target.checked)}
              />
            }
          />
          <ListRow
            as="div"
            title="Product news"
            description="Feature updates and release notes"
            trailingIcon={null}
            showDivider={false}
            trailingSlot={
              <Checkbox
                aria-label="Product news"
                size="sm"
                checked={productNews}
                onChange={(event) => setProductNews(event.target.checked)}
              />
            }
          />
        </Card>

        <Card>
          <ListRow
            as="div"
            title="System theme"
            description="Follow this device"
            trailingIcon={null}
            trailingSlot={
              <Radio
                aria-label="System theme"
                size="sm"
                name="preference-theme"
                value="system"
                checked={theme === 'system'}
                onChange={(event) => setTheme(event.target.value)}
              />
            }
          />
          <ListRow
            as="div"
            title="Light theme"
            description="Keep OpenUI bright"
            trailingIcon={null}
            trailingSlot={
              <Radio
                aria-label="Light theme"
                size="sm"
                name="preference-theme"
                value="light"
                checked={theme === 'light'}
                onChange={(event) => setTheme(event.target.value)}
              />
            }
          />
          <ListRow
            as="div"
            title="Dark theme"
            description="Use the darker palette"
            trailingIcon={null}
            showDivider={false}
            trailingSlot={
              <Radio
                aria-label="Dark theme"
                size="sm"
                name="preference-theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(event) => setTheme(event.target.value)}
              />
            }
          />
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Selection controls"
      description="Checkbox and Radio primitives use real inputs, compact visual marks, full-row labels, and mobile touch targets for dense forms and settings rows."
    >
      <Panel>
        <Section
          title="Compact form rows"
          description="Use full label rows when the text itself should be tappable; the mark stays compact while the row remains at the mobile hit target."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Checkbox group" description="Full-width labels keep dense settings easy to tap.">
              <Card>
                <Stack gap="xs">
                  <Checkbox
                    size="sm"
                    defaultChecked
                    label="Push alerts"
                    description="Important activity only"
                  />
                  <Checkbox
                    size="sm"
                    label="Weekly digest"
                    description="A short Monday recap"
                  />
                  <Checkbox
                    size="sm"
                    label="Product notes"
                    description="Feature updates"
                  />
                </Stack>
              </Card>
            </SpecCell>
            <SpecCell title="Radio group" description="Named choices use the same compact row density.">
              <Card>
                <Stack gap="xs">
                  <Radio
                    size="sm"
                    name="compact-delivery"
                    value="quiet"
                    defaultChecked
                    label="Quiet"
                    description="Only critical alerts"
                  />
                  <Radio
                    size="sm"
                    name="compact-delivery"
                    value="balanced"
                    label="Balanced"
                    description="Recommended updates"
                  />
                  <Radio
                    size="sm"
                    name="compact-delivery"
                    value="all"
                    label="All activity"
                    description="Every workspace event"
                  />
                </Stack>
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Checkbox states"
          description="Checkbox supports checked, defaultChecked, indeterminate, invalid, disabled, and two visual sizes while keeping the label row at the mobile minimum."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Unchecked" description="Neutral outline with a quiet hover surface.">
              <Checkbox
                label="Receive updates"
                description="Account notices"
              />
            </SpecCell>
            <SpecCell title="Checked" description="Selected keeps a decisive primary mark.">
              <Checkbox
                defaultChecked
                label="Sync on Wi-Fi"
                description="Recommended"
              />
            </SpecCell>
            <SpecCell title="Indeterminate" description="Mixed state for partial selections.">
              <Checkbox
                indeterminate
                label="Projects"
                description="Some selected"
              />
            </SpecCell>
            <SpecCell title="Invalid" description="Error state uses a red stroke and aria-invalid.">
              <Checkbox
                invalid
                label="Workspace policy"
                description="Required"
              />
            </SpecCell>
            <SpecCell title="Disabled" description="Unavailable state mutes control and copy.">
              <Checkbox
                disabled
                defaultChecked
                label="Managed backup"
                description="Organization controlled"
              />
            </SpecCell>
            <SpecCell title="Small" description="Dense row size with the same mobile tap target.">
              <Checkbox
                size="sm"
                defaultChecked
                label="Compact"
                description="Dense lists"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Radio states"
          description="Radio mirrors checkbox sizing and validation for one choice in a named compact set."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Unchecked" description="Neutral outline for available choices.">
              <Radio
                name="radio-state"
                label="Manual"
                description="Choose yourself"
              />
            </SpecCell>
            <SpecCell title="Checked" description="Primary fill and centered dot for the selected option.">
              <Radio
                name="radio-state-checked"
                defaultChecked
                label="Automatic"
                description="Use defaults"
              />
            </SpecCell>
            <SpecCell title="Invalid" description="Error state can be used by a parent field or group.">
              <Radio
                invalid
                name="radio-invalid"
                label="Workspace"
                description="Choose one first"
              />
            </SpecCell>
            <SpecCell title="Disabled" description="Muted copy and a blocked input.">
              <Radio
                disabled
                defaultChecked
                name="radio-disabled"
                label="Enterprise"
                description="Unavailable"
              />
            </SpecCell>
            <SpecCell title="Small" description="Compact visual control with full input semantics.">
              <Radio
                size="sm"
                defaultChecked
                name="radio-small"
                label="Compact"
                description="Dense lists"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="List row usage"
          description="Controls can sit in a trailing slot for preference rows while preserving native input semantics."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell title="Trailing checkbox" description="Use when the row describes a binary setting.">
              <Card>
                <ListRow
                  as="div"
                  title="Device alerts"
                  description="Critical activity on this phone"
                  trailingIcon={null}
                  showDivider={false}
                  trailingSlot={<Checkbox aria-label="Device alerts" size="sm" defaultChecked />}
                />
              </Card>
            </SpecCell>
            <SpecCell title="Trailing radio" description="Use when rows belong to one named choice set.">
              <Card>
                <ListRow
                  as="div"
                  title="Primary account"
                  description="Use for new projects"
                  trailingIcon={null}
                  showDivider={false}
                  trailingSlot={
                    <Radio
                      aria-label="Primary account"
                      size="sm"
                      name="account-choice"
                      defaultChecked
                    />
                  }
                />
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="DeviceFrame preferences"
          description="A compact preferences screen shows checkbox and radio controls inside grouped mobile rows."
        >
          <div className="openui-device-story-layout">
            <PreferencesSample />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
