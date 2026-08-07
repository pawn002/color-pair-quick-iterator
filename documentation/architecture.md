# Architecture

How the Color Pair Quick Iterator (CPQI) is put together, and why.

## Overview

CPQI is built with **Lit 3** web components on **Vite**. It is a single static page with
no backend, no router, and no framework runtime beyond Lit's ~5 kB base class. Business
logic lives in three services; components handle presentation and interaction.

**There is no Angular here.** The app was rewritten as Lit web components in commit
`36bd8e2`. Anything describing NgModules, `signal()`, `effect()`, `inject()`, zoneless
change detection, `OnPush`, the `Location` service, or `angular.json` describes a version
of this repo that no longer exists.

## Architectural principles

### 1. Custom elements, not a component framework

There is no DI container and no module system beyond ES modules. A component is a class
extending `LitElement`, registered with `@customElement`. Dependencies are imported.

### 2. Light DOM by default

Every locally-authored component overrides `createRenderRoot()` to return `this`, so its
markup lands in the light DOM and the global token stylesheet applies to it. The
tradeoffs this creates — global stylesheets, no working `<slot>` — are covered below.

### 3. Services as module singletons

Business logic sits in plain classes exported as a single instance
(`export const colorUtil = new ColorUtilService()`). Consumers import the instance. One
responsibility per service.

### 4. State at the root

All application state lives on `<cc-app>` as `@state()` fields. Children receive it as
properties and report back with custom events. There is no store.

## High-level structure

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (user)                       │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    <cc-app>  (src/app/app.ts)               │
│  - Owns every piece of application state                    │
│  - Reads and writes the URL query string                    │
│  - Handles swap / match-chromas / reset / random pair       │
└───┬──────────────────────┬──────────────────────┬───────────┘
    │ properties down      │                      │
    │ events up            │                      │
    ▼                      ▼                      ▼
┌──────────────────┐  ┌──────────────┐  ┌─────────────────────┐
│ cc-* components  │  │   Services   │  │  External libraries │
│ - color-picker   │  │ - ColorUtil  │  │ - colorjs.io        │
│ - color-slider   │  │ - Metrics    │  │ - @pawn002/okca     │
│ - color-contrast │  │ - Bpca       │  │ - apca-w3           │
│ - metadata       │  │              │  │ - bridge-pca        │
│ - palette-table  │  │              │  │ - d3                │
│ - table          │  └──────────────┘  └─────────────────────┘
│ - alert          │
│ - copy-button    │
├──────────────────┤
│ candor-* (npm)   │  shadow DOM; registered wholesale by main.ts
│ button, card,    │
│ accordion-item,  │
│ checkbox, radio, │
│ modal, tooltip,  │
│ text, toast,     │
│ toast-container, │
│ tone-picker      │
└──────────────────┘
```

## Project structure

```
index.html                       # Vite entry point — loads src/main.ts
src/
├── main.ts                      # Registers Candor elements; imports fonts + globals
├── styles.scss                  # Global styles, typography rules, sr-only, tokens usage
└── app/
    ├── app.ts                   # <cc-app>: all state, URL sync, orchestration
    ├── app.scss                 # Root layout
    ├── test-utils.ts            # mount / flush / update / cleanup for specs
    ├── candor-package.spec.ts   # Pins upstream facts the app's workarounds rely on
    ├── _components/
    │   ├── alert/
    │   ├── color-contrast/
    │   ├── color-picker/
    │   ├── color-slider/
    │   ├── copy-to-clipboard-button/
    │   ├── metadata/
    │   ├── palette-table/
    │   ├── table/
    │   └── styles-scoping.spec.ts
    └── services/
        ├── color-util.service.ts
        ├── color-metrics.service.ts
        ├── bpca.service.ts
        └── declarations.d.ts
