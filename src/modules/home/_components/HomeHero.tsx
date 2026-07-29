import { Box, Img, Text } from "@chakra-ui/react";
import { poppins } from "@/fonts";

export const HomeHero = () => {
  return (
    <Box className="relative pb-0">
      <Img
        className="w-screen h-[30vh] md:h-[70vh] xl:h-[110vh] object-cover flex"
        src="/images/aboutimages/1-crop2.jpg"
      />
      <Text
        className="absolute bottom-1/2 translate-y-1/2 left-2 xl:left-0 -ml-3 text-[36px] md:text-[80px] xl:text-[160px] text-[#D1C9C6] font-bold"
        fontFamily={poppins.style.fontFamily}
      >
        Modern
        <br />
        Uniforms
      </Text>
    </Box>
  );
};
