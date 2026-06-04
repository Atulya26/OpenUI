import { radiusPrimitive } from '@/tokens/primitives/radius';
import { radiusSemantic } from '@/tokens/semantic/radius';

const ORDER = Object.keys(radiusPrimitive) as Array<keyof typeof radiusPrimitive>;

export function RadiusScale() {
  return (
    <div className="openui-radius-scale">
      <p className="openui-radius-scale__meta">
        Align UI 2.0 corner radius primitives. Product UI should prefer semantic roles (
        <code>--radius-control</code>, <code>--radius-surface</code>) or legacy{' '}
        <code>--layout-radius-*</code> aliases.
      </p>
      <div className="openui-radius-scale__list">
        {ORDER.map((key) => {
          const px = radiusPrimitive[key];
          const size = key === 'full' ? 56 : Math.min(px * 2, 56);
          return (
            <div key={key} className="openui-radius-scale__row">
              <div className="openui-radius-scale__label">
                <code>--radius-{key}</code>
                <span>{px === 9999 ? '9999px' : `${px}px`}</span>
              </div>
              <div
                className="openui-radius-scale__sample"
                style={{
                  width: size,
                  height: size,
                  borderRadius: `var(--radius-${key})`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="openui-radius-scale__semantic">
        <h4 className="openui-radius-scale__heading">Semantic roles</h4>
        <ul className="openui-radius-scale__semantic-list">
          <li>
            <code>--radius-control</code> → <code>--radius-{radiusSemantic.control}</code>
          </li>
          <li>
            <code>--radius-surface</code> → <code>--radius-{radiusSemantic.surface}</code>
          </li>
          <li>
            <code>--radius-surface-lg</code> → <code>--radius-{radiusSemantic.surfaceLg}</code>
          </li>
          <li>
            <code>--radius-pill</code> → <code>--radius-{radiusSemantic.pill}</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
