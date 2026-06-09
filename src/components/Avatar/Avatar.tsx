import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../Icon';
import { Image, User } from '../Icon/icons';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'busy';

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  fallbackIcon?: LucideIcon;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className'>;

export type ThumbnailProps = Omit<AvatarProps, 'fallbackIcon' | 'shape'> & {
  fallbackIcon?: LucideIcon;
  shape?: AvatarShape;
};

const statusLabel: Record<AvatarStatus, string> = {
  online: 'online',
  offline: 'offline',
  busy: 'busy',
};

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function getInitials(name?: string): string {
  if (!name) {
    return '';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return Array.from(parts[0]).slice(0, 2).join('').toUpperCase();
  }

  return `${Array.from(parts[0])[0] ?? ''}${
    Array.from(parts[parts.length - 1])[0] ?? ''
  }`.toUpperCase();
}

function iconSizeForAvatar(size: AvatarSize): 'sm' | 'md' | 'lg' {
  return size === 'xs' || size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg';
}

export function Avatar({
  src,
  alt,
  name,
  fallbackIcon = User,
  size = 'md',
  shape = 'circle',
  status,
  className,
  'aria-label': ariaLabel,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(src && !imageError);
  const initials = getInitials(name);
  const label = [ariaLabel ?? alt ?? name, status ? statusLabel[status] : undefined]
    .filter(Boolean)
    .join(', ');

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <span
      className={cx(
        'openui-avatar',
        `openui-avatar--${size}`,
        `openui-avatar--${shape}`,
        className,
      )}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      {...rest}
    >
      <span className="openui-avatar__visual" aria-hidden={label ? true : undefined}>
        {showImage ? (
          <img
            className="openui-avatar__image"
            src={src}
            alt=""
            draggable={false}
            onError={() => setImageError(true)}
          />
        ) : initials ? (
          <span className="openui-avatar__initials">{initials}</span>
        ) : (
          <Icon
            icon={fallbackIcon}
            size={iconSizeForAvatar(size)}
            color="sub"
            stroke="regular"
          />
        )}
      </span>
      {status ? (
        <span
          className={cx('openui-avatar__status', `openui-avatar__status--${status}`)}
          aria-hidden
        />
      ) : null}
    </span>
  );
}

export function Thumbnail({
  fallbackIcon = Image,
  shape = 'rounded',
  className,
  name,
  alt,
  'aria-label': ariaLabel,
  ...props
}: ThumbnailProps) {
  const label = ariaLabel ?? alt ?? name;

  return (
    <Avatar
      className={cx('openui-thumbnail', className)}
      fallbackIcon={fallbackIcon}
      shape={shape}
      alt={alt}
      aria-label={label}
      {...props}
    />
  );
}
