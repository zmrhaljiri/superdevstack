module.exports = {
    setupFilesAfterEnv: [
        // A list of paths to modules that run some code to configure or set up the testing framework before each test.
        '@testing-library/jest-dom/extend-expect',
        '@testing-library/react/cleanup-after-each',
    ],
    moduleNameMapper: {
        // Mapping must match the Webpack aliases settings
        '^img(.*)$': '<rootDir>/src/img$1',
        '^styles(.*)$': '<rootDir>/src/styles$1',
        '^fonts(.*)$': '<rootDir>/src/fonts$1',
        '^components(.*)$': '<rootDir>/src/app/components$1',
        '^react-components(.*)$': '<rootDir>/src/app/react-components$1',
        '^utilities(.*)$': '<rootDir>/src/app/utilities$1',
        '^tpl(.*)$': '<rootDir>/src/app/tpl$1',
    },
    transform: {
        // Specify Jest transpilers
        '^.+\\.js?$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'jest-transform-stub',
    },
    setupFiles: ['./jest.setup.js'], // A list of paths to modules that run some code to configure or set up the testing environment.
}
