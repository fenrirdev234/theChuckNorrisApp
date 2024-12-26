import js from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
	extends: [
		js.configs.recommended,
		...tseslint.configs.recommended,
		pluginReact.configs.flat.recommended,
		eslintPluginPrettier,
	],

	files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	ignores: [
		'dist',
		'build',
		'package.json',
		'package-lock.json',
		'node_modules',
		'public',
		'.husky',
	],
	languageOptions: { globals: globals.browser },
	plugins: {
		'simple-import-sort': simpleImportSort,
		'react-hooks': reactHooks,
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/no-unescaped-entities': 'off',
		...reactHooks.configs.recommended.rules,
		'prettier/prettier': 'warn',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
})
