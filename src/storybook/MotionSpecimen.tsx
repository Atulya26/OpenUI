import type { CSSProperties, ReactNode } from 'react';

type MotionChipProps = {
  label: string;
  value: string;
  children?: ReactNode;
};

export function MotionChip({ label, value, children }: MotionChipProps) {
  return (
    <div className="openui-motion-chip">
      <div>
        <p className="openui-motion-chip__label">{label}</p>
        <p className="openui-motion-chip__value">{value}</p>
      </div>
      {children ? <div className="openui-motion-chip__demo">{children}</div> : null}
    </div>
  );
}

export function MotionDurationBar({
  label,
  value,
  cssVar,
}: {
  label: string;
  value: string;
  cssVar: string;
}) {
  return (
    <div className="openui-motion-duration">
      <div className="openui-motion-duration__meta">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="openui-motion-duration__track">
        <span
          className="openui-motion-duration__bar"
          style={{ '--openui-motion-demo-duration': `var(${cssVar})` } as CSSProperties}
        />
      </div>
    </div>
  );
}

export function MotionCurveDot({ cssVar }: { cssVar: string }) {
  return (
    <span
      className="openui-motion-curve-dot"
      style={{ '--openui-motion-demo-ease': `var(${cssVar})` } as CSSProperties}
    />
  );
}

export function MotionPhoneSequence() {
  return (
    <div className="openui-motion-phone">
      <div className="openui-motion-phone__sheet">
        <div className="openui-motion-phone__hero" />
        <div className="openui-motion-phone__line openui-motion-phone__line--strong" />
        <div className="openui-motion-phone__line" />
        <div className="openui-motion-phone__row">
          <span />
          <span />
        </div>
        <div className="openui-motion-phone__row openui-motion-phone__row--delay">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
