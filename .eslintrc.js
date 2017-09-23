// Nau standard eslint rules, save it as .eslintrc.js
/* eslint-disable quote-props */
module.exports = {
	'root': true,
	'extends': [
		'nau',
	],
	'rules': {
		'prefer-template': 'off',
		'spaced-comment': 'off',
		'no-underscore-dangle': 'off',
		'no-param-reassign': 'off',
		'prefer-spread': 'off',
		'max-len': 'off',
		'vars-on-top': 'off',
		'strict': 'off',
		'prefer-arrow-callback': 'off',
		'no-alert': 'off',
		'global-require': 'off',
	},
	'globals': {
		'browser': false,
		// bliss globals
		'$': false,
		'$$': false,
	},
	'env': {
		'browser': true,
		'node': true,
		'es6': true,
		'mocha': true,
	},
	// 'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 6,
		// 'sourceType': 'module',
		'ecmaFeatures': {
			'impliedStrict': false,
			// 'jsx': true,
			// 'classes': true,
		},
	},
	'plugins': [
		'import',
		// react (install eslint-plugin-react)
		// babel (install eslint-plugin-babel)
	],
	'settings': {
		'import/resolver': {
			'webpack': {
				'config': 'webpack.config.js',
			},
		},
	},
};
