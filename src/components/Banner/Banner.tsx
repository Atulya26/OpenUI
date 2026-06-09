import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info, X } from '../Icon/icons';
import './Banner.css';

export type BannerStatus = 'info' | 'success' | 'warning' | 'error';

export type BannerProps = {
  status?: BannerStatus;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  icon?: LucideIcon | false;
  action?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  compact?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className' | 'title'>;

const statusIcons: Record<BannerStatus, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleAlert,
};

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function getRole(status: BannerStatus): 'status' | 'alert' {
  return status === 'error' || status === 'warning' ? 'alert' : 'status';
}

export const Banner = forwardRef<HTMLElement, BannerProps>(
  (
    {
      status = 'info',
      title,
      description,
      children,
      icon,
      action,
      actionLabel,
      onAction,
      dismissible = false,
      onDismiss,
      dismissLabel = 'Dismiss banner',
      compact = false,
      className,
      role,
      ...rest
    },
    ref,
  ) => {
    const StatusIcon = icon === false ? null : icon ?? statusIcons[status];
    const hasAction = Boolean(action || (actionLabel && onAction));
    const body = children ?? description;

    return (
      <section
        ref={ref}
        className={cx(
          'openui-banner',
          `openui-banner--${status}`,
          compact && 'openui-banner--compact',
          className,
        )}
        role={role ?? getRole(status)}
        {...rest}
      >
        {StatusIcon ? (
          <span className="openui-banner__icon" aria-hidden="true">
            <Icon icon={StatusIcon} size="md" color="inherit" />
          </span>
        ) : null}

        <div className="openui-banner__content">
          <div className="openui-banner__title">{title}</div>
          {body ? <div className="openui-banner__description">{body}</div> : null}
          {hasAction ? (
            <div className="openui-banner__action">
              {action ?? (
                <button
                  className="openui-banner__action-button"
                  type="button"
                  onClick={onAction}
                >
                  {actionLabel}
                </button>
              )}
            </div>
          ) : null}
        </div>

        {dismissible ? (
          <button
            className="openui-banner__dismiss"
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            <Icon icon={X} size="md" color="inherit" />
          </button>
        ) : null}
      </section>
    );
  },
);

Banner.displayName = 'Banner';
