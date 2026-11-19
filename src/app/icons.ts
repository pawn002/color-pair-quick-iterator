/**
 * Icons, as Candor specifies them: Phosphor glyphs inlined as path data.
 *
 * Candor uses Phosphor but deliberately ships no icon set — the glyphs in its
 * package are its own component chrome and are not exported (pawn002/candor#260).
 * So the path data lives here, copied from `@phosphor-icons/core` (2.1.1), which
 * is not a dependency. Font-class icons would not reach inside a shadow root.
 *
 * **Weight carries meaning** (Candor, "Icon weight semantics"): a filled shape
 * means you can act on it.
 * - `fill` — actions whose glyph has an enclosed shape: info, copy, dice, drop
 * - `bold` — actions whose glyph is only strokes (arrows, ✕, +), and icons that
 *   inform rather than act: status, carets, direction
 * - `regular` — inside or beside text whose words carry the meaning
 *
 * The class on each `<svg>` names its weight, and `styles.scss` sizes icon-only
 * buttons from it: fill at 1.75rem, bold at 1.25rem. Add a glyph by copying the
 * path from `assets/<weight>/<name>-<weight>.svg` in that package — never draw one.
 * Every glyph here is `aria-hidden`; the button carries the accessible name.
 */

import { html } from 'lit';

/** Phosphor `info` (fill). Info buttons beside options and metadata rows — opens a note. */
export const INFO = html`
  <svg class="icon icon--fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" />
  </svg>
`;

/** Phosphor `copy` (fill). Copy a colour to the clipboard. */
export const COPY = html`
  <svg class="icon icon--fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z" />
  </svg>
`;

/** Phosphor `dice-five` (fill). New random colour pair. */
export const DICE_FIVE = html`
  <svg class="icon icon--fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32ZM92,176a12,12,0,1,1,12-12A12,12,0,0,1,92,176Zm0-72a12,12,0,1,1,12-12A12,12,0,0,1,92,104Zm36,36a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm36,36a12,12,0,1,1,12-12A12,12,0,0,1,164,176Zm0-72a12,12,0,1,1,12-12A12,12,0,0,1,164,104Z" />
  </svg>
`;

/** Phosphor `drop-half` (fill). Match the two colours' chroma. */
export const DROP_HALF = html`
  <svg class="icon icon--fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM56,144c0-57.23,55.47-105,72-118V216A72.08,72.08,0,0,1,56,144Z" />
  </svg>
`;

/** Phosphor `arrows-down-up` (bold). Swap foreground and background — vertical, like the stacked colours. */
export const ARROWS_DOWN_UP = html`
  <svg class="icon icon--bold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M120.49,167.51a12,12,0,0,1,0,17l-32,32a12,12,0,0,1-17,0l-32-32a12,12,0,1,1,17-17L68,179V48a12,12,0,0,1,24,0V179l11.51-11.52A12,12,0,0,1,120.49,167.51Zm96-96-32-32a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17L164,77V208a12,12,0,0,0,24,0V77l11.51,11.52a12,12,0,0,0,17-17Z" />
  </svg>
`;

/** Phosphor `arrow-counter-clockwise` (bold). Reset the sliders. */
export const ARROW_COUNTER_CLOCKWISE = html`
  <svg class="icon icon--bold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" />
  </svg>
`;

/** Phosphor `person-arms-spread` (fill). Screen reader and low vision workflows (labelled button). */
export const PERSON_ARMS_SPREAD = html`
  <svg class="icon icon--fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path d="M100,36a28,28,0,1,1,28,28A28,28,0,0,1,100,36ZM227.6,92.57A15.7,15.7,0,0,0,212,80H44a16,16,0,0,0-6.7,30.53l.06,0,53.89,23.73-21.92,83.3a16,16,0,0,0,7.9,20.91A15.83,15.83,0,0,0,84,240a16,16,0,0,0,14.44-9.06L128,180l29.58,51a16,16,0,0,0,29.07-13.35l-21.92-83.3,54-23.76A15.7,15.7,0,0,0,227.6,92.57Z" />
  </svg>
`;
