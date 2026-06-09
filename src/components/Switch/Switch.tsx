import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from 'react';
import './Switch.css';

export type SwitchSize = 'sm' | 'md';

type SwitchAccessibleName =
  | {
      label: string;
      'aria-label'?: string;
      'aria-labelledby'?: string;
    }
  | {
      label?: never;
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      label?: never;
      'aria-label'?: string;
      'aria-labelledby': string;
    };

export type SwitchProps = SwitchAccessibleName & {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'aria-checked'
  | 'aria-label'
  | 'aria-labelledby'
  | 'children'
  | 'className'
  | 'role'
>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      disabled = false,
      size = 'md',
      label,
      className,
      type = 'button',
      onClick,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : uncontrolledChecked;
    const accessibleLabel = ariaLabel ?? label;

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      onClick?.(event);

      if (!event.defaultPrevented && !isControlled) {
        setUncontrolledChecked((current) => !current);
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={isChecked}
        aria-label={accessibleLabel}
        aria-labelledby={ariaLabelledBy}
        className={cx(
          'openui-switch',
          `openui-switch--${size}`,
          isChecked && 'openui-switch--checked',
          className,
        )}
        disabled={disabled}
        data-state={isChecked ? 'checked' : 'unchecked'}
        onClick={handleClick}
        {...rest}
      >
        <span className="openui-switch__track" aria-hidden="true">
          <span className="openui-switch__thumb" />
        </span>
      </button>
    );
  },
);

Switch.displayName = 'Switch';
