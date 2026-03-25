import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('host element has toast-host class', () => {
    expect(fixture.nativeElement.classList).toContain('toast-host');
  });

  describe('variant', () => {
    it('defaults to info', () => {
      expect(component.variant()).toBe('info');
    });

    (['info', 'success', 'warning', 'error'] as const).forEach((v) => {
      it(`applies toast--${v} class for variant "${v}"`, () => {
        fixture.componentRef.setInput('variant', v);
        fixture.detectChanges();
        const toast = fixture.nativeElement.querySelector('.toast');
        expect(toast.classList).toContain(`toast--${v}`);
      });
    });

    it('uses role="alert" for warning', () => {
      fixture.componentRef.setInput('variant', 'warning');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast').getAttribute('role')).toBe('alert');
    });

    it('uses role="alert" for error', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast').getAttribute('role')).toBe('alert');
    });

    it('uses role="status" for success', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast').getAttribute('role')).toBe('status');
    });

    it('uses role="status" for info', () => {
      expect(fixture.nativeElement.querySelector('.toast').getAttribute('role')).toBe('status');
    });
  });

  describe('message', () => {
    it('renders the message text', () => {
      fixture.componentRef.setInput('message', 'Hello toast');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast__message').textContent.trim()).toBe('Hello toast');
    });
  });

  describe('title', () => {
    it('renders the title when provided', () => {
      fixture.componentRef.setInput('title', 'My title');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast__title').textContent.trim()).toBe('My title');
    });

    it('does not render title element when empty', () => {
      expect(fixture.nativeElement.querySelector('.toast__title')).toBeFalsy();
    });
  });

  describe('dismissible', () => {
    it('shows dismiss button by default', () => {
      expect(fixture.nativeElement.querySelector('.toast__dismiss')).toBeTruthy();
    });

    it('hides dismiss button when dismissible is false', () => {
      fixture.componentRef.setInput('dismissible', false);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.toast__dismiss')).toBeFalsy();
    });

    it('emits dismissed when dismiss button is clicked', () => {
      const spy = jasmine.createSpy('dismissed');
      component.dismissed.subscribe(spy);
      fixture.nativeElement.querySelector('.toast__dismiss').click();
      expect(spy).toHaveBeenCalled();
    });
  });
});
