import {useTranslations} from "next-intl";
import {Grid, Img, Text, VStack} from "@chakra-ui/react";
import {cormorant_garamond, playfair} from "@/fonts";


export const WeCareMobile = () => {
    const t = useTranslations("home");

    return (
        <Grid data-section={"we-care-mobile"} hideFrom={"xl"}
              gridTemplateColumns={"repeat(2, 1fr)"}
              gridTemplateRows={"auto 575px"}
              backgroundPosition={"74% 100%"}
              backgroundSize={'cover'}
              backgroundRepeat={"no-repeat"}
              backgroundImage={"/images/placeholder3.jpg"}


        >
            <VStack
                fontFamily={cormorant_garamond.style.fontFamily}
                fontSize={{base: 16, lg: 28}}
                gridColumn={"1 / -1"}
                justifyContent={"center"}
                textAlign="center"
                pl={{base: 2, lg: 12}}
                spacing={4}
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
            <VStack
                mx={"auto"}
                w={"50vw"}
                justifyContent={"center"}
                textAlign={"center"}
                gap={{base: 8, sm: 0}}
                pt={{base: 12, md: 0}}
            >
                <Img
                    src="/images/aboutimages/7.png"
                    w={"full"}
                    placeSelf={{base: "end", sm: "start"}}
                />
                <Img src="/images/aboutimages/8.png" w={"50px"}/>
                <Img src="/images/aboutimages/9.png" w={"50px"}/>
                <Img src="/images/aboutimages/10.png" w={"50px"}/>

                <Text
                    placeSelf={"center"}
                    textAlign={"center"}
                    fontSize={{
                        base: "32",
                        sm: "32",
                        md: "56",
                        lg: "72",
                    }}
                    fontFamily={playfair.style.fontFamily}
                    fontWeight={900}
                    color={"#605f5f"}
                    py={{base: 2, md: 5}}
                >
                    We care. <br></br> You wear.
                </Text>
            </VStack>
            <Img h={"full"} src="/images/pants2.png"/>
        </Grid>
    )
}