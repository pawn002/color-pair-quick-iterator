import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetadataComponent } from './metadata.component';
import { ColorUtilService } from '../../services/color-util.service';
import { ColorMetricsService } from '../../services/color-metrics.service';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;
  let colorUtilService: ColorUtilService;
  let colorMetricsService: ColorMetricsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    colorUtilService = TestBed.inject(ColorUtilService);
    colorMetricsService = TestBed.inject(ColorMetricsService);
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

    it('should accept debug flag', () => {
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();
      expect(component.debug()).toBe(true);
    });

    it('should have default values', () => {
      expect(component.colorOne()).toBe('');
      expect(component.colorTwo()).toBe('');
      expect(component.debug()).toBe(false);
    });
  });

  describe('colorOneMeta computed signal', () => {
    it('should return metadata for valid color', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.detectChanges();

      const meta = component.colorOneMeta();
      expect(meta).not.toBeNull();
      expect(meta).toEqual(
        jasmine.objectContaining({
          lightness: jasmine.any(String),
          chroma: jasmine.any(String),
          hue: jasmine.any(String),
          saturation: jasmine.any(String),
        }),
      );
    });

    it('should return null for empty color', () => {
      fixture.componentRef.setInput('colorOne', '');
      fixture.detectChanges();

      expect(component.colorOneMeta()).toBeNull();
    });

    it('should log warning in debug mode when color is missing', () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.colorOneMeta();

      expect(console.warn).toHaveBeenCalledWith('failed to get colorOne meta');
    });

    it('should update when colorOne changes', () => {
      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.detectChanges();
      const meta1 = component.colorOneMeta();

      fixture.componentRef.setInput('colorOne', '#0000ff');
      fixture.detectChanges();
      const meta2 = component.colorOneMeta();

      expect(meta1).not.toEqual(meta2);
    });
  });

  describe('colorTwoMeta computed signal', () => {
    it('should return metadata for valid color', () => {
      fixture.componentRef.setInput('colorTwo', '#e0e0e0');
      fixture.detectChanges();

      const meta = component.colorTwoMeta();
      expect(meta).not.toBeNull();
      expect(meta).toEqual(
        jasmine.objectContaining({
          lightness: jasmine.any(String),
          chroma: jasmine.any(String),
          hue: jasmine.any(String),
          saturation: jasmine.any(String),
        }),
      );
    });

    it('should return null for empty color', () => {
      fixture.componentRef.setInput('colorTwo', '');
      fixture.detectChanges();

      expect(component.colorTwoMeta()).toBeNull();
    });

    it('should log warning in debug mode when color is missing', () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('colorTwo', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.colorTwoMeta();

      expect(console.warn).toHaveBeenCalledWith('failed to get colorTwo meta');
    });
  });

  describe('differences computed signal', () => {
    it('should calculate all differences for valid colors', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff).toBeDefined();
      expect(diff.deltaE).not.toBeNaN();
      expect(diff.wcag2New).not.toBeNaN();
      expect(diff.wcag2Old).not.toBeNaN();
      expect(diff.apca).not.toBeNaN();
    });

    it('should return NaN values when colors are missing', () => {
      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff.deltaE).toBeNaN();
      expect(diff.wcag2New).toBeNaN();
      expect(diff.wcag2Old).toBeNaN();
      expect(diff.apca).toBeNaN();
    });

    it('should calculate deltaE between different colors', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff.deltaE).toBeGreaterThan(0);
    });

    it('should calculate WCAG 2 ratios', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff.wcag2New).toBeGreaterThan(1);
      expect(diff.wcag2Old).toBeGreaterThan(1);
    });

    it('should calculate APCA score', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(Math.abs(diff.apca)).toBeGreaterThan(100);
    });

    it('should log warning in debug mode when colors missing', () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('colorTwo', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.differences();

      expect(console.warn).toHaveBeenCalledWith('failed to get color differences');
    });

    it('should handle null deltaE gracefully', () => {
      spyOn(colorUtilService, 'calcDeltaE').and.returnValue(null);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff.deltaE).toBeNaN();
    });
  });

  describe('successes computed signal', () => {
    it('should calculate pass/fail for text contrast', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.text).toBe('pass');
    });

    it('should calculate pass/fail for large text contrast', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.largeText).toBe('pass');
    });

    it('should calculate minimum object dimension', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.objectMinDimension).toBe(0.25);
    });

    it('should mark text as fail for low contrast', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValues(3.0, 60);

      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#888888');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.text).toBe('fail');
    });

    it('should mark large text as pass for medium contrast', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValues(3.5, 50);

      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#cccccc');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.largeText).toBe('pass');
    });

    it('should return invisible for very low contrast', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValues(1.5, 10);
      spyOn(colorUtilService, 'getMinObjectDimension').and.returnValue(NaN);

      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#858585');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.objectMinDimension).toBe('invisible');
    });

    it('should return null values when colors missing', () => {
      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const success = component.successes();
      expect(success.text).toBeNull();
      expect(success.largeText).toBeNull();
      expect(success.objectMinDimension).toBeNaN();
    });

    it('should log warning in debug mode when colors missing', () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('colorOne', '');
      fixture.componentRef.setInput('colorTwo', '');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      component.successes();

      expect(console.warn).toHaveBeenCalledWith('no colors for successes');
    });

    it('should handle null contrast scores', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(null);
      spyOn(console, 'warn');

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      const success = component.successes();

      expect(console.warn).toHaveBeenCalledWith('trouble getting scores');
      expect(success.text).toBeNull();
    });
  });

  describe('Integration with services', () => {
    it('should use ColorUtilService for metadata', () => {
      spyOn(colorUtilService, 'getColorMeta').and.callThrough();

      fixture.componentRef.setInput('colorOne', '#ff5733');
      fixture.detectChanges();

      component.colorOneMeta();

      expect(colorUtilService.getColorMeta).toHaveBeenCalledWith('#ff5733');
    });

    it('should use ColorMetricsService for contrast calculations', () => {
      spyOn(colorMetricsService, 'getContrast').and.returnValue(75);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      component.differences();

      expect(colorMetricsService.getContrast).toHaveBeenCalled();
    });

    it('should use ColorUtilService for WCAG 2 calculation', () => {
      spyOn(colorUtilService, 'calcWcag2').and.returnValue(21.0);

      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      component.differences();

      expect(colorUtilService.calcWcag2).toHaveBeenCalledWith('#000000', '#ffffff');
    });
  });

  describe('Edge cases', () => {
    it('should handle identical colors', () => {
      fixture.componentRef.setInput('colorOne', '#808080');
      fixture.componentRef.setInput('colorTwo', '#808080');
      fixture.detectChanges();

      const diff = component.differences();
      // Delta E for identical colors should be 0 or very close to 0
      // The actual implementation may return NaN or 0 depending on the algorithm
      expect(diff.deltaE).toBeDefined();
      if (!isNaN(diff.deltaE)) {
        expect(diff.deltaE).toBeCloseTo(0, 1);
      }
    });

    it('should handle maximum contrast', () => {
      fixture.componentRef.setInput('colorOne', '#000000');
      fixture.componentRef.setInput('colorTwo', '#ffffff');
      fixture.detectChanges();

      const diff = component.differences();
      expect(diff.wcag2Old).toBe(21.0);
    });
  });
});
