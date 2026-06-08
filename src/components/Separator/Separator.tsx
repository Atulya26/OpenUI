import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Separator.css';

export type SeparatorVariant = 'line' | 'block' | 'text';
export type SeparatorSize = 'sm' | 'md' | 'lg';
export type SeparatorTone = 'soft' | 'subtle' | 'strong';

export type SeparatorProps = {
  children?: ReactNode;
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  tone?: SeparatorTone;
  bleed?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Separator({
  children,
  variant = children ? 'text' : 'line',
  size = 'md',
  tone = 'soft',
  bleed = false,
  className,
  ...rest
}: SeparatorProps) {
  const decorative = !children && !rest['aria-label'];

  return (
    <div
      className={cx(
        'openui-separator',
        `openui-separator--${variant}`,
        `openui-separator--${size}`,
        `openui-separator--${tone}`,
        bleed && 'openui-separator--bleed',
        className,
      )}
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      {variant === 'text' ? <span className="openui-separator__label">{children}</span> : null}
    </div>
  );
}

export const Divider = Separator;
