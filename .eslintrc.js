// Nau standard eslint rules, save it as .eslintrc.js
/* eslint-disable quote-props */
module.exports = {
	root: true,
	extends: ['plugin:vue/recommended', 'nau'],
	rules: {
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
		// bliss globals
		$: false,
		$$: false,
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		mocha: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: false,
			// 'jsx': true,
			// 'classes': true,
		},
	},
	plugins: ['import', 'html'],
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.base.conf.js',
			},
		},
	},
};
