import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './Card.css';

type CardVariant = 'surface' | 'soft' | 'outline';

export type CardProps<T extends ElementType = 'section'> = {
  as?: T;
  children?: ReactNode;
  variant?: CardVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Card<T extends ElementType = 'section'>({
  as,
  children,
  variant = 'surface',
  className,
  ...rest
}: CardProps<T>) {
  const Component = as ?? 'section';

  return (
    <Component
      className={cx('openui-card', `openui-card--${variant}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
