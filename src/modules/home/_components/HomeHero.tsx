import {Box, Img, Text} from "@chakra-ui/react";
import {poppins} from "@/fonts";


export const HomeHero = () => {
    return (
        <Box position={"relative"} pb={{ base: 0, xl: 0 }}>
            <Img
                w={"100vw"}
                h={{ base: "30vh", md: "70vh", xl: "110vh" }}
                src="/images/aboutimages/1-crop2.jpg"
                objectFit={"cover"}
                display={"flex"}
            ></Img>
            <Text
                position={"absolute"}
                bottom={"50%"}
                transform={"translateY(50%)"}
                left={{ base: 2, xl: 0 }}
                ml={-3}
                fontSize={{ base: "36px", md: "80px", xl: "160px" }}
                fontFamily={poppins.style.fontFamily}
                color={"#D1C9C6"}
                fontWeight={"700"}
            >
                Modern
                <br/>
                Uniforms
            </Text>
        </Box>

    )
}