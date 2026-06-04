import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  iconColor,
  iconSize,
  iconStrokeWidth,
  type IconColorToken,
  type IconSizeToken,
  type IconStrokeToken,
} from '../../tokens/icons';

export type IconProps = {
  /** Lucide icon component — import from `lucide-react` or `@/components/Icon/icons` */
  icon: LucideIcon;
  /** Preset size token or explicit pixel size */
  size?: IconSizeToken | number;
  /** Semantic color from design tokens */
  color?: IconColorToken;
  /** Stroke weight preset (default: regular = 2) */
  stroke?: IconStrokeToken;
  /**
   * Accessible name. When set, icon is announced to screen readers.
   * When omitted, icon is decorative (`aria-hidden`).
   */
  label?: string;
  className?: string;
} & Omit<LucideProps, 'size' | 'color' | 'strokeWidth' | 'ref'>;

function resolveSize(size: IconSizeToken | number): number {
  return typeof size === 'number' ? size : iconSize[size];
}

/**
 * Design-system icon wrapper around [Lucide React](https://lucide.dev/guide/react/).
 * Tree-shake by importing only the icons you use.
 */
export function Icon({
  icon: LucideGlyph,
  size = 'lg',
  color = 'strong',
  stroke = 'regular',
  label,
  className,
  absoluteStrokeWidth,
  ...rest
}: IconProps) {
  const decorative = !label;

  return (
    <LucideGlyph
      size={resolveSize(size)}
      color={iconColor[color]}
      strokeWidth={iconStrokeWidth[stroke]}
      absoluteStrokeWidth={absoluteStrokeWidth}
      className={className}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      role={decorative ? undefined : 'img'}
      {...rest}
    />
  );
}
