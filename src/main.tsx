import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tokens/tokens.css';
import './tokens/surfaces.css';
import './tokens/typography.css';
import './tokens/layout.css';
import './tokens/radius.css';
import './tokens/shadows.css';
import './tokens/motion.css';
import './tokens/elevation.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="openui-app-screen">
      <main className="openui-app-content openui-demo-home">
        <h1 className="openui-demo-home__title">
        OpenUI Design System
        </h1>
        <p className="openui-demo-home__body">
          Run <code>npm run storybook</code> to browse tokens and components.
        </p>
      </main>
    </div>
  </StrictMode>,
);
