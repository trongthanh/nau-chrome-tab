/* eslint-disable quote-props */
module.exports = {
	root: true,
	extends: ['nau'],
	plugins: ['svelte3'],
	rules: {
		'no-param-reassign': 'off',
		'padding-line-between-statements': ['off'],
		'import/prefer-default-export': 'off',
		'no-mixed-operators': 'off',
		// don't require .vue extension when importing
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
			},
		],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': [
			'error',
			{
				optionalDependencies: ['test/unit/index.js'],
			},
		],
		'import/no-anonymous-default-export': 'off',
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
