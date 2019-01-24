/* eslint-disable quote-props */
module.exports = {
	root: true,
	extends: ['plugin:vue/essential', 'nau'],
	rules: {
		'no-param-reassign': 'off',
		'import/prefer-default-export': 'off',
		// don't require .vue extension when importing
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
				vue: 'never',
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
				extensions: ['.js', '.vue'],
			},
		},
	},
};
