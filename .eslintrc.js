module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['airbnb-base', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  // required to lint *.vue files
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['**/tests/**/*.test.js'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/tests/**/*.js'],
      rules: {
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
