import {
  forwardRef,
  type ButtonHTMLAttributes,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import type { PressableHaptic } from '../Pressable';
import './IconButton.css';

type IconButtonVariant = 'default' | 'primary' | 'destructive';
type IconButtonAppearance = 'fill' | 'outline' | 'transparent';
type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonA11y =
  | { label: string; 'aria-label'?: never }
  | { label?: never; 'aria-label': string };

export type IconButtonProps = {
  icon: LucideIcon;
  variant?: IconButtonVariant;
  appearance?: IconButtonAppearance;
  size?: IconButtonSize;
  selected?: boolean;
  haptic?: PressableHaptic;
} & IconButtonA11y &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      variant = 'default',
      appearance = 'transparent',
      size = 'md',
      selected,
      haptic,
      disabled,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => (
    <Pressable
      as="button"
      ref={ref}
      type={type}
      className={cx(
        'openui-icon-button',
        `openui-icon-button--${variant}`,
        `openui-icon-button--${appearance}`,
        `openui-icon-button--${size}`,
        selected && 'openui-icon-button--selected',
        className,
      )}
      feedback="scale"
      hitArea={size === 'sm' || size === 'md' ? 'compact' : 'none'}
      stateLayer="none"
      haptic={haptic}
      disabled={disabled}
      aria-label={label ?? ariaLabel}
      aria-pressed={selected !== undefined ? selected : undefined}
      {...rest}
    >
      <Icon
        icon={icon}
        size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
        color="inherit"
      />
    </Pressable>
  ),
);

IconButton.displayName = 'IconButton';
