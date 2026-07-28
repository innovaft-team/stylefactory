export const SITE_URL = "https://www.stylefactory.hr";
export const SITE_NAME = "Style Factory";
export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "hr"] as const;
export const DEFAULT_OG_IMAGE = "/images/home-redesign/hero-model.jpg";

export type Locale = (typeof LOCALES)[number];
export type JsonLdNode = Record<string, unknown>;

const localeNames: Record<Locale, string> = {
    en: "en_US",
    hr: "hr_HR",
};

const languageTags: Record<Locale, string> = {
    en: "en",
    hr: "hr-HR",
};

export function resolveLocale(locale?: string | null): Locale {
    return LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
}

export function normalizePath(path = "/") {
    if (!path || path === "/") {
        return "/";
    }

    const cleanPath = path.split("?")[0].split("#")[0];
    return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
}

export function localizedPath(path: string, locale?: string | null) {
    const resolvedLocale = resolveLocale(locale);
    const normalizedPath = normalizePath(path);

    if (resolvedLocale === DEFAULT_LOCALE) {
        return normalizedPath;
    }

    return `/${resolvedLocale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function absoluteUrl(pathOrUrl: string) {
    if (!pathOrUrl) {
        return SITE_URL;
    }

    if (/^https?:\/\//i.test(pathOrUrl)) {
        return pathOrUrl;
    }

    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${SITE_URL}${path}`;
}

export function buildCanonicalUrl(path: string, locale?: string | null) {
    return absoluteUrl(localizedPath(path, locale));
}

export function buildLanguageAlternates(path: string) {
    const alternates = LOCALES.map((locale) => ({
        hrefLang: languageTags[locale],
        href: buildCanonicalUrl(path, locale),
    }));

    return [
        ...alternates,
        {
            hrefLang: "x-default",
            href: buildCanonicalUrl(path, DEFAULT_LOCALE),
        },
    ];
}

export function getOgLocale(locale?: string | null) {
    return localeNames[resolveLocale(locale)];
}

export function getAlternateOgLocales(locale?: string | null) {
    const currentLocale = resolveLocale(locale);
    return LOCALES.filter((item) => item !== currentLocale).map((item) => localeNames[item]);
}

export function getLanguageTag(locale?: string | null) {
    return languageTags[resolveLocale(locale)];
}

export function formatSeoTitle(title: string) {
    if (!title) {
        return SITE_NAME;
    }

    return title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} | ${SITE_NAME}`;
}

export function createOrganizationJsonLd(): JsonLdNode {
    return {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: "Style Factory Uniforms",
        url: SITE_URL,
        logo: absoluteUrl("/images/56.svg"),
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        email: "info@stylefactory.hr",
        telephone: "+385 99 6666 331",
        founder: {
            "@type": "Person",
            name: "Vedrana Badrov",
        },
        foundingDate: "2016",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Vrisnicka 18",
            postalCode: "10000",
            addressLocality: "Zagreb",
            addressCountry: "HR",
        },
        areaServed: ["Croatia", "Europe"],
        knowsAbout: [
            "uniform design",
            "hospitality uniforms",
            "corporate workwear",
            "custom textile production",
        ],
    };
}

export function createWebsiteJsonLd(locale?: string | null): JsonLdNode {
    return {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: getLanguageTag(locale),
    };
}

type WebPageJsonLdProps = {
    path: string;
    title: string;
    description: string;
    locale?: string | null;
    pageType?: "WebPage" | "AboutPage" | "CollectionPage";
    image?: string;
    mainEntity?: JsonLdNode;
};

export function createWebPageJsonLd({
                                        path,
                                        title,
                                        description,
                                        locale,
                                        pageType = "WebPage",
                                        image = DEFAULT_OG_IMAGE,
                                        mainEntity,
                                    }: WebPageJsonLdProps): JsonLdNode {
    const url = buildCanonicalUrl(path, locale);

    return {
        "@type": pageType,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(image),
        },
        about: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: getLanguageTag(locale),
        ...(mainEntity ? {mainEntity} : {}),
    };
}

type CollectionItem = {
    id?: string;
    slug?: string;
    title: string;
    image?: string;
    imageAlt?: string;
};

function createImageObject(url: string, caption?: string): JsonLdNode {
    return {
        "@type": "ImageObject",
        url: absoluteUrl(url),
        ...(caption ? {caption} : {}),
    };
}

export function createItemListJsonLd({
                                         items,
                                         path,
                                         locale,
                                     }: {
    items: CollectionItem[];
    path: string;
    locale?: string | null;
}): JsonLdNode {
    return {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => {
            const slug = item.slug || item.id;

            return {
                "@type": "ListItem",
                position: index + 1,
                name: item.title,
                url: buildCanonicalUrl(`${normalizePath(path)}/${slug}`, locale),
                ...(item.image ? {image: createImageObject(item.image, item.imageAlt || item.title)} : {}),
            };
        }),
    };
}

type ArticleJsonLdProps = {
    path: string;
    title: string;
    description: string;
    images?: string[];
    locale?: string | null;
    publishedAt?: string;
    modifiedAt?: string;
    imageAlt?: string;
};

export function createArticleJsonLd({
                                        path,
                                        title,
                                        description,
                                        images = [],
                                        locale,
                                        publishedAt,
                                        modifiedAt,
                                        imageAlt,
                                    }: ArticleJsonLdProps): JsonLdNode {
    const url = buildCanonicalUrl(path, locale);
    const imageObjects = (images.length ? images : [DEFAULT_OG_IMAGE]).map((image) => (
        createImageObject(image, imageAlt || title)
    ));

    return {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: {
            "@id": `${url}#webpage`,
        },
        headline: title,
        description,
        image: imageObjects,
        url,
        author: {
            "@type": "Person",
            name: "Vedrana Badrov",
        },
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: getLanguageTag(locale),
        ...(publishedAt ? {datePublished: publishedAt} : {}),
        ...(modifiedAt || publishedAt ? {dateModified: modifiedAt ?? publishedAt} : {}),
    };
}

export function createBreadcrumbJsonLd({
                                           items,
                                           locale,
                                       }: {
    items: Array<{ name: string; path: string }>;
    locale?: string | null;
}): JsonLdNode {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: buildCanonicalUrl(item.path, locale),
        })),
    };
}

export function serializeJsonLd(jsonLd: JsonLdNode | JsonLdNode[]) {
    const payload = Array.isArray(jsonLd)
        ? {
            "@context": "https://schema.org",
            "@graph": jsonLd,
        }
        : {
            "@context": "https://schema.org",
            ...jsonLd,
        };

    return JSON.stringify(payload).replace(/</g, "\\u003c");
}
