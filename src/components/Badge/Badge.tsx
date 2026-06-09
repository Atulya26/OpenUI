import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import './Badge.css';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeVariant = 'soft' | 'outline' | 'solid';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  children?: ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  leadingIcon?: LucideIcon;
  className?: string;
} & ComponentPropsWithoutRef<'span'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  leadingIcon,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(
        'openui-badge',
        `openui-badge--${tone}`,
        `openui-badge--${variant}`,
        `openui-badge--${size}`,
        className,
      )}
      {...rest}
    >
      {leadingIcon ? <Icon icon={leadingIcon} size="sm" color="inherit" /> : null}
      <span className="openui-badge__label">{children}</span>
    </span>
  );
}
