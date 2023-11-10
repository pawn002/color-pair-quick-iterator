import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteTableComponent } from './palette-table.component';

describe('PaletteTableComponent', () => {
  let component: PaletteTableComponent;
  let fixture: ComponentFixture<PaletteTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaletteTableComponent]
    });
    fixture = TestBed.createComponent(PaletteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
