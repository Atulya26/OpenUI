import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import type { PressableHaptic } from '../Pressable';
import { Spinner } from '../Spinner';
import './Button.css';

type ButtonVariant = 'default' | 'primary' | 'destructive';
type DeprecatedButtonVariant = 'secondary' | 'ghost';
type ButtonAppearance = 'fill' | 'outline' | 'transparent';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = {
  variant?: ButtonVariant | DeprecatedButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  fullWidth?: boolean;
  selected?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  loading?: boolean;
  haptic?: PressableHaptic;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      appearance,
      size = 'md',
      fullWidth = false,
      selected,
      leadingIcon,
      trailingIcon,
      loading = false,
      haptic,
      disabled,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const resolvedVariant =
      variant === 'secondary' || variant === 'ghost' ? 'default' : variant;
    const resolvedAppearance =
      appearance ?? (variant === 'secondary' ? 'outline' : variant === 'ghost' ? 'transparent' : 'fill');
    const iconSize = size === 'sm' ? 'sm' : 'md';

    return (
      <Pressable
        as="button"
        ref={ref}
        type={type}
        className={cx(
          'openui-button',
          `openui-button--${resolvedVariant}`,
          `openui-button--${resolvedAppearance}`,
          `openui-button--${size}`,
          fullWidth && 'openui-button--full-width',
          selected && 'openui-button--selected',
          loading && 'openui-button--loading',
          className,
        )}
        feedback="scale"
        hitArea={size === 'sm' || size === 'md' ? 'compact' : 'none'}
        stateLayer="none"
        haptic={haptic}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-pressed={selected !== undefined ? selected : undefined}
        {...rest}
      >
        {loading ? (
          <Spinner
            size={iconSize}
            color="inherit"
            className="openui-button__spinner"
          />
        ) : leadingIcon ? (
          <Icon icon={leadingIcon} size={iconSize} color="inherit" />
        ) : null}
        {children ? <span className="openui-button__label">{children}</span> : null}
        {!loading && trailingIcon ? (
          <Icon icon={trailingIcon} size={iconSize} color="inherit" />
        ) : null}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';
