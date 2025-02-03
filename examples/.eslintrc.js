module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      browser: true,
      "vitest-globals/env": true

    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: [
      'react',
      '@stylistic/js',
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:vitest-globals/recommended',
    ],
    rules: {
      '@stylistic/js/indent': [
        'error',
        2,
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix',
      ],
      '@stylistic/js/quotes': [
        'error',
        'single',
      ],
      '@stylistic/js/semi': [
        'error',
        'never',
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always',
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 0,
      'react/prop-types': 0, // Disable prop-types rule if you are using TypeScript
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }