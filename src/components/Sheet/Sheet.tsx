import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type AnimationEvent,
  type ComponentPropsWithoutRef,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { FocusTrap } from '../FocusTrap';
import { X } from '../Icon/icons';
import { IconButton } from '../IconButton';
import { Portal } from '../Portal';
import { usePresence } from '../Presence';
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
  dragToDismiss?: boolean;
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

const dragDismissDistanceRatio = 0.3;
const dragDismissVelocity = 0.65;
const dragDismissMinimumDistance = 44;
const dragClickTolerance = 4;
const upwardRubberBandRatio = 0.18;

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      open,
      title,
      children,
      footer,
      onClose,
      dismissLabel = 'Dismiss sheet',
      dragToDismiss = true,
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
    const sheetRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const dragStateRef = useRef({
      pointerId: -1,
      startY: 0,
      currentY: 0,
      lastY: 0,
      lastTime: 0,
      velocity: 0,
      hasMoved: false,
    });
    const [isDragging, setIsDragging] = useState(false);
    const presence = usePresence({ open });
    const dataState = presence.state;
    const canDragDismiss = Boolean(open && onClose && dragToDismiss);

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, []);

    function setDragProgress(nextY: number) {
      const panel = panelRef.current;
      const sheetRoot = sheetRef.current;

      if (!panel || !sheetRoot) {
        return;
      }

      const panelHeight = panel.getBoundingClientRect().height || dragDismissMinimumDistance;
      const dragY = nextY < 0 ? nextY * upwardRubberBandRatio : nextY;
      const progress = Math.min(Math.max(nextY / panelHeight, 0), 1);

      sheetRoot.style.setProperty('--openui-sheet-drag-y', `${dragY}px`);
      sheetRoot.style.setProperty(
        '--openui-sheet-scrim-opacity',
        `${1 - progress}`,
      );
    }

    function resetDragProgress() {
      const sheetRoot = sheetRef.current;

      if (!sheetRoot) {
        return;
      }

      sheetRoot.style.removeProperty('--openui-sheet-drag-y');
      sheetRoot.style.removeProperty('--openui-sheet-scrim-opacity');
    }

    function beginDrag(event: PointerEvent<HTMLButtonElement>) {
      if (!canDragDismiss || event.button !== 0) {
        return;
      }

      const time = performance.now();

      dragStateRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        currentY: 0,
        lastY: event.clientY,
        lastTime: time,
        velocity: 0,
        hasMoved: false,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      setDragProgress(0);
    }

    function updateDrag(event: PointerEvent<HTMLButtonElement>) {
      const dragState = dragStateRef.current;

      if (!isDragging || event.pointerId !== dragState.pointerId) {
        return;
      }

      const time = performance.now();
      const elapsed = Math.max(time - dragState.lastTime, 1);
      const deltaY = event.clientY - dragState.startY;

      dragState.velocity = (event.clientY - dragState.lastY) / elapsed;
      dragState.currentY = deltaY;
      dragState.hasMoved = dragState.hasMoved || Math.abs(deltaY) > dragClickTolerance;
      dragState.lastY = event.clientY;
      dragState.lastTime = time;

      setDragProgress(deltaY);
    }

    function endDrag(event: PointerEvent<HTMLButtonElement>) {
      const dragState = dragStateRef.current;

      if (!isDragging || event.pointerId !== dragState.pointerId) {
        return;
      }

      const panelHeight =
        panelRef.current?.getBoundingClientRect().height ?? dragDismissMinimumDistance;
      const dragDistance = Math.max(dragState.currentY, 0);
      const shouldDismiss =
        dragDistance >= panelHeight * dragDismissDistanceRatio ||
        (dragDistance >= dragDismissMinimumDistance &&
          dragState.velocity >= dragDismissVelocity);
      const shouldSuppressClick = dragState.hasMoved;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsDragging(false);
      dragStateRef.current.pointerId = -1;
      dragStateRef.current.hasMoved = shouldSuppressClick;

      if (shouldDismiss) {
        onClose?.();
      } else {
        resetDragProgress();
      }
    }

    function cancelDrag(event: PointerEvent<HTMLButtonElement>) {
      if (
        !isDragging ||
        event.pointerId !== dragStateRef.current.pointerId
      ) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsDragging(false);
      dragStateRef.current.pointerId = -1;
      dragStateRef.current.hasMoved = false;
      resetDragProgress();
    }

    function handleHandleClick() {
      if (!canDragDismiss) {
        return;
      }

      if (dragStateRef.current.hasMoved) {
        dragStateRef.current.hasMoved = false;
        return;
      }

      onClose?.();
    }

    function handlePanelAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.currentTarget !== event.target || open) {
        return;
      }

      presence.onExitComplete();
    }

    if (!presence.isPresent) {
      return null;
    }

    const sheet = (
      <div
        ref={sheetRef}
        className={cx(
          'openui-sheet',
          `openui-sheet--${placement}`,
          `openui-sheet--size-${size}`,
          footer ? 'openui-sheet--has-footer' : 'openui-sheet--no-footer',
          isDragging && 'openui-sheet--dragging',
          canDragDismiss && 'openui-sheet--drag-enabled',
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
            className="openui-sheet__scrim"
            aria-label={dismissLabel}
            onClick={open ? onClose : undefined}
          />
        ) : (
          <div className="openui-sheet__scrim" aria-hidden />
        )}

        <div
          ref={panelRef}
          className={cx('openui-sheet__panel', panelClassName)}
          role="dialog"
          aria-modal={open}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? titleId}
          onAnimationEnd={handlePanelAnimationEnd}
          {...rest}
        >
          {showHandle ? (
            <button
              type="button"
              className="openui-sheet__handle-wrap"
              aria-label={canDragDismiss ? dismissLabel : undefined}
              aria-hidden={canDragDismiss ? undefined : true}
              tabIndex={canDragDismiss ? undefined : -1}
              onClick={handleHandleClick}
              onPointerDown={beginDrag}
              onPointerMove={updateDrag}
              onPointerUp={endDrag}
              onPointerCancel={cancelDrag}
            >
              <span className="openui-sheet__handle" />
            </button>
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

    return <Portal disabled={placement !== 'fixed'}>{sheet}</Portal>;
  },
);

Sheet.displayName = 'Sheet';
