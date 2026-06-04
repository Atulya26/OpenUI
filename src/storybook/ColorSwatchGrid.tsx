import type { ReactNode } from 'react';
import { contrastTextOn } from '@/storybook/contrast';

export type Swatch = {
  name: string;
  value: string;
  subtitle?: string;
};

export function ColorSwatchGrid({
  swatches,
  checkerboard = false,
  columns = 'auto',
}: {
  swatches: Swatch[];
  checkerboard?: boolean;
  columns?: 'auto' | 'compact' | 'wide';
}) {
  const colClass =
    columns === 'compact'
      ? 'openui-swatch-grid--compact'
      : columns === 'wide'
        ? 'openui-swatch-grid--wide'
        : '';

  return (
    <div className={`openui-swatch-grid ${colClass}`.trim()}>
      {swatches.map((s) => {
        const isHex = s.value.startsWith('#');
        const fg = isHex ? contrastTextOn(s.value) : undefined;
        return (
          <article key={s.name} className="openui-swatch">
            <div
              className={`openui-swatch__chip ${checkerboard ? 'openui-swatch__chip--checker' : ''}`}
              style={{ background: s.value }}
            >
              {isHex && fg ? (
                <span className="openui-swatch__chip-label" style={{ color: fg }}>
                  {s.value}
                </span>
              ) : null}
            </div>
            <div className="openui-swatch__meta">
              <p className="openui-swatch__name">{s.name}</p>
              <p className="openui-swatch__value">{s.value}</p>
              {s.subtitle ? (
                <p className="openui-swatch__subtitle">{s.subtitle}</p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ThemeShell({
  theme,
  label,
  children,
}: {
  theme: 'light' | 'dark';
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="openui-theme-shell" data-theme={theme}>
      {label ? <span className="openui-theme-shell__label">{label}</span> : null}
      <div className="openui-theme-shell__surface">{children}</div>
    </div>
  );
}

export function ThemeCompare({ children }: { children: ReactNode }) {
  return <div className="openui-theme-compare">{children}</div>;
}
