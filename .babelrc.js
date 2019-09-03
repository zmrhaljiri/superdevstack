module.exports = {
    presets: [
        // Specify multiple plugins by using presets
        [
            '@babel/preset-env', // Transpile latest JS features
            {
                corejs: 2,
                useBuiltIns: 'usage', // Automatic polyfill import - only when features that needs to be polyfilled are used in the code
            },
        ],
        '@babel/preset-react', // Add support for jsx
    ],
    plugins: [
        // Specify single plugins
        'react-hot-loader/babel', // Add support for hot module replacement
        '@babel/plugin-proposal-class-properties', // Transform static class properties
        '@babel/plugin-syntax-dynamic-import', // Add support for dynamic imports
    ],
    env: {
        // Specific environment settings
        production: {
            plugins: [
                [
                    'transform-react-remove-prop-types', // Remove proptypes from production
                    {
                        mode: 'remove',
                        removeImport: true,
                        ignoreFilenames: ['node_modules'],
                    },
                ],
            ],
        },
        test: {
            plugins: ['dynamic-import-node'], // Plugins that need to be added for tests in order to transpile correctly
        },
    },
}
