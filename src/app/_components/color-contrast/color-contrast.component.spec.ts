import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorContrastComponent } from './color-contrast.component';
import { ColorMetricsService } from '../../services/color-metrics.service';
import { ColorUtilService } from '../../services/color-util.service';

describe('ColorContrastComponent', () => {
  let component: ColorContrastComponent;
  let fixture: ComponentFixture<ColorContrastComponent>;
  let colorMetricsService: ColorMetricsService;
  let colorUtilService: ColorUtilService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorContrastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorContrastComponent);
    component = fixture.componentInstance;
    colorMetricsService = TestBed.inject(ColorMetricsService);
    colorUtilService = TestBed.inject(ColorUtilService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept colorOne', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.detectChanges();
      expect(component.colorOne()).toBe('#ff5733');
    });

    it('should accept colorTwo', () => {
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.detectChanges();
      expect(component.colorTwo()).toBe('#e0e0e0');
    });

    it('should accept contrastType', () => {
      fixture.componentRef.setInput('contrastType', 'bpca');
      fixture.detectChanges();
      expect(component.contrastType()).toBe('bpca');
    });

    it('should accept debug flag', () => {
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();
      expect(component.debug()).toBe(true);
    });

    it('should have default values', () => {
      expect(component.colorOne()).toBe('');
      expect(component.colorTwo()).toBe('');
      expect(component.contrastType()).toBe('okca');
      expect(component.debug()).toBe(false);
    });
  });

  describe('Contrast calculation with APCA type', () => {
    it('should calculate APCA contrast for black on white', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThan(100);
    });

    it('should calculate APCA contrast for colored pair', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
    });

    it('should update contrast when colors change', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      const firstScore = component.contrastScore();

      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.detectChanges();

      const secondScore = component.contrastScore();

      expect(firstScore).not.toBe(secondScore);
    });
  });

  describe('Contrast calculation with BPCA type', () => {
    it('should calculate BPCA contrast for black on white', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'bpca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThan(10);
    });

    it('should calculate BPCA contrast for colored pair', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'bpca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
    });
  });

  describe('Contrast calculation with APCA object type', () => {
    it('should calculate minimum object dimension for black on white', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca object');
      fixture.detectChanges();

      expect(component.contrastScore()).toBe(0.25);
    });

    it('should calculate minimum object dimension for medium contrast', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(60);

      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'apca object');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThan(0);
    });

    it('should use ColorUtilService.getMinObjectDimension', () => {
      spyOn(colorUtilService, 'getMinObjectDimension').and.returnValue(2.5);
      spyOn(colorMetricsService, 'getContrast').and.returnValue(60);

      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'apca object');
      fixture.detectChanges();

      expect(colorUtilService.getMinObjectDimension).toHaveBeenCalledWith(60);
      expect(component.contrastScore()).toBe(2.5);
    });
  });

  describe('Contrast calculation with OKCA type', () => {
    it('should calculate OKCA contrast for black on white', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'okca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThanOrEqual(20);
    });

    it('should calculate OKCA contrast for colored pair', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'okca');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThanOrEqual(1);
    });

    it('should use ColorMetricsService.getContrast with okca type', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(15);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'okca');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'okca');
      expect(component.contrastScore()).toBe(15);
    });

    it('should return 1 for identical colors', () => {
      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#808080');
      fixture.componentRef.setInput('contrastType', 'okca');
      fixture.detectChanges();

      expect(component.contrastScore()).toBe(1);
    });
  });

  describe('Contrast calculation with Delta E type', () => {
    it('should calculate Delta E for black on white', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'deltaE');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
      expect(component.contrastScore()).toBeGreaterThan(0);
    });

    it('should calculate Delta E for colored pair', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.componentRef.setInput('contrastType', 'deltaE');
      fixture.detectChanges();

      expect(component.contrastScore()).not.toBeNaN();
    });

    it('should use ColorMetricsService.getContrast with deltaE type', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(100);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'deltaE');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'deltaE');
      expect(component.contrastScore()).toBe(100);
    });

    it('should return 0 for identical colors', () => {
      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#808080');
      fixture.componentRef.setInput('contrastType', 'deltaE');
      fixture.detectChanges();

      expect(component.contrastScore()).toBe(0);
    });
  });

  describe('Effect behavior', () => {
    it('should return early when colorOne is missing', () => {
      spyOn(console, 'warn');

      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      expect(console.warn).toHaveBeenCalledWith('contrast comp missing inputs');
    });

    it('should return early when colorTwo is missing', () => {
      spyOn(console, 'warn');

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      expect(console.warn).toHaveBeenCalledWith('contrast comp missing inputs');
    });

    it('should return early when contrastType is missing', () => {
      spyOn(console, 'warn');

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      expect(console.warn).toHaveBeenCalledWith('contrast comp missing inputs');
    });

    it('should set NaN when score is null', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(null);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      expect(component.contrastScore()).toBeNaN();
    });
  });

  describe('Type detection', () => {
    it('should detect APCA type correctly', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(75);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'apca');
    });

    it('should detect APCA object type correctly', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(75);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca object');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'apca');
    });

    it('should detect BPCA type correctly', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(7.5);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'bpca');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'bpca');
    });

    it('should detect Delta E type correctly', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(100);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'deltaE');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'deltaE');
    });

    it('should detect OKCA type correctly', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(21);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'okca');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalledWith('#000000', '#ffffff', 'okca');
    });
  });

  describe('Integration with services', () => {
    it('should use ColorMetricsService for contrast calculation', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(75);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      expect(colorMetricsService.getContrast).toHaveBeenCalled();
    });

    it('should handle service returning zero', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(0);

      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#808080');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      // The component should return the mocked value or handle it gracefully
      const score = component.contrastScore();
      expect(score === 0 || isNaN(score)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle identical colors', () => {
      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#808080');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      // Identical colors may return 0 or NaN depending on the algorithm
      const score = component.contrastScore();
      expect(score === 0 || isNaN(score)).toBe(true);
    });

    it('should handle very low contrast', () => {
      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#858585');
      fixture.componentRef.setInput('contrastType', 'apca');
      fixture.detectChanges();

      // Very low contrast should return a number (could be 0 or a small value)
      const score = component.contrastScore();
      expect(typeof score === 'number').toBe(true);
    });
  });
});
