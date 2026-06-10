import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Card, ListRow, Stack, Text } from '@/components';
import { Home, Image, MapPin, Users } from '@/components/Icon/icons';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { Avatar, Thumbnail, type AvatarSize, type AvatarStatus } from '@/components/Avatar';

const meta = {
  title: 'Components/Avatar',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg'];
const statuses: AvatarStatus[] = ['online', 'offline', 'busy'];

const personImages = {
  maya: 'https://i.pravatar.cc/96?img=47',
  noah: 'https://i.pravatar.cc/96?img=12',
  iris: 'https://i.pravatar.cc/96?img=32',
};

const entityImages = {
  home: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=160&q=80',
  studio: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=160&q=80',
};

function SpecCell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="openui-button-spec-cell">
      <div className="openui-button-spec-cell__example">{children}</div>
      <div className="openui-button-spec-cell__copy">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Components"
      title="Avatar"
      description="Compact people and entity marks for mobile lists, cards, and relationship-heavy surfaces."
    >
      <Panel>
        <Section
          title="Sizes"
          description="Avatar sizes fit dense phone rows and compact cards. Medium aligns to the mobile touch target when the mark itself is the row affordance."
        >
          <Stack direction="horizontal" gap="md" align="center" wrap>
            {sizes.map((size) => (
              <Stack key={size} gap="xs" align="center">
                <Avatar size={size} name="Maya Chen" src={personImages.maya} />
                <Text variant="label" color="sub">
                  {size}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Fallbacks"
          description="Images lead when available. Initials are the calm fallback for people; icon fallback is available for anonymous users and entities."
        >
          <div className="openui-button-spec-grid">
            <SpecCell title="Image" description="Use a real image when identity or recognition matters.">
              <Avatar name="Noah Rivera" src={personImages.noah} />
            </SpecCell>
            <SpecCell title="Initials" description="Derived from the first and last name when no image is present.">
              <Avatar name="Iris Park" />
            </SpecCell>
            <SpecCell title="Icon" description="A tokenized Lucide icon renders through the OpenUI Icon wrapper.">
              <Avatar fallbackIcon={Users} aria-label="Team" />
            </SpecCell>
            <SpecCell title="Broken image" description="If an image fails, the component returns to initials or icon fallback.">
              <Avatar src="/missing-avatar.jpg" name="Alex Morgan" />
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Status"
          description="Presence dots use semantic state colors only. Keep them informational, not decorative."
        >
          <Stack direction="horizontal" gap="md" align="center" wrap>
            {statuses.map((status) => (
              <Stack key={status} gap="xs" align="center">
                <Avatar
                  size="md"
                  name="Maya Chen"
                  src={personImages.maya}
                  status={status}
                />
                <Text variant="label" color="sub">
                  {status}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Thumbnails"
          description="Thumbnail uses the same primitive with a rounded shape and image-first entity fallback."
        >
          <div className="openui-button-spec-grid">
            <SpecCell title="Place" description="Rounded image treatment for compact place and listing cards.">
              <Thumbnail name="Canyon studio" src={entityImages.studio} />
            </SpecCell>
            <SpecCell title="Home" description="A soft entity mark when the image is not the primary content.">
              <Thumbnail name="Guest home" fallbackIcon={Home} />
            </SpecCell>
            <SpecCell title="Rounded person" description="Useful for hosts, teams, and non-profile identity slots.">
              <Avatar shape="rounded" name="Noah Rivera" src={personImages.noah} />
            </SpecCell>
            <SpecCell title="Icon entity" description="Icon fallback stays tokenized and theme-aware.">
              <Thumbnail name="Saved place" fallbackIcon={MapPin} />
            </SpecCell>
            <SpecCell title="RTL status" description="Presence dots use logical positioning and mirror correctly in RTL layouts.">
              <div dir="rtl">
                <Avatar size="md" name="Maya Chen" src={personImages.maya} status="online" />
              </div>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Mobile list"
          description="Small avatars sit comfortably in dense people rows without forcing oversized leading slots."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">
                    Hosts
                  </Text>
                  <Text variant="secondary" color="sub">
                    Recent conversations and reservation contacts.
                  </Text>
                </Stack>

                <Card>
                  <ListRow
                    as="div"
                    leadingSlot={<Avatar size="sm" name="Maya Chen" src={personImages.maya} status="online" />}
                    title="Maya Chen"
                    description="Arrives Friday at 4:00 PM"
                    trailingText="2m"
                    trailingIcon={null}
                  />
                  <ListRow
                    as="div"
                    leadingSlot={<Avatar size="sm" name="Noah Rivera" src={personImages.noah} status="busy" />}
                    title="Noah Rivera"
                    description="Asked about early check-in"
                    trailingText="1h"
                    trailingIcon={null}
                  />
                  <ListRow
                    as="div"
                    leadingSlot={<Avatar size="sm" name="Iris Park" src={personImages.iris} status="offline" />}
                    title="Iris Park"
                    description="Shared the house guide"
                    trailingText="Tue"
                    trailingIcon={null}
                    showDivider={false}
                  />
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Mobile card"
          description="Entity thumbnails add recognition to cards while keeping the card itself quiet and scannable."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="lg">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">
                    Stay
                  </Text>
                  <Text variant="secondary" color="sub">
                    Calm image treatment for saved places and teams.
                  </Text>
                </Stack>

                <Card>
                  <Stack direction="horizontal" gap="sm" align="center">
                    <Thumbnail size="lg" name="Garden home" src={entityImages.home} />
                    <Stack gap="xs">
                      <Text variant="listTitle" truncate>
                        Garden home
                      </Text>
                      <Text variant="secondary" color="sub" truncate>
                        Whole place, near the park
                      </Text>
                    </Stack>
                  </Stack>
                </Card>

                <Card variant="soft">
                  <Stack direction="horizontal" gap="sm" align="center">
                    <Thumbnail size="md" name="Design crew" fallbackIcon={Image} />
                    <Stack gap="xs">
                      <Text variant="listTitle" truncate>
                        Design crew
                      </Text>
                      <Text variant="secondary" color="sub" truncate>
                        Shared board, 5 members
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
