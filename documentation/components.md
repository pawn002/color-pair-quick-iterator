# Components

Reference for the UI components in Color Pair Quick Iterator (CPQI).

## Overview

There are two groups:

- **App components** (`src/app/_components/`) — eight Lit elements authored here, all
  prefixed `cc-*`
- **Design-system components** — `candor-*` elements from
  `@candor-design/web-components`; **not** in this repo

Every app component is a Lit element with co-located files:

```
component-name/
├── component-name.ts               # Lit element: logic and template together
├── component-name.component.scss   # Styles, imported by the .ts file
└── component-name.spec.ts          # vitest spec (where one exists)
```

There is no `.component.ts` and no separate `.html`. Those were the Angular versions and
have been removed; only the `.component` in the *stylesheet* name survives as a historical
leftover.

## Conventions used throughout

Every app component:

- Renders into the **light DOM** (`createRenderRoot()` returns `this`), so the global
  token stylesheet applies
- Declares itself in `HTMLElementTagNameMap`, which keeps `document.createElement` and
  the `mount()` test helper typed
- Dispatches `CustomEvent`s with `bubbles: true, composed: true`, named for what happened

Bindings in a parent's template:

| Syntax | Sets |
|---|---|
| `.prop=${value}` | a property — **required** for objects, arrays, and booleans passed as values |
| `attr=${value}` | an attribute |
| `?attr=${value}` | toggles an attribute |
| `@event=${handler}` | an event listener |

Several properties declare a lowercase `attribute:` name, because HTML attributes are
case-insensitive — `colorOne` is the property, `colorone` the attribute. Prefer the
property form (`.colorOne=${…}`) in templates.

---

## Root element

### `<cc-app>`

**Location**: `src/app/app.ts`

The root element. Owns all application state, synchronises it with the URL, and
orchestrates every child.

#### Responsibilities

- Owns the foreground/background color pair (selected and compared)
- Owns the contrast type: OKCA, APCA, Bridge-PCA, APCA object, or Delta E
- Owns the UI toggles: constant chroma, show gradient
- Reads state from the query string on connect; writes it back on every change
- Handles swap, match-chromas, reset-sliders, and random-pair generation
- Manages alert messages and the contextual note modals

#### State

All `@state()`, all private:

```ts
@state() private fgColor = '';
@state() private bgColor = '';
@state() private fgComparedColor = '';
@state() private bgComparedColor = '';
@state() private contrastType: ContrastType | 'apca object' = 'okca';
@state() private constantChroma = true;
@state() private showGradient = true;
@state() private activeNoteModal: string | null = null;
@state() private currentAlertMessage: AlertMessageObj = { message: '' };
@state() private resetSlider: ResetObject | null = null;
```

#### Notable internals

**`_updateUrl()`** — writes the query string with `history.replaceState`. Guarded by
`isInitializing` so startup does not write a URL before the app has settled. Defaults are
omitted, so the common case yields a short URL.

**`_loadStateFromUrl()`** — reads the query string in `connectedCallback()`, validates
`type` against the known set, and returns whether any *color* state was present. Toggles
alone do not count, so `?gradient=false` still gets a random pair.

**`_applyRovingTabIndex()`** — makes the contrast-type radio group a single tab stop.
`candor-radio` implements arrow-key movement but leaves `tabindex="0"` on every option's
inner input, so five options would cost five tab stops. This reaches through each
element's shadow root to set `-1` on the unselected ones. Delete it when
`pawn002/candor#262` lands.

**`_setPageScrollLock()`** — locks document scrolling while a note modal is open.
`showModal()` makes the page inert, but inert does not mean unscrollable, so arrow keys
reached the page behind the note. Also compensates for the scrollbar the lock removes, or
the page jumps sideways as the modal opens. Upstream as `pawn002/candor#265`.

