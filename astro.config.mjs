import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qualiteye.com',
  output: 'static',
  integrations: [
    sitemap({
      // Old URLs are redirect pages, so keep them out of the sitemap.
      filter: page => !/\/(articles|profile)(\/|$)/.test(new URL(page).pathname),
      // Match the canonical URLs, which have no trailing slash.
      serialize: item => ({ ...item, url: item.url.replace(/(?<=[^/])\/$/, '').replace(/^(https:\/\/qualiteye\.com)$/, '$1/') }),
    }),
  ],
  redirects: {
    '/profile': '/resume',
    '/articles/01': '/blog/why-quality-must-start-at-the-product-inception-phase',
    '/articles/02': '/blog/designing-for-testability-what-engineers-get-wrong',
    '/articles/03': '/blog/building-a-quality-first-ci-cd-pipeline-from-zero-to-production-gates',
    '/articles/04': '/blog/playwright-from-scratch-a-complete-setup-guide-with-typescript-and-pom',
    '/articles/05': '/blog/playwright-claude-ai-writing-smarter-tests-with-ai-assistance',
    '/articles/06': '/blog/implementing-snapshot-testing-in-playwright-catch-visual-regressions-early',
    '/articles/07': '/blog/adding-allure-reporting-to-playwright-beautiful-actionable-test-reports',
    '/articles/08': '/blog/quality-gates-in-github-actions-blocking-bad-code-before-it-ships',
    '/articles/09': '/blog/how-to-build-a-quality-first-engineering-culture-as-a-qa-manager',
    '/articles/10': '/blog/how-ai-is-reshaping-the-qa-engineer-role-in-2025-and-beyond',
    '/articles/11': '/blog/shift-right-quality-monitoring-production-as-a-qa-strategy',
    '/articles/12': '/blog/the-qa-maturity-model-where-does-your-team-stand',
  },
});
