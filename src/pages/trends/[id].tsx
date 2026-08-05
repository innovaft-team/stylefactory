import { BlogBuckets, fetchBlogs } from "@/hooks/useListBlogs";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, chakra, CloseButton, Text, VStack } from "@chakra-ui/react";
import { DialogMenu } from "@/components/DialogMenu";
import { Carousel } from "@/components/Carousel/Carousel";
import { cormorant_garamond, open_sans, playfair } from "@/fonts";
import { useRouter } from "next/router";
import Link from "next/link";
import { SeoHead } from "@/components/SeoHead";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  createWebPageJsonLd,
  createWebsiteJsonLd,
  localizedPath,
} from "@/utils/seo";
import {
  getPostSeoData,
  getPostTitle,
  getUniquePostSlug,
  resolvePostByIdentifier,
} from "@/utils/posts";

/** Shared by the close button and the spacer that keeps the title centred. */
const CLOSE_BUTTON_SIZE = { base: "32px", lg: "40px" };

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  const identifier = (params?.id as string) ?? "";
  const blogs = await fetchBlogs(BlogBuckets.trends);
  const blog = resolvePostByIdentifier(blogs, identifier);

  if (!blog?.eng || !blog?.cro) {
    return {
      notFound: true,
    };
  }

  const postSeo = await getPostSeoData(blog, locale);
  const slug = getUniquePostSlug(blog, blogs);

  if (identifier !== slug) {
    return {
      redirect: {
        destination: localizedPath(`/trends/${slug}`, locale),
        permanent: true,
      },
    };
  }

  return {
    props: {
      messages: (await import(`@/locales/${locale}.json`)).default,
      blog,
      postHtml: postSeo.html,
      seoDescription: postSeo.description,
      seoTitle: postSeo.seoTitle,
      slug,
    },
  };
}

const BlogPage = ({
  blog,
  postHtml,
  seoDescription,
  seoTitle,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { locale } = router;
  const title = getPostTitle(blog, locale);
  const path = `/trends/${slug}`;
  const image = blog.images?.[0] ?? "/images/home-redesign/pants-render.jpg";
  const imageAlt =
    blog.coverImageAlt || `${title} - Style Factory uniform trend`;

  return (
    <Box>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={image}
        imageAlt={imageAlt}
        type="article"
        keywords={[
          "uniform trend",
          "workwear trend",
          "hospitality uniforms",
          "Style Factory uniforms",
        ]}
        publishedTime={blog.postedAt}
        jsonLd={[
          createOrganizationJsonLd(),
          createWebsiteJsonLd(locale),
          createBreadcrumbJsonLd({
            locale,
            items: [
              { name: "Home", path: "/" },
              { name: "Uniform Trends", path: "/trends" },
              { name: title, path },
            ],
          }),
          createWebPageJsonLd({
            path,
            title,
            description: seoDescription,
            locale,
            image,
          }),
          createArticleJsonLd({
            path,
            title,
            description: seoDescription,
            images: blog.images,
            locale,
            publishedAt: blog.postedAt,
            imageAlt,
          }),
        ]}
      />
      <Box
        as={"article"}
        position={"relative"}
        w="100%"
        h="100vh"
        pt={{ base: "110px", md: "120px" }}
        overflow={"hidden"}
        bg={"white"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        itemScope
        itemType={"https://schema.org/BlogPosting"}
      >
        <DialogMenu
          blog={blog}
          onDelete={() => router.back()}
          path={BlogBuckets.trends}
        />

        {/* Title row - the close button sits in flow at the top right */}
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={{ base: 3, lg: 5 }}
          px={{ base: 5, lg: 10 }}
          pt={{ base: 2, md: 4, lg: 6 }}
          pb={0}
          flexShrink={0}
        >
          {/* Mirrors the close button so the title stays centred */}
          <Box boxSize={CLOSE_BUTTON_SIZE} flexShrink={0} aria-hidden />
          <Text
            as={"h1"}
            flex={1}
            fontFamily={playfair.style.fontFamily}
            fontSize={{ base: "1.8rem", md: "2.5rem", lg: "3.5rem" }}
            itemProp="headline"
            color={"#988C81"}
            fontWeight={700}
            letterSpacing={{ base: 1, lg: 3 }}
            lineHeight={1.1}
            textAlign={"center"}
          >
            {title}
          </Text>
          <CloseButton
            as={Link}
            href={{
              pathname: "/trends",
              hash: blog.id,
            }}
            boxSize={CLOSE_BUTTON_SIZE}
            flexShrink={0}
          />
        </Box>

        {/* Full-width media - keeps its aspect ratio, never cropped */}
        <Box
          position={"relative"}
          w={"100%"}
          flex={1}
          minH={0}
          overflow={"hidden"}
        >
          {blog.isVideo ? (
            <chakra.video
              src={blog.images[0]}
              title={`${imageAlt} video`}
              aria-label={`${imageAlt} video`}
              w={"100%"}
              h={"auto"}
              maxH={"100%"}
              objectFit={"contain"}
              preload="metadata"
              controls
            />
          ) : (
            <Carousel
              items={blog.images}
              imageAlt={imageAlt}
              fit={"contain"}
              w={"100%"}
              maxH={"100%"}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPage;

