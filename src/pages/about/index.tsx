import {Box, Grid, HStack, Img, Stack, Text, VStack} from "@chakra-ui/react";
import {Scroll} from "../../components/layout/Scroll";
import {lato, playfair} from "../../fonts";
import {motion} from "framer-motion";
import {NavigationLayout} from "@/components/layout/NavigationLayout";
import {useEffect} from "react";
import {GetServerSidePropsContext} from "next";
import {useTranslations} from "next-intl";
import {SeoHead} from "@/components/SeoHead";
import {createBreadcrumbJsonLd, createOrganizationJsonLd, createWebPageJsonLd, createWebsiteJsonLd} from "@/utils/seo";
import {useRouter} from "next/router";

function scrollHandler() {
    const scrollableContainer = document.getElementById("about-scroll");
    const elements = document.querySelectorAll("#item");

    if (!elements || !scrollableContainer) return;

    // @ts-ignore
    elements.forEach((element: HTMLElement) => {
        const distanceToTop =
            scrollableContainer.scrollTop + element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        const scrollTop = scrollableContainer.scrollTop;
        let opacity = 1;

        //
        if (scrollTop > distanceToTop) {
            opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
        }
        //
        if (opacity >= 0) {
            element.style.opacity = opacity.toString();
        }
    });
}

