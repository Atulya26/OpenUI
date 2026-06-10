import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type Ref,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, ChevronRight } from '../Icon/icons';
import { Icon } from '../Icon';
import './ListRow.css';

export type ListRowSize = 'sm' | 'md' | 'lg';

type ListRowBaseProps = {
  leadingIcon?: LucideIcon;
  leadingSlot?: ReactNode;
  trailingIcon?: LucideIcon | null;
  trailingText?: ReactNode;
  trailingSlot?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  size?: ListRowSize;
  selected?: boolean;
  destructive?: boolean;
  showDivider?: boolean;
  className?: string;
};

type ListRowButtonProps = ListRowBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    as?: 'button';
  };

type ListRowAnchorProps = ListRowBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    as: 'a';
    disabled?: boolean;
  };

type ListRowDivProps = ListRowBaseProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> & {
    as: 'div';
    disabled?: boolean;
  };

export type ListRowProps = ListRowButtonProps | ListRowAnchorProps | ListRowDivProps;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const ListRow = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLDivElement,
  ListRowProps
>(
  (
    props,
    ref,
  ) => {
    const {
      as = 'button',
      leadingIcon,
      leadingSlot,
      trailingIcon,
      trailingText,
      trailingSlot,
      title,
      description,
      size = 'md',
      selected = false,
      destructive = false,
      showDivider = true,
      disabled = false,
      className,
      ...rest
    } = props;
    const Component = as;
    const isButton = Component === 'button';
    const resolvedTrailingIcon =
      trailingIcon === undefined && !trailingText && !trailingSlot
        ? ChevronRight
        : trailingIcon;
    const iconColor = disabled
      ? 'disabled'
      : destructive
        ? 'inherit'
        : selected
          ? 'primary'
          : 'strong';
    const trailingIconColor = disabled
      ? 'disabled'
      : destructive
        ? 'inherit'
        : selected
          ? 'primary'
          : 'soft';

    const row = (
      <>
        {leadingSlot || leadingIcon ? (
          <span className="openui-list-row__leading">
            {leadingSlot ?? (
              <Icon icon={leadingIcon as LucideIcon} size="md" color={iconColor} />
            )}
          </span>
        ) : null}
        <span className="openui-list-row__content">
          <span className="openui-list-row__title">{title}</span>
          {description ? (
            <span className="openui-list-row__description">{description}</span>
          ) : null}
        </span>
        {trailingText ? (
          <span className="openui-list-row__trailing-text">{trailingText}</span>
        ) : null}
        {trailingSlot ? (
          <span className="openui-list-row__trailing-slot">{trailingSlot}</span>
        ) : null}
        {selected && !resolvedTrailingIcon && !trailingSlot ? (
          <Icon
            icon={Check}
            size="sm"
            color="primary"
            stroke="thin"
            className="openui-list-row__trailing-icon"
          />
        ) : null}
        {resolvedTrailingIcon ? (
          <Icon
            icon={resolvedTrailingIcon}
            size="sm"
            color={trailingIconColor}
            stroke="thin"
            className="openui-list-row__trailing-icon"
          />
        ) : null}
      </>
    );

    const rowClassName = cx(
      'openui-list-row',
      `openui-list-row--${size}`,
      Boolean(description) && 'openui-list-row--has-description',
      !showDivider && 'openui-list-row--no-divider',
      selected && 'openui-list-row--selected',
      destructive && 'openui-list-row--destructive',
      disabled && 'openui-list-row--disabled',
      className,
    );

    if (isButton) {
      const buttonProps = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          className={rowClassName}
          aria-selected={selected || undefined}
          {...buttonProps}
          type={buttonProps.type ?? 'button'}
          disabled={disabled}
        >
          {row}
        </button>
      );
    }

    if (Component === 'a') {
      const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'>;

      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={rowClassName}
          aria-disabled={disabled || undefined}
          aria-selected={selected || undefined}
          {...anchorProps}
        >
          {row}
        </a>
      );
    }

    const divProps = rest as Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        className={rowClassName}
        aria-disabled={disabled || undefined}
        aria-selected={selected || undefined}
        {...divProps}
      >
        {row}
      </div>
    );
  },
);

ListRow.displayName = 'ListRow';
