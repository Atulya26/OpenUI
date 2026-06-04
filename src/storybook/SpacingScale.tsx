import { space, spaceUnit } from '@/tokens/primitives/spacing';

export function SpacingScale() {
  const steps = Object.entries(space)
    .map(([step, px]) => ({ step: Number(step), px }))
    .filter(({ step }) => step > 0)
    .sort((a, b) => a.px - b.px);

  const maxPx = steps[steps.length - 1]?.px ?? 64;

  return (
    <div className="openui-spacing-scale">
      <p className="openui-spacing-scale__meta">
        Base unit: {spaceUnit}px · Use semantic layout tokens in UI, not raw steps
      </p>
      <div className="openui-spacing-scale__list">
        {steps.map(({ step, px }) => (
          <div key={step} className="openui-spacing-scale__row">
            <div className="openui-spacing-scale__label">
              <code>space-{step}</code>
              <span>{px}px</span>
            </div>
            <div className="openui-spacing-scale__bar-track">
              <div
                className="openui-spacing-scale__bar"
                style={{ width: `${(px / maxPx) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
