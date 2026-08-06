
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {stripHtml} from "string-strip-html";
import type {Blog} from "@/hooks/blog";
import {getPostMarkdown, getPostTitle} from "@/utils/posts";

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

    const seoTitle = title;

    return {
        title,
        seoTitle,
        html,
        description,
    };
}
