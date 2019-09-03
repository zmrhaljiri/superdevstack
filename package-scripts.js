// NPM Package scripts
// Scripts from package.json moved to a separate config file in order to not bloat the file and have a nice configuration with comments

// Script runner that will invoke nps command based on passed tasks
const run = tasks => {
    // Passed npm tasks need to be wrapped in quotes and separated by a single space
    const tasksWrappedInQuotes = tasks.map(task => `"${task}"`)

    return `nps ${tasksWrappedInQuotes.join(' ')}`
}

// TODO create path config here?

// Export NPM scripts
module.exports = {
    scripts: {
        //
        // Script aliases
        // Used for calling multiple scripts by one command
        //

        build: run([
            // Build the assets (and templates) for production
            'format.check.config',
            'webpack.prod --env.patch',
            'test',
        ]),
        dev: {
            // Run the development server
            default: run([
                // The default development server
                'format.fix.config',
                'webpack.dev',
            ]),
            hot: run([
                // The dev server supporting HMR
                'format.fix.config',
                'webpack.dev --hot',
            ]),
            prod: run([
                // The dev server with production settings (for testing production build)
                'format.fix.config',
                'webpack.dev.withProdConfig',
            ]),
        },
        format: {
            // Format files
            check: {
                // Check format of files and output the result of linting
                all: run([
                    // Check format of all source files and configs
                    'prettier.check.all',
                    'stylelint.check',
                    'eslint.check.all',
                ]),
                config: run(['prettier.check.config', 'eslint.check.config']), // Check format of just config files
            },
            fix: {
                // Format files and output the result of linting
                config: run([
                    // Format just config files
                    'prettier.fix.config',
                    'stylelint.fix',
                    'eslint.fix.config',
                ]),
            },
        },
        hooks: {
            // Git hooks
            preCommit: run(['format.check.all']),
            prePush: run(['format.check.all', 'test']),
        },

        //
        // Single script definitions
        //

        eslint: {
            // Lint JS
            check: {
                all: 'eslint ./ --max-warnings 0', //
                config: 'eslint "{./,./webpack/}*.js" --max-warnings 0',
            },
            fix: {
                config: 'eslint --fix "{./,./webpack/}*.js" || true',
            },
        },
        stylelint: {
            // Lint SCSS
            check: 'stylelint "**/*.scss"',
            fix: 'stylelint --fix "**/*.scss" || true',
        },
        prettier: {
            // Check (or lint) both SCSS and JS
            check: {
                all: 'prettier -l "**/*.js"',
                config: 'prettier -l "{./,./webpack/}*.js"',
            },
            fix: {
                config:
                    'prettier --loglevel warn --write "{./,./webpack/}*.js" || true',
            },
        },
        test: {
            default: 'jest',
        },
        webpack: {
            // Run production build
            prod:
                'cross-env NODE_ENV=production webpack --progress --config webpack/config.prod.babel.js',
            dev: {
                // Run Webpack dev server
                default:
                    'cross-env NODE_ENV=development webpack-dev-server --config webpack/config.dev.babel.js',
                // Run Webpack dev server with production config
                withProdConfig:
                    'cross-env NODE_ENV=production webpack-dev-server --config webpack/config.prod.babel.js',
            },
        },
    },
}
