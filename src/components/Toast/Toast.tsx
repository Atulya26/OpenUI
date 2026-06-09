import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info, X } from '../Icon/icons';
import './Toast.css';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error';
export type ToastPlacement = 'top' | 'bottom';
export type ToastViewportMode = 'fixed' | 'contained';

export type ToastProps = {
  status?: ToastStatus;
  title?: ReactNode;
  message?: ReactNode;
  icon?: LucideIcon | false;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  placement?: ToastPlacement;
  className?: string;
  role?: 'status' | 'alert';
} & Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'title' | 'role'
>;

export type ToastViewportProps = {
  placement?: ToastPlacement;
  mode?: ToastViewportMode;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

const statusIcons: Record<ToastStatus, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleAlert,
};

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function getRole(status: ToastStatus): 'status' | 'alert' {
  return status === 'error' || status === 'warning' ? 'alert' : 'status';
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      status = 'info',
      title,
      message,
      icon,
      actionLabel,
      onAction,
      dismissible = false,
      onDismiss,
      dismissLabel = 'Dismiss notification',
      placement = 'bottom',
      className,
      role,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
    ) => {
    const titleId = useId();
    const messageId = useId();
    const StatusIcon = icon === false ? null : icon ?? statusIcons[status];
    const resolvedRole = role ?? getRole(status);
    const hasAction = Boolean(actionLabel && onAction);
    const messageOnly = !title && Boolean(message);

    return (
      <div
        ref={ref}
        className={cx(
          'openui-toast',
          `openui-toast--${status}`,
          `openui-toast--${placement}`,
          !StatusIcon && 'openui-toast--no-icon',
          messageOnly && 'openui-toast--message-only',
          className,
        )}
        role={resolvedRole}
        aria-live={ariaLive ?? (resolvedRole === 'alert' ? 'assertive' : 'polite')}
        aria-atomic={ariaAtomic ?? true}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy ?? (message ? messageId : undefined)}
        {...rest}
      >
        {StatusIcon ? (
          <span className="openui-toast__icon" aria-hidden="true">
            <Icon icon={StatusIcon} size="md" color="inherit" />
          </span>
        ) : null}

        <div className="openui-toast__content">
          {title ? (
            <div className="openui-toast__title" id={titleId}>
              {title}
            </div>
          ) : null}
          {message ? (
            <div className="openui-toast__message" id={messageId}>
              {message}
            </div>
          ) : null}
        </div>

        {hasAction ? (
          <div className="openui-toast__action-row">
            <button
              className="openui-toast__action"
              type="button"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          </div>
        ) : null}

        {dismissible ? (
          <button
            className="openui-toast__dismiss"
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            <Icon icon={X} size="md" color="inherit" />
          </button>
        ) : null}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  (
    {
      placement = 'bottom',
      mode = 'fixed',
      children,
      className,
      role = 'region',
      'aria-label': ariaLabel = 'Notifications',
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx(
        'openui-toast-viewport',
        `openui-toast-viewport--${placement}`,
        `openui-toast-viewport--${mode}`,
        className,
      )}
      role={role}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </div>
  ),
);

ToastViewport.displayName = 'ToastViewport';
