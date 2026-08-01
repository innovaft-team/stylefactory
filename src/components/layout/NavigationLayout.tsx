"use client";

import { PropsWithChildren } from "react";
import { MobileNavigation } from "../navigation/MobileNavigation";
import { Navigation } from "../navigation/Navigation";
import { Contact } from "../Contact bar/Contact";
import { useTranslations } from "next-intl";
import { montserrat } from "@/fonts";
import { ChakraLogoSmIcon } from "../atoms/icons";
import Link from "next/link";

type NavigationLayoutProps = PropsWithChildren<{
  /**
   * The home page anchors its own desktop navigation inside its scrolling
   * shell, so it opts out of the one rendered here.
   */
  showDesktopNavigation?: boolean;
}>;

export const NavigationLayout = ({
  children,
  showDesktopNavigation = true,
}: NavigationLayoutProps) => {
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
            md:px-8
            pt-16
          "
        >
          {/* Logo */}
          <div className="flex justify-center mb-16">
            <Link
              href="/"
              className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-108 inline-block"
            >
              <ChakraLogoSmIcon className="size-14" />
            </Link>
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
              font-semibold
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
          {showDesktopNavigation ? (
            <div className="hidden md:block absolute top-0 left-0 w-full z-999">
              <Navigation />
            </div>
          ) : null}

          {/* Mobile Navigation */}
          <div className="block md:hidden absolute top-0 left-0 w-full z-1000">
            <MobileNavigation />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
