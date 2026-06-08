import { zIndexPrimitive } from '@/tokens';

export type ElevationLayerItem = {
  label: string;
  zVar: string;
  shadowVar?: string;
  tone?: 'neutral' | 'accent' | 'scrim';
};

function zValueForVar(zVar: string): number | undefined {
  const key = zVar.replace(/^--z-/, '') as keyof typeof zIndexPrimitive;
  return zIndexPrimitive[key];
}

export function ElevationStackDemo({ layers }: { layers: ElevationLayerItem[] }) {
  return (
    <div className="openui-elevation-ladder" aria-hidden>
      <p className="openui-elevation-ladder__hint">Bottom of stack</p>
      <ol className="openui-elevation-ladder__list">
        {layers.map((layer, index) => {
          const zValue = zValueForVar(layer.zVar);
          return (
            <li
              key={layer.zVar}
              className={`openui-elevation-ladder__step openui-elevation-ladder__step--${layer.tone ?? 'neutral'}`}
            >
              <span className="openui-elevation-ladder__rank">{index + 1}</span>
              <div className="openui-elevation-ladder__body">
                <span className="openui-elevation-ladder__label">{layer.label}</span>
                <div className="openui-elevation-ladder__meta">
                  <code className="openui-elevation-ladder__var">{layer.zVar}</code>
                  {zValue !== undefined ? (
                    <span className="openui-elevation-ladder__value">{zValue}</span>
                  ) : null}
                </div>
                {layer.shadowVar ? (
                  <code className="openui-elevation-ladder__shadow">{layer.shadowVar}</code>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="openui-elevation-ladder__hint openui-elevation-ladder__hint--top">Top of stack</p>
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
