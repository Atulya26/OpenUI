import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type AnimationEvent,
  type ButtonHTMLAttributes,
  type ChangeEventHandler,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { Check, ChevronDown } from '../Icon/icons';
import { usePresence } from '../Presence';
import './Select.css';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectStatus = 'default' | 'success' | 'warning' | 'error';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
  status?: SelectStatus;
  invalid?: boolean;
  leadingIcon?: LucideIcon;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /**
   * Compatibility escape hatch for previous native-select callers.
   * Prefer onValueChange for new usage.
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  readOnly?: boolean;
  name?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'children'
  | 'defaultValue'
  | 'disabled'
  | 'name'
  | 'onChange'
  | 'required'
  | 'size'
  | 'value'
>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      size = 'md',
      status = 'default',
      invalid = false,
      leadingIcon: LeadingIcon,
      value,
      defaultValue,
      onValueChange,
      onChange,
      disabled,
      readOnly,
      name,
      required,
      className,
      id,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const listboxId = `${selectId}-listbox`;
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
    const resolvedStatus: SelectStatus = invalid ? 'error' : status;
    const resolvedDisabled = Boolean(disabled);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : uncontrolledValue;
    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue],
    );
    const isPlaceholderSelected = !selectedOption;
    const canOpen = !resolvedDisabled && !readOnly;
    const listboxPresence = usePresence({ open });
    const listboxState = listboxPresence.state;

    useEffect(() => {
      if (!open) {
        return undefined;
      }

      function handlePointerDown(event: PointerEvent) {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      }

      document.addEventListener('pointerdown', handlePointerDown);

      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [open]);

    function emitCompatibilityChange(nextValue: string) {
      onChange?.({
        target: { value: nextValue },
        currentTarget: { value: nextValue },
      } as unknown as Parameters<ChangeEventHandler<HTMLSelectElement>>[0]);
    }

    function commitValue(nextValue: string) {
      const nextOption = options.find((option) => option.value === nextValue);

      if (!nextOption || nextOption.disabled || readOnly || resolvedDisabled) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
      emitCompatibilityChange(nextValue);
      setOpen(false);
    }

    function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented || !canOpen) {
        return;
      }

      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    function handleOptionKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
      optionValue: string,
    ) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        commitValue(optionValue);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    function handleListboxAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || listboxState !== 'closing') {
        return;
      }

      listboxPresence.onExitComplete();
    }

    return (
      <div
        ref={rootRef}
        className={cx(
          'openui-select',
          `openui-select--${size}`,
          `openui-select--${resolvedStatus}`,
          LeadingIcon && 'openui-select--with-leading',
          isPlaceholderSelected && 'openui-select--placeholder',
          resolvedDisabled && 'openui-select--disabled',
          readOnly && 'openui-select--readonly',
          open && 'openui-select--open',
          listboxState === 'closing' && listboxPresence.isPresent && 'openui-select--closing',
          className,
        )}
      >
        {label ? (
          <label className="openui-select__label" htmlFor={selectId}>
            {label}
          </label>
        ) : null}

        <button
          ref={ref}
          id={selectId}
          className="openui-select__shell"
          type="button"
          disabled={resolvedDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxPresence.isPresent ? listboxId : undefined}
          aria-invalid={resolvedStatus === 'error' ? true : ariaInvalid}
          aria-readonly={readOnly || undefined}
          aria-describedby={ariaDescribedBy}
          onClick={() => {
            if (canOpen) {
              setOpen((current) => !current);
            }
          }}
          onBlur={onBlur}
          onKeyDown={handleTriggerKeyDown}
          {...rest}
        >
          {LeadingIcon ? (
            <span className="openui-select__icon" aria-hidden="true">
              <Icon icon={LeadingIcon} size="md" color="inherit" />
            </span>
          ) : null}

          <span className="openui-select__value">
            {selectedOption?.label ?? placeholder ?? 'Select option'}
          </span>

          <span className="openui-select__chevron" aria-hidden="true">
            <Icon icon={ChevronDown} size="md" color="inherit" />
          </span>
        </button>

        {name ? (
          <input
            type="hidden"
            name={name}
            value={selectedValue ?? ''}
            required={required}
          />
        ) : null}

        {listboxPresence.isPresent && canOpen ? (
          <div
            className="openui-select__popover"
            id={listboxId}
            role="listbox"
            aria-labelledby={selectId}
            data-state={listboxState}
            onAnimationEnd={handleListboxAnimationEnd}
          >
            {options.map((option) => {
              const selected = option.value === selectedValue;

              return (
                <button
                  key={option.value}
                  className={cx(
                    'openui-select__option',
                    selected && 'openui-select__option--selected',
                  )}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={option.disabled}
                  onClick={() => commitValue(option.value)}
                  onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
                >
                  <span className="openui-select__option-label">
                    {option.label}
                  </span>
                  {selected ? (
                    <Icon icon={Check} size="sm" color="inherit" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
