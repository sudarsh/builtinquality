---
slug: agent-driven-continuous-deployment
title: "Agent-Driven Continuous Deployment: How AI Agents Take a Ticket to Production Without Breaking It"
seoTitle: "Agent-Driven Continuous Deployment: A Practical Pipeline Design"
description: "A practical design for agent-driven continuous deployment: AI agents turn acceptance criteria into frozen test scenarios, build code and tests in parallel, and ship behind independent verification."
tag: ai
tagLabel: AI + CI/CD
date: 2026-11-05
read: 12 min read
keywords: agent-driven continuous deployment, agent-driven development, AI agents CI/CD, Claude Code GitHub Actions, AI test automation, autonomous software delivery
---

Coding agents can now write a feature, the tests for it and the pull request description in the time it takes to review one. That changes what continuous deployment means. The bottleneck is no longer writing code. It is knowing whether the code is right.

I have spent 13 years building quality engineering functions, twice as the first QA hire. For the last year I have been building Simulr, an AI testing product, using a pipeline in which agents take a ticket from acceptance criteria to a reviewed pull request. This article describes that pipeline, the parts I would not compromise on, and the parts that still need people.

## What is agent-driven continuous deployment?

**Agent-driven continuous deployment is a delivery pipeline in which AI agents do most of the work between a ticket and production: they turn requirements into test scenarios, write the code and the tests, fix failures and respond to review, while people approve the decisions that matter.**

It is not "let the agent push to main". The difference between a pipeline that ships faster and one that ships bugs faster is a single question: **who decides what correct means?**

## The core problem: an agent checking its own work

Ask one agent to build a feature and write its tests, and you will usually get green CI. That is the problem.

Suppose the acceptance criteria say a quote total is rounded half-up to two decimals. The agent misreads the rule and truncates instead: `104.999` becomes `104.99` instead of `105.00`. It then writes a test that expects `104.99`. The code and the test share the same misunderstanding, so the test passes, CI is green, and the wrong price goes to production.

Better prompts reduce how often this happens. They do not remove it, because the mistake is in the agent's understanding of the requirement, and its tests can only check its own understanding.

So the pipeline has to be built around **independent evidence**: expected behaviour that is decided before any code exists, by someone other than the agent writing the code.

## The pipeline at a glance

1. **Ticket.** A product manager writes acceptance criteria with worked examples, including exact expected values.
2. **Scenario agent.** An agent turns the acceptance criteria into structured test scenarios and asks questions where the criteria are unclear.
3. **QA review and freeze.** A person reviews the scenarios and approves them. Once merged, they are frozen.
4. **Dev agent and test agent in parallel.** Separate agents build the feature and the tests from the same frozen scenarios.
5. **CI gates.** Unit, API and UI tests, plus a traceability check that every scenario has a passing test.
6. **Failure routing.** A failing check is classified and sent back to the right agent, or to a person.
7. **AI review loop.** A review agent comments on the pull request; the agents fix and reply.
8. **Release.** Deployment and release are separated, with production checks and a fast way back.

The rest of this article goes through the stages that make this safe.

## Stage 1: acceptance criteria to frozen scenarios

Everything downstream depends on the scenarios, so this is where I spend the most model capacity and the most human attention.

A scenario agent (I use Claude Code, started by a GitHub Actions job when a ticket is ready) reads the ticket and does two things before writing anything:

- **It checks each acceptance criterion for gaps:** missing rounding rules, unstated error behaviour, permissions nobody mentioned, conflicts between criteria.
- **It asks instead of guessing.** Unclear points become questions on the ticket. A guessed business rule becomes a frozen scenario, then a test, then production behaviour, and nothing downstream will catch it.

The output is a scenario file with stable IDs, written as behaviour rather than click-by-click steps:

```yaml
- id: QUOTE-S3
  title: Total rounded half-up to 2 decimals
  covers: [AC2]
  type: boundary
  priority: P1
  given: A unit price with more than 2 decimals
  when: The quote total is calculated
  then: Total rounded half-up on screen, in storage and in the PDF
  examples: [ex3]
```

Expected values live in a separate examples file and come from the product manager's worked examples, never from the agent:

```json
{ "id": "ex3", "qty": 3, "unitPrice": "34.9999", "total": "105.00" }
```

A person reviews the scenarios as a normal pull request and approves it. From that point the scenarios are frozen: agents building the feature cannot change them. Changing expected behaviour means a new scenarios PR and a new approval.

Two details matter more than they look:

- **Given / When / Then, not UI steps.** If scenarios list clicks, the test agent copies them and the tests break with every UI change.
- **Expected values from people.** This single rule catches the rounding bug above, whether one agent or two wrote the code: the test must expect `105.00`, because that value was decided before the code existed.

## Stage 2: separate dev and test agents

Once the scenarios are frozen, two agents start in parallel as **separate sessions on separate branches**:

- The **dev agent** builds the feature and the unit tests next to it.
- The **test agent** writes API, UI and acceptance tests (Playwright) from the frozen scenarios and the API contract.

The test agent never reads the dev agent's code to decide what is correct. That is the point of separating them: tests written from the implementation tend to confirm the implementation. Tests written from the agreed scenarios check the requirement.

