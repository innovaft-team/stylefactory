import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {stripHtml} from "string-strip-html";
import type {Blog} from "@/hooks/useListBlogs";
import {DEFAULT_LOCALE, LOCALES, resolveLocale} from "@/utils/seo";

const TITLE_TRANSLATIONS: Record<string, { en: string; hr: string }> = {
    // 1. Dubrovački vrtovi sunca / Sun Gardens Dubrovnik
    "Dubrovački vrtovi sunca": { en: "Sun Gardens Dubrovnik", hr: "Dubrovački vrtovi sunca" },
    "Sun Gardens Dubrovnik": { en: "Sun Gardens Dubrovnik", hr: "Dubrovački vrtovi sunca" },

    // 2. Molum Hotel and Residences
    "Molum Hotel and Residences": { en: "Molum Hotel & Residences", hr: "Molum Hotel i rezidencije" },
    "Molum Hotel & Residences": { en: "Molum Hotel & Residences", hr: "Molum Hotel i rezidencije" },

    // 3. Liburnia Riviera Hotels & Villas
    "Libunia Riviera Hotels & Villas": { en: "Liburnia Riviera Hotels & Villas", hr: "Liburnia Riviera hoteli i vile" },
    "Liburnia Riviera Hotels & Villas": { en: "Liburnia Riviera Hotels & Villas", hr: "Liburnia Riviera hoteli i vile" },

    // 4. Adriatic Luxury Hotels
    "Adriatic Luxury Hotels": { en: "Adriatic Luxury Hotels", hr: "Jadranski Luksuzni Hoteli" },
    "Jadranski Luksuzni Hoteli": { en: "Adriatic Luxury Hotels", hr: "Jadranski Luksuzni Hoteli" },

    // 5. Esplanade
    "Esplanade": { en: "Esplanade Hotel", hr: "Hotel Esplanade" },
    "Hotel Esplanade": { en: "Esplanade Hotel", hr: "Hotel Esplanade" },

    // 6. Sunčani Hvar
    "Sunčani Hvar Hoteli": { en: "Sunčani Hvar Hotels", hr: "Sunčani Hvar Hoteli" },

    // 7. Čatež terme
    "Čatež terme": { en: "Terme Čatež", hr: "Čatež terme" },

    // 8. Pullman
    "Pullman": { en: "Pullman Hotel", hr: "Hotel Pullman" },

    // 9. Movenpick
    "Movenpick": { en: "Mövenpick Hotel", hr: "Hotel Mövenpick" },
    "Mövenpick": { en: "Mövenpick Hotel", hr: "Hotel Mövenpick" },

    // 10. Diplomat
    "Diplomat": { en: "Diplomat Hotel", hr: "Hotel Diplomat" },
    "Diplomat ": { en: "Diplomat Hotel", hr: "Hotel Diplomat" },

    // 11. Materra
    "Materra": { en: "Materra Hotel", hr: "Hotel Materra" },

    // 12. Olympia
    "Olympia": { en: "Olympia Hotel", hr: "Hotel Olympia" },

    // 13. Airport Franjo Tuđman
    "Airport Franjo Tuđman": { en: "Airport Franjo Tuđman", hr: "Zračna Luka Zagreb" },
    "Zračna Luka Zagreb": { en: "Airport Franjo Tuđman", hr: "Zračna Luka Zagreb" },

    // 14. Lafodia
    "Lafodia": { en: "Lafodia Sea Resort", hr: "Lafodia Sea Resort" },
    "Lafodia ": { en: "Lafodia Sea Resort", hr: "Lafodia Sea Resort" },

    // 15. Armerun Heritage
    "Armerun Heritage": { en: "Armerun Heritage Hotel", hr: "Hotel Armerun Heritage" },

    // 16. Akademis Academia
    "Akademis Academia": { en: "Akademis Academia", hr: "Akademis Academia" },

    // Assortment & Trends Items
    "Professional Kitchen Wear": { en: "Professional Kitchen Wear", hr: "Profesionalne kuharske uniforme" },
    "Profesionalne kuharske uniforme": { en: "Professional Kitchen Wear", hr: "Profesionalne kuharske uniforme" },

    "Housekeeping": { en: "Housekeeping", hr: "Domaćinstvo" },
    "Domaćinstvo": { en: "Housekeeping", hr: "Domaćinstvo" },

    "Reception": { en: "Reception", hr: "Recepcija" },
    "Recepcija": { en: "Reception", hr: "Recepcija" },

    "Maintenance": { en: "Maintenance", hr: "Tehnička služba" },
    "Tehnička služba": { en: "Maintenance", hr: "Tehnička služba" },

    "Wellness": { en: "Wellness & Spa", hr: "Wellness & Spa" },
    "Wellness & Spa": { en: "Wellness & Spa", hr: "Wellness & Spa" },

    "Ready to Wear uniforms": { en: "Ready to Wear Uniforms", hr: "Gotova radna odjeća i obuća" },
    "Gotova radna odjeća i obuća": { en: "Ready to Wear Uniforms", hr: "Gotova radna odjeća i obuća" },

    "Food & Beverage": { en: "Food & Beverage", hr: "Ugostiteljstvo (Food & Beverage)" },

    "Corporate Wear": { en: "Corporate Wear", hr: "Korporativne uniforme" },
    "Korporativne uniforme": { en: "Corporate Wear", hr: "Korporativne uniforme" },

    "Footwear": { en: "Footwear", hr: "Radna obuća" },
    "Radna obuća": { en: "Footwear", hr: "Radna obuća" },

    "Sustainability at the Heart of Our Design": { en: "Sustainability at the Heart of Our Design", hr: "Naš put prema održivom stvaranju" },
    "Naš put prema održivom stvaranju": { en: "Sustainability at the Heart of Our Design", hr: "Naš put prema održivom stvaranju" },
};

export function getPostTitle(blog: Blog, locale?: string | null) {
    if (!blog) return "Style Factory";
    const resolvedLocale = resolveLocale(locale);

    let rawTitle = "";
    if (resolvedLocale === "hr") {
        rawTitle = blog.cro?.title || (blog.cro as any)?.heading || (blog.cro as any)?.name || blog.eng?.title || "";
    } else {
        rawTitle = blog.eng?.title || (blog.eng as any)?.heading || (blog.eng as any)?.name || blog.cro?.title || "";
    }

    if (!rawTitle) {
        rawTitle = blog.cro?.title || blog.eng?.title || blog.seoTitle || "Style Factory";
    }

    const clean = rawTitle.trim();
    if (TITLE_TRANSLATIONS[clean]) {
        return TITLE_TRANSLATIONS[clean][resolvedLocale];
    }

    return rawTitle;
}

export function getPostMarkdown(blog: Blog, locale?: string | null) {
    if (!blog) return "";
    const resolvedLocale = resolveLocale(locale);

    if (resolvedLocale === "hr") {
        const croContent = blog.cro?.content;
        if (croContent) return croContent;
    } else {
        const engContent = blog.eng?.content;
        if (engContent) return engContent;
    }

    return blog.cro?.content || blog.eng?.content || "";
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

    const seoTitle = title;

    return {
        title,
        seoTitle,
        html,
        description,
    };
}
