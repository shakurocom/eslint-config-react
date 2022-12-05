/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@shakuroinc/eslint-config-base/prettier.config');

module.exports = {
  ...baseConfig,
  plugins: [...(baseConfig.plugins ?? []), require('prettier-plugin-tailwindcss')],
};
