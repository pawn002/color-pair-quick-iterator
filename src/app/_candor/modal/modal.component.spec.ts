import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    fixture.componentRef.setInput('title', 'About OKCA');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.modal__title');
    expect(title.textContent.trim()).toBe('About OKCA');
  });

  it('should have a dialog element', () => {
    const dialog = fixture.nativeElement.querySelector('dialog');
    expect(dialog).toBeTruthy();
  });

  it('should have a close button', () => {
    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close dialog"]');
    expect(closeButton).toBeTruthy();
  });

  it('should label the dialog with the title element id', () => {
    fixture.componentRef.setInput('title', 'Delta E');
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('dialog');
    const titleEl = fixture.nativeElement.querySelector('.modal__title');
    expect(dialog.getAttribute('aria-labelledby')).toBe(titleEl.id);
  });

  it('should emit open change to false when close() is called', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    let emitted: boolean | undefined;
    fixture.componentInstance.open.subscribe((v: boolean) => (emitted = v));

    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-label="Close dialog"]',
    );
    closeButton.click();
    fixture.detectChanges();

    expect(emitted).toBe(false);
  });
});
