import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { open_sans } from "@/fonts";
import { Reveal, REVEAL_EASE, useSoftScaleVariants } from "@/components/Reveal";

const services = [
  {
    key: "design",
    itemHeightClass: "min-h-[146px] md:min-h-[286px]",
    copySpacingClass:
      "mt-[16px] xl:mt-[58px] max-w-[260px] md:max-w-[420px] xl:max-w-[590px]",
    medallionClass: "top-[30px] md:top-[2px]",
    medallionSizeClass: "w-[132px] h-[112px] md:w-[260px] md:h-[220px]",
    medallionBg: "url('/images/home-redesign/timeline-contour.png')",
    medallionRotate: "",
  },
  {
    key: "development",
    itemHeightClass: "min-h-[146px] md:min-h-[314px]",
    copySpacingClass:
      "mt-[16px] xl:mt-[104px] max-w-[260px] md:max-w-[420px] xl:max-w-[650px]",
    medallionClass: "top-[30px] md:top-[16px]",
    medallionSizeClass: "w-[92px] h-[126px] md:w-[172px] md:h-[236px]",
    medallionBg: "url('/images/home-redesign/timeline-flower.png')",
    medallionRotate: "",
  },
  {
    key: "production",
    itemHeightClass: "min-h-[142px] md:min-h-[250px]",
    copySpacingClass:
      "mt-[16px] xl:mt-[84px] max-w-[260px] md:max-w-[420px] xl:max-w-[640px]",
    medallionClass: "top-[30px] md:top-[16px]",
    medallionSizeClass: "w-[104px] h-[104px] md:w-[214px] md:h-[214px]",
    medallionBg: "url('/images/home-redesign/timeline-ring.png')",
    medallionRotate: "",
  },
] as const;

export function WhatWeDoSection() {
  const t = useTranslations("home.whatWeDo");
  const softScale = useSoftScaleVariants();

  return (
    <section className="relative overflow-hidden bg-white min-h-auto py-2.5 px-0 pb-7 md:min-h-auto md:p-0 xl:min-h-295">
      {/* Seam Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(38deg,transparent,0,48.5%,rgba(44,44,44,0.04),49%,transparent 50%), linear-gradient(142deg,transparent,0,48.5%,rgba(44,44,44,0.035),49%,transparent,50%)",
          backgroundSize: "168px 168px",
        }}
      />

      {/* Top Dark Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-50 z-0 pointer-events-none bg-linear-to-b from-black/45 to-transparent" />

      {/* Section Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 z-3 pointer-events-none top-5.25 md:top-14.5">
        <h2 className={`md:text-[30px] font-medium uppercase`}>
          <span className="text-[#181818]">{t("headingStrong")}</span>{" "}
          <span className="text-[#48443e]/58">{t("headingLight")}</span>
        </h2>
      </div>

      {/* Main Layout Grid */}
      <div className="block md:grid relative z-1 items-start overflow-visible min-h-auto md:min-h-auto xl:min-h-290 md:pt-35 xl:pt-0 gap-0 grid-cols-1 md:grid-cols-[minmax(120px,1fr)_minmax(400px,660px)_minmax(120px,1fr)] lg:grid-cols-[minmax(300px,1fr)_minmax(580px,660px)_minmax(300px,1fr)]">
        {/* Left Visual: Jacket */}
        <Reveal
          amount={0.28}
          className="block min-w-0 overflow-visible self-start justify-self-start absolute -left-27.5 top-5 z-1 w-50 h-70 md:relative md:left-auto md:top-auto md:z-2 md:w-full md:h-105 md:m-0 xl:h-195 mix-blend-multiply"
        >
          <div
            className="w-full h-full min-h-full m-0 bg-contain bg-center bg-no-repeat md:w-60 md:min-h-100 md:mt-12.5 md:-ml-20 xl:w-130 xl:min-h-183.75 xl:mt-18.5 xl:-ml-40 xl:bg-position-[84%_-48px] xl:bg-size-[790px_auto] shadow-none mix-blend-multiply"
            style={{
              backgroundImage: "url('/images/home-redesign/jacket.png')",
            }}
          />
        </Reveal>
        {/* Center Services list */}
        <div className="relative md:static z-2 self-start justify-self-center w-full flex flex-col justify-start pt-18 px-4 pb-0 mt-0 min-h-auto md:pt-15 md:p-0 md:min-h-auto md:max-w-145 md:self-center md:justify-self-center xl:pt-62 xl:max-w-165 xl:min-h-265 xl:self-start space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className={`w-full ${service.itemHeightClass}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={softScale}
              transition={{
                duration: 0.72,
                delay: index * 0.12,
                ease: REVEAL_EASE,
              }}
            >
              <div className="w-full flex flex-col items-center relative text-center">
                <div className="relative w-full flex items-center justify-center">
                  {/* Medallion decoration background */}
                  <div
                    className={`absolute z-0 bg-center bg-no-repeat bg-contain mix-blend-multiply pointer-events-none opacity-100 left-1/2 top-1/2 ${service.medallionSizeClass}`}
                    style={{
                      backgroundImage: service.medallionBg,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  {/* Title */}
                  <h3
                    className={`text-[#050505] font-normal tracking-normal relative z-1 text-[26px] leading-[1.08] md:text-[48px] md:leading-[1.04] [text-shadow:0_1px_24px_rgba(255,255,255,0.82)] md:text-shadow-none`}
                  >
                    {t(`services.${service.key}.title`)}
                  </h3>
                </div>
                {/* Copy */}
                <p
                  className={`mx-auto text-[rgba(18,18,18,0.88)] mt-22 max-w-120.25 tracking-normal relative z-1  font-medium`}
                >
                  {t(`services.${service.key}.copy`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Visual: Sketch */}
        <Reveal
          delay={0.15}
          amount={0.28}
          className="block min-w-0 overflow-visible self-start justify-self-end absolute -right-27.5 bottom-5 top-auto z-1 w-55 h-75 md:relative md:right-auto md:bottom-auto md:top-auto md:z-1 md:w-full md:h-105 md:m-0 md:self-end xl:h-225 xl:self-start mix-blend-multiply"
        >
          <div
            className="w-full h-full min-h-full m-0 bg-contain bg-center bg-no-repeat md:w-75 md:min-h-105 md:mt-auto md:mb-12.5 md:-mr-30 xl:w-162.5 xl:min-h-190 xl:mt-71.5 xl:mb-0 xl:-mr-61.5 xl:bg-top-left xl:bg-size-[705px_auto] shadow-none mix-blend-multiply opacity-[0.86]"
            style={{
              backgroundImage: "url('/images/home-redesign/shirt-sketch.png')",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
