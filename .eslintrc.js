module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "no-param-reassign": 0,
    "no-extend-native": 0,
    "no-underscore-dangle": 0,
    "max-len": 0,
    "no-restricted-globals": 0,
    "no-throw-literal": 0,
    "semi": 2,
    "indent": ["error", 4]
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaVersion": 6
  }
}
