import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct variant class', () => {
    fixture.componentRef.setInput('variant', 'elevated');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.classList).toContain('card--elevated');
  });

  it('should apply the correct padding class', () => {
    fixture.componentRef.setInput('padding', 'md');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.classList).toContain('card--padding-md');
  });

  it('should default to default variant and md padding', () => {
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.classList).toContain('card--default');
    expect(card.classList).toContain('card--padding-md');
  });
});
