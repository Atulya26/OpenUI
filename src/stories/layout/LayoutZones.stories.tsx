import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  iphoneContentWidth,
  iphoneFigmaReference,
  iphoneLayoutMargin,
  iphoneProTarget,
  iphoneSafeArea,
} from '@/tokens/device/iphone';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';

const meta = {
  title: 'Foundational/Layout/Layout zones',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SafeAreaAndMargins: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Safe area & layout margins"
      description={`iOS 26 model from Apple’s UI kit (Figma node 754:62878). Safe area: top ${iphoneSafeArea.top}px, bottom ${iphoneSafeArea.bottom}px. Layout margins: ${iphoneLayoutMargin.horizontal}px horizontal → ${iphoneContentWidth}px content width.`}
    >
      <Panel>
        <Section title="Three layers">
          <ol className="openui-rules-ol">
            <li>
              <strong>Safe area</strong> — system chrome (Dynamic Island, home
              indicator). No interactive UI.
            </li>
            <li>
              <strong>Layout margins</strong> —{' '}
              <code>--layout-margin-horizontal</code> ({iphoneLayoutMargin.horizontal}
              px) inside safe area.
            </li>
            <li>
              <strong>Content</strong> — components, type, stack gaps (
              <code>--layout-gap-*</code>).
            </li>
          </ol>
        </Section>
      </Panel>
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <div className="openui-zone-demo">
              <p className="openui-zone-demo__title">Content zone</p>
              <p className="openui-zone-demo__meta">
                {iphoneContentWidth}px wide ({iphoneProTarget.screenWidth} −{' '}
                {iphoneLayoutMargin.horizontal * 2}px margins)
              </p>
            </div>
          </DeviceFrame>
        </div>
      </Panel>
      <Panel>
        <Section title="Figma source">
          <p className="openui-figma-ref">
            Sync specs from{' '}
            <a href={iphoneFigmaReference.url} target="_blank" rel="noreferrer">
              iOS & iPadOS 26 — layout node
            </a>
            . See <code>docs/FIGMA-IOS26-REFERENCE.md</code> and{' '}
            <code>src/tokens/data/ios-layout-figma.json</code>.
          </p>
        </Section>
      </Panel>
    </DocPage>
  ),
};
