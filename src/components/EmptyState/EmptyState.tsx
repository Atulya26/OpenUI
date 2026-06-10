import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { Text } from '../Text';
import './EmptyState.css';

export type EmptyStateSize = 'sm' | 'md';
export type EmptyStateAlign = 'start' | 'center';

export type EmptyStateProps = {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  size?: EmptyStateSize;
  align?: EmptyStateAlign;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'title'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  align = 'center',
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'openui-empty-state',
        `openui-empty-state--${size}`,
        `openui-empty-state--${align}`,
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span className="openui-empty-state__icon" aria-hidden>
          <Icon icon={icon} size="lg" color="sub" />
        </span>
      ) : null}

      <div className="openui-empty-state__copy">
        <Text
          as="h3"
          variant={size === 'sm' ? 'listTitle' : 'cardTitle'}
          emphasized={size === 'md'}
          align={align}
          className="openui-empty-state__title"
        >
          {title}
        </Text>

        {description ? (
          <Text
            variant={size === 'sm' ? 'tertiary' : 'secondary'}
            color="sub"
            align={align}
            className="openui-empty-state__description"
          >
            {description}
          </Text>
        ) : null}
      </div>

      {action ? <div className="openui-empty-state__action">{action}</div> : null}
    </div>
  );
}
