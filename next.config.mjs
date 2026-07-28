/** @type {import('next').NextConfig} */

import {defaultLocale, locales}   from"./i18n.js";

import routesConfig from 'nextjs-routes/config';

const withRoutes = routesConfig({
    outDir: 'types',
    i18n: {
        defaultLocale,
        locales,
    },
})


const nextConfig = withRoutes({
    reactStrictMode: true,
    transpilePackages: ["@repo/ui", '@mdxeditor/editor'],
    i18n: {
        defaultLocale,
        locales,
    },
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true
            }
        ]
    }
});

export default nextConfig;
