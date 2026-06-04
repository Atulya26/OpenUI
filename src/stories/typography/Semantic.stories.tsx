import type { Meta, StoryObj } from '@storybook/react-vite';
import { textStyles, typographyRoles } from '@/tokens';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Typography/Semantic',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStyles: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="HIG text styles"
      description="Semantic names mapped to primitive size, weight, and family."
    >
      <Panel>
        <DataTable
          headers={['Style', 'Size', 'Weight', 'Family']}
          rows={Object.entries(textStyles).map(([name, ref]) => [
            name,
            `${ref.size}px`,
            ref.weight,
            ref.family,
          ])}
        />
      </Panel>
    </DocPage>
  ),
};

export const ProductRoles: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational · Typography"
      title="Product roles"
      description="Use these aliases in components — they resolve to HIG text styles."
    >
      <Panel>
        <Section title="Role mapping" meta={`${Object.keys(typographyRoles).length} roles`}>
          <DataTable
            headers={['Role', 'Text style']}
            rows={Object.entries(typographyRoles).map(([role, style]) => [
              role,
              style,
            ])}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};
