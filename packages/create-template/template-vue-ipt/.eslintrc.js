module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "no-empty": "warn",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "space-in-parens": ["error", "never"],
    "no-trailing-spaces": "error",
    "space-before-blocks": "error",
    "vue/html-end-tags": "off"
  },
};
