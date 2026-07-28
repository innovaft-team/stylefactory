import { Flex, Text } from "@chakra-ui/react";
import { playfair } from "@/fonts";
import { useTranslations } from "next-intl";

const ShapeYourBrandText = () => {
  const t = useTranslations("common");

  return (
    <Flex
      pointerEvents={"none"}
      height={"fit-content"}
      position="fixed"
      pr={{ base: "1rem" }}
      zIndex={100}
      right={{ base: 0, lg: 30, xl: 250 }}
      top={{ base: "18rem", lg: "15rem" }}
      flexDir={"row"}
      alignItems={"end"}
      justifyContent={"center"}
      textAlign={{ base: "right", md: "inherit" }}
      w={{ base: "150px", sm: "fit-content" }}
      display={{ base: "none", md: "block" }}
    >
      <Text
        aria-hidden="true"
        fontSize={{ base: "32", sm: "32", md: "56", lg: "72" }}
        alignSelf={"flex-start"}
        fontFamily={playfair.style.fontFamily}
        fontWeight={900}
        color={"rgba(18, 18, 18, 0.68)"}
        position={"absolute"}
        inset={0}
        sx={{
          WebkitFontSmoothing: "antialiased",
          WebkitTextFillColor: "rgba(18, 18, 18, 0.68)",
          WebkitTextStroke: "0.34px rgba(255, 255, 255, 0.48)",
          paintOrder: "stroke fill",
          textShadow: "0 0 8px rgba(255, 255, 255, 0.22)",
        }}
      >
        {t("shape")}
      </Text>
      <Text
        fontSize={{ base: "32", sm: "32", md: "56", lg: "72" }}
        alignSelf={"flex-start"}
        fontFamily={playfair.style.fontFamily}
        fontWeight={900}
        color={"white"}
        mixBlendMode={"difference"}
        opacity={1}
        position={"relative"}
        sx={{
          WebkitFontSmoothing: "antialiased",
          WebkitTextFillColor: "white",
          WebkitTextStroke: "0.28px rgba(255, 255, 255, 0.78)",
          filter: "contrast(1.35) brightness(1.04)",
          paintOrder: "stroke fill",
          textShadow:
            "0 0 1px rgba(255, 255, 255, 0.9), 0 0 10px rgba(255, 255, 255, 0.22)",
        }}
      >
        {t("shape")}
      </Text>
    </Flex>
  );
};

export default ShapeYourBrandText;
