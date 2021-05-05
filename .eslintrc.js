module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
        trailingComma: 'none'
      }
    ],
    'vue/require-prop-types': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
