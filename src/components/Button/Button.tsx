import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader2 } from '../Icon/icons';
import { Icon } from '../Icon';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  loading?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      loading = false,
      disabled,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          'openui-button',
          `openui-button--${variant}`,
          `openui-button--${size}`,
          loading && 'openui-button--loading',
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <Icon
            icon={Loader2}
            size="md"
            color="inherit"
            className="openui-button__spinner"
          />
        ) : leadingIcon ? (
          <Icon icon={leadingIcon} size="md" color="inherit" />
        ) : null}
        {children ? <span className="openui-button__label">{children}</span> : null}
        {!loading && trailingIcon ? (
          <Icon icon={trailingIcon} size="md" color="inherit" />
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
