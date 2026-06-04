import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './Input.css';

export type InputProps = {
  invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, ...rest }, ref) => (
    <input
      ref={ref}
      className={['openui-input', invalid && 'openui-input--invalid', className]
        .filter(Boolean)
        .join(' ')}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  ),
);

Input.displayName = 'Input';

export type FieldProps = {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  inputProps?: InputProps;
};

export function Field({ label, hint, error, inputProps }: FieldProps) {
  const generatedId = useId();
  const inputId = inputProps?.id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="openui-field">
      <label className="openui-field__label" htmlFor={inputId}>
        {label}
      </label>
      <Input
        {...inputProps}
        id={inputId}
        invalid={Boolean(error) || inputProps?.invalid}
        aria-describedby={describedBy}
      />
      {error ? (
        <p className="openui-field__message openui-field__message--error" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="openui-field__message" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
