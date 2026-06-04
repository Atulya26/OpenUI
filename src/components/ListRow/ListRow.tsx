import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from '../Icon/icons';
import { Icon } from '../Icon';
import './ListRow.css';

export type ListRowProps = {
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon | null;
  title: ReactNode;
  description?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const ListRow = forwardRef<HTMLButtonElement, ListRowProps>(
  (
    {
      leadingIcon,
      trailingIcon = ChevronRight,
      title,
      description,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cx('openui-list-row', className)}
      {...rest}
    >
      {leadingIcon ? (
        <span className="openui-list-row__leading">
          <Icon icon={leadingIcon} size="md" color="strong" />
        </span>
      ) : null}
      <span className="openui-list-row__content">
        <span className="openui-list-row__title">{title}</span>
        {description ? (
          <span className="openui-list-row__description">{description}</span>
        ) : null}
      </span>
      {trailingIcon ? (
        <Icon icon={trailingIcon} size="md" color="soft" />
      ) : null}
    </button>
  ),
);

ListRow.displayName = 'ListRow';
