import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, AlertMessagObj } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component.timeout) {
      clearTimeout(component.timeout);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept alertMessage', () => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();
      expect(component.alertMessage()).toEqual(message);
    });

    it('should have default AlertMessagObj', () => {
      expect(component.alertMessage()).toEqual(
        jasmine.objectContaining({
          message: '',
        }),
      );
    });
  });

  describe('Outputs', () => {
    it('should emit alertClosed when hideAlert is called', (done) => {
      component.alertClosed.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });

      component.hideAlert();
    });
  });

  describe('showAlert signal', () => {
    it('should default to false', () => {
      expect(component.showAlert()).toBe(false);
    });

    it('should be set to true when alert message is provided', () => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();
      expect(component.showAlert()).toBe(true);
    });

    it('should be set to false when hideAlert is called', () => {
      component.showAlert.set(true);
      component.hideAlert();
      expect(component.showAlert()).toBe(false);
    });
  });

  describe('generateRandomString', () => {
    it('should generate string of specified length', () => {
      const result = component.generateRandomString(12);
      expect(result.length).toBe(12);
    });

    it('should generate different strings on subsequent calls', () => {
      const result1 = component.generateRandomString(12);
      const result2 = component.generateRandomString(12);
      expect(result1).not.toBe(result2);
    });

    it('should handle length of 0', () => {
      const result = component.generateRandomString(0);
      expect(result).toBe('');
    });

    it('should handle various lengths', () => {
      [5, 10, 15, 20].forEach((length) => {
        const result = component.generateRandomString(length);
        expect(result.length).toBe(length);
      });
    });
  });

  describe('hideAlert', () => {
    it('should set showAlert to false', () => {
      component.showAlert.set(true);
      component.hideAlert();
      expect(component.showAlert()).toBe(false);
    });

    it('should clear uniqId', () => {
      component.uniqId.set('test-id');
      component.hideAlert();
      expect(component.uniqId()).toBe('');
    });

    it('should emit alertClosed event', (done) => {
      component.alertClosed.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });

      component.hideAlert();
    });
  });

  describe('Auto-hide timeout', () => {
    it('should auto-hide after 5 seconds', (done) => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();

      expect(component.showAlert()).toBe(true);

      setTimeout(() => {
        expect(component.showAlert()).toBe(false);
        done();
      }, 5100);
    });

    it('should set timeout when alert is shown', () => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();

      expect(component.timeout).not.toBeNaN();
    });

    it('should clear previous timeout when new alert is shown', (done) => {
      const message1: AlertMessagObj = { message: 'First alert' };
      fixture.componentRef.setInput('alertMessage', message1);
      fixture.detectChanges();

      const firstTimeout = component.timeout;

      setTimeout(() => {
        const message2: AlertMessagObj = { message: 'Second alert' };
        fixture.componentRef.setInput('alertMessage', message2);
        fixture.detectChanges();

        expect(component.timeout).not.toBe(firstTimeout);
        expect(component.showAlert()).toBe(true);

        setTimeout(() => {
          expect(component.showAlert()).toBe(true);

          setTimeout(() => {
            expect(component.showAlert()).toBe(false);
            done();
          }, 2000);
        }, 3000);
      }, 2000);
    });
  });

  describe('Effect behavior', () => {
    it('should generate unique ID when alert is shown', () => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();

      expect(component.uniqId()).not.toBe('');
      expect(component.uniqId().length).toBe(12);
    });

    it('should not show alert for empty message', () => {
      const message: AlertMessagObj = { message: '' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();

      expect(component.showAlert()).toBe(false);
    });

    it('should show alert for non-empty message', () => {
      const message: AlertMessagObj = { message: 'Test alert' };
      fixture.componentRef.setInput('alertMessage', message);
      fixture.detectChanges();

      expect(component.showAlert()).toBe(true);
    });
  });

  describe('Template rendering', () => {
    it('should render alert when showAlert is true', () => {
      component.showAlert.set(true);
      fixture.detectChanges();

      const alertElement = fixture.nativeElement.querySelector('.alert');
      expect(alertElement).toBeTruthy();
    });

    it('should not render alert when showAlert is false', () => {
      component.showAlert.set(false);
      fixture.detectChanges();

      const alertElement = fixture.nativeElement.querySelector('.alert');
      expect(alertElement).toBeFalsy();
    });
  });
});
