module.exports = {
  root: true,
  extends: [
    '@antfu',
    '@unocss',
  ],
  rules: {
    'n/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
    'vue/no-constant-condition': 'off',
  },
}
