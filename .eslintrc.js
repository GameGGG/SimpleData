module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    window: 'writable',
    lib: 'writable',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'quotes': 0,
    'no-console': 1,
    'no-debugger': 1,
    'no-var': 1,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-underscore-dangle': 0,
    'no-alert': 0,
    'no-lone-blocks': 0,
  },
};
