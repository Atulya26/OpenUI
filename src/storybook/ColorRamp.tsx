import type { Swatch } from '@/storybook/ColorSwatchGrid';
import { contrastTextOn } from '@/storybook/contrast';

export function ColorRamp({
  name,
  description,
  swatches,
}: {
  name: string;
  description?: string;
  swatches: Swatch[];
}) {
  return (
    <div className="openui-ramp">
      <div className="openui-ramp__header">
        <div>
          <h3 className="openui-ramp__name">{name}</h3>
          {description ? (
            <p className="openui-ramp__desc">{description}</p>
          ) : null}
        </div>
        <span className="openui-doc-badge openui-doc-badge--muted">
          {swatches.length} steps
        </span>
      </div>
      <div className="openui-ramp__strip" role="list">
        {swatches.map((s) => {
          const fg = contrastTextOn(s.value.startsWith('#') ? s.value : '#888');
          return (
            <div
              key={s.name}
              className="openui-ramp__cell"
              style={{ background: s.value }}
              role="listitem"
            >
              <span className="openui-ramp__step" style={{ color: fg }}>
                {s.name.replace(/^.*\[(\d+)\]$/, '$1').replace(/.* (\d+)$/, '$1') ||
                  s.name.split(' ').pop()}
              </span>
              <span className="openui-ramp__hex" style={{ color: fg, opacity: 0.85 }}>
                {s.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
