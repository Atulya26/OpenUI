import {
  forwardRef,
  useEffect,
  type CSSProperties,
  type HTMLAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import './SegmentedControl.css';

export type SegmentedControlSize = 'sm' | 'md';

export type SegmentedControlItem = {
  value: string;
  label: ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
};

type SegmentedControlA11y =
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

export type SegmentedControlProps = SegmentedControlA11y & {
  items: SegmentedControlItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
  fullWidth?: boolean;
  className?: string;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'onChange'
  | 'role'
  | 'value'
>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function getInitialValue(items: SegmentedControlItem[], defaultValue?: string) {
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  return items.find((item) => !item.disabled)?.value ?? items[0]?.value ?? '';
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      size = 'md',
      fullWidth = true,
      label,
      className,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      getInitialValue(items, defaultValue),
    );
    const [indicatorStyle, setIndicatorStyle] = useState({
      x: 0,
      width: 0,
      visible: false,
    });
    const [pressedValue, setPressedValue] = useState<string | null>(null);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : uncontrolledValue;
    const accessibleLabel = ariaLabel ?? label;
    const selectedItem = items.find((item) => item.value === selectedValue);
    const selectedItemDisabled = selectedItem?.disabled === true;
    const pressingSelected = pressedValue === selectedValue;

    const enabledItems = useMemo(
      () => items.filter((item) => !item.disabled),
      [items],
    );
    const activeItem = items.find(
      (item) => item.value === selectedValue && !item.disabled,
    );
    const focusValue = activeItem?.value ?? enabledItems[0]?.value;

    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

    useEffect(() => {
      const root = rootRef.current;

      if (!root || !selectedValue) {
        setIndicatorStyle((current) => ({ ...current, visible: false }));
        return undefined;
      }

      function updateIndicator() {
        const selectedItem = root?.querySelector<HTMLButtonElement>(
          `[data-openui-segmented-control-item="${CSS.escape(selectedValue)}"]`,
        );

        if (!root || !selectedItem || selectedItem.disabled) {
          setIndicatorStyle((current) => ({ ...current, visible: false }));
          return;
        }

        setIndicatorStyle({
          x: selectedItem.offsetLeft,
          width: selectedItem.offsetWidth,
          visible: true,
        });
      }

      updateIndicator();

      const resizeObserver = new ResizeObserver(updateIndicator);
      resizeObserver.observe(root);

      for (const item of root.querySelectorAll<HTMLElement>(
        '.openui-segmented-control__item',
      )) {
        resizeObserver.observe(item);
      }

      return () => resizeObserver.disconnect();
    }, [items, selectedValue]);

    function selectItem(nextValue: string) {
      if (nextValue === selectedValue) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    function focusItem(nextValue: string) {
      requestAnimationFrame(() => {
        const root = rootRef.current;

        if (!root) {
          return;
        }

        root
          .querySelector<HTMLButtonElement>(
            `[data-openui-segmented-control-item="${CSS.escape(nextValue)}"]`,
          )
          ?.focus();
      });
    }

    function moveSelection(direction: 'next' | 'previous' | 'first' | 'last') {
      if (enabledItems.length === 0) {
        return;
      }

      const currentIndex = Math.max(
        enabledItems.findIndex((item) => item.value === selectedValue),
        0,
      );
      const lastIndex = enabledItems.length - 1;
      const nextIndex =
        direction === 'first'
          ? 0
          : direction === 'last'
            ? lastIndex
            : direction === 'next'
              ? currentIndex === lastIndex
                ? 0
                : currentIndex + 1
              : currentIndex === 0
                ? lastIndex
                : currentIndex - 1;
      const nextValue = enabledItems[nextIndex]?.value;

      if (nextValue) {
        selectItem(nextValue);
        focusItem(nextValue);
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        moveSelection('next');
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        moveSelection('previous');
      } else if (event.key === 'Home') {
        event.preventDefault();
        moveSelection('first');
      } else if (event.key === 'End') {
        event.preventDefault();
        moveSelection('last');
      }
    }

    return (
      <div
        ref={rootRef}
        className={cx(
          'openui-segmented-control',
          `openui-segmented-control--${size}`,
          fullWidth && 'openui-segmented-control--full-width',
          className,
        )}
        role="radiogroup"
        aria-label={accessibleLabel}
        aria-labelledby={ariaLabelledBy}
        data-selected-disabled={selectedItemDisabled || undefined}
        data-pressing-selected={pressingSelected || undefined}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span
          className="openui-segmented-control__indicator"
          data-visible={indicatorStyle.visible}
          style={
            {
              '--segmented-control-indicator-x': `${indicatorStyle.x}px`,
              '--segmented-control-indicator-width': `${indicatorStyle.width}px`,
            } as CSSProperties
          }
          aria-hidden="true"
        />
        {items.map((item) => {
          const selected = item.value === selectedValue;
          const iconSize = size === 'sm' ? 'sm' : 'md';

          return (
            <button
              key={item.value}
              type="button"
              className={cx(
                'openui-segmented-control__item',
                selected && 'openui-segmented-control__item--selected',
              )}
              role="radio"
              aria-checked={selected}
              disabled={item.disabled}
              tabIndex={item.disabled || item.value !== focusValue ? -1 : 0}
              data-openui-segmented-control-item={item.value}
              data-state={selected ? 'checked' : 'unchecked'}
              onPointerDown={() => {
                if (!item.disabled) {
                  setPressedValue(item.value);
                }
              }}
              onPointerCancel={() => setPressedValue(null)}
              onPointerLeave={() => setPressedValue(null)}
              onPointerUp={() => setPressedValue(null)}
              onBlur={() => setPressedValue(null)}
              onClick={() => {
                if (!item.disabled) {
                  selectItem(item.value);
                }
              }}
            >
              {item.icon ? (
                <Icon icon={item.icon} size={iconSize} color="inherit" />
              ) : null}
              <span className="openui-segmented-control__label">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  },
);

SegmentedControl.displayName = 'SegmentedControl';
