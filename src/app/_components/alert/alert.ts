import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
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
   * Bumped once per message, and used as the toast's key.
   *
   * `candor-toast-container` announces a toast when the element is *added*,
   * not when its text changes. A new key makes Lit render a fresh element for
   * every message, so copying the same colour twice in a row is announced
   * twice rather than updating a toast already on screen in silence.
   */
  @state() private toastId = 0;

  private timeout: ReturnType<typeof setTimeout> | null = null;

  private hideAlert() {
    this.showAlert = false;
    this.dispatchEvent(new CustomEvent('alert-closed', { detail: true, bubbles: true, composed: true }));
  }

  override disconnectedCallback() {
    if (this.timeout) clearTimeout(this.timeout);
    super.disconnectedCallback();
  }

  override updated(changed: Map<string, unknown>) {
    if (!changed.has('alertMessage')) return;
    const msg = this.alertMessage?.message;
    if (msg) {
      this.showAlert = true;
      this.toastId++;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }

  override render() {
    return html`
      <!--
        Candor's documented outlet for toasts: position: fixed to a viewport
        corner, and since Candor 6.0 the owner of the live regions too. It keeps
        a persistent polite region in its shadow root and writes each slotted
        toast's text into it, so the region is observed before the message
        arrives, and a toast inside it drops its own role="status". That is why
        it stays mounted whether or not a toast is showing. Auto-dismissal is the
        consumer's job by design; that is the 5s timer above.
      -->
      <candor-toast-container position="bottom-right">
        ${this.showAlert
          ? keyed(
              this.toastId,
              html`
                <candor-toast
                  variant="success"
                  message=${this.alertMessage.message}
                  .dismissible=${false}
                ></candor-toast>
              `,
            )
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
