import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info, X } from '../Icon/icons';
import { usePresence } from '../Presence';
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
  open?: boolean;
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
      open = true,
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
    const [dismissRequested, setDismissRequested] = useState(false);
    const dismissAfterExitRef = useRef(false);
    const visible = open && !dismissRequested;
    const presence = usePresence({
      open: visible,
      onExitComplete: () => {
        if (dismissAfterExitRef.current) {
          dismissAfterExitRef.current = false;
          onDismiss?.();
        }
      },
    });
    const StatusIcon = icon === false ? null : icon ?? statusIcons[status];
    const resolvedRole = role ?? getRole(status);
    const hasAction = Boolean(actionLabel && onAction);
    const messageOnly = !title && Boolean(message);
    const dataState = presence.state;

    useEffect(() => {
      if (open) {
        dismissAfterExitRef.current = false;
        setDismissRequested(false);
      } else {
        dismissAfterExitRef.current = false;
      }
    }, [open]);

    function beginDismiss() {
      dismissAfterExitRef.current = true;
      setDismissRequested(true);
    }

    function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || dataState !== 'closing') {
        return;
      }

      presence.onExitComplete();
    }

    if (!presence.isPresent) {
      return null;
    }

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
        data-state={dataState}
        role={resolvedRole}
        aria-live={ariaLive ?? (resolvedRole === 'alert' ? 'assertive' : 'polite')}
        aria-atomic={ariaAtomic ?? true}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy ?? (message ? messageId : undefined)}
        onAnimationEnd={handleAnimationEnd}
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
            onClick={beginDismiss}
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
