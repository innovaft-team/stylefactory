import { ActiveLink } from "./ActiveLink";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useTranslations } from "next-intl";
import { ChakraLogoSmIcon } from "@/components/atoms/icons";

export const Navigation = () => {
  const t = useTranslations("nav");

  return (
    <header className="lg:flex lg:justify-end lg:items-center absolute w-full z-999 top-0 bg-white border-b border-[#e5e5e0] py-4 xl:h-24.25">
      <div className="flex w-full items-center justify-between px-8 h-full lg:mt-10">
        <div className="lg:hidden flex items-center">
          <a
            href="/"
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-108 inline-block"
          >
            <ChakraLogoSmIcon className="size-14" />
          </a>
        </div>
        <nav className="flex items-center gap-12 h-full ml-auto">
          <ActiveLink href="/">{t("home")}</ActiveLink>
          <ActiveLink href="/trends">{t("portfolio")}</ActiveLink>
          <ActiveLink href="/blog">{t("projects")}</ActiveLink>

          <div className="self-center">
            <LanguagePicker />
          </div>
        </nav>
      </div>
    </header>
  );
};
