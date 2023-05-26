require('dotenv').config()
/** @type {import('next').NextConfig} */


module.exports={
  env: {
    API_URL : process.env.API_URL,
  },
}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
