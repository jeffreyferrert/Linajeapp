/** @type {import("prettier").Options} */
module.exports = {
  jsxSingleQuote: true,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  trailingComma: 'es5',
  importOrderSortSpecifiers: true,
  importOrder: ['^[^\.@].*$', '^@senorwooly/.*$', '^@/.*$', '^\.\./.*$', '^\./.*$'],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}
