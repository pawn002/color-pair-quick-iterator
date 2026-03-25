# Candor Design System — Release Findings from CQPI Migration

## Overview

Color Pair Quick Iterator (CQPI) completed a full migration to the Candor design system in March 2026 across 18 commits. The migration consumed 7 Candor components (Accordion, Button, Card, Checkbox, Radio, Table, Toast), adopted the full Candor token set, and replaced all legacy local CSS variable aliases with direct Candor semantic tokens.

During the migration, several confirmed bugs, API gaps, missing tokens, and non-obvious integration patterns were discovered. This document consolidates those findings as concrete proposals for the next Candor release.

---

## 1. Bug Fixes

### 1.1 Table — Dark mode zebra stripes invisible on elevated cards

**Severity:** High — affects every table placed inside an elevated card in dark mode.

**Root cause:** `table.component.scss` uses `--color-bg-elevated` for dark-mode row stripes. When a table sits inside an elevated card whose background is also `--color-bg-elevated`, the stripe colour matches the card background exactly — stripes become invisible.

In dark mode:
- `--color-bg-elevated` ≈ `oklch(0.30 0.02 248)` — the elevated card background
- Row stripes also set to `--color-bg-elevated` → same colour → no contrast

**Fix:** Replace `--color-bg-elevated` with `--color-bg-surface` (one step darker, ≈ `oklch(0.24 0.02 248)`) for dark-mode stripe rows, in both the `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]` blocks.

**Affected lines in `table.component.scss`:**
```scss
// Both standard and compact variants, both @media and [data-theme] selectors:
background: var(--color-bg-surface);  // was --color-bg-elevated
```

**Evidence:** CQPI applied this fix locally to make tables readable in dark mode.

---

### 1.2 Card — Elevated variant invisible in light mode

**Severity:** High — elevated cards blend into the page background in light mode.

**Root cause:** The `&--elevated` variant in `card.component.scss` has no `box-shadow`. In light mode, `--color-bg-elevated` resolves to near-white, which is visually indistinguishable from `--color-bg-page` (also white). The card has no visible boundary.

**Fix:** Add `box-shadow: var(--shadow-sm)` to the elevated variant:

```scss
&--elevated {
  background-color: var(--color-bg-elevated);
  border: var(--border-width-thin) solid var(--color-border-default);
  box-shadow: var(--shadow-sm);  // add this
}
```

**Scope:** Light mode only. Dark mode already works because elevation uses distinct OKLCH lightness values.

**Evidence:** CQPI added this locally; without it, elevated cards on a light-mode surface were invisible to users.

---

### 1.3 Toast — `--color-toast-message` token name is unclear

**Severity:** Low — functional but confusing.

**Root cause:** `--color-toast-message` is defined in `semantics.scss` as `--color-text-default` in light mode and `--color-text-subtle` in dark mode. The dark-mode dimming is intentional but the token name gives no hint of this. Consumers copying the component are likely to substitute `--color-text-default` directly, losing the dark-mode dimming.

**Proposals (pick one):**
- Rename to `--color-text-toast` to group it with other text tokens, and add a comment: `// intentionally subtle in dark mode`
- Or keep the name but add an inline comment in `semantics.scss` explaining the light/dark intentionality

**Evidence:** CQPI substituted `--color-text-default` directly, unknowingly losing the dark-mode dimming behaviour.

---

## 2. Component API Enhancements

### 2.1 AccordionItem — Add `variant` input for visual hierarchy

**Gap:** The existing component has no way to express visual hierarchy between accordion groups. A boolean `subtle` input is insufficient when an app needs three levels: primary section header, secondary subsection, and quiet help text.

**Proposed API addition:**
```ts
variant = input<'default' | 'subtle' | 'quiet'>('default');
```

| Variant | Font weight | Font size | Colour |
|---------|-------------|-----------|--------|
| `default` | `--font-weight-semibold` | `--font-size-md` | `--color-text-default` |
| `subtle` | `--font-weight-regular` | `--font-size-md` | `--color-text-subtle` |
| `quiet` | `--font-weight-regular` | `--font-size-sm` | `--color-text-subtle` |

**Evidence:** CQPI added this locally and applied it across three accordion groups in the same card — primary LCH controls (`default`), secondary LCH limits (`subtle`), and help text (`quiet`).

---

### 2.2 Card — Make `overflow: hidden` opt-in

**Gap:** `overflow: hidden` on `.card` clips sticky children. A sticky `<thead>`, a sticky toolbar, or a sticky alert bar inside a card will not stick — it gets clipped by the overflow boundary.

