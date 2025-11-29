import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CopyToClipboardButtonComponent,
  CopyToClipboardEvent,
} from './copy-to-clipboard-button.component';

describe('CopyToClipboardButtonComponent', () => {
  let component: CopyToClipboardButtonComponent;
  let fixture: ComponentFixture<CopyToClipboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyToClipboardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyToClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept color', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      expect(component.color()).toBe('#ff5733');
    });

    it('should accept debug flag', () => {
      fixture.componentRef.setInput('debug', false);
      fixture.detectChanges();
      expect(component.debug()).toBe(false);
    });

    it('should have default values', () => {
      expect(component.color()).toBe('');
      expect(component.debug()).toBe(true);
    });
  });

  describe('Outputs', () => {
    it('should emit copyEvent on successful copy', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

      component.copyEvent.subscribe((event: CopyToClipboardEvent) => {
        expect(event.copied).toBe(true);
        expect(event.color).toBe('ff5733');
        done();
      });

      component.copyToClipboard();
    });

    it('should emit copyEvent on failed copy', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.reject(new Error('Copy failed')),
      );

      component.copyEvent.subscribe((event: CopyToClipboardEvent) => {
        expect(event.copied).toBe(false);
        expect(event.color).toBe('ff5733');
        done();
      });

      component.copyToClipboard();
    });
  });

  describe('copyToClipboard', () => {
    it('should copy color without # to clipboard', async () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve(),
      );

      await component.copyToClipboard();

      expect(writeTextSpy).toHaveBeenCalledWith('ff5733');
    });

    it('should handle color without # symbol', async () => {
      fixture.componentRef.setInput('color', 'ff5733');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve(),
      );

      await component.copyToClipboard();

      expect(writeTextSpy).toHaveBeenCalledWith('ff5733');
    });

    it('should return early when no color provided', async () => {
      fixture.componentRef.setInput('color', '');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText');

      await component.copyToClipboard();

      expect(writeTextSpy).not.toHaveBeenCalled();
    });

    it('should log warning in debug mode when no color provided', async () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('color', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      await component.copyToClipboard();

      expect(console.warn).toHaveBeenCalledWith('no color provided to copy');
    });

    it('should log success message in debug mode', async () => {
      spyOn(console, 'log');
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

      await component.copyToClipboard();

      expect(console.log).toHaveBeenCalledWith('#ff5733', 'copied to clipboard');
    });

    it('should log error on clipboard write failure', async () => {
      spyOn(console, 'error');
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      const error = new Error('Clipboard write failed');
      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(error));

      await component.copyToClipboard();

      expect(console.error).toHaveBeenCalledWith('Failed to copy text: ', error);
    });

    it('should emit success event with correct data', async () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

      const emitSpy = jasmine.createSpy('copyEvent');
      component.copyEvent.subscribe(emitSpy);

      await component.copyToClipboard();

      expect(emitSpy).toHaveBeenCalledWith({
        copied: true,
        color: 'ff5733',
      });
    });

    it('should emit failure event with correct data', async () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(new Error('Failed')));

      const emitSpy = jasmine.createSpy('copyEvent');
      component.copyEvent.subscribe(emitSpy);

      await component.copyToClipboard();

      expect(emitSpy).toHaveBeenCalledWith({
        copied: false,
        color: 'ff5733',
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple # symbols', async () => {
      fixture.componentRef.setInput('color', '##ff5733');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve(),
      );

      await component.copyToClipboard();

      expect(writeTextSpy).toHaveBeenCalledWith('#ff5733');
    });

    it('should handle uppercase hex values', async () => {
      fixture.componentRef.setInput('color', '#FF5733');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve(),
      );

      await component.copyToClipboard();

      expect(writeTextSpy).toHaveBeenCalledWith('FF5733');
    });

    it('should handle 3-digit hex values', async () => {
      fixture.componentRef.setInput('color', '#fff');
      fixture.detectChanges();

      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve(),
      );

      await component.copyToClipboard();

      expect(writeTextSpy).toHaveBeenCalledWith('fff');
    });
  });

  describe('Template integration', () => {
    it('should render button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should call copyToClipboard on button click', async () => {
      spyOn(component, 'copyToClipboard');
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.copyToClipboard).toHaveBeenCalled();
    });
  });
});
