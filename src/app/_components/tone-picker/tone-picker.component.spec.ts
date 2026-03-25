import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TonePickerComponent, GridRow, GridCell } from './tone-picker.component';

const makeCell = (label: string, l: number, c: number, h: number): GridCell => ({
  label,
  background: label,
  value: { l, c, h },
  disabled: false,
});

const disabledCell = (): GridCell => ({ label: '', disabled: true });

const ROWS: GridRow[] = [
  {
    rowHeader: '0.90',
    cells: [makeCell('oklch(0.90 0.05 180)', 0.9, 0.05, 180), disabledCell()],
  },
  {
    rowHeader: '0.60',
    cells: [makeCell('oklch(0.60 0.05 180)', 0.6, 0.05, 180), makeCell('oklch(0.60 0.15 180)', 0.6, 0.15, 180)],
  },
];

const HEADERS = ['0.05', '0.15'];

describe('TonePickerComponent', () => {
  let component: TonePickerComponent;
  let fixture: ComponentFixture<TonePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TonePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TonePickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('rows', ROWS);
    fixture.componentRef.setInput('columnHeaders', HEADERS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept rows', () => {
      expect(component.rows()).toEqual(ROWS);
    });

    it('should accept columnHeaders', () => {
      expect(component.columnHeaders()).toEqual(HEADERS);
    });

    it('should default size to normal', () => {
      expect(component.size()).toBe('normal');
    });

    it('should accept size small', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.size()).toBe('small');
    });

    it('should default ariaLabel to empty string', () => {
      expect(component.ariaLabel()).toBe('');
    });

    it('should accept selectedValue', () => {
      fixture.componentRef.setInput('selectedValue', 'oklch(0.60 0.050 180.0)');
      fixture.detectChanges();
      expect(component.selectedValue()).toBe('oklch(0.60 0.050 180.0)');
    });
  });

  describe('activate', () => {
    it('should emit colorSelect with oklch string', (done) => {
      component.colorSelect.subscribe((val: string) => {
        expect(val).toMatch(/^oklch\(/);
        done();
      });
      component.activate(1, 0, ROWS[1].cells[0]);
    });

    it('should update selectedRow and selectedCol', () => {
      component.activate(1, 1, ROWS[1].cells[1]);
      expect(component.selectedRow()).toBe(1);
      expect(component.selectedCol()).toBe(1);
    });

    it('should update selectedColor signal', () => {
      component.activate(0, 0, ROWS[0].cells[0]);
      expect(component.selectedColor()).toMatch(/^oklch\(/);
    });
  });

  describe('setsize computed', () => {
    it('should count only non-disabled cells', () => {
      // ROWS has 3 non-disabled cells (row0col0, row1col0, row1col1)
      expect(component.setsize()).toBe(3);
    });
  });

  describe('posinset', () => {
    it('should return position for in-gamut cell', () => {
      const pos = component.posinset(0, 0);
      expect(pos).toBeGreaterThan(0);
    });

    it('should return 0 for disabled cell', () => {
      const pos = component.posinset(0, 1);
      expect(pos).toBe(0);
    });
  });

  describe('keyboard navigation', () => {
    it('should move focus down with ArrowDown', () => {
      component.focusedRow.set(0);
      component.focusedCol.set(0);
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      component.onKeydown(event);
      expect(component.focusedRow()).toBe(1);
    });

    it('should move focus right with ArrowRight', () => {
      component.focusedRow.set(1);
      component.focusedCol.set(0);
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      component.onKeydown(event);
      expect(component.focusedCol()).toBe(1);
    });

    it('should activate cell with Enter key', () => {
      component.focusedRow.set(1);
      component.focusedCol.set(0);
      spyOn(component, 'activate');
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      component.onKeydown(event);
      expect(component.activate).toHaveBeenCalledWith(1, 0, ROWS[1].cells[0]);
    });

    it('should activate cell with Space key', () => {
      component.focusedRow.set(1);
      component.focusedCol.set(1);
      spyOn(component, 'activate');
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      component.onKeydown(event);
      expect(component.activate).toHaveBeenCalledWith(1, 1, ROWS[1].cells[1]);
    });
  });

  describe('selectedValue effect', () => {
    it('should select matching cell when selectedValue changes', async () => {
      fixture.componentRef.setInput('selectedValue', 'oklch(0.60 0.050 180.0)');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.selectedRow()).toBe(1);
      expect(component.selectedCol()).toBe(0);
    });
  });
});
