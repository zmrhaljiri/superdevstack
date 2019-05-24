// Example of the root JS file

// Import utilities
import { init, render } from 'utilities'

// Import Vanilla JS components
import Anchor from 'components/Anchor'

// Import React components
import App from 'react-components/App'

// Init Vanilla JS components
init.multiple(Anchor, document.querySelectorAll('.js-anchor'))

// Render React components
render.single(App, document.getElementById('app'))
