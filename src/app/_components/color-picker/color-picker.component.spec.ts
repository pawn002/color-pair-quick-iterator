import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept inputId', () => {
      fixture.componentRef.setInput('inputId', 'custom-id');
      fixture.detectChanges();
      expect(component.inputId()).toBe('custom-id');
    });

    it('should accept inputName', () => {
      fixture.componentRef.setInput('inputName', 'custom-name');
      fixture.detectChanges();
      expect(component.inputName()).toBe('custom-name');
    });

    it('should accept color', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      expect(component.color()).toBe('#ff5733');
    });

    it('should accept debug flag', () => {
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();
      expect(component.debug()).toBe(true);
    });

    it('should have default values', () => {
      expect(component.inputId()).toBe('fg-color');
      expect(component.inputName()).toBe('foreground color');
      expect(component.color()).toBe('');
      expect(component.debug()).toBe(false);
    });
  });

  describe('Model (Two-way Binding)', () => {
    it('should accept comparedColor', () => {
      fixture.componentRef.setInput('comparedColor', '#e0e0e0');
      fixture.detectChanges();
      expect(component.comparedColor()).toBe('#e0e0e0');
    });

    it('should update uiComparedColor when comparedColor changes', () => {
      fixture.componentRef.setInput('comparedColor', '#e0e0e0');
      fixture.detectChanges();
      expect(component.uiComparedColor()).toBe('#e0e0e0');
    });
  });

  describe('Outputs', () => {
    it('should emit selectedColor on handleColorChange', (done) => {
      component.selectedColor.subscribe((color) => {
        expect(color).toBe('#ff5733');
        done();
      });

      component.handleColorChange('#ff5733');
    });

    it('should emit selectedColor on input event', (done) => {
      component.selectedColor.subscribe((color) => {
        expect(color).toBe('#ff5733');
        done();
      });

      const mockEvent = {
        target: { value: '#ff5733' },
      } as unknown as Event;

      component.handleInputEvent(mockEvent);
    });
  });

  describe('handleColorChange', () => {
    it('should update uiColor signal', () => {
      component.handleColorChange('#ff5733');
      expect(component.uiColor()).toBe('#ff5733');
    });

    it('should emit selectedColor event', (done) => {
      component.selectedColor.subscribe((color) => {
        expect(color).toBe('#ff5733');
        done();
      });

      component.handleColorChange('#ff5733');
    });
  });

  describe('handleInputEvent', () => {
    it('should extract value from event target', () => {
      const mockEvent = {
        target: { value: '#ff5733' },
      } as unknown as Event;

      component.handleInputEvent(mockEvent);
      expect(component.uiColor()).toBe('#ff5733');
    });

    it('should reset uiComparedColor to transparent', () => {
      component.uiComparedColor.set('#e0e0e0');

      const mockEvent = {
        target: { value: '#ff5733' },
      } as unknown as Event;

      component.handleInputEvent(mockEvent);
      expect(component.uiComparedColor()).toBe('transparent');
    });

    it('should call handleColorChange with input value', () => {
      spyOn(component, 'handleColorChange');

      const mockEvent = {
        target: { value: '#ff5733' },
      } as unknown as Event;

      component.handleInputEvent(mockEvent);
      expect(component.handleColorChange).toHaveBeenCalledWith('#ff5733');
    });
  });

  describe('resetUiComparedColor', () => {
    it('should set uiComparedColor to transparent', () => {
      component.uiComparedColor.set('#ff5733');
      component.resetUiComparedColor();
      expect(component.uiComparedColor()).toBe('transparent');
    });
  });

  describe('updateInputValue', () => {
    it('should update input element value when element exists', () => {
      const input = document.createElement('input');
      input.id = 'test-input';
      input.type = 'color';
      input.value = '#000000';
      document.body.appendChild(input);

      fixture.componentRef.setInput('inputId', 'test-input');
      fixture.detectChanges();

      component.updateInputValue('#ff5733');

      // Need to query the element again after update
      const updatedInput = document.getElementById('test-input') as HTMLInputElement;
      expect(updatedInput.value).toBe('#ff5733');

      document.body.removeChild(input);
    });

    it('should handle missing input element gracefully', () => {
      fixture.componentRef.setInput('inputId', 'non-existent-input');
      fixture.detectChanges();

      expect(() => {
        component.updateInputValue('#ff5733');
      }).not.toThrow();
    });

    it('should log error in debug mode when input not found', () => {
      spyOn(console, 'error');
      fixture.componentRef.setInput('inputId', 'non-existent-input');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.updateInputValue('#ff5733');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    it('should render color input element', () => {
      const input = fixture.nativeElement.querySelector('input[type="color"]');
      expect(input).toBeTruthy();
    });

    it('should bind input id', () => {
      fixture.componentRef.setInput('inputId', 'custom-id');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('#custom-id');
      expect(input).toBeTruthy();
    });
  });

  describe('Effects', () => {
    it('should update uiColor when color input changes', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      expect(component.uiColor()).toBe('#ff5733');
    });

    it('should update uiComparedColor when comparedColor model changes', () => {
      fixture.componentRef.setInput('comparedColor', '#e0e0e0');
      fixture.detectChanges();
      expect(component.uiComparedColor()).toBe('#e0e0e0');
    });
  });
});
