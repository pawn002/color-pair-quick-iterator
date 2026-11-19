import { describe, it, expect, afterEach, vi } from 'vitest';
import { html, render, type ReactiveControllerHost } from 'lit';
import { TooltipController, TOOLTIP_MEDIA_QUERY } from './tooltip-controller';
import './_components/metadata/metadata';
import { mount, cleanup } from './test-utils';

/**
 * jsdom has no `matchMedia`, so each test installs one it controls. `setWide`
 * flips the result and fires `change`, as a resize across the breakpoint would.
 */
function stubMatchMedia(initiallyWide: boolean) {
  let matches = initiallyWide;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const queries: string[] = [];

  vi.stubGlobal('matchMedia', (query: string) => {
    queries.push(query);
    return {
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => listeners.add(fn),
      removeEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => listeners.delete(fn),
    } as unknown as MediaQueryList;
  });

  return {
    queries,
    listeners,
    setWide(wide: boolean) {
      matches = wide;
      for (const fn of listeners) fn({ matches: wide } as MediaQueryListEvent);
    },
  };
}

function fakeHost() {
  return { addController: vi.fn(), requestUpdate: vi.fn() } as unknown as ReactiveControllerHost & {
    requestUpdate: ReturnType<typeof vi.fn>;
  };
}

/** Renders a `wrap()` result and returns the container. */
function rendered(controller: TooltipController) {
  const host = document.createElement('div');
  render(controller.wrap('Copy foreground color', html`<button>copy</button>`, 'left'), host);
  return host;
}

afterEach(() => {
  vi.unstubAllGlobals();
  cleanup();
});

describe('TooltipController', () => {
  it('uses the same breakpoint as the two-column layout', () => {
    expect(TOOLTIP_MEDIA_QUERY).toBe('(min-width: 900px)');
  });

  it('wraps content in a candor-tooltip at desktop widths', () => {
    const media = stubMatchMedia(true);
    const controller = new TooltipController(fakeHost());
    controller.hostConnected();

    expect(media.queries).toEqual([TOOLTIP_MEDIA_QUERY]);
    const tooltip = rendered(controller).querySelector('candor-tooltip')!;
    expect(tooltip).not.toBeNull();
    expect(tooltip.getAttribute('text')).toBe('Copy foreground color');
    expect(tooltip.getAttribute('position')).toBe('left');
    expect(tooltip.querySelector('button')).not.toBeNull();
  });

  it('omits the position attribute when none is given, leaving candor-tooltip its default', () => {
    stubMatchMedia(true);
    const controller = new TooltipController(fakeHost());
    controller.hostConnected();

    const host = document.createElement('div');
    render(controller.wrap('Reset sliders', html`<button>reset</button>`), host);
    expect(host.querySelector('candor-tooltip')!.hasAttribute('position')).toBe(false);
  });

  it('renders the content bare at mobile widths, so no bubble can open on tap', () => {
    stubMatchMedia(false);
    const controller = new TooltipController(fakeHost());
    controller.hostConnected();

    const host = rendered(controller);
    expect(host.querySelector('candor-tooltip')).toBeNull();
    expect(host.querySelector('button')!.textContent).toBe('copy');
  });

  it('decides before the first render, so a phone never sees a tooltip flash', () => {
    stubMatchMedia(false);
    const controller = new TooltipController(fakeHost());
    expect(controller.enabled).toBe(true); // default, before connection
    controller.hostConnected();
    expect(controller.enabled).toBe(false);
  });

  it('follows the viewport across the breakpoint and re-renders the host', () => {
    const media = stubMatchMedia(true);
    const host = fakeHost();
    const controller = new TooltipController(host);
    controller.hostConnected();

    media.setWide(false);
    expect(controller.enabled).toBe(false);
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);

    media.setWide(true);
    expect(controller.enabled).toBe(true);
    expect(host.requestUpdate).toHaveBeenCalledTimes(2);
  });

  it('stops listening when the host disconnects', () => {
    const media = stubMatchMedia(true);
    const controller = new TooltipController(fakeHost());
    controller.hostConnected();
    expect(media.listeners.size).toBe(1);

    controller.hostDisconnected();
    expect(media.listeners.size).toBe(0);
  });

  it('keeps tooltips when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    const controller = new TooltipController(fakeHost());
    controller.hostConnected();

    expect(controller.enabled).toBe(true);
    expect(rendered(controller).querySelector('candor-tooltip')).not.toBeNull();
  });
});

describe('tooltips in a real component', () => {
  it('cc-metadata keeps every info button, with its name, but drops the tooltips on mobile', async () => {
    stubMatchMedia(false);
    const el = await mount('cc-metadata', { colorOne: '#000000', colorTwo: '#ffffff' });

    expect(el.querySelector('candor-tooltip')).toBeNull();
    const buttons = Array.from(el.querySelectorAll('candor-button.button--icon'));
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) expect(button.getAttribute('aria-label')).toMatch(/^About /);
  });

  it('cc-metadata wraps each info button in a tooltip at desktop widths', async () => {
    stubMatchMedia(true);
    const el = await mount('cc-metadata', { colorOne: '#000000', colorTwo: '#ffffff' });

    const buttons = el.querySelectorAll('candor-button.button--icon');
    expect(el.querySelectorAll('candor-tooltip').length).toBe(buttons.length);
  });
});
