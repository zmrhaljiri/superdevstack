// Development Webpack config

import apiMocker from 'mocker-api'
import merge from 'webpack-merge'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import baseConfig from './config.base.babel'
import config from './config'

// Merge dev config with base config
export default merge(baseConfig, {
    mode: 'development',
    module: {
        // Loaders for various file types (extensions)
        rules: [
            // JS
            {
                enforce: 'pre',
                test: config.resources.JS,
                include: config.path.SRC,
                exclude: config.path.EXT,
                loader: 'prettier-loader', // Support Prettier
            },
        ],
    },
    devServer: {
        // Settings for Webpack devserver
        stats: {
            // What output will be printed in the console
            moduleTrace: false,
            builtAt: false,
            children: false,
            hash: false,
            modules: false,
            source: false,
            version: false,
        },
        port: config.PORT,
        before(app, server) {
            // Custom middlewares
            apiMocker(app, config.path.API_ENTRY) // Mocks REST API

            // Recompile on template change even in hot mode
            // Replace due Windows uses backslashes instead of slashes in path, need to provide slashes
            server._watch(config.path.TPL.replace(/\\/g, '/'))
        },
    },
    plugins: [
        // Plugins
        new BrowserSyncPlugin( // Browsersync for cross-device testing allowing external access
            {
                host: 'localhost',
                port: config.PORT,
                proxy: `http://localhost:${config.PORT}/`,
                open: false,
            },
            {
                reload: false, // Prevent BrowserSync from hard reloading the page
            }
        ),
    ],
})
