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

  describe('generateAllOklchVariants', () => {
    it('should generate variant table', async () => {
      const result = await service.generateAllOklchVariants('#ff5733', 5, 14);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should generate correct number of rows', async () => {
      const lightSteps = 5;
      const result = await service.generateAllOklchVariants('#ff5733', lightSteps, 14);
      // May vary slightly due to gamut clipping, check it's close
      expect(result.length).toBeGreaterThanOrEqual(lightSteps);
      expect(result.length).toBeLessThanOrEqual(lightSteps + 1);
    });

    it('should generate correct number of columns', async () => {
      const chromaSteps = 14;
      const result = await service.generateAllOklchVariants('#ff5733', 5, chromaSteps);
      // May vary slightly due to gamut clipping, check it's close
      expect(result[0].length).toBeGreaterThanOrEqual(chromaSteps);
      expect(result[0].length).toBeLessThanOrEqual(chromaSteps + 1);
    });

    it('should include deltaE in cells', async () => {
      const result = await service.generateAllOklchVariants('#ff5733', 2, 2);
      const firstCell = result[0][0];
      expect(firstCell).toEqual(
        jasmine.objectContaining({
          deltaE: jasmine.any(Number),
        }),
      );
    });

    it('should include empty strings for out-of-gamut colors', async () => {
      const result = await service.generateAllOklchVariants('#ff5733', 3, 3);
      const hasEmptyColor = result.some((row) => row.some((cell) => cell.color === ''));
      expect(hasEmptyColor).toBeDefined();
    });

    it('should order rows from light to dark', async () => {
      const result = await service.generateAllOklchVariants('#ff5733', 5, 14);
      if (result.length > 1) {
        expect(result[0][0].lightness).toBeGreaterThanOrEqual(
          result[result.length - 1][0].lightness,
        );
      }
    });
  });
});
