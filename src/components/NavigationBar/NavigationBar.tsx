import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { IconButton } from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import './NavigationBar.css';

export type NavigationBarVariant = 'default' | 'transparent';
export type NavigationBarSize = 'compact' | 'large';
export type NavigationBarTitleElement = 'h1' | 'h2' | 'div';

export type NavigationBarAction = {
  icon: LucideIcon;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  selected?: boolean;
  variant?: IconButtonProps['variant'];
  appearance?: IconButtonProps['appearance'];
};

type NavigationBarLeadingIconProps =
  | {
      leadingIcon?: undefined;
      leadingLabel?: string;
      onLeadingAction?: MouseEventHandler<HTMLButtonElement>;
    }
  | {
      leadingIcon: LucideIcon;
      leadingLabel: string;
      onLeadingAction?: MouseEventHandler<HTMLButtonElement>;
    };

type NavigationBarBaseProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  leadingAction?: ReactNode;
  trailingActions?: ReactNode;
  trailingIcons?: NavigationBarAction[];
  variant?: NavigationBarVariant;
  size?: NavigationBarSize;
  titleAs?: NavigationBarTitleElement;
} & Omit<ComponentPropsWithoutRef<'nav'>, 'title'>;

export type NavigationBarProps =
  NavigationBarBaseProps & NavigationBarLeadingIconProps;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function renderAction(action: NavigationBarAction, index: number) {
  return (
    <IconButton
      key={`${action.label}-${index}`}
      icon={action.icon}
      label={action.label}
      onClick={action.onClick}
      disabled={action.disabled}
      selected={action.selected}
      variant={action.variant}
      appearance={action.appearance ?? 'transparent'}
      size="sm"
    />
  );
}

export function NavigationBar({
  title,
  subtitle,
  leadingAction,
  leadingIcon,
  leadingLabel,
  onLeadingAction,
  trailingActions,
  trailingIcons,
  variant = 'default',
  size = 'compact',
  titleAs = 'h1',
  className,
  'aria-label': ariaLabel = 'Screen navigation',
  ...rest
}: NavigationBarProps) {
  const Title = titleAs;
  const hasLeading = Boolean(leadingAction || leadingIcon);
  const resolvedLeading = leadingAction ?? (
    leadingIcon ? (
      <IconButton
        icon={leadingIcon}
        label={leadingLabel}
        onClick={onLeadingAction}
        appearance="transparent"
        size="sm"
      />
    ) : null
  );
  const resolvedTrailing =
    trailingActions ??
    (trailingIcons?.length ? trailingIcons.map(renderAction) : null);
  const hasTrailing = Boolean(resolvedTrailing);

  const titleBlock = (
    <div className="openui-navigation-bar__title-block">
      <Title className="openui-navigation-bar__title">{title}</Title>
      {subtitle ? (
        <p className="openui-navigation-bar__subtitle">{subtitle}</p>
      ) : null}
    </div>
  );

  return (
    <nav
      className={cx(
        'openui-navigation-bar',
        `openui-navigation-bar--${variant}`,
        `openui-navigation-bar--${size}`,
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      {(size === 'compact' || hasLeading || hasTrailing) ? (
        <div className="openui-navigation-bar__chrome-row">
          <div
            className="openui-navigation-bar__leading"
            aria-hidden={!hasLeading || undefined}
          >
            {resolvedLeading}
          </div>

          {size === 'compact' ? titleBlock : <span aria-hidden />}

          <div
            className="openui-navigation-bar__trailing"
            aria-hidden={!hasTrailing || undefined}
          >
            {resolvedTrailing}
          </div>
        </div>
      ) : null}

      {size === 'large' ? titleBlock : null}
    </nav>
  );
}
