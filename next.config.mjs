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
    images: {
        // AVIF first: roughly 20-30% smaller than WebP at the same quality,
        // with WebP kept as the fallback for browsers that can't take it.
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
        // Post images live in Firebase Storage, which serves them at full
        // size as JPEG with `cache-control: private, max-age=0`. Routing them
        // through the optimizer gets resizing, AVIF/WebP and a long cache.
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "/v0/b/**",
            },
        ],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
            ? {exclude: ["error", "warn"]}
            : false,
    },
    experimental: {
        // Chakra and framer-motion are barrel-exported; without this the whole
        // package lands in the shared _app chunk.
        optimizePackageImports: [
            "@chakra-ui/react",
            "framer-motion",
            "ahooks",
        ],
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
