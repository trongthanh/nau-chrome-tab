/* eslint-disable quote-props */
module.exports = {
	root: true,
	extends: ['nau'],
	plugins: ['svelte3'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'no-param-reassign': 'off',
		'no-mixed-operators': 'off',
		strict: 'off',
		'import/no-anonymous-default-export': 'off',
		'import/prefer-default-export': 'off',
		// allow optionalDependencies
		'import/no-extraneous-dependencies': [
			'error',
			{
				optionalDependencies: ['test/unit/index.js'],
			},
		],
		// svelte specific:
		'import/first': 'off', //import orders cannot be determined correctly in .svelte components
		'import/no-mutable-exports': 'off',
		'no-labels': 'off',
		'no-restricted-syntax': ['error', 'ForInStatement', 'ForOfStatement', 'WithStatement'], // remove LabeledStatement from the list
	},
	globals: {
		browser: false,
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.svelte'],
			},
		},
	},
};
