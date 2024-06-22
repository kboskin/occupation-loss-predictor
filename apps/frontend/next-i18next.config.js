const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        locales: ['uk', 'en', 'fr', 'es', 'de'],
        defaultLocale: 'uk'
    },
    localePath: path.resolve('./public/locales'),  // Specifies the path to the locale files
    localeStructure: '{{lng}}/{{ns}}',  // Defines how the locale files are structured within the localePath directory
    defaultNS: 'common',  // Specifies the default namespace used if none is provided in the translation function
    interpolation: {
        escapeValue: false,  // Prevents XSS attacks by avoiding escaping interpolated values
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',  // Enables reloading translation files in development mode on each render
}