import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Screen.css';

export type ScreenDensity = 'comfortable' | 'compact';

export type ScreenProps = {
  children?: ReactNode;
  contentClassName?: string;
  /**
   * Control density. `compact` sets `data-density="compact"`, tightening the
   * shared control-size scale for small screens. Defaults to `comfortable`.
   */
  density?: ScreenDensity;
} & ComponentPropsWithoutRef<'div'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Screen({
  children,
  className,
  contentClassName,
  density,
  ...rest
}: ScreenProps) {
  return (
    <div
      className={cx('openui-app-screen', 'openui-screen', className)}
      data-density={density === 'compact' ? 'compact' : undefined}
      {...rest}
    >
      <main className={cx('openui-app-content', 'openui-screen__content', contentClassName)}>
        {children}
      </main>
    </div>
  );
}
