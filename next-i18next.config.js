const locales = require("./src/constants/locales.json");

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    locales: locales.map((locale) => locale.code),
    defaultLocale: "en",
  },
};
