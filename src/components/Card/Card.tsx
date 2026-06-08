import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './Card.css';

export type CardVariant = 'surface' | 'soft' | 'outline' | 'plain' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'surface' | 'large';

export type CardProps<T extends ElementType = 'section'> = {
  as?: T;
  children?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  interactive?: boolean;
  selected?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export type CardSlotProps<T extends ElementType = 'div'> = {
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Card<T extends ElementType = 'section'>({
  as,
  children,
  variant = 'surface',
  padding = 'md',
  radius = 'surface',
  interactive = false,
  selected = false,
  className,
  ...rest
}: CardProps<T>) {
  const Component = as ?? 'section';

  return (
    <Component
      className={cx(
        'openui-card',
        `openui-card--${variant}`,
        `openui-card--padding-${padding}`,
        `openui-card--radius-${radius}`,
        interactive && 'openui-card--interactive',
        selected && 'openui-card--selected',
        className,
      )}
      data-selected={selected || undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function CardHeader<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...rest
}: CardSlotProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={cx('openui-card__header', className)} {...rest}>
      {children}
    </Component>
  );
}

export function CardBody<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...rest
}: CardSlotProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={cx('openui-card__body', className)} {...rest}>
      {children}
    </Component>
  );
}

export function CardFooter<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...rest
}: CardSlotProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={cx('openui-card__footer', className)} {...rest}>
      {children}
    </Component>
  );
}
