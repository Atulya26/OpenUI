import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  iphoneContentHeight,
  iphoneDynamicIsland,
  iphoneProTarget,
  iphoneSafeArea,
  iphoneStatusBarHeight,
} from '@/tokens/device/iphone';
import { DeviceFrame } from '@/storybook/DeviceFrame';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Layout/Device',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default device canvas story — Storybook id: `foundational-layout-device--target` */
export const Target: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout · Device"
      title="iPhone Pro canvas"
      description={`All mobile UI is designed for ${iphoneProTarget.screenWidth}×${iphoneProTarget.screenHeight} logical points (iPhone 16 / 17 Pro class). Use the device frame in Storybook; use CSS safe-area variables in code.`}
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame showSafeArea>
            <div className="openui-device-preview-content">
              <p className="openui-device-preview-content__title">Safe content</p>
              <p className="openui-device-preview-content__body">
                Starts below the top inset. Horizontal padding uses{' '}
                <code>--layout-inset-screen-x</code>.
              </p>
            </div>
          </DeviceFrame>
        </div>
      </Panel>
      <Panel>
        <Section title="Specifications">
          <DataTable
            headers={['Property', 'Value', 'Notes']}
            rows={[
              ['Screen', `${iphoneProTarget.screenWidth}×${iphoneProTarget.screenHeight} pt`, '@3x native'],
              ['Safe area top', `${iphoneSafeArea.top}px`, 'Dynamic Island + status'],
              ['Safe area bottom', `${iphoneSafeArea.bottom}px`, 'Home indicator'],
              ['Status bar', `${iphoneStatusBarHeight}px`, 'Within top inset'],
              [
                'Dynamic Island',
                `${iphoneDynamicIsland.width}×${iphoneDynamicIsland.height}px`,
                'Approx. pill; centered',
              ],
              ['Content height', `${iphoneContentHeight}px`, 'Screen − safe areas'],
              [
                'Horizontal inset',
                'var(--layout-inset-screen-x)',
                '16px inside safe area',
              ],
            ]}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};

export const FrameOnly: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout · Device"
      title="Hardware frame"
      description="Use DeviceFrame to preview screens. Toggle safe-area guides in stories when checking nav bars and full-bleed headers."
    >
      <Panel>
        <div className="openui-device-story-layout">
          <DeviceFrame scale={0.75}>
            <div className="openui-device-preview-placeholder">
              Your screen here
            </div>
          </DeviceFrame>
        </div>
      </Panel>
    </DocPage>
  ),
};