function About() {
    const t = useTranslations("about");
    const {locale} = useRouter();
    const title = t("meta.title");
    const description = t("meta.description");

    useEffect(() => {
        const scrollElement = document.getElementById("about-scroll");
        if (!scrollElement) return;
        scrollElement.addEventListener("scroll", scrollHandler);

        return () => {
            scrollElement.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <>
            <SeoHead
                title={title}
                description={description}
                path="/about"
                image="/images/aboutimages/1.jpg"
                imageAlt="Style Factory textile agency and uniform design studio"
                keywords={[
                    "Style Factory",
                    "uniform design agency",
                    "textile agency Zagreb",
                    "custom uniform production",
                ]}
                jsonLd={[
                    createOrganizationJsonLd(),
                    createWebsiteJsonLd(locale),
                    createBreadcrumbJsonLd({
                        locale,
                        items: [
                            {name: "Home", path: "/"},
                            {name: "About", path: "/about"},
                        ],
                    }),
                    createWebPageJsonLd({
                        path: "/about",
                        title,
                        description,
                        locale,
                        pageType: "AboutPage",
                        image: "/images/aboutimages/1.jpg",
                    }),
                ]}
            />
            <NavigationLayout darkHero={false}>
                <Scroll
                    h="100vh"
                    position={"relative"}
                    pt={{
                        base: "0",
                        md: "8.4rem",
                    }}
                    id={"about-scroll"}
                    overflowX={"hidden"}
                >
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{
                            ease: "linear",
                            duration: 1,
                        }}
                        style={{
                            position: "relative",
                        }}
                    >
                        <VStack
                            spacing={{base: 5, lg: 10}}
                            fontSize={{base: "12px", md: "14px", xl: "20px"}}
                            alignItems={"stretch"}
                        >
                            <Box position={"relative"} pb={{base: 0, lg: 22}}>
                                <Img
                                    w={"full"}
                                    h={{base: "25vh", lg: "100vh"}}
                                    src="/images/aboutimages/1.jpg"
                                    objectFit={"cover"}
                                    display={"flex"}
                                ></Img>
                                <Text
                                    position={"absolute"}
                                    bottom={{base: "6", lg: 20}}
                                    left={{base: 6, lg: 14}}
                                    fontSize={{base: "16px", lg: "36px"}}
                                    w={{base: "50wv", lg: "30vw"}}
                                    fontFamily={lato.style.fontFamily}
                                >
                                    Modern uniforms <br></br> to improve your brand image.
                                </Text>
                            </Box>

                            <Stack
                                spacing={{base: 2, lg: 20}}
                                direction={{base: "row", lg: "row"}}
                                alignItems={{base: "center", lg: "center"}}
                                justifyContent={"center"}
                                w={{base: "full", md: "fit-content"}}
                                mx={"auto"}
                            >
                                <Img
                                    src="/images/aboutimages/2.jpg"
                                    w={"auto"}
                                    h={{base: "35vh", lg: "50vh"}}
                                ></Img>

                                <HStack spacing={{base: 0, lg: 20}}>
                                    <Text
                                        textAlign={"center"}
                                        css={{
                                            writingMode: "vertical-rl",
                                        }}
                                        fontSize={{base: "18px", md: "24px", lg: "30px"}}
                                        fontWeight={600}
                                    >
                                        Full service textile agency
                                    </Text>
                                    <VStack
                                        w={{base: "fit-content", md: "20vw"}}
                                        fontSize={{base: "10px", sm: "12px", lg: "16px"}}
                                    >
                                        <Text>{t("section1")}</Text>
                                        <Text>{t("section2")}</Text>
                                    </VStack>
                                </HStack>
                            </Stack>

                            <Grid
                                gridTemplateColumns={"repeat(2, 1fr)"}
                                mx={{lg: "24"}}
                                maxH={"100vh"}
                            >
                                <VStack alignItems={"end"} pr="2">
                                    <HStack w={"fit-content"} spacing={5} justifyContent={"end"}>
                                        <Text
                                            textAlign={"center"}
                                            fontSize={{base: "18px", md: "24px"}}
                                            fontWeight={600}
                                            css={{
                                                writingMode: "vertical-lr",
                                                transform: "rotate(180deg)",
                                            }}
                                        >
                                            Sustainability
                                        </Text>
                                        <Img
                                            width={"auto"}
                                            pr={{base: "4", lg: 0}}
                                            height={{base: "130px", lg: "220px"}}
                                            src="/images/aboutimages/3.jpg"
                                        ></Img>
                                    </HStack>
                                    <Text
                                        textAlign={"right"}
                                        pr="4"
                                        pl={{base: "5%", lg: "30%"}}
                                        fontSize={{
                                            base: "10px",
                                            sm: "12px",
                                            lg: "14px",
                                            xl: "16px",
                                        }}
                                    >
                                        {t("section3")}
                                    </Text>
                                </VStack>
                                <Box pt={{base: "45%", md: "30%", lg: "20%"}}>
                                    <Img
                                        src="/images/aboutimages/4.jpg"
                                        w={"auto"}
                                        maxH={"350px"}
                                    ></Img>
                                </Box>
                                <Img
                                    src="/images/aboutimages/5.jpg"
                                    boxSize={{base: "250px", lg: "600px"}}
                                    objectFit={"cover"}
                                    placeSelf={{base: "start", sm: "end"}}
                                />
                                <Text
                                    pl="4"
                                    fontSize={{base: "24px", lg: "36px"}}
                                    fontWeight={600}
                                    justifySelf={"start"}
                                    alignSelf={"end"}
                                    transform={"translateY(30%)"}
                                    css={{
                                        writingMode: "vertical-lr",
                                    }}
                                >
                                    Custom design
                                </Text>
                                <Grid
                                    gridTemplateColumns={"repeat(3, 1fr)"}
                                    gap={{base: "1", lg: "4"}}
                                    pl={{base: "0%", lg: "50%"}}
                                    pt={{base: "40%", lg: "15%"}}
                                    pr={4}
                                >
                                    <Img
                                        src="/images/aboutimages/7.png"
                                        gridColumn={"1 / -1"}
                                        placeSelf={{base: "end", sm: "start"}}
                                    />
                                    <Img src="/images/aboutimages/8.png"/>
                                    <Img src="/images/aboutimages/9.png"/>
                                    <Img src="/images/aboutimages/10.png"/>
                                </Grid>
                                <Text
                                    alignSelf={"center"}
                                    as="span"
                                    pr={{base: "2%", lg: "24%"}}
                                    pt={"16"}
                                    fontSize={{
                                        base: "10px",
                                        sm: "12px",
                                        lg: "14px",
                                        xl: "16px",
                                    }}
                                >
                                    <Text>{t("section4")}</Text>
                                    <Text>{t("section5")}</Text>
                                </Text>
                                <Text
                                    gridColumn={"1 / -1"}
                                    placeSelf={"center"}
                                    fontSize={{base: "32", sm: "32", md: "56", lg: "72"}}
                                    fontFamily={playfair.style.fontFamily}
                                    fontWeight={900}
                                    color={"#e2e2e2"}
                                    py={5}
                                >
                                    We care. You wear.
                                </Text>
                            </Grid>
                        </VStack>
                        <Img
                            src="/images/aboutimages/6.jpg"
                            w={{base: "60%", md: "40%", lg: "36%"}}
                            h="auto"
                            position={"absolute"}
                            top={{base: "68%", sm: "75%", lg: "80%"}}
                            right={{base: "10%", sm: "0%", md: "15%", lg: "18%"}}
                            zIndex={-1}
                        />
                    </motion.div>
                </Scroll>
            </NavigationLayout>
        </>
    );
}

export async function getServerSideProps({
                                             locale,
                                         }: GetServerSidePropsContext) {
    return {
        props: {
            messages: (await import(`@/locales/${locale}.json`)).default,
        },
    };
}

export default About;
