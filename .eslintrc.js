module.exports = {
	root: true,
	extends: ['chotot-base'],
	plugins: ['import', 'svelte3'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'import/prefer-default-export': 'off',
		'no-console': 'off',
		'no-shadow': 'off',
		'no-tabs': 'off',
		'prefer-destructuring': 'off',
		// svelte specific:
		'import/first': 'off', // import orders cannot be determined correctly in .svelte components
		'import/no-mutable-exports': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
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
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.svelte'],
			},
		},
	},
};
