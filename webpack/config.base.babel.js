// Base Webpack config sharing configuration for both development and production

import fs from 'fs'
import HtmlPlugin from 'html-webpack-plugin'
import PolyfillInjectorPlugin from 'webpack-polyfill-injector'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import PostCssPresetEnv from 'postcss-preset-env'
import PostCssInlineSvg from 'postcss-inline-svg'
import CssNano from 'cssnano'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import TimeFixPlugin from 'time-fix-plugin'
import HtmlWebpackInlineSVGPlugin from './plugins/html-webpack-inline-svg-plugin' // TODO pending, check README in ./plugins folder.

import config from './config'

// Dynamically generate html templates
function generateStaticTemplates() {
    const templates = fs.readdirSync(config.path.TPL) // Get list of all templates in /tpl/ folder

    return templates.map(template => {
        const [templateName] = template.split('.') // Get just the file name without an extension

        // Pass the file (string) to the plugin that will generate the template processed by Webpack
        return new HtmlPlugin({
            filename: `${templateName.toLowerCase()}.html`,
            template: `${config.path.TPL}/${templateName}.js`,
        })
    })
}

// Convert .svg files into inline SVG
function processTemplateSvg() {
    return new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true, // Reference image paths relative to the project root
    })
}

export default {
    devtool: config.IS_DEV // Sourcemaps
        ? 'cheap-module-eval-source-map'
        : 'source-map',
    entry: {
        // Entry files
        app: [
            // JS
            `webpack-polyfill-injector?${JSON.stringify({
                modules: config.path.APP_ENTRY,
            })}!`,

            // CSS
            config.path.CSS_ENTRY,
        ],
    },
    output: {
        // Output files
        path: config.path.DIST,
        hashDigestLength: 6,
        filename: config.IS_DEV
            ? `${config.path.APP_OUTPUT}/[name].js`
            : `${config.path.APP_OUTPUT}/[name].[contenthash].js`,
    },
    module: {
        // Loaders for various file types (extensions)
        rules: [
            // JS
            {
                enforce: 'pre',
                test: config.resources.JS,
                include: config.path.SRC,
                exclude: config.path.EXT,
                loader: 'eslint-loader', // Lint JS
                options: {
                    configFile: '.eslintrc.js',
                    failOnError: !config.IS_DEV,
                    failOnWarning: !config.IS_DEV,
                },
            },
            {
                test: config.resources.JS,
                include: config.path.SRC,
                exclude: config.path.EXT,
                loader: 'babel-loader', // Transpile JS
            },

            // CSS
            {
                test: config.resources.CSS,
                include: config.path.SRC,
                exclude: config.path.EXT,
                use: [
                    config.IS_DEV
                        ? 'style-loader' // Add CSS to the DOM by injecting a <style> tag (also needed for HMR)
                        : {
                              // TODO waiting for HMR support of this plugin
                              // Extracts styles so browser can request them as CSS files
                              loader: MiniCssExtractPlugin.loader,
                              options: {
                                  // TODO discover why this is working and needed for url referencing
                                  publicPath: '../',
                              },
                          },
                    {
                        loader: 'css-loader', // Support @import and url() url resolving
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader', // Minification, inline svg, polyfilling
                        options: {
                            plugins: [
                                PostCssInlineSvg,
                                PostCssPresetEnv,
                                CssNano,
                            ],
                            minimize: !config.IS_DEV,
                        },
                    },
                    {
                        loader: 'fast-sass-loader', // Support SASS
                        options: {
                            sourceMap: !config.IS_DEV,
                        },
                    },
                    'import-glob-loader', // Expand globbing patterns for import statements
                ],
            },

            // Images
            {
                test: config.resources.IMG,
                include: config.path.SRC,
                exclude: config.path.EXT,
                use: [
                    {
                        loader: 'url-loader', // Transform files up to defined size into base64 URIs
                        options: {
                            limit: 10000,
                            name: config.IS_DEV
                                ? `${config.path.IMG_OUTPUT}/[name].[ext]`
                                : `${
                                      config.path.IMG_OUTPUT
                                  }/[name].[contenthash:6].[ext]`,
                        },
                    },
                ],
            },

            // Fonts
            {
                test: config.resources.FONTS,
                include: config.path.SRC,
                exclude: config.path.EXT,
                use: [
                    {
                        loader: 'file-loader', // Support importing files
                        options: {
                            name: config.IS_DEV
                                ? `${config.path.FONTS_OUTPUT}/[name].[ext]`
                                : `${
                                      config.path.FONTS_OUTPUT
                                  }/[name].[contenthash:6].[ext]`,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // Plugins
        new CleanPlugin({
            // Clean dist folder before build
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        new PolyfillInjectorPlugin({
            // Generate additional polyfills - babel-preset-env does not include all needed polyfills
            filename: config.IS_DEV
                ? `${config.path.APP_POLYFILLS_OUTPUT}/polyfill.[ext]`
                : `${
                      config.path.APP_POLYFILLS_OUTPUT
                  }/polyfill.[contenthash].[ext]`,
            polyfills: ['Promise', 'fetch', 'Object.assign'],
        }),
        new StyleLintPlugin({
            // Stylelint with autofix
            fix: config.IS_DEV,
        }),
        new TimeFixPlugin(), // Prevent unwanted compilation loops
    ]
        // In order to apply multiple instances of a plugin, it's needed to .concat the method to the plugins array
        .concat(generateStaticTemplates())

        // ...and every other plugin that must follow has to be also concated
        .concat(processTemplateSvg()),
    resolve: {
        // Additional modules settings
        alias: {
            // Specify aliases that can be then used in the CSS/JS
            img: config.alias.IMG,
            styles: config.alias.STYLES,
            fonts: config.alias.FONTS,
            components: config.alias.COMPONENTS,
            'react-components': config.alias.REACT_COMPONENTS,
            utilities: config.alias.UTILITIES,
            tpl: config.alias.TPL,
            react: 'preact/compat',
            'react-dom': 'preact/compat',
        },
    },
}
