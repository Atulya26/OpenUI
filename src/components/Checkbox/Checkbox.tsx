import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, Minus } from '../Icon/icons';
import { Icon } from '../Icon';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md';

export type CheckboxProps = {
  indeterminate?: boolean;
  invalid?: boolean;
  size?: CheckboxSize;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      indeterminate = false,
      invalid = false,
      size = 'md',
      label,
      description,
      className,
      disabled,
      checked,
      defaultChecked,
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-checked': ariaChecked,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;
    const inputRef = useRef<HTMLInputElement>(null);
    const showCheckedIcon = indeterminate ? false : (checked ?? defaultChecked);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        className={cx(
          'openui-checkbox',
          `openui-checkbox--${size}`,
          indeterminate && 'openui-checkbox--indeterminate',
          invalid && 'openui-checkbox--invalid',
          disabled && 'openui-checkbox--disabled',
          !label && !description && 'openui-checkbox--control-only',
          className,
        )}
        htmlFor={inputId}
      >
        <span className="openui-checkbox__control-wrap">
          <input
            ref={inputRef}
            id={inputId}
            className="openui-checkbox__input"
            type="checkbox"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-describedby={describedBy}
            aria-invalid={invalid ? true : ariaInvalid}
            aria-checked={indeterminate ? 'mixed' : ariaChecked}
            {...rest}
          />
          <span className="openui-checkbox__control" aria-hidden="true">
            <Icon
              icon={indeterminate ? Minus : Check}
              size="sm"
              color="inherit"
              stroke="bold"
              className={cx(
                'openui-checkbox__icon',
                showCheckedIcon && 'openui-checkbox__icon--checked',
              )}
            />
          </span>
        </span>

        {label || description ? (
          <span className="openui-checkbox__copy">
            {label ? <span className="openui-checkbox__label">{label}</span> : null}
            {description ? (
              <span className="openui-checkbox__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
