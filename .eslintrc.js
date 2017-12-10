// Nau standard eslint rules, save it as .eslintrc.js
/* eslint-disable quote-props */
module.exports = {
	root: true,
	extends: ['nau'],
	rules: {
		'prefer-template': 'off',
		'spaced-comment': 'off',
		'no-underscore-dangle': 'off',
		'no-param-reassign': 'off',
		'prefer-spread': 'off',
		'max-len': 'off',
		'vars-on-top': 'off',
		strict: 'off',
		'prefer-arrow-callback': 'off',
		'no-alert': 'off',
		'global-require': 'off',
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
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: false,
			// 'jsx': true,
			// 'classes': true,
		},
	},
	plugins: [
		'import',
		'html',
		// react (install eslint-plugin-react)
		// babel (install eslint-plugin-babel)
	],
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.base.conf.js',
			},
		},
	},
};
