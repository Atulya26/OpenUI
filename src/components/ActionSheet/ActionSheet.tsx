import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { FocusTrap } from '../FocusTrap';
import { Icon } from '../Icon';
import { Portal } from '../Portal';
import { usePresence } from '../Presence';
import './ActionSheet.css';

export type ActionSheetPlacement = 'fixed' | 'contained';
export type ActionSheetActionTone = 'default' | 'primary' | 'destructive';

export type ActionSheetAction = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  tone?: ActionSheetActionTone;
  disabled?: boolean;
  onSelect?: () => void;
};

export type ActionSheetProps = {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  actions: ActionSheetAction[];
  cancelLabel?: ReactNode;
  onClose?: () => void;
  closeOnSelect?: boolean;
  placement?: ActionSheetPlacement;
  panelClassName?: string;
  actionListClassName?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'title'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const ActionSheet = forwardRef<HTMLDivElement, ActionSheetProps>(
  (
    {
      open,
      title,
      description,
      actions,
      cancelLabel = 'Cancel',
      onClose,
      closeOnSelect = true,
      placement = 'fixed',
      className,
      panelClassName,
      actionListClassName,
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

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, []);

    function handlePanelAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || open) {
        return;
      }

      presence.onExitComplete();
    }

    function handleActionSelect(action: ActionSheetAction) {
      if (action.disabled) {
        return;
      }

      action.onSelect?.();

      if (closeOnSelect) {
        onClose?.();
      }
    }

    if (!presence.isPresent) {
      return null;
    }

    const actionSheet = (
      <div
        className={cx(
          'openui-action-sheet',
          `openui-action-sheet--${placement}`,
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
            className="openui-action-sheet__scrim"
            aria-label="Dismiss action sheet"
            onClick={open ? onClose : undefined}
          />
        ) : (
          <div className="openui-action-sheet__scrim" aria-hidden />
        )}

        <div
          ref={panelRef}
          className={cx('openui-action-sheet__panel', panelClassName)}
          role="dialog"
          aria-modal={open}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? titleId}
          aria-describedby={ariaDescribedBy ?? descriptionId}
          onAnimationEnd={handlePanelAnimationEnd}
          {...rest}
        >
          {(title || description) ? (
            <header className="openui-action-sheet__header">
              {title ? (
                <div className="openui-action-sheet__title" id={titleId}>
                  {title}
                </div>
              ) : null}
              {description ? (
                <div className="openui-action-sheet__description" id={descriptionId}>
                  {description}
                </div>
              ) : null}
            </header>
          ) : null}

          <div className={cx('openui-action-sheet__actions', actionListClassName)}>
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={cx(
                  'openui-action-sheet__action',
                  `openui-action-sheet__action--${action.tone ?? 'default'}`,
                )}
                disabled={action.disabled}
                onClick={() => handleActionSelect(action)}
              >
                {action.icon ? (
                  <span className="openui-action-sheet__action-icon" aria-hidden>
                    <Icon icon={action.icon} size="md" color="inherit" />
                  </span>
                ) : null}
                <span className="openui-action-sheet__action-copy">
                  <span className="openui-action-sheet__action-label">{action.label}</span>
                  {action.description ? (
                    <span className="openui-action-sheet__action-description">
                      {action.description}
                    </span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          {onClose ? (
            <button
              type="button"
              className="openui-action-sheet__cancel"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
          ) : null}
        </div>
      </div>
    );

    return <Portal disabled={placement !== 'fixed'}>{actionSheet}</Portal>;
  },
);

ActionSheet.displayName = 'ActionSheet';
