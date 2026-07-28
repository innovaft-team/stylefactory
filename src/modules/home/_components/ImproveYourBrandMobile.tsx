import {Box, Grid, Img, Text, VStack} from "@chakra-ui/react";
import {cormorant_garamond, poppins} from "@/fonts";
import {useTranslations} from "next-intl";


export const ImproveYourBrandMobile = () => {
    const t = useTranslations("home");

    return <Grid maxH={{xs: "280px"}} gridTemplateColumns={"repeat(2, 1fr)"} hideFrom={"xl"}>
        <Box>
            <Img
                src="/images/homegrid/9.jpg"
                h={"auto"}
                w={"full"}
                position={'relative'}
                zIndex={10}
            />
        </Box>
        <VStack
            spacing={"0"}
            backgroundColor={"#bdb5ac"}
            justifyContent={"center"}
            alignItems={"start"}
            
        >
            <Text
                ml={'-0.1rem'}
                color={"#D7D2CC"}
                fontFamily={poppins.style.fontFamily}
                fontWeight={700}
                fontSize={{base: 38, lg: 92}}
            >
                Improve
                <br />
                 your 
                 <br />
                 brand 
                 <br />
                 image
            </Text>
        </VStack>
    </Grid>
}