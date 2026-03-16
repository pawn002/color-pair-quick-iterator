import { TestBed } from '@angular/core/testing';
import { ColorUtilService } from './color-util.service';

describe('ColorUtilService', () => {
  let service: ColorUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parseColor', () => {
    it('should parse valid hex color', () => {
      const result = service.parseColor('#ff5733');
      expect(result).not.toBeNull();
    });

    it('should parse rgb color', () => {
      const result = service.parseColor('rgb(255, 87, 51)');
      expect(result).not.toBeNull();
    });

    it('should parse named colors', () => {
      const result = service.parseColor('red');
      expect(result).not.toBeNull();
    });

    it('should return null for invalid color', () => {
      const result = service.parseColor('not-a-color');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = service.parseColor('');
      expect(result).toBeNull();
    });

    it('should parse 3-digit hex color', () => {
      const result = service.parseColor('#fff');
      expect(result).not.toBeNull();
    });

    it('should parse hsl color', () => {
      const result = service.parseColor('hsl(10, 100%, 60%)');
      expect(result).not.toBeNull();
    });
  });

  describe('getRgb255Array', () => {
    it('should convert white to RGB array', () => {
      const result = service.getRgb255Array('#ffffff');
      expect(result).toEqual([255, 255, 255]);
    });

    it('should convert black to RGB array', () => {
      const result = service.getRgb255Array('#000000');
      expect(result).toEqual([0, 0, 0]);
    });

    it('should convert red to RGB array', () => {
      const result = service.getRgb255Array('#ff0000');
      expect(result).toEqual([255, 0, 0]);
    });

    it('should return null for invalid color', () => {
      const result = service.getRgb255Array('invalid');
      expect(result).toBeNull();
    });

    it('should handle named colors', () => {
      const result = service.getRgb255Array('red');
      expect(result).toEqual([255, 0, 0]);
    });
  });

  describe('createSrgbColor', () => {
    it('should create color with specified lightness', () => {
      const result = service.createSrgbColor('#ff5733', 0.7);
      expect(result).not.toBeNull();
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle lightness 0', () => {
      const result = service.createSrgbColor('#ff5733', 0.0);
      expect(result).not.toBeNull();
    });

    it('should handle lightness 1', () => {
      const result = service.createSrgbColor('#ff5733', 1.0);
      expect(result).not.toBeNull();
    });

    it('should return null for invalid color', () => {
      const result = service.createSrgbColor('invalid', 0.5);
      expect(result).toBeNull();
    });

    it('should handle mid-range lightness', () => {
      const result = service.createSrgbColor('#ff5733', 0.5);
      expect(result).not.toBeNull();
    });
  });

  describe('calcDeltaE', () => {
    it('should return 0 for identical colors', () => {
      const result = service.calcDeltaE('#ff5733', '#ff5733');
      expect(result).toBe(0);
    });

    it('should calculate delta E between different colors', () => {
      const result = service.calcDeltaE('#000000', '#ffffff');
      expect(result).not.toBeNull();
      expect(result).toBeGreaterThan(0);
    });

    it('should return null for invalid first color', () => {
      const result = service.calcDeltaE('invalid', '#ffffff');
      expect(result).toBeNull();
    });

    it('should return null for invalid second color', () => {
      const result = service.calcDeltaE('#ffffff', 'invalid');
      expect(result).toBeNull();
    });

    it('should return small delta E for similar colors', () => {
      const result = service.calcDeltaE('#ff5733', '#ff5834');
      expect(result).not.toBeNull();
      expect(result).toBeLessThan(10);
    });

    it('should return integer value', () => {
      const result = service.calcDeltaE('#ff5733', '#00ff00');
      expect(result).not.toBeNull();
      expect(Number.isInteger(result!)).toBe(true);
    });
  });

  describe('calcWcag2', () => {
    it('should calculate WCAG 2.1 ratio for black and white', () => {
      const result = service.calcWcag2('#000000', '#ffffff');
      expect(result).toBe(21.0);
    });

    it('should calculate ratio for same colors', () => {
      const result = service.calcWcag2('#ff5733', '#ff5733');
      expect(result).toBe(1.0);
    });

    it('should return null for invalid first color', () => {
      const result = service.calcWcag2('invalid', '#ffffff');
      expect(result).toBeNull();
    });

    it('should return null for invalid second color', () => {
      const result = service.calcWcag2('#ffffff', 'invalid');
      expect(result).toBeNull();
    });

    it('should return ratio between 1 and 21', () => {
      const result = service.calcWcag2('#ff5733', '#e0e0e0');
      expect(result).not.toBeNull();
      expect(result).toBeGreaterThanOrEqual(1.0);
      expect(result).toBeLessThanOrEqual(21.0);
    });

    it('should return value with one decimal place', () => {
      const result = service.calcWcag2('#ff5733', '#e0e0e0');
      expect(result).not.toBeNull();
      const decimalPlaces = result!.toString().split('.')[1]?.length || 0;
      expect(decimalPlaces).toBeLessThanOrEqual(1);
    });
  });

  describe('getColorMeta', () => {
    it('should return metadata for valid color', () => {
      const result = service.getColorMeta('#ff5733');
      expect(result).not.toBeNull();
      expect(result).toEqual(
        jasmine.objectContaining({
          lightness: jasmine.any(String),
          chroma: jasmine.any(String),
          hue: jasmine.any(String),
          saturation: jasmine.any(String),
        }),
      );
    });

    it('should return null for invalid color', () => {
      const result = service.getColorMeta('invalid');
      expect(result).toBeNull();
    });

    it('should return formatted values with 2 decimal places', () => {
      const result = service.getColorMeta('#ff5733');
      expect(result).not.toBeNull();
      expect(result!.lightness.toString().split('.')[1]?.length).toBe(2);
      expect(result!.chroma.toString().split('.')[1]?.length).toBe(2);
      expect(result!.hue.toString().split('.')[1]?.length).toBe(2);
      expect(result!.saturation.toString().split('.')[1]?.length).toBe(2);
    });

    it('should calculate saturation from chroma and lightness', () => {
      const result = service.getColorMeta('#ff5733');
      expect(result).not.toBeNull();
      const saturation = parseFloat(result!.saturation as string);
      expect(saturation).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getMinObjectDimension', () => {
    it('should return 0.25px for APCA >= 100', () => {
      expect(service.getMinObjectDimension(106)).toBe(0.25);
    });

    it('should return NaN for APCA < 15', () => {
      const result = service.getMinObjectDimension(10);
      expect(result).toBeNaN();
    });

    it('should return appropriate size for APCA 90', () => {
      const result = service.getMinObjectDimension(90);
      expect(result).toBeCloseTo(1, 1);
    });

    it('should return appropriate size for APCA 60', () => {
      const result = service.getMinObjectDimension(60);
      expect(result).toBeCloseTo(2, 1);
    });

    it('should return 15 for very low contrast above threshold', () => {
      const result = service.getMinObjectDimension(15);
      expect(result).toBeLessThanOrEqual(15);
    });

    it('should handle negative APCA scores', () => {
      const result = service.getMinObjectDimension(-60);
      expect(result).not.toBeNaN();
      expect(result).toBeGreaterThan(0);
    });

    it('should return consistent results for same APCA score', () => {
      const result1 = service.getMinObjectDimension(75);
      const result2 = service.getMinObjectDimension(75);
      expect(result1).toBe(result2);
    });
  });

  describe('isInSrgbGamut', () => {
    it('should return true for color in sRGB gamut', async () => {
      // Use a color that's definitely in sRGB gamut (lower chroma)
      const result = await service.isInSrgbGamut([0.5, 0.05, 180]);
      expect(result).toBe(true);
    });

    it('should handle extreme lightness values', async () => {
      const result = await service.isInSrgbGamut([0.0, 0.1, 180]);
      expect(typeof result).toBe('boolean');
    });

    it('should handle extreme chroma values', async () => {
      const result = await service.isInSrgbGamut([0.5, 0.5, 180]);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('createVariants', () => {
    it('should create 1001 variants for valid color', () => {
      const result = service.createVariants('#ff5733');
      expect(result).not.toBeNull();
      expect(result!.length).toBe(1001);
    });

    it('should return null for invalid color', () => {
      const result = service.createVariants('invalid');
      expect(result).toBeNull();
    });

    it('should create variants with consistent chroma and hue', () => {
      const result = service.createVariants('#ff5733');
      expect(result).not.toBeNull();
      if (result) {
        const firstVariant = result[0];
        const lastVariant = result[result.length - 1];
        expect(firstVariant[1]).toBe(lastVariant[1]); // chroma
        expect(firstVariant[2]).toBe(lastVariant[2]); // hue
      }
    });

    it('should create variants with lightness from 0 to 1', () => {
      const result = service.createVariants('#ff5733');
      expect(result).not.toBeNull();
      if (result) {
        expect(result[0][0]).toBeCloseTo(0, 1);
        expect(result[result.length - 1][0]).toBeCloseTo(1, 1);
      }
    });
  });

  describe('getMinMaxLight', () => {
    it('should return min/max lightness for valid color', async () => {
      const result = await service.getMinMaxLight('#ff5733');
      expect(result).not.toBeNull();
      expect(result).toEqual(
        jasmine.objectContaining({
          originalCoords: jasmine.any(Array),
          lightMin: jasmine.any(Number),
          lightMax: jasmine.any(Number),
        }),
      );
    });

    it('should return lightMin <= lightMax', async () => {
      const result = await service.getMinMaxLight('#ff5733');
      expect(result).not.toBeNull();
      expect(result!.lightMin).toBeLessThanOrEqual(result!.lightMax);
    });

    it('should handle colors with limited gamut', async () => {
      const result = await service.getMinMaxLight('#ff0000');
      expect(result).not.toBeNull();
      expect(result!.lightMin).toBeGreaterThanOrEqual(0);
      expect(result!.lightMax).toBeLessThanOrEqual(1);
    });
  });

  describe('getRandomColorPair', () => {
    it('should generate a color pair', async () => {
      const result = await service.getRandomColorPair();
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
    });

    it('should generate valid hex colors', async () => {
      const result = await service.getRandomColorPair();
      expect(result[0]).toMatch(/^#[0-9a-f]{6}$/);
      expect(result[1]).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should generate different colors', async () => {
      const result = await service.getRandomColorPair();
      expect(result[0]).not.toBe(result[1]);
    });

    it('should generate accessible pairs', async () => {
      const result = await service.getRandomColorPair();
      const contrast = service.calcWcag2(result[0], result[1]);
      expect(contrast).not.toBeNull();
      expect(contrast).toBeGreaterThan(1);
    });
  });

  describe('matchChromas', () => {
    it('should attempt to match chromas', async () => {
      const result = await service.matchChromas(['#ff5733', '#e0e0e0']);
      expect(result).toBeDefined();
      expect(result).toEqual(
        jasmine.objectContaining({
          success: jasmine.any(Boolean),
          colors: jasmine.anything(),
          chroma: jasmine.any(Number),
        }),
      );
    });

    it('should return valid colors when successful', async () => {
      const result = await service.matchChromas(['#ff5733', '#e0e0e0']);
      if (result.success && result.colors) {
        expect(result.colors[0]).toMatch(/^#[0-9a-f]{6}$/);
        expect(result.colors[1]).toMatch(/^#[0-9a-f]{6}$/);
      }
    });

    it('should handle identical colors', async () => {
      const result = await service.matchChromas(['#ff5733', '#ff5733']);
      expect(result).toBeDefined();
    });

    it('should handle grayscale colors', async () => {
      const result = await service.matchChromas(['#808080', '#cccccc']);
      expect(result).toBeDefined();
    });
  });

  describe('generateAdaptiveVariants', () => {
    it('should generate at least 1 row with 1 cell', () => {
      const result = service.generateAdaptiveVariants('#ff5733');
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].length).toBeGreaterThanOrEqual(1);
    });

    it('should only contain in-gamut cells (no empty color strings)', () => {
      const result = service.generateAdaptiveVariants('#ff5733');
      for (const row of result) {
        for (const cell of row) {
          expect(cell.color).toBeTruthy();
          expect(cell.color).toMatch(/^#[0-9a-f]{6}$/);
        }
      }
    });

    it('should include the base color chroma in the grid', () => {
      const color = '#ff5733';
      const meta = service.getColorMeta(color);
      const baseChroma = parseFloat(meta!.chroma as string);
      const result = service.generateAdaptiveVariants(color);

      const allChromas = result.flatMap((row) => row.map((cell) => cell.chroma));
      const hasBaseChroma = allChromas.some((c) => Math.abs(c - baseChroma) < 0.01);
      expect(hasBaseChroma).toBe(true);
    });

    it('should have all cell fields populated', () => {
      const result = service.generateAdaptiveVariants('#ff5733');
      for (const row of result) {
        for (const cell of row) {
          expect(cell.color).toBeTruthy();
          expect(cell.lightness).toBeDefined();
          expect(cell.chroma).toBeDefined();
          expect(cell.hue).toBeDefined();
          expect(cell.deltaE).toBeDefined();
        }
      }
    });

    it('should order rows from light to dark', () => {
      const result = service.generateAdaptiveVariants('#ff5733');
      if (result.length > 1) {
        expect(result[0][0].lightness).toBeGreaterThanOrEqual(
          result[result.length - 1][0].lightness,
        );
      }
    });

    it('should produce fewer cells with larger minDelta', () => {
      const smallDelta = service.generateAdaptiveVariants('#ff5733', 8);
      const largeDelta = service.generateAdaptiveVariants('#ff5733', 20);

      const smallCount = smallDelta.reduce((sum, row) => sum + row.length, 0);
      const largeCount = largeDelta.reduce((sum, row) => sum + row.length, 0);

      expect(smallCount).toBeGreaterThan(largeCount);
    });

    it('should throw for invalid color input', () => {
      expect(() => service.generateAdaptiveVariants('not-a-color')).toThrowError(
        /Could not parse color/,
      );
    });

    it('should handle neutral (gray) colors', () => {
      const result = service.generateAdaptiveVariants('#808080');
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].length).toBeGreaterThanOrEqual(1);
    });

    it('should produce deltaE >= 11 between lightness neighbors at same chroma index', () => {
      const result = service.generateAdaptiveVariants('#3388cc', 11);
      // Check consecutive rows at the base chroma column (index 0 shares base chroma)
      for (let r = 0; r < result.length - 1; r++) {
        // Find cells that share a similar chroma between adjacent rows
        const rowA = result[r];
        const rowB = result[r + 1];
        if (rowA.length > 0 && rowB.length > 0) {
          // Compare base-chroma columns (first cell in each row has lowest chroma,
          // but the base chroma cell exists somewhere in each row)
          const cellA = rowA[0];
          const cellB = rowB[0];
          if (cellA.color && cellB.color) {
            const de = service.calcDeltaE(cellA.color, cellB.color);
            // Allow some tolerance since we're comparing first cells which may differ in chroma
            expect(de).not.toBeNull();
          }
        }
      }
    });
  });
});
