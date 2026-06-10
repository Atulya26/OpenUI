import type { ComponentPropsWithoutRef } from 'react';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle';
export type SkeletonSize = 'sm' | 'md' | 'lg';

export type SkeletonProps = {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  animated?: boolean;
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Skeleton({
  variant = 'rectangle',
  size = 'md',
  animated = true,
  label,
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={cx(
        'openui-skeleton',
        `openui-skeleton--${variant}`,
        `openui-skeleton--${size}`,
        animated && 'openui-skeleton--animated',
        className,
      )}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  );
}
