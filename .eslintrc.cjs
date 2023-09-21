module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off', // still running
  },
  ignorePatterns: [
    'dist',
    '.output',
    '.nuxt',
  ],
}
