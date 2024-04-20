const path = require('path')
const { i18n } = require('./next-i18next.config')

module.exports = {
    // basePath: "https://",
    reactStrictMode: false,
    swcMinify: true,
    sassOptions: {includePaths: [path.join(__dirname, 'styles')],},
    i18n: i18n
}