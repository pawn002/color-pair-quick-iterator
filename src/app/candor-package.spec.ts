/**
 * Guards the boundary between the app's own primitives and the upstream
 * Candor package.
 *
 * The app imports the package root, which registers all of its elements at
 * once. Since 6.0 that registration is guarded: a tag that is already defined
 * is skipped with a console warning rather than throwing. That makes a
 * collision quieter, not harmless — whichever definition loads first wins the
 * tag, so a local element named `candor-*` would silently replace Candor's (or
 * be replaced by it). Hence the `cc-*` prefix, and the namespace test below.
 *
 * The rest of this file pins the parts of the upstream contract the app depends
 * on. These are not tests of Candor — they are the assumptions app.ts makes
 * about it, written down so a package upgrade that breaks one fails here rather
 * than in the UI.
 */

import { describe, it, expect, afterEach } from 'vitest';
import '@candor-design/web-components';
import './_components/table/table';
import { mount, update, cleanup } from './test-utils';

afterEach(cleanup);

/**
 * The flattened `static styles` of an upstream element.
 *
 * jsdom does no layout, so the clipping assertions below read the rule that
 * causes it rather than measuring a rendered box.
 */
/**
 * Calls `candor-radio`'s private group lookup.
 *
 * Reaching a private member is the point: what this file pins is *how* the
 * upstream element resolves its group, which is the behaviour app.ts depends on
 * and which no public API exposes. The cast goes via `unknown` because the
 * declared type says `_groupSiblings` is private, so the two types do not
 * overlap and a direct assertion is a compile error — one `tsc` only started
 * reporting once CI began type-checking at all.
 */
function groupSiblingsOf(el: Element | null): unknown[] {
  return (el as unknown as { _groupSiblings(): unknown[] })._groupSiblings();
}

function styleSheetOf(tag: string): string {
  const ctor = customElements.get(tag) as (CustomElementConstructor & { styles?: unknown }) | undefined;
  const styles = ctor?.styles;
  const list = Array.isArray(styles) ? (styles.flat(Infinity) as unknown[]) : [styles];
  return list.map((entry) => String(entry)).join('\n');
}

describe('candor package integration', () => {
  it('registers the upstream elements the app renders', () => {
    for (const tag of [
      'candor-accordion-item',
      'candor-button',
      'candor-card',
      'candor-checkbox',
      'candor-modal',
      'candor-radio',
      'candor-toast',
      'candor-tooltip',
    ]) {
      expect(customElements.get(tag), `${tag} is not registered`).toBeDefined();
    }
  });

  it('registers elements declared after the collision-prone ones', () => {
    // The registry is populated in module order and aborts on the first
    // duplicate, so an element from the tail of the bundle is the real proof
    // that nothing collided part-way through.
    expect(customElements.get('candor-tone-picker')).toBeDefined();
  });

  it('keeps the app-authored elements out of the candor-* namespace', () => {
    expect(customElements.get('cc-table')).toBeDefined();
    expect(customElements.get('cc-table')).not.toBe(customElements.get('candor-table'));
  });
});

describe('candor-card', () => {
  it('renders into a shadow root rather than the light DOM', async () => {
    const el = await mount('candor-card');
    expect(el.shadowRoot).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.card')).not.toBeNull();
  });

  it('projects authored content instead of appending beside it (#151)', async () => {
    const el = await mount('candor-card');
    const child = document.createElement('p');
    child.textContent = 'Color Metadata';
    el.appendChild(child);

    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements()).toContain(child);
  });

  it('accepts the variant and padding values the app passes', async () => {
    const el = await mount('candor-card', { variant: 'elevated', padding: 'none' });
    expect(el.variant).toBe('elevated');
    expect(el.padding).toBe('none');
  });

  /**
   * Why `.title-and-sliders` can be a card.
   *
   * The score header inside it is `position: sticky`, and a sticky element is
   * held to its nearest scroll container. Candor 5.x clipped with `overflow:
   * hidden`, which makes `.card` one, so the header rode the card off the top of
   * the screen. 6.0 clips with `overflow: clip`, which does not create a scroll
   * container, so the header pins to the viewport. If this default ever goes
   * back to `hidden` or `auto`, the header breaks with no error anywhere.
   */
  it('clips with overflow: clip by default, so a sticky descendant still pins to the viewport', () => {
    expect(styleSheetOf('candor-card')).toMatch(
      /\.card\s*\{[^}]*overflow:\s*var\(--candor-card-overflow,\s*clip\)/,
    );
  });
});

