/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
