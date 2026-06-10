import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { TextStyleName, TypographyRole } from '../../tokens';
import './Text.css';

type TextColor =
  | 'strong'
  | 'sub'
  | 'soft'
  | 'disabled'
  | 'white'
  | 'primary'
  | 'error'
  | 'success'
  | 'warning';

type TextAlign = 'start' | 'center' | 'end';

export type TextProps<T extends ElementType = 'p'> = {
  as?: T;
  children?: ReactNode;
  variant?: TypographyRole;
  styleName?: TextStyleName;
  color?: TextColor;
  align?: TextAlign;
  emphasized?: boolean;
  trim?: boolean;
  truncate?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'color'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Text<T extends ElementType = 'p'>({
  as,
  children,
  variant = 'paragraph',
  styleName,
  color = 'strong',
  align = 'start',
  emphasized = false,
  trim = false,
  truncate = false,
  className,
  ...rest
}: TextProps<T>) {
  const Component = as ?? 'p';
  const typeClass = styleName
    ? `openui-text--style-${styleName}`
    : `openui-text--role-${variant}`;

  return (
    <Component
      className={cx(
        'openui-text',
        typeClass,
        `openui-text--color-${color}`,
        `openui-text--align-${align}`,
        emphasized && 'openui-text--emphasized',
        trim && 'openui-text--trim',
        truncate && 'openui-text--truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
