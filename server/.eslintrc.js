module.exports = {
  extends: ['standard', 'prettier', 'prettier/standard'],
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  }
}