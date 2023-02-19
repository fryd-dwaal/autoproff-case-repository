require('@rushstack/eslint-patch/modern-module-resolution');

const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
  root: true,
  extends: [
    './.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    // Due to PrimeVue single word component names
    // it would be better to configure a static prepending to component names, e.g. [Prime]Dialog
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0
  },
};
