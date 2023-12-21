import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'vue/no-multiple-template-root': 'off',
    'node/prefer-global/process': 'off',
  },
}, {
  ignores: [
    'dist',
    '.output',
    '.nuxt',
    'node_modules',
    '*ignore',
    '.vercel',
  ],
}, unocss.configs.flat)