**Proposals (pick one):**
- Remove `overflow: hidden` from the default card styles entirely (it was likely added to enforce `border-radius` clipping, which modern browsers handle without it in most cases)
- Add an `overflow` input: `overflow = input<'visible' | 'hidden' | 'auto'>('visible')`

**Evidence:** CQPI removed `overflow: hidden` with an explicit comment after discovering it prevented a sticky header from working inside a card. The border-radius still renders correctly without it.

---

## 3. Missing Tokens

### 3.1 Touch target size tokens

**Gap:** No minimum interactive hit target tokens exist in Candor. CQPI defined these locally to ensure WCAG compliance:

```scss
--min-hit-dimension-aaa: 2.75rem;  // 44px — WCAG 2.5.5 AAA
--min-hit-dimension-aa:  1.375rem; // 22px — WCAG 2.5.5 AA (relaxed)
```

These were used on buttons, slider thumbs, copy-to-clipboard controls, and custom form inputs throughout the app.

**Proposal:** Add to `semantics.scss` alongside the existing focus-ring tokens, under an `Interaction` section:

```scss
// --- Interaction / Touch Targets ------------------------------------------
--hit-target-aaa: 2.75rem;   // 44px minimum — WCAG 2.5.5 AAA
--hit-target-aa:  1.375rem;  // 22px minimum — WCAG 2.5.5 AA
```

---

### 3.2 Sub-`xs` spacing token (`--spacing-2xs`)

**Gap:** The spacing scale starts at `--spacing-xs: 0.5rem (8px)`. For compact UI — table cells in compact mode, tone-picker cell padding, icon nudges — 4px steps are needed but have no token, forcing `0.25rem` hardcoded values throughout.

**Proposal:** Add one step below `--spacing-xs`:

```scss
--spacing-2xs: 0.25rem;  // 4px
```

---

## 4. Integration Patterns

These are non-obvious findings worth documenting in Candor's migration guide or component usage docs.

### 4.1 `ViewEncapsulation.None` and the `:host` selector

Candor components use `:host` in their SCSS, which works correctly when the component is consumed via Angular's component compilation pipeline (the default). However, when an app copies the SCSS file directly and applies it with `ViewEncapsulation.None` on a modified component, `:host` no longer works — styles must be anchored to a class on the host element instead (e.g., `.toast-host { display: block; }`).

**Recommendation:** Candor's copy-to-consume guide should note the `:host` → host-class substitution required for copied components.

---

### 4.2 Card slots and style encapsulation

Styles written in a parent component's SCSS cannot reach inside `CardComponent`'s template due to Angular's emulated encapsulation. For example, `app-card .card__body { gap: var(--spacing-xs); }` in a parent component's SCSS has no effect.

Workarounds that work:
1. Add a wrapper `<div>` inside the card's default slot and style that wrapper from the parent
2. Use global styles (in `styles.scss`) to target `.card__body` directly

**Recommendation:** Document this limitation in `CardComponent` usage examples with a code snippet showing the wrapper `<div>` pattern.

---

### 4.3 Light mode surface layering requires shadow

In light mode, `--color-bg-page` and `--color-bg-elevated` are both near-white. Apps that place elevated cards on a page background need `box-shadow` to create visible depth — colour alone is insufficient. This is a general limitation of the current light-mode token palette.

**Recommendation:** Candor's light-mode usage guide should explicitly advise using `--shadow-sm` on elevated cards, and note that surface colour differentiation alone does not work in light mode.

---

## 5. Out of Scope

The following CQPI-specific items were identified during the migration but are not appropriate for the Candor token/component system:

| Item | Reason |
|------|--------|
| `--fluid-padding` | App-specific responsive padding using `clamp()` for the app container; not a general-purpose token |
| `--grad-stop-*` | Perceptual lightness gradient stop values for colour palette visualisation; CQPI-specific |
| Range input (slider) thumb styling | Custom styling for `<input type="range">`; no Candor slider component exists |
| Contrast score container-query scaling (`55cqh`) | App-specific container query font-size trick for the sticky header |
| `TonePickerComponent` API delta | CQPI added `hideHeaders`, Candor has `caption`. These serve overlapping but distinct use cases and should be aligned as a separate discussion |

---

## Summary

| Category | Count | Items |
|----------|-------|-------|
| Bug fixes | 3 | Table dark stripes, Card light visibility, Toast token naming |
| API enhancements | 2 | AccordionItem `variant`, Card `overflow` |
| New tokens | 2 | `--hit-target-*`, `--spacing-2xs` |
| Integration guide additions | 3 | `:host` substitution, card encapsulation, light mode shadow |
