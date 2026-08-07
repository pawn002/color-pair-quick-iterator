# Getting Started

This guide gets the Color Pair Quick Iterator (CPQI) development environment running.

## Prerequisites

### Required

- **Node.js** — version 20 or 22 (CI tests both; Vite 6 does not target Node 18)
  - https://nodejs.org/ — verify with `node --version`
- **npm** — ships with Node — verify with `npm --version`
- **Git** — https://git-scm.com/ — verify with `git --version`

No browser is required for tests: they run in Node under jsdom.

### Recommended

- **Visual Studio Code**, with:
  - **lit-plugin** — syntax highlighting and type-checking inside `html` templates
  - **Prettier**
  - **EditorConfig for VS Code**
- Any modern browser for manual checks. The app uses `<input type="color">`, whose
  picker UI is supplied by the OS and differs between platforms.

---

## Installation

### 1. Clone

```bash
git clone https://github.com/pawn002/color-pair-quick-iterator.git
cd color-pair-quick-iterator
```

### 2. Install

```bash
npm install
```

This pulls Lit, Vite, vitest, the Candor packages, and the color-science libraries
(colorjs.io, `@pawn002/okca`, apca-w3, bridge-pca, d3).

### 3. Verify

```bash
npm run typecheck && npm test && npm run build
```

All three should pass. If they do, your environment is ready.

Run all three — they check different things. `npm run build` does **not** type-check:
`vite build` transpiles and strips types without ever invoking the compiler, so a type
error passes the build and ships.

---

## Running the development server

```bash
npm start
```

This runs `vite`, which prints something like:

```
  VITE v6.3.5  ready in 412 ms

  ➜  Local:   http://localhost:5173/
```

Open http://localhost:5173/. Vite serves the root `index.html`, which loads
`src/main.ts`. Edits hot-reload.

### Options

Vite flags pass straight through:

```bash
npm start -- --port 4300   # different port
npm start -- --open        # open a browser automatically
npm start -- --host        # expose on the local network, for device testing
```

To preview a real production build:

```bash
npm run build && npm run preview
```

---

## Project structure

```
color-pair-quick-iterator/
├── index.html                 # Vite entry point — loads src/main.ts
├── src/
│   ├── main.ts                # Registers Candor elements, imports fonts and globals
│   ├── styles.scss            # Global styles and typography rules
│   └── app/
│       ├── app.ts             # <cc-app> root element: all app state
│       ├── app.scss           # Root layout styles
│       ├── test-utils.ts      # mount / flush / update / cleanup helpers for specs
│       ├── candor-package.spec.ts    # Pins the upstream facts the app depends on
│       ├── _components/       # The app's own cc-* elements
│       │   ├── alert/
│       │   ├── color-contrast/
│       │   ├── color-picker/
│       │   ├── color-slider/
│       │   ├── copy-to-clipboard-button/
│       │   ├── metadata/
│       │   ├── palette-table/
│       │   ├── table/
│       │   └── styles-scoping.spec.ts
│       └── services/          # ColorUtil, ColorMetrics, Bpca
├── documentation/             # Developer documentation (you are here)
├── public/                    # Static assets, copied verbatim
├── .github/workflows/         # ci.yml, deploy.yml, draft-release.yml
├── vite.config.ts             # Build config AND vitest config
├── tsconfig.json
└── package.json               # Dependencies, scripts, and the Prettier config
```

There is no `angular.json`, no `app.config.ts`, and no `app.html`. Each component keeps
its logic and template together in one `.ts` file.

---

## Your first changes

### 1. Explore the app

1. `npm start`, then open http://localhost:5173/
2. Adjust the color pickers and the lightness sliders
3. Watch the contrast score in the sticky header update
4. Try **Swap Colors** and **Match Chromas**
5. Change the contrast algorithm in Options and note the score change
6. Copy the URL and open it in a new tab — the state comes back

### 2. Make a small change

1. Open `src/app/app.ts`
2. Find the `<h1>` in `render()`
3. Change the title text
4. Save — the browser hot-reloads

### 3. Read a component

Open `src/app/_components/color-slider/color-slider.ts` and note:

- `@customElement('cc-color-slider')` registers the tag
- `createRenderRoot()` returns `this`, so it renders into the light DOM
- `@property()` declares public API, `@state()` internal reactive state
- The template is an `html` tagged template with `.prop` / `?attr` / `@event` bindings
- `inputId` is a getter that deliberately differs from the host's `id` — a comment
  explains that the duplicate once made `label[for]` resolve to the host and left the
  range input with no accessible name at all

Then read `color-slider.spec.ts` beside it to see how it is exercised.

### 4. Read a service

Open `src/app/services/color-util.service.ts`:

