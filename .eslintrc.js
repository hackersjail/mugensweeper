module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['airbnb-base', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-await-in-loop': 'off',
  },
  overrides: [
    {
      files: ['**/tests/**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
