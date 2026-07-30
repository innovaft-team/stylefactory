import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import { open_sans } from "@/fonts";

export function WhatWeDoSection() {
  const t = useTranslations("home.whatWeDo");

  return (
    <section className="relative overflow-hidden bg-white min-h-auto py-2.5 px-0 pb-7 md:min-h-auto md:p-0 xl:min-h-auto xl:pb-28">
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
      <div className="absolute inset-x-0 top-0 h-20 md:h-50 z-0 pointer-events-none bg-linear-to-b from-black/45 to-transparent" />

      {/* Section Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 z-3 pointer-events-none top-5.25 md:top-14.5 text-center">
        <h2
          className={`text-xl md:text-[33px] font-medium uppercase relative z-20`}
        >
          <span className="text-[#181818]">{t("headingStrong")}</span>{" "}
          <span className="text-[#48443e]/58">{t("headingLight")}</span>
        </h2>
        <div className="w-20 h-[1.5px] bg-[#48443e]/18 mx-auto mt-2 md:hidden" />
      </div>

      {/* Main Layout Grid */}
      <div className="block md:grid relative z-1 items-start overflow-visible min-h-auto md:min-h-auto xl:min-h-auto mt-1 md:pt-20 xl:pt-0 gap-0 grid-cols-1 md:grid-cols-[minmax(120px,1fr)_minmax(400px,660px)_minmax(120px,1fr)] xl:grid-cols-[minmax(300px,1fr)_minmax(580px,660px)_minmax(300px,1fr)]">
        {/* Left Visual: Jacket */}
        <Reveal
          amount={0.28}
          className="block min-w-0 overflow-visible self-start justify-self-start absolute -left-27.5 top-5 z-1 w-50 h-70 md:relative md:left-auto md:top-auto md:z-2 md:w-full md:h-105 md:m-0 xl:h-auto mix-blend-multiply"
        >
          <div
            className=" max-md:hidden absolute -top-26 xl:top-5 size-100 xl:size-150 -left-45 xl:-left-67 -z-10 mix-blend-multiply bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('/images/home-redesign/jacket.png')",
            }}
          />
        </Reveal>
        {/* Center Services list */}
        <div className=" xl:mt-30 w-full justify-self-center px-4">
          <div className="mx-auto flex items-center justify-center flex-col">
            <div className="relative">
              <Image
                className="pointer-events-none opacity-70 size-30 md:size-43"
                src={"/images/home-redesign/timeline-contour.png"}
                width={180}
                height={180}
                alt="timeline-contour"
              />
              <span className="mt-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-[33px] font-medium whitespace-nowrap">
                Design
              </span>
            </div>
            <p
              className={`max-w-125 text-center mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%] ${open_sans.className}`}
            >
              We create complete workwear solutions, from concept development
              and uniform design to comprehensive workwear standards manuals,
              ensuring consistency, a distinctive brand identity, and a
              polished, professional image for your team.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-center flex-col mt-4">
            <div className="relative">
              <Image
                className="pointer-events-none opacity-70 object-contain size-25 md:size-40.5"
                src={"/images/home-redesign/timeline-flower.png"}
                width={130}
                height={130}
                alt="timeline-flower"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-[33px] font-medium whitespace-nowrap">
                Development
              </span>
            </div>
            <p
              className={`max-sm:px-6 max-w-125 text-center mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%] ${open_sans.className}`}
            >
              From sourcing and production coordination to final delivery, we
              manage the complete development process for each project.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-center flex-col mt-4">
            <div className="relative">
              <Image
                className="pointer-events-none opacity-70 object-contain size-20 md:size-30"
                src={"/images/home-redesign/timeline-ring.png"}
                width={120}
                height={120}
                alt="timeline-flower"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-[33px] font-medium whitespace-nowrap">
                Production
              </span>
            </div>
            <p
              className={`max-w-125 text-center mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%] ${open_sans.className}`}
            >
              Through our manufacturing network, we support hospitality brands
              and uniform companies with sourcing, production coordination and
              project development.
            </p>
          </div>
        </div>

        {/* Right Visual: Sketch */}
        <Reveal delay={0.15} amount={0.28} className="">
          <div
            className="absolute -right-42 bottom-27 sm:-right-36 sm:bottom-30 min-[1000px]:-bottom-26 xl:bottom-5 size-70 sm:size-80 md:size-100 xl:top-76.5  xl:-right-41.75 xl:size-150 -z-10 mix-blend-multiply bg-center bg-no-repeat bg-cover min-[1000px]:-right-32 min-[1000px]:top-100"
            style={{
              backgroundImage: "url('/images/home-redesign/shirt-sketch.png')",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
