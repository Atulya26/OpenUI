import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import './TabBar.css';

export type TabBarPosition = 'static' | 'fixed';

export type TabBarItem = {
  value: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
};

type TabBarA11y =
  | {
      label: string;
      'aria-label'?: never;
    }
  | {
      label?: never;
      'aria-label': string;
    };

export type TabBarProps = TabBarA11y & {
  items: TabBarItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  position?: TabBarPosition;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<'nav'>,
  | 'aria-label'
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'label'
  | 'onChange'
>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function getInitialValue(items: TabBarItem[], defaultValue?: string) {
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  return items.find((item) => !item.disabled)?.value ?? items[0]?.value ?? '';
}

export const TabBar = forwardRef<HTMLElement, TabBarProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      position = 'static',
      label,
      className,
      onKeyDown,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      getInitialValue(items, defaultValue),
    );
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : uncontrolledValue;
    const accessibleLabel = ariaLabel ?? label;

    const enabledItems = useMemo(
      () => items.filter((item) => !item.disabled),
      [items],
    );
    const selectedEnabledItem = items.find(
      (item) => item.value === selectedValue && !item.disabled,
    );
    const focusValue = selectedEnabledItem?.value ?? enabledItems[0]?.value;

    useImperativeHandle(ref, () => rootRef.current as HTMLElement);

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
            `[data-openui-tab-bar-item="${CSS.escape(nextValue)}"]`,
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

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
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
      <nav
        ref={rootRef}
        className={cx(
          'openui-tab-bar',
          `openui-tab-bar--${position}`,
          className,
        )}
        aria-label={accessibleLabel}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="openui-tab-bar__list" role="tablist">
          {items.map((item) => {
            const selected = item.value === selectedValue;

            return (
              <button
                key={item.value}
                type="button"
                className={cx(
                  'openui-tab-bar__item',
                  selected && 'openui-tab-bar__item--selected',
                )}
                role="tab"
                aria-selected={selected}
                disabled={item.disabled}
                tabIndex={item.disabled || item.value !== focusValue ? -1 : 0}
                data-openui-tab-bar-item={item.value}
                data-state={selected ? 'selected' : 'unselected'}
                onClick={() => {
                  if (!item.disabled) {
                    selectItem(item.value);
                  }
                }}
              >
                <span className="openui-tab-bar__icon-wrap">
                  <Icon icon={item.icon} size="lg" color="inherit" />
                  {item.badge !== undefined ? (
                    <span className="openui-tab-bar__badge">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className="openui-tab-bar__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  },
);

TabBar.displayName = 'TabBar';
