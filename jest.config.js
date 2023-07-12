module.exports = {
    transformIgnorePatterns: [
        //    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
        'node_modules/(?!swiper)/'
    ],
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/src/tests/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.js"
    },
}