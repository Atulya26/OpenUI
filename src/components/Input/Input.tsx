import {
  forwardRef,
  useState,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Eye, EyeOff, Info, X } from '../Icon/icons';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'warning' | 'error';

export type InputProps = {
  size?: InputSize;
  status?: InputStatus;
  invalid?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  revealable?: boolean;
  revealLabel?: string;
  hideLabel?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

function hasControlledValue(value: InputProps['value']): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  return Array.isArray(value) ? value.length > 0 : String(value).length > 0;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      status = 'default',
      invalid = false,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      clearable = false,
      onClear,
      clearLabel = 'Clear input',
      revealable = false,
      revealLabel = 'Show password',
      hideLabel = 'Hide password',
      className,
      type,
      value,
      disabled,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const [revealed, setRevealed] = useState(false);
    const resolvedStatus: InputStatus = invalid ? 'error' : status;
    const canUseAction = !disabled && !readOnly;
    const showClear = clearable && Boolean(onClear) && canUseAction && hasControlledValue(value);
    const showReveal = revealable && canUseAction;
    const resolvedType = revealable ? (revealed ? 'text' : 'password') : type;
    const hasTrailingContent = Boolean(TrailingIcon) || showClear || showReveal;

    return (
      <div
        className={[
          'openui-input-shell',
          `openui-input-shell--${size}`,
          `openui-input-shell--${resolvedStatus}`,
          LeadingIcon && 'openui-input-shell--with-leading',
          hasTrailingContent && 'openui-input-shell--with-trailing',
          disabled && 'openui-input-shell--disabled',
          readOnly && 'openui-input-shell--readonly',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {LeadingIcon ? (
          <span className="openui-input-shell__icon" aria-hidden="true">
            <Icon icon={LeadingIcon} size="md" color="inherit" />
          </span>
        ) : null}

        <input
          ref={ref}
          className="openui-input"
          type={resolvedType}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
          aria-invalid={resolvedStatus === 'error' || undefined}
        />

        {TrailingIcon ? (
          <span className="openui-input-shell__icon" aria-hidden="true">
            <Icon icon={TrailingIcon} size="md" color="inherit" />
          </span>
        ) : null}

        {showClear ? (
          <button
            className="openui-input-shell__action"
            type="button"
            aria-label={clearLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClear}
          >
            <Icon icon={X} size="md" color="inherit" />
          </button>
        ) : null}

        {showReveal ? (
          <button
            className="openui-input-shell__action"
            type="button"
            aria-label={revealed ? hideLabel : revealLabel}
            aria-pressed={revealed}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setRevealed((current) => !current)}
          >
            <Icon icon={revealed ? EyeOff : Eye} size="md" color="inherit" />
          </button>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export type FieldProps = {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  warning?: ReactNode;
  optionalText?: ReactNode;
  required?: boolean;
  infoLabel?: string;
  inputProps?: InputProps;
};

export function Field({
  label,
  hint,
  error,
  success,
  warning,
  optionalText,
  required = false,
  infoLabel,
  inputProps,
}: FieldProps) {
  const generatedId = useId();
  const inputId = inputProps?.id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const warningId = warning ? `${inputId}-warning` : undefined;
  const successId = success ? `${inputId}-success` : undefined;
  const resolvedStatus: InputStatus = error
    ? 'error'
    : warning
      ? 'warning'
      : success
        ? 'success'
        : inputProps?.status ?? 'default';
  const statusMessageId =
    resolvedStatus === 'error'
      ? errorId
      : resolvedStatus === 'warning'
        ? warningId
        : resolvedStatus === 'success'
          ? successId
          : undefined;
  const describedBy = [statusMessageId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="openui-field">
      <div className="openui-field__label-row">
        <label className="openui-field__label" htmlFor={inputId}>
          <span>{label}</span>
          {required || inputProps?.required ? (
            <span className="openui-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
          {optionalText ? <span className="openui-field__optional">{optionalText}</span> : null}
        </label>
        {infoLabel ? (
          <Icon
            icon={Info}
            size="sm"
            color="soft"
            label={infoLabel}
            className="openui-field__info"
          />
        ) : null}
      </div>
      <Input
        {...inputProps}
        id={inputId}
        status={resolvedStatus}
        invalid={Boolean(error) || inputProps?.invalid}
        aria-describedby={describedBy}
        required={required || inputProps?.required}
      />
      {error ? (
        <p className="openui-field__message openui-field__message--error" id={errorId}>
          <Icon icon={CircleAlert} size="sm" color="inherit" />
          {error}
        </p>
      ) : warning ? (
        <p className="openui-field__message openui-field__message--warning" id={warningId}>
          <Icon icon={CircleAlert} size="sm" color="inherit" />
          {warning}
        </p>
      ) : success ? (
        <p className="openui-field__message openui-field__message--success" id={successId}>
          <Icon icon={CircleCheck} size="sm" color="inherit" />
          {success}
        </p>
      ) : hint ? (
        <p className="openui-field__message" id={hintId}>
          <Icon icon={Info} size="sm" color="inherit" />
          {hint}
        </p>
      ) : null}
    </div>
  );
}
