import type { Meta, StoryObj } from '@storybook/react-vite';
import { space, spaceUnit } from '@/tokens/primitives/spacing';
import { DocPage, Panel } from '@/storybook/DocPage';
import { SpacingScale } from '@/storybook/SpacingScale';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Layout/Primitives',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScaleStory: Story = {
  name: 'Spacing scale',
  render: () => (
    <DocPage
      eyebrow="Foundational · Layout"
      title="Spacing primitives"
      description={`${spaceUnit}px base grid. Primitive steps are building blocks — product UI must use semantic layout tokens from the next page.`}
    >
      <Panel>
        <SpacingScale />
      </Panel>
      <Panel>
        <DataTable
          headers={['Step', 'CSS variable', 'Value', 'Multiple']}
          rows={Object.entries(space).map(([step, px]) => [
            `space-${step}`,
            `--space-${step}`,
            `${px}px`,
            px === 0 ? '—' : `×${px / spaceUnit}`,
          ])}
        />
      </Panel>
    </DocPage>
  ),
};
