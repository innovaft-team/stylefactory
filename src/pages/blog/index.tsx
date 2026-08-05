import { BlogBuckets, fetchBlogs } from "@/hooks/useListBlogs";
import { PostList } from "@/components/PostList";
import { CreateBlogFormModal } from "@/components/CreateBlogForm";
import { NavigationLayout } from "@/components/layout/NavigationLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { SeoHead } from "@/components/SeoHead";
import {
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createOrganizationJsonLd,
  createWebPageJsonLd,
  createWebsiteJsonLd,
} from "@/utils/seo";
import { getPostTitle, getUniquePostSlug } from "@/utils/posts";
import { useRouter } from "next/router";

const Index = ({
  blogs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const t = useTranslations("projects.meta");
  const { locale } = useRouter();
  const title = t("title");
  const description = t("description");
  const path = "/blog";
  const itemList = createItemListJsonLd({
    path,
    locale,
    items: (blogs ?? []).map((blog) => ({
      slug: getUniquePostSlug(blog, blogs ?? []),
      title: getPostTitle(blog, locale),
      image: blog.images?.[0],
      imageAlt:
        blog.coverImageAlt ||
        `${getPostTitle(blog, locale)} - Style Factory uniform project`,
    })),
  });

  return (
    <Box>
      <SeoHead
        title={title}
        description={description}
        path={path}
        image="/images/home-redesign/fabric-board.jpg"
        imageAlt="Style Factory uniform design and partner projects"
        keywords={[
          "uniform projects",
          "hospitality uniforms",
          "hotel uniforms",
          "corporate workwear",
          "Style Factory partners",
        ]}
        jsonLd={[
          createOrganizationJsonLd(),
          createWebsiteJsonLd(locale),
          createBreadcrumbJsonLd({
            locale,
            items: [
              { name: "Home", path: "/" },
              { name: "Projects and Partners", path },
            ],
          }),
          createWebPageJsonLd({
            path,
            title,
            description,
            locale,
            pageType: "CollectionPage",
            image: "/images/home-redesign/fabric-board.jpg",
            mainEntity: itemList,
          }),
        ]}
      />
        {/* Spacing for this page only — /trends keeps PostList's defaults. */}
        <PostList
          blogs={blogs ?? []}
          bucket={BlogBuckets.blogs}
          paddingTop={{ mobile: "60px", desktop: "60px" }}
          paddingBottom={{ mobile: "50px", desktop: "50px" }}
        />
        <CreateBlogFormModal path={BlogBuckets.blogs} />
    </Box>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`@/locales/${locale}.json`)).default,
      blogs: await fetchBlogs(BlogBuckets.blogs),
    },
  };
}

export default Index;
