// 1. Create a component that consumes the `useRadio` hook
import {
  Box,
  BoxProps,
  Divider,
  HStack,
  StackProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { usePersistLocaleCookie } from "@/hooks/usePersistLocaleCookie";
import { ChakraEnIcon, ChakraHrIcon } from "@/components/atoms/icons";
import { useTranslations } from "next-intl";
import { Locale } from "nextjs-routes";

export function RadioCard(props: BoxProps) {
  const { children, borderBottom, ...radioProps } = props;
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" borderBottom={borderBottom}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        fontSize={{ base: "14px", lg: "16px" }}
        _checked={{
          bg: "transparent",
          fontWeight: "bold",
        }}
        px={1}
      >
        {children}
      </Box>
    </Box>
  );
}

const ImageIcon = (lang: string) => {
  switch (lang) {
    case "eng":
      return <ChakraEnIcon />;
    case "cro":
      return <ChakraHrIcon />;
    default:
      return <ChakraEnIcon />;
  }
};

export const LanguagePicker = (props: StackProps) => {
  const t = useTranslations("nav");

  const router = useRouter();
  usePersistLocaleCookie();
  const options = ["en", "hr"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: router.locale,
    // @ts-ignore
    onChange: (val) =>
      router.push(router.pathname, router.pathname, { locale: val as Locale }),
  });

  const group = getRootProps();

  return (
    <HStack alignSelf={"center"} {...group} {...props}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            {...radio}
            borderBottom={router.locale === value ? "1px solid black" : ""}
          >
            {/*@ts-ignore */}
            {t(`languages.${value}`)}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
