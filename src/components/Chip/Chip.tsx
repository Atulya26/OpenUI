import {
  forwardRef,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { X } from '../Icon/icons';
import './Chip.css';

export type ChipSize = 'sm' | 'md';

export type ChipProps = {
  children?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  leadingIcon?: LucideIcon;
  size?: ChipSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      children,
      selected,
      disabled,
      removable = false,
      onRemove,
      leadingIcon,
      size = 'md',
      className,
      type = 'button',
      onClickCapture,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const canRemove = removable && Boolean(onRemove) && !disabled;
    const iconSize = 'sm';

    function handleClickCapture(event: MouseEvent<HTMLButtonElement>) {
      onClickCapture?.(event);

      if (event.defaultPrevented || !canRemove) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Element &&
        target.closest('[data-openui-chip-remove]')
      ) {
        event.preventDefault();
        event.stopPropagation();
        onRemove?.();
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);

      if (
        event.defaultPrevented ||
        !canRemove ||
        (event.key !== 'Backspace' && event.key !== 'Delete')
      ) {
        return;
      }

      event.preventDefault();
      onRemove?.();
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          'openui-chip',
          `openui-chip--${size}`,
          selected && 'openui-chip--selected',
          removable && 'openui-chip--removable',
          className,
        )}
        disabled={disabled}
        aria-pressed={selected !== undefined ? selected : undefined}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {leadingIcon ? <Icon icon={leadingIcon} size={iconSize} color="inherit" /> : null}
        <span className="openui-chip__label">{children}</span>
        {removable ? (
          <span
            className="openui-chip__remove"
            data-openui-chip-remove
            aria-hidden="true"
          >
            <Icon icon={X} size="sm" color="inherit" />
          </span>
        ) : null}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
