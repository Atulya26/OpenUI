import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { FocusTrap } from '../FocusTrap';
import { Icon } from '../Icon';
import { CircleAlert, CircleCheck, Info, X } from '../Icon/icons';
import { IconButton } from '../IconButton';
import { Portal } from '../Portal';
import { usePresence } from '../Presence';
import './Dialog.css';

export type DialogStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type DialogPlacement = 'fixed' | 'contained';

export type DialogProps = {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  status?: DialogStatus;
  placement?: DialogPlacement;
  onClose?: () => void;
  dismissLabel?: string;
  showCloseButton?: boolean;
  panelClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'title'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const statusIcons = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleAlert,
} as const;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      title,
      description,
      children,
      footer,
      status = 'default',
      placement = 'fixed',
      onClose,
      dismissLabel = 'Dismiss dialog',
      showCloseButton = true,
      className,
      panelClassName,
      bodyClassName,
      footerClassName,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedTitleId = useId();
    const generatedDescriptionId = useId();
    const titleId = title && !ariaLabel && !ariaLabelledBy ? generatedTitleId : undefined;
    const descriptionId = description && !ariaDescribedBy ? generatedDescriptionId : undefined;
    const panelRef = useRef<HTMLDivElement>(null);
    const presence = usePresence({ open });
    const dataState = presence.state;
    const StatusIcon = status === 'default' ? null : statusIcons[status];

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, []);

    function handlePanelAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || open) {
        return;
      }

      presence.onExitComplete();
    }

    if (!presence.isPresent) {
      return null;
    }

    const dialog = (
      <div
        className={cx(
          'openui-dialog',
          `openui-dialog--${placement}`,
          `openui-dialog--${status}`,
          !StatusIcon && 'openui-dialog--no-status-icon',
          className,
        )}
          data-state={dataState}
      >
        <FocusTrap
          active={open}
          containerRef={panelRef}
          onEscapeKeyDown={onClose}
        />
        {onClose ? (
          <button
            type="button"
            className="openui-dialog__scrim"
            aria-label={dismissLabel}
            onClick={open ? onClose : undefined}
          />
        ) : (
          <div className="openui-dialog__scrim" aria-hidden />
        )}

        <div
          ref={panelRef}
          className={cx('openui-dialog__panel', panelClassName)}
          role={status === 'error' || status === 'warning' ? 'alertdialog' : 'dialog'}
          aria-modal={open}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? titleId}
          aria-describedby={ariaDescribedBy ?? descriptionId}
          onAnimationEnd={handlePanelAnimationEnd}
          {...rest}
        >
          <header className="openui-dialog__header">
            {StatusIcon ? (
              <span className="openui-dialog__status-icon" aria-hidden>
                <Icon icon={StatusIcon} size="md" color="inherit" />
              </span>
            ) : null}

            <div className="openui-dialog__heading">
              {title ? (
                <div className="openui-dialog__title" id={titleId}>
                  {title}
                </div>
              ) : null}
              {description ? (
                <div className="openui-dialog__description" id={descriptionId}>
                  {description}
                </div>
              ) : null}
            </div>

            {onClose && showCloseButton ? (
              <IconButton
                icon={X}
                label={dismissLabel}
                size="sm"
                appearance="transparent"
                className="openui-dialog__close"
                onClick={onClose}
              />
            ) : null}
          </header>

          {children ? (
            <div className={cx('openui-dialog__body', bodyClassName)}>
              {children}
            </div>
          ) : null}

          {footer ? (
            <footer className={cx('openui-dialog__footer', footerClassName)}>
              {footer}
            </footer>
          ) : null}
        </div>
      </div>
    );

    return <Portal disabled={placement !== 'fixed'}>{dialog}</Portal>;
  },
);

Dialog.displayName = 'Dialog';