Because both agents work from the same agreed inputs, not from each other's output, they do not need to run one after the other. An orchestrator merges both branches into the feature branch and only then runs CI on the combined result.

Ownership keeps them out of each other's way: the dev agent owns application code and its unit tests; the test agent owns the acceptance test folder; neither can edit the scenarios.

## Stage 3: CI gates and traceability

CI runs the usual checks (unit, API, UI, smoke), plus one that is specific to this pipeline: **traceability**.

Every test carries a scenario ID in its name, for example `QUOTE-S3 rounds half-up`. CI compares the scenario IDs in the frozen spec with the IDs in the test results. A scenario with no passing test fails the build. Coverage is proven per requirement, not assumed from a percentage.

Tests also import expected values from the examples file by ID instead of hardcoding them. That makes it hard for any agent to quietly "fix" a failing test by changing the number it expects.

## Stage 4: failure routing and limits

Not every red build means the code is wrong. When a check fails, a failure-classification step reads the Playwright report and trace and decides what kind of failure it is:

| Failure type | Example | Goes to |
|---|---|---|
| Product breaks a frozen scenario | Total is 104.99, scenario expects 105.00 | Dev agent fixes the code |
| Test mechanics | Locator changed, setup error | Test agent fixes the test, never the expectation |
| Environment | Deploy or infrastructure failure | Retry once, then alert |
| Requirement unclear | Scenario conflicts with another rule | Back to the product manager and QA |
| Repeated or unclassified | Three attempts on the same failure | Stop and escalate to a person |

Two limits keep this from becoming an expensive loop:

- **Auto-heal fixes mechanics, never meaning.** An agent may fix a locator, a wait condition or test data. It may not change an expected value or loosen an assertion.
- **Retries are bounded.** After three attempts on the same failure, the work stops and a person decides.

## Stage 5: the AI review loop

When the checks pass, a review agent (a separate session with no memory of how the code was written) compares the pull request against the frozen scenarios and comments. The dev or test agent fixes and replies, and the checks run again. Changes to expected behaviour are not negotiated in comments; they go back through the scenarios.

People still review what is risky. In my design, anything touching money, permissions or data migrations gets a human reviewer regardless of how green the build is.

## Stage 6: deploy and release

How release works depends heavily on the company: its feature flag tooling, its risk tolerance and its compliance requirements. The principles I would keep everywhere:

- **Separate deploy from release.** Getting code to production and exposing it to users are different decisions. Where the team uses feature flags, new code can reach production switched off.
- **Release on approval, with production checks.** Product and QA decide when a feature goes live, followed by smoke tests and error monitoring.
- **Have a fast way back.** A switch-off or rollback that takes seconds, not a hotfix that takes hours. Data migrations are the exception: rolling back code does not undo data changes, so those need a person.

## What still needs people

Agent-driven does not mean people-free. In this pipeline, people own:

- **The definition of correct:** approving scenarios and expected values.
- **High-risk changes:** money, permissions, migrations.
- **Release decisions** for anything customer-facing.
- **The guardrails themselves:** which checks exist, what agents may change, when autonomy increases.

## How to adopt it without betting the product

I would not switch this on all at once. Autonomy should be earned in stages:

1. **Agents assist.** Agents draft scenarios and tests; people write the code and approve everything.
2. **Agents build.** Agents write code and tests; people review every pull request and approve every release.
3. **Agents ship low-risk changes.** Only after the numbers support it.

Before each step, prove the pipeline catches real problems:

- **Planted bugs:** deliberately introduce known defects (a wrong total, a missing permission check) on a test branch. The pipeline must catch all of them.
- **A benchmark set of past tickets**, re-run whenever a prompt or model changes, so a model update cannot quietly make the agents worse.
- **Shadow runs** alongside the current process before trusting the results.

## Prerequisites

Before any agent writes production code, the platform needs:

- auto-deployed environments for every pull request;
- a test data strategy that lets parallel runs create and clean up their own data;
- API contracts, so the test agent can work before the UI exists;
- fast CI, because agents rerun it many times per ticket;
- a regression suite that already covers core flows;
- an observability tool the release checks can read.

## The takeaway

Agents make writing code cheap. They do not make deciding what is correct cheap, and a pipeline that lets the same agent decide both will ship confident mistakes.

The design that works is simple to state: **decide expected behaviour first, freeze it, and make every agent prove its work against evidence it did not write.** Everything else, from parallel agents to AI review, is there to make that loop fast.

## FAQ

**Can one agent write both the code and the tests?**
For low-risk changes it can, as long as expected values come from frozen scenarios rather than from the agent. For high-risk work, separate dev and test agents add a second, independent reading of the requirement.

**Which tools does this need?**
I build it with Claude Code running in GitHub Actions, Playwright for API and UI tests, and the team's ticketing system for acceptance criteria. The design does not depend on a specific vendor; it depends on frozen scenarios, separate sessions and CI checks that enforce them.

**Is this safe for production?**
Only as safe as its guardrails and its evidence. That is why autonomy grows in stages, and why each stage is proven with planted bugs and benchmark tickets before it is trusted.
