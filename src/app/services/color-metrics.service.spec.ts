import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ColorMetricsService } from './color-metrics.service';
import { colorUtil } from './color-util.service';
import { BpcaService } from './bpca.service';

describe('ColorMetricsService', () => {
  let service: ColorMetricsService;
  let bpcaService: BpcaService;

  beforeEach(() => {
    service = new ColorMetricsService();
    // BpcaService is constructed internally; reach it to spy on its methods.
    bpcaService = (service as unknown as { bpca: BpcaService }).bpca;
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

    it('should return Delta E when type is deltaE', () => {
      const result = service.getContrast('#000000', '#ffffff', 'deltaE');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    it('should return null when calcDeltaE returns null', () => {
      vi.spyOn(colorUtil, 'calcDeltaE').mockReturnValue(null);
      const result = service.getContrast('#000000', '#ffffff', 'deltaE');
      expect(result).toBeNull();
    });

    it('should return OKCA contrast when type is okca', () => {
      const result = service.getContrast('#000000', '#ffffff', 'okca');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
    });

    // OKCA v2 anchors. The scale is nominally 1–21, but light-on-dark is capped
    // at LOD_CAP = 20.9 so every score sits strictly below the WCAG equivalent.
    // Dark-on-light is uncapped and tops out at 20.0.
    it('should return the OKCA v2 dark-on-light ceiling for black on white', () => {
      expect(service.getContrast('#000000', '#ffffff', 'okca')).toBe(20);
    });

    it('should return the OKCA v2 light-on-dark cap (20.9) for white on black', () => {
      expect(service.getContrast('#ffffff', '#000000', 'okca')).toBe(20.9);
    });

    it('should never exceed the light-on-dark cap of 20.9', () => {
      const pairs: Array<[string, string]> = [
        ['#ffffff', '#000000'],
        ['#ffff00', '#000000'],
        ['#00ffff', '#0a0a0a'],
        ['#000000', '#ffffff'],
      ];

      pairs.forEach(([fg, bg]) => {
        const result = service.getContrast(fg, bg, 'okca');
        expect(result).not.toBeNull();
        expect(result!).toBeLessThanOrEqual(20.9);
      });
    });

    it('should score the WCAG AA boundary grey at the v2 anchor', () => {
      // POL_K recalibration in v2.0.0 moved this anchor from 3.5 to 3.9.
      expect(service.getContrast('#ffffff', '#767676', 'okca')).toBe(3.9);
      expect(service.getContrast('#767676', '#ffffff', 'okca')).toBe(3.7);
    });

    it('should still catch saturated chromatic false passes', () => {
      // WCAG rates hot pink on near-black 6.6:1; OKCA keeps it below AA.
      const result = service.getContrast('#ff69b4', '#1a1a1a', 'okca');
      expect(result).toBe(3.6);
      expect(result!).toBeLessThan(4.5);
    });

    it('should be polarity-aware', () => {
      const lightOnDark = service.getContrast('#ffffff', '#000000', 'okca');
      const darkOnLight = service.getContrast('#000000', '#ffffff', 'okca');
      expect(lightOnDark).not.toBe(darkOnLight);
    });

    it('should return 1 for identical colors with okca', () => {
      const result = service.getContrast('#808080', '#808080', 'okca');
      expect(result).not.toBeNull();
      expect(result!).toBe(1);
    });

    it('should handle colored pairs with okca', () => {
      const result = service.getContrast('#ff5733', '#e0e0e0', 'okca');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
      expect(result!).toBeGreaterThanOrEqual(1);
      expect(result!).toBeLessThanOrEqual(20.9);
    });

    it('should handle named colors with okca', () => {
      const result = service.getContrast('white', 'black', 'okca');
      expect(result).not.toBeNull();
      expect(result!).toBeGreaterThanOrEqual(20);
    });

    it('should return null for invalid colors with okca', () => {
      const result = service.getContrast('not-a-color', '#ffffff', 'okca');
      expect(result).toBeNull();
    });
  });

  describe('OKCA is never more permissive than WCAG', () => {
    // The load-bearing guarantee of the algorithm: OKCA <= WCAG for every sRGB
    // pair. Upstream proves this across the gamut; this spot-checks that the
    // version we ship actually holds it at the app's call site.
    const pairs: Array<[string, string]> = [
      ['#000000', '#ffffff'],
      ['#ffffff', '#000000'],
      ['#ffffff', '#767676'],
      ['#ff69b4', '#1a1a1a'],
      ['#ff5733', '#e0e0e0'],
      ['#333333', '#cccccc'],
      ['#0000ff', '#ffffff'],
      ['#00ff00', '#000000'],
    ];

    pairs.forEach(([fg, bg]) => {
      it(`should score ${fg} on ${bg} at or below WCAG`, () => {
        const okca = service.getContrast(fg, bg, 'okca');
        const wcag = colorUtil.calcWcag2(fg, bg);

        expect(okca).not.toBeNull();
        expect(wcag).not.toBeNull();
        // OKCA rounds to 1dp, so allow the rounding step as tolerance.
        expect(okca!).toBeLessThanOrEqual(wcag! + 0.05);
      });
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

    it('should return NaN when RGB conversion fails', () => {
      vi.spyOn(colorUtil, 'getRgb255Array').mockReturnValue(null);
      const result = service.calcRawBpcaContrast('#000000', '#ffffff');
      expect(result).toBeNaN();
    });

    it('should use BpcaService for calculation', () => {
      vi.spyOn(bpcaService, 'calcBPCA').mockReturnValue(60);
      vi.spyOn(colorUtil, 'getRgb255Array').mockReturnValue([255, 255, 255]);
      vi.spyOn(bpcaService, 'sRGBtoY').mockReturnValue(1.0);
      vi.spyOn(bpcaService, 'bridgeRatio').mockReturnValue('4.5');

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

    it('should produce different results for OKCA vs APCA', () => {
      const okcaResult = service.getContrast('#000000', '#ffffff', 'okca');
      const apcaResult = service.getContrast('#000000', '#ffffff', 'apca');

      expect(okcaResult).not.toBeNull();
      expect(apcaResult).not.toBeNull();
      expect(okcaResult).not.toBe(apcaResult);
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
        expect(service.getContrast(pair[0], pair[1], 'apca')).not.toBeNull();
        expect(service.getContrast(pair[0], pair[1], 'bpca')).not.toBeNull();
        expect(service.getContrast(pair[0], pair[1], 'deltaE')).not.toBeNull();
        expect(service.getContrast(pair[0], pair[1], 'okca')).not.toBeNull();
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
        expect(service.getContrast(color, '#ffffff', 'apca')).not.toBeNull();
        expect(service.getContrast(color, '#ffffff', 'okca')).not.toBeNull();
      });
    });

    it('should handle pastel colors', () => {
      const result = service.getContrast('#ffb6c1', '#ffd700', 'apca');
      expect(result).not.toBeNull();
    });
  });
});
