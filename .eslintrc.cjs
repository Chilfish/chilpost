module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
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
    '_mock.ts',
  ],
}
