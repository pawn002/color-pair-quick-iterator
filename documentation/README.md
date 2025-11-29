# Color Pair Quick Iterator - Documentation

Welcome to the developer documentation for the Color Pair Quick Iterator (CQPI) project.

## Overview

Color Pair Quick Iterator is an Angular 20 application designed for exploring and iterating on accessible color pairs. It uses advanced perceptual color contrast algorithms (APCA and Bridge-PCA) to help designers and developers find color combinations that meet accessibility standards.

**Live Application**: https://pawn002.github.io/color-pair-quick-iterator/

## Documentation Structure

This documentation is organized into the following sections:

### 1. [Getting Started](./getting-started.md)
Quick start guide for new developers including:
- Prerequisites and system requirements
- Installation and setup instructions
- Running the development server
- First steps with the codebase

### 2. [Architecture](./architecture.md)
High-level architecture overview covering:
- Project structure and organization
- Architectural patterns and decisions
- Data flow and state management
- Module and component hierarchy
- URL state management with Location service

### 3. [Services](./services.md)
Detailed documentation for core services:
- ColorUtilService - Color manipulation and utilities
- ColorMetricsService - Contrast calculation
- BpcaService - Bridge-PCA implementation

### 4. [Components](./components.md)
Component library documentation including:
- Component responsibilities and usage
- Input/Output interfaces
- Signal-based state management
- Integration patterns

### 5. [Contributing](./contributing.md)
Guidelines for contributing to the project:
- Code style and conventions
- Angular 20 best practices
- TypeScript standards
- Pull request process

### 6. [Testing](./testing.md)
Testing strategy and guidelines:
- Unit testing with Karma and Jasmine
- Component testing patterns
- Running tests
- Writing new tests

### 7. [Deployment](./deployment.md)
Deployment process and configuration:
- Building for production
- GitHub Pages deployment
- Configuration management
- Troubleshooting

## Quick Reference

### Essential Commands

```bash
npm start              # Development server (ng serve)
npm run build          # Production build
npm test               # Run unit tests with Karma
npm run storybook      # Launch Storybook on port 6006
```

### Key Technologies

- **Angular 20.3.0** - Modern Angular framework with signals and standalone components
- **Angular CLI 20.3.4** - Build tooling and development server
- **TypeScript 5.9.2** - Strict type checking enabled
- **colorjs.io 0.5.2** - Color space conversions and manipulation in OKLCH
- **apca-w3 0.1.9** - APCA contrast calculation algorithm
- **bridge-pca 0.1.6** - WCAG 2.x ratio approximation (partial implementation)
- **d3 7.9.0** - Scale utilities for contrast-to-size mapping
- **lodash-es 4.17.21** - Utility functions (ESM-compatible)
- **Storybook 9.1.10** - Component documentation and visual testing

## Project Goals

1. **Accessibility First**: Help designers create color combinations that meet and exceed WCAG guidelines
2. **Perceptual Accuracy**: Use modern perceptual color contrast algorithms (APCA) for better accessibility assessment
3. **Developer Experience**: Provide intuitive tools for exploring color accessibility
4. **Education**: Help users understand the relationship between color contrast and accessibility
5. **Shareable Results**: URL-based state management allows sharing specific color combinations

## Getting Help

- Check the [Getting Started](./getting-started.md) guide for setup issues
- Review [Architecture](./architecture.md) for understanding the codebase structure
- Consult [CLAUDE.md](../CLAUDE.md) for AI-assisted development guidance
- See [best-practices.md](../best-practices.md) for Angular and TypeScript conventions

## Contributing

We welcome contributions! Please read the [Contributing Guidelines](./contributing.md) before submitting pull requests.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.

This means:
- ✅ You may use, modify, and build upon this work non-commercially
- ✅ You must give appropriate credit to the original author
- ✅ Derivative works must be licensed under the same terms
- ❌ Commercial use is not permitted without explicit permission

See the [LICENSE](../LICENSE) file for full details or visit [creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/).
