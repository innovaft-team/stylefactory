import {Text, VStack} from "@chakra-ui/react";
import {cormorant_garamond} from "@/fonts";
import {useTranslations} from "next-intl";


export const HomeAbout = () => {
    const t = useTranslations("home");

    return (
        <VStack
            textAlign={"center"}
            py={{base: 6, xl: 20}}
            px={{base: 2, xl: 32}}
            spacing={{base: 2, lg: 6}}
            fontSize={{base: 18, lg: 32}}
            fontWeight={400}
        >
            <Text
                fontFamily={cormorant_garamond.style.fontFamily}

                pb={4}>
                {t("p2")}
            </Text>

            <Text
                fontFamily={cormorant_garamond.style.fontFamily}

                pb={4}

            >
                {t("p3")}
            </Text>

            <Text
                fontFamily={cormorant_garamond.style.fontFamily}

                pb={4}
            >
                {t("p4")}
            </Text>
        </VStack>
    )
}