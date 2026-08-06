import {Blog, BlogBuckets} from "@/hooks/blog";
import {fetchBlogs} from "@/hooks/useListBlogs";
import {GetServerSidePropsContext} from "next";
import {LOCALES, absoluteUrl, buildCanonicalUrl, buildLanguageAlternates} from "@/utils/seo";
import {getPostTitle, getUniquePostSlug} from "@/utils/posts";

type SitemapEntry = {
    path: string;
    lastModified?: string;
    changeFrequency?: "weekly" | "monthly";
    priority?: string;
    images?: Array<{
        url: string;
        caption: string;
    }>;
};





function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function formatLastModified(value?: string) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return `<lastmod>${date.toISOString()}</lastmod>`;
}

function generateUrlEntry({path, lastModified, changeFrequency, priority, images = []}: SitemapEntry) {
    const alternateLinks = buildLanguageAlternates(path)
        .map((alternate) => (
            `<xhtml:link rel="alternate" hreflang="${alternate.hrefLang}" href="${escapeXml(alternate.href)}" />`
        ))
        .join("");
    const lastMod = formatLastModified(lastModified);
    const changeFreq = changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : "";
    const priorityTag = priority ? `<priority>${priority}</priority>` : "";
    const imageTags = images
        .map((image) => `
            <image:image>
                <image:loc>${escapeXml(absoluteUrl(image.url))}</image:loc>
                <image:caption>${escapeXml(image.caption)}</image:caption>
            </image:image>
        `)
        .join("");

    return LOCALES.map((locale) => `
        <url>
            <loc>${escapeXml(buildCanonicalUrl(path, locale))}</loc>
            ${alternateLinks}
            ${imageTags}
            ${lastMod}
            ${changeFreq}
            ${priorityTag}
        </url>
    `).join("");
}

function mapPostsToSitemapEntries(path: "/blog" | "/trends", posts: Blog[]): SitemapEntry[] {
    return posts.map((post) => ({
        path: `${path}/${getUniquePostSlug(post, posts)}`,
        lastModified: post.postedAt,
        changeFrequency: "monthly",
        priority: "0.7",
        images: (post.images ?? []).map((image) => ({
            url: image,
            caption: post.coverImageAlt || `${getPostTitle(post)} - Style Factory uniform ${path === "/blog" ? "project" : "trend"}`,
        })),
    }));
}

function generateSiteMap(blogs: Blog[], trends: Blog[]) {
    const staticEntries: SitemapEntry[] = [
        {
            path: "/",
            changeFrequency: "monthly",
            priority: "1.0",
            images: [{url: "/images/home-redesign/hero-model.jpg", caption: "Style Factory custom uniforms for modern brands"}],
        },
        {
            path: "/about",
            changeFrequency: "monthly",
            priority: "0.8",
            images: [{url: "/images/aboutimages/1.jpg", caption: "Style Factory textile agency and uniform design studio"}],
        },
        {
            path: "/trends",
            changeFrequency: "weekly",
            priority: "0.9",
            images: [{url: "/images/home-redesign/pants-render.jpg", caption: "Style Factory uniform assortment and workwear trends"}],
        },
        {
            path: "/blog",
            changeFrequency: "weekly",
            priority: "0.9",
            images: [{url: "/images/home-redesign/fabric-board.jpg", caption: "Style Factory uniform design projects and partners"}],
        },
    ];
    const entries = [
        ...staticEntries,
        ...mapPostsToSitemapEntries("/blog", blogs),
        ...mapPostsToSitemapEntries("/trends", trends),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        >
            ${entries.map(generateUrlEntry).join("")}
        </urlset>
    `;
}

function SiteMap() {
    // getServerSideProps writes the XML response.
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
    const [blogs, trends] = await Promise.all([
        fetchBlogs(BlogBuckets.blogs),
        fetchBlogs(BlogBuckets.trends),
    ]);
    const sitemap = generateSiteMap(blogs, trends);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
