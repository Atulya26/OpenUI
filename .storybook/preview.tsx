import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import '../src/tokens/typography.css';
import '../src/tokens/layout.css';
import '../src/tokens/radius.css';
import '../src/tokens/shadows.css';
import '../src/tokens/motion.css';
import '../src/styles/global.css';
import '../src/styles/storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'canvas',
      options: {
        canvas: { name: 'Canvas', value: 'var(--color-bg-weak50)' },
        light: { name: 'Light', value: '#F7F7F7' },
        dark: { name: 'Dark', value: '#171717' },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    backgrounds: { value: 'canvas' },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return (
        <div className="openui-canvas">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
