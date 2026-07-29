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
  const { children, ...radioProps } = props;
  const { getInputProps, getRadioProps, state } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();
  const isChecked = state?.isChecked;

  return (
    <Box as="label" className="relative cursor-pointer">
      <input {...input} />
      <Box
        {...checkbox}
        fontSize={{ base: "14px", lg: "16px" }}
        _checked={{
          bg: "transparent",
          fontWeight: "bold",
        }}
        px={1}
        className={`
          relative
          after:content-['']
          after:absolute
          after:bottom-[-6px]
          after:left-0
          after:w-full
          after:h-[2px]
          after:bg-current
          after:transition-transform
          after:duration-300
          after:ease-out
          ${isChecked ? "after:scale-x-100" : "after:scale-x-0"}
        `}
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
      router.push(router.pathname as any, router.pathname as any, { locale: val as Locale }),
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
          >
            {/*@ts-ignore */}
            {t(`languages.${value}`)}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
