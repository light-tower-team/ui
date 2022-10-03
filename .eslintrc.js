module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "vue/multi-word-component-names": "off",
    "no-console": ["error", { allow: ["error", "warn"] }],
  },
};
