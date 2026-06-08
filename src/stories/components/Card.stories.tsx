import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import {
  Bell,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Check,
  ChevronRight,
  CreditCard,
  Icon,
  IconButton,
  Separator,
  Stack,
  Text,
  User,
} from '@/components';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Components/Card',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
    <div className="openui-card-spec-cell">
      <div className="openui-card-spec-cell__example">{children}</div>
      <div className="openui-card-spec-cell__copy">
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
      title="Card"
      description="Flexible mobile surfaces for grouping related content. Card variants control hierarchy; padding and radius control layout fit."
    >
      <Panel>
        <Section
          title="Surface hierarchy"
          description="Use the quietest card that still separates the content. Default surface is the standard resting card."
        >
          <div className="openui-card-spec-grid">
            <SpecCell title="Surface" description="Default app content card with resting shadow and soft stroke.">
              <Card>
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Payment method</Text>
                  <Text variant="tertiary" color="sub">Primary card for today.</Text>
                </CardHeader>
                <CardBody>
                  <Text variant="paragraph">Visa ending 2048</Text>
                </CardBody>
              </Card>
            </SpecCell>

            <SpecCell title="Soft" description="Subtle grouped content where elevation should stay flat and quiet.">
              <Card variant="soft">
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Notifications</Text>
                  <Text variant="tertiary" color="sub">Grouped settings surface.</Text>
                </CardHeader>
                <CardBody>
                  <Text variant="paragraph">Push, email, and reminders</Text>
                </CardBody>
              </Card>
            </SpecCell>

            <SpecCell title="Outline" description="Low-emphasis container for previews, filters, or secondary blocks.">
              <Card variant="outline">
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Invite preview</Text>
                  <Text variant="tertiary" color="sub">Visible boundary without a raised surface.</Text>
                </CardHeader>
                <CardBody>
                  <Text variant="paragraph">Ready to send</Text>
                </CardBody>
              </Card>
            </SpecCell>

            <SpecCell title="Elevated" description="Higher hierarchy card for one important module above siblings.">
              <Card variant="elevated">
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Upgrade available</Text>
                  <Text variant="tertiary" color="sub">Use sparingly inside phone screens.</Text>
                </CardHeader>
                <CardFooter>
                  <Button size="sm">Review</Button>
                </CardFooter>
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Structure"
          description="CardHeader, CardBody, and CardFooter define a reusable anatomy without prescribing business content."
        >
          <div className="openui-card-spec-grid">
            <SpecCell title="Header + body" description="Good for settings, summaries, and short forms.">
              <Card>
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Profile quality</Text>
                  <Text variant="tertiary" color="sub">Three actions can improve your profile.</Text>
                </CardHeader>
                <CardBody>
                  <Separator />
                  <Stack gap="xs">
                    <Text variant="paragraph">Add a photo</Text>
                    <Text variant="tertiary" color="sub">Profiles with photos get more trust.</Text>
                  </Stack>
                </CardBody>
              </Card>
            </SpecCell>

            <SpecCell title="Footer actions" description="Keep action rows compact and aligned to the trailing edge.">
              <Card>
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Storage limit</Text>
                  <Text variant="tertiary" color="sub">You are close to the included plan limit.</Text>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" appearance="transparent">Later</Button>
                  <Button size="sm">Manage</Button>
                </CardFooter>
              </Card>
            </SpecCell>

            <SpecCell title="Single CTA" description="One text action in a card footer expands to the card content width.">
              <Card>
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Identity check</Text>
                  <Text variant="tertiary" color="sub">Finish setup before sending transfers.</Text>
                </CardHeader>
                <CardFooter>
                  <Button size="sm">Continue setup</Button>
                </CardFooter>
              </Card>
            </SpecCell>

            <SpecCell title="No padding" description="For media or list compositions that manage their own inner spacing.">
              <Card padding="none">
                <div className="openui-card-demo-media" />
                <div className="openui-card-demo-inset">
                  <Text as="h3" variant="cardTitle">Trip summary</Text>
                  <Text variant="tertiary" color="sub">Image edge follows the card radius.</Text>
                </div>
              </Card>
            </SpecCell>

            <SpecCell title="Large radius" description="Use for hero-like surfaces and larger mobile modules.">
              <Card radius="large" padding="lg">
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Weekend plan</Text>
                  <Text variant="tertiary" color="sub">A more generous module treatment.</Text>
                </CardHeader>
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Interactive and selected"
          description="Interactive cards can be links or buttons. Selected is a real state and should be paired with aria-pressed or aria-selected where the host element needs it."
        >
          <div className="openui-card-spec-grid">
            <SpecCell title="Pressable card" description="Use only when the whole surface performs one action.">
              <Card as="button" type="button" interactive className="openui-card-demo-button">
                <CardHeader>
                  <Text as="span" variant="cardTitle">Open account</Text>
                  <Text as="span" variant="tertiary" color="sub">Tap anywhere on the card.</Text>
                </CardHeader>
                <Icon icon={ChevronRight} size="md" color="sub" />
              </Card>
            </SpecCell>

            <SpecCell title="Selected" description="Selected surface uses primary tint plus a clear primary stroke.">
              <Card
                as="button"
                type="button"
                interactive
                selected
                aria-pressed="true"
                className="openui-card-demo-button"
              >
                <CardHeader>
                  <Text as="span" variant="cardTitle">Personal plan</Text>
                  <Text as="span" variant="tertiary" color="sub">Currently selected.</Text>
                </CardHeader>
                <Icon icon={Check} size="md" color="primary" />
              </Card>
            </SpecCell>

            <SpecCell title="Inline action" description="Keep the card static when only a child control is interactive.">
              <Card>
                <CardHeader>
                  <Text as="h3" variant="cardTitle">Reminders</Text>
                  <Text variant="tertiary" color="sub">One action lives inside the surface.</Text>
                </CardHeader>
                <CardFooter>
                  <IconButton icon={Bell} label="Manage reminders" />
                </CardFooter>
              </Card>
            </SpecCell>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Mobile canvas"
          description="Cards sit inside the 370px content lane. Use full-width within app content, not the unsafe device edge."
        >
          <div className="openui-device-story-layout">
            <DeviceFrame>
              <Stack gap="md">
                <Stack gap="xs">
                  <Text as="h1" variant="screenTitle">Wallet</Text>
                  <Text variant="secondary" color="sub">A compact card stack using OpenUI surfaces.</Text>
                </Stack>

                <Card variant="elevated" radius="large">
                  <CardHeader>
                    <Text as="h2" variant="cardTitle">Available balance</Text>
                    <Text variant="tertiary" color="sub">Updated just now</Text>
                  </CardHeader>
                  <CardBody>
                    <Text styleName="title1">$2,480.00</Text>
                  </CardBody>
                  <CardFooter>
                    <Button size="sm" leadingIcon={CreditCard}>Add money</Button>
                  </CardFooter>
                </Card>

                <Card variant="soft">
                  <CardHeader>
                    <Text as="h2" variant="cardTitle">Recommended</Text>
                    <Text variant="tertiary" color="sub">Finish identity setup to unlock transfers.</Text>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" appearance="outline" leadingIcon={User}>Continue</Button>
                  </CardFooter>
                </Card>

                <Card variant="outline">
                  <CardHeader>
                    <Text as="h2" variant="cardTitle">Monthly limit</Text>
                    <Text variant="tertiary" color="sub">$4,120 remaining this month.</Text>
                  </CardHeader>
                </Card>
              </Stack>
            </DeviceFrame>
          </div>
        </Section>
      </Panel>
    </DocPage>
  ),
};
