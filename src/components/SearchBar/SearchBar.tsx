import {
  forwardRef,
  useRef,
  useState,
  type ChangeEvent,
  type ForwardedRef,
  type InputHTMLAttributes,
} from 'react';
import { Icon } from '../Icon';
import { Search, X } from '../Icon/icons';
import './SearchBar.css';

export type SearchBarSize = 'sm' | 'md';
export type SearchBarStatus = 'default' | 'error';

export type SearchBarProps = {
  size?: SearchBarSize;
  status?: SearchBarStatus;
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  cancelAction?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function toSearchValue(value: SearchBarProps['value'] | SearchBarProps['defaultValue']): string {
  if (value === undefined || value === null) {
    return '';
  }

  return Array.isArray(value) ? value.join(' ') : String(value);
}

function assignInputRef(ref: ForwardedRef<HTMLInputElement>, node: HTMLInputElement | null) {
  if (typeof ref === 'function') {
    ref(node);
    return;
  }

  if (ref) {
    ref.current = node;
  }
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      size = 'md',
      status = 'default',
      clearable = true,
      onClear,
      clearLabel = 'Clear search',
      cancelAction = false,
      cancelLabel = 'Cancel',
      onCancel,
      className,
      value,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      placeholder = 'Search',
      autoComplete = 'off',
      enterKeyHint = 'search',
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined && value !== null;
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      toSearchValue(defaultValue),
    );
    const searchValue = isControlled ? toSearchValue(value) : uncontrolledValue;
    const canEdit = !disabled && !readOnly;
    const showClear = clearable && canEdit && searchValue.length > 0;
    const showCancel = cancelAction || Boolean(onCancel);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }

      onChange?.(event);
    };

    const handleClear = () => {
      if (!canEdit) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue('');
      }

      onClear?.();
      inputRef.current?.focus();
    };

    return (
      <div
        className={cx(
          'openui-search-bar',
          `openui-search-bar--${size}`,
          `openui-search-bar--${status}`,
          disabled && 'openui-search-bar--disabled',
          readOnly && 'openui-search-bar--readonly',
          showCancel && 'openui-search-bar--with-cancel',
          className,
        )}
      >
        <div className="openui-search-bar__field">
          <span className="openui-search-bar__leading" aria-hidden="true">
            <Icon icon={Search} size="md" color="inherit" />
          </span>
          <input
            ref={(node) => {
              inputRef.current = node;
              assignInputRef(ref, node);
            }}
            className="openui-search-bar__input"
            type="search"
            role="searchbox"
            value={searchValue}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            autoComplete={autoComplete}
            enterKeyHint={enterKeyHint}
            aria-invalid={status === 'error' || undefined}
            {...rest}
          />
          {showClear ? (
            <button
              className="openui-search-bar__clear"
              type="button"
              aria-label={clearLabel}
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
            >
              <Icon icon={X} size="sm" color="inherit" />
            </button>
          ) : null}
        </div>
        {showCancel ? (
          <button
            className="openui-search-bar__cancel"
            type="button"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        ) : null}
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';
