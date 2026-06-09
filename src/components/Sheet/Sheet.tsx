import {
  forwardRef,
  useEffect,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { X } from '../Icon/icons';
import { IconButton } from '../IconButton';
import './Sheet.css';

export type SheetSize = 'content' | 'medium' | 'large' | 'full';
export type SheetPlacement = 'fixed' | 'contained';

export type SheetProps = {
  open: boolean;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  dismissLabel?: string;
  showHandle?: boolean;
  size?: SheetSize;
  placement?: SheetPlacement;
  panelClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'title'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      open,
      title,
      children,
      footer,
      onClose,
      dismissLabel = 'Dismiss sheet',
      showHandle = true,
      size = 'content',
      placement = 'fixed',
      className,
      panelClassName,
      bodyClassName,
      footerClassName,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref,
  ) => {
    const generatedTitleId = useId();
    const titleId = title && !ariaLabel && !ariaLabelledBy ? generatedTitleId : undefined;

    useEffect(() => {
      if (!open || !onClose) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, open]);

    if (!open) {
      return null;
    }

    return (
      <div
        className={cx(
          'openui-sheet',
          `openui-sheet--${placement}`,
          `openui-sheet--size-${size}`,
          footer ? 'openui-sheet--has-footer' : 'openui-sheet--no-footer',
          className,
        )}
      >
        {onClose ? (
          <button
            type="button"
            className="openui-sheet__scrim"
            aria-label={dismissLabel}
            onClick={onClose}
          />
        ) : (
          <div className="openui-sheet__scrim" aria-hidden />
        )}

        <div
          ref={ref}
          className={cx('openui-sheet__panel', panelClassName)}
          role="dialog"
          aria-modal={open}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? titleId}
          {...rest}
        >
          {showHandle ? (
            <div className="openui-sheet__handle-wrap" aria-hidden>
              <span className="openui-sheet__handle" />
            </div>
          ) : null}

          {(title || onClose) ? (
            <header className="openui-sheet__header">
              {title ? (
                <div className="openui-sheet__title" id={titleId}>
                  {title}
                </div>
              ) : (
                <span aria-hidden />
              )}

              {onClose ? (
                <IconButton
                  icon={X}
                  label={dismissLabel}
                  size="sm"
                  appearance="transparent"
                  className="openui-sheet__close"
                  onClick={onClose}
                />
              ) : null}
            </header>
          ) : null}

          <div className={cx('openui-sheet__body', bodyClassName)}>{children}</div>

          {footer ? (
            <footer className={cx('openui-sheet__footer', footerClassName)}>
              {footer}
            </footer>
          ) : null}
        </div>
      </div>
    );
  },
);

Sheet.displayName = 'Sheet';
