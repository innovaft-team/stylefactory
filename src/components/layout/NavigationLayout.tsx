import {PropsWithChildren} from "react";
import {Grid, Show, Text, VStack} from "@chakra-ui/react";
import {Inter} from "next/font/google";
import {MobileNavigation} from "../navigation/MobileNavigation";
import {Navigation} from "../navigation/Navigation";
import {Contact} from "../Contact bar/Contact";
import {useTranslations} from "next-intl";
import { color } from "framer-motion";


const inter = Inter({subsets: ["latin"]});

export const NavigationLayout = ({children}: PropsWithChildren) => {
    const t = useTranslations("nav")

    return (
        <Grid gridTemplateRows={"1fr"}
              className={inter.className}
              borderRadius={"4"}
              maxW={"1920px"}
              placeSelf={"center"}
              w={"full"}
              h={"full"}
              overflow={"hidden"}
              placeItems={"center"}
              minH={"max-content"}
        >
            <Show above="md">
                <Navigation/>
            </Show>
            <Show below="md">
                <MobileNavigation/>
            </Show>

            <Grid
                w={"full"}
                h="full"
                gridTemplateColumns={{md: "auto minmax(0, 1fr)"}}
                justifyContent={"stretch"}
                position={"relative"}
            >
                <VStack px={{base: '2', md: '12'}} justifyContent={"space-between"} hideBelow={"lg"}>
                    <Text mt={{base: '15px', md: '150px'} }
                          display={{base: 'none', md: 'inherit'}}
                          css={{
                              writingMode: "vertical-rl",
                              fontSize: "14px",
                              transform: "rotate(180deg)",

                          }}
                    >
                        {t("sidebar.professionalUniforms")}
                    </Text>

                    <Contact/>
                </VStack>
                {children}
            </Grid>

        </Grid>
    )
}