import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, ListRow, Stack, Text } from '@/components';
import {
  Calendar,
  Clock,
  Home,
  MapPin,
  Search,
  Settings,
  Star,
  Users,
} from '@/components/Icon/icons';
import { SegmentedControl } from '@/components/SegmentedControl';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/SegmentedControl',
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

const stayItems = [
  { value: 'stays', label: 'Stays', icon: Home },
  { value: 'experiences', label: 'Experiences', icon: Star },
  { value: 'places', label: 'Places', icon: MapPin },
];

function ControlledSample() {
  const [value, setValue] = useState('week');

  return (
    <Stack gap="sm">
      <SegmentedControl
        label="Booking window"
        value={value}
        onValueChange={setValue}
        items={[
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
      <Text variant="secondary" color="sub">
        Selected: {value}
      </Text>
    </Stack>
  );
}

function TripsSample() {
  const [tripType, setTripType] = useState('stays');

  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Explore
          </Text>
          <Text variant="secondary" color="sub">
            Find a quiet place for the weekend.
          </Text>
        </Stack>

        <SegmentedControl
          label="Explore category"
          value={tripType}
          onValueChange={setTripType}
          items={stayItems}
        />

        <Card>
          <ListRow
            as="div"
            leadingIcon={Search}
            title={
              tripType === 'stays'
                ? 'Lake cabin'
                : tripType === 'places'
                  ? 'Design district'
                  : 'Chef table'
            }
            description="Curated for a two-day trip"
          />
          <ListRow
            as="div"
            leadingIcon={Calendar}
            title="Available Friday"
            description="Flexible check-in"
            showDivider={false}
          />
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

function ActivitySample() {
  const [range, setRange] = useState('week');

  return (
    <DeviceFrame>
      <Stack gap="lg">
        <Stack gap="xs">
          <Text as="h1" variant="screenTitle">
            Activity
          </Text>
          <Text variant="secondary" color="sub">
            Review changes across your spaces.
          </Text>
        </Stack>

        <SegmentedControl
          label="Activity range"
          size="sm"
          value={range}
          onValueChange={setRange}
          items={[
            { value: 'day', label: 'Day', icon: Clock },
            { value: 'week', label: 'Week', icon: Calendar },
            { value: 'team', label: 'Team', icon: Users },
          ]}
        />

        <Card>
          <ListRow
            as="div"
            leadingIcon={Users}
            title={range === 'team' ? 'Team updates' : 'Workspace visits'}
            description={range === 'day' ? '12 today' : '48 this week'}
          />
          <ListRow
            as="div"
            leadingIcon={Settings}
            title="Automation"
            description="Two rules adjusted"
            showDivider={false}
          />
        </Card>
      </Stack>
    </DeviceFrame>
  );
}

function SlidingThumbSample() {
  const [mode, setMode] = useState('recommended');

  return (
    <Stack gap="sm">
      <SegmentedControl
        label="Stay result mode"
        fullWidth={false}
        value={mode}
        onValueChange={setMode}
        items={[
          { value: 'nearby', label: 'Nearby' },
          { value: 'recommended', label: 'Recommended' },
          { value: 'saved', label: 'Saved' },
        ]}
      />
      <Text variant="secondary" color="sub">
        The selected surface is one measured thumb that slides under uneven
        labels.
      </Text>
    </Stack>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="SegmentedControl"
      description="A compact mobile selection control for mutually exclusive views, modes, and filters."
    >
      <Panel>
        <Section
          title="Catalog"
          description="Use full-width by default in the iPhone content lane. The selected segment uses a filled state; icons render through the OpenUI Icon wrapper."
        >
          <div className="openui-list-row-spec-grid">
            <SpecCell
              title="Default"
              description="Controlled or uncontrolled values share the same visual language."
            >
              <SegmentedControl
                label="Travel category"
                defaultValue="stays"
                items={stayItems}
              />
            </SpecCell>
            <SpecCell
              title="Small"
              description="Dense mode for compact headers and list filters."
            >
              <SegmentedControl
                label="Compact booking window"
                size="sm"
                defaultValue="week"
                items={[
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'Week' },
                  { value: 'month', label: 'Month' },
                ]}
              />
            </SpecCell>
            <SpecCell
              title="Inline width"
              description="Set fullWidth to false for short toolbar groups."
            >
              <SegmentedControl
                label="Map density"
                fullWidth={false}
                defaultValue="list"
                items={[
                  { value: 'map', label: 'Map' },
                  { value: 'list', label: 'List' },
                ]}
              />
            </SpecCell>
            <SpecCell
              title="Disabled item"
              description="Disabled choices stay muted and are skipped by arrow keys."
            >
              <SegmentedControl
                label="Invite visibility"
                defaultValue="team"
                items={[
                  { value: 'me', label: 'Me' },
                  { value: 'team', label: 'Team' },
                  { value: 'public', label: 'Public', disabled: true },
                ]}
              />
            </SpecCell>
            <SpecCell
              title="Controlled"
              description="Use value and onValueChange when state lives above the component."
            >
              <ControlledSample />
            </SpecCell>
            <SpecCell
              title="Sliding thumb"
              description="One shared indicator moves under the selected item instead of painting each item independently."
            >
              <SlidingThumbSample />
            </SpecCell>
            <SpecCell
              title="Native aria-label"
              description="Callers can provide the accessible group name through aria-label."
            >
              <SegmentedControl
                aria-label="Calendar view"
                defaultValue="month"
                items={[
                  { value: 'day', label: 'Day' },
                  { value: 'week', label: 'Week' },
                  { value: 'month', label: 'Month' },
                ]}
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const DeviceExamples: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Device examples"
      description="Segmented controls sit below screen titles or inside compact filter regions without entering the safe areas."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <TripsSample />
          <ActivitySample />
        </div>
      </Panel>
    </DocPage>
  ),
};
