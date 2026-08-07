import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './alert.component.scss';

export interface AlertMessageObj {
  message: string;
}

@customElement('cc-alert')
export class CcAlert extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ type: Object, attribute: false }) alertMessage: AlertMessageObj = { message: '' };

  @state() private showAlert = false;

  /**
   * Text for the persistent live region. Held separately from `alertMessage` so
   * it can be cleared and re-set — see `_announce()`.
   */
  @state() private liveMessage = '';

  private timeout: ReturnType<typeof setTimeout> | null = null;
  private announceTimeout: ReturnType<typeof setTimeout> | null = null;

  private hideAlert() {
    this.showAlert = false;
    this.dispatchEvent(new CustomEvent('alert-closed', { detail: true, bubbles: true, composed: true }));
  }

  /**
   * Put a message into the persistent live region.
   *
   * Cleared first, then set on a later task. Two reasons: a live region only
   * announces when its contents *change*, so copying the same colour twice in a
   * row would otherwise be silent the second time; and the clear/set pair has to
   * land in separate tasks or the mutations coalesce into no net change.
   */
  private _announce(message: string) {
    if (this.announceTimeout) clearTimeout(this.announceTimeout);
    this.liveMessage = '';
    this.announceTimeout = setTimeout(() => {
      this.liveMessage = message;
    }, 100);
  }

  override disconnectedCallback() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.announceTimeout) clearTimeout(this.announceTimeout);
    super.disconnectedCallback();
  }

  override updated(changed: Map<string, unknown>) {
    if (!changed.has('alertMessage')) return;
    const msg = this.alertMessage?.message;
    if (msg) {
      this.showAlert = true;
      this._announce(msg);

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }

  override render() {
    return html`
      <!--
        The announcing region is always in the DOM, and separate from the toast.
        candor-toast carries its own role="status", but it is created along with
        its text and torn down five seconds later — a live region has to be
        present and observed *before* its contents change. candor-toast-container
        does not close that gap: its shadow root is a bare <slot>, so the region
        still arrives with each toast. The toast is hidden from assistive tech
        here (aria-hidden covers its shadow root too) so the message is not
        queued twice. Upstream as pawn002/candor#266; drop the aria-hidden and
        this region if the container grows one of its own.
      -->
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this.liveMessage}
      </div>

      <!--
        The container is Candor's documented outlet for toasts: position: fixed
        to a viewport corner at z-index 2000, with pointer-events restored on
        slotted children. It stays mounted whether or not a toast is showing, so
        the stack has somewhere to land. Auto-dismissal is the consumer's job by
        design — that is the 5s timer above, not something the container does.
      -->
      <candor-toast-container position="bottom-right">
        ${this.showAlert
          ? html`
              <candor-toast
                aria-hidden="true"
                variant="success"
                message=${this.alertMessage.message}
                .dismissible=${false}
              ></candor-toast>
            `
          : ''}
      </candor-toast-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-alert': CcAlert;
  }
}
