export type ElevationLayerItem = {
  label: string;
  zVar: string;
  shadowVar?: string;
  tone?: 'neutral' | 'accent' | 'scrim';
};

export function ElevationStackDemo({ layers }: { layers: ElevationLayerItem[] }) {
  return (
    <div className="openui-elevation-stack" aria-hidden>
      {layers.map((layer, index) => (
        <div
          key={layer.zVar}
          className={`openui-elevation-stack__layer openui-elevation-stack__layer--${layer.tone ?? 'neutral'}`}
          style={{
            zIndex: `var(${layer.zVar})`,
            boxShadow: layer.shadowVar ? `var(${layer.shadowVar})` : undefined,
            ['--elevation-stack-index' as string]: index,
          }}
        >
          <span className="openui-elevation-stack__label">{layer.label}</span>
          <code className="openui-elevation-stack__var">{layer.zVar}</code>
        </div>
      ))}
    </div>
  );
}

export function ElevationRoleGrid({
  items,
}: {
  items: {
    role: string;
    levelVar: string;
    shadowVar: string;
    zVar: string;
  }[];
}) {
  return (
    <div className="openui-elevation-role-grid">
      {items.map((item) => (
        <div key={item.role} className="openui-elevation-role-card">
          <div
            className="openui-elevation-role-card__tile"
            style={{
              boxShadow: `var(${item.shadowVar})`,
              zIndex: `var(${item.zVar})`,
            }}
          />
          <div className="openui-elevation-role-card__meta">
            <p className="openui-elevation-role-card__name">{item.role}</p>
            <code className="openui-elevation-role-card__var">{item.levelVar}</code>
            <code className="openui-elevation-role-card__var">{item.shadowVar}</code>
            <code className="openui-elevation-role-card__var">{item.zVar}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