describe('candor-modal', () => {
  /**
   * Why `_setPageScrollLock()` exists in app.ts.
   *
   * `showModal()` makes the background inert but not unscrollable, so arrow
   * keys could scroll the page behind an open note — measured at 79px of
   * background travel per two presses.
   *
   * Through Candor 5.x there were two routes: initial focus on the close button,
   * outside the scrollable `.modal__body`, and overscroll chaining from that
   * body. 6.0 closed `pawn002/candor#265` — the body contains its overscroll,
   * and focus moves into it on open, but only when it scrolls. A short note still
   * starts on the close button, and wheel and touch reach the page regardless,
   * which is why app.ts keeps its lock.
   */
  it('leaves its scroll region focusable but does not start focus there', async () => {
    const styles = styleSheetOf('candor-modal');
    expect(styles).toMatch(/\.modal__body/);

    // Mounted closed: `showModal()` is not implemented in this environment, and
    // the structure below is in the template either way.
    const el = await mount('candor-modal');
    const body = el.shadowRoot!.querySelector('.modal__body')!;
    const closeButton = el.shadowRoot!.querySelector('.modal__close');

    // Focusable, so arrows would scroll it — the app just never lands there.
    expect(body.getAttribute('tabindex')).toBe('0');
    // The close button is the focus target, and it is not inside the scroller.
    expect(closeButton).not.toBeNull();
    expect(body.contains(closeButton)).toBe(false);
  });

  it('contains its overscroll, so reaching either end no longer chains to the page', () => {
    expect(styleSheetOf('candor-modal')).toMatch(
      /\.modal__body\s*\{[^}]*overscroll-behavior:\s*contain/,
    );
  });
});

describe('candor-tooltip', () => {
  /**
   * Why `.quick-actions` can be a card.
   *
   * Through Candor 5.x the bubble was positioned absolutely, so a clipping
   * ancestor cut it off: the card took 17px of a 25px bubble, all of the text.
   * Since 6.0 it is a manual popover, so it renders in the top layer and escapes
   * every ancestor's clip (`pawn002/candor#259`).
   */
  it('renders its bubble as a popover, in the top layer', async () => {
    const el = await mount('candor-tooltip', { text: 'Swap foreground and background' });
    const bubble = el.shadowRoot!.querySelector('.tooltip__bubble');
    expect(bubble).not.toBeNull();
    expect(bubble!.getAttribute('popover')).toBe('manual');
  });
});

/**
 * Why cc-alert has no live region of its own.
 *
 * A region has to be in the DOM and observed *before* its contents change for
 * assistive tech to announce reliably. Through Candor 5.x the container was a
 * bare `<slot>` and each toast carried a `role="status"` created along with its
 * text, so cc-alert kept a persistent region and hid the toast. Since 6.0 the
 * container owns persistent polite and assertive regions and writes each
 * slotted toast into one, and a toast inside it drops its own live role
 * (`pawn002/candor#266`).
 *
 * It announces a toast when the element is *inserted*, not when its text
 * changes, which is why cc-alert keys the toast to render a fresh one per
 * message.
 */
