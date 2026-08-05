import React from "react";
import { poppins, montserrat, inter, allura, notoSansJP } from "@/fonts";
import Image from "next/image";
import styles from "@/styles/HomeRedesign.module.css";
import JourneySectionMobile from "./JourneySectionMobile";
import { useTranslations } from "next-intl";

const JourneySection = () => {
  const t = useTranslations("home.journey");

  return (
    <div className={styles.journeyViewport}>
      <JourneySectionMobile />
      <section
        className={`${styles.journeyCanvas} max-sm:hidden pt-21 relative bg-white`}
      >
        {/* Top Shadow Gradient Overlay */}
        <div className="absolute top-0 right-0 h-357.5 max-w-185 w-full">
          <Image
            src={"/images/home-redesign/sub-footer-r.webp"}
            width={400}
            height={400}
            alt="sub-footer"
            className="w-full h-full"
          />
          <div className="absolute opacity-54 z-30 bottom-37 right-30">
            <h2
              className="text-[255px] font-black text-[#EAE7E2] leading-none"
              style={{ fontFamily: inter.style.fontFamily }}
            >
              3
            </h2>
          </div>
          {/* Step 3 Sampling & Approval content */}
          <div className="absolute -bottom-30 left-59 max-w-93.75 z-30">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: montserrat.style.fontFamily }}
            >
              {t("steps.sampling.title")}
            </h3>
            <p
              style={{ fontFamily: montserrat.style.fontFamily }}
              className="text-black mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
            >
              {t("steps.sampling.copy")}
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 h-12 pointer-events-none bg-linear-to-b from-black/6 to-transparent z-10" />
        <h3
          className="text-5xl leading-[150%] font-medium pl-10"
          style={{
            fontFamily: poppins.style.fontFamily,
          }}
        >
          {t("titleStrong")}
          <span className="text-[#8C8476] font-normal">{t("titleLight")}</span>
        </h3>
        <div className="flex items-center gap-16 mt-27.25">
          <div className="relative">
            <Image
              className="w-full max-w-100.5 h-149 object-cover"
              src={"/images/home-redesign/sub-footer-l.webp"}
              width={300}
              height={300}
              alt={t("visuals.consultation")}
            />
            <div className="absolute opacity-54 -top-14 -right-13 z-30">
              <h2
                className="text-[255px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: notoSansJP.style.fontFamily }}
              >
                1
              </h2>
            </div>
          </div>
          <div className="max-w-71.75 relative z-20 -mt-20">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: notoSansJP.style.fontFamily }}
            >
              {t("steps.brief.title")}
            </h3>
            <p
              style={{ fontFamily: notoSansJP.style.fontFamily }}
              className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
            >
              {t("steps.brief.copy")}
            </p>
          </div>
        </div>
        <div>
          <div className="absolute -mt-22 top-1/2 left-1/2 -translate-1/2 w-69 h-210 ">
            <Image
              src={"/images/home-redesign/sub-footer-c.webp"}
              width={400}
              height={400}
              alt={t("visuals.fabric")}
              className="w-full h-full object-cover  translate-y-20"
            />
            <div className="absolute opacity-54 top-70 -left-23 z-30">
              <h2
                className="text-[255px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: inter.style.fontFamily }}
              >
                2
              </h2>
            </div>
            <div className="absolute opacity-54 -bottom-46 -left-37 z-30">
              <h2
                className="text-[255px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: inter.style.fontFamily }}
              >
                4
              </h2>
            </div>
          </div>
        </div>
        <div className="ml-22 mt-20 max-w-61.75 relative">
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: montserrat.style.fontFamily }}
          >
            {t("steps.design.title")}
          </h3>
          <p
            style={{ fontFamily: montserrat.style.fontFamily }}
            className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
          >
            {t("steps.design.copy")}
          </p>
        </div>
        <div className="ml-22 mt-113.75 max-w-71.75 relative">
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: montserrat.style.fontFamily }}
          >
            {t("steps.production.title")}
          </h3>
          <p
            style={{ fontFamily: montserrat.style.fontFamily }}
            className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
          >
            {t("steps.production.copy")}
          </p>
        </div>
        <div className="relative w-full h-114 -translate-y-50">
          {/* Centered Pants Image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-54.75 h-full">
            <Image
              className="w-full h-full"
              src={"/images/home-redesign/sub-footer-b.webp"}
              width={300}
              height={300}
              alt={t("visuals.pants")}
            />
          </div>

          {/* Step 5 Delivery Copy to the right of centered image */}
          <div className="absolute left-[calc(50%+150px)] bottom-0 w-full max-w-72.75 z-20">
            <div className="relative">
              <h2
                className="absolute opacity-54 -z-10 -top-70 left-0 text-[255px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: inter.style.fontFamily }}
              >
                5
              </h2>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: montserrat.style.fontFamily }}
              >
                {t("steps.delivery.title")}
              </h3>
              <p
                style={{ fontFamily: montserrat.style.fontFamily }}
                className="text-black mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
              >
                {t("steps.delivery.copy")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Quote & Line */}
      <div className="max-sm:hidden flex flex-col items-center justify-center w-full z-20 relative bg-white pb-0 px-10 -mt-24">
        <p
          className="text-[42px] xl:text-[60px] text-center mb-6"
          style={{
            fontFamily: allura.style.fontFamily,
            color: "#8F8475",
          }}
        >
          {t("quote")}
        </p>
      </div>
      <hr className="max-sm:hidden w-full border-t-4 border-[#8C8476] block relative z-20 bg-white pb-12" />
    </div>
  );
};

export default JourneySection;
