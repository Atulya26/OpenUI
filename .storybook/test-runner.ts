import {
  waitForPageReady,
  type TestRunnerConfig,
} from '@storybook/test-runner';

const iphoneViewport = {
  width: 402,
  height: 874,
} as const;

const visualMatrix = [
  { theme: 'light', density: 'comfortable' },
  { theme: 'dark', density: 'comfortable' },
  { theme: 'light', density: 'compact' },
  { theme: 'dark', density: 'compact' },
] as const;

const config: TestRunnerConfig = {
  async preVisit(page) {
    await page.setViewportSize(iphoneViewport);
  },

  async postVisit(page, story) {
    await waitForPageReady(page);

    for (const state of visualMatrix) {
      await page.evaluate(({ theme, density }) => {
        document.documentElement.setAttribute('data-theme', theme);

        if (density === 'compact') {
          document.documentElement.setAttribute('data-density', density);
        } else {
          document.documentElement.removeAttribute('data-density');
        }
      }, state);

      await page.waitForTimeout(50);

      const overflow = await page.evaluate(() => {
        const root = document.getElementById('storybook-root') ?? document.body;
        const viewportWidth = document.documentElement.clientWidth;
        const documentScrollWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body?.scrollWidth ?? 0,
          root.scrollWidth,
        );

        return {
          viewportWidth,
          documentScrollWidth,
        };
      });

      if (overflow.documentScrollWidth > overflow.viewportWidth + 1) {
        throw new Error(
          `${story.id} overflowed the iPhone viewport in ${state.theme}/${state.density}: ` +
            `${overflow.documentScrollWidth}px > ${overflow.viewportWidth}px`,
        );
      }
    }
  },
};

export default config;