describe('candor-toast-container', () => {
  it('is registered', () => {
    expect(customElements.get('candor-toast-container')).toBeDefined();
  });

  it('owns a persistent polite live region for slotted toasts', async () => {
    const container = await mount('candor-toast-container');

    const polite = container.shadowRoot!.querySelector('[aria-live="polite"]');
    expect(polite).not.toBeNull();
    expect(polite!.getAttribute('aria-relevant')).toBe('additions');
    expect(container.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('announces a toast when it is inserted, and the toast drops its own role', async () => {
    const container = await mount('candor-toast-container');
    const toast = document.createElement('candor-toast') as HTMLElement & {
      updateComplete: Promise<unknown>;
    };
    toast.setAttribute('message', 'Saved.');
    toast.setAttribute('variant', 'success');
    container.appendChild(toast);
    await toast.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const polite = container.shadowRoot!.querySelector('[aria-live="polite"]')!;
    expect(polite.textContent).toContain('Saved.');
    expect(toast.shadowRoot!.querySelector('[role="status"]')).toBeNull();
  });

  it('leaves a toast outside a container carrying its own role=status', async () => {
    const toast = await mount('candor-toast', { message: 'Saved.', variant: 'success' });

    const region = toast.shadowRoot!.querySelector('[role="status"]');
    expect(region).not.toBeNull();
    expect(region!.textContent).toContain('Saved.');
  });

  it('fixes the stack to a viewport corner, so the app needs no wrapper', () => {
    const styles = styleSheetOf('candor-toast-container');
    expect(styles).toMatch(/:host\s*\{[^}]*position:\s*fixed/);
    // Quote style differs between the authored source and the CSSOM, so match
    // either rather than pinning one.
    expect(styles).toMatch(/:host\(\[position=['"]?bottom-right['"]?\]\)/);
  });
});

describe('candor-button', () => {
  it('projects its label into the control, giving it an accessible name (#151)', async () => {
    const el = await mount('candor-button');
    el.textContent = 'Screen reader and low vision workflows';

    const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true })[0].textContent).toContain('Screen reader');
  });

  it('lets a native click reach a host listener — the app binds @click, not @clicked', async () => {
    const el = await mount('candor-button');
    let fired = 0;
    el.addEventListener('click', () => fired++);

    el.shadowRoot!.querySelector('button')!.click();
    expect(fired).toBe(1);
  });

  it('forwards aria-label to the inner control for icon-only buttons', async () => {
    const el = await mount('candor-button');
    el.setAttribute('aria-label', 'Swap Selected Colors');
    await update(el, {});

    expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-label')).toBe(
      'Swap Selected Colors',
    );
  });
});

describe('candor-checkbox', () => {
  it('emits change with the new state as detail', async () => {
    const el = await mount('candor-checkbox', { label: 'Constant chroma' });
    const received: boolean[] = [];
    el.addEventListener('change', (e) => received.push((e as CustomEvent).detail));

    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(received).toEqual([true]);
  });
});

describe('form control focus rings', () => {
  /**
   * Both controls hide the real input and paint the focus ring on the adjacent
   * sibling instead. That is why `.checkbox-section` and `.radio-section` need
   * clearance on their *start* edge as well: the visible ring box begins at the
   * control's left edge, not at the input's.
   *
   * It is also why this was easy to miss — the input keeps a UA `outline: auto`
   * at 0x0, so measuring the focused element rather than the painted ring
   * reports no clipping at all.
   */
  it.each([
    ['candor-checkbox', /\.checkbox-input:focus-visible \+ \.checkbox-box\s*\{[^}]*outline:/],
    ['candor-radio', /\.radio-input:focus-visible \+ \.radio-circle\s*\{[^}]*outline:/],
  ])('%s paints its ring on a sibling, not on the focused input', (tag, ringRule) => {
    const styles = styleSheetOf(tag);
    expect(styles).toMatch(ringRule);
    // The input itself is collapsed, so it has no ring box of its own.
    expect(styles).toMatch(/input\s*\{[^}]*opacity:\s*0/);
  });
});

describe('candor-radio', () => {
  /**
   * Arrow-key navigation is Candor's own — the inputs live in separate shadow
   * roots, so the browser sees five groups of one and provides no grouping.
   *
   * Candor scopes the group to `closest('fieldset')` and then `parentElement`.
   * The Options markup uses a fieldset per Candor's documented "always use a
   * fieldset with a legend" rule, so the group resolves through the first
   * branch. This test keeps the second branch honest too: it is what would
   * catch the group being re-wrapped per option, which is how the arrow keys
   * were broken before — silently, with no error anywhere.
   */
  it('scopes its group to a fieldset, falling back to the direct parent', async () => {
    const fieldset = document.createElement('fieldset');
    document.body.appendChild(fieldset);

    const values = ['okca', 'apca', 'bpca'];
    for (const value of values) {
      // The wrapper per radio is what defeats the parentElement fallback.
      const wrapper = document.createElement('div');
      const radio = document.createElement('candor-radio');
      radio.setAttribute('name', 'contrastType');
      radio.setAttribute('value', value);
      wrapper.appendChild(radio);
      fieldset.appendChild(wrapper);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(groupSiblingsOf(fieldset.querySelector('candor-radio'))).toHaveLength(values.length);

    // Same radios, no fieldset: each wrapper yields a group of one.
    const loose = document.createElement('div');
    const wrapper = document.createElement('div');
    const lone = document.createElement('candor-radio');
    lone.setAttribute('name', 'contrastType');
    wrapper.appendChild(lone);
    loose.appendChild(wrapper);
    document.body.appendChild(loose);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(groupSiblingsOf(lone)).toHaveLength(1);

    fieldset.remove();
    loose.remove();
  });

  /**
   * A radio group is a single tab stop with arrows moving between options —
   * native behaviour, and the ARIA APG pattern. Through Candor 5.x every inner
   * input stayed tabbable, and app.ts patched it from outside. Since 6.0
   * candor-radio manages the tab stop itself (`pawn002/candor#262`). Pinned in
   * the app's own structure — a fieldset with one wrapper per option — since
   * that is the shape that has to keep working.
   */
  it('makes a group one tab stop, at the checked option', async () => {
    const fieldset = document.createElement('fieldset');
    for (const value of ['okca', 'apca', 'bpca']) {
      const wrapper = document.createElement('div');
      const radio = document.createElement('candor-radio');
      radio.setAttribute('name', 'contrastType');
      radio.setAttribute('value', value);
      if (value === 'apca') radio.setAttribute('checked', '');
      wrapper.appendChild(radio);
      fieldset.appendChild(wrapper);
    }
    document.body.appendChild(fieldset);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const tabIndexes = Array.from(fieldset.querySelectorAll('candor-radio')).map(
      (radio) => radio.shadowRoot!.querySelector('input')!.tabIndex,
    );
    expect(tabIndexes).toEqual([-1, 0, -1]);
    expect(fieldset.getAttribute('role')).toBe('radiogroup');

    fieldset.remove();
  });

  it('emits change with the radio value as detail', async () => {
    const el = await mount('candor-radio', { value: 'okca', label: 'OKCA', name: 'contrastType' });
    const received: string[] = [];
    el.addEventListener('change', (e) => received.push((e as CustomEvent).detail));

    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(received).toEqual(['okca']);
  });
});

describe('candor-accordion-item', () => {
  it('takes its visible label as `heading`, not `title`', async () => {
    // `title` is a global HTML attribute, so setting it would render a browser
    // tooltip and leave the summary blank.
    const el = await mount('candor-accordion-item', { heading: 'How to use this app.' });
    expect(el.shadowRoot!.textContent).toContain('How to use this app.');
  });

  /**
   * Through Candor 5.x the content box was `overflow: hidden` even while open,
   * so a focus ring on a control flush against its edge was cut off entirely
   * and app.scss padded eight controls away from it. Since 6.0 the item does
   * not clip its content (`pawn002/candor#261`), and that padding is gone — so
   * a regression here would clip those rings again.
   */
  it('does not clip its content, so slotted focus rings show in full', () => {
    expect(styleSheetOf('candor-accordion-item')).not.toMatch(/overflow:\s*(hidden|clip|auto)/);
  });
});

describe('candor-tone-picker', () => {
  /**
   * The same bug one layer in, and this one the app cannot work around: the
   * swatches are the component's own, so their rings are clipped by its scroll
   * box with no markup of ours to move. Tracked in the same issue (#261);
   * ~25% of the ring is lost on the outermost row and column.
   */
  it('scrolls its gamut without reserving room for a focus ring (#261)', () => {
    const styles = styleSheetOf('candor-tone-picker');
    expect(styles).toMatch(/\.gamut-scroll\s*\{[^}]*overflow[^}]*auto/);
    expect(styles).not.toMatch(/--candor-tone-picker-(padding|overflow)/);
  });
});
