import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  type UIEvent,
} from 'react';
import './Screen.css';

export type ScreenDensity = 'comfortable' | 'compact';

export type ScreenProps = {
  children?: ReactNode;
  contentClassName?: string;
  navigation?: ReactNode;
  scrollCollapse?: boolean;
  scrollCollapseDistance?: number;
  /**
   * Control density. `compact` sets `data-density="compact"`, tightening the
   * shared control-size scale for small screens. Defaults to `comfortable`.
   */
  density?: ScreenDensity;
} & ComponentPropsWithoutRef<'div'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const defaultScrollCollapseDistance = 72;

export const Screen = forwardRef<HTMLDivElement, ScreenProps>(
  (
    {
      children,
      className,
      contentClassName,
      density,
      navigation,
      onScroll,
      scrollCollapse = Boolean(navigation),
      scrollCollapseDistance = defaultScrollCollapseDistance,
      style,
      ...rest
    },
    ref,
  ) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const isScrolledRef = useRef(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useImperativeHandle(ref, () => screenRef.current as HTMLDivElement, []);

    function updateScrollState(element: HTMLDivElement) {
      if (!scrollCollapse) {
        return;
      }

      const scrollTop = Math.max(element.scrollTop, 0);
      const progress = Math.min(
        scrollTop / Math.max(scrollCollapseDistance, 1),
        1,
      );
      const nextIsScrolled = scrollTop > 0;

      element.style.setProperty('--nav-collapse', progress.toFixed(3));

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
    }

    function handleScroll(event: UIEvent<HTMLDivElement>) {
      updateScrollState(event.currentTarget);
      onScroll?.(event);
    }

    useEffect(() => {
      const element = screenRef.current;

      if (!element) {
        return;
      }

      if (!scrollCollapse) {
        element.style.removeProperty('--nav-collapse');
        return;
      }

      updateScrollState(element);
    }, [scrollCollapse, scrollCollapseDistance]);

    const screenStyle = {
      '--nav-collapse': 0,
      ...style,
    } as CSSProperties;

    return (
      <div
        ref={screenRef}
        className={cx('openui-app-screen', 'openui-screen', className)}
        data-density={density === 'compact' ? 'compact' : undefined}
        data-scrolled={isScrolled ? true : undefined}
        data-scroll-collapse={scrollCollapse ? true : undefined}
        style={screenStyle}
        onScroll={handleScroll}
        {...rest}
      >
        {navigation ? (
          <div className="openui-screen__navigation">
            <div className="openui-app-content openui-screen__navigation-inner">
              {navigation}
            </div>
          </div>
        ) : null}

        <main className={cx('openui-app-content', 'openui-screen__content', contentClassName)}>
          {children}
        </main>
      </div>
    );
  },
);

Screen.displayName = 'Screen';
