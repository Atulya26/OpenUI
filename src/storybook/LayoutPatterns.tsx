import { Home } from '@/components/Icon/icons';
import { Icon } from '@/components/Icon';

export function StackGapDemo({
  token,
  label,
}: {
  token: string;
  label: string;
}) {
  return (
    <div className="openui-layout-stack-demo">
      <p className="openui-layout-stack-demo__label">{label}</p>
      <div
        className="openui-layout-stack-demo__stack"
        style={{ gap: `var(--layout-gap-stack-${token})` }}
      >
        <div className="openui-layout-block">Row A</div>
        <div className="openui-layout-block">Row B</div>
        <div className="openui-layout-block">Row C</div>
      </div>
    </div>
  );
}

export function InlineGapDemo() {
  return (
    <div
      className="openui-layout-inline-demo"
      style={{ gap: 'var(--layout-gap-inline-sm)' }}
    >
      <Icon icon={Home} size="md" color="strong" />
      <span>gap-inline-sm between icon and label</span>
    </div>
  );
}

export function TouchTargetDemo() {
  return (
    <div className="openui-layout-touch-demo">
      <button type="button" className="openui-layout-touch-btn">
        <Icon icon={Home} size="md" color="strong" />
      </button>
      <p className="openui-layout-touch-demo__caption">
        Min {`var(--layout-touch-target-min)`} × min width/height
      </p>
    </div>
  );
}

export function GridColumnsDemo() {
  return (
    <div className="openui-layout-grid-compare">
      <div className="openui-layout-grid-col">
        <p className="openui-layout-grid-col__title">1 column</p>
        <div className="openui-layout-grid openui-layout-grid--1">
          <div className="openui-layout-block">Card</div>
          <div className="openui-layout-block">Card</div>
        </div>
      </div>
      <div className="openui-layout-grid-col">
        <p className="openui-layout-grid-col__title">2 columns ≥ tablet</p>
        <div className="openui-layout-grid openui-layout-grid--2">
          <div className="openui-layout-block">Card</div>
          <div className="openui-layout-block">Card</div>
        </div>
      </div>
    </div>
  );
}

export function FormStackPattern() {
  return (
    <div className="openui-layout-form">
      <div className="openui-layout-form__field">
        <label htmlFor="layout-demo-email">Email</label>
        <input id="layout-demo-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="openui-layout-form__field">
        <label htmlFor="layout-demo-password">Password</label>
        <input id="layout-demo-password" type="password" />
      </div>
      <button type="button" className="openui-layout-form__submit">
        Continue
      </button>
    </div>
  );
}
