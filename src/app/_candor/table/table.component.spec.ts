import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
  template: `
    <app-table [compact]="compact">
      <table>
        <tbody>
          <tr><td class="label">Key</td><td class="numeric">Value</td></tr>
        </tbody>
      </table>
    </app-table>
  `,
  imports: [TableComponent],
})
class TestHostComponent {
  compact = false;
}

describe('TableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('app-table');
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should have table-host class on host element', () => {
    expect(host.classList).toContain('table-host');
  });

  it('should not have table-host--compact class by default', () => {
    expect(host.classList).not.toContain('table-host--compact');
  });

  it('should add table-host--compact class when compact is true', () => {
    fixture.componentInstance.compact = true;
    fixture.detectChanges();
    expect(host.classList).toContain('table-host--compact');
  });

  it('should project table content', () => {
    expect(host.querySelector('table')).not.toBeNull();
    expect(host.querySelector('td.label')?.textContent?.trim()).toBe('Key');
    expect(host.querySelector('td.numeric')?.textContent?.trim()).toBe('Value');
  });
});
