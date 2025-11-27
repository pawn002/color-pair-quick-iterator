# Testing Guide

This guide provides comprehensive information about testing strategies, patterns, and best practices for the Color Pair Quick Iterator application.

## Overview

The project uses **Karma** as the test runner with **Jasmine** as the testing framework. All tests run in a Chrome browser environment.

**Current Status**: Testing infrastructure is fully configured, but no test files currently exist. All new code should include appropriate tests.

## Table of Contents

1. [Testing Setup](#testing-setup)
2. [Running Tests](#running-tests)
3. [Testing Strategy](#testing-strategy)
4. [Service Testing](#service-testing)
5. [Component Testing](#component-testing)
6. [Testing with Signals](#testing-with-signals)
7. [Test Patterns](#test-patterns)
8. [Best Practices](#best-practices)
9. [Coverage](#coverage)
10. [Continuous Integration](#continuous-integration)

---

## Testing Setup

### Configuration Files

**karma.conf.js**:
- Test runner configuration
- Chrome browser launcher
- Jasmine framework
- Coverage reporting

**tsconfig.spec.json**:
- TypeScript configuration for tests
- Includes test files (*.spec.ts)

### Dependencies

```json
{
  "karma": "^6.4.0",
  "karma-jasmine": "^5.1.0",
  "karma-chrome-launcher": "^3.2.0",
  "karma-coverage": "^2.2.0",
  "karma-jasmine-html-reporter": "^2.1.0",
  "jasmine-core": "^5.9.0"
}
```

---

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
ng test --watch

# Run tests once (CI mode)
ng test --watch=false

# Run with code coverage
ng test --code-coverage

# Run specific test file
ng test --include='**/color-util.service.spec.ts'
```

### Test Output

Tests run in Chrome and display results in:
1. Terminal output
2. Karma server (http://localhost:9876/)
3. Browser debug output (http://localhost:9876/debug.html)

---

## Testing Strategy

### Test Pyramid

```
       /\
      /  \      E2E Tests (Future)
     /────\     - Full user workflows
    /      \    - Critical paths
   /────────\   Integration Tests (Future)
  /          \  - Component + Service
 /────────────\ Unit Tests (Priority)
/              \ - Services
\______________/ - Components
```

**Current Focus**: Unit tests for services and components

### What to Test

**DO Test**:
- Public service methods
- Component user interactions
- Edge cases and error handling
- Computed signal calculations
- Effects and side effects
- Integration between components and services

**DON'T Test**:
- Private methods (test through public interface)
- Third-party library internals
- Angular framework behavior
- Trivial getters/setters

---

## Service Testing

### Basic Service Test Template

```typescript
import { TestBed } from '@angular/core/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### ColorUtilService Example Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { ColorUtilService } from './color-util.service';

describe('ColorUtilService', () => {
  let service: ColorUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUtilService);
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

    it('should return null for invalid color', () => {
      const result = service.parseColor('not-a-color');
      expect(result).toBeNull();
    });

    it('should handle named colors', () => {
      const result = service.parseColor('red');
      expect(result).not.toBeNull();
    });
  });

  describe('getRgb255Array', () => {
    it('should convert hex to RGB 0-255 array', () => {
      const result = service.getRgb255Array('#ffffff');
      expect(result).toEqual([255, 255, 255]);
    });

    it('should handle black color', () => {
      const result = service.getRgb255Array('#000000');
      expect(result).toEqual([0, 0, 0]);
    });

    it('should return null for invalid color', () => {
      const result = service.getRgb255Array('invalid');
      expect(result).toBeNull();
    });
  });

  describe('createSrgbColor', () => {
    it('should create color with specified lightness', () => {
      const result = service.createSrgbColor('#ff5733', 0.7);
      expect(result).not.toBeNull();
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle edge case lightness values', () => {
      expect(service.createSrgbColor('#ff5733', 0.0)).not.toBeNull();
      expect(service.createSrgbColor('#ff5733', 1.0)).not.toBeNull();
    });
  });

  describe('calcDeltaE', () => {
    it('should calculate delta E between identical colors', () => {
      const result = service.calcDeltaE('#ff5733', '#ff5733');
      expect(result).toBe(0);
    });

    it('should calculate delta E between different colors', () => {
      const result = service.calcDeltaE('#000000', '#ffffff');
      expect(result).toBeGreaterThan(0);
    });

    it('should return null for invalid colors', () => {
      const result = service.calcDeltaE('invalid', '#ffffff');
      expect(result).toBeNull();
    });
  });

  describe('getMinObjectDimension', () => {
    it('should return 0.25px for APCA >= 100', () => {
      expect(service.getMinObjectDimension(106)).toBe(0.25);
    });

    it('should return appropriate size for medium contrast', () => {
      const result = service.getMinObjectDimension(60);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(15);
    });

    it('should return NaN for insufficient contrast', () => {
      const result = service.getMinObjectDimension(10);
      expect(result).toBeNaN();
    });
  });
});
```

### Testing Async Service Methods

```typescript
describe('ColorUtilService - Async Methods', () => {
  let service: ColorUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUtilService);
  });

  it('should generate random color pair', async () => {
    const pair = await service.getRandomColorPair();

    expect(pair).toBeDefined();
    expect(pair.length).toBe(2);
    expect(pair[0]).toMatch(/^#[0-9a-f]{6}$/);
    expect(pair[1]).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('should match chromas successfully', async () => {
    const result = await service.matchChromas(['#ff5733', '#e0e0e0']);

    expect(result.success).toBeDefined();
    if (result.success) {
      expect(result.colors).not.toBeNull();
      expect(result.chroma).not.toBeNaN();
    }
  });

  it('should get min max light', async () => {
    const result = await service.getMinMaxLight('#ff5733');

    expect(result).not.toBeNull();
    expect(result!.lightMin).toBeGreaterThanOrEqual(0);
    expect(result!.lightMax).toBeLessThanOrEqual(1);
    expect(result!.lightMin).toBeLessThanOrEqual(result!.lightMax);
  });
});
```

### Mocking Dependencies

```typescript
describe('ColorMetricsService', () => {
  let service: ColorMetricsService;
  let mockColorUtil: jasmine.SpyObj<ColorUtilService>;
  let mockBpca: jasmine.SpyObj<BpcaService>;

  beforeEach(() => {
    // Create mocks
    mockColorUtil = jasmine.createSpyObj('ColorUtilService', ['getRgb255Array']);
    mockBpca = jasmine.createSpyObj('BpcaService', ['calcBPCA', 'sRGBtoY', 'bridgeRatio']);

    TestBed.configureTestingModule({
      providers: [
        ColorMetricsService,
        { provide: ColorUtilService, useValue: mockColorUtil },
        { provide: BpcaService, useValue: mockBpca }
      ]
    });

    service = TestBed.inject(ColorMetricsService);
  });

  it('should calculate BPCA contrast', () => {
    // Setup mocks
    mockBpca.calcBPCA.and.returnValue(60);
    mockColorUtil.getRgb255Array.and.returnValue([255, 255, 255]);
    mockBpca.sRGBtoY.and.returnValue(1.0);
    mockBpca.bridgeRatio.and.returnValue('4.5');

    // Test
    const result = service.calcRawBpcaContrast('#000000', '#ffffff');

    expect(result).toBe(4.5);
    expect(mockBpca.calcBPCA).toHaveBeenCalled();
  });
});
```

---

## Component Testing

### Basic Component Test Template

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### ColorPickerComponent Example Tests

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept color input', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      expect(component.color()).toBe('#ff5733');
    });

    it('should accept inputId', () => {
      fixture.componentRef.setInput('inputId', 'custom-id');
      fixture.detectChanges();

      expect(component.inputId()).toBe('custom-id');
    });
  });

  describe('Outputs', () => {
    it('should emit selectedColor event', (done) => {
      component.selectedColor.subscribe(event => {
        expect(event.color).toBe('#ff5733');
        expect(event.pickerId).toBe(component.inputId());
        done();
      });

      // Simulate user interaction
      component.handleColorInput('#ff5733');
    });
  });

  describe('Template', () => {
    it('should render color input', () => {
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input[type="color"]');

      expect(input).toBeTruthy();
    });

    it('should bind input value to color signal', () => {
      fixture.componentRef.setInput('color', '#ff5733');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input[type="color"]');
      expect(input.value).toBe('#ff5733');
    });
  });
});
```

### Testing User Interactions

```typescript
describe('ColorSliderComponent - User Interactions', () => {
  let component: ColorSliderComponent;
  let fixture: ComponentFixture<ColorSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSliderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSliderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('color', '#ff5733');
    fixture.detectChanges();
  });

  it('should update value on slider change', () => {
    const slider = fixture.nativeElement.querySelector('input[type="range"]');

    slider.value = '75';
    slider.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe(75);
  });

  it('should emit colorVariant on slider change', (done) => {
    component.colorVariant.subscribe(event => {
      expect(event.sliderId).toBe(component.id());
      expect(event.color).toBeDefined();
      done();
    });

    const slider = fixture.nativeElement.querySelector('input[type="range"]');
    slider.value = '75';
    slider.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });
});
```

---

## Testing with Signals

### Testing Signal State

```typescript
describe('Component with Signals', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update signal value', () => {
    component.mySignal.set('new value');
    expect(component.mySignal()).toBe('new value');
  });

  it('should update signal with update method', () => {
    component.count.set(5);
    component.count.update(val => val + 1);
    expect(component.count()).toBe(6);
  });
});
```

### Testing Computed Signals

```typescript
describe('Computed Signals', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
  });

  it('should compute metadata from color input', () => {
    fixture.componentRef.setInput('colorOne', '#ff5733');
    fixture.detectChanges();

    const meta = component.colorOneMeta();

    expect(meta).not.toBeNull();
    expect(meta!.lightness).toBeDefined();
    expect(meta!.chroma).toBeDefined();
    expect(meta!.hue).toBeDefined();
  });

  it('should recompute when input changes', () => {
    fixture.componentRef.setInput('colorOne', '#ff5733');
    fixture.detectChanges();
    const meta1 = component.colorOneMeta();

    fixture.componentRef.setInput('colorOne', '#0000ff');
    fixture.detectChanges();
    const meta2 = component.colorOneMeta();

    expect(meta2).not.toEqual(meta1);
  });
});
```

### Testing Effects

```typescript
describe('Effects', () => {
  it('should run effect when signal changes', fakeAsync(() => {
    let effectRan = false;

    TestBed.runInInjectionContext(() => {
      const mySignal = signal('initial');

      effect(() => {
        mySignal();  // Track signal
        effectRan = true;
      });

      flush();  // Run effect
      expect(effectRan).toBe(true);

      effectRan = false;
      mySignal.set('updated');
      flush();  // Run effect again
      expect(effectRan).toBe(true);
    });
  }));
});
```

---

## Test Patterns

### AAA Pattern (Arrange, Act, Assert)

```typescript
it('should calculate contrast correctly', () => {
  // Arrange
  const colorOne = '#000000';
  const colorTwo = '#ffffff';
  const service = TestBed.inject(ColorMetricsService);

  // Act
  const result = service.getContrast(colorOne, colorTwo, 'apca');

  // Assert
  expect(result).toBeGreaterThan(100);
});
```

### Testing Edge Cases

```typescript
describe('Edge Cases', () => {
  it('should handle empty string', () => {
    const result = service.parseColor('');
    expect(result).toBeNull();
  });

  it('should handle null input', () => {
    const result = service.parseColor(null as any);
    expect(result).toBeNull();
  });

  it('should handle extreme lightness values', () => {
    expect(service.createSrgbColor('#ff5733', -0.1)).toBeDefined();
    expect(service.createSrgbColor('#ff5733', 1.5)).toBeDefined();
  });

  it('should handle identical colors', () => {
    const result = service.calcDeltaE('#ff5733', '#ff5733');
    expect(result).toBe(0);
  });
});
```

### Testing Error Handling

```typescript
describe('Error Handling', () => {
  it('should handle parsing errors gracefully', () => {
    spyOn(console, 'error');
    const result = service.parseColor('invalid');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it('should not throw on invalid input', () => {
    expect(() => {
      service.getRgb255Array('invalid');
    }).not.toThrow();
  });
});
```

---

## Best Practices

### 1. Test Isolation

Each test should be independent:

```typescript
// Good
beforeEach(() => {
  service = TestBed.inject(MyService);
});

// Avoid
let service: MyService;
service = TestBed.inject(MyService);  // Shared state
```

### 2. Descriptive Test Names

```typescript
// Good
it('should return null when color parsing fails', () => {});
it('should emit selectedColor event with correct picker ID', () => {});

// Avoid
it('test 1', () => {});
it('works', () => {});
```

### 3. One Assertion Per Concept

```typescript
// Good
it('should parse valid hex color', () => {
  const result = service.parseColor('#ff5733');
  expect(result).not.toBeNull();
});

it('should parse rgb color', () => {
  const result = service.parseColor('rgb(255, 87, 51)');
  expect(result).not.toBeNull();
});

// Avoid
it('should parse colors', () => {
  expect(service.parseColor('#ff5733')).not.toBeNull();
  expect(service.parseColor('rgb(255, 87, 51)')).not.toBeNull();
  expect(service.parseColor('hsl(10, 100%, 60%)')).not.toBeNull();
  // Too many concerns in one test
});
```

### 4. Use `beforeEach` Wisely

```typescript
// Good - Setup common to all tests
beforeEach(() => {
  TestBed.configureTestingModule({});
  service = TestBed.inject(MyService);
});

// Avoid - Test-specific setup in beforeEach
beforeEach(() => {
  // This might not be needed for all tests
  specialConfig = setupComplexScenario();
});
```

### 5. Clean Up After Tests

```typescript
afterEach(() => {
  // Clean up subscriptions, timers, etc.
  fixture.destroy();
});
```

---

## Coverage

### Running Coverage

```bash
ng test --code-coverage
```

Coverage reports are generated in `coverage/` directory.

### Viewing Coverage

Open `coverage/index.html` in a browser to see:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### Coverage Goals

- **Services**: 80%+ coverage
- **Components**: 70%+ coverage
- **Critical paths**: 100% coverage

---

## Continuous Integration

### Future CI Setup

When CI is configured, tests should:

1. Run on every push
2. Run on every pull request
3. Block merge if tests fail
4. Generate coverage reports
5. Fail if coverage drops below threshold

### Example GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --watch=false --code-coverage
```

---

## Next Steps

1. Start writing tests for existing code
2. Ensure all new code includes tests
3. Aim for 80% coverage on services
4. Add integration tests
5. Consider E2E tests with Playwright or Cypress

---

## Resources

- [Jasmine Documentation](https://jasmine.github.io/)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Testing Angular Signals](https://angular.dev/guide/signals#testing)
- [Karma Documentation](https://karma-runner.github.io/)

---

## Questions?

- Review [Contributing Guide](./contributing.md) for development workflow
- Check [Services](./services.md) and [Components](./components.md) for API documentation
- Open an issue for testing-related questions
