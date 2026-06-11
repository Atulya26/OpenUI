import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info, X } from '../Icon/icons';
import { Portal, type PortalProps } from '../Portal';
import { Pressable } from '../Pressable';
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
  autoDismissDuration?: number;
  pauseOnInteraction?: boolean;
  swipeToDismiss?: boolean;
  placement?: ToastPlacement;
  open?: boolean;
  className?: string;
  role?: 'status' | 'alert';
  stackDepth?: number;
  stackCount?: number;
} & Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'title' | 'role'
>;

export type ToastViewportProps = {
  placement?: ToastPlacement;
  mode?: ToastViewportMode;
  limit?: number;
  stacked?: boolean;
  portal?: boolean;
  container?: PortalProps['container'];
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

const statusIcons: Record<ToastStatus, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleAlert,
};

const toastStackLimit = 3;
const toastSwipeDismissDistanceRatio = 0.35;
const toastSwipeDismissVelocity = 0.6;
const toastSwipeMinimumDistance = 44;
const toastSwipeClickTolerance = 4;

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
      autoDismissDuration,
      pauseOnInteraction = true,
      swipeToDismiss = true,
      placement = 'bottom',
      open = true,
      className,
      role,
      stackDepth = 0,
      stackCount = 1,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-hidden': ariaHidden,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref,
  ) => {
    const titleId = useId();
    const messageId = useId();
    const toastRef = useRef<HTMLDivElement>(null);
    const [dismissRequested, setDismissRequested] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeExitDirection, setSwipeExitDirection] = useState<
      'positive' | 'negative' | undefined
    >();
    const dismissAfterExitRef = useRef(false);
    const dismissTimerRef = useRef<number | undefined>(undefined);
    const timerStartedAtRef = useRef(0);
    const timerRemainingRef = useRef(autoDismissDuration ?? 0);
    const swipeStateRef = useRef({
      pointerId: -1,
      startX: 0,
      currentX: 0,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
      hasMoved: false,
    });
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
    const isStackedBehind = stackDepth > 0;
    const canSwipeDismiss = Boolean(swipeToDismiss && (dismissible || onDismiss));

    useImperativeHandle(ref, () => toastRef.current as HTMLDivElement, []);

    useEffect(() => {
      if (open) {
        dismissAfterExitRef.current = false;
        setDismissRequested(false);
        setSwipeExitDirection(undefined);
      } else {
        dismissAfterExitRef.current = false;
      }
    }, [open]);

    useEffect(() => {
      timerRemainingRef.current = autoDismissDuration ?? 0;
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = undefined;

      if (!visible || !autoDismissDuration || autoDismissDuration <= 0) {
        return undefined;
      }

      timerStartedAtRef.current = performance.now();
      dismissTimerRef.current = window.setTimeout(
        beginDismiss,
        autoDismissDuration,
      );

      return () => {
        window.clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = undefined;
      };
    }, [autoDismissDuration, visible]);

    function beginDismiss(direction?: 'positive' | 'negative') {
      if (direction) {
        setSwipeExitDirection(direction);
      }

      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = undefined;
      dismissAfterExitRef.current = true;
      setDismissRequested(true);
    }

    function pauseAutoDismiss() {
      if (
        !pauseOnInteraction ||
        !autoDismissDuration ||
        !dismissTimerRef.current
      ) {
        return;
      }

      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = undefined;
      timerRemainingRef.current = Math.max(
        0,
        timerRemainingRef.current - (performance.now() - timerStartedAtRef.current),
      );
    }

    function resumeAutoDismiss() {
      if (
        !pauseOnInteraction ||
        !autoDismissDuration ||
        dismissTimerRef.current ||
        timerRemainingRef.current <= 0 ||
        !visible
      ) {
        return;
      }

      timerStartedAtRef.current = performance.now();
      dismissTimerRef.current = window.setTimeout(
        beginDismiss,
        timerRemainingRef.current,
      );
    }

    function setSwipeProgress(nextX: number) {
      const toast = toastRef.current;

      if (!toast) {
        return;
      }

      const width = toast.getBoundingClientRect().width || toastSwipeMinimumDistance;
      const progress = Math.min(Math.abs(nextX) / width, 1);

      toast.style.setProperty('--openui-toast-swipe-x', `${nextX}px`);
      toast.style.setProperty(
        '--openui-toast-swipe-opacity',
        `${1 - progress * 0.5}`,
      );
    }

    function resetSwipeProgress() {
      const toast = toastRef.current;

      if (!toast) {
        return;
      }

      toast.style.removeProperty('--openui-toast-swipe-x');
      toast.style.removeProperty('--openui-toast-swipe-opacity');
    }

    function isInteractiveTarget(target: EventTarget) {
      return target instanceof HTMLElement
        ? Boolean(target.closest('button, a, input, select, textarea, [role="button"]'))
        : false;
    }

    function beginSwipe(event: PointerEvent<HTMLDivElement>) {
      if (
        !canSwipeDismiss ||
        isStackedBehind ||
        event.button !== 0 ||
        isInteractiveTarget(event.target)
      ) {
        return;
      }

      const time = performance.now();

      swipeStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        currentX: 0,
        lastX: event.clientX,
        lastTime: time,
        velocity: 0,
        hasMoved: false,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
      setIsSwiping(true);
      setSwipeProgress(0);
    }

    function updateSwipe(event: PointerEvent<HTMLDivElement>) {
      const swipeState = swipeStateRef.current;

      if (!isSwiping || event.pointerId !== swipeState.pointerId) {
        return;
      }

      const time = performance.now();
      const elapsed = Math.max(time - swipeState.lastTime, 1);
      const deltaX = event.clientX - swipeState.startX;

      swipeState.velocity = (event.clientX - swipeState.lastX) / elapsed;
      swipeState.currentX = deltaX;
      swipeState.hasMoved =
        swipeState.hasMoved || Math.abs(deltaX) > toastSwipeClickTolerance;
      swipeState.lastX = event.clientX;
      swipeState.lastTime = time;

      setSwipeProgress(deltaX);
    }

    function endSwipe(event: PointerEvent<HTMLDivElement>) {
      const swipeState = swipeStateRef.current;

      if (!isSwiping || event.pointerId !== swipeState.pointerId) {
        return;
      }

      const toastWidth =
        toastRef.current?.getBoundingClientRect().width ?? toastSwipeMinimumDistance;
      const swipeDistance = Math.abs(swipeState.currentX);
      const shouldDismiss =
        swipeDistance >= toastWidth * toastSwipeDismissDistanceRatio ||
        (swipeDistance >= toastSwipeMinimumDistance &&
          Math.abs(swipeState.velocity) >= toastSwipeDismissVelocity);
      const direction = swipeState.currentX >= 0 ? 'positive' : 'negative';

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsSwiping(false);
      swipeStateRef.current.pointerId = -1;

      if (shouldDismiss) {
        beginDismiss(direction);
      } else {
        resetSwipeProgress();
        resumeAutoDismiss();
      }
    }

    function cancelSwipe(event: PointerEvent<HTMLDivElement>) {
      if (
        !isSwiping ||
        event.pointerId !== swipeStateRef.current.pointerId
      ) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsSwiping(false);
      swipeStateRef.current.pointerId = -1;
      resetSwipeProgress();
      resumeAutoDismiss();
    }

    function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
      onPointerDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      pauseAutoDismiss();
      beginSwipe(event);
    }

    function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
      onPointerMove?.(event);
      updateSwipe(event);
    }

    function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
      onPointerUp?.(event);
      endSwipe(event);

      if (!isSwiping) {
        resumeAutoDismiss();
      }
    }

    function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
      onPointerCancel?.(event);
      cancelSwipe(event);
    }

    function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
      onPointerEnter?.(event);
      pauseAutoDismiss();
    }

    function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
      onPointerLeave?.(event);

      if (!isSwiping) {
        resumeAutoDismiss();
      }
    }

    function handleFocus(event: FocusEvent<HTMLDivElement>) {
      onFocus?.(event);
      pauseAutoDismiss();
    }

    function handleBlur(event: FocusEvent<HTMLDivElement>) {
      onBlur?.(event);
      resumeAutoDismiss();
    }

    function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || dataState !== 'closing') {
        return;
      }

      presence.onExitComplete();
    }

    const toastStyle = {
      ...style,
      '--openui-toast-stack-depth': stackDepth,
      '--openui-toast-stack-count': stackCount,
    } as CSSProperties;

    if (!presence.isPresent) {
      return null;
    }

    return (
      <div
        {...rest}
        ref={toastRef}
        className={cx(
          'openui-toast',
          `openui-toast--${status}`,
          `openui-toast--${placement}`,
          !StatusIcon && 'openui-toast--no-icon',
          messageOnly && 'openui-toast--message-only',
          isSwiping && 'openui-toast--swiping',
          canSwipeDismiss && !isStackedBehind && 'openui-toast--swipe-enabled',
          className,
        )}
        style={toastStyle}
        data-state={dataState}
        data-stack-depth={stackDepth}
        data-stacked-behind={isStackedBehind ? true : undefined}
        data-swipe-exit={swipeExitDirection}
        role={resolvedRole}
        aria-live={ariaLive ?? (resolvedRole === 'alert' ? 'assertive' : 'polite')}
        aria-atomic={ariaAtomic ?? true}
        aria-hidden={ariaHidden ?? (isStackedBehind ? true : undefined)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy ?? (message ? messageId : undefined)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onAnimationEnd={handleAnimationEnd}
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
            <Pressable
              as="button"
              className="openui-toast__action"
              type="button"
              haptic={status === 'success' ? 'success' : 'light'}
              stateLayer="onFill"
              onClick={onAction}
            >
              {actionLabel}
            </Pressable>
          </div>
        ) : null}

        {dismissible ? (
          <Pressable
            as="button"
            className="openui-toast__dismiss"
            type="button"
            aria-label={dismissLabel}
            haptic="light"
            hitArea="compact"
            onClick={() => beginDismiss()}
          >
            <Icon icon={X} size="md" color="inherit" />
          </Pressable>
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
      limit = toastStackLimit,
      stacked = true,
      portal,
      container,
      children,
      className,
      role = 'region',
      'aria-label': ariaLabel = 'Notifications',
      ...rest
    },
    ref,
  ) => {
    const childrenArray = Children.toArray(children);
    const resolvedLimit = Math.max(1, limit);
    const visibleChildren =
      stacked && childrenArray.length > resolvedLimit
        ? placement === 'bottom'
          ? childrenArray.slice(childrenArray.length - resolvedLimit)
          : childrenArray.slice(0, resolvedLimit)
        : childrenArray;
    const stackCount = visibleChildren.length;
    const enhancedChildren = visibleChildren.map((child, index) => {
      if (!isValidElement<ToastProps>(child)) {
        return child;
      }

      const stackDepth = stacked
        ? placement === 'bottom'
          ? stackCount - 1 - index
          : index
        : 0;

      return cloneElement(child as ReactElement<ToastProps>, {
        placement,
        stackDepth,
        stackCount,
      });
    });
    const shouldPortal = portal ?? mode === 'fixed';
    const viewport = (
      <div
        ref={ref}
        className={cx(
          'openui-toast-viewport',
          `openui-toast-viewport--${placement}`,
          `openui-toast-viewport--${mode}`,
          stacked && 'openui-toast-viewport--stacked',
          className,
        )}
        role={role}
        aria-label={ariaLabel}
        {...rest}
      >
        {enhancedChildren}
      </div>
    );

    return (
      <Portal disabled={!shouldPortal} container={container} rootId="openui-toast-root">
        {viewport}
      </Portal>
    );
  },
);

ToastViewport.displayName = 'ToastViewport';
