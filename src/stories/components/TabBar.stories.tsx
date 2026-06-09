import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import {
  Bell,
  Calendar,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  User,
} from '@/components/Icon/icons';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { TabBar, type TabBarItem } from '@/components/TabBar';

const basicItems: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'search', label: 'Search', icon: Search },
  { value: 'trips', label: 'Trips', icon: Calendar },
  { value: 'profile', label: 'Profile', icon: User },
];

const badgeItems: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'saved', label: 'Saved', icon: Heart, badge: 3 },
  { value: 'inbox', label: 'Inbox', icon: MessageCircle, badge: 12 },
  { value: 'alerts', label: 'Alerts', icon: Bell, badge: 'New' },
];

const disabledItems: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'map', label: 'Map', icon: MapPin },
  { value: 'saved', label: 'Saved', icon: Heart, disabled: true },
  { value: 'profile', label: 'Profile', icon: User },
];

const threeItems: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'trips', label: 'Trips', icon: Calendar },
  { value: 'profile', label: 'Profile', icon: User },
];

const fiveItems: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'search', label: 'Search', icon: Search },
  { value: 'map', label: 'Map', icon: MapPin },
  { value: 'alerts', label: 'Alerts', icon: Bell },
  { value: 'settings', label: 'Settings', icon: Settings },
];

const meta = {
  title: 'Components/TabBar',
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
    <div className="openui-tab-bar-story-cell">
      <div className="openui-tab-bar-story-cell__example">{children}</div>
      <div className="openui-tab-bar-story-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function ControlledTabBar({
  items,
  initialValue,
  label,
}: {
  items: TabBarItem[];
  initialValue: string;
  label: string;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <TabBar
      items={items}
      value={value}
      onValueChange={setValue}
      label={label}
    />
  );
}

function PhoneExample() {
  const [value, setValue] = useState('home');

  return (
    <div className="openui-tab-bar-story-phone">
      <div className="openui-tab-bar-story-header">
        <h2 className="openui-tab-bar-story-section-title">Explore</h2>
        <p className="openui-tab-bar-story-copy">
          Weekend stays, saved routes, and messages stay clear of the device
          chrome.
        </p>
      </div>

      <div className="openui-tab-bar-story-map">
        <span className="openui-tab-bar-story-card-title">
          North shore loop
        </span>
        <p className="openui-tab-bar-story-card-copy">
          Map area leaves the bottom navigation reachable without covering the
          home indicator.
        </p>
      </div>

      <div className="openui-tab-bar-story-list">
        <div className="openui-tab-bar-story-card">
          <span className="openui-tab-bar-story-card-title">
            Saved cabin route
          </span>
          <p className="openui-tab-bar-story-card-copy">
            Two stays nearby, flexible check-in, lake access.
          </p>
        </div>
        <div className="openui-tab-bar-story-card">
          <span className="openui-tab-bar-story-card-title">Inbox</span>
          <p className="openui-tab-bar-story-card-copy">
            One host reply and one trip reminder.
          </p>
        </div>
      </div>

      <div className="openui-tab-bar-story-device-bar">
        <TabBar
          items={badgeItems}
          value={value}
          onValueChange={setValue}
          label="Primary app sections"
        />
      </div>
    </div>
  );
}

export const Basic: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TabBar"
      description="A mobile bottom navigation control for switching between top-level app sections. Static is the default so examples fit cleanly inside phone frames."
    >
      <Panel>
        <Section
          title="Basic"
          description="Selected state uses a compact primary pill so the active destination reads immediately without enlarging the bar."
        >
          <div className="openui-tab-bar-story-grid">
            <SpecCell
              title="Uncontrolled"
              description="Use defaultValue for local tab state managed by the component."
            >
              <TabBar
                items={basicItems}
                defaultValue="search"
                label="Main sections"
              />
            </SpecCell>
            <SpecCell
              title="Controlled"
              description="Use value and onValueChange when the app owns the active section."
            >
              <ControlledTabBar
                items={basicItems}
                initialValue="home"
                label="Main sections"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const Badges: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TabBar badges"
      description="Badges sit on the icon area and stay compact enough for four and five item layouts."
    >
      <Panel>
        <Section
          title="Badges"
          description="Use short counts or a concise status word. Badge color is reserved for attention, not decoration."
        >
          <div className="openui-tab-bar-story-grid">
            <SpecCell
              title="Counts and text"
              description="Small badges keep labels readable and preserve the tab hit area."
            >
              <TabBar
                items={badgeItems}
                defaultValue="inbox"
                label="Main sections with updates"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Disabled tab"
      description="Disabled tabs are muted and removed from roving keyboard selection."
    >
      <Panel>
        <Section
          title="Disabled item"
          description="Unavailable destinations stay visible when their placement helps orientation."
        >
          <div className="openui-tab-bar-story-grid">
            <SpecCell
              title="Saved disabled"
              description="The disabled item cannot be selected by tap, click, or arrow navigation."
            >
              <TabBar
                items={disabledItems}
                defaultValue="map"
                label="Main sections"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const ItemCounts: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TabBar item counts"
      description="The bar supports three, four, and five top-level destinations on the phone content lane."
    >
      <Panel>
        <Section
          title="3, 4, and 5 items"
          description="Prefer short labels. Five items are supported, but labels should stay compact."
        >
          <div className="openui-tab-bar-story-grid">
            <SpecCell
              title="Three items"
              description="Use for focused apps with a small set of top-level areas."
            >
              <TabBar
                items={threeItems}
                defaultValue="trips"
                label="Three main sections"
              />
            </SpecCell>
            <SpecCell
              title="Four items"
              description="Default density for common app navigation."
            >
              <TabBar
                items={basicItems}
                defaultValue="home"
                label="Four main sections"
              />
            </SpecCell>
            <SpecCell
              title="Five items"
              description="Use concise names so every label remains scannable."
            >
              <TabBar
                items={fiveItems}
                defaultValue="map"
                label="Five main sections"
              />
            </SpecCell>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const DeviceFrameAppExample: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="TabBar in DeviceFrame"
      description="The DeviceFrame supplies safe areas and chrome. The static TabBar is anchored inside the content viewport without adding a second bottom inset."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <PhoneExample />
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};

export const FixedPosition: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Fixed TabBar"
      description="Use position fixed in an app shell when the bar should stay above the real device bottom safe area."
    >
      <Panel>
        <Section
          title="Fixed option"
          description="This preview uses a static container so it does not pin to the Storybook viewport."
        >
          <div className="openui-tab-bar-story-fixed-preview">
            <p className="openui-tab-bar-story-copy">
              In product screens, position fixed anchors the bar above
              safe-area-inset-bottom. Storybook phone examples use static to
              avoid extra bottom spacing.
            </p>
            <TabBar
              items={basicItems}
              defaultValue="profile"
              position="fixed"
              label="Fixed main sections preview"
            />
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