**Icon constants** — `_INFO_SVG` and `_ACCESSIBILITY_SVG` are inlined `<path>` data.
Candor stipulates Phosphor but exports no icon set (`pawn002/candor#260`), so new glyphs
are pasted in beside these, sourced from `@phosphor-icons/core` at the `fill` weight with
Phosphor's `viewBox="0 0 256 256"`.

---

## App components

### 1. `<cc-color-picker>`

**Location**: `src/app/_components/color-picker/`

An `<input type="color">` with a label and an optional "compared color" swatch.

#### Properties

```ts
@property({ attribute: 'inputid' }) inputId = 'fg-color';
@property({ attribute: 'inputname' }) inputName = 'foreground color';
@property() label = 'Color';
@property() color = '';
@property({ attribute: 'comparedcolor' }) comparedColor = '';
@property({ type: Boolean }) debug = false;
```

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `selected-color` | `string` — the hex value | The user picks a color |

#### Behavior

- Emits `selected-color` on the input's `input` event, so dragging in the OS picker
  reports continuously
- Clears the compared swatch to `transparent` whenever a new color is picked
- Syncs the native input's value when the `color` property changes from outside

#### Usage

```ts
html`
  <cc-color-picker
    inputid="picker-one"
    inputname="foreground-color"
    label="Foreground"
    .color=${this.fgColor}
    .comparedColor=${this.fgComparedColor}
    @selected-color=${this._handleFgColorInput}
  ></cc-color-picker>
`;
```

> **Known gap**: there is no way to type a hex value. `<input type="color">` opens an
> OS-level picker with no text entry. Tracked as #120/#119.

---

### 2. `<cc-color-slider>`

**Location**: `src/app/_components/color-slider/`

A range slider that varies a color's lightness, optionally holding chroma constant.

#### Properties

```ts
@property() override id = 'slider-0';
@property() name = 'color-slider';
@property() label = 'Lightness';
@property() color = '';
@property({ type: Boolean, attribute: 'constantchroma' }) constantChroma = false;
@property({ type: Boolean, attribute: 'showgradient' }) showGradient = false;
@property({ type: Object, attribute: false }) resetSlider: ResetObject | null = null;
@property({ type: Boolean }) debug = false;
```

#### Types

```ts
export interface ResetObject {
  reset: boolean;
}
```

`resetSlider` is an object rather than a boolean because a new object identity is what
signals "reset again" — a boolean that is already `true` cannot re-trigger.

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `color-variant` | `string \| null` — the hex variant | On first range resolution, and on every slide |

#### Behavior

- Asks `ColorUtilService` for the in-gamut lightness range, which is asynchronous — so
  **the range input does not exist on the first render**
- With `constantChroma`, holds chroma and hue and moves only lightness
- With `showGradient`, paints the available range as a linear-gradient background
- Emits `color-variant` as the thumb moves

#### Accessibility

Two details here exist because of specific defects:

- **The inner input's id is derived (`${this.id}-input`), not shared with the host.** A
  duplicate made `label[for]` resolve to the host — the first match in document order —
  leaving the range input with no accessible name at all.
- **`aria-valuetext` tracks the thumb**, reported as a percentage. The component's
  `value` is assigned on every slide specifically to keep it in step; it was previously
  frozen at the initial position.

The input also carries `aria-describedby` pointing at a description of the available
range, formatted as `Lightness range: {min}% to {max}%`. The range is genuinely narrow
for saturated colors — high chroma is only displayable across a small band of lightness —
so this is information the user needs, not decoration.

#### Usage

```ts
html`
  <cc-color-slider
    id="slider-0"
    label="Foreground lightness"
    .color=${this.fgColor}
    ?constantchroma=${this.constantChroma}
    ?showgradient=${this.showGradient}
    .resetSlider=${this.resetSlider}
    @color-variant=${this._handleFgSliderInput}
  ></cc-color-slider>
`;
```

---

### 3. `<cc-color-contrast>`

