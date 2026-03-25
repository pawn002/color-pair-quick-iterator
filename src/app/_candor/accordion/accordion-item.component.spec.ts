import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: AccordionItemComponent;
  let fixture: ComponentFixture<AccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title in the summary', () => {
    fixture.componentRef.setInput('title', 'My Section');
    fixture.detectChanges();
    const summary = fixture.nativeElement.querySelector('.accordion-item__title');
    expect(summary.textContent.trim()).toBe('My Section');
  });

  it('should be closed by default', () => {
    const details = fixture.nativeElement.querySelector('details');
    expect(details.open).toBeFalse();
  });

  it('should open when open input is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    const details = fixture.nativeElement.querySelector('details');
    expect(details.open).toBeTrue();
  });
});
