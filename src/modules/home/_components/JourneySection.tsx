import React from "react";
import { poppins, montserrat, inter } from "@/fonts";
import Image from "next/image";

const JourneySection = () => {
  return (
    <>
      <section className="pt-21 relative bg-white">
        {/* Top Shadow Gradient Overlay */}
        <Image
          src={"/images/home-redesign/sub-footer-r.webp"}
          width={400}
          height={400}
          alt="sub-footer"
          className="absolute top-0 right-0"
        />
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
            <div className="absolute opacity-54 -top-10.25 -right-4 z-30">
              <h2
                className="text-[300px] font-black text-[#EAE7E2] leading-none"
                style={{ fontFamily: inter.style.fontFamily }}
              >
                1
              </h2>
            </div>
          </div>
          <div className="max-w-71.75">
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
        <div className="ml-22 mt-7.5 max-w-61.75">
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
      </section>
    </>
  );
};

export default JourneySection;
