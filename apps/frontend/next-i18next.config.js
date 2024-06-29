const path = require('path');
const { AVAILABLE_LOCALES } = require('./utils/locale.js'); // Adjust the file extension to .js after TypeScript compilation


/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        locales: AVAILABLE_LOCALES,
        defaultLocale: AVAILABLE_LOCALES[0]
    },
    localePath: path.resolve('./public/locales'),  // Specifies the path to the locale files
    defaultNS: 'common',  // Specifies the default namespace used if none is provided in the translation function
    interpolation: {
        escapeValue: false,  // Prevents XSS attacks by avoiding escaping interpolated values
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',  // Enables reloading translation files in development mode on each render
}