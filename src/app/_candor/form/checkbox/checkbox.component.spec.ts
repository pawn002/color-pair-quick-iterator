import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    fixture.componentRef.setInput('label', 'My option');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.checkbox-label');
    expect(label.textContent.trim()).toBe('My option');
  });

  it('should reflect the checked input', () => {
    component.checked = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type=checkbox]');
    expect(input.checked).toBeTrue();
  });

  it('should emit changed with true when checked', () => {
    const spy = jasmine.createSpy('changed');
    component.changed.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input[type=checkbox]');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should emit changed with false when unchecked', () => {
    component.checked = true;
    fixture.detectChanges();
    const spy = jasmine.createSpy('changed');
    component.changed.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input[type=checkbox]');
    input.checked = false;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(false);
  });
});
