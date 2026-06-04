import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { LayoutGapInlineToken, LayoutGapStackToken } from '../../tokens';
import './Stack.css';

type StackDirection = 'vertical' | 'horizontal';
type StackAlign = 'start' | 'center' | 'end' | 'stretch';
type StackJustify = 'start' | 'center' | 'end' | 'between';

export type StackProps<T extends ElementType = 'div'> = {
  as?: T;
  children?: ReactNode;
  direction?: StackDirection;
  gap?: LayoutGapStackToken | LayoutGapInlineToken;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Stack<T extends ElementType = 'div'>({
  as,
  children,
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...rest
}: StackProps<T>) {
  const Component = as ?? 'div';
  const gapPrefix = direction === 'vertical' ? 'stack' : 'inline';

  return (
    <Component
      className={cx(
        'openui-stack',
        `openui-stack--${direction}`,
        `openui-stack--gap-${gapPrefix}-${gap}`,
        `openui-stack--align-${align}`,
        `openui-stack--justify-${justify}`,
        wrap && 'openui-stack--wrap',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
