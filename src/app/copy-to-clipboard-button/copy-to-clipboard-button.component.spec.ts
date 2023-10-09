import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyToClipboardButtonComponent } from './copy-to-clipboard-button.component';

describe('CopyToClipboardButtonComponent', () => {
  let component: CopyToClipboardButtonComponent;
  let fixture: ComponentFixture<CopyToClipboardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyToClipboardButtonComponent]
    });
    fixture = TestBed.createComponent(CopyToClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
