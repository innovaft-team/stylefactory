import {HStack, Img, Text, VStack} from "@chakra-ui/react";
import {playfair} from "@/fonts";


export const WeCareDesktop = () => {

    return <VStack w={"full"} alignItems={"center"} pt={"16"} hideBelow={"xl"}>
        <Img
            maxW={"500px"}
            src="/images/aboutimages/7.png"
        />
        <HStack>
            <Img src="/images/aboutimages/8.png" boxSize={24}/>
            <Img src="/images/aboutimages/9.png" boxSize={24}/>
            <Img src="/images/aboutimages/10.png" boxSize={24}/>
        </HStack>
        <Text
            fontSize={{base: "32", sm: "32", md: "56", lg: "72"}}
            fontFamily={playfair.style.fontFamily}
            fontWeight={900}
            color={"#605f5f"}
        >
            We care. You wear.
        </Text>
    </VStack>
}