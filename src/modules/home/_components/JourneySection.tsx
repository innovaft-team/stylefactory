import React from "react";
import { poppins, montserrat, inter } from "@/fonts";
import Image from "next/image";

const JourneySection = () => {
  return (
    <>
      <section className="pt-21 relative bg-white">
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
              Sampling & Approval
            </h3>
            <p
              style={{ fontFamily: montserrat.style.fontFamily }}
              className="text-black mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
            >
              Once the design concept is confirmed, we develop prototypes and
              samples to ensure the perfect fit, comfort and final appearance
              before production begins.
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
          THE UNIFORM
          <span className="text-[#8C8476] font-normal">JOURNEY</span>
        </h3>
        <div className="flex items-center gap-16 mt-27.25">
          <div className="relative">
            <Image
              className="w-full max-w-100.5 h-149 object-cover"
              src={"/images/home-redesign/sub-footer-l.webp"}
              width={300}
              height={300}
              alt="sub-footer"
            />
            <div className="absolute opacity-54 -top-9 -right-3 z-30">
              <h2
                className="text-[255px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: inter.style.fontFamily }}
              >
                1
              </h2>
            </div>
          </div>
          <div className="max-w-71.75 relative z-20 -mt-20">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: montserrat.style.fontFamily }}
            >
              Brief & Consultation
            </h3>
            <p
              style={{ fontFamily: montserrat.style.fontFamily }}
              className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
            >
              We begin by understanding your brand, operational needs and team
              requirements. Through a detailed briefing process, we define the
              standards, functionality and visual direction of your uniform
              collection.
            </p>
          </div>
        </div>
        <div>
          <div className="absolute -mt-22 top-1/2 left-1/2 -translate-1/2 w-69 h-210 ">
            <Image
              src={"/images/home-redesign/sub-footer-c.webp"}
              width={400}
              height={400}
              alt="sub-footer"
              className="w-full h-full object-cover  translate-y-20"
            />
            <div className="absolute opacity-54 top-70 -left-28 z-30">
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
            Design Development
          </h3>
          <p
            style={{ fontFamily: montserrat.style.fontFamily }}
            className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
          >
            Every uniform concept is thoughtfully designed to reflect your brand
            identity. From sketches and fabric selection to styling and
            functionality, every detail is carefully considered.
          </p>
        </div>
        <div className="ml-22 mt-113.75 max-w-71.75 relative">
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: montserrat.style.fontFamily }}
          >
            Sizing & Production
          </h3>
          <p
            style={{ fontFamily: montserrat.style.fontFamily }}
            className="text-black max-w-125 mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
          >
            After sample approval, we collect sizing information for all team
            members and coordinate the full production process with our
            manufacturing partners.
          </p>
        </div>
        <div className="relative w-full h-[456px] -translate-y-50">
          {/* Centered Pants Image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-54.75 h-full">
            <Image
              className="w-full h-full"
              src={"/images/home-redesign/sub-footer-b.webp"}
              width={300}
              height={300}
              alt="sub-footer"
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
                Delivery
              </h3>
              <p
                style={{ fontFamily: montserrat.style.fontFamily }}
                className="text-black mt-4 font-normal text-sm sm:text-base md:text-lg leading-[140%]"
              >
                The finished uniforms are quality-checked, organized and
                delivered ready for your team to wear.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JourneySection;
