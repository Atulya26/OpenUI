import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  motionDurationPrimitive,
  motionDurationSemantic,
  motionEasingPrimitive,
  motionEasingSemantic,
  motionTransitionSemantic,
} from '@/tokens';
import { DocPage, Panel, Section } from '@/storybook/DocPage';
import {
  MotionChip,
  MotionCurveDot,
  MotionDurationBar,
  MotionPhoneSequence,
} from '@/storybook/MotionSpecimen';
import { DataTable } from '@/storybook/tableStyles';

const meta = {
  title: 'Foundational/Motion',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OpenUI motion tokens for mobile feedback, continuity, entrance, exit, and reduced-motion behavior.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

const durationEntries = Object.entries(motionDurationPrimitive);
const easingEntries = Object.entries(motionEasingPrimitive);

export const Overview: Story = {
  render: () => (
    <DocPage
      eyebrow="Foundational"
      title="Motion"
      description="A compact motion foundation for AI-generated mobile UI: quick feedback, smooth continuity, asymmetric enter/exit behavior, and reduced-motion support."
    >
      <Panel>
        <Section
          title="Motion feel"
          description="The default feel should be calm, responsive, and fluid. Small controls react immediately; content settles smoothly; expressive motion is reserved for rare emphasis."
        >
          <div className="openui-motion-showcase">
            <MotionPhoneSequence />
            <div className="openui-motion-showcase__copy">
              <MotionChip label="Feedback" value="90ms · standard">
                <MotionCurveDot cssVar="--motion-ease-feedback" />
              </MotionChip>
              <MotionChip label="Enter" value="220ms · settle">
                <MotionCurveDot cssVar="--motion-ease-enter" />
              </MotionChip>
              <MotionChip label="Layout" value="320ms · smooth">
                <MotionCurveDot cssVar="--motion-ease-layout" />
              </MotionChip>
            </div>
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Duration scale"
          description="Short, mobile-first durations. Frequent interactions stay fast; layout and expressive moments get a little more room."
          meta={`${durationEntries.length} tokens`}
        >
          <div className="openui-motion-duration-list">
            {durationEntries.map(([name, ms]) => (
              <MotionDurationBar
                key={name}
                label={name}
                value={`${ms}ms`}
                cssVar={`--motion-duration-${name}`}
              />
            ))}
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section
          title="Easing curves"
          description="Semantic curves make motion feel responsive without requiring every component to invent a curve."
          meta={`${easingEntries.length} tokens`}
        >
          <div className="openui-motion-chip-grid">
            {easingEntries.map(([name, value]) => (
              <MotionChip
                key={name}
                label={name}
                value={value}
              >
                <MotionCurveDot cssVar={`--motion-ease-${kebab(name)}`} />
              </MotionChip>
            ))}
          </div>
        </Section>
      </Panel>

      <Panel>
        <Section title="Semantic roles">
          <DataTable
            headers={['Role', 'Duration', 'Easing']}
            rows={Object.keys(motionDurationSemantic).map((role) => [
              role,
              `--motion-duration-${role}`,
              role in motionEasingSemantic ? `--motion-ease-${role}` : 'n/a',
            ])}
          />
        </Section>
      </Panel>

      <Panel>
        <Section title="Transition contracts">
          <DataTable
            headers={['Contract', 'CSS variable', 'Properties']}
            rows={Object.entries(motionTransitionSemantic).map(([role, properties]) => [
              role,
              `--motion-transition-${role}`,
              properties.join(', '),
            ])}
          />
        </Section>
      </Panel>
    </DocPage>
  ),
};
