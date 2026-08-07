/**
 * Guards the boundary between the app's own primitives and the upstream
 * Candor package.
 *
 * The package ships a single entry point with `sideEffects: true`, so importing
 * it registers all of its elements at once — there is no way to pull in just
 * one. Any local element that reclaims a `candor-*` name throws
 * "This name has already been registered in the registry." on import and takes
 * the rest of the package's registrations down with it, leaving a
 * half-registered app.
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
   * `overflow: hidden` costs the app twice, and the second cost is the one that
   * is easy to miss. It clips (the tooltips, below), but it also makes `.card` a
   * scroll container — and a `position: sticky` descendant is constrained to its
   * nearest scrollport. The card's scrollable overflow equals its client box, so
   * the sticky range is zero: the score header in app.ts stuck to the card and
   * rode it off the top of the screen instead of pinning to the viewport.
   *
   * That is why `.title-and-sliders` is a plain div. Both it and `.quick-actions`
   * revert to a card when this test fails.
   */
  it('clips its content, and offers no way to stop it', async () => {
    expect(styleSheetOf('candor-card')).toMatch(/\.card\s*\{[^}]*overflow:\s*hidden/);

    // No `::part` and no custom property, so the rule above is unreachable from
    // the app — hence the workaround documented in app.scss.
    const el = await mount('candor-card');
    expect(el.shadowRoot!.querySelector('[part]')).toBeNull();
    expect(styleSheetOf('candor-card')).not.toMatch(/overflow:\s*var\(/);
  });
});

describe('candor-modal', () => {
  /**
   * Why `_setPageScrollLock()` exists in app.ts.
   *
   * `showModal()` makes the background inert but not unscrollable, so the two
   * facts below let arrow keys scroll the page behind an open note — measured at
   * 79px of background travel per two presses, by either route.
   *
   * Route 1: the scrollable region is `.modal__body`, and it is already
   * focusable — but initial focus goes to the close button, which sits in the
   * header outside it. Route 2: that region does not contain its overscroll, so
   * reaching either end chains the rest to the page.
   *
   * Upstream as `pawn002/candor#265`, which covers candor-drawer too — it has
   * the same structure and the same two gaps. Drop the lock when both of these
   * fail.
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

  it('does not contain its overscroll, so scrolling chains to the page', () => {
    expect(styleSheetOf('candor-modal')).not.toMatch(/overscroll-behavior/);
  });
});

describe('candor-tooltip', () => {
  /**
   * These two facts together are why `.quick-actions` in app.ts is a plain div
   * rather than a candor-card: an absolutely-positioned bubble cannot escape an
   * ancestor's `overflow: hidden`, and the card sets exactly that. The card cut
   * 17px off a 25px bubble — all of the text.
   *
   * When this suite starts failing because the bubble moved to the top layer,
   * the workaround in app.scss can be deleted and the card restored.
   */
  it('positions its bubble absolutely, so a clipping ancestor hides it', () => {
    const styles = styleSheetOf('candor-tooltip');
    expect(styles).toMatch(/\.tooltip__bubble\s*\{[^}]*position:\s*absolute/);
    expect(styles).not.toMatch(/popover|:popover-open|position-area/);
  });
});

/**
 * The toast's live region arrives with its text, and the container does not
 * supply one of its own.
 *
 * A region has to be in the DOM and observed *before* its contents change for
 * assistive tech to announce reliably. `candor-toast` renders `role="status"`
 * inside its own shadow root, so the region is created already populated; the
 * documented outlet, `candor-toast-container`, is a positioning shell whose
 * shadow root is a bare `<slot>`. Following the documented pattern therefore
 * gives the same structure as not using the container at all.
 *
 * That is why cc-alert keeps its own persistent region and marks the toast
 * `aria-hidden`. Upstream as `pawn002/candor#266`. When the container grows a
 * region of its own this fails, and the workaround in alert.ts can go.
 */
describe('candor-toast-container', () => {
  it('is registered, though the package does not export its type', () => {
    // Present in the bundle and upgrades fine, but absent from index.d.ts —
    // hence the plain markup in alert.ts rather than a typed handle.
    expect(customElements.get('candor-toast-container')).toBeDefined();
  });

  it('owns no live region for slotted toasts to announce through', async () => {
    const container = await mount('candor-toast-container');

    expect(container.shadowRoot!.querySelector('[role="status"], [aria-live]')).toBeNull();
    expect(container.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('leaves each toast carrying its own role=status', async () => {
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
   * Why `_applyRovingTabIndex` exists in app.ts.
   *
   * A radio group is a single tab stop with arrows moving between options —
   * native behaviour, and the ARIA APG pattern. candor-radio implements the
   * arrow half but leaves every inner input tabbable, so an N-option group
   * costs N tab stops. The app reaches into the shadow root to set `-1` on the
   * unselected options.
   *
   * When this starts failing because Candor manages tabindex itself, delete
   * `_applyRovingTabIndex` and its call in `updated()`. Upstream: candor#262.
   */
  it('leaves every option tabbable, so a group costs N tab stops', async () => {
    const group = document.createElement('div');
    for (const value of ['okca', 'apca', 'bpca']) {
      const radio = document.createElement('candor-radio');
      radio.setAttribute('name', 'contrastType');
      radio.setAttribute('value', value);
      if (value === 'okca') radio.setAttribute('checked', '');
      group.appendChild(radio);
    }
    document.body.appendChild(group);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const tabIndexes = Array.from(group.querySelectorAll('candor-radio')).map(
      (radio) => radio.shadowRoot!.querySelector('input')!.tabIndex,
    );
    expect(tabIndexes).toEqual([0, 0, 0]);

    group.remove();
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
   * Why `.note-button`, `.checkbox-section` and `.radio-section` carry
   * `--focus-ring-clearance` in app.scss.
   *
   * The content box is `overflow: hidden` with no `:host([open])` escape, so it
   * clips while open, not just mid-transition. A focus ring paints outside the
   * border box, so a slotted control flush against that edge loses the whole
   * ring on that side — 4px of a 4px ring, measured on eight controls.
   *
   * Upstream as `pawn002/candor#261`. When this fails because the rule gained an
   * open state, drop the clearance from app.scss.
   */
  it('clips slotted focus rings — its content box stays hidden when open (#261)', () => {
    const styles = styleSheetOf('candor-accordion-item');
    expect(styles).toMatch(/\.accordion-item__content\s*\{[^}]*overflow:\s*hidden/);
    expect(styles).not.toMatch(/:host\(\[open\]\)[^{]*\{[^}]*overflow:\s*visible/);
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
