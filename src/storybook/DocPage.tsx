import type { ReactNode } from 'react';

export function DocPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="openui-doc">
      {(eyebrow || title || description) && (
        <header className="openui-doc__header">
          {eyebrow ? <p className="openui-doc__eyebrow">{eyebrow}</p> : null}
          {title ? <h1 className="openui-doc__title">{title}</h1> : null}
          {description ? (
            <p className="openui-doc__description">{description}</p>
          ) : null}
        </header>
      )}
      <div className="openui-doc__content">{children}</div>
    </div>
  );
}

export function Panel({
  children,
  className = '',
  padding = true,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`openui-panel ${padding ? 'openui-panel--padded' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function Section({
  title,
  description,
  meta,
  children,
}: {
  title: string;
  description?: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="openui-section">
      <div className="openui-section__head">
        <div>
          <h2 className="openui-section__title">{title}</h2>
          {description ? (
            <p className="openui-section__description">{description}</p>
          ) : null}
        </div>
        {meta ? <span className="openui-badge">{meta}</span> : null}
      </div>
      <div className="openui-section__body">{children}</div>
    </section>
  );
}