```

`vite.config.ts` carries both the build config and the vitest config — there is no
separate test config file.

## Component architecture

### Co-location

```
component-name/
├── component-name.ts                 # Lit element: logic and template together
├── component-name.component.scss     # Styles, imported directly by the .ts file
└── component-name.spec.ts            # vitest spec (where one exists)
```

The `.component` in the stylesheet name is a leftover from the Angular era. The file is
live; only the name is historical.

### Light DOM and its consequences

Locally-authored components render into the light DOM. Two things follow, and both have
already caused bugs here:

**A `<slot>` does nothing.** Lit appends its template *after* the authored children
rather than projecting them, so every local primitive silently dropped its content
beside the control instead of inside it. That was #151. None of these components use
slots; for content projection, use a `candor-*` element or give the component a shadow
root.

**Component stylesheets are global.** Every `*.component.scss` is a plain global
stylesheet, so top-level selectors must be prefixed with the component's own tag —
`cc-metadata .comp-container`, not `.comp-container`. Seven files once declared a bare
`.comp-container` and silently overwrote each other, collapsing `cc-metadata` to 2px
tall. `_components/styles-scoping.spec.ts` enforces the prefix.

### Component communication

Properties down, custom events up.

```ts
// Declaring API
@property({ attribute: 'colorone' }) colorOne = '';
@property({ type: Boolean, reflect: true }) compact = false;
@state() private uiColor = '';

// Reporting upward
this.dispatchEvent(
  new CustomEvent('selected-color', { detail: color, bubbles: true, composed: true }),
);
```

Events are named for what happened, not what to do — `selected-color`, `color-variant`,
`note-requested`, `copy-event`, `alert-closed`. `bubbles: true, composed: true` lets them
escape nested markup and shadow roots.

Derived values are plain getters, which re-evaluate on each render:

```ts
get contrastAnnouncement() {
  return `Contrast score: ${this.contrastScore}`;
}
```

### Element hierarchy

```
<cc-app>
├── <cc-color-picker> × 2          Foreground / background selection
├── <cc-color-slider> × 2          Lightness adjustment
├── <cc-color-contrast>            The score in the sticky header
├── <cc-metadata>                  OKLCH values, differences, pass/fail
│   └── <cc-table> × 4
├── <cc-palette-table> × 2         Variant grid, wrapping <candor-tone-picker>
├── <cc-copy-to-clipboard-button>  Hex copy
└── <cc-alert>                     Notifications, outside <main>
```

`<cc-alert>` sits **outside** `<main>` on purpose. `.app-container` uses
`left: 50%; transform: translateX(-50%)`, and a transformed ancestor becomes the
containing block for `position: fixed` descendants — with the alert inside, the toast
rendered over 1300px below the fold.

## Candor design system integration

Design-system primitives come from `@candor-design/web-components`. `src/main.ts` imports
the package once, which registers every element it ships. Nothing is copied into this
repo.

### The `cc-*` / `candor-*` split is load-bearing

The package has a single entry point with `sideEffects: true`, so importing it registers
all 41 of its elements at once — there is no way to import just one. Any local element
that reclaims a `candor-*` name throws on registration and takes the rest of the
package's elements down with it, leaving a half-registered app.
`src/app/candor-package.spec.ts` guards this.

### Tokens cross the shadow boundary; stylesheets do not

Design tokens are plain custom properties on `:root`, and custom properties inherit into
shadow trees — so colour, spacing, typography and border values reference tokens
(`--color-text-default`, `--font-family-mono`, `--border-width-medium`) and styling works
the same on both sides.

Global SCSS does not cross. A descendant selector cannot reach a component's internals;
use the documented `--candor-*` custom properties or `::part()`. `styles.scss` uses the
former to rebuild the icon-only button, which upstream has no size for.

### Elements the app renders

`candor-accordion-item`, `candor-button`, `candor-card`, `candor-checkbox`,
`candor-modal`, `candor-radio`, `candor-text`, `candor-toast`, `candor-toast-container`,
`candor-tone-picker`, `candor-tooltip`.

Their APIs live in Candor's own hosted catalog rather than being duplicated here — a copy
maintained in this repo is what went stale last time. See
[Components](./components.md#design-system-components-candor-) for the differences that
have bitten this app.

### `cc-table` is deliberately not `candor-table`

`candor-table` is data-driven (`headers: string[]`, `rows: { cells: string[] }[]`), and
half the tables in `cc-metadata` put an interactive tooltip and info button inside a
cell. A cell can only be text, so it also cannot carry the `outcome--pass` /
`outcome--fail` class the results table needs. `cc-table` is a light-DOM wrapper that
styles whatever `<table>` markup it is handed.

**The tables should not be half-migrated.** Two of the four in `cc-metadata` have no
interactive cells and could move today, but that would put two implementations side by
side in one card with mismatched headings — `candor-table` renders its `caption` visibly
with no `::part` to hide it, while ours sits `sr-only` under an `<h3>`. Decided
2026-08-07 to wait for `pawn002/candor#258`, which would let all four migrate at once and
delete `cc-table` entirely. Everything else already matches, including the zebra stripe,
which uses `--color-bg-surface` — the same token `candor-table` stripes with.

