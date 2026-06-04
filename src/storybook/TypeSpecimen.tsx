import type { TypographyToken } from '@/tokens';

export function TypeSpecimenRow({
  name,
  token,
  sample,
  refLabel,
}: {
  name: string;
  token: TypographyToken;
  sample?: string;
  refLabel?: string;
}) {
  const text = sample ?? 'The quick brown fox jumps over the lazy dog';
  const family = token.fontFamily.includes('Display')
    ? 'Inter Display'
    : 'Inter';

  return (
    <article className="openui-type-row">
      <div className="openui-type-row__meta">
        <p className="openui-type-row__name">{name}</p>
        {refLabel ? (
          <p className="openui-type-row__ref">→ {refLabel}</p>
        ) : null}
        <div className="openui-type-row__chips">
          <span className="openui-chip">{token.fontSize}</span>
          <span className="openui-chip">LH {token.lineHeight}</span>
          <span className="openui-chip">W {token.fontWeight}</span>
          <span className="openui-chip">{family}</span>
        </div>
      </div>
      <div className="openui-type-row__sample">
        <p
          style={{
            margin: 0,
            fontFamily: token.fontFamily,
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            fontWeight: token.fontWeight,
            letterSpacing: token.letterSpacing,
            color: 'var(--color-text-strong950)',
          }}
        >
          {text}
        </p>
      </div>
    </article>
  );
}

