import { TestBed } from '@angular/core/testing';
import { BpcaService } from './bpca.service';
import { ColorUtilService } from './color-util.service';

describe('BpcaService', () => {
  let service: BpcaService;
  let colorUtilService: ColorUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpcaService);
    colorUtilService = TestBed.inject(ColorUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sRGBtoY', () => {
    it('should convert white to luminance 1', () => {
      const result = service.sRGBtoY([255, 255, 255]);
      expect(result).toBeCloseTo(1.0, 2);
    });

    it('should convert black to luminance 0', () => {
      const result = service.sRGBtoY([0, 0, 0]);
      expect(result).toBeCloseTo(0.0, 2);
    });

    it('should convert red to luminance value', () => {
      const result = service.sRGBtoY([255, 0, 0]);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should convert green to luminance value', () => {
      const result = service.sRGBtoY([0, 255, 0]);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should convert blue to luminance value', () => {
      const result = service.sRGBtoY([0, 0, 255]);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should handle mid-gray correctly', () => {
      const result = service.sRGBtoY([128, 128, 128]);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should use default value when no parameter provided', () => {
      const result = service.sRGBtoY();
      expect(result).toBe(0);
    });

    it('should return number between 0 and 1', () => {
      const result = service.sRGBtoY([100, 150, 200]);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
  });

  describe('BPCAcontrast', () => {
    it('should calculate contrast for black on white', () => {
      const txtY = service.sRGBtoY([0, 0, 0]);
      const bgY = service.sRGBtoY([255, 255, 255]);
      const result = service.BPCAcontrast(txtY, bgY);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate contrast for white on black', () => {
      const txtY = service.sRGBtoY([255, 255, 255]);
      const bgY = service.sRGBtoY([0, 0, 0]);
      const result = service.BPCAcontrast(txtY, bgY);
      expect(result).toBeLessThan(0);
    });

    it('should return 0 for identical luminances', () => {
      const result = service.BPCAcontrast(0.5, 0.5);
      expect(result).toBe(0);
    });

    it('should return 0 for NaN input', () => {
      const result = service.BPCAcontrast(NaN, 0.5);
      expect(result).toBe(0);
    });

    it('should return 0 for out-of-range txtY', () => {
      const result = service.BPCAcontrast(1.5, 0.5);
      expect(result).toBe(0);
    });

    it('should return 0 for out-of-range bgY', () => {
      const result = service.BPCAcontrast(0.5, 1.5);
      expect(result).toBe(0);
    });

    it('should return 0 for negative txtY', () => {
      const result = service.BPCAcontrast(-0.1, 0.5);
      expect(result).toBe(0);
    });

    it('should handle very low contrast', () => {
      const result = service.BPCAcontrast(0.5, 0.5001);
      expect(result).toBe(0);
    });

    it('should return numeric value with default places parameter', () => {
      const result = service.BPCAcontrast(0.0, 1.0);
      expect(typeof result).toBe('number');
    });

    it('should return string with places=0', () => {
      const result = service.BPCAcontrast(0.0, 1.0, 0);
      expect(typeof result).toBe('string');
    });

    it('should return string with decimal places when places > 0', () => {
      const result = service.BPCAcontrast(0.0, 1.0, 2);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\d+\.\d{2}$/);
    });

    it('should throw error for invalid places parameter', () => {
      expect(() => {
        service.BPCAcontrast(0.0, 1.0, 1.5);
      }).toThrow();
    });
  });

  describe('bridgeRatio', () => {
    it('should convert APCA score to WCAG ratio string', () => {
      const txtY = service.sRGBtoY([0, 0, 0]);
      const bgY = service.sRGBtoY([255, 255, 255]);
      const result = service.bridgeRatio(60, txtY, bgY);
      expect(typeof result).toBe('string');
      expect(result).toContain('to 1');
    });

    it('should handle zero contrast', () => {
      const result = service.bridgeRatio(0, 0.5, 0.5);
      expect(typeof result).toBe('string');
    });

    it('should format result with specified decimal places', () => {
      const result = service.bridgeRatio(60, 0.0, 1.0, ' to 1', 2);
      expect(result).toMatch(/^\d+\.\d{2} to 1$/);
    });

    it('should use custom ratio string', () => {
      const result = service.bridgeRatio(60, 0.0, 1.0, ':1', 1);
      expect(result).toContain(':1');
    });

    it('should handle high contrast values', () => {
      const result = service.bridgeRatio(100, 0.0, 1.0);
      expect(typeof result).toBe('string');
    });

    it('should handle low contrast values', () => {
      const result = service.bridgeRatio(15, 0.2, 0.3);
      expect(typeof result).toBe('string');
    });

    it('should adjust for different luminance combinations', () => {
      const result1 = service.bridgeRatio(60, 0.0, 1.0);
      const result2 = service.bridgeRatio(60, 0.5, 0.8);
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });
  });

  describe('alphaBlend', () => {
    it('should blend fully opaque foreground', () => {
      const result = service.alphaBlend([255, 0, 0, 1.0], [0, 255, 0]);
      expect(result).toEqual([255, 0, 0]);
    });

    it('should blend half-transparent foreground', () => {
      const result = service.alphaBlend([255, 0, 0, 0.5], [0, 255, 0]);
      expect(result[0]).toBeGreaterThan(0);
      expect(result[1]).toBeGreaterThan(0);
      expect(result[2]).toBe(0);
    });

    it('should blend fully transparent foreground', () => {
      const result = service.alphaBlend([255, 0, 0, 0.0], [0, 255, 0]);
      // When alpha is 0, the function returns the foreground array (without alpha channel)
      expect(result.length).toBe(4);
      expect(result[0]).toBe(255);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(0);
    });

    it('should clamp alpha values above 1', () => {
      const result = service.alphaBlend([255, 0, 0, 1.5], [0, 255, 0]);
      expect(result).toEqual([255, 0, 0]);
    });

    it('should clamp alpha values below 0', () => {
      const result = service.alphaBlend([255, 0, 0, -0.5], [0, 255, 0]);
      expect(result).toEqual([0, 255, 0]);
    });

    it('should return integer values when isInt is true', () => {
      const result = service.alphaBlend([255, 0, 0, 0.5], [0, 255, 0], true);
      expect(Number.isInteger(result[0])).toBe(true);
      expect(Number.isInteger(result[1])).toBe(true);
      expect(Number.isInteger(result[2])).toBe(true);
    });

    it('should return float values when isInt is false', () => {
      const result = service.alphaBlend([255, 0, 0, 0.5], [0, 255, 0], false);
      expect(result[0]).toBeDefined();
      expect(result[1]).toBeDefined();
      expect(result[2]).toBeDefined();
    });

    it('should cap RGB values at 255', () => {
      const result = service.alphaBlend([255, 255, 255, 1.0], [255, 255, 255], true);
      expect(result[0]).toBeLessThanOrEqual(255);
      expect(result[1]).toBeLessThanOrEqual(255);
      expect(result[2]).toBeLessThanOrEqual(255);
    });
  });

  describe('calcBPCA', () => {
    it('should calculate BPCA for black on white', () => {
      const result = service.calcBPCA('#000000', '#ffffff');
      expect(result).not.toBeNaN();
      expect(typeof result).toBe('number');
    });

    it('should calculate BPCA for white on black', () => {
      const result = service.calcBPCA('#ffffff', '#000000');
      expect(result).not.toBeNaN();
      expect(typeof result).toBe('number');
    });

    it('should calculate BPCA for colored text', () => {
      const result = service.calcBPCA('#ff5733', '#e0e0e0');
      expect(result).not.toBeNaN();
    });

    it('should return NaN for invalid text color', () => {
      const result = service.calcBPCA('invalid', '#ffffff');
      expect(result).toBeNaN();
    });

    it('should return NaN for invalid background color', () => {
      const result = service.calcBPCA('#000000', 'invalid');
      expect(result).toBeNaN();
    });

    it('should handle identical colors', () => {
      const result = service.calcBPCA('#808080', '#808080');
      expect(result).not.toBeNaN();
    });

    it('should return numeric value with default parameters', () => {
      const result = service.calcBPCA('#000000', '#ffffff');
      expect(typeof result).toBe('number');
    });

    it('should respect places parameter', () => {
      const result = service.calcBPCA('#000000', '#ffffff', 2);
      if (typeof result === 'string') {
        expect(result).toMatch(/^\d+\.\d{2}$/);
      }
    });

    it('should calculate consistent results for same inputs', () => {
      const result1 = service.calcBPCA('#ff5733', '#e0e0e0');
      const result2 = service.calcBPCA('#ff5733', '#e0e0e0');
      expect(result1).toBe(result2);
    });

    it('should handle grayscale colors', () => {
      const result = service.calcBPCA('#333333', '#cccccc');
      expect(result).not.toBeNaN();
    });
  });

  describe('Integration with ColorUtilService', () => {
    it('should use ColorUtilService for RGB conversion', () => {
      spyOn(colorUtilService, 'getRgb255Array').and.returnValue([255, 255, 255]);
      service.calcBPCA('#ffffff', '#000000');
      expect(colorUtilService.getRgb255Array).toHaveBeenCalled();
    });

    it('should handle null RGB arrays gracefully', () => {
      spyOn(colorUtilService, 'getRgb255Array').and.returnValue(null);
      const result = service.calcBPCA('#ffffff', '#000000');
      expect(result).toBeNaN();
    });
  });
});