- It is a plain class, exported at the bottom as `export const colorUtil = new ColorUtilService()`
- There is no DI container — consumers import that instance
- `parseColor()` is the entry point for everything else
- `getRandomColorPair()` produces the pair you see on a fresh load
- Several methods are `async` because sRGB gamut checks are

---

## Common tasks

### Building

```bash
npm run build           # portable build to dist/, for hosting at a root
npm run build:gh-pages  # adds --base=/color-pair-quick-iterator/ — what CI deploys
```

Output goes to `dist/`, which is git-ignored. There is no committed build output; a
`docs/` directory in an old checkout predates the Actions-based deploy.

### Testing

```bash
npm test              # single run, exits with a status code
npm run test:watch    # watch mode
```

Tests run in Node under jsdom — no browser, no Karma. Currently 238 tests across 9
files. See the [Testing Guide](./testing.md).

### Type-checking

```bash
npm run typecheck     # tsc --noEmit
```

The only thing in this repo that checks types. Run it before pushing.

### Formatting

Prettier, configured in `package.json`: 100-character width, single quotes. Configure
your editor to format on save.

### Linting

ESLint is not configured. Strict TypeScript plus the guard specs
(`candor-package.spec.ts`, `styles-scoping.spec.ts`) cover the rules that matter here.

---

## Understanding the color science

The app works in the **OKLCH color space**, which is perceptually uniform — equal
numeric changes produce roughly equal perceived changes:

- **L** (lightness): 0 to 1 — 0 is black, 1 is white
- **C** (chroma): 0 to ~0.4 — 0 is gray, higher is more saturated
- **H** (hue): 0 to 360 degrees — 0/360 red, 120 green, 240 blue

### The contrast algorithms

1. **OKCA** — the default. An OKLCH-native ratio on the familiar 1–21 scale, with the
   same AA (4.5) and AAA (7.0) thresholds as WCAG. It is polarity-aware and applies a
   chroma penalty, so it catches saturated pairs that WCAG passes but that are
   demonstrably hard to read. It never approves a pair WCAG rejects.
2. **APCA** — Accessible Perceptual Contrast Algorithm. Signed scores on roughly a
   −108 to +108 scale; polarity matters.
3. **Bridge-PCA** — converts an APCA score to a WCAG 2.x-style ratio, for backward
   compatibility.
4. **Delta E** — CIE Delta E 2000 perceptual color difference, not a contrast measure.
5. **APCA object** — the minimum object dimension in pixels for a given APCA score.

[Services](./services.md) documents the implementations.

---

## Troubleshooting

**`npm install` fails with permission errors**
Do not use `sudo npm install`. Fix npm's permissions:
https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

**Port 5173 is already in use**
Vite picks the next free port automatically and prints it. To pin one:
`npm start -- --port 4300`

**Blank page, console error about a duplicate custom element**
A local element has reclaimed a `candor-*` name. The package registers all its elements
from one entry point, so the collision throws and takes the rest down with it. Local
elements must use `cc-*`; `npm test` catches this.

**Styles from one component leaking into another**
Components render into the light DOM, so their stylesheets are global. Every top-level
selector must be prefixed with the component's own tag. `styles-scoping.spec.ts` catches
this.

**A component drops its children**
`<slot>` does nothing in the light DOM — Lit appends its template after the authored
children instead of projecting them. Use a `candor-*` element, or give the component a
shadow root.

**The build passes but the app breaks at runtime**
Run `npm run typecheck`. The build does not type-check.

**Changes not reflecting**
Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R). If that fails, restart the dev server —
Vite's dependency cache occasionally needs it after a dependency change.

---

## Next steps

1. [Architecture](./architecture.md) — how the pieces fit together
2. [Components](./components.md) — the `cc-*` element APIs
3. [Services](./services.md) — the color and contrast logic
4. [Contributing](./contributing.md) — conventions to follow before changing anything
5. [Testing](./testing.md) — how to exercise what you wrote
6. [CLAUDE.md](../CLAUDE.md) — the same conventions, in the form the AI tooling reads

---

## Workflow tips

1. **Keep `npm run test:watch` running while you iterate.** Faster feedback than
   reloading the app.
2. **Inspect elements directly in DevTools.** The app's own components render into the
   light DOM, so their markup appears in the Elements panel as-is. `candor-*` elements
   have shadow roots you can expand. Tokens resolve as CSS custom properties you can
   override live.
3. **Check both color schemes.** Toggle `prefers-color-scheme` in DevTools rendering
   options — several Candor surfaces differ meaningfully between them.
4. **Read the comments.** Where the code looks arbitrary it is usually recording a bug
   it is shaped to avoid, with an issue number attached.
5. **Ask "how is this done elsewhere?"** The codebase follows consistent patterns; the
   nearest neighbour is usually the answer.

Happy coding!
