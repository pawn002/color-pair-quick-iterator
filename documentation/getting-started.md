# Getting Started

This guide will help you set up the Color Pair Quick Iterator development environment and get your first development session running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** - Version 18.x or higher (LTS recommended)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** - Version 9.x or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** - Latest version
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Recommended Tools

- **Visual Studio Code** - Recommended IDE with excellent Angular support
  - Download from: https://code.visualstudio.com/
  - Recommended extensions:
    - Angular Language Service
    - Prettier - Code formatter
    - ESLint
    - EditorConfig for VS Code

- **Google Chrome** - Required for running tests with Karma
  - Download from: https://www.google.com/chrome/

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pawn002/color-pair-quick-iterator.git
cd color-pair-quick-iterator
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Angular 20 framework
- Color manipulation libraries (colorjs.io)
- Contrast calculation libraries (apca-w3, bridge-pca)
- Development tools (Storybook, Karma, Jasmine)

**Note**: Installation may take 2-5 minutes depending on your internet connection.

### 3. Verify Installation

Verify that everything is installed correctly:

```bash
npm run build
```

If the build completes successfully, your environment is ready!

## Running the Development Server

### Start the Application

```bash
npm start
```

This runs `ng serve` and starts the development server. You should see output similar to:

```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

Open your browser and navigate to:
- **Local**: http://localhost:4200/

The application will automatically reload when you make changes to source files.

### Development Server Options

```bash
# Start with a specific port
ng serve --port 4201

# Start and open browser automatically
ng serve --open

# Start with production configuration
ng serve --configuration production
```

## Running Storybook

Storybook provides an isolated environment for developing and testing components.

```bash
npm run storybook
```

This will start Storybook on port 6006:
- **Storybook URL**: http://localhost:6006/

Storybook includes:
- Interactive component documentation
- Visual component testing
- API documentation via Compodoc integration
- Example stories for all components

## Project Structure Overview

Here's a quick overview of the key directories:

```
color-pair-quick-iterator/
├── src/
│   ├── app/
│   │   ├── _components/       # UI components (7 standalone components)
│   │   ├── services/          # Core business logic (3 services)
│   │   ├── app.ts             # Root application component
│   │   └── app.config.ts      # Application configuration
│   ├── stories/               # Storybook demo components
│   ├── main.ts                # Application bootstrap
│   └── styles.scss            # Global styles
├── documentation/             # Developer documentation (you are here)
├── public/                    # Static assets
├── .storybook/                # Storybook configuration
├── angular.json               # Angular CLI configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Your First Code Changes

### 1. Explore the Application

1. Start the dev server: `npm start`
2. Open http://localhost:4200/
3. Interact with the color pickers and sliders
4. Notice how contrast scores update in real-time
5. Try the "Swap Colors" and "Match Chromas" buttons

### 2. Make a Simple Change

Let's make a small change to see the hot-reload in action:

1. Open `src/app/app.html`
2. Find the `<h1>` tag near the top
3. Change the title text (e.g., add " - Dev Mode")
4. Save the file
5. Watch the browser automatically reload with your changes

### 3. Explore a Component

1. Open `src/app/_components/color-picker/color-picker.component.ts`
2. Review the component structure:
   - Signal-based inputs using `input()`
   - Two-way binding with `model()`
   - Output events using `output()`
3. Open the corresponding `color-picker.html` template
4. Notice the use of `@if` for conditional rendering

### 4. Explore a Service

1. Open `src/app/services/color-util.service.ts`
2. Review the `parseColor()` method - core color parsing logic
3. Explore `getRandomColorPair()` - generates accessible random colors
4. Notice the use of `inject()` for dependency injection

## Common Development Tasks

### Building for Production

```bash
npm run build
```

Output will be in the `docs/` directory (configured for GitHub Pages deployment).

### Running Tests

```bash
npm test
```

This launches the Karma test runner with Chrome browser.

**Test Coverage**: The project has 324 passing tests (100% pass rate). See [Testing Guide](./testing.md) for details.

### Formatting Code

The project uses Prettier for code formatting. Configuration is in `package.json`:
- 100 character line width
- Single quotes
- Angular HTML parser for templates

Most IDEs can be configured to format on save using the Prettier configuration.

### Linting

```bash
ng lint
```

**Note**: ESLint is not currently configured. TypeScript strict mode provides compile-time validation.

## Understanding the Color Science

The application works with colors in the **OKLCH color space**, which is perceptually uniform:

- **L** (Lightness): 0 to 1 (0 = black, 1 = white)
- **C** (Chroma): 0 to ~0.4 (0 = gray, higher = more saturated)
- **H** (Hue): 0 to 360 degrees (0/360 = red, 120 = green, 240 = blue)

### Contrast Algorithms

1. **APCA (Accessible Perceptual Contrast Algorithm)**
   - Modern contrast algorithm
   - Perceptually accurate
   - Polarity-aware (light-on-dark vs dark-on-light)
   - Scores range from approximately -108 to +108

2. **Bridge-PCA**
   - Converts APCA scores to WCAG 2.x ratios
   - Provides backward compatibility
   - Format: "4.5 to 1" ratios

## Next Steps

Now that you have the development environment running:

1. Read [Architecture](./architecture.md) to understand the system design
2. Review [Services](./services.md) for core business logic details
3. Explore [Components](./components.md) for UI component documentation
4. Check [Contributing](./contributing.md) before making changes
5. Review [CLAUDE.md](../CLAUDE.md) for AI-assisted development guidance
6. See [best-practices.md](../best-practices.md) for coding conventions

## Troubleshooting

### Common Issues

**Issue**: `npm install` fails with permission errors
- **Solution**: Never use `sudo npm install`. Fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

**Issue**: Port 4200 is already in use
- **Solution**: Stop the other process or use a different port: `ng serve --port 4201`

**Issue**: Browser shows blank page
- **Solution**: Check the browser console for errors. Ensure `npm install` completed successfully.

**Issue**: Changes not reflecting in browser
- **Solution**: Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

**Issue**: TypeScript errors in IDE
- **Solution**: Restart the TypeScript language server or reload your IDE

### Getting Help

- Check the [Architecture](./architecture.md) documentation
- Review existing code in `src/app/` for examples
- Consult [Angular documentation](https://angular.dev/)
- Open an issue on GitHub for bugs or questions

## Development Workflow Tips

1. **Use Storybook for Component Development**
   - Develop components in isolation
   - Test different component states
   - Faster than full app reload

2. **Leverage Angular DevTools**
   - Install Angular DevTools browser extension
   - Inspect component tree
   - View signal values in real-time
   - Profile performance

3. **Use TypeScript Strictly**
   - Let the compiler catch errors
   - Hover over functions to see types
   - Use "Go to Definition" (F12) frequently

4. **Read the Existing Code**
   - The codebase follows consistent patterns
   - Learn from existing components
   - Ask "how is this done elsewhere?"

Happy coding!
