import {
  waitForPageReady,
  type TestRunnerConfig,
} from '@storybook/test-runner';

const iphoneViewport = {
  width: 402,
  height: 874,
} as const;

const visualMatrix = [
  { theme: 'light', density: 'comfortable', dir: 'ltr' },
  { theme: 'dark', density: 'comfortable', dir: 'ltr' },
  { theme: 'light', density: 'compact', dir: 'ltr' },
  { theme: 'dark', density: 'compact', dir: 'ltr' },
  { theme: 'light', density: 'comfortable', dir: 'rtl' },
] as const;

const interactiveSelectors = [
  'button:not([disabled])',
  'a[href]:not([aria-disabled="true"])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="checkbox"]:not([aria-disabled="true"])',
  '[role="radio"]:not([aria-disabled="true"])',
  '[role="switch"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[role="option"]:not([aria-disabled="true"])',
].join(',');

const config: TestRunnerConfig = {
  async preVisit(page) {
    await page.setViewportSize(iphoneViewport);
  },

  async postVisit(page, story) {
    await waitForPageReady(page);

    for (const state of visualMatrix) {
      await page.evaluate(({ theme, density, dir }) => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('dir', dir);

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
          `${story.id} overflowed the iPhone viewport in ${state.theme}/${state.density}/${state.dir}: ` +
            `${overflow.documentScrollWidth}px > ${overflow.viewportWidth}px`,
        );
      }

      if (state.density === 'comfortable') {
        const undersizedTargets = await page.evaluate((selector) => {
          const shellSelectors = [
            '.openui-input-shell',
            '.openui-search-bar__field',
            '.openui-textarea',
            '.openui-select__shell',
            '.openui-checkbox',
            '.openui-radio',
          ].join(',');

          function parsePx(value: string): number {
            const parsed = Number.parseFloat(value);
            return Number.isFinite(parsed) ? parsed : 0;
          }

          function resolveAuditTarget(element: HTMLElement): HTMLElement {
            if (
              element instanceof HTMLInputElement ||
              element instanceof HTMLTextAreaElement ||
              element instanceof HTMLSelectElement
            ) {
              return element.closest<HTMLElement>(shellSelectors) ?? element;
            }

            return element;
          }

          function expandedByPseudoHitArea(element: HTMLElement) {
            let width = element.offsetWidth;
            let height = element.offsetHeight;

            for (const pseudo of ['::before', '::after'] as const) {
              const style = window.getComputedStyle(element, pseudo);
              if (
                style.content === 'none' ||
                style.content === 'normal' ||
                style.position !== 'absolute'
              ) {
                continue;
              }

              const inlineStart = parsePx(style.insetInlineStart || style.left);
              const inlineEnd = parsePx(style.insetInlineEnd || style.right);
              const blockStart = parsePx(style.insetBlockStart || style.top);
              const blockEnd = parsePx(style.insetBlockEnd || style.bottom);

              width = Math.max(width, element.offsetWidth - inlineStart - inlineEnd);
              height = Math.max(height, element.offsetHeight - blockStart - blockEnd);
            }

            return { width, height };
          }

          const root = document.getElementById('storybook-root') ?? document.body;
          const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));

          return elements.flatMap((element) => {
            if (element.closest('[data-openui-touch-audit="ignore"]')) {
              return [];
            }

            if (element.closest('[data-density="compact"]')) {
              return [];
            }

            const style = window.getComputedStyle(element);
            if (
              style.display === 'none' ||
              style.visibility === 'hidden' ||
              style.pointerEvents === 'none'
            ) {
              return [];
            }

            const target = resolveAuditTarget(element);
            if (target.offsetWidth === 0 || target.offsetHeight === 0) {
              return [];
            }

            const hitArea = expandedByPseudoHitArea(target);
            if (hitArea.width >= 44 && hitArea.height >= 44) {
              return [];
            }

            const label =
              element.getAttribute('aria-label') ||
              element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 40) ||
              element.tagName.toLowerCase();

            return [`${label}: ${Math.round(hitArea.width)}×${Math.round(hitArea.height)}`];
          });
        }, interactiveSelectors);

        if (undersizedTargets.length > 0) {
          throw new Error(
            `${story.id} has interactive targets below 44×44 in ${state.theme}/${state.dir}: ` +
              undersizedTargets.slice(0, 8).join(', '),
          );
        }
      }
    }

    await page.evaluate(() => {
      document.documentElement.removeAttribute('dir');
      document.documentElement.removeAttribute('data-density');
    });
  },
};

export default config;
