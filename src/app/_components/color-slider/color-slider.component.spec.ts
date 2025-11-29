import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorSliderComponent } from './color-slider.component';
import { ColorUtilService } from '../../services/color-util.service';
import { ElementRef } from '@angular/core';

describe('ColorSliderComponent', () => {
  let component: ColorSliderComponent;
  let fixture: ComponentFixture<ColorSliderComponent>;
  let colorUtilService: ColorUtilService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSliderComponent);
    component = fixture.componentInstance;
    colorUtilService = TestBed.inject(ColorUtilService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept id', () => {
      fixture.componentRef.setInput('id', 'custom-slider');
      fixture.detectChanges();
      expect(component.id()).toBe('custom-slider');
    });

    it('should accept name', () => {
      fixture.componentRef.setInput('name', 'custom-name');
      fixture.detectChanges();
      expect(component.name()).toBe('custom-name');
    });

    it('should accept color', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      expect(component.color()).toBe('#ff5733');
    });

    it('should accept constantChroma flag', () => {
      fixture.componentRef.setInput('constantChroma', true);
      fixture.detectChanges();
      expect(component.constantChroma()).toBe(true);
    });

    it('should accept showGradient flag', () => {
      fixture.componentRef.setInput('showGradient', true);
      fixture.detectChanges();
      expect(component.showGradient()).toBe(true);
    });

    it('should accept resetSlider object', () => {
      fixture.componentRef.setInput('resetSlider', { reset: true });
      fixture.detectChanges();
      expect(component.resetSlider()).toEqual({ reset: true });
    });

    it('should have default values', () => {
      expect(component.id()).toBe('slider-0');
      expect(component.name()).toBe('color-slider');
      expect(component.color()).toBe('');
      expect(component.constantChroma()).toBe(false);
      expect(component.showGradient()).toBe(false);
      expect(component.debug()).toBe(false);
    });
  });

  describe('Outputs', () => {
    it('should emit colorVariant on sendInitialLightVariant', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      component.colorVariant.subscribe((variant) => {
        expect(variant).toBe('#ff5733');
        done();
      });

      component.sendInitialLightVariant();
    });
  });

  describe('sendInitialLightVariant', () => {
    it('should emit the input color', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      component.colorVariant.subscribe((variant) => {
        expect(variant).toBe('#ff5733');
        done();
      });

      component.sendInitialLightVariant();
    });

    it('should set devColorVariant in debug mode', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.sendInitialLightVariant();
      expect(component.devColorVariant()).toBe('#ff5733');
    });
  });

  describe('getAndSetLightnessRange', () => {
    it('should set slider min and max to 0 and 1 by default', async () => {
      await component.getAndSetLightnessRange('#ff5733');

      expect(component.slideMin()).toBe(0);
      expect(component.slideMax()).toBe(1);
    });

    it('should set slider min and max from range when constantChroma is true', async () => {
      const mockRange = {
        originalCoords: [0.5, 0.1, 180] as [number, number, number],
        lightMin: 0.2,
        lightMax: 0.8,
      };

      spyOn(colorUtilService, 'getMinMaxLight').and.returnValue(Promise.resolve(mockRange));

      await component.getAndSetLightnessRange('#ff5733', { constantChroma: true });

      expect(component.slideMin()).toBe(0.2);
      expect(component.slideMax()).toBe(0.8);
    });

    it('should set slideInterval based on min and max', async () => {
      const mockRange = {
        originalCoords: [0.5, 0.1, 180] as [number, number, number],
        lightMin: 0.0,
        lightMax: 1.0,
      };

      spyOn(colorUtilService, 'getMinMaxLight').and.returnValue(Promise.resolve(mockRange));

      await component.getAndSetLightnessRange('#ff5733');

      expect(component.slideInterval()).toBeCloseTo(1.0 / 80, 4);
    });

    it('should set initial value from original coords', async () => {
      const mockRange = {
        originalCoords: [0.5, 0.1, 180] as [number, number, number],
        lightMin: 0.0,
        lightMax: 1.0,
      };

      spyOn(colorUtilService, 'getMinMaxLight').and.returnValue(Promise.resolve(mockRange));

      await component.getAndSetLightnessRange('#ff5733');

      expect(component.initValue()).toBe(0.5);
      expect(component.value()).toBe(0.5);
    });

    it('should handle null range object', async () => {
      spyOn(console, 'error');
      spyOn(colorUtilService, 'getMinMaxLight').and.returnValue(Promise.resolve(null));

      await component.getAndSetLightnessRange('#ff5733');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('handleSliding', () => {
    it('should create color variant with specified lightness', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(colorUtilService, 'createSrgbColor').and.returnValue('#abc123');

      const mockEvent = {
        target: { value: '0.7' },
      } as unknown as Event;

      component.handleSliding(mockEvent);

      expect(colorUtilService.createSrgbColor).toHaveBeenCalledWith('#ff5733', 0.7);
    });

    it('should emit colorVariant with new color', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(colorUtilService, 'createSrgbColor').and.returnValue('#abc123');

      component.colorVariant.subscribe((variant) => {
        expect(variant).toBe('#abc123');
        done();
      });

      const mockEvent = {
        target: { value: '0.7' },
      } as unknown as Event;

      component.handleSliding(mockEvent);
    });

    it('should handle null color from createSrgbColor', (done) => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(colorUtilService, 'createSrgbColor').and.returnValue(null);

      component.colorVariant.subscribe((variant) => {
        expect(variant).toBeNull();
        done();
      });

      const mockEvent = {
        target: { value: '0.7' },
      } as unknown as Event;

      component.handleSliding(mockEvent);
    });

    it('should log in debug mode', () => {
      spyOn(console, 'log');
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      spyOn(colorUtilService, 'createSrgbColor').and.returnValue('#abc123');

      const mockEvent = {
        target: { value: '0.7' },
      } as unknown as Event;

      component.handleSliding(mockEvent);

      expect(console.log).toHaveBeenCalled();
    });

    it('should handle missing color', () => {
      spyOn(console, 'error');
      fixture.componentRef.setInput('color', '');
      fixture.detectChanges();

      const mockEvent = {
        target: { value: '0.7' },
      } as unknown as Event;

      component.handleSliding(mockEvent);

      expect(console.error).toHaveBeenCalledWith('no color specified');
    });
  });

  describe('reset', () => {
    it('should reset slider to initial value', () => {
      const slider = document.createElement('input');
      slider.id = 'test-slider';
      slider.type = 'range';
      slider.value = '0.5';
      document.body.appendChild(slider);

      fixture.componentRef.setInput('id', 'test-slider');
      fixture.detectChanges();

      component.initValue.set(0.7);
      component.reset();

      expect(slider.value).toBe('0.7');

      document.body.removeChild(slider);
    });

    it('should handle missing initValue', () => {
      spyOn(console, 'error');

      const slider = document.createElement('input');
      slider.id = 'test-slider';
      slider.type = 'range';
      document.body.appendChild(slider);

      fixture.componentRef.setInput('id', 'test-slider');
      fixture.detectChanges();

      component.initValue.set(NaN);
      component.reset();

      expect(console.error).toHaveBeenCalled();

      document.body.removeChild(slider);
    });
  });

  describe('gradient', () => {
    it('should apply gradient when turned on', () => {
      const mockElement = document.createElement('div');
      const mockElementRef = new ElementRef(mockElement);

      // Mock the viewChild signal
      spyOn(component, 'slideContainer').and.returnValue(mockElementRef as any);

      component.gradient('on');

      expect(mockElement.style.background).toBe('var(--gradient-background)');
    });

    it('should remove gradient when turned off', () => {
      const mockElement = document.createElement('div');
      const mockElementRef = new ElementRef(mockElement);

      spyOn(component, 'slideContainer').and.returnValue(mockElementRef as any);

      component.gradient('off');

      expect(mockElement.style.background).toBe('var(--default-background)');
    });

    it('should handle missing element gracefully', () => {
      spyOn(component, 'slideContainer').and.returnValue(undefined as any);

      expect(() => {
        component.gradient('on');
      }).not.toThrow();
    });
  });

  describe('redefineVariable', () => {
    it('should set CSS variable on element', () => {
      const element = document.createElement('div');

      component.redefineVariable(element, '--test-var', '#ff5733');

      expect(element.style.getPropertyValue('--test-var')).toBe('#ff5733');
    });
  });

  describe('redefineGradientStops', () => {
    it('should create gradient stops for color range', () => {
      const container = document.createElement('div');
      container.id = 'cc-test-slider';
      document.body.appendChild(container);

      fixture.componentRef.setInput('id', 'test-slider');
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      spyOn(colorUtilService, 'createSrgbColor').and.returnValue('#abc123');

      component.redefineGradientStops(0.2, 0.8);

      expect(colorUtilService.createSrgbColor).toHaveBeenCalled();

      document.body.removeChild(container);
    });

    it('should handle missing color', () => {
      spyOn(console, 'error');
      fixture.componentRef.setInput('color', '');
      fixture.detectChanges();

      component.redefineGradientStops(0.0, 1.0);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Template integration', () => {
    it('should render range input', () => {
      const input = fixture.nativeElement.querySelector('input[type="range"]');
      expect(input).toBeTruthy();
    });
  });
});
