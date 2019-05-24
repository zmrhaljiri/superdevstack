// Production webpack config

import merge from 'webpack-merge'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ImageminPlugin from 'imagemin-webpack'
import imageminSvgo from 'imagemin-svgo'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import WebpackAutoInject from 'webpack-auto-inject-version'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import baseConfig from './config.base.babel'
import config from './config'

// Merge prod config with base config
export default merge(baseConfig, {
    mode: 'production',

    // Plugins
    plugins: [
        new WebpackAutoInject({
            // Autoinject information about build (version, datetime) into assets
            SHORT: 'Build info',
            SILENT: true,
            componentsOptions: {
                InjectAsComment: {
                    tag: 'Version: {version} - {date}',
                    dateFormat: 'mm/dd/yyyy HH:MM:ss',
                },
            },
        }),
        new MiniCssExtractPlugin({
            // Extract CSS into separate files to be able to cache them
            filename: `${config.path.CSS_OUTPUT}/[name].[contenthash].css`,
        }),
        new ImageminPlugin({
            // Image compression and optimization
            bail: false, // Ignore errors on corrupted images
            cache: true,
            imageminOptions: {
                plugins: [
                    imageminGifsicle({
                        // GIF images
                        interlaced: true,
                    }),
                    imageminJpegtran({
                        // JP(E)G images
                        progressive: true,
                    }),
                    imageminPngquant({
                        // PNG images
                        strip: true,
                    }),
                    imageminSvgo({
                        // SVG images
                        removeViewBox: true,
                    }),
                ],
            },
        }),
        new FaviconsWebpackPlugin({
            // Generate favicons for all platforms
            logo: config.favicon.LOGO,
            prefix: config.favicon.PREFIX,
            background: config.favicon.BG,
            title: config.favicon.TITLE,
        }),
        new webpack.HashedModuleIdsPlugin(), // Cause hashes to be based on the relative module path
        new BundleAnalyzerPlugin({
            // Generate HTML file containing visualization of webpack output file sizes and treemap
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyse-report.html',
        }),

        // TODO private sourcemaps
        // new webpack.SourceMapDevToolPlugin({
        //     ...
        // })
    ],

    // TODO advanced code splitting | Only include core frameworks + utilities and dynamically load the rest of the dependencies

    optimization: {
        runtimeChunk: 'single', // One runtime chunk for all entrypoints
        splitChunks: {
            // Code splitting
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
})
