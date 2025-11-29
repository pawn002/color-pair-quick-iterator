import { TestBed } from '@angular/core/testing';
import { ColorMetricsService } from './color-metrics.service';
import { ColorUtilService } from './color-util.service';
import { BpcaService } from './bpca.service';

describe('ColorMetricsService', () => {
  let service: ColorMetricsService;
  let colorUtilService: ColorUtilService;
  let bpcaService: BpcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorMetricsService);
    colorUtilService = TestBed.inject(ColorUtilService);
    bpcaService = TestBed.inject(BpcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getContrast', () => {
    it('should return APCA contrast when type is apca', () => {
      const result = service.getContrast('#000000', '#ffffff', 'apca');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    it('should return BPCA contrast when type is bpca', () => {
      const result = service.getContrast('#000000', '#ffffff', 'bpca');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    it('should return integer for APCA contrast', () => {
      const result = service.getContrast('#000000', '#ffffff', 'apca');
      expect(result).not.toBeNull();
      expect(Number.isInteger(result!)).toBe(true);
    });

    it('should handle same colors', () => {
      const result = service.getContrast('#808080', '#808080', 'apca');
      expect(result).not.toBeNull();
    });

    it('should handle colored pairs', () => {
      const result = service.getContrast('#ff5733', '#e0e0e0', 'apca');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    it('should return null when APCA calculation fails', () => {
      spyOn(service, 'calcRawApcaContrast').and.returnValue(null);
      const result = service.getContrast('#000000', '#ffffff', 'apca');
      expect(result).toBeNull();
    });

    it('should handle zero contrast', () => {
      const result = service.getContrast('#808080', '#808080', 'apca');
      expect(result).toBe(0);
    });
  });

  describe('calcRawApcaContrast', () => {
    it('should calculate APCA for black on white', () => {
      const result = service.calcRawApcaContrast('#000000', '#ffffff');
      expect(result).not.toBeNull();
      expect(result).toBeGreaterThan(100);
    });

    it('should calculate APCA for white on black', () => {
      const result = service.calcRawApcaContrast('#ffffff', '#000000');
      expect(result).not.toBeNull();
      expect(result).toBeLessThan(-100);
    });

    it('should return numeric value', () => {
      const result = service.calcRawApcaContrast('#ff5733', '#e0e0e0');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    it('should return 0 for identical colors', () => {
      const result = service.calcRawApcaContrast('#808080', '#808080');
      expect(result).toBe(0);
    });

    it('should handle maximum contrast', () => {
      const result = service.calcRawApcaContrast('#000000', '#ffffff');
      expect(result).not.toBeNull();
      expect(Math.abs(result!)).toBeGreaterThan(100);
    });

    it('should handle low contrast', () => {
      const result = service.calcRawApcaContrast('#808080', '#888888');
      expect(result).not.toBeNull();
      expect(Math.abs(result!)).toBeLessThan(50);
    });

    it('should respect polarity (dark on light vs light on dark)', () => {
      const result1 = service.calcRawApcaContrast('#000000', '#ffffff');
      const result2 = service.calcRawApcaContrast('#ffffff', '#000000');
      expect(result1).not.toBeNull();
      expect(result2).not.toBeNull();
      expect(Math.sign(result1!)).not.toBe(Math.sign(result2!));
    });

    it('should handle red and white', () => {
      const result = service.calcRawApcaContrast('#ff0000', '#ffffff');
      expect(result).not.toBeNull();
    });

    it('should handle blue and white', () => {
      const result = service.calcRawApcaContrast('#0000ff', '#ffffff');
      expect(result).not.toBeNull();
    });
  });

  describe('calcRawBpcaContrast', () => {
    it('should calculate BPCA for black on white', () => {
      const result = service.calcRawBpcaContrast('#000000', '#ffffff');
      expect(result).not.toBeNaN();
      expect(result).toBeGreaterThan(10);
    });

    it('should calculate BPCA for white on black', () => {
      const result = service.calcRawBpcaContrast('#ffffff', '#000000');
      expect(result).not.toBeNaN();
      expect(result).toBeGreaterThan(10);
    });

    it('should return numeric value', () => {
      const result = service.calcRawBpcaContrast('#ff5733', '#e0e0e0');
      expect(result).not.toBeNaN();
      expect(typeof result).toBe('number');
    });

    it('should handle identical colors', () => {
      const result = service.calcRawBpcaContrast('#808080', '#808080');
      expect(result).not.toBeNaN();
    });

    it('should return NaN when RGB conversion fails', () => {
      spyOn(colorUtilService, 'getRgb255Array').and.returnValue(null);
      const result = service.calcRawBpcaContrast('#000000', '#ffffff');
      expect(result).toBeNaN();
    });

    it('should use BpcaService for calculation', () => {
      spyOn(bpcaService, 'calcBPCA').and.returnValue(60);
      spyOn(colorUtilService, 'getRgb255Array').and.returnValue([255, 255, 255]);
      spyOn(bpcaService, 'sRGBtoY').and.returnValue(1.0);
      spyOn(bpcaService, 'bridgeRatio').and.returnValue('4.5');

      const result = service.calcRawBpcaContrast('#000000', '#ffffff');

      expect(bpcaService.calcBPCA).toHaveBeenCalled();
      expect(bpcaService.bridgeRatio).toHaveBeenCalled();
      expect(result).toBe(4.5);
    });

    it('should handle grayscale colors', () => {
      const result = service.calcRawBpcaContrast('#333333', '#cccccc');
      expect(result).not.toBeNaN();
      expect(result).toBeGreaterThan(1);
    });

    it('should return consistent results for same inputs', () => {
      const result1 = service.calcRawBpcaContrast('#ff5733', '#e0e0e0');
      const result2 = service.calcRawBpcaContrast('#ff5733', '#e0e0e0');
      expect(result1).toBe(result2);
    });
  });

  describe('Integration Tests', () => {
    it('should produce different results for APCA vs BPCA', () => {
      const apcaResult = service.getContrast('#000000', '#ffffff', 'apca');
      const bpcaResult = service.getContrast('#000000', '#ffffff', 'bpca');

      expect(apcaResult).not.toBeNull();
      expect(bpcaResult).not.toBeNull();
      expect(apcaResult).not.toBe(bpcaResult);
    });

    it('should handle various color combinations', () => {
      const testPairs = [
        ['#000000', '#ffffff'],
        ['#ff0000', '#ffffff'],
        ['#0000ff', '#ffffff'],
        ['#00ff00', '#000000'],
        ['#ff5733', '#e0e0e0'],
      ];

      testPairs.forEach((pair) => {
        const apcaResult = service.getContrast(pair[0], pair[1], 'apca');
        const bpcaResult = service.getContrast(pair[0], pair[1], 'bpca');
        expect(apcaResult).not.toBeNull();
        expect(bpcaResult).not.toBeNull();
      });
    });

    it('should maintain polarity in APCA scores', () => {
      const darkOnLight = service.calcRawApcaContrast('#000000', '#ffffff');
      const lightOnDark = service.calcRawApcaContrast('#ffffff', '#000000');

      expect(darkOnLight).toBeGreaterThan(0);
      expect(lightOnDark).toBeLessThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very low contrast pairs', () => {
      const result = service.getContrast('#808080', '#858585', 'apca');
      expect(result).not.toBeNull();
    });

    it('should handle pure colors', () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

      colors.forEach((color) => {
        const result = service.getContrast(color, '#ffffff', 'apca');
        expect(result).not.toBeNull();
      });
    });

    it('should handle pastel colors', () => {
      const result = service.getContrast('#ffb6c1', '#ffd700', 'apca');
      expect(result).not.toBeNull();
    });
  });
});
