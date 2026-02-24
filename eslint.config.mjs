import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Ignore build output
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/.vite/**'],
  },

  // Base JS recommended
  js.configs.recommended,

  // TS recommended (no requiere parser manual en flat config)
  ...tseslint.configs.recommended,

  // React (solo aplica donde haya JSX)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Disable rules that conflict with Prettier
  prettierConfig,
]
