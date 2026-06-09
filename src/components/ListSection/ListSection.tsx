import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';
import './ListSection.css';

export type ListSectionVariant = 'surface' | 'soft' | 'outline';
export type ListSectionInset = 'none' | 'sm' | 'md';

export type ListSectionProps = {
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  variant?: ListSectionVariant;
  inset?: ListSectionInset;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className' | 'title'>;

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function ListSection({
  title,
  footer,
  children,
  variant = 'surface',
  inset = 'md',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: ListSectionProps) {
  const generatedTitleId = useId();
  const titleId = title && !ariaLabel && !ariaLabelledBy ? generatedTitleId : undefined;

  return (
    <section
      className={cx(
        'openui-list-section',
        `openui-list-section--${variant}`,
        `openui-list-section--inset-${inset}`,
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy ?? titleId}
      {...rest}
    >
      {title ? (
        <div className="openui-list-section__title" id={titleId}>
          {title}
        </div>
      ) : null}

      <div className="openui-list-section__group">{children}</div>

      {footer ? (
        <div className="openui-list-section__footer">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
