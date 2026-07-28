import {Grid, Img, Text, VStack} from "@chakra-ui/react";
import {cormorant_garamond, poppins} from "@/fonts";
import {useTranslations} from "next-intl";

export const PantsDesktop = () => {
    const t = useTranslations("home");

    return (
        <Grid gridTemplateColumns={"repeat(3, 1fr)"} gridTemplateRows={"900px auto"} hideBelow={"xl"}

        >
            <Img gridColumn={"1 / -1"} gridRow={"2"} zIndex={-1} w={"full"} objectFit={"cover"}/>

            <Img
                src="/images/homegrid/9.jpg"
                h={"full"}
                zIndex={10}
            />
            <VStack
                spacing={"0"}
                backgroundColor={"#bdb5ac"}
                justifyContent={"center"}
                alignItems={"start"}
                gridRow={"1 / 1"}
                gridColumn={"2 / 4"}
            >
                <Text
                    ml={-1.5}
                    color={"#D7D2CC"}
                    fontFamily={poppins.style.fontFamily}
                    fontWeight={700}
                    fontSize={{base: 38, lg: 92}}
                >
                    Improve
                    <br/>
                    your
                    <br/>
                    brand
                    <br/>
                    image
                </Text>
            </VStack>
            <Grid gridRow={"2 / 2"} gridTemplateColumns={"subgrid"}
                  bgImage={"/images/s2.png"}
                  bgSize={"cover"}
                  backgroundPosition={"100% 0%"}
                  bgRepeat={"no-repeat"}
                  gridColumn={"1 / -1"}
                  fontFamily={cormorant_garamond.style.fontFamily}
                  fontSize={{base: 16, lg: 28}}>
                <VStack
                    gridColumn={"1 / 3"}
                    justifyContent={"center"}
                    textAlign="center"
                    pl={{base: 2, lg: 12}}
                    spacing={12}
                    px={{base: 0, lg: 24}}
                >
                    <Text>{t("p5")}</Text>

                    <VStack justifyContent={"center"} textAlign={"center"}>
                        <Text>{t("p6")}</Text>
                        <Text>{t("p7")}</Text>
                        <Text>{t("p8")}</Text>
                        <Text>{t("p9")}</Text>
                    </VStack>

                    <Text>{t("p10")}</Text>
                </VStack>
            </Grid>

            <Img data-section={"pants-desktop"}
                 gridRow={"1 / 3"}
                 gridColumn={"3"}
                 zIndex={"1"}
                 justifySelf={"start"}
                 alignSelf={"end"}
                 pt={"65"}
                 pr={20}
                 pb={20}
                 src="/images/pants2.png" w="auto">
            </Img>

        </Grid>
    )
}