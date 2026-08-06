import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import './modal.component.scss';
import '../button/button';

@customElement('cc-modal')
export class CcModal extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() override title = '';
  @property({ type: Boolean }) open = false;

  @query('dialog') private dialogEl!: HTMLDialogElement;

  readonly uid = `modal-${Math.random().toString(36).substr(2, 9)}`;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.dialogEl) {
      if (this.open) {
        if (!this.dialogEl.open) this.dialogEl.showModal();
      } else {
        if (this.dialogEl.open) this.dialogEl.close();
      }
    }
  }

  private close() {
    this.dialogEl?.close();
  }

  private onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('open-change', { detail: false, bubbles: true, composed: true }));
  }

  private onBackdropClick(event: MouseEvent) {
    if (event.target === this.dialogEl) {
      this.close();
    }
  }

  override render() {
    return html`
      <dialog
        class="modal"
        aria-modal="true"
        aria-labelledby=${this.uid}
        @click=${this.onBackdropClick}
        @close=${this.onClose}
      >
        <div class="modal__panel" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal__header">
            <h2 id=${this.uid} class="modal__title">${this.title}</h2>
            <cc-button variant="ghost" size="icon" aria-label="Close dialog" @clicked=${this.close}>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </cc-button>
          </div>
          <div class="modal__body">
            <slot></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-modal': CcModal;
  }
}
