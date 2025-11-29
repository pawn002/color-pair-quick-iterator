# Contributing Guidelines

Thank you for your interest in contributing to Color Pair Quick Iterator! This document provides guidelines and best practices for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Angular 20 Conventions](#angular-20-conventions)
6. [TypeScript Best Practices](#typescript-best-practices)
7. [Component Development](#component-development)
8. [Service Development](#service-development)
9. [Testing Requirements](#testing-requirements)
10. [Documentation](#documentation)
11. [Pull Request Process](#pull-request-process)
12. [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project and community
- Show empathy towards other contributors

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. Read the [Getting Started](./getting-started.md) guide
2. Set up your development environment
3. Reviewed the [Architecture](./architecture.md) documentation
4. Familiarized yourself with [Services](./services.md) and [Components](./components.md)
5. Read [CLAUDE.md](../CLAUDE.md) and [best-practices.md](../best-practices.md)

### Finding Something to Work On

- Check the GitHub Issues for open tasks
- Look for issues labeled `good-first-issue` or `help-wanted`
- Propose new features by opening an issue first
- Fix bugs or improve documentation

---

## Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/color-pair-quick-iterator.git
cd color-pair-quick-iterator

# Add upstream remote
git remote add upstream https://github.com/pawn002/color-pair-quick-iterator.git
```

### 2. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or for bugs
git checkout -b fix/bug-description
```

### 3. Make Changes

- Write code following the [Coding Standards](#coding-standards)
- Test your changes locally
- Run the development server: `npm start`
- Run Storybook: `npm run storybook`
- Ensure build succeeds: `npm run build`

### 4. Commit Your Changes

```bash
# Add files
git add .

# Commit with descriptive message
git commit -m "feat: add color palette export feature"
```

See [Commit Message Guidelines](#commit-message-guidelines) for format.

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## Coding Standards

### General Principles

1. **Clarity over Cleverness**: Write code that is easy to understand
2. **Consistency**: Follow existing patterns in the codebase
3. **Simplicity**: Avoid over-engineering; solve the problem at hand
4. **Comments**: Explain "why," not "what" (code should be self-documenting)
5. **DRY**: Don't repeat yourself, but don't over-abstract

### File Naming

- **Components**: `component-name.component.ts`, `component-name.html`, `component-name.scss`
- **Services**: `service-name.service.ts`
- **Types/Interfaces**: Export from the file where they're primarily used
- **Directories**: Use kebab-case (e.g., `color-picker/`)

### Code Organization

```typescript
// 1. Imports (external first, then internal)
import { Component, signal, computed } from '@angular/core';
import { MyService } from '../services/my.service';

// 2. Types/Interfaces
export interface MyData {
  value: string;
}

// 3. Component/Service decorator
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html',
  styleUrl: './my-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

// 4. Class
export class MyComponent {
  // 4a. Dependencies (inject)
  private myService = inject(MyService);

  // 4b. Inputs
  myInput = input.required<string>();

  // 4c. Outputs
  myOutput = output<string>();

  // 4d. State signals
  myState = signal<string>('');

  // 4e. Computed signals
  myComputed = computed(() => this.process(this.myInput()));

  // 4f. Constructor
  constructor() {
    // Effects only
  }

  // 4g. Lifecycle hooks
  ngOnInit() {}

  // 4h. Public methods
  publicMethod() {}

  // 4i. Private methods
  private privateMethod() {}
}
```

### Formatting

The project uses Prettier for consistent formatting:

- **Line width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: ES5

Prettier runs automatically via IDE integration. Configuration in `package.json`:

```json
{
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  }
}
```

---

## Angular 20 Conventions

This project uses modern Angular 20 patterns. **These conventions are mandatory.**

### 1. Standalone Components

All components are standalone (no NgModules):

```typescript
// Good - Default in Angular 20
@Component({
  selector: 'app-my-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-component.html'
})
export class MyComponent {}

// Don't add standalone: true (it's the default)
```

### 2. Signals for State

Use signals, not properties:

```typescript
// Good
uiColor = signal<string>('#000000');
updateColor(newColor: string) {
  this.uiColor.set(newColor);
}

// Avoid
uiColor: string = '#000000';
updateColor(newColor: string) {
  this.uiColor = newColor;
}
```

### 3. Computed for Derived State

Use `computed()` instead of getters:

```typescript
// Good
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

// Avoid
get fullName() {
  return `${this.firstName()} ${this.lastName()}`;
}
```

### 4. Input/Output Functions

Use `input()` and `output()` functions:

```typescript
// Good
myInput = input.required<string>();
myOutput = output<string>();

// Avoid
@Input() myInput!: string;
@Output() myOutput = new EventEmitter<string>();
```

### 5. Model for Two-Way Binding

Use `model()` for two-way binding:

```typescript
// Good
selectedColor = model<string>('#000000');

// Avoid
@Input() selectedColor!: string;
@Output() selectedColorChange = new EventEmitter<string>();
```

### 6. Native Control Flow

Use `@if`, `@for`, `@switch`:

```html
<!-- Good -->
@if (isVisible()) {
  <div>Content</div>
}

@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Avoid -->
<div *ngIf="isVisible()">Content</div>
<div *ngFor="let item of items()">{{ item.name }}</div>
```

### 7. Inject Function

Use `inject()` instead of constructor injection:

```typescript
// Good
export class MyComponent {
  private myService = inject(MyService);
}

// Avoid
export class MyComponent {
  constructor(private myService: MyService) {}
}
```

### 8. OnPush Change Detection

Always use OnPush:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {}
```

### 9. Effects for Side Effects

Use `effect()` for reactive side effects:

```typescript
constructor() {
  effect(() => {
    // Runs when signals accessed here change
    console.log('Color changed:', this.color());
  });
}
```

### 10. Host Bindings

Use `host` object in decorator:

```typescript
// Good
@Component({
  host: {
    '(click)': 'handleClick()',
    '[class.active]': 'isActive()'
  }
})

// Avoid
@HostListener('click')
handleClick() {}

@HostBinding('class.active')
get isActive() {}
```

---

## TypeScript Best Practices

### Strict Type Checking

The project uses strict TypeScript. Follow these rules:

#### 1. Avoid `any`

```typescript
// Good
function parseData(data: unknown): ParsedData {
  if (typeof data === 'object' && data !== null) {
    // type guard
  }
}

// Avoid
function parseData(data: any): ParsedData {
  // ...
}
```

#### 2. Prefer Type Inference

```typescript
// Good
const myColor = signal<string>('#000000');  // Type needed
const count = 42;  // Type inferred

// Avoid
const count: number = 42;  // Unnecessary annotation
```

#### 3. Use Interfaces for Objects

```typescript
// Good
export interface ColorData {
  hex: string;
  lightness: number;
  chroma: number;
}

// Avoid
export type ColorData = {
  hex: string;
  lightness: number;
  chroma: number;
};  // Use interface for object shapes
```

#### 4. Prefer Union Types

```typescript
// Good
type ContrastType = 'apca' | 'bpca';

// Avoid
enum ContrastType {
  APCA = 'apca',
  BPCA = 'bpca'
}
```

#### 5. Use Readonly Where Appropriate

```typescript
// Good
export interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}
```

#### 6. Function Return Types

```typescript
// Good - Return type explicit for public methods
public calculateContrast(c1: string, c2: string): number | null {
  return this.service.getContrast(c1, c2);
}

// OK - Return type inferred for private methods
private isValid(color: string) {
  return this.parse(color) !== null;
}
```

---

## Component Development

### Creating a New Component

```bash
# Use Angular CLI
ng generate component _components/my-component --skip-tests
```

This creates:
- `my-component.component.ts`
- `my-component.html`
- `my-component.scss`

Manually create:
- `my-component.stories.ts` (for Storybook)

### Component Template

```typescript
import { Component, signal, computed, input, output, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html',
  styleUrl: './my-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  // Inject dependencies
  private myService = inject(MyService);

  // Inputs
  myInput = input.required<string>();

  // Outputs
  myOutput = output<string>();

  // State
  myState = signal<string>('');

  // Computed
  myComputed = computed(() => {
    return this.process(this.myInput());
  });

  // Constructor (effects only)
  constructor() {
    effect(() => {
      // React to signal changes
    });
  }

  // Methods
  handleClick(): void {
    this.myOutput.emit(this.myState());
  }
}
```

### Component Checklist

- [ ] Uses signals for state
- [ ] Uses OnPush change detection
- [ ] Uses inject() for dependencies
- [ ] Uses input()/output()/model() for props
- [ ] Uses native control flow in template
- [ ] Has Storybook story
- [ ] Has proper TypeScript types
- [ ] Follows naming conventions
- [ ] Documented in [components.md](./components.md)

---

## Service Development

### Creating a New Service

```bash
ng generate service services/my-service --skip-tests
```

### Service Template

```typescript
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  // Inject dependencies
  private otherService = inject(OtherService);

  // Public methods
  public doSomething(input: string): string | null {
    // Implementation
    return this.process(input);
  }

  // Private methods
  private process(input: string): string | null {
    // Implementation
    return null;
  }
}
```

### Service Guidelines

1. **Single Responsibility**: Each service should have one clear purpose
2. **Singleton**: Use `providedIn: 'root'`
3. **Pure Functions**: Prefer pure functions when possible
4. **Error Handling**: Handle errors gracefully, don't throw unless necessary
5. **Return null**: Return `null` for failures, not `undefined`
6. **Type Safety**: All public methods must have explicit return types

### Service Checklist

- [ ] Single, focused responsibility
- [ ] Uses `providedIn: 'root'`
- [ ] Uses inject() for dependencies
- [ ] All public methods have return types
- [ ] Proper error handling
- [ ] Documented in [services.md](./services.md)

---

## Testing Requirements

### Current Status

The project has comprehensive test coverage with 324 passing tests (100% pass rate). All new code should include tests.

### Testing Standards

**Required Tests**:
- Unit tests for all services
- Component tests for user interactions
- Tests for public methods and edge cases

**See**: [Testing Guide](./testing.md) for detailed testing patterns.

### Running Tests

```bash
npm test
```

---

## Documentation

### Code Documentation

**Services**: Document all public methods with JSDoc:

```typescript
/**
 * Calculates APCA contrast between two colors.
 *
 * @param colorOne - Foreground color (hex string)
 * @param colorTwo - Background color (hex string)
 * @returns APCA score (-108 to +108) or null if calculation fails
 *
 * @example
 * const score = service.calcContrast('#000000', '#ffffff');
 * // Returns: 106
 */
public calcContrast(colorOne: string, colorTwo: string): number | null {
  // ...
}
```

**Components**: Document inputs, outputs, and behavior in component docstrings.

### Project Documentation

When adding new features:

1. Update relevant documentation in `documentation/` directory
2. Update [Components](./components.md) or [Services](./services.md) as needed
3. Add examples to Storybook stories
4. Update [Architecture](./architecture.md) if changing structure

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Build succeeds: `npm run build`
- [ ] Tests pass: `npm test` (when tests exist)
- [ ] Storybook works: `npm run storybook`
- [ ] Documentation updated
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Build succeeds
- [ ] Storybook stories added/updated (if applicable)
```

### Review Process

1. Submit PR with clear description
2. Address reviewer feedback
3. Ensure CI passes (if configured)
4. Maintainer will merge once approved

---

## Commit Message Guidelines

Follow Conventional Commits format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc. (no code change)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Updating build tasks, package manager configs, etc.

### Scope (Optional)

- `component`: Component changes
- `service`: Service changes
- `build`: Build system changes
- `deps`: Dependency updates

### Examples

```bash
feat(component): add color palette export button

fix(service): correct chroma matching algorithm

docs: update contributing guidelines with TypeScript best practices

refactor(component): simplify color picker state management

chore(deps): update Angular to 20.3.4
```

### Subject Rules

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Maximum 72 characters

---

## Questions?

- Check existing documentation in `documentation/`
- Review [CLAUDE.md](../CLAUDE.md) for AI-assisted development
- Open an issue for questions or clarifications
- Contact maintainers

---

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.

By contributing to this project, you agree that:

1. Your contributions will be licensed under the same CC BY-NC-SA 4.0 license
2. You have the right to submit the contributions under this license
3. Your contributions may be used, modified, and distributed non-commercially by others
4. All derivative works must maintain the same license terms
5. You will be credited as a contributor to the project

**Important**: This is **not an open source license**. Commercial use of this project or derivative works is prohibited without explicit written permission from the project owner.

For full license details, see the [LICENSE](../LICENSE) file or visit [creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

Thank you for contributing to Color Pair Quick Iterator! 🎨
