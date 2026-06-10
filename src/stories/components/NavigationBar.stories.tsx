import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Card, IconButton, Stack, Text } from '@/components';
import {
  ArrowLeft,
  Bell,
  Heart,
  MoreHorizontal,
  Search,
  Share2,
  X,
} from '@/components/Icon/icons';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { NavigationBar } from '@/components/NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
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
    <div className="openui-navigation-bar-story-cell">
      <div className="openui-navigation-bar-story-cell__example">
        {children}
      </div>
      <div className="openui-navigation-bar-story-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function ActivityRows() {
  return (
    <div className="openui-navigation-bar-story-list">
      <div className="openui-navigation-bar-story-row">
        <span>Today</span>
        <small>3 updates</small>
      </div>
      <div className="openui-navigation-bar-story-row">
        <span>Saved places</span>
        <small>12</small>
      </div>
      <div className="openui-navigation-bar-story-row">
        <span>Upcoming</span>
        <small>Jun 18</small>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="NavigationBar"
      description="A mobile app header for screen titles and lightweight actions. It sits inside the safe content region and leaves device chrome to the app shell or DeviceFrame."
    >
      <Panel>
        <Section
          title="Common headers"
          description="Compact headers center the title between reserved action zones. Large headers keep the title start-aligned below optional chrome actions."
        >
          <div className="openui-navigation-bar-story-grid">
            <SpecCell
              title="Basic title"
              description="Use for simple screens with no local actions."
            >
              <NavigationBar title="Trips" />
            </SpecCell>

            <SpecCell
              title="Back action"
              description="Icon shortcuts render through IconButton and preserve the minimum mobile hit area."
            >
              <NavigationBar
                title="Details"
                leadingIcon={ArrowLeft}
                leadingLabel="Go back"
              />
            </SpecCell>

            <SpecCell
              title="Trailing actions"
              description="Use one or two trailing actions for search, share, alerts, or overflow."
            >
              <NavigationBar
                title="Messages"
                trailingIcons={[
                  { icon: Search, label: 'Search messages' },
                  { icon: MoreHorizontal, label: 'More options' },
                ]}
              />
            </SpecCell>

            <SpecCell
              title="Scrolled under"
              description="Use the glass surface when content scrolls beneath the bar."
            >
              <NavigationBar
                title="Trips"
                trailingIcons={[{ icon: Search, label: 'Search trips' }]}
                scrolledUnder
              />
            </SpecCell>

            <SpecCell
              title="Action slots"
              description="Slots let product code provide composed controls when icons alone are not enough."
            >
              <NavigationBar
                title="Favorites"
                leadingAction={
                  <IconButton icon={X} label="Close favorites" size="sm" />
                }
                trailingActions={
                  <IconButton
                    icon={Heart}
                    label="Saved"
                    size="sm"
                    variant="primary"
                    selected
                  />
                }
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Sizes and surfaces"
          description="Default uses the screen canvas surface with a soft divider. Transparent removes the divider for media-led screens."
        >
          <div className="openui-navigation-bar-story-grid">
            <SpecCell
              title="Large title"
              description="Use once per top-level screen or when the title is the primary page anchor."
            >
              <NavigationBar
                title="Explore"
                subtitle="Homes, rooms, and stays near you"
                size="large"
                trailingIcons={[{ icon: Bell, label: 'Notifications' }]}
              />
            </SpecCell>

            <SpecCell
              title="Transparent over content"
              description="Use when imagery or a soft hero area should carry the top of the screen."
            >
              <NavigationBar
                title="Lakehouse"
                leadingIcon={ArrowLeft}
                leadingLabel="Go back"
                trailingIcons={[{ icon: Share2, label: 'Share listing' }]}
                variant="transparent"
              />
              <div className="openui-navigation-bar-story-media">
                <span className="openui-navigation-bar-story-card-title">
                  Quiet weekend stay
                </span>
                <p className="openui-navigation-bar-story-card-copy">
                  Transparent header, content remains inside the app lane.
                </p>
              </div>
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const InDeviceFrame: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="DeviceFrame examples"
      description="The frame supplies safe-area padding and iPhone chrome. NavigationBar starts inside that content viewport."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <div className="openui-navigation-bar-story-phone">
              <NavigationBar
                title="Explore"
                subtitle="Curated stays for the week"
                size="large"
                scrolledUnder
                trailingIcons={[
                  { icon: Search, label: 'Search stays' },
                  { icon: Bell, label: 'Notifications' },
                ]}
              />

              <Card>
                <Stack gap="xs">
                  <Text as="h2" variant="cardTitle">
                    Golden hour cabins
                  </Text>
                  <Text variant="secondary" color="sub">
                    Saved filters, recent searches, and upcoming trips stay below
                    the navigation area.
                  </Text>
                </Stack>
              </Card>

              <ActivityRows />
            </div>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};

export const TransparentOverContent: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Transparent header on phone"
      description="Transparent headers are useful for media-led detail screens. The component still does not recreate status bars, islands, or home indicators."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame>
            <div className="openui-navigation-bar-story-phone">
              <NavigationBar
                title="The Rowan"
                leadingIcon={ArrowLeft}
                leadingLabel="Go back"
                trailingIcons={[
                  { icon: Heart, label: 'Save listing' },
                  { icon: Share2, label: 'Share listing' },
                ]}
                variant="transparent"
              />

              <div className="openui-navigation-bar-story-media">
                <span className="openui-navigation-bar-story-card-title">
                  Compact retreat
                </span>
                <p className="openui-navigation-bar-story-card-copy">
                  Two nights - lake view - flexible check-in
                </p>
              </div>

              <div className="openui-navigation-bar-story-panel">
                <Text as="h2" variant="cardTitle">
                  Stay details
                </Text>
                <Text variant="secondary" color="sub">
                  A lightweight navigation layer keeps actions reachable without
                  adding another surface.
                </Text>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
