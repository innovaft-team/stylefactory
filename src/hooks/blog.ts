/**
 * Types and constants shared by the blog / trends pages.
 *
 * These deliberately live apart from `useListBlogs`: that module imports the
 * Firebase SDK at the top level, so anything importing a *type* or the bucket
 * names from it used to pull firebase/app + firestore + storage + auth
 * (~328 KB raw) into the client bundle — even though the only caller,
 * `fetchBlogs`, runs exclusively inside `getServerSideProps`.
 */

type PostVariant = "horizonal" | "vertical";

export interface Blog {
    id: string;
    slug?: string;
    slugs?: Partial<Record<"en" | "hr", string>>;
    seoTitle?: string;
    seoDescription?: string;
    coverImageAlt?: string;
    images: string[];
    /**
     * Intrinsic pixel size of `images[0]`, resolved server-side by
     * `@/utils/imageSize` so the card can reserve the right aspect ratio
     * before the image decodes. Absent when the probe failed.
     */
    coverSize?: { width: number; height: number };
    variant: PostVariant;
    titleVariant: PostVariant;
    cro: {
        title: string;
        content: string;
    };
    eng: {
        title: string;
        content: string;
    };
    isVideo?: boolean;
    postedAt?: string;
}

export const BlogBuckets = {
    blogs: "/blogs",
    trends: "/trends",

    testBlogs: "/testBlogs",
    testTrends: "/testTrends",
} as const;
