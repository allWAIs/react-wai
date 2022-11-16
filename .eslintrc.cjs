module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["react", "jsx-a11y"],
  settings: {
    react: { version: require("react/package.json").version },
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};
