import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    fixture.componentRef.setInput('label', 'Option A');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.radio-label');
    expect(label.textContent.trim()).toBe('Option A');
  });

  it('should reflect the checked input', () => {
    component.checked = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type=radio]');
    expect(input.checked).toBeTrue();
  });

  it('should emit changed with the value when selected', () => {
    fixture.componentRef.setInput('value', 'apca');
    fixture.detectChanges();
    const spy = jasmine.createSpy('changed');
    component.changed.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input[type=radio]');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('apca');
  });

  it('should not emit changed when the input is unchecked on change', () => {
    fixture.componentRef.setInput('value', 'apca');
    fixture.detectChanges();
    const spy = jasmine.createSpy('changed');
    component.changed.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input[type=radio]');
    input.checked = false;
    input.dispatchEvent(new Event('change'));
    expect(spy).not.toHaveBeenCalled();
  });
});
