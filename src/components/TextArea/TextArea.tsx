import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info } from '../Icon/icons';
import './TextArea.css';

export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaStatus = 'default' | 'success' | 'warning' | 'error';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

type TextAreaStyle = CSSProperties & {
  '--openui-textarea-min-rows'?: number;
  '--openui-textarea-max-rows'?: number;
};

export type TextAreaProps = {
  size?: TextAreaSize;
  status?: TextAreaStatus;
  invalid?: boolean;
  minRows?: number;
  maxRows?: number;
  resize?: TextAreaResize;
  showCount?: boolean;
  countLabel?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

function getTextLength(value: TextAreaProps['value'] | TextAreaProps['defaultValue']): number {
  if (value === undefined || value === null) {
    return 0;
  }

  return Array.isArray(value) ? value.join('').length : String(value).length;
}

function mergeIds(...ids: Array<string | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = 'md',
      status = 'default',
      invalid = false,
      minRows,
      maxRows,
      rows,
      resize = 'none',
      showCount = false,
      countLabel,
      className,
      disabled,
      readOnly,
      value,
      defaultValue,
      maxLength,
      onChange,
      'aria-describedby': ariaDescribedBy,
      style,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const resolvedStatus: TextAreaStatus = invalid ? 'error' : status;
    const resolvedMinRows = minRows ?? rows ?? 4;
    const [uncontrolledCount, setUncontrolledCount] = useState(getTextLength(defaultValue));
    const characterCount = value === undefined ? uncontrolledCount : getTextLength(value);
    const countId = showCount && maxLength !== undefined ? `${generatedId}-count` : undefined;
    const describedBy = mergeIds(ariaDescribedBy, countId);
    const textAreaStyle: TextAreaStyle = {
      ...style,
      '--openui-textarea-min-rows': resolvedMinRows,
      ...(maxRows ? { '--openui-textarea-max-rows': maxRows } : {}),
    };

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      setUncontrolledCount(event.target.value.length);
      onChange?.(event);
    }

    return (
      <div
        className={[
          'openui-textarea',
          `openui-textarea--${size}`,
          `openui-textarea--${resolvedStatus}`,
          `openui-textarea--resize-${resize}`,
          disabled && 'openui-textarea--disabled',
          readOnly && 'openui-textarea--readonly',
          maxRows && 'openui-textarea--with-max-rows',
          showCount && maxLength !== undefined && 'openui-textarea--with-count',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <textarea
          ref={ref}
          className="openui-textarea__control"
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          rows={resolvedMinRows}
          onChange={handleChange}
          aria-invalid={resolvedStatus === 'error' || undefined}
          aria-describedby={describedBy}
          style={textAreaStyle}
          {...rest}
        />

        {showCount && maxLength !== undefined ? (
          <span
            className="openui-textarea__count"
            id={countId}
            aria-label={countLabel ?? `${characterCount} of ${maxLength} characters`}
          >
            {characterCount}/{maxLength}
          </span>
        ) : null}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export type TextAreaFieldProps = {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  warning?: ReactNode;
  optionalText?: ReactNode;
  required?: boolean;
  infoLabel?: string;
  textAreaProps?: TextAreaProps;
};

export function TextAreaField({
  label,
  hint,
  error,
  success,
  warning,
  optionalText,
  required = false,
  infoLabel,
  textAreaProps,
}: TextAreaFieldProps) {
  const generatedId = useId();
  const textAreaId = textAreaProps?.id ?? generatedId;
  const hintId = hint ? `${textAreaId}-hint` : undefined;
  const errorId = error ? `${textAreaId}-error` : undefined;
  const warningId = warning ? `${textAreaId}-warning` : undefined;
  const successId = success ? `${textAreaId}-success` : undefined;
  const resolvedStatus: TextAreaStatus = error
    ? 'error'
    : warning
      ? 'warning'
      : success
        ? 'success'
        : textAreaProps?.status ?? 'default';
  const statusMessageId =
    resolvedStatus === 'error'
      ? errorId
      : resolvedStatus === 'warning'
        ? warningId
        : resolvedStatus === 'success'
          ? successId
          : undefined;
  const describedBy = mergeIds(textAreaProps?.['aria-describedby'], statusMessageId, hintId);

  return (
    <div className="openui-textarea-field">
      <div className="openui-textarea-field__label-row">
        <label className="openui-textarea-field__label" htmlFor={textAreaId}>
          <span>{label}</span>
          {required || textAreaProps?.required ? (
            <span className="openui-textarea-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
          {optionalText ? (
            <span className="openui-textarea-field__optional">{optionalText}</span>
          ) : null}
        </label>
        {infoLabel ? (
          <Icon
            icon={Info}
            size="sm"
            color="soft"
            label={infoLabel}
            className="openui-textarea-field__info"
          />
        ) : null}
      </div>
      <TextArea
        {...textAreaProps}
        id={textAreaId}
        status={resolvedStatus}
        invalid={Boolean(error) || textAreaProps?.invalid}
        aria-describedby={describedBy}
        required={required || textAreaProps?.required}
      />
      {error ? (
        <p className="openui-textarea-field__message openui-textarea-field__message--error" id={errorId}>
          <Icon icon={CircleAlert} size="sm" color="inherit" />
          {error}
        </p>
      ) : warning ? (
        <p className="openui-textarea-field__message openui-textarea-field__message--warning" id={warningId}>
          <Icon icon={CircleAlert} size="sm" color="inherit" />
          {warning}
        </p>
      ) : success ? (
        <p className="openui-textarea-field__message openui-textarea-field__message--success" id={successId}>
          <Icon icon={CircleCheck} size="sm" color="inherit" />
          {success}
        </p>
      ) : hint ? (
        <p className="openui-textarea-field__message" id={hintId}>
          <Icon icon={Info} size="sm" color="inherit" />
          {hint}
        </p>
      ) : null}
    </div>
  );
}