**Location**: `src/app/_components/color-contrast/`

The contrast score in the sticky header. The score text uses a container query (`55cqh`)
so it fills the header box responsively.

#### Properties

```ts
@property({ attribute: 'colorone' }) colorOne = '';
@property({ attribute: 'colortwo' }) colorTwo = '';
@property({ attribute: 'contrasttype' }) contrastType: ContrastType | 'apca object' = 'okca';
@property({ type: Boolean }) debug = false;
```

#### Behavior

Recomputes the score whenever the colors or the type change, via `ColorMetricsService`.
What it displays depends on `contrastType`:

| `contrastType` | Shows |
|---|---|
| `okca` | OKCA ratio — OKLCH-native, polarity-aware, WCAG-compatible |
| `apca` | APCA Lc score |
| `bpca` | WCAG 2.x-compatible ratio |
| `deltaE` | Perceptual color difference |
| `apca object` | Minimum object dimension, in pixels |

#### Accessibility

The visual score is `aria-hidden="true"`. Announcements go through a **persistent**
`role="status"` live region that is rendered empty and written into afterwards — a region
created already-populated does not reliably announce.

The announcement is mode-aware, because "Contrast score: 3" means nothing in object mode:

```ts
get contrastAnnouncement() {
  if (!this.colorOne || !this.colorTwo) return '';
  const score = this.contrastScore;
  if (this.contrastType === 'apca object') {
    return score ? `Minimum object dimension: ${score} pixels` : 'Contrast too low for any object';
  }
  if (isNaN(score)) return 'Contrast score unavailable';
  if (this.contrastType === 'deltaE') return `Delta E: ${score}`;
  return `Contrast score: ${score}`;
}
```

#### Usage

```ts
html`
  <cc-color-contrast
    .colorOne=${this.fgComparedColor || this.fgColor}
    .colorTwo=${this.bgComparedColor || this.bgColor}
    .contrastType=${this.contrastType}
  ></cc-color-contrast>
`;
```

---

### 4. `<cc-metadata>`

**Location**: `src/app/_components/metadata/`

Detailed OKLCH values for both colors, the differences between them, and pass/fail
outcomes. Renders four `<cc-table compact>` tables.

#### Properties

```ts
@property({ attribute: 'colorone' }) colorOne = '';
@property({ attribute: 'colortwo' }) colorTwo = '';
@property({ type: Boolean }) debug = false;
```

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `note-requested` | `string` — a note key | An info button is clicked |

Note keys: `okca`, `apca`, `bpca`, `apca object`, `deltaE`, `wcag2`. `<cc-app>` maps the
key to a `candor-modal`.

#### Displays

**Per color** — lightness, chroma, hue, and a calculated saturation percentage.

**Differences** — Delta E 2000, WCAG 2.1 contrast ratio, APCA score, minimum object
dimension.

**Outcomes** — text contrast (WCAG AA, 4.5:1), large-text contrast (AA, 3:1), and minimum
object size. Result cells carry `outcome--pass` / `outcome--fail`.

Tooltips inside this component use `position="right"` so the bubble points into the card
rather than off its edge.

---

### 5. `<cc-palette-table>`

**Location**: `src/app/_components/palette-table/`

A grid of color variants across lightness and chroma. Wraps `<candor-tone-picker>` and
translates between it and the app's own cell data.

#### Properties

```ts
@property() color = '';
@property({ type: Boolean }) debug = false;
```

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `selected-color` | `TableColorCell` | A grid cell is activated |

#### Types

Exported from `services/color-util.service.ts`:

```ts
export interface TableColorCell {
  color: string;           // Hex value
  lightness: number;       // OKLCH L
  chroma: number;          // OKLCH C
  hue: number;             // OKLCH H
  deltaE: number;          // Perceptual difference from the base color
  deltaChroma: number;     // Percentage change in chroma
  deltaLightness: number;  // Percentage change in lightness
}

export type TableRow = Array<TableColorCell>;
export type TableData = Array<TableRow>;
```

