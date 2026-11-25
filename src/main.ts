// Candor 5 added an `exports` map; the stylesheet is no longer reachable at
// the old `@candor-design/tokens/tokens/...` deep path.
import '@candor-design/tokens/candor-tokens.css';

// The package has a single entry point and `sideEffects: true`, so this one
// import registers all 41 upstream elements — it cannot be narrowed to just the
// ones in use. That is why the app's own primitives are namespaced `cc-*`: any
// element still named `candor-*` here resolves to the upstream definition.
import '@candor-design/web-components';

// Candor's own font loader: Roboto Flex with its optical-size axis, Atkinson
// Hyperlegible Next and Mono, and Noto Sans for `candor-text` captions. The
// faces are dependencies of the tokens package, so a Candor upgrade that swaps a
// typeface swaps it here too — importing Fontsource directly is how 7.0 would
// have left `--font-family-accessible` and `--font-family-mono` on fallbacks.
import '@candor-design/tokens/candor-fonts.css';
import './styles.scss';

import './app/app';