### Upstream workarounds carried here

Each is pinned by a spec so it can be deleted when upstream lands the fix:

| Workaround | Why | Upstream |
|---|---|---|
| Roving tabindex on the contrast-type radios (`_applyRovingTabIndex` in `app.ts`) | `candor-radio` leaves `tabindex="0"` on every option, making the group N tab stops instead of one | `candor#262` |
| Page scroll lock while a modal is open (`_setPageScrollLock`) | `showModal()` makes the page inert but not unscrollable; arrow keys reached the page behind the note | `candor#265` |
| Tooltips on edge controls point inward | `candor-card` clips its overflow on a shadow node exposed neither as a `::part` nor a custom property, so a centred bubble is cut off | `candor#259` |
| Icons inlined as raw `<path>` data | Candor stipulates Phosphor but exports no icon set | `candor#260` |

### Design token conventions

Style files reference Candor tokens directly. The old application-level aliases were
removed during the migration:

| Removed alias | Candor token |
|---|---|
| `--mono-font` | `--font-family-mono` |
| `--body-font` | `--font-family-accessible` |
| `--header-font` | `--font-family-base` |
| `--ideal-body-text-black` | `--color-text-default` |

Typography follows Candor's four-voice system, with the rules in `styles.scss`. See
[Contributing](./contributing.md#typography) for the reasoning; the short version is that
Roboto Flex (`--font-family-base`) is the document voice, Atkinson Hyperlegible
(`--font-family-accessible`) is reserved for `cc-alert`, mono is for numeric columns, and
headings use the `--font-size-h1..h6` tokens shifted one level down.

## Service architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      ColorUtilService                       │
│  - Parsing, conversion, hex/OKLCH round-tripping            │
│  - sRGB gamut mapping and in-gamut range finding            │
│  - Chroma matching, variant generation, random pairs        │
│  - Delta E, WCAG 2 ratio, minimum object dimension          │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
┌─────────────────────────┐  ┌─────────────────────────┐
│   ColorMetricsService   │  │       BpcaService       │
│  - OKCA (primary)       │→ │  - Bridge-PCA algorithm │
│  - APCA                 │  │  - Luminance (sRGBtoY)  │
│  - Delta E passthrough  │  │  - WCAG 2.x ratio bridge│
└─────────────────────────┘  └─────────────────────────┘
```

- **ColorMetricsService** uses **ColorUtilService** and **BpcaService**
- **BpcaService** takes a `ColorUtilService` in its constructor
- **ColorUtilService** depends only on external libraries

Each module exports a ready-made instance. There is no `providedIn: 'root'`, no
`inject()`, and no injector — importing the singleton *is* the wiring.

## Data flow

```
1. User picks a color in <cc-color-picker>
        ↓
2. It dispatches `selected-color` with the hex in `detail`
        ↓
3. <cc-app>'s @event binding sets `this.fgColor`
        ↓
4. Lit schedules a re-render of <cc-app>
        ↓
5. The new value flows down as properties:
        ├──▶ <cc-color-contrast>   recalculates via ColorMetricsService
        ├──▶ <cc-metadata>         recomputes OKLCH values and outcomes
        ├──▶ <cc-color-slider>     recomputes its range and gradient
        └──▶ <cc-palette-table>    regenerates the variant grid
        ↓
6. `_updateUrl()` writes the new state to the query string
```

### State ownership

**On `<cc-app>`**: `fgColor`, `bgColor`, `fgComparedColor`, `bgComparedColor`,
`contrastType`, `constantChroma`, `showGradient`, `activeNoteModal`,
`currentAlertMessage`, `resetSlider`.

**On individual components**: interaction-local state only — slider position, the
computed lightness range, gradient stops.

**No global store.** Root-owned state is sufficient at this size.

## URL state management

State lives in query parameters so a URL restores the exact app state. This is plain
`URLSearchParams` and `history.replaceState` — there is no router.

### Query parameters

| Parameter | Meaning | Default | Written when |
|---|---|---|---|
| `fg` | Foreground color (hex) | none | Always, if set |
| `bg` | Background color (hex) | none | Always, if set |
| `type` | Contrast algorithm | `okca` | Only when not `okca` |
| `chroma` | Constant chroma enabled | `true` | Only when `false` |
| `gradient` | Show gradient enabled | `true` | Only when `false` |

Defaults are omitted deliberately, so the common case produces a short, readable URL.

### Writing

`_updateUrl()` in `app.ts` is called from each handler that changes shared state:

```ts
private _updateUrl() {
  if (this.isInitializing) return;
  const params = new URLSearchParams();
  if (this.fgColor) params.set('fg', this.fgColor);
  if (this.bgColor) params.set('bg', this.bgColor);
  if (this.contrastType !== 'okca') params.set('type', this.contrastType);
  if (!this.constantChroma) params.set('chroma', 'false');
  if (!this.showGradient) params.set('gradient', 'false');
  const queryString = params.toString();
  window.history.replaceState(null, '', queryString ? `?${queryString}` : '/');
}
```

`replaceState` rather than `pushState`: dragging a slider would otherwise stack hundreds
of history entries and make the back button useless.

### Reading

`connectedCallback()` reads the URL once, before the first render:

```ts
override connectedCallback() {
  super.connectedCallback();
  const hasUrlState = this._loadStateFromUrl();
  if (!hasUrlState) {
    this._setRandomColorPair(true);
  }
  setTimeout(() => {
    this.isInitializing = false;
  });
}
```

`_loadStateFromUrl()` validates `type` against the known set before accepting it, and
returns whether any *color* state was present — toggles alone do not count as state, so
a URL carrying only `?gradient=false` still gets a random pair.

The `isInitializing` guard stops the initial property assignments from writing a URL
before the app has settled. It is cleared in a `setTimeout` so that it survives the
current task, including the async random-pair generation.

### Shareable URLs

```
https://pawn002.github.io/color-pair-quick-iterator/?fg=%232d5a3f&bg=%23f4f7f5
```

Opening one loads those colors, recalculates contrast, and reflects the state throughout
the UI.

## Rendering and updates

Lit batches property changes into a single asynchronous re-render, and re-renders only
the dynamic parts of a template. There is no change-detection strategy to configure and
no zone to opt out of.

The lifecycle hooks this app uses:

- **`connectedCallback()`** — read the URL, seed initial state
- **`updated(changed)`** — react to a specific property having changed. `<cc-app>` uses
  it to reapply the roving tabindex and to lock page scroll when a modal opens
- **`disconnectedCallback()`** — release the scroll lock, so a modal torn down while open
  does not leave the page frozen
- **`updateComplete`** — the promise the specs await; also used to wait for
  `candor-radio` to render its shadow root before reaching into it

## Color space strategy

### Why OKLCH

1. **Perceptually uniform** — equal numeric changes produce roughly equal perceived
   changes
2. **Independent axes** — lightness, chroma, and hue can be adjusted without disturbing
   each other
3. **Wide gamut** — can represent colors outside sRGB, which matters for finding the
   edges of what is displayable
4. **Standard** — CSS Color Level 4

### Pipeline

```
User input (hex from <input type="color">)
        ↓
  parseColor() → colorjs.io Color in OKLCH
        ↓
  Manipulate lightness / chroma / hue
        ↓
  Gamut-map to sRGB
        ↓
  toHexString() → hex for display and for the URL
```

### Gamut mapping

```ts
color.toGamut({ method: 'oklch.c', space: 'srgb' });
```

Reduces chroma while preserving lightness and hue — the right trade for this app, where
lightness is the axis the user is manipulating.

Several methods are async (`isInSrgbGamut`, `getMinMaxLight`, `matchChromas`,
`getRandomColorPair`) because finding the in-gamut range means testing many candidate
coordinates.

## Build and deployment

### Build

```bash
npm start               # vite dev server on :5173, HMR
npm run build           # production build to dist/ — portable, root-relative
npm run build:gh-pages  # adds --base=/color-pair-quick-iterator/ — what CI deploys
npm run typecheck       # tsc --noEmit — the only thing that type-checks this repo
```

Target is ES2022, output `dist/`. **`vite build` does not type-check** — it transpiles and
strips types without invoking the compiler, so a type error passes the build and ships.
Nothing in this repo checked types until the `typecheck` script was added, at which point
it immediately reported two genuine errors that had been sitting unread.

### Deployment

GitHub Pages, published by GitHub Actions on every push to `main`. There is no committed
build output and no manual deploy script. `.github/workflows/deploy.yml` type-checks,
tests, builds with the subpath base, and publishes via `actions/deploy-pages` using OIDC
— no stored secrets.

See [Deployment](./deployment.md), including why a green deploy job is not on its own
evidence that the site updated.

## Dependencies

### Runtime

**Framework**
- `lit` (^3.2.0) — the only framework dependency

**Design system**
- `@candor-design/web-components` (^5.0.1) — shadow-DOM primitives, single entry point
- `@candor-design/tokens` (^5.0.1) — tokens as CSS custom properties

**Color science**
- `colorjs.io` (^0.5.2) — conversions, gamut mapping, Delta E
- `@pawn002/okca` (^2.0.2) — OKCA, the primary contrast algorithm
- `apca-w3` (^0.1.9) — APCA
- `bridge-pca` (^0.1.6) — WCAG 2.x bridge (partially reimplemented in `BpcaService`
  because the published package has dependency problems with colorparsely)
- `d3` (^7.9.0) — scale utilities for contrast-to-size mapping

**Fonts**
- `@fontsource-variable/roboto-flex`, `@fontsource-variable/roboto-mono`,
  `@fontsource-variable/source-code-pro`, `@fontsource/atkinson-hyperlegible`

**Utility**
- `lodash-es` (^4.17.21)

### Development

- `vite` (^6.3.5) — build and dev server
- `vitest` (^3.2.2) with `jsdom` — tests
- `typescript` (~5.7.3) — strict mode
- `sass` — SCSS compilation
- Prettier — configured in `package.json`, no separate config file

## Performance

- **Lit's templating** re-renders only the dynamic parts of a template, and batches
  property changes into one asynchronous update
- **Tree shaking** removes unused code in production builds
- **Async gamut work** keeps the expensive range-finding off the synchronous render path

The main outstanding cost is the design system: the single-entry-point import ships all
41 Candor elements for the ~12 the app uses. The production bundle is 405 kB raw / 106 kB
gzipped, and most of it is elements that never render. Tracked as `pawn002/candor#257`;
it is the only upstream issue with direct bundle impact.

## Security

1. **No user data** is stored or transmitted
2. **Client-side only** — all processing happens in the browser
3. **No external API calls** — the app is self-contained
4. **No secrets in the pipeline** — deployment authenticates with OIDC and the built-in
   `GITHUB_TOKEN`

## Accessibility

The app promotes accessible color pairs, and is itself built to the same standard. What
is deliberate rather than incidental:

- **A skip link** to `#main-content`, whose target carries `tabindex="-1"` — without it
  the fragment only sets Chrome's sequential-focus starting point, leaving a screen
  reader's virtual cursor behind
- **Live regions that exist before they are populated.** A region created
  already-populated is unreliable; `cc-alert` and `cc-color-contrast` both render an
  empty `role="status"` region up front and write into it afterwards
- **`aria-valuetext` on the sliders**, reported as a percentage and kept in step with the
  thumb
- **Distinct ids for host and inner input** in `cc-color-slider` — a duplicate made
  `label[for]` resolve to the host, the first match in document order, leaving the range
  input with no accessible name at all
- **One tab stop for the radio group**, via the roving-tabindex workaround above
- **Page scroll locked behind an open modal**, so arrow keys reach the note rather than
  the page

## Scaling

Currently a single-page, client-only app with no backend and no database. If it grows,
the obvious directions are a PWA for offline use (#121), undo/redo (#73), and saved
palettes — none of which need a state-management library at this size.

## Next steps

- [Services](./services.md) — the color and contrast APIs
- [Components](./components.md) — the `cc-*` element APIs
- [Contributing](./contributing.md) — conventions before changing anything
- [Testing](./testing.md) — how the above is verified

## References

- [Lit documentation](https://lit.dev/docs/)
- [OKCA](https://github.com/pawn002/okca) — the primary contrast algorithm
- [OKLCH color space](https://oklch.com/)
- [APCA](https://github.com/Myndex/apca-w3)
- [colorjs.io](https://colorjs.io/)