#### Behavior

- Generates variants via `ColorUtilService.generateAdaptiveVariants()`, centred on the
  base color
- Out-of-gamut coordinates become disabled cells, which render blank and are not
  focusable
- Builds a lookup index from OKLCH coordinates back to cells, so a selection from
  `candor-tone-picker` (which reports an OKLCH string) resolves to the full
  `TableColorCell`
- Regenerates when `color` changes

The grid keyboard model, roving tabindex, and live-region announcements all belong to
`candor-tone-picker`. There is no local tone-picker component — the Angular-era
`TonePickerComponent` was replaced by the upstream element in the migration.

---

### 6. `<cc-table>`

**Location**: `src/app/_components/table/`

A styling wrapper around an authored `<table>`.

#### Properties

```ts
@property({ type: Boolean, reflect: true }) compact = false;
```

`reflect: true` so the stylesheet can select on the attribute without a class hook.

#### How it works

The component renders `<slot></slot>`, which in the light DOM **does nothing** — Lit
appends it *after* the authored children. That is fine here, and is the whole trick: the
authored `<table>` stays in the light DOM, where the component's global stylesheet
(`cc-table table { … }`) reaches it directly. Nothing is being projected.

Do not read this as a working example of slots. It works because the content does not
need to move.

#### Usage

```ts
html`
  <cc-table .compact=${true}>
    <table>
      <caption class="sr-only">Color one</caption>
      <tbody>
        <tr><th scope="row">Lightness</th><td class="numeric">0.63</td></tr>
      </tbody>
    </table>
  </cc-table>
`;
```

#### Why not `candor-table`

`candor-table` is data-driven: `headers: string[]`, `rows: { cells: string[] }[]`. Half
the tables in `cc-metadata` put an interactive tooltip and info button inside a cell, and
a cell that can only be text has nowhere to put one — nor can it carry the
`outcome--pass` / `outcome--fail` class the results table needs.

**Do not half-migrate.** Two of the four tables have no interactive cells and could move
today, but that would put two implementations side by side in one card with mismatched
headings: `candor-table` renders its `caption` visibly with no `::part` to hide it, while
ours sits `sr-only` under an `<h3>`. Decided 2026-08-07 to wait for
`pawn002/candor#258`, which would let all four migrate at once and delete `cc-table`
entirely. Everything else already matches — including the zebra stripe, which uses
`--color-bg-surface`, the same token `candor-table` stripes with. Keep them pointed at
the same token rather than reintroducing a literal.

---

### 7. `<cc-alert>`

**Location**: `src/app/_components/alert/`

Transient notifications, auto-dismissed after five seconds.

#### Properties

```ts
@property({ type: Object, attribute: false }) alertMessage: AlertMessageObj = { message: '' };
```

#### Types

```ts
export interface AlertMessageObj {
  message: string;
}
```

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `alert-closed` | `true` | The alert is dismissed |

#### Behavior and accessibility

This component is mostly accessibility plumbing, and each piece is deliberate:

- **The live region is always in the DOM**, separate from the toast, and rendered empty.
  `candor-toast` carries its own `role="status"`, but it is created along with its text
  and torn down five seconds later — a live region must be present and observed *before*
  its contents change. `candor-toast-container` does not close that gap: its shadow root
  is a bare `<slot>`, so the region still arrives with each toast.
- **The toast is `aria-hidden="true"`**, so the message is not queued twice.
  `aria-hidden` covers its shadow root too. Upstream as `pawn002/candor#266`; drop the
  `aria-hidden` and the local region if the container grows one of its own.
- **`_announce()` clears the region, then sets it on a later task.** A live region only
  announces when its contents *change*, so copying the same color twice would otherwise
  be silent the second time — and the clear/set pair must land in separate tasks or the
  mutations coalesce into no net change.
