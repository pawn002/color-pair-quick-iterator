# Contributing Guidelines

Thank you for your interest in contributing to Color Pair Quick Iterator (CPQI). This
document covers the conventions a change is expected to follow.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Lit Conventions](#lit-conventions)
6. [Candor Design System Conventions](#candor-design-system-conventions)
7. [TypeScript Best Practices](#typescript-best-practices)
8. [Component Development](#component-development)
9. [Service Development](#service-development)
10. [Testing Requirements](#testing-requirements)
11. [Documentation](#documentation)
12. [Pull Request Process](#pull-request-process)
13. [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project and community
- Show empathy towards other contributors

---

## Getting Started

### Prerequisites

Before contributing:

1. Read the [Getting Started](./getting-started.md) guide and set up your environment
2. Review the [Architecture](./architecture.md) documentation
3. Skim [Services](./services.md) and [Components](./components.md)
4. Read [CLAUDE.md](../CLAUDE.md) — the conventions there are authoritative and apply to
   human contributors too
5. Understand the [Candor conventions](#candor-design-system-conventions)

### Finding something to work on

- Check the GitHub issues for open tasks
- Propose new features by opening an issue first
- Fix bugs or improve documentation

---

## Development Workflow

### 1. Fork and clone

```bash
git clone https://github.com/YOUR_USERNAME/color-pair-quick-iterator.git
cd color-pair-quick-iterator
git remote add upstream https://github.com/pawn002/color-pair-quick-iterator.git
npm install
```

### 2. Create a branch

```bash
git checkout main
git pull upstream main
git checkout -b feat/your-feature-name    # or fix/… or docs/…
```

### 3. Make changes

Work against the dev server (`npm start`), and update the specs alongside the code —
see [Testing Requirements](#testing-requirements).

### 4. Verify before committing

All three, in this order:

```bash
npm run typecheck   # tsc --noEmit — the ONLY thing that type-checks this repo
npm test            # single vitest run
npm run build       # verifies the bundle actually builds
```

`npm run build` does **not** type-check. `vite build` transpiles and strips types
without invoking the compiler, so a type error passes the build and ships.

### 5. Commit and open a PR

```bash
git commit -m "feat(component): add color palette export"
git push origin feat/your-feature-name
```

See [Commit Message Guidelines](#commit-message-guidelines).

### A note on stacked branches

If you have several dependent branches open, be careful with squash merges. Squashing
branch A leaves branch B `CONFLICTING` against `main`, because the squash commit is not
an ancestor of B — retargeting alone does not fix it. And **never** delete a branch that
a later PR is based on: GitHub auto-closes that PR as conflicting and refuses to reopen
it.

---

## Coding Standards

### General principles

1. **Clarity over cleverness** — write code that is easy to understand
2. **Consistency** — follow existing patterns in the codebase
3. **Simplicity** — solve the problem at hand; avoid over-engineering
4. **Comments explain "why," not "what"** — and are worth writing where a choice looks
   arbitrary but is load-bearing. Much of this codebase's commenting records a bug that
   the code is shaped to avoid
5. **DRY**, but don't over-abstract

### File naming

- **Components**: `component-name/component-name.ts` and
  `component-name/component-name.component.scss`. The `.component` in the stylesheet
  name is a leftover from the Angular era; the file is live. The element file is
  `component-name.ts`, *not* `component-name.component.ts`
- **Services**: `service-name.service.ts`
- **Specs**: co-located, `*.spec.ts`
- **Directories**: kebab-case

### Formatting

Prettier config lives in `package.json`: 100-character width, single quotes, and the
plain `html` parser for `*.html` files. Most editors can format on save from it.

---

## Lit Conventions

**There is no Angular here.** The app was rewritten as Lit web components in commit
`36bd8e2`. Anything describing NgModules, `signal()`, `computed()`, `effect()`,
`inject()`, `input()`/`output()`, `@if`/`@for`, `OnPush`, or the async pipe describes a
version of this repo that no longer exists.

### 1. Registration

```ts
@customElement('cc-my-thing')
export class CcMyThing extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    'cc-my-thing': CcMyThing;
  }
}
```

The `HTMLElementTagNameMap` declaration keeps `document.createElement` and the `mount()`
test helper typed. It is not optional.

### 2. Light DOM

```ts
override createRenderRoot(): this {
  return this;
}
```

Every locally-authored component does this, so the global token stylesheet applies.

**A `<slot>` does nothing in the light DOM.** Lit appends its template *after* the
authored children instead of projecting them. That was #151, and it is why none of these
components use slots. If you need content projection, use a `candor-*` element or give
the component a shadow root.

### 3. Properties and state

```ts
@property() label = 'Color';                                  // public API
@property({ attribute: 'colorone' }) colorOne = '';           // differing attribute name
@property({ type: Boolean, reflect: true }) compact = false;  // stylesheet selects on it
@property({ type: Object, attribute: false }) reset: ResetObject | null = null;
@state() private uiColor = '';                                // internal
```

- `@property()` for public API, `@state()` for internal reactive state
- Use `attribute:` when the attribute name differs from the property name
- Add `reflect: true` when a stylesheet needs to select on it — reflecting beats adding
  a class in `connectedCallback`

### 4. Templates

Native JavaScript in the `html` tagged template — ternaries and `.map()`, never
control-flow directives:

```ts
render() {
  return html`
    ${this.items.map((item) => html`<li>${item.name}</li>`)}
    ${this.isVisible ? html`<div>Content</div>` : ''}
  `;
}
```

Binding syntax is load-bearing:

| Syntax | Sets |
|---|---|
| `.prop=${value}` | a property — **required** for objects and arrays |
| `attr=${value}` | an attribute |
| `?attr=${value}` | toggles an attribute |
| `@event=${handler}` | an event listener |

### 5. Derived values

Plain getters. They re-evaluate on each render, which is what you want:

```ts
get contrastAnnouncement() {
  return `Contrast score: ${this.contrastScore}`;
}
```

### 6. Events

```ts
this.dispatchEvent(
  new CustomEvent('selected-color', { detail: color, bubbles: true, composed: true }),
);
```

`bubbles: true, composed: true` so the event escapes nested markup and shadow roots.
**Name events for what happened, not what to do**: `note-requested`, `selected-color`,
`color-variant` — not `updateNote` or `setColor`.

---

## Candor Design System Conventions

UI primitives come from the published `@candor-design/web-components` package.
`src/main.ts` imports it once, which registers every element it ships — there is no
local copy to edit.

### Which element to use

Use a `candor-*` element for any standard primitive: `candor-button`, `candor-card`,
`candor-accordion-item`, `candor-checkbox`, `candor-radio`, `candor-modal`,
`candor-tooltip`, `candor-text`, `candor-toast` / `candor-toast-container`,
`candor-tone-picker`.

Data tables are the exception — use the app's own `<cc-table>`. See
[Components](./components.md#why-not-candor-table) for why, and for why the metadata
tables should not be half-migrated.

**Never name a local element `candor-*`.** The package has a single entry point with
`sideEffects: true`, so one import registers all 41 of its elements and there is no
duplicate guard. A collision throws on registration and takes every element after it
down with it, leaving a half-registered app. Local elements use the `cc-*` prefix;
`src/app/candor-package.spec.ts` enforces the split.

### Upstream API differences worth knowing

- **`heading`, never `title`** — `title` is a global HTML attribute and would render a
  browser tooltip instead of a label
- **`change`, not `changed`** — form controls emit `change` with the value/state as
  `detail`
- **`candor-button` emits nothing.** Bind `@click`; the inner button's native click
  retargets to the host
- **No `size="icon"`.** Use `class="button--icon"`, which sets the `--candor-button-*`
  hooks from `styles.scss`
- **`candor-card` clips whatever overflows it**, and `candor-tooltip` positions its
  bubble absolutely, so a tooltip inside a card is cut off at the card's edge. There is
  no CSS fix from this side — the card sets `overflow: hidden` on a shadow node exposed
  neither as a `::part` nor through a custom property. Tracked as `pawn002/candor#259`

### Radio groups need a fieldset

**A group of `candor-radio`s always gets a `<fieldset>` and a `<legend>`.** This is
Candor's documented rule and it is load-bearing, not presentational: the legend supplies
the question context screen readers announce before each option, and `candor-radio`
resolves its group as `closest('fieldset')` then `parentElement`. Remove the fieldset
and arrow-key navigation *and* mutual exclusion both die with no error.

Reset `border`/`padding`/`margin` and set `min-width: 0`; a `<legend>` is shrink-to-fit,
so it needs an explicit width before `text-align` does anything.

### Styling with tokens

Design tokens are plain custom properties on `:root`, so they inherit through shadow
boundaries and styling works the same on both sides of one. Reference them rather than
literals:

```scss
// Good
color: var(--color-text-default);
font-family: var(--font-family-mono);
border: var(--border-width-thin) solid var(--color-border-control);

// Avoid
color: #1a1a1a;
font-family: 'Source Code Pro', monospace;
border: 1px solid #ccc;
```

| Category | Example tokens |
|---|---|
| Color — text | `--color-text-default`, `--color-text-subtle`, `--color-text-inverse` |
| Color — background | `--color-bg-surface`, `--color-bg-subtle` |
| Color — border | `--color-border-control`, `--color-border-strong` |
| Typography | `--font-family-base`, `--font-family-accessible`, `--font-family-mono` |
| Font size | `--font-size-sm`, `--font-size-md`, `--font-size-lg`, `--font-size-h1..h6` |
| Font weight | `--font-weight-semibold`, `--font-weight-bold` |
| Border | `--border-width-thin`, `--border-width-medium` |
| Line height | `--line-height-tight`, `--line-height-normal` |

**Global SCSS does not cross a shadow boundary.** A descendant selector cannot reach a
`candor-*` component's internals. Adjust one from the outside with its documented
`--candor-*` custom properties or `::part()`. If neither is enough, the fix belongs
upstream in `pawn002/candor`, not in a local fork.

### Typography

Candor's four-voice system; the rules live in `styles.scss`.

- **`--font-family-base`** (Roboto Flex) is the document voice, set on `body`. Without
  it, anything not matched by a rule falls to the UA serif — which is how a bare `div`
  once rendered Times New Roman. It is the *comprehension* voice and covers almost
  everything here: prose, headings, metric names, scores
- **`--font-family-accessible`** (Atkinson Hyperlegible) is the *instructional* voice —
  "does the user need to read this precisely to know what to do next?" In this app that
  is `cc-alert` alone. Every other Atkinson run on the page comes from inside a
  `candor-*` shadow root, where upstream applies the same rule to form labels
- **`--font-family-mono`** stays on numeric table columns, for digit alignment
- **Headings use the `--font-size-h1..h6` tokens shifted one level down** (`h1` →
  `--font-size-h3`), because this is a dense single-screen utility and the sticky bar
  shares its row with the contrast readout. Do not reach for `--font-size-lg`/`md`,
  which are body-scale tokens and previously left `h1` and `h2` both at 20px
- **14px (`--font-size-sm`) is the floor for readable text.** `--font-size-xs` is
  decorative/non-text only
- For supplementary text prefer `candor-text` over hand-rolled type — `variant="caption"`
  is Noto Sans italic by definition, so setting a font or style alongside it forks the
  system

### Icons

**Phosphor, inlined as raw `<path>` data.** Candor stipulates Phosphor but ships no icon
set — the `ph*` constants in its `icons.d.ts` are its own component chrome and are not
exported, so there is nothing to import (`pawn002/candor#260`).

Source new glyphs from `@phosphor-icons/core` and paste the path into an `html` template
next to `_INFO_SVG` in `app.ts`. Prefer the `fill` weight to match what is already
there, and keep the `viewBox="0 0 256 256"` Phosphor uses. Do not add the package as a
dependency for one glyph, and do not hand-draw one — an off-system icon renders fine and
never announces itself.

### Tooltip placement

**Point edge-adjacent tooltips inward.** A bubble is centred on its trigger, so a control
at the edge of a card overhangs it and gets clipped. Every tooltip on an edge control
names the direction that puts the bubble *into* the card — `position="right"` on the
color pickers (left edge), `position="left"` on the copy buttons and the Options info
buttons (right edge).

Only reach for a structural fix when no direction works. The quick-actions row is a
tight horizontal group in a short card, where every bubble either overhangs the card or
covers the neighbouring button, so it is a plain `<div>` styled from card tokens instead
(see `app.scss`).

### Component stylesheets are global

Each `*.component.scss` becomes a plain global stylesheet, because the component that
imports it renders into the light DOM. **Prefix every top-level selector with the
component's own tag** — `cc-metadata .comp-container`, not `.comp-container`. Seven
files once declared a bare `.comp-container` and silently overwrote each other, which
collapsed `cc-metadata` to 2px tall. `_components/styles-scoping.spec.ts` enforces this.

---

## TypeScript Best Practices

The project uses strict TypeScript (`strict`, `noImplicitOverride`,
`noImplicitReturns`, `noFallthroughCasesInSwitch`).

### 1. Avoid `any`

```ts
// Good
function parseData(data: unknown): ParsedData | null {
  if (typeof data === 'object' && data !== null) { /* narrow it */ }
  return null;
}

// Avoid
function parseData(data: any): ParsedData {}
```

### 2. Prefer type inference

```ts
// Good
const count = 42;

// Avoid
const count: number = 42;
```

### 3. Interfaces for object shapes

```ts
export interface ColorMetaObj {
  lightness: number | string;
  chroma: number | string;
  hue: number | string;
  saturation: number | string;
}
```

### 4. Union types over enums

```ts
// Good
export type ContrastType = 'apca' | 'bpca' | 'deltaE' | 'okca';

// Avoid
enum ContrastType { APCA = 'apca' }
```

### 5. Explicit return types on public methods

```ts
// Good — public surface
getContrast(colorOne: string, colorTwo: string, type: ContrastType): number | null {}

// OK — inferred on a private helper
private isValid(color: string) {
  return this.parseColor(color) !== null;
}
```

---

## Component Development

There is no generator. Create the directory and two files by hand:

```
src/app/_components/my-thing/
├── my-thing.ts
└── my-thing.component.scss
```

### Template

```ts
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './my-thing.component.scss';

@customElement('cc-my-thing')
export class CcMyThing extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() label = '';
  @state() private uiValue = '';

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('thing-selected', {
        detail: this.uiValue,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button type="button" @click=${this._handleClick}>${this.label}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-my-thing': CcMyThing;
  }
}
```

### Checklist

- [ ] `cc-*` prefix, never `candor-*`
- [ ] `createRenderRoot()` returns `this`
- [ ] Declared in `HTMLElementTagNameMap`
- [ ] `@property()` for public API, `@state()` for internal state
- [ ] Events dispatched with `bubbles: true, composed: true`, named for what happened
- [ ] No `<slot>` — it does nothing in the light DOM
- [ ] Stylesheet selectors prefixed with the component's tag
- [ ] Styles reference Candor tokens, not literals
- [ ] Has a co-located `*.spec.ts`
- [ ] Documented in [components.md](./components.md)

---

## Service Development

Services are plain classes in `src/app/services/`, exported as a module-level singleton.
There is no DI container — import the instance.

```ts
export class MyService {
  doSomething(input: string): string | null {
    return this.process(input);
  }

  private process(input: string): string | null {
    return null;
  }
}

export const myService = new MyService();
```

### Guidelines

1. **Single responsibility** per service
2. **Return `null` for failures**, not `undefined`, and not a thrown error unless the
   caller genuinely cannot continue
3. **Explicit return types** on every public method
4. Keep them free of DOM access where you can — it is what makes them cheap to test

### Checklist

- [ ] One focused responsibility
- [ ] Exported as a module-level singleton
- [ ] Public methods have explicit return types
- [ ] Failures return `null`
- [ ] Has a co-located `*.spec.ts`
- [ ] Documented in [services.md](./services.md)

---

## Testing Requirements

**When you modify or add code, update the corresponding tests.** This is not optional,
and CI enforces it indirectly: `npm test` runs with `passWithNoTests: false`, so a run
collecting zero tests fails rather than passing silently.

Specifically:

1. **New features** — add tests covering the new behaviour
2. **Modified code** — update the related specs to match
3. **New parameters or type-union members** — add cases for every new value, in the
   service that handles it *and* in the components that consume it
4. **Changed service methods** — update the service spec and every component spec that
   exercises it

Tests run on **vitest**, not Karma/Jasmine. Use `vi.spyOn(...).mockReturnValue(...)`,
`expect.objectContaining`, and `expect.any` — the Jasmine equivalents are not available.

See the [Testing Guide](./testing.md) for the helpers and patterns.

---

## Documentation

### Code documentation

JSDoc on public service methods:

```ts
/**
 * Calculates the minimum object dimension for an APCA score.
 *
 * @param apca - APCA Lc score
 * @returns Minimum dimension in pixels, or NaN if contrast is too low for any object
 */
getMinObjectDimension(apca: number): number {}
```

Where a component's shape encodes a bug it exists to avoid, say so in a comment. The
distinct-id getter in `cc-color-slider` is the model: it explains that a shared id made
`label[for]` resolve to the host and left the range input with no accessible name.

### Project documentation

When adding a feature, update the docs in the same PR:

1. [Components](./components.md) or [Services](./services.md) for API changes
2. [Architecture](./architecture.md) if the structure changes
3. The root [README.md](../README.md), which must stay in sync with
   `documentation/`
4. [CLAUDE.md](../CLAUDE.md) if you change a convention

---

## Pull Request Process

### Before submitting

- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] Tests added or updated alongside the code
- [ ] Documentation updated
- [ ] Commit messages follow the guidelines below
- [ ] Branch is up to date with `main`

### PR template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Typecheck, tests, and build pass
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Review

1. Submit a PR with a clear description
2. CI must be green — the `test` matrix and the `typecheck` job
3. Address review feedback
4. A maintainer merges once approved

Merging to `main` deploys automatically. See [Deployment](./deployment.md).

---

## Commit Message Guidelines

Conventional Commits.

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### Scope (optional)

`component`, `service`, `a11y`, `build`, `ci`, `deps`, `type`, `layout`

### Examples

```
feat(component): add color palette export button

fix(a11y): stop the page scrolling behind an open modal

fix(service): correct chroma matching for out-of-gamut pairs

docs: rewrite the documentation folder for Lit

chore(deps): update @candor-design/web-components to 5.0.1
```

### Subject rules

- Imperative mood ("add", not "added" or "adds")
- No capital first letter, no trailing period
- 72 characters maximum

---

## License

This project is licensed under **Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

By contributing you agree that:

1. Your contributions are licensed under the same CC BY-NC-SA 4.0 license
2. You have the right to submit them under this license
3. They may be used, modified, and distributed non-commercially by others
4. Derivative works must keep the same license terms
5. You will be credited as a contributor

**Important**: this is **not an open source license**. Commercial use of this project or
of derivative works is prohibited without explicit written permission from the project
owner.

See [LICENSE](../LICENSE) or
[creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

Thank you for contributing to Color Pair Quick Iterator! 🎨
