import Head from "next/head";
import { useRouter } from "next/router";
import {
  DEFAULT_OG_IMAGE,
  JsonLdNode,
  SITE_NAME,
  absoluteUrl,
  buildCanonicalUrl,
  buildLanguageAlternates,
  formatSeoTitle,
  getAlternateOgLocales,
  getOgLocale,
  serializeJsonLd,
} from "@/utils/seo";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLdNode | JsonLdNode[];
};

export function SeoHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoHeadProps) {
  const router = useRouter();
  const locale = router.locale;
  const seoTitle = formatSeoTitle(title);
  const canonicalUrl = buildCanonicalUrl(path, locale);
  const imageUrl = absoluteUrl(image);
  const robots = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} key="title" />
      <meta name="description" content={description} key="description" />
      <meta name="robots" content={robots} key="robots" />
      {keywords.length ? (
        <meta name="keywords" content={keywords.join(", ")} key="keywords" />
      ) : null}
      <link rel="canonical" href={canonicalUrl} key="canonical" />
      {buildLanguageAlternates(path).map((alternate) => (
        <link
          key={`alternate-${alternate.hrefLang}`}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}

      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta
        property="og:locale"
        content={getOgLocale(locale)}
        key="og:locale"
      />
      {getAlternateOgLocales(locale).map((alternateLocale) => (
        <meta
          key={`og:locale:alternate-${alternateLocale}`}
          property="og:locale:alternate"
          content={alternateLocale}
        />
      ))}
      <meta property="og:title" content={seoTitle} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      {imageAlt ? (
        <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />
      ) : null}

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={seoTitle} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      {imageAlt ? (
        <meta
          name="twitter:image:alt"
          content={imageAlt}
          key="twitter:image:alt"
        />
      ) : null}

      {type === "article" && publishedTime ? (
        <meta
          property="article:published_time"
          content={publishedTime}
          key="article:published_time"
        />
      ) : null}
      {type === "article" && (modifiedTime || publishedTime) ? (
        <meta
          property="article:modified_time"
          content={modifiedTime ?? publishedTime}
          key="article:modified_time"
        />
      ) : null}

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          key="json-ld"
        />
      ) : null}
    </Head>
  );
}
