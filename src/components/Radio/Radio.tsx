import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './Radio.css';

export type RadioSize = 'sm' | 'md';

export type RadioProps = {
  invalid?: boolean;
  size?: RadioSize;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'className'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      invalid = false,
      size = 'md',
      label,
      description,
      className,
      disabled,
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;

    return (
      <label
        className={cx(
          'openui-radio',
          `openui-radio--${size}`,
          invalid && 'openui-radio--invalid',
          disabled && 'openui-radio--disabled',
          !label && !description && 'openui-radio--control-only',
          className,
        )}
        htmlFor={inputId}
      >
        <span className="openui-radio__control-wrap">
          <input
            ref={ref}
            id={inputId}
            className="openui-radio__input"
            type="radio"
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={invalid ? true : ariaInvalid}
            {...rest}
          />
          <span className="openui-radio__control" aria-hidden="true" />
        </span>

        {label || description ? (
          <span className="openui-radio__copy">
            {label ? <span className="openui-radio__label">{label}</span> : null}
            {description ? (
              <span className="openui-radio__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
