/** @type {import('next-sitemap').IConfig} */
const AVAILABLE_LOCALES = require("./utils/available_locales");
const AVAILABLE_DATES = require("./utils/availdable_days");

module.exports = {
    siteUrl: 'https://combatlosses.com',
    trailingSlash: true,
    generateRobotsTxt: true,
    priority: 1.0,
    alternateRefs: AVAILABLE_LOCALES.flatMap(lang => ({
        hreflang: lang,
        href: `https://combatlosses.com/${lang}`,
    })),
    additionalPaths: async (config) => {
        // Since no promises are actually used inside the mapping, no need for Promise.all
        return AVAILABLE_DATES.map((date) => (
            {
                loc: `/date/${date}`,
                changefreq: 'daily',
                priority: 0.5,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: [...availableLocales.map(language => ({
                    href: `${config.siteUrl}/${language}/`,
                    hreflang: language
                }))]
            }
        ))
    },
    transform: async (config, path) => {

        // Use default transformation for all other cases
        return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    }
}