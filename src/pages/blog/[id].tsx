import {BlogBuckets, fetchBlogs} from "@/hooks/useListBlogs";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {Box, CloseButton, Text, VStack, chakra} from "@chakra-ui/react";
import {DialogMenu} from "@/components/DialogMenu";
import {Carousel} from "@/components/Carousel/Carousel";
import {cormorant_garamond, open_sans, playfair} from "@/fonts";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {NavigationLayout} from "@/components/layout/NavigationLayout";
import Link from "next/link";
import {SeoHead} from "@/components/SeoHead";
import {
    createArticleJsonLd,
    createBreadcrumbJsonLd,
    createOrganizationJsonLd,
    createWebPageJsonLd,
    createWebsiteJsonLd,
    localizedPath
} from "@/utils/seo";
import {getPostSeoData, getPostTitle, getUniquePostSlug, resolvePostByIdentifier} from "@/utils/posts";


export async function getServerSideProps({locale, params}: GetServerSidePropsContext) {
    const identifier = params?.id as string ?? "";
    const blogs = await fetchBlogs(BlogBuckets.blogs);
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
                destination: localizedPath(`/blog/${slug}`, locale),
                permanent: true,
            },
        };
    }

    return {
        props: {
            messages:
            (await import(`@/locales/${locale}.json`)).default,
            blog,
            postHtml: postSeo.html,
            seoDescription: postSeo.description,
            seoTitle: postSeo.seoTitle,
            slug,
        }
    };
}

const AnimatedBox = motion(Box);

const BlogPage = ({blog, postHtml, seoDescription, seoTitle, slug}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const isPair = Math.random() < 0.5;

    const {locale} = useRouter()
    const title = getPostTitle(blog, locale);
    const path = `/blog/${slug}`;
    const image = blog.images?.[0] ?? "/images/home-redesign/fabric-board.jpg";
    const imageAlt = blog.coverImageAlt || `${title} - Style Factory uniform project`;

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
                    "uniform project",
                    "hospitality uniforms",
                    "custom workwear",
                    "Style Factory uniforms",
                ]}
                publishedTime={blog.postedAt}
                jsonLd={[
                    createOrganizationJsonLd(),
                    createWebsiteJsonLd(locale),
                    createBreadcrumbJsonLd({
                        locale,
                        items: [
                            {name: "Home", path: "/"},
                            {name: "Projects and Partners", path: "/blog"},
                            {name: title, path},
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
            <NavigationLayout>
                <AnimatedBox display={"grid"}
                             as={"article"}
                             gridTemplateColumns={{base: "1fr", lg: "repeat(2, 1fr)"}}
                             gridTemplateRows={{base: "repeat(2, auto)", lg: "1fr"}}
                             layoutId={blog.id.toString()}
                             position={"fixed"}
                             w='100vw'
                             h='100vh'
                             overflowY={"scroll"}
                             overflowX={'hidden'}
                             top={"0"}
                             left={"0"}
                             zIndex={"modal"}
                             bg={"white"}
                             gap={{base: 0, lg: 8}}
                             itemScope
                             itemType={'https://schema.org/BlogPosting'}
                >
                    <CloseButton
                        as={Link}
                        href={{
                            pathname: "/blog",
                            hash: blog.id
                        }}
                        w={"fit-content"}
                        zIndex={"9999"}
                        position={'fixed'}
                        p={"3"}
                        right={5}
                        top={5}
                    />
                    <DialogMenu blog={blog} onDelete={() => console.log("delete")} path={BlogBuckets.blogs}/>

                    {
                        blog.isVideo ? <chakra.video
                            src={blog.images[0]}
                            title={`${imageAlt} video`}
                            aria-label={`${imageAlt} video`}
                            gridColumn={{base: 1, lg: isPair ? 1 : 2}}
                            h={'auto'}
                            w={{base: '100vw', lg: 'full'}}
                            gridRow={{md: "1 / -1"}}
                            placeSelf={{base: "center", md: "center"}}
                            objectFit={"contain"}
                            preload="metadata"
                            controls
                        /> : <Carousel
                            items={blog.images}
                            imageAlt={imageAlt}
                            gridColumn={{base: 1, lg: isPair ? 1 : 2}}
                            h={{base: '50vh', md: '70vh', lg: "full"}}
                            w={{base: '100vw', lg: 'full'}}
                            gridRow={{md: "1 / -1"}}
                            placeSelf={{base: "center", md: "initial"}}
                        />
                    }
                    <VStack
                        spacing={8}
                        gridRow={{lg: "1 / -1"}}
                        px={'8'}
                        textAlign={"start"}
                        alignItems={"stretch"}
                        m={{base: 5, lg: 20}}
                        w={{base: '90vw', lg: '40vw'}}
                        justifyContent={"stretch"}>


                        <Text as={"h1"} fontFamily={playfair.style.fontFamily} fontSize={{base: '3em', lg: "4rem"}}
                              itemProp="headline"
                              color={"#988C81"} fontWeight={700} letterSpacing={2} lineHeight={1} textAlign={'center'}>
                            {title}
                        </Text>
                        <Text
                            as="p"
                            color="#5f5750"
                            fontFamily={open_sans.style.fontFamily}
                            fontSize={{base: "1rem", lg: "1.1rem"}}
                            fontWeight={600}
                            itemProp="description"
                            lineHeight={1.7}
                            textAlign="center"
                        >
                            {seoDescription}
                        </Text>
                        <Box itemProp="articleBody" dangerouslySetInnerHTML={{__html: postHtml ?? ''}} textAlign={'justify'} __css={{
                            'strong': {
                                fontFamily: playfair.style.fontFamily
                            },
                            'p': {
                                fontFamily: open_sans.style.fontFamily,
                                py: '1rem',

                            },
                            'h1': {
                                fontFamily: cormorant_garamond.style.fontFamily,
                            },
                            'h2': {
                                fontFamily: cormorant_garamond.style.fontFamily,
                            },
                        }}/>
                    </VStack>
                </AnimatedBox>
            </NavigationLayout>
        </Box>
    );
}


export default BlogPage;
