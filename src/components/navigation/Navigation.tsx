import { ActiveLink } from "./ActiveLink";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useTranslations } from "next-intl";

export const Navigation = () => {
  const t = useTranslations("nav");

  return (
    <header className="lg:flex lg:justify-end lg:items-center absolute w-full z-999 top-0 bg-white border-b border-[#e5e5e0] h-[97px]">
      <div className="flex w-full items-center justify-end px-8 h-full">
        <nav className="flex items-center gap-12 h-full">
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
