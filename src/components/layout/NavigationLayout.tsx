"use client";

import { PropsWithChildren } from "react";
import { MobileNavigation } from "../navigation/MobileNavigation";
import { Navigation } from "../navigation/Navigation";
import { Contact } from "../Contact bar/Contact";
import { useTranslations } from "next-intl";
import { montserrat } from "@/fonts";
import { ChakraLogoSmIcon } from "../atoms/icons";

export const NavigationLayout = ({ children }: PropsWithChildren) => {
  const t = useTranslations("nav");

  return (
    <div
      className={`
        ${montserrat.className}
        grid
        grid-rows-[1fr]
        w-full
        h-full
        max-w-[1920px]
        min-h-max
        place-items-center
        place-self-center
        overflow-hidden
        rounded
      `}
    >
      <div
        className="
          relative
          grid
          w-full
          h-full
          justify-stretch
          lg:grid-cols-[auto_minmax(0,1fr)]
        "
      >
        {/* Left Sidebar */}
        <div
          className="
            hidden
            lg:flex
            flex-col
            items-center
            px-2
            md:px-12
            pt-16
          "
        >
          {/* Logo */}
          <div className="flex justify-center mb-16">
            <ChakraLogoSmIcon className="size-14" />
          </div>

          {/* Vertical Text */}
          <p
            className="
              hidden
              md:block
              text-[14px]
              [writing-mode:vertical-rl]
              rotate-180
              mb-16
            "
          >
            {t("sidebar.professionalUniforms")}
          </p>

          {/* Icons */}
          <div className="flex justify-center">
            <Contact />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative w-full h-full">
          {/* Desktop Navigation */}

          {/* Mobile Navigation */}
          <div className="block md:hidden absolute top-0 left-0 w-full z-[1000]">
            <MobileNavigation />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
