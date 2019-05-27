// Config of paths

import path from 'path'

// Get the path relatively to the current working directory
const getPath = inputPath => path.resolve(process.cwd(), inputPath)

export default {
    PORT: 3000,
    IS_DEV: process.env.NODE_ENV !== 'production',

    resources: {
        JS: /\.(js|jsx)$/,
        CSS: /\.scss$/,
        IMG: /\.(gif|jpe?g|png|svg)$/i,
        FONTS: /\.(woff|woff2|eot|ttf|otf)$/,
    },
    path: {
        SRC: getPath('src'),
        DIST: getPath('dist'),
        TPL: getPath('src/tpl/pages'),

        APP_ENTRY: getPath('src/app/index.js'),
        API_ENTRY: getPath('src/api/index.js'),
        CSS_ENTRY: getPath('src/styles/main.scss'),
        TPL_ENTRY: getPath('src/tpl/**/*.js'),

        APP_OUTPUT: 'js',
        APP_POLYFILLS_OUTPUT: 'js/polyfills',
        IMG_OUTPUT: 'img',
        CSS_OUTPUT: 'css',
        FONTS_OUTPUT: 'fonts',
    },
    favicon: {
        LOGO: getPath('src/img/png/favicon.png'),
        PREFIX: 'favicons/',
        BG: '#000',
        TITLE: 'MTD',
    },
    alias: {
        IMG: getPath('src/img'),
        STYLES: getPath('src/styles'),
        FONTS: getPath('src/fonts'),
        COMPONENTS: getPath('src/app/components'),
        REACT_COMPONENTS: getPath('src/app/react-components'),
        UTILITIES: getPath('src/app/utilities'),
        TPL: getPath('src/tpl'),
    },
}
