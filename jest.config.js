const path = require('path');

module.exports = {
	rootDir: path.resolve(__dirname),
	moduleFileExtensions: ['js', 'json', 'svelte'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'\\.js$': 'babel-jest',
		'\\.svelte$': 'jest-transform-svelte',
	},
	setupFiles: ['jest-localstorage-mock'],
	coverageDirectory: '<rootDir>/test/coverage',
	collectCoverageFrom: ['src/**/*.{js,svelte}', '!src/main.js', '!**/node_modules/**'],
};
