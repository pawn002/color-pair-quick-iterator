// Candor 5 added an `exports` map; the stylesheet is no longer reachable at
// the old `@candor-design/tokens/tokens/...` deep path.
import '@candor-design/tokens/candor-tokens.css';

// The package has a single entry point and `sideEffects: true`, so this one
// import registers all 41 upstream elements — it cannot be narrowed to just the
// ones in use. That is why the app's own primitives are namespaced `cc-*`: any
// element still named `candor-*` here resolves to the upstream definition.
import '@candor-design/web-components';

import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/400-italic.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@fontsource/atkinson-hyperlegible/700-italic.css';
import '@fontsource-variable/roboto-flex';
import '@fontsource-variable/roboto-mono';
import './styles.scss';

import './app/app';
