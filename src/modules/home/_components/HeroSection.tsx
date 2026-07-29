import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden h-dvh md:h-[97dvh] flex justify-start items-end pb-4 sm:pb-6 px-4 sm:px-5 xl:px-10  md:mt-7 max-sm:-mt-22">
      <Image
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover z-0 object-[60%_center] md:object-center"
        src="/images/home-redesign/hero.png"
        unoptimized
        width={3840}
        height={2160}
        alt="hero"
      />
      <div className="relative z-10 w-full">
        <div className="w-full max-w-300 text-white text-center md:text-left mx-auto md:mx-0">
          <a
            href="#"
            className=" md:hidden text-[25px] sm:text-3xl md:text-4xl lg:text-[54px] xl:text-[74px] font-bold leading-[130%]"
          >
            Beyond Uniforms. <br /> It&apos;s Your Brand Identity.
          </a>
          <p className="hidden md:block text-[25px] sm:text-3xl md:text-4xl lg:text-[54px] xl:text-[74px] font-bold leading-[130%]">
            Beyond Uniforms. <br /> It&apos;s Your Brand Identity.
          </p>
          <p className="mt-30 sm:mt-6 xl:mt-10 max-w-120 leading-[140%]  mx-auto md:mx-0 max-sm:text-sm">
            From concept to delivery, we shape every collection to reflect your
            brand <br className="sm:hidden" /> standards.
          </p>
          <p className="mt-6 sm:mt-3 xl:mt-6 max-w-100 leading-[140%] mx-auto md:mx-0 max-sm:text-sm ">
            Creating professional uniforms for hospitality and corporate teams,
            we combine quality, comfort, and contemporary{" "}
            <br className="sm:hidden" /> design.
          </p>
        </div>
      </div>
    </section>
  );
};
