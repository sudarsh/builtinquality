// ── ARTICLES DATA ──
// To add a new article:
//   1. Add a new object to this array
//   2. Increment `num` (e.g. '13')
//   3. Fill in all fields including `body` (supports Markdown)
//   4. Save — it automatically appears on the homepage and gets its own page

const articles = [
  {
    num: '01', file: '01-quality-at-inception.html', tag: 'quality', tagLabel: 'Quality Culture', date: 'Jan 08, 2025',
    title: 'Why Quality Must Start at the Product Inception Phase',
    excerpt: 'Most teams bolt quality on at the end. The highest-performing engineering orgs bake it into the very first conversation. Here\'s how to make that shift.',
    read: '8 min read',
    body: `
Most engineering teams think about quality too late. It shows up as a testing phase at the end of the sprint, a QA sign-off before deployment, or a bug bash before a major release. But by the time code is written, the cost of fixing quality issues has already compounded — and the opportunity to prevent them has passed.

## The Cost of Late Quality

When quality is a phase, it becomes a bottleneck. QA engineers receive a feature with three days left in the sprint. They find bugs. Developers context-switch back to fix them. The sprint slips. Stakeholders get frustrated. The team ships anyway, carrying forward a debt of untested edge cases.

This isn't a testing problem. It's an **inception problem**.

## What "Shifting Left" Actually Means

Shifting left isn't just about writing tests earlier. It's about making quality a participant in every conversation that shapes the software — from the first product brief to the first wireframe.

In practice, this looks like:

- **QA in requirements review** — asking "how do we know this works?" before a line of code is written
- **Acceptance criteria as test cases** — turning user stories into verifiable outcomes, not vague descriptions
- **Definition of Done that includes test coverage** — treating untested code as incomplete code
- **Three Amigos sessions** — product, dev, and QA refining stories together before they enter the sprint

## The Business Case

The numbers are well-established: a defect caught in requirements costs a fraction of one caught in production. But beyond cost, there's a velocity argument. Teams that build quality in move faster because they spend less time firefighting, less time context-switching, and less time explaining why the release is delayed.

> Quality at inception isn't about slowing down to check. It's about building so clearly that checking becomes easy.

## How to Start

You don't need to overhaul your process overnight. Start with one habit: **before any story is sprint-ready, someone must answer "how will we know this is correct?"**

If the answer is vague, the story isn't ready. That single question — asked consistently — will shift more quality left than any tool you adopt.

## What Changes for QA Engineers

When QA moves to inception, the role transforms. Instead of running tests on finished code, QA engineers become **quality advocates in planning**. They identify edge cases in requirements, challenge assumptions in designs, and help define what "done" actually means.

This is more valuable, more collaborative, and frankly more interesting work than regression testing at sprint's end.

## Conclusion

The teams that ship with confidence aren't the ones with the best testing tools. They're the ones who decided, early on, that quality isn't something you check — it's something you build.

Start the conversation at inception. Everything downstream gets easier.
`
  },
  {
    num: '02', file: '02-designing-for-testability.html', tag: 'quality', tagLabel: 'Design Quality', date: 'Feb 14, 2025',
    title: 'Designing for Testability — What Engineers Get Wrong',
    excerpt: 'If your UI is hard to automate, that\'s a design problem. A deep look at how product and design teams can build testability into every screen from day one.',
    read: '6 min read',
    body: `
Testability is rarely on a designer's checklist. It's not in most product requirement templates. And yet, the decisions made in Figma or during architecture reviews determine 80% of how painful your automation will be.

## The Hidden Cost of Untestable UIs

When elements don't have stable identifiers, when modals block the DOM in unexpected ways, when dynamic content shifts element positions — automation engineers spend hours writing brittle workarounds instead of meaningful tests.

This isn't an automation problem. It's a design and architecture problem.

## What Testable Design Looks Like

**Meaningful test IDs** — Every interactive element should have a \`data-testid\` attribute. Not \`data-testid="button"\`, but \`data-testid="checkout-submit-btn"\`. Descriptive, stable, and scoped.

**Predictable states** — Loading states, error states, empty states should all be distinct and identifiable. An automation engineer needs to know definitively when a page has finished loading.

**Accessible markup** — ARIA roles and labels aren't just for screen readers. They're stable selectors that survive styling changes. Accessible UIs are testable UIs.

**Stable DOM structure** — Avoid deeply nested dynamic wrappers. The more layers between a user action and its DOM target, the more brittle the test.

## The Engineering Side

On the backend, testability means:

- **Seeding mechanisms** — Can you create known test data without manual setup?
- **Feature flags** — Can you enable/disable features deterministically in tests?
- **Predictable IDs** — Sequential or deterministic IDs make assertions reliable.
- **Clock control** — Date-dependent logic needs controllable time.

## A Practical Checklist

Before any feature ships to QA, ask these questions:

1. Can every interactive element be uniquely selected?
2. Are all async operations clearly signalled in the UI?
3. Is there a way to seed the required test data programmatically?
4. Are error and edge-case states visually distinct and identifiable?

## Conclusion

Testability is a design discipline. When it's baked in, automation is a pleasure to write. When it's absent, automation becomes archaeology — digging through layers of generated classnames hoping something doesn't move.

Add a QA voice to your design reviews. It pays off immediately.
`
  },
  {
    num: '03', file: '03-cicd-pipeline.html', tag: 'cicd', tagLabel: 'CI / CD', date: 'Mar 22, 2025',
    title: 'Building a Quality-First CI/CD Pipeline — From Zero to Production Gates',
    excerpt: 'A complete walkthrough of setting up a CI/CD pipeline with quality gates at every stage — lint, unit, integration, E2E, and performance checks before every deploy.',
    read: '12 min read',
    body: `
A CI/CD pipeline that only runs builds and deploys is a delivery pipeline, not a quality pipeline. The distinction matters. A quality-first pipeline treats every stage as a gate — a point where code must prove itself before moving forward.

## The Pipeline Stages

### Stage 1: Static Analysis (< 2 min)
Lint, type checks, and security scans. Fast, cheap, no infrastructure needed.

\`\`\`yaml
- name: Lint & Type Check
  run: |
    npm run lint
    npx tsc --noEmit
\`\`\`

Fail fast here. Don't let badly-formatted or type-unsafe code waste later stages.

### Stage 2: Unit Tests (< 5 min)
Pure logic tests with no external dependencies. Coverage threshold enforced.

\`\`\`yaml
- name: Unit Tests
  run: npm run test:unit -- --coverage
  env:
    COVERAGE_THRESHOLD: 80
\`\`\`

### Stage 3: Integration Tests (< 15 min)
Service-level tests against real databases and APIs in a containerised environment.

### Stage 4: E2E Tests (< 20 min)
Playwright tests running against a staging environment that mirrors production.

### Stage 5: Performance Budget
Lighthouse CI or k6 load tests. Block if key metrics regress beyond threshold.

## Quality Gates vs. Advisory Checks

Not every check needs to block deployment. Be intentional:

| Check | Block deploy? |
|-------|--------------|
| Lint errors | Yes |
| Unit test failures | Yes |
| Coverage drop > 5% | Yes |
| E2E failures | Yes |
| Performance regression | Warn only (initially) |
| Visual diffs | Warn only |

## The Shift: From "Does It Build?" to "Does It Work?"

The cultural shift that matters most is changing the definition of a passing pipeline. A green build that skips tests is worse than a red build — it creates false confidence.

Every team member should understand what each gate tests and why it's there.

## Conclusion

A quality-first pipeline is the most reliable QA engineer you'll ever hire. It works every commit, never gets tired, and never ships something it hasn't verified. Build it once, maintain it always.
`
  },
  {
    num: '04', file: '04-playwright-setup.html', tag: 'playwright', tagLabel: 'Playwright', date: 'May 05, 2025',
    title: 'Playwright from Scratch — A Complete Setup Guide with TypeScript and POM',
    excerpt: 'Step-by-step guide to setting up a production-ready Playwright framework using TypeScript, Page Object Model, fixtures, and custom reporters.',
    read: '15 min read',
    body: `
Playwright is the best end-to-end testing framework available today. This guide walks through setting up a production-ready framework — not just the hello-world install, but the structure and patterns you'll want when your test suite scales to hundreds of tests.

## Installation

\`\`\`bash
npm init playwright@latest
\`\`\`

Choose TypeScript, place tests in \`tests/\`, and add a GitHub Actions workflow.

## Project Structure

\`\`\`
tests/
├── e2e/              # test specs
├── pages/            # Page Object Models
├── fixtures/         # custom fixtures
├── helpers/          # shared utilities
└── data/             # test data
playwright.config.ts
\`\`\`

## Page Object Model

Each page or component gets its own class. This isolates selectors and keeps tests readable.

\`\`\`typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;

  constructor(private page: Page) {
    this.emailInput   = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitBtn    = page.getByTestId('login-submit');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }
}
\`\`\`

## Custom Fixtures

Fixtures handle setup and teardown cleanly, and make POMs available across all tests.

\`\`\`typescript
// fixtures/index.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = { loginPage: LoginPage };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
\`\`\`

## Configuration

Key settings for a production config:

\`\`\`typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
\`\`\`

## Conclusion

This structure scales. As your test suite grows, the POM pattern keeps selectors centralized, fixtures keep setup DRY, and the config handles environment-specific behaviour cleanly. Start here and you won't need to refactor later.
`
  },
  {
    num: '05', file: '05-playwright-claude-ai.html', tag: 'ai', tagLabel: 'AI + Testing', date: 'Jun 18, 2025',
    title: 'Playwright + Claude AI — Writing Smarter Tests with AI Assistance',
    excerpt: 'How I use Claude Code to generate, review, and refactor Playwright tests — cutting test authoring time by 60% without sacrificing quality or coverage.',
    read: '10 min read',
    body: `
AI won't replace QA engineers. But QA engineers who use AI will outpace those who don't. Here's how I've integrated Claude Code into my daily Playwright workflow — and what actually works versus what sounds good in theory.

## What AI Does Well in Testing

**Generating boilerplate** — Page Object Models, fixture setups, and config files are highly structured and repetitive. Claude generates them correctly in seconds.

**Suggesting edge cases** — Given a feature description, Claude surfaces negative paths, boundary conditions, and accessibility concerns I might miss on the first pass.

**Refactoring brittle tests** — Pasting a test that uses fragile CSS selectors and asking Claude to rewrite it with \`getByRole\` and \`getByTestId\` is a massive time saver.

**Explaining failures** — When a test fails with a cryptic Playwright error, describing the failure to Claude often produces the diagnosis faster than reading docs.

## What AI Gets Wrong

AI doesn't know your application. It will generate syntactically correct tests against elements that don't exist in your DOM. Every AI-generated test needs human review before it runs.

It also tends toward over-assertion — checking too many things in a single test, making it brittle and hard to diagnose when it fails.

## My Workflow

1. Write the test intent in plain English
2. Use Claude to generate the initial POM and spec
3. Run it — it will fail (elements won't match)
4. Correct selectors by inspecting the real DOM
5. Run again, refine assertions
6. Ask Claude to review for coverage gaps

The AI handles the structure; I handle the domain knowledge.

## The 60% Time Saving

This isn't about AI writing tests for you. It's about eliminating the time spent on ceremony — imports, class structure, async patterns, fixture wiring. That scaffolding is where most test-writing time goes. AI eliminates it.

The remaining 40% — understanding the feature, identifying what actually matters to assert, catching the edge cases that matter — that's still human work.

## Conclusion

The best use of AI in testing is as an accelerator for the parts that don't require deep domain knowledge. Use it that way and your output doubles. Expect it to replace judgment and you'll spend more time fixing AI mistakes than writing tests yourself.
`
  },
  {
    num: '06', file: '06-snapshot-testing.html', tag: 'testing', tagLabel: 'Snapshot Testing', date: 'Aug 02, 2025',
    title: 'Implementing Snapshot Testing in Playwright — Catch Visual Regressions Early',
    excerpt: 'A practical guide to visual snapshot testing with Playwright — how to set baselines, handle dynamic content, and integrate visual checks into your CI pipeline.',
    read: '9 min read',
    body: `
Visual bugs are real bugs. A layout shift, a colour regression, a truncated label — these reach users and damage trust, yet they're invisible to functional tests. Snapshot testing fills this gap.

## How Playwright Visual Testing Works

Playwright captures a screenshot of a component or page and compares it pixel-by-pixel against a stored baseline. If the diff exceeds a threshold, the test fails.

\`\`\`typescript
test('homepage hero looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('hero.png', { maxDiffPixels: 100 });
});
\`\`\`

On first run, the screenshot is saved as the baseline. Subsequent runs compare against it.

## Setting Baselines

Run once with \`--update-snapshots\` to generate your initial baselines. Commit these to source control — they're the source of truth for what the UI should look like.

\`\`\`bash
npx playwright test --update-snapshots
\`\`\`

## Handling Dynamic Content

Dynamic content — dates, user names, animated elements — will cause false failures. Mask them:

\`\`\`typescript
await expect(page).toHaveScreenshot('dashboard.png', {
  mask: [page.getByTestId('user-greeting'), page.getByTestId('live-clock')]
});
\`\`\`

## CI Integration

Visual tests are slow and should run on a dedicated step, not blocking every commit:

\`\`\`yaml
- name: Visual Regression Tests
  run: npx playwright test tests/visual/
  continue-on-error: true  # warn, don't block initially
\`\`\`

As confidence grows, move this to a blocking gate.

## Component-Level vs Page-Level

Page-level snapshots are brittle — any content change anywhere fails the test. Prefer **component-level** snapshots that isolate what you're testing.

## Conclusion

Visual regression testing catches a category of bugs that no amount of functional testing will find. Set it up once, commit your baselines, and let CI guard your UI automatically.
`
  },
  {
    num: '07', file: '07-allure-reporting.html', tag: 'playwright', tagLabel: 'Playwright', date: 'Sep 15, 2025',
    title: 'Adding Allure Reporting to Playwright — Beautiful, Actionable Test Reports',
    excerpt: 'How to set up Allure Reporter with Playwright for rich, interactive test reports — with screenshots, traces, step-level breakdowns, and CI integration.',
    read: '7 min read',
    body: `
The default Playwright HTML report is useful during development. But for teams and stakeholders, you need something richer — something that tells the story of a test run, not just its outcome. Allure delivers that.

## Installation

\`\`\`bash
npm install -D allure-playwright allure-commandline
\`\`\`

Add to \`playwright.config.ts\`:

\`\`\`typescript
reporter: [
  ['line'],
  ['allure-playwright', { outputFolder: 'allure-results' }]
],
\`\`\`

## Generating the Report

\`\`\`bash
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
\`\`\`

## What Allure Adds

**Step-level breakdown** — Each test step is visible with timing. When a test fails, you see exactly which step failed and why.

**Automatic attachments** — Screenshots on failure, traces, and videos are embedded directly in the test result.

**Categorised failures** — Allure distinguishes between product bugs, test bugs, and broken tests. This is critical for understanding whether failures are in your code or your tests.

**History and trends** — Running Allure over time shows flakiness trends, duration trends, and failure patterns.

## Adding Custom Steps

\`\`\`typescript
import { allure } from 'allure-playwright';

test('user can checkout', async ({ page }) => {
  await allure.step('Navigate to cart', async () => {
    await page.goto('/cart');
  });
  await allure.step('Complete checkout', async () => {
    await page.getByTestId('checkout-btn').click();
  });
});
\`\`\`

## CI Integration

Publish the report as a CI artifact:

\`\`\`yaml
- name: Generate Allure Report
  run: npx allure generate allure-results --clean -o allure-report
  if: always()

- uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report/
  if: always()
\`\`\`

## Conclusion

Allure transforms test results from a pass/fail summary into an actionable diagnostic tool. Once your team experiences step-level failure context with embedded traces, going back to basic reporters feels like a downgrade.
`
  },
  {
    num: '08', file: '08-github-actions-gates.html', tag: 'cicd', tagLabel: 'Pipeline', date: 'Oct 28, 2025',
    title: 'Quality Gates in GitHub Actions — Blocking Bad Code Before It Ships',
    excerpt: 'How to configure GitHub Actions workflows with strict quality gates — fail fast on test failures, coverage thresholds, and performance budgets.',
    read: '11 min read',
    body: `
A GitHub Actions workflow that doesn't block on quality failures isn't a quality pipeline — it's a deployment script with decoration. Quality gates must have teeth: they block the merge, they block the deploy, and they report clearly why.

## The Gate Architecture

Design your workflow as a series of required jobs. Each job is a gate. The deploy job only runs if all gates pass.

\`\`\`yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint

  unit-tests:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage

  e2e-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test

  deploy:
    needs: [lint, unit-tests, e2e-tests]
    if: success()
    runs-on: ubuntu-latest
    steps:
      - run: echo "All gates passed — deploying"
\`\`\`

## Coverage Enforcement

Don't just run tests — enforce a minimum coverage threshold:

\`\`\`yaml
- name: Check Coverage
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "Coverage $COVERAGE% is below 80% threshold"
      exit 1
    fi
\`\`\`

## Branch Protection Rules

Quality gates only work if the branch is protected. In GitHub repository settings:

- Require status checks before merging
- Mark each workflow job as a required check
- Require branches to be up to date before merging

Without branch protection, developers can bypass the gates with a direct push.

## Parallelising for Speed

Run independent gates in parallel. Lint and unit tests can run simultaneously. E2E can shard across multiple runners.

\`\`\`yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/4
\`\`\`

## Conclusion

GitHub Actions is powerful enough to enforce whatever quality bar your team sets. The limiting factor is never the tooling — it's the willingness to make the gates required and hold the line when they fail.
`
  },
  {
    num: '09', file: '09-quality-culture.html', tag: 'quality', tagLabel: 'Engineering Culture', date: 'Nov 20, 2025',
    title: 'How to Build a Quality-First Engineering Culture as a QA Manager',
    excerpt: 'Quality culture doesn\'t come from tools — it comes from how your team thinks. A management playbook for embedding quality mindset across product, dev, and QA.',
    read: '13 min read',
    body: `
You can give a team the best tools in the world — Playwright, GitHub Actions, Allure, k6 — and still ship bad software if the culture doesn't value quality. Tools amplify culture. They don't create it.

This is a playbook for building the culture first.

## What Quality Culture Actually Looks Like

A quality-first culture isn't a team where QA is feared or where developers resent test coverage requirements. It's a team where:

- **Developers write tests as part of their definition of done**
- **Product managers include acceptance criteria that are testable**
- **Designers consider edge cases and error states in their specs**
- **"Who will test this?" is asked in planning, not after the fact**

## The Manager's Role

Culture is set at the top. If the engineering manager celebrates shipping velocity above all else, the team will cut quality to hit dates. If they celebrate reliability and invest time in automation, the team follows.

The most powerful thing a QA manager can do is **make quality visible**. Report on it in standups, in sprint reviews, in executive updates. What gets measured gets valued.

## Practical Steps

**1. Own the Definition of Done together** — Work with the team to define what "done" means. Insist that "tests written and passing" is non-negotiable.

**2. Run Three Amigos sessions** — Before a story starts development, bring product, dev, and QA together to align on what the feature does and how it will be verified.

**3. Celebrate catches, not just bugs found** — When a developer's unit test catches a regression, call it out. Positive reinforcement shapes culture faster than mandates.

**4. Invest in testability** — Advocate for engineering time to improve test infrastructure. A flaky test suite erodes culture because it makes quality feel unattainable.

**5. Treat test failures as signal, not noise** — When tests fail in CI, investigate. Don't re-run until green. That habit is where quality culture goes to die.

## The Hardest Part: Cross-Functional Influence

QA managers rarely have authority over product managers or developers. Influence is the tool. Build it by:

- Being the most prepared person in requirements discussions
- Bringing data — defect escape rates, time-to-detect, production incident counts
- Making QA's value visible through reporting and retrospectives

## Conclusion

Culture change is slow. But it's also durable. The team that has internalised quality doesn't need a QA gate to ship reliably — they've built quality into how they think about work. That's the goal.
`
  },
  {
    num: '10', file: '10-ai-reshaping-qa.html', tag: 'ai', tagLabel: 'AI + QA', date: 'Dec 10, 2025',
    title: 'How AI is Reshaping the QA Engineer Role in 2025 and Beyond',
    excerpt: 'AI won\'t replace QA engineers — but it will change everything they do. A clear-eyed look at what shifts, what stays, and how to future-proof your QA career.',
    read: '9 min read',
    body: `
Every few years a new technology prompts the question: "Will this replace QA engineers?" The answer has always been no — but that doesn't mean nothing changes. AI is the biggest shift the QA role has seen, and the engineers who adapt will be more valuable, not less.

## What AI Is Already Doing

**Test generation** — AI tools generate Playwright and Cypress tests from descriptions, UI screenshots, or recorded interactions. The quality varies, but the scaffolding is often correct.

**Failure analysis** — AI can parse test failure logs and suggest root causes with reasonable accuracy. This reduces the time from "test red" to "root cause understood."

**Test maintenance** — When a locator breaks, AI can suggest the corrected selector based on the new DOM structure.

**Coverage analysis** — Given a feature description and existing test suite, AI identifies gaps in coverage that human reviewers miss.

## What AI Cannot Do

**Understand business risk** — AI doesn't know that this particular checkout flow generates 60% of revenue and deserves deeper coverage than the profile settings page. That judgment is human.

**Define what "correct" means** — AI can verify that a button exists and is clickable. It cannot determine whether clicking it does the right thing in a business context.

**Navigate ambiguity** — Real testing lives in the grey areas. What should happen when two conflicting requirements both apply? AI escalates; QA engineers resolve.

**Build stakeholder trust** — When a release decision is being made, someone needs to say "I'm confident this is ready." That confidence comes from a human who has tested it.

## The Shifting Skill Set

The QA engineer of 2026 needs:

- Ability to evaluate and curate AI-generated tests (not just write them)
- Stronger product and domain knowledge (to provide context AI lacks)
- Data literacy (to make quality decisions from metrics, not intuition)
- Engineering depth (to maintain frameworks that AI generates into)

Less emphasis on:
- Manually scripting boilerplate test code
- Basic selector troubleshooting
- Repetitive regression execution

## Future-Proofing Your Career

The engineers most at risk are those doing only manual, repetitive, low-judgment work. The engineers best positioned are those operating at the intersection of quality strategy, engineering, and product understanding.

Invest in understanding the product deeply. Invest in automation engineering. Use AI as an accelerant for the mechanical work so you can focus on the judgment work.

## Conclusion

AI raises the floor of what a QA engineer can produce and raises the ceiling of what an excellent QA engineer is expected to deliver. This is a good thing. Adapt, and the role becomes more strategic, more influential, and more interesting.
`
  },
  {
    num: '11', file: '11-shift-right-quality.html', tag: 'testing', tagLabel: 'Observability', date: 'Jan 22, 2026',
    title: 'Shift-Right Quality — Monitoring Production as a QA Strategy',
    excerpt: 'Testing before deployment isn\'t enough. Here\'s how to extend your quality strategy into production with monitoring, alerting, and real-user feedback loops.',
    read: '8 min read',
    body: `
Shift-left gets all the attention — and rightly so. Catching defects early is cheaper and faster. But the best quality strategies don't stop at deployment. They extend into production, treating live monitoring as the final quality layer.

## Why Pre-Production Testing Has Limits

No test environment perfectly mirrors production. Real users generate combinations of state, data, and behaviour that no test suite anticipates. Infrastructure at scale behaves differently than staging. Third-party integrations fail in ways that only appear under real load.

Pre-deployment quality gates reduce defect escape rate. They don't eliminate it. The question is: when something does escape, how quickly do you know?

## The Shift-Right Toolkit

**Error monitoring** — Tools like Sentry capture production exceptions with full stack traces and context. Every unhandled error in production is a failed test case you didn't know to write.

**Real User Monitoring (RUM)** — Track page load times, interaction delays, and JavaScript errors from real user sessions. Performance that passes Lighthouse in CI can still degrade under production load patterns.

**Synthetic monitoring** — Scheduled Playwright tests that run against production. Not exploratory — a small suite of critical paths running every 5 minutes. Your first alert when something breaks.

**Log-based alerting** — Alert on elevated error rates in application logs before users start filing tickets.

## Synthetic Monitoring in Practice

\`\`\`typescript
// Critical path: user can log in and reach dashboard
test('production smoke: login flow', async ({ page }) => {
  await page.goto(process.env.PROD_URL + '/login');
  await page.getByTestId('email').fill(process.env.SMOKE_USER_EMAIL);
  await page.getByTestId('password').fill(process.env.SMOKE_USER_PASSWORD);
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL(/dashboard/);
});
\`\`\`

Run this on a cron every 5 minutes. Alert on failure. This is your production canary.

## Closing the Feedback Loop

Production monitoring only improves quality if findings flow back into the test suite. When a production incident occurs:

1. Write the test that would have caught it
2. Add it to the regression suite
3. Ensure the synthetic monitoring covers the scenario going forward

This is how quality compounds over time.

## Conclusion

Shift-right quality treats production as a continuous testing environment. Combined with strong pre-deployment gates, it creates a quality feedback loop that makes your systems progressively more reliable with every incident.
`
  },
  {
    num: '12', file: '12-qa-maturity-model.html', tag: 'cicd', tagLabel: 'Strategy', date: 'Mar 05, 2026',
    title: 'The QA Maturity Model — Where Does Your Team Stand?',
    excerpt: 'A practical framework for assessing your team\'s quality maturity — from ad-hoc manual testing to fully automated, AI-assisted continuous quality engineering.',
    read: '10 min read',
    body: `
Most teams think they're further along in quality maturity than they are. Not because they're wrong about what they've built — but because they're missing a clear framework for what "advanced" actually looks like.

This is the model I use to assess teams and plan their quality roadmap.

## The Five Levels

### Level 1 — Reactive
**Characteristics:** Testing happens after development, manually, often by the developer who built the feature. No test documentation. Bugs found in production are the primary quality signal.

**What it feels like:** Every release is stressful. Production incidents are frequent. The team doesn't know what "enough testing" means.

### Level 2 — Repeatable
**Characteristics:** A defined testing phase exists. Test cases are written, if not always automated. A QA role exists, even if informal. Regression testing happens before major releases.

**What it feels like:** Quality is a phase, not a practice. The QA engineer is a gatekeeper, not a collaborator.

### Level 3 — Defined
**Characteristics:** Automation exists for regression. CI runs tests on every commit. Coverage is measured. Processes are documented and followed consistently.

**What it feels like:** The pipeline is reliable. Developers trust the test suite. QA is involved earlier in the process.

### Level 4 — Managed
**Characteristics:** Quality is data-driven. Defect escape rates, coverage trends, flakiness rates are tracked and acted on. QA is embedded in product planning. Shift-left is practiced, not just preached.

**What it feels like:** Quality is a shared responsibility. The team ships with confidence because the data supports it.

### Level 5 — Optimising
**Characteristics:** AI-augmented quality processes. Shift-right monitoring in production. Continuous improvement of the quality system itself. QA strategy influences product architecture.

**What it feels like:** Quality is engineered into the organisation. The team spends almost no time on reactive quality work because the preventive systems are mature.

## How to Use This Model

First, be honest about where you are. Most teams sit between Level 2 and Level 3.

Then, focus on the **one or two practices** that would move you to the next level — not the full set of everything Level 5 teams do. Maturity compounds; trying to skip levels creates fragility.

## A Typical Roadmap

**Level 2 → 3:** Invest in a CI pipeline with required gates. Hire or develop automation skills. Define coverage thresholds.

**Level 3 → 4:** Add quality metrics to your team dashboard. Run Three Amigos sessions. Track and reduce flakiness systematically.

**Level 4 → 5:** Introduce AI-assisted test generation. Build synthetic monitoring for production. Make quality strategy part of architecture reviews.

## Conclusion

Knowing where you are is more useful than aspirational visions of where you want to be. Assess honestly, pick the next rung, and execute. That's how quality maturity is built — one deliberate practice at a time.
`
  }
];

// ── STACK DATA ──
const stack = [
  { icon: '🎭', name: 'Playwright',      role: 'E2E Automation' },
  { icon: '📘', name: 'TypeScript',      role: 'Primary Language' },
  { icon: '🤖', name: 'Claude AI',       role: 'AI Test Assistant' },
  { icon: '🐙', name: 'GitHub Actions',  role: 'CI / CD Pipelines' },
  { icon: '📊', name: 'Allure',          role: 'Test Reporting' },
  { icon: '🐳', name: 'Docker',          role: 'Test Environments' },
  { icon: '🔥', name: 'k6',             role: 'Performance Testing' },
  { icon: '🔬', name: 'Jest',            role: 'Unit Testing' },
  { icon: '📡', name: 'Postman',         role: 'API Testing' },
  { icon: '📈', name: 'Grafana',         role: 'Observability' },
  { icon: '🧩', name: 'Jira',            role: 'Test Management' },
  { icon: '💻', name: 'VS Code',         role: 'Editor' },
];
