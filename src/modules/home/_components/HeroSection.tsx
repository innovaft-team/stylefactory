import Image from "next/image";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden h-dvh md:h-[97dvh] flex justify-start items-end pb-4 sm:pb-6 px-4 sm:px-5 xl:px-7  md:mt-7 max-sm:-mt-22">
      <Image
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover z-0 object-[60%_center] md:object-center"
        src="/images/home-redesign/hero.png"
        alt={t("imageAlt")}
        fill
        priority
        quality={90}
        sizes="100vw"
      />
      <div className="relative z-10 w-full">
        <div className="w-full max-w-300 text-white text-center md:text-left mx-auto md:mx-0">
          {/* Inline below `md`, block from `md` up — matches the two elements this replaced. */}
          <h1 className="inline md:block text-[25px] sm:text-3xl md:text-4xl lg:text-[54px] xl:text-[74px] font-bold leading-[127%]">
            {t("titleLine1")} <br /> {t("titleLine2")}
          </h1>
          <p className="px-[3px] mt-30 sm:mt-6 xl:mt-13 max-w-120 leading-[140%]  mx-auto md:mx-0 max-sm:text-sm">
            {t.rich("p1", {
              br: () => <br className="sm:hidden" />,
            })}
          </p>
          <p className="px-[3px] mt-6 sm:mt-3 xl:mt-6 max-w-100 leading-[140%] mx-auto md:mx-0 max-sm:text-sm ">
            {t.rich("p2", {
              br: () => <br className="sm:hidden" />,
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
