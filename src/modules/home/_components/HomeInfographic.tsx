import {Box, Img, useBreakpointValue} from "@chakra-ui/react";
import { useRouter } from "next/router";

export const HomeInfographic = () => {
    const {locale} = useRouter()

    console.log(locale);

    const src = useBreakpointValue<string>({
        base: `/images/infographic_mobile_${locale}.png`,
        xl: `/images/infographic_desktop_${locale}.png`
    })


    return (
        <Box w={"full"} px={{xl: 36}} pt={{xl: 36}}>
            <Img src={src}/>
        </Box>
    )
}