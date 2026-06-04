export type ShadowSpecimenItem = {
  name: string;
  cssVar: string;
};

export function ShadowSpecimenGrid({
  items,
  compact = false,
}: {
  items: ShadowSpecimenItem[];
  compact?: boolean;
}) {
  return (
    <div className={`openui-shadow-grid${compact ? ' openui-shadow-grid--compact' : ''}`}>
      {items.map(({ name, cssVar }) => (
        <div key={cssVar} className="openui-shadow-specimen">
          <div
            className="openui-shadow-specimen__tile"
            style={{ boxShadow: `var(${cssVar})` }}
          />
          <div className="openui-shadow-specimen__meta">
            <p className="openui-shadow-specimen__name">{name}</p>
            <code className="openui-shadow-specimen__var">{cssVar}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
