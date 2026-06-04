import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Screen.css';

export type ScreenProps = {
  children?: ReactNode;
  contentClassName?: string;
} & ComponentPropsWithoutRef<'div'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function Screen({
  children,
  className,
  contentClassName,
  ...rest
}: ScreenProps) {
  return (
    <div className={cx('openui-app-screen', 'openui-screen', className)} {...rest}>
      <main className={cx('openui-app-content', 'openui-screen__content', contentClassName)}>
        {children}
      </main>
    </div>
  );
}
