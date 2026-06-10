import type { ComponentPropsWithoutRef } from 'react';
import { Icon } from '../Icon';
import { Loader2 } from '../Icon/icons';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'inherit' | 'strong' | 'sub' | 'primary' | 'white' | 'error';

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const iconSizeBySpinnerSize: Record<SpinnerSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export function Spinner({
  size = 'md',
  color = 'primary',
  label,
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      className={cx(
        'openui-spinner',
        `openui-spinner--${size}`,
        `openui-spinner--${color}`,
        className,
      )}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <Icon
        icon={Loader2}
        size={iconSizeBySpinnerSize[size]}
        color="inherit"
        className="openui-spinner__icon"
      />
    </span>
  );
}
