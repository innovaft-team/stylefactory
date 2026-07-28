import {Box, Grid, Img} from "@chakra-ui/react";
import React from "react";


export const HomeGridImages = () => {
    return (
        <Grid
            gridTemplateColumns={"repeat(3, 1fr)"}
            gridTemplateRows={"repeat(3, 1fr)"}
            w={"full"}
            maxW={"100vw"}
        >
            {
                Array.from({length: 9}).map((_, index) => {
                    return  <Box key={index} w="100%" pb="100%" position="relative">
                        <Img
                            key={`img-${index}`}
                            src={`/images/homegrid/${index + 1}.jpg`}
                            alt={`Image ${index + 1}`}
                            boxSize="100%"
                            objectFit="cover"
                            position="absolute"
                            top="0"
                            left="0"
                        />
                    </Box>
                })
            }
        </Grid>
    )
}
