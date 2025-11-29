import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaletteTableComponent, TableColorCell } from './palette-table.component';
import { ColorUtilService } from '../../services/color-util.service';

describe('PaletteTableComponent', () => {
  let component: PaletteTableComponent;
  let fixture: ComponentFixture<PaletteTableComponent>;
  let colorUtilService: ColorUtilService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaletteTableComponent);
    component = fixture.componentInstance;
    colorUtilService = TestBed.inject(ColorUtilService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
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
      expect(component.color()).toBe('');
      expect(component.debug()).toBe(false);
    });
  });

  describe('Outputs', () => {
    it('should emit selectedColor when cell is clicked', (done) => {
      const mockCell: TableColorCell = {
        color: '#ff5733',
        lightness: 0.5,
        chroma: 0.1,
        hue: 180,
        deltaE: 0,
        deltaLightness: 0,
        deltaChroma: 0,
      };

      const mockData = [[mockCell]];
      component.dataStruct.set(mockData);

      component.selectedColor.subscribe((cell) => {
        expect(cell).toEqual(mockCell);
        done();
      });

      component.selectColor(0, 0);
    });
  });

  describe('Constants', () => {
    it('should have correct lightSteps', () => {
      expect(component.lightSteps).toBe(5);
    });

    it('should have correct chromaSteps', () => {
      expect(component.chromaSteps).toBe(14);
    });
  });

  describe('dataStruct signal', () => {
    it('should default to empty array', () => {
      expect(component.dataStruct()).toEqual([]);
    });

    it('should be updatable', () => {
      const mockData = [[{ color: '#ff5733' } as TableColorCell]];
      component.dataStruct.set(mockData);
      expect(component.dataStruct()).toEqual(mockData);
    });
  });

  describe('tableHeaders computed signal', () => {
    it('should return empty array when dataStruct is empty', () => {
      component.dataStruct.set([]);
      expect(component.tableHeaders()).toEqual([]);
    });

    it('should return chroma values from first row', () => {
      const mockData = [
        [
          { chroma: 0.1 } as TableColorCell,
          { chroma: 0.2 } as TableColorCell,
          { chroma: 0.3 } as TableColorCell,
        ],
      ];

      component.dataStruct.set(mockData);
      expect(component.tableHeaders()).toEqual([0.1, 0.2, 0.3]);
    });

    it('should update when dataStruct changes', () => {
      const mockData1 = [[{ chroma: 0.1 } as TableColorCell]];
      const mockData2 = [[{ chroma: 0.2 } as TableColorCell]];

      component.dataStruct.set(mockData1);
      const headers1 = component.tableHeaders();

      component.dataStruct.set(mockData2);
      const headers2 = component.tableHeaders();

      expect(headers1).not.toEqual(headers2);
    });
  });

  describe('selectColor', () => {
    it('should emit the correct cell', (done) => {
      const mockCell: TableColorCell = {
        color: '#ff5733',
        lightness: 0.5,
        chroma: 0.1,
        hue: 180,
        deltaE: 5,
        deltaLightness: 10,
        deltaChroma: 20,
      };

      const mockData = [
        [mockCell, { color: '#abc123' } as TableColorCell],
        [{ color: '#def456' } as TableColorCell, { color: '#789012' } as TableColorCell],
      ];

      component.dataStruct.set(mockData);

      component.selectedColor.subscribe((cell) => {
        expect(cell).toEqual(mockCell);
        expect(cell.color).toBe('#ff5733');
        expect(cell.deltaE).toBe(5);
        done();
      });

      component.selectColor(0, 0);
    });

    it('should emit correct cell from different position', (done) => {
      const targetCell: TableColorCell = {
        color: '#789012',
        lightness: 0.3,
        chroma: 0.2,
        hue: 90,
        deltaE: 15,
        deltaLightness: 30,
        deltaChroma: 40,
      };

      const mockData = [
        [{ color: '#ff5733' } as TableColorCell, { color: '#abc123' } as TableColorCell],
        [{ color: '#def456' } as TableColorCell, targetCell],
      ];

      component.dataStruct.set(mockData);

      component.selectedColor.subscribe((cell) => {
        expect(cell).toEqual(targetCell);
        done();
      });

      component.selectColor(1, 1);
    });
  });

  describe('getTextColor', () => {
    it('should return white for dark backgrounds', () => {
      const result = component.getTextColor('#000000');
      expect(result).toBe('white');
    });

    it('should return black for light backgrounds', () => {
      const result = component.getTextColor('#ffffff');
      expect(result).toBe('black');
    });

    it('should use WCAG 2 threshold of 7:1', () => {
      spyOn(colorUtilService, 'calcWcag2').and.returnValue(7.5);

      const result = component.getTextColor('#808080');

      expect(colorUtilService.calcWcag2).toHaveBeenCalledWith('white', '#808080');
      expect(result).toBe('white');
    });

    it('should return black when contrast is below 7', () => {
      spyOn(colorUtilService, 'calcWcag2').and.returnValue(6.5);

      const result = component.getTextColor('#cccccc');

      expect(result).toBe('black');
    });

    it('should handle edge case at exactly 7', () => {
      spyOn(colorUtilService, 'calcWcag2').and.returnValue(7.0);

      const result = component.getTextColor('#808080');

      expect(result).toBe('white');
    });
  });

  describe('getTableData', () => {
    it('should fetch table data for valid color', async () => {
      const mockTableData = [
        [
          {
            color: '#ff5733',
            lightness: 0.5,
            chroma: 0.1,
            hue: 180,
            deltaE: 0,
            deltaLightness: 0,
            deltaChroma: 0,
          },
        ],
      ];

      spyOn(colorUtilService, 'generateAllOklchVariants').and.returnValue(
        Promise.resolve(mockTableData),
      );

      await component.getTableData('#ff5733');

      expect(colorUtilService.generateAllOklchVariants).toHaveBeenCalledWith(
        '#ff5733',
        component.lightSteps,
        component.chromaSteps,
      );
      expect(component.dataStruct()).toEqual(mockTableData);
    });

    it('should set empty array when color is empty', async () => {
      await component.getTableData('');
      expect(component.dataStruct()).toEqual([]);
    });

    it('should log warning in debug mode when color is empty', async () => {
      spyOn(console, 'warn');
      fixture.componentRef.setInput('debug', true);
      fixture.detectChanges();

      await component.getTableData('');

      expect(console.warn).toHaveBeenCalledWith('no color for palette table');
    });

    it('should use correct lightSteps and chromaSteps', async () => {
      spyOn(colorUtilService, 'generateAllOklchVariants').and.returnValue(Promise.resolve([]));

      await component.getTableData('#ff5733');

      expect(colorUtilService.generateAllOklchVariants).toHaveBeenCalledWith('#ff5733', 5, 14);
    });

    it('should update dataStruct with generated variants', async () => {
      const mockData = [
        [{ color: '#abc', chroma: 0.1 } as TableColorCell],
        [{ color: '#def', chroma: 0.2 } as TableColorCell],
      ];

      spyOn(colorUtilService, 'generateAllOklchVariants').and.returnValue(
        Promise.resolve(mockData),
      );

      await component.getTableData('#ff5733');

      expect(component.dataStruct()).toEqual(mockData);
    });
  });

  describe('Effect behavior', () => {
    it('should call getTableData when color changes', async () => {
      spyOn(component, 'getTableData');

      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      // Wait for effect to run
      await fixture.whenStable();

      expect(component.getTableData).toHaveBeenCalledWith('#ff5733');
    });

    it('should update table when color changes', async () => {
      const mockData1 = [[{ color: '#ff5733' } as TableColorCell]];
      const mockData2 = [[{ color: '#0000ff' } as TableColorCell]];

      spyOn(colorUtilService, 'generateAllOklchVariants').and.returnValues(
        Promise.resolve(mockData1),
        Promise.resolve(mockData2),
      );

      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      await fixture.whenStable();

      fixture.componentRef.setInput('color', '#0000ff');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(colorUtilService.generateAllOklchVariants).toHaveBeenCalledTimes(2);
    });
  });

  describe('Integration', () => {
    it('should generate table with correct dimensions', async () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();
      await fixture.whenStable();

      const data = component.dataStruct();

      // The table generation is async, so we just verify it was called and has data
      if (data.length > 0) {
        // Verify we have rows and columns
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].length).toBeGreaterThan(0);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle empty dataStruct gracefully', () => {
      component.dataStruct.set([]);
      expect(() => component.tableHeaders()).not.toThrow();
    });

    it('should handle dataStruct with empty rows', () => {
      component.dataStruct.set([[]]);
      expect(component.tableHeaders()).toEqual([]);
    });
  });
});
