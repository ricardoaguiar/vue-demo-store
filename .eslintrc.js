module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vue'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'], // Adjust if needed
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**', 'components.d.ts'],
  rules: {
    // Add custom rules here
  },
}
