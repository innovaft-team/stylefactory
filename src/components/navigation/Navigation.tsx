import { HStack, Img } from "@chakra-ui/react";
import {
  ChakraLogoIcon,
  ChakraLogoLgIcon,
  ChakraLogoSmIcon,
} from "../atoms/icons";
import { ActiveLink } from "./ActiveLink";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useTranslations } from "next-intl";

export const Navigation = () => {
  const t = useTranslations("nav");
  return (
    <HStack
      maxW={"1920px"}
      justifyContent={"space-between"}
      px={"8"}
      as={"header"}
      w={"full"}
      zIndex={"1000"}
      position={"fixed"}
      top={"10"}
      background={"transparent"}
      pt={4}
    >
      <ChakraLogoSmIcon boxSize={14} />

      <HStack as={"nav"} spacing={"12"} pt={"4"}>
        <ActiveLink href={"/"}>{t("home")}</ActiveLink>
        <ActiveLink href={"/trends"}>{t("portfolio")}</ActiveLink>
        <ActiveLink href={"/blog"}>{t("projects")}</ActiveLink>
        <LanguagePicker alignSelf={"start"} />
      </HStack>
    </HStack>
  );
};
