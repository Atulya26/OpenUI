import {
  forwardRef,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import './Pressable.css';

export type PressableFeedback = 'scale' | 'none';
export type PressableHitArea = 'none' | 'compact';
export type PressableHaptic =
  | 'none'
  | 'light'
  | 'selection'
  | 'medium'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'error';
export type PressableStateLayer =
  | 'none'
  | 'neutral'
  | 'primary'
  | 'danger'
  | 'onFill';

export type PressableInteractionType = 'pointer' | 'keyboard';

export type PressableInteraction = {
  type: PressableInteractionType;
};

type PressableOwnProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  feedback?: PressableFeedback;
  haptic?: PressableHaptic;
  hitArea?: PressableHitArea;
  stateLayer?: PressableStateLayer;
  onPressStart?: (interaction: PressableInteraction) => void;
  onPressEnd?: (interaction: PressableInteraction) => void;
};

export type PressableProps<T extends ElementType = 'button'> =
  PressableOwnProps<T> &
    Omit<
      ComponentPropsWithoutRef<T>,
      | 'as'
      | 'children'
      | 'className'
      | 'disabled'
      | 'onKeyDown'
      | 'onKeyUp'
      | 'onPointerCancel'
      | 'onPointerDown'
      | 'onPointerLeave'
      | 'onPointerUp'
    > & {
      onKeyDown?: ComponentPropsWithoutRef<T>['onKeyDown'];
      onKeyUp?: ComponentPropsWithoutRef<T>['onKeyUp'];
      onPointerCancel?: ComponentPropsWithoutRef<T>['onPointerCancel'];
      onPointerDown?: ComponentPropsWithoutRef<T>['onPointerDown'];
      onPointerLeave?: ComponentPropsWithoutRef<T>['onPointerLeave'];
      onPointerUp?: ComponentPropsWithoutRef<T>['onPointerUp'];
    };

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function isPressKey(key: string) {
  return key === 'Enter' || key === ' ';
}

export const Pressable = forwardRef<HTMLElement, PressableProps>(
  (
    {
      as,
      children,
      className,
      disabled = false,
      feedback = 'scale',
      haptic = 'none',
      hitArea = 'none',
      stateLayer = 'neutral',
      onClick,
      onKeyDown,
      onKeyUp,
      onPressEnd,
      onPressStart,
      onPointerCancel,
      onPointerDown,
      onPointerLeave,
      onPointerUp,
      tabIndex,
      ...rest
    },
    ref,
  ) => {
    const Component = (as ?? 'button') as ElementType;
    const isNativeButton = Component === 'button';
    const isPressingPointerRef = useRef(false);
    const isPressingKeyboardRef = useRef(false);

    function endPointerPress() {
      if (!isPressingPointerRef.current) {
        return;
      }

      isPressingPointerRef.current = false;
      onPressEnd?.({ type: 'pointer' });
    }

    function handlePointerDown(event: PointerEvent<HTMLElement>) {
      onPointerDown?.(event as never);

      if (event.defaultPrevented || disabled) {
        return;
      }

      isPressingPointerRef.current = true;
      onPressStart?.({ type: 'pointer' });
    }

    function handlePointerUp(event: PointerEvent<HTMLElement>) {
      onPointerUp?.(event as never);
      endPointerPress();
    }

    function handlePointerLeave(event: PointerEvent<HTMLElement>) {
      onPointerLeave?.(event as never);
      endPointerPress();
    }

    function handlePointerCancel(event: PointerEvent<HTMLElement>) {
      onPointerCancel?.(event as never);
      endPointerPress();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      onKeyDown?.(event as never);

      if (
        event.defaultPrevented ||
        disabled ||
        event.repeat ||
        !isPressKey(event.key)
      ) {
        return;
      }

      isPressingKeyboardRef.current = true;
      onPressStart?.({ type: 'keyboard' });
    }

    function handleKeyUp(event: KeyboardEvent<HTMLElement>) {
      onKeyUp?.(event as never);

      if (!isPressingKeyboardRef.current || !isPressKey(event.key)) {
        return;
      }

      isPressingKeyboardRef.current = false;
      onPressEnd?.({ type: 'keyboard' });
    }

    function handleClick(event: MouseEvent<HTMLElement>) {
      if (disabled && !isNativeButton) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event as never);
    }

    const pressableProps = {
      ...rest,
      ref: ref as never,
      className: cx(
        'openui-pressable',
        feedback !== 'none' && 'openui-pressable--feedback-scale',
        hitArea === 'compact' && 'openui-pressable--hit-area-compact',
        stateLayer !== 'none' && 'openui-pressable--state-layer',
        stateLayer !== 'none' && `openui-pressable--state-layer-${stateLayer}`,
        disabled && 'openui-pressable--disabled',
        className,
      ),
      disabled: isNativeButton ? disabled : undefined,
      'aria-disabled': !isNativeButton && disabled ? true : undefined,
      'data-haptic': !disabled && haptic !== 'none' ? haptic : undefined,
      tabIndex: disabled && !isNativeButton ? -1 : tabIndex,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onPointerCancel: handlePointerCancel,
      onPointerDown: handlePointerDown,
      onPointerLeave: handlePointerLeave,
      onPointerUp: handlePointerUp,
    };

    return (
      <Component {...(pressableProps as Record<string, unknown>)}>
        {children}
      </Component>
    );
  },
);

Pressable.displayName = 'Pressable';
