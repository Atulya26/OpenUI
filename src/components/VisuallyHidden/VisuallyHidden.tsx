import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import './VisuallyHidden.css';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...rest }, ref) => (
    <span ref={ref} className={cx('openui-visually-hidden', className)} {...rest} />
  ),
);

VisuallyHidden.displayName = 'VisuallyHidden';
