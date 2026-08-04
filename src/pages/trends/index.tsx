import {NavigationLayout} from "@/components/layout/NavigationLayout";
import {motion} from "framer-motion";
import {PostList} from "@/components/PostList";
import {BlogBuckets, fetchBlogs} from "@/hooks/useListBlogs";
import {CreateBlogFormModal} from "@/components/CreateBlogForm";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {useTranslations} from "next-intl";
import {SeoHead} from "@/components/SeoHead";
import {
    createBreadcrumbJsonLd,
    createItemListJsonLd,
    createOrganizationJsonLd,
    createWebPageJsonLd,
    createWebsiteJsonLd
} from "@/utils/seo";
import {getPostTitle, getUniquePostSlug} from "@/utils/posts";
import {useRouter} from "next/router";

export default function Home({blogs}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations("trends");
    const {locale} = useRouter();
    const title = t("meta.title");
    const description = t("meta.description");
    const path = "/trends";
    const itemList = createItemListJsonLd({
        path,
        locale,
        items: (blogs ?? []).map((blog) => ({
            slug: getUniquePostSlug(blog, blogs ?? []),
            title: getPostTitle(blog, locale),
            image: blog.images?.[0],
            imageAlt: blog.coverImageAlt || `${getPostTitle(blog, locale)} - Style Factory uniform trend`,
        })),
    });

    return (
        <>
            <SeoHead
                title={title}
                description={description}
                path={path}
                image="/images/home-redesign/pants-render.jpg"
                imageAlt="Style Factory uniform assortment and workwear trends"
                keywords={[
                    "uniform trends",
                    "workwear inspiration",
                    "hospitality uniforms",
                    "corporate uniforms",
                    "custom uniforms Croatia",
                ]}
                jsonLd={[
                    createOrganizationJsonLd(),
                    createWebsiteJsonLd(locale),
                    createBreadcrumbJsonLd({
                        locale,
                        items: [
                            {name: "Home", path: "/"},
                            {name: "Uniform Trends", path},
                        ],
                    }),
                    createWebPageJsonLd({
                        path,
                        title,
                        description,
                        locale,
                        pageType: "CollectionPage",
                        image: "/images/home-redesign/pants-render.jpg",
                        mainEntity: itemList,
                    }),
                ]}
            />
            <NavigationLayout>
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{
                        ease: "linear",
                        duration: 1,
                    }}
                >
                    <PostList blogs={blogs ?? []} bucket={BlogBuckets.trends}/>
                </motion.div>
                <CreateBlogFormModal path={BlogBuckets.trends}/>
            </NavigationLayout>
        </>
    );
}

export async function getServerSideProps({locale}: GetServerSidePropsContext) {
    return {
        props: {
            messages:
            (await import(`@/locales/${locale}.json`)).default,
            blogs: await fetchBlogs(BlogBuckets.trends)
        }
    };
}
