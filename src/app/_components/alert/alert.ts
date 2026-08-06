import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { random, times } from 'lodash-es';
import '../../../app/_candor/toast/toast';
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
  @state() private uniqId = '';

  private timeout: ReturnType<typeof setTimeout> | null = null;

  private generateRandomString(length: number) {
    return times(length, () => random(35).toString(36)).join('');
  }

  private hideAlert() {
    this.showAlert = false;
    this.uniqId = '';
    this.dispatchEvent(new CustomEvent('alert-closed', { detail: true, bubbles: true, composed: true }));
  }

  override updated(changed: Map<string, unknown>) {
    if (!changed.has('alertMessage')) return;
    const msg = this.alertMessage?.message;
    if (msg) {
      this.uniqId = this.generateRandomString(12);
      this.showAlert = true;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }

  override render() {
    return html`
      <div class="comp-container">
        ${this.showAlert
          ? html`
              <candor-toast
                variant="success"
                message=${this.alertMessage.message}
                .dismissible=${false}
              ></candor-toast>
              <span class="msg-id" aria-hidden="true">${this.uniqId}</span>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-alert': CcAlert;
  }
}
