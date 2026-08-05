import {
  Box,
  BoxProps,
  HStack,
  StackProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { LOCALES } from "@/utils/seo";
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch";

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
          after:-bottom-1.5
          after:left-0
          after:w-full
          after:h-0.5
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

export const LanguagePicker = (props: StackProps) => {
  const t = useTranslations("nav");
  const { locale, switchLocale } = useLocaleSwitch();

  // Controlled by the router rather than by local radio state: a locale change
  // can also come from the mobile drawer, a back/forward navigation or a
  // canonical-slug redirect, and the underline has to follow all of them.
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "locale",
    value: locale,
    onChange: switchLocale,
  });

  const group = getRootProps();

  return (
    <HStack alignSelf={"center"} {...group} {...props}>
      {LOCALES.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {/*@ts-ignore */}
            {t(`languages.${value}`)}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
