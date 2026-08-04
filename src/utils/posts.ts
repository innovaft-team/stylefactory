import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {stripHtml} from "string-strip-html";
import type {Blog} from "@/hooks/useListBlogs";
import {DEFAULT_LOCALE, LOCALES, resolveLocale} from "@/utils/seo";

export function getPostTitle(blog: Blog, locale?: string | null) {
    const resolvedLocale = resolveLocale(locale);
    const localizedTitle = resolvedLocale === "en" ? blog.eng?.title : blog.cro?.title;

    return localizedTitle || blog.eng?.title || blog.cro?.title || "Style Factory";
}

export function getPostMarkdown(blog: Blog, locale?: string | null) {
    const resolvedLocale = resolveLocale(locale);
    const localizedContent = resolvedLocale === "en" ? blog.eng?.content : blog.cro?.content;

    return localizedContent || blog.eng?.content || blog.cro?.content || "";
}

export function slugify(value = "") {
    const slug = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80)
        .replace(/-+$/g, "");

    return slug || "style-factory-post";
}

export function getPostSlug(blog: Blog) {
    const explicitSlug = blog.slug || blog.slugs?.[DEFAULT_LOCALE] || blog.slugs?.hr;

    return slugify(explicitSlug || getPostTitle(blog, DEFAULT_LOCALE));
}

export function getUniquePostSlug(blog: Blog, blogs: Blog[]) {
    const baseSlug = getPostSlug(blog);
    const duplicateCount = blogs.filter((item) => getPostSlug(item) === baseSlug).length;

    if (duplicateCount <= 1) {
        return baseSlug;
    }

    return `${baseSlug}-${blog.id.slice(0, 6).toLowerCase()}`;
}

export function resolvePostByIdentifier(blogs: Blog[], identifier: string) {
    const normalizedIdentifier = slugify(identifier);

    return blogs.find((blog) => {
        if (blog.id === identifier) {
            return true;
        }

        const candidateSlugs = [
            getUniquePostSlug(blog, blogs),
            getPostSlug(blog),
            blog.slug,
            ...LOCALES.map((locale) => blog.slugs?.[locale]),
            ...LOCALES.map((locale) => getPostTitle(blog, locale)),
        ].filter(Boolean);

        return candidateSlugs.some((candidate) => slugify(candidate) === normalizedIdentifier);
    });
}

export async function renderMarkdownToHtml(content = "") {
    const matterResult = matter(content);
    const processedContent = await remark().use(html).process(matterResult.content);

    return processedContent.toString().replace(/<\/?h1(\s[^>]*)?>/g, (match) => (
        match.startsWith("</") ? "</h2>" : match.replace("<h1", "<h2")
    ));
}

export function cleanText(value = "") {
    return stripHtml(value).result.replace(/\s+/g, " ").trim();
}

export function createExcerpt(value = "", maxLength = 155) {
    const text = cleanText(value);

    if (text.length <= maxLength) {
        return text;
    }

    const truncated = text.slice(0, maxLength + 1);
    const lastSpace = truncated.lastIndexOf(" ");
    const excerpt = truncated.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim();

    return `${excerpt.replace(/[.,;:!?-]+$/, "")}...`;
}

export async function getPostSeoData(blog: Blog, locale?: string | null) {
    const title = getPostTitle(blog, locale);
    const markdown = getPostMarkdown(blog, locale);
    const html = await renderMarkdownToHtml(markdown);
    const description = blog.seoDescription || createExcerpt(html) || `${title} by Style Factory Uniforms.`;

    return {
        title,
        seoTitle: blog.seoTitle || title,
        html,
        description,
    };
}
