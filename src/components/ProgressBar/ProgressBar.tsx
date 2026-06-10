import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import './ProgressBar.css';

export type ProgressBarTone = 'primary' | 'success' | 'warning' | 'error';
export type ProgressBarSize = 'sm' | 'md';

export type ProgressBarProps = {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  tone?: ProgressBarTone;
  size?: ProgressBarSize;
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function clampProgress(value: number, max: number): number {
  if (max <= 0) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
}

export function ProgressBar({
  value = 0,
  max = 100,
  indeterminate = false,
  tone = 'primary',
  size = 'md',
  label,
  className,
  style,
  ...rest
}: ProgressBarProps) {
  const resolvedValue = clampProgress(value, max);
  const percent = indeterminate ? 0 : (resolvedValue / max) * 100;
  const progressStyle = {
    ...style,
    '--progress-bar-value': `${percent}%`,
  } as CSSProperties;

  return (
    <div
      className={cx(
        'openui-progress-bar',
        `openui-progress-bar--${tone}`,
        `openui-progress-bar--${size}`,
        indeterminate && 'openui-progress-bar--indeterminate',
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : resolvedValue}
      style={progressStyle}
      {...rest}
    >
      <span className="openui-progress-bar__track">
        <span className="openui-progress-bar__indicator" />
      </span>
    </div>
  );
}