- **`candor-toast-container` is Candor's documented outlet** — `position: fixed` to a
  viewport corner at `z-index: 2000`. It stays mounted whether or not a toast is showing,
  so the stack has somewhere to land. Auto-dismissal is the consumer's job by design;
  that is the five-second timer here, not something the container does.

`<cc-alert>` is placed **outside** `<main>` in `app.ts`. `.app-container` uses
`transform: translateX(-50%)`, and a transformed ancestor becomes the containing block
for `position: fixed` descendants — inside, the toast rendered over 1300px below the
fold.

---

### 8. `<cc-copy-to-clipboard-button>`

**Location**: `src/app/_components/copy-to-clipboard-button/`

Copies a color's hex value to the clipboard.

#### Properties

```ts
@property() color = '';
@property() label = 'Copy to Clipboard';
@property({ type: Boolean }) debug = false;
```

#### Events

| Event | `detail` | Fired when |
|---|---|---|
| `copy-event` | `{ copied: boolean; color: string }` | A copy succeeds or fails |

#### Behavior

- Uses `navigator.clipboard.writeText()`
- **Copies the hex without the leading `#`** — `#ff5733` is written as `ff5733`, and the
  event `detail.color` carries the same stripped form
- Disables itself when `color` is empty
- Emits `copy-event` with `copied: false` on failure rather than throwing

Its tooltip uses `position="left"`, since the button sits at the right edge of its card.

---

## Design-system components (`candor-*`)

These are **not** in this repo. They come from `@candor-design/web-components`, which
`src/main.ts` imports once — a single import that registers every element the package
ships. The package publishes its own hosted catalog; consult that for the full API rather
than a copy maintained here, which is what went stale last time.

The app renders: `candor-accordion-item`, `candor-button`, `candor-card`,
`candor-checkbox`, `candor-modal`, `candor-radio`, `candor-text`, `candor-toast`,
`candor-toast-container`, `candor-tone-picker`, `candor-tooltip`.

They use shadow DOM, unlike the `cc-*` components above. Two consequences:

- **Design tokens still apply** — they are custom properties on `:root`, and custom
  properties inherit through shadow boundaries
- **Global SCSS does not** — a selector cannot reach inside one. Use the documented
  `--candor-*` custom properties or `::part()`

### API differences worth knowing

| Instead of | Use | Because |
|---|---|---|
| `title=` | `heading=` | `title` is a global HTML attribute and renders a browser tooltip |
| `@changed` | `@change` | Form controls emit `change`, with the value/state as `detail` |
| `@clicked` | `@click` | `candor-button` emits nothing; the inner button's click retargets to the host |
| `@open-change` | `@close` | Fires only on close, so it carries no state |
| `size="icon"` | `class="button--icon"` | Sets the `--candor-button-*` hooks from `styles.scss` |

### Gotchas this app works around

- **`candor-card` clips overflow**, and `candor-tooltip` positions its bubble absolutely,
  so a tooltip inside a card is cut off at the card's edge. The card sets
  `overflow: hidden` on a shadow node exposed neither as a `::part` nor through a custom
  property — there is no CSS fix from this side. `candor-toolbar` is no better; its
  `overflow-x: auto` computes `overflow-y` to `auto`. Upstream as `pawn002/candor#259`.
  **Point edge-adjacent tooltips inward** — `position="right"` on the color pickers (left
  edge), `position="left"` on the copy buttons and Options info buttons (right edge).
  Only reach for a structural fix when no direction works.
- **A group of `candor-radio`s always gets a `<fieldset>` and a `<legend>`.** The legend
  supplies the question context screen readers announce before each option, and
  `candor-radio` resolves its group as `closest('fieldset')` then `parentElement`. Every
  option in `app.ts` sits in its own `.radio-item` wrapper for the info button, so the
  fieldset is the only thing letting the group find itself — remove it and arrow keys
  *and* mutual exclusion both die, with no error.
