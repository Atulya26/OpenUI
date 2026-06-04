import type { Meta, StoryObj } from '@storybook/react-vite';
import { space } from '@/tokens/primitives/spacing';
import {
  layoutFixed,
  layoutGapInline,
  layoutGapSection,
  layoutGapStack,
  layoutInset,
} from '@/tokens/semantic/layout';
import { layoutTokens } from '@/tokens/layout';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Layout/Semantic',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function refRow(
  role: string,
  cssVar: string,
  step: number,
  resolved: string,
) {
  return [role, cssVar, `space-${step} (${space[step as keyof typeof space]}px)`, resolved];
}

export const Tokens: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Semantic layout tokens"
      description="Named roles map to primitive steps. Components and screens reference these — never hard-coded px for spacing."
    >
      <Panel>
        <Section title="Insets" meta={`${Object.keys(layoutInset).length}`}>
          <DataTable
            headers={['Role', 'CSS variable', 'Primitive', 'Resolved']}
            rows={[
              refRow(
                'screenX',
                '--layout-inset-screen-x',
                layoutInset.screenX,
                layoutTokens.inset.screenX,
              ),
              refRow(
                'screenY',
                '--layout-inset-screen-y',
                layoutInset.screenY,
                layoutTokens.inset.screenY,
              ),
              refRow(
                'container',
                '--layout-inset-container',
                layoutInset.container,
                layoutTokens.inset.container,
              ),
              refRow(
                'screenXCompact',
                '--layout-inset-screen-x-compact',
                layoutInset.screenXCompact,
                layoutTokens.inset.screenXCompact,
              ),
            ]}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Inline gaps" meta={`${Object.keys(layoutGapInline).length}`}>
          <DataTable
            headers={['Role', 'CSS variable', 'Primitive', 'Resolved']}
            rows={(
              Object.entries(layoutGapInline) as [
                keyof typeof layoutGapInline,
                (typeof layoutGapInline)[keyof typeof layoutGapInline],
              ][]
            ).map(([key, step]) =>
              refRow(
                key,
                `--layout-gap-inline-${key}`,
                step,
                layoutTokens.gapInline[key],
              ),
            )}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Stack gaps" meta={`${Object.keys(layoutGapStack).length}`}>
          <DataTable
            headers={['Role', 'CSS variable', 'Primitive', 'Resolved']}
            rows={(
              Object.entries(layoutGapStack) as [
                keyof typeof layoutGapStack,
                (typeof layoutGapStack)[keyof typeof layoutGapStack],
              ][]
            ).map(([key, step]) =>
              refRow(
                key,
                `--layout-gap-stack-${key}`,
                step,
                layoutTokens.gapStack[key],
              ),
            )}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Section gaps">
          <DataTable
            headers={['Role', 'CSS variable', 'Primitive', 'Resolved']}
            rows={[
              refRow(
                'default',
                '--layout-gap-section',
                layoutGapSection.default,
                layoutTokens.gapSection.default,
              ),
              refRow(
                'loose',
                '--layout-gap-section-loose',
                layoutGapSection.loose,
                layoutTokens.gapSection.loose,
              ),
            ]}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Fixed guardrails (not on scale)">
          <DataTable
            headers={['Token', 'CSS variable', 'Value', 'Source']}
            rows={[
              [
                'touchTargetMin',
                '--layout-touch-target-min',
                layoutTokens.fixed.touchTargetMin,
                'Apple HIG',
              ],
              [
                'breakpointTablet',
                '--layout-breakpoint-tablet',
                layoutTokens.fixed.breakpointTablet,
                'Size class',
              ],
              [
                'maxContentWidth',
                '--layout-max-content-width',
                layoutTokens.fixed.maxContentWidth,
                'Readable width',
              ],
              [
                'columnsExpanded',
                '—',
                String(layoutFixed.columnsExpanded),
                'Tablet grid',
              ],
            ]}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};
