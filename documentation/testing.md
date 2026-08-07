# Testing Guide

Tests run on **vitest** in **jsdom**. There is no browser, no Karma, no Jasmine, and no
Angular `TestBed`. A run is a single command that exits with a status code.

If you find a reference to `karma.conf.js`, `tsconfig.spec.json`, `ng test`, or
`jasmine.createSpyObj`, it predates the Lit migration and is wrong.

## Table of Contents

1. [Setup](#setup)
2. [Running tests](#running-tests)
3. [What to test](#what-to-test)
4. [Testing services](#testing-services)
5. [Testing components](#testing-components)
6. [The test helpers](#the-test-helpers)
7. [Test patterns](#test-patterns)
8. [The guard specs](#the-guard-specs)
9. [Coverage](#coverage)
10. [Continuous integration](#continuous-integration)

---

## Setup

### Configuration

There is no separate test config file. Everything lives in the `test` block of
`vite.config.ts`:

```ts
test: {
  include: ['src/**/*.spec.ts'],
  environment: 'jsdom',
  setupFiles: ['src/test-setup.ts'],
  passWithNoTests: false,
}
```

**`passWithNoTests: false` is deliberate.** A run that collects zero tests fails. This
is not defensive styling — the Angular-era specs sat dead and uncollected for months
after the Lit migration precisely because a run collecting nothing looked exactly like
a run that passed (#145).

### `src/test-setup.ts`

jsdom is missing three things the Candor elements need, and the setup file fills each
one. It exists to let elements *render*, not to emulate browser behaviour:

- **`ElementInternals` form-value methods.** jsdom implements `attachInternals()` but
  ships an `ElementInternals` without `setFormValue()`. Candor's form controls are
  `formAssociated` and call it from `updated()`, so mounting one throws before it
  renders. The stubs deliberately do not emulate form participation — nothing here
  relies on it, since the controls are read through their `change` events rather than a
  surrounding `<form>`.
- **`CSS.escape`.** jsdom has no global `CSS` object; `candor-radio` uses `CSS.escape`
  to build the selector that finds its group siblings.
- **`HTMLDialogElement.showModal()` / `close()`.** `candor-modal` calls one or the other
  from `updated()` on every change to `open` — including the first, where `open` is
  false and it calls `close()`.

Top-layer and inertness behaviour is not emulated, and no test asserts on it; the modal
assertions read structure and stylesheets, not layout.

### Test file locations

Specs are co-located with what they test:

- **Services**: `src/app/services/*.service.spec.ts`
- **Components**: `src/app/_components/<name>/<name>.spec.ts` — note `<name>.ts`, not
  `<name>.component.ts`. Those were the Angular versions and have been removed.
- **Repo-wide guards**: `src/app/candor-package.spec.ts`,
  `src/app/_components/styles-scoping.spec.ts`

---

## Running tests

```bash
npm test              # single run, exits with a status code
npm run test:watch    # watch mode, re-runs affected specs on save
```

Narrowing a run uses vitest's own flags:

```bash
npx vitest run src/app/services/color-util.service.spec.ts   # one file
npx vitest run -t "aria-valuetext"                           # tests matching a name
npx vitest run --coverage                                    # with coverage
```

The full suite is currently **238 tests across 9 files** and takes about five seconds.

---

## What to test

**Do test**:

- Public service methods, including their `null` returns
- Rendered output and accessible structure — labels, roles, live regions
- Custom events: that they fire, and what is in `detail`
- Reactions to property changes
- Edge cases: empty strings, invalid colors, identical inputs, boundary values

**Don't test**:

- Private methods — exercise them through the public surface
- Lit's own reactivity, or colorjs.io's internals
- Upstream Candor behaviour, *except* where this app depends on a specific detail of it.
  Those pins belong in `candor-package.spec.ts` and each needs a comment saying what
  breaks if the pin fails.

---

## Testing services

Services are plain classes exported as module-level singletons. There is no DI
container: import the instance, or construct one directly.

```ts
import { describe, it, expect } from 'vitest';
import { ColorUtilService } from './color-util.service';

describe('ColorUtilService', () => {
  const service = new ColorUtilService();

  describe('parseColor', () => {
    it('parses a valid hex color', () => {
      expect(service.parseColor('#ff5733')).not.toBeNull();
    });

    it('returns null for an unparseable string', () => {
      expect(service.parseColor('not-a-color')).toBeNull();
    });
  });
});
```

### Async methods

Gamut checks are asynchronous, so several `ColorUtilService` methods return promises:

```ts
it('generates a random color pair', async () => {
  const pair = await service.getRandomColorPair();

  expect(pair).toHaveLength(2);
  expect(pair[0]).toMatch(/^#[0-9a-f]{6}$/);
});

it('keeps the lightness range inside the gamut', async () => {
  const result = await service.getMinMaxLight('#ff5733');

  expect(result!.lightMin).toBeLessThanOrEqual(result!.lightMax);
});
```

### Mocking a collaborator

`vi.spyOn` on the imported singleton. The Jasmine equivalents
(`spyOn(...).and.returnValue`, `jasmine.createSpyObj`, `jasmine.objectContaining`) do
not exist here — use `vi.spyOn(...).mockReturnValue(...)`, `expect.objectContaining`,
and `expect.any`.

```ts
import { vi } from 'vitest';
import { colorUtil } from './color-util.service';

it('returns null when the color cannot be converted', () => {
  vi.spyOn(colorUtil, 'getRgb255Array').mockReturnValue(null);

  expect(colorMetrics.calcRawApcaContrast('#000000', '#ffffff')).toBeNull();
});
```

Prefer a spy over feeding a component input that makes it throw. A spec that drives a
real error through the component prints a stack trace on every run, which trains you to
ignore stderr.

---

## Testing components

Components are custom elements. Mounting one means creating it, appending it, and
waiting for Lit's render — which `src/app/test-utils.ts` wraps.

Import the module for its `@customElement` side effect before mounting:

```ts
import { describe, it, expect, afterEach } from 'vitest';
import './color-slider';
import { mount, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

describe('cc-color-slider', () => {
  it('gives the range input a name the label actually reaches', async () => {
    const el = await mount('cc-color-slider', {
      id: 'slider-0',
      label: 'Foreground lightness',
      color: '#639066',
    });
    const input = el.querySelector('input[type="range"]') as HTMLInputElement;

    // `labels` is the browser's own view of the association.
    expect(input.labels).toHaveLength(1);
  });
});
```

Every component here renders into the **light DOM**, so rendered markup is queryable
directly off the element — no shadow-root traversal. `candor-*` elements do use shadow
DOM, so reaching inside one means `el.shadowRoot!.querySelector(...)`.

### Asserting on events

Listen before you act. Events are dispatched with `bubbles: true, composed: true`.

```ts
it('emits the picked color', async () => {
  const el = await mount('cc-color-picker', { inputId: 'fg-color' });
  const input = el.querySelector('input[type="color"]') as HTMLInputElement;

  const events: CustomEvent[] = [];
  el.addEventListener('selected-color', (e) => events.push(e as CustomEvent));

  input.value = '#ff5733';
  input.dispatchEvent(new Event('input'));
  await flush(el);

  expect(events[0].detail).toBe('#ff5733');
});
```

### Driving user interaction

Do what the browser does: write the value, then dispatch the event.

```ts
input.value = '0.42';
input.dispatchEvent(new Event('input'));
await flush(el);

expect(input.getAttribute('aria-valuetext')).toBe('42%');
```

### Waiting for async renders

Some components resolve data before they can render — `cc-color-slider` computes its
lightness range asynchronously, so the range input does not exist on the first render.
Settle the promise chain, then the re-render it queues:

```ts
async function settled(el: Element) {
  await flush(el);
  await new Promise((resolve) => setTimeout(resolve, 0));
  await flush(el);
  return el.querySelector('input[type="range"]') as HTMLInputElement;
}
```

Prefer this over a fixed `setTimeout(…, 50)`, which passes until the machine is busy.

---

## The test helpers

`src/app/test-utils.ts`:

| Helper | Purpose |
|---|---|
| `mount(tag, props?)` | Creates the element, assigns properties, appends it, awaits the first render, returns it |
| `flush(el)` | Awaits the element's pending render (`updateComplete`) |
| `update(el, props)` | Assigns properties and awaits the re-render |
| `cleanup()` | Empties `document.body` — call it from `afterEach` |

`mount` **assigns properties, it does not set attributes**, so booleans and objects
reach the component as-is rather than as strings. It is typed off
`HTMLElementTagNameMap`, which is why every component declares itself there at the
bottom of its file:

```ts
declare global {
  interface HTMLElementTagNameMap {
    'cc-color-slider': CcColorSlider;
  }
}
```

Skip that declaration and `mount('cc-your-thing', { … })` loses its types.

---

## Test patterns

### Arrange, act, assert

```ts
it('scores a saturated pair below the WCAG equivalent', () => {
  // Arrange
  const fg = '#ff69b4';
  const bg = '#1a1a1a';

  // Act
  const okca = colorMetrics.getContrast(fg, bg, 'okca');

  // Assert — WCAG gives this pair 6.6, a known false pass
  expect(okca).toBeLessThan(4.5);
});
```

### Edge cases

```ts
describe('edge cases', () => {
  it('returns null for an empty string', () => {
    expect(service.parseColor('')).toBeNull();
  });

  it('returns 0 for identical colors', () => {
    expect(service.calcDeltaE('#ff5733', '#ff5733')).toBe(0);
  });

  it('returns NaN when contrast is too low for any object', () => {
    expect(service.getMinObjectDimension(10)).toBeNaN();
  });
});
```

### Descriptive names

Name the behaviour, not the method:

```ts
// Good
it('keeps the input id distinct from the host id', () => {});
it('re-announces an identical message', () => {});

// Avoid
it('works', () => {});
it('tests parseColor', () => {});
```

### Isolation

`cleanup()` in `afterEach` is not optional for component specs. Elements left in
`document.body` leak into the next test, and duplicate ids are exactly the class of bug
these specs exist to catch.

---

## The guard specs

Two specs test the repo's rules rather than its behaviour. Both encode a failure that
already happened once, and both are cheap to keep passing.

### `src/app/candor-package.spec.ts` (26 tests)

Pins the facts about `@candor-design/web-components` that this app's workarounds depend
on, so the workarounds can be deleted when upstream changes rather than lingering
forever. Among them:

- The `cc-*` / `candor-*` split. The package has one entry point with
  `sideEffects: true`, so importing it registers all 41 of its elements at once. A local
  element reclaiming a `candor-*` name throws on registration and takes the rest of the
  package down with it, leaving a half-registered app.
- `candor-card` sets `overflow: hidden` on a shadow node exposed neither as a `::part`
  nor through a custom property, which clips an absolutely-positioned tooltip bubble
  (`pawn002/candor#259`).
- `candor-radio` resolves its group as `closest('fieldset')` then `parentElement`, which
  is why the group markup needs a real `<fieldset>`.

**When you add a pin, comment what breaks if it fails.** A pin whose purpose is not
written down gets deleted by whoever sees it fail.

### `src/app/_components/styles-scoping.spec.ts` (10 tests)

Every `*.component.scss` is a plain global stylesheet, because the component importing
it renders into the light DOM. This spec asserts that top-level selectors are prefixed
with the component's own tag — `cc-metadata .comp-container`, not `.comp-container`.
Seven files once declared a bare `.comp-container` and silently overwrote each other.

---

## Coverage

Coverage is not wired into CI and there is no enforced threshold. To look at it locally:

```bash
npx vitest run --coverage
```

Reports land in `coverage/`, which is git-ignored. Open `coverage/index.html` to browse.

The suite covers all three services and the components with logic worth pinning —
`cc-alert`, `cc-color-contrast`, `cc-color-slider`, `cc-metadata` — plus the two guard
specs. `cc-color-picker`, `cc-copy-to-clipboard-button`, `cc-palette-table` and
`cc-table` have no specs of their own yet; they are the obvious place to add coverage.

---

## Continuous integration

`.github/workflows/ci.yml` runs on every push and PR to `main`:

- **`test` job**, on Node 20 and 22: `npm ci`, `npm run build`, `npm test`
- **`typecheck` job**, on Node 22: `npm ci`, `npm run typecheck`

Type-checking is a separate job because it is not per-Node-version — the compiler's
answer does not change with the runtime.

**`npm run build` does not type-check.** `vite build` transpiles and strips types
without ever invoking the compiler, so a type error passes the build and ships. Only
`npm run typecheck` (`tsc --noEmit`) checks them, and when that job was added it
immediately reported two genuine errors in `candor-package.spec.ts` that had been
sitting in the tree unread.

Run all three before pushing — locally is cheaper than a red PR:

```bash
npm run typecheck
npm test
npm run build
```

`.github/workflows/deploy.yml` re-runs the typecheck and test gates before publishing.
CI and the deploy workflow are triggered independently by the same push, so nothing
otherwise stops a red CI run and a green deploy from racing.

---

## Resources

- [Vitest documentation](https://vitest.dev/)
- [Lit testing guide](https://lit.dev/docs/tools/testing/)
- [Contributing Guide](./contributing.md) — the workflow around a change
- [Components](./components.md) and [Services](./services.md) — the APIs under test