- **`candor-radio` leaves `tabindex="0"` on every option**, which would make the group N
  tab stops. See `_applyRovingTabIndex()` above.

`src/app/candor-package.spec.ts` pins each of these so the workaround can be deleted when
upstream fixes it.

---

## Communication patterns

### Parent to child

```ts
// Parent
html`<cc-color-picker .color=${this.fgColor}></cc-color-picker>`;

// Child
@property() color = '';
```

Use `.prop` for anything that is not a string. An object passed as an attribute
stringifies to `[object Object]`.

### Child to parent

```ts
// Child
this.dispatchEvent(
  new CustomEvent('selected-color', { detail: color, bubbles: true, composed: true }),
);

// Parent
html`<cc-color-picker @selected-color=${this._handleFgColorInput}></cc-color-picker>`;
```

There is no two-way binding. A child never writes to a property the parent owns; it
reports, and the parent decides.

### Derived values

Plain getters, re-evaluated on each render:

```ts
get contrastAnnouncement() {
  return `Contrast score: ${this.contrastScore}`;
}
```

### Reacting to a specific change

```ts
override updated(changed: PropertyValues) {
  if (changed.has('activeNoteModal')) {
    this._setPageScrollLock(this.activeNoteModal !== null);
  }
}
```

---

## Component best practices

1. **`cc-*` prefix, never `candor-*`** — a collision breaks registration for every
   element after it
2. **`createRenderRoot()` returns `this`** — light DOM, so tokens and global styles apply
3. **No `<slot>`** — it does nothing in the light DOM
4. **Declare the tag in `HTMLElementTagNameMap`** — or the test helpers lose their types
5. **Name events for what happened** — `note-requested`, not `showNote`
6. **Prefix stylesheet selectors with the component's tag** — the stylesheets are global
7. **Reference Candor tokens, not literals**

---

## Testing

```ts
import { describe, it, expect, afterEach } from 'vitest';
import './color-picker';
import { mount, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

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

See the [Testing Guide](./testing.md).

---

## Styling

**Component stylesheets are global.** Each `*.component.scss` is imported by its `.ts`
file and becomes a plain global stylesheet, because the component renders into the light
DOM. Every top-level selector must be prefixed with the component's own tag:

```scss
// Good
cc-metadata .comp-container { … }

// Wrong — collides with every other component's .comp-container
.comp-container { … }
```

Seven files once declared a bare `.comp-container` and silently overwrote each other.
`_components/styles-scoping.spec.ts` enforces the prefix.

`:host` does nothing here either — there is no shadow root. Style the tag directly:
`cc-table { display: block; }`.

**Global styles** live in `src/styles.scss`: font imports, the typography rules, the
`sr-only` utility, and base element styles built from tokens.

---

## Accessibility

Beyond semantic markup and keyboard support, the specific things this app does:

1. **A skip link** to `#main-content`, whose target carries `tabindex="-1"` — without it
   the fragment only sets Chrome's sequential-focus starting point and leaves a screen
   reader's virtual cursor behind
2. **Live regions rendered empty and written into afterwards**, in `cc-alert` and
   `cc-color-contrast`
3. **Mode-aware announcements** — the contrast readout says what the number *means*
4. **`aria-valuetext` on sliders**, kept in step with the thumb
5. **Distinct host and input ids**, so `label[for]` reaches the control
6. **One tab stop per radio group**, via the roving-tabindex workaround
7. **Page scroll locked behind an open modal**

---

## Next steps

- [Services](./services.md) — the APIs these components call
- [Architecture](./architecture.md) — how it all fits together
- [Contributing](./contributing.md) — conventions for adding a component
- [Testing](./testing.md) — patterns for exercising one

## References

- [Lit documentation](https://lit.dev/docs/)
- [Candor design system](https://github.com/pawn002/candor)
