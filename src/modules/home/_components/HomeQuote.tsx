import {Box, Text, VStack} from "@chakra-ui/react";
import {allura, comforterBrush, mrsSaintDelafield, open_sans, qwitcherGrypen} from "@/fonts";
import {useTranslations} from "next-intl";


export const HomeQuote = () => {
    const t = useTranslations("home");

    return (
        <VStack
            px={{ base: "6", xl: "80" }}
            textAlign={"center"}
            h={{ base: "15vh", xl: "50vh" }}
            alignContent={"center"}
            justifyContent={"center"}
            backgroundImage={"/images/placeholder.jpg"}
            backgroundSize={"cover"}
            backgroundRepeat="no-repeat"
            w={"full"}
        >
            <Text
                fontFamily={open_sans.style.fontFamily}
                fontSize={{ base: 10, md: 18, xl: 32 }}
                pb={{ base: 0, xl: 2
                 }}
                fontWeight={400}
            >
                &quot;{t("p1")}&quot;
            </Text>

            <Text
                alignSelf={"end"}
                fontFamily={qwitcherGrypen.style.fontFamily}
                fontSize={{ base: 6, lg: 24 }}
                textAlign={"right"}
                pr={12}
            >
                Style Factory Team
            </Text>
        </VStack>
    )
}