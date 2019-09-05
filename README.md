<div align="center">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
</div>

# SuperDevStack

Web development stack based on [Webpack](https://webpack.js.org/) with [React](https://reactjs.org/) static templating.

Today, JavaScript rules the web. You're creating websites with React, working with server side rendering, using [Gatsby](https://www.gatsbyjs.org/), [Create React App](https://facebook.github.io/create-react-app/), [Next.js](https://nextjs.org/) or other modern stuff. However there are still cases when you might need to create a website without any client-side routing, with generated static HTML templates (that back end developers will take, or for creating a static site). If you don't want to learn or use any templating language and want to work with React, you're at the right place. **SuperDevStack** is a composition of different environments and tools flavoured with ideas and techniques based on a personal experience in the front end development.

Templating languages like [Nunjucks](https://mozilla.github.io/nunjucks/) or [Handlebars](https://handlebarsjs.com/) are very handy tools, however it's another thing you need to learn, get familiar with the syntax, deal with its issues and limitations. If you're familiar with React, you can make use of it as your templating language, meaning **creating static HTML files via React** components with [JSX syntax](https://reactjs.org/docs/introducing-jsx.html) and use advantages it provides. All together with a bunch of **modern tools**.

## The Core Features

- **React templating** (React components -> HTML templates)
- A local server with [Webpack dev server](https://webpack.js.org/configuration/dev-server/)
- [HMR](https://webpack.js.org/concepts/hot-module-replacement/) (Hot Module Replacement)
- [Code splitting](https://webpack.js.org/guides/code-splitting/)
- Transpiling JS with [Babel](https://babeljs.io/)
- Remote debugging with [Browsersync](https://www.browsersync.io/)
- Automatic [polyfill injection](https://www.npmjs.com/package/webpack-polyfill-injector)
- Linting with [ESlint](https://eslint.org/) / [Stylelint](https://stylelint.io/) / [Prettier](https://prettier.io/)
- [Mock REST API server](https://github.com/jaywcjlove/mocker-api)
- JavaScript testing with [Jest](https://jestjs.io/)
- Git hooks with [Husky](https://github.com/typicode/husky)
- Reduced bundle size by using [Preact](https://preactjs.com/)
- **Assets optimization**
- and much more

## Getting Started

### Installation

For now, simply clone the repository and run `npm i`.

### Usage

Your work is starting with your code editor. Open the project and decide what you want to do.

List of available scripts is specified in `package-scripts.js` file. However there are 2 main scripts you will use:

#### Running the Development Server

For developing it's needed to run the local server. All `npm start dev` scripts will first fix the formatting of all config files, but each is then doing the different things:

- `npm start dev` will run Webpack dev server
- `npm start dev.hot` will run Webpack dev server with the support of HMR
- `npm start dev.prod` will run Webpack dev server with the production config (to test the prod assets in dev)

#### Running the Build

For bundling production assets it's needed to run the build.

- `npm start build` will:
  - Check the format of all config files
  - Run Webpack with production settings
  - Run Jest to run all the JavaScript tests

## Documentation
The code should be self-documented with comments at proper places, however this section gives you better overview with the basic explanation of the folder structure, used files and the configuration of SuperDevStack.

### Folder Structure
- **.vscode** - Recommended settings for [VS Code](https://code.visualstudio.com/) users
- **dist** - Target folder where ready-for-production files are built. Created by the build script
- **externals** - Storage for external assets (like 3rd party scripts or things you don't have control over) that you need to be present in `dist` folder, not processed by Webpack (simply for copy-paste)
- **src** - Source folder containing all application related files
    - **api** - Local mock API definitions used for AJAX testing

    - **app** - JavaScript components and utilities

    - **fonts** - Local fonts loaded by CSS

    - **img** - Images with various formats

    - **styles** - SASS files

    - **tpl** - React pages, layouts and components for HTML composition
- **webpack** - Webpack configuration for different environments
- **Root files** - Configuration files can be written in different formats, the preferred file format in SuperDevStack is `.js` (`.babelrc.js`) before non-extension format (`.babelrc`) due ability to programmatically configure files and use comments in JS files
  - **.babelrc.js** - **Babel** config with presets, plugins and specific environment settings
  - **.browserslistrc** - **Target browsers** config shared by multiple tools like Babel, ESlint, Stylelint and more
    - **.eslintignore** - **ESlint** config for ignoring specific files and directories while linting
    - **.eslintrc** - **ESlint** config with plugins, rules and other settings
    - **.gitignore** - **GIT** config for ignoring specific files and directories
    - **.huskyrc.js** - **Husky** config for GIT hooks
    - **.npmrc** - **NPM** global config
    - **.prettierignore** - **Prettier** config for ignoring specific files and directories while prettifying
    - **.prettierrc.js** - **Prettier** config with formatting setup
    - **.stylelintrc.js** - **Stylelint** config with plugins, rules and other settings
    - **jest.config.js** - **Jest** config with needed libraries, aliases and more
    - **jest.setup.js** - **Jest** config with adding features (e.g. fetch) to global scope that allows to use them in test files
    - **package-scripts.js** - **NPM** scripts are now not in `package.json` but moved to the separate file to not bloat the file and programmatically configure files and use comments
    - **package.json** - General **project configuration** with **dependencies**
    - **postcss.config.js** - [PostCSS](https://postcss.org/) config with plugins needed for postprocessing CSS
    - **README.md** - *It's me!*

### Environment
- **NPS**

    NPS solves the issue of having tons of NPM scripts in `package.json` file. Maintaining app with just few simple scripts is fine, but with more complex solution it can grow into the burning hell. Only script you need there is one-word `start` script - `nps`.

    The scripts are located in `package-scripts.js` file. Notice it's a JavaScript file so you can generate your scripts programmatically, use comments and much more. And most importantly, it's nicely separated in one file.
- **Browsers support**

    In `.browserslistrc` file you can specify the browsers you app is tuned for. It will tell tools like [Autoprefixer](https://github.com/postcss/autoprefixer) or Babel what browsers you want to support and the tools will adjust their configuration to serve you features that the specified browsers support. If you are not sure what features work in what browsers, check [Can I Use](https://caniuse.com/) and test your Browserslist queries at [the official page](https://browserl.ist/).
- **GIT hooks**

    Git hooks are scripts that Git executes before or after events like commit or push. Handy for ensuring your code is properly formatted with no errors. Powered by Husky.
### Webpack
A module bundler, the heart of your application. In simple words, it takes your source files, processes them with loaders and plugins, run the tasks you specify over it and returns the optimized output files.

One of the most useful features is code splitting, allowing you to improve the load time and performance of your app by splitting the output file(s) into multiple, separated chunks and load them on demand only when they are currently needed.

The entire Webpack magic is specified in config files.

- **Entry** - Source files like JavaScript and CSS files, images, ...
- **Output** - Production-ready built files
- **Loaders** - Alter the files as you specify, e.g. transpile JavaScript, minify CSS, optimize images, ...
- **Plugins** - Inject polyfills, extract files, generate favicons, ...

#### Config files

You often need different configuration for development and production environment. Config file for each environment can be used.
- **Base config**

    Base Webpack config sharing configuration for both development and production env.

    Stuff that is needed on both dev and prod such as linting, generating templates, transpilation, ...

    Sometimes it contains conditions to differentiate specific configuration for dev/prod. You might think why do we have the separated dev and prod config if we are checking for the environment in this file. At some cases it's better to do it in this file in order to prevent scripts duplication or unnecessarily writing of more code.
- **Dev config**

    Development environment config is used for the best developer experience.

    No assets optimization, producing into much bigger files enabling features like running development server and using hot module replacement.
- **Prod config**

    Production config focusing on as much assets optimization as possible.

    Caching, compression, bundle analyzer tools, ....

#### Features
- **Dev server and Browsersync remote debugging**

    Webpack dev server runs the local server. However Browsersync is also included in order to be able to test your app on the external IP address, on multiple devices while allowing remote debugging via [Weinre](https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html).

    If dev server is launched (by `npm start dev`), in the console you can see that *Project is running at http://localhost:3000/*. That's Webpack dev server URL. Then Browsersync is launched, proxying that url but also creating it's custom Local URL http://localhost:3001/. Why? And what's the external URL http://192.168.x.x/?
    - Webpack dev server is your local, private development environment only visible to you
    - Browsersync dev server is also your local development environment, but not really private. The external URL can be accessed by any device in your network. If you or someone else will visit the external URL, he will see the instance of the Browsersync dev server, not the Webpack dev server

    **An example**: You will connect to the external URL with your phone to test your app. There you will change the state of your application - move the scrollbar, move the carousel or something. Because the external URL is in sync with Browsersync dev server, you will see these changes also there, meaning your page opened in Browsersync dev server will scroll as you scroll on your phone. But your Webpack dev server will not

- **HMR**

    Hot module replacement is a technique that allows you to save changes in your source code and see the result immediately in the browser without the need to reload it. It works for saving JavaScript and CSS code, however if you attempt to save a template file, the full reload is still needed.

    For HMR to work you need to run the server in hot mode. Only components exported by hot method can use the power of HMR, an example: `export default hot(module)(App).`
- **Code splitting**

    Allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.
- **Aliases**

    In JS and CSS files you can use path aliases while importing or accessing files.

    Instead of `import Utility from '../../../../utilities/utility'` you can simply write `import Utility from 'utilities/utility'`.

    When using aliases in CSS it's needed to precede the path with the `~` character. For example `background-image: url('~img/png/image.png')`.
- **Assets caching**

    We want the best optimization for production assets. Importing CSS in JS would normally produce in the CSS code inlined to the page by JavaScript. However this cannot be cached well. Thanks to [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin) even the imported files can now be stored as a separated CSS files allowing browsers to cache them.

    How to avoid caching of files we don't want to cache? If we update our production assets with some new functionality or bugfixes, we want the clients to download the most updated version. Browsers try to do it but not always successfully. Webpack provides an option to use hashes which produces in the random characters added to the file names. If the asset was changed from the latest build, it would have the different hash every time, so browser must download the most recent version of the file every time. An example: `app.m6d9c2.js`.
- **Polyfill injecting**

    Normally, if you need to polyfill a feature that browsers don't support natively, you need to explicitly download that polyfill and import it into your source file. It's cool, but it has two downsides:
    - Your code with polyfill included will be downloaded by every browser, even those who don't need it and support the feature natively
    - You need to manually import the polyfill

    Webpack polyfill injector will analyze your code and generate polyfill chunks for every feature that needs to be polyfilled based on the preset and target browsers. It will also add a check if the browser really needs the polyfill - if yes, it will load the polyfill chunk. If not, the browser does not need to download any additional files.
- **Assets optimization**

    - **CSS**
        - Extracting imported CSS files from JS to chunks so browser can cache it
        - Minification with combining the same selectors and same media queries
        - Inlining SVG images
        - Polyfilling
    - **JS**
        - Code splitting
        - Minification
        - Polyfilling
    - **Media files** - Image compression and optimization for various formats

#### HTML Templating
How to work with templates:

- **Pages**

  Every `.js` file located in `src/tpl/pages/` will produce into the `.html` page in the `dist` folder after build. If you need a new page, just create a new file there.

- **Layouts**

  `src/tpl/layouts` contains definition of different layouts you want to use, however most of the times you will need just one.

- **Components**

  `src/tpl/components` contains reusable components and macros you can import in the pages.

#### CSS / SASS
It's a good approach to import React component-specific styles just in the component itself. However for some global styles like typography or layout it's recommended to use `main.css` file, generated from `src/styles/main.scss`.

Webpack also needs to process this file in order to apply transformations on it, so it's added as an entry point in Webpack config.

- **Autoprefixing**

  Autoprefixes for certain CSS rules are generated automatically based on settings in `.browserslistrc` file.

- **Linting, prettifying**

  Stylelint and Prettier are used to keep your styles well-formatted and syntax-error-free.

#### JavaScript
The main source file for all JavaScript logic is `src/app/index.js`. There all Vanilla JS and React components are imported/rendered.

- **REST API**

  Mocker API is used as mock for REST API you can work with while developing. In `src/api/` you can define your custom API data.

- **Fetch**

    AJAX request can be made by native fetch method (or possibly by external libraries). For server requests, for example your local mock API, use simply `fetch('/api/example')`.
- **Testing**

    Jest is used for JavaScript testing. In `src/app/react-components/App/App.spec.js` you can find a very simple example how to use it.
- **Lazy loading**

    It's a good practice to load a React component only at time when you really need it. SuperDevStack uses React's native `lazy` method to lazy load the components, check `src/app/react-components/App/index.js` for the use case.
- **Linting, prettifying**

    ESlint and Prettier are used to keep your scripts well-formatted and syntax-error-free.

## Contributing
I will highly appreciate any kind of help regarding SuperDevStack. If you are using it and missing some feature or experiencing nasty bug, please create an issue. Also, feel free to fork the repository and create pull requests for any existing issue.

## License
MIT. I have no idea about licences. Really. Feel free to copy, edit and share the code anywhere you wish without crediting the author.

[![nps friendly][nps]][nps-url]

[nps]: https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square
[nps-url]: https://github.com/kentcdodds/nps
