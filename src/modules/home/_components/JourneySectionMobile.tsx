import React from "react";
import { poppins, montserrat, inter, allura } from "@/fonts";
import Image from "next/image";
import styles from "@/styles/HomeRedesign.module.css";

const ghost =
  "absolute z-0 opacity-54 text-[100px] font-black text-[#EAE7E2] leading-none";
const heading = "text-[11px] font-bold leading-none";
const copy = "mt-4 text-[10px] font-normal leading-[145%] text-black ";

const JourneySectionMobile = () => {
  return (
    <div className="sm:hidden bg-white">
      <section className={styles.journeyCanvasMobile}>
        <h3
          className="absolute top-3.5 inset-x-0 text-center text-[21px] font-medium leading-none"
          style={{ fontFamily: poppins.style.fontFamily }}
        >
          THE UNIFORM
          <span className="text-[#8C8476] font-normal"> JOURNEY</span>
        </h3>

        {/* 1 — Brief & Consultation */}
        <Image
          className="absolute left-2.75 top-18.5 w-42 h-65.25 object-cover"
          src={"/images/home-redesign/sub-footer-l.webp"}
          width={300}
          height={300}
          alt="sub-footer"
        />
        <span
          className={`${ghost} left-32 top-15`}
          style={{ fontFamily: inter.style.fontFamily }}
        >
          1
        </span>
        <div
          className="absolute left-46.25 top-23 w-38 z-10"
          style={{ fontFamily: montserrat.style.fontFamily }}
        >
          <h3 className={heading}>Brief &amp; Consultation</h3>
          <p className={copy}>
            We begin by understanding your brand, operational needs and team
            requirements. Through a detailed briefing process, we define the
            standards, functionality and visual direction of your uniform
            collection.
          </p>
        </div>

        {/* 2 — Design Development */}
        <Image
          className="absolute right-0 top-63.25 w-30.25 h-95 object-cover"
          src={"/images/home-redesign/sub-footer-c.webp"}
          width={400}
          height={400}
          alt="sub-footer"
        />
        <span
          className={`${ghost} left-68 top-86 z-30`}
          style={{ fontFamily: inter.style.fontFamily }}
        >
          2
        </span>
        <div
          className="absolute left-3.25 top-89 w-62 text-right z-10"
          style={{ fontFamily: montserrat.style.fontFamily }}
        >
          <h3 className={heading}>Design Development</h3>
          <p className={copy}>
            Every uniform concept is thoughtfully designed to reflect your brand
            identity. From sketches and fabric selection to styling and
            functionality, every detail is carefully considered.
          </p>
        </div>

        {/* 3 — Sampling & Approval */}
        <Image
          className="absolute left-1.75 top-131.5 w-42 h-104.5 "
          src={"/images/home-redesign/white-dress.png"}
          width={400}
          height={400}
          alt="sub-footer"
        />
        <span
          className={`${ghost} left-35.5 top-147.25`}
          style={{ fontFamily: inter.style.fontFamily }}
        >
          3
        </span>
        <div
          className="absolute left-37.75 top-174 w-47.5 z-10"
          style={{ fontFamily: montserrat.style.fontFamily }}
        >
          <h3 className={heading}>Sampling &amp; Approval</h3>
          <p className={copy}>
            Once the design concept is confirmed, we develop prototypes and
            samples to ensure the perfect fit, comfort and final appearance
            before production begins.
          </p>
        </div>

        {/* 4 — Sizing & Production */}
        <span
          className={`${ghost} left-7.25 top-220.75`}
          style={{ fontFamily: inter.style.fontFamily }}
        >
          4
        </span>
        <div
          className="absolute left-27 top-236 w-49 z-10"
          style={{ fontFamily: montserrat.style.fontFamily }}
        >
          <h3 className={heading}>Sizing &amp; Production</h3>
          <p className={copy}>
            After sample approval, we collect sizing information for all team
            members and coordinate the full production process with our
            manufacturing partners.
          </p>
        </div>

        {/* 5 — Delivery */}
        <span
          className={`${ghost} left-61.5 top-272.25`}
          style={{ fontFamily: inter.style.fontFamily }}
        >
          5
        </span>
        <Image
          className="absolute -right-8 top-269 w-28.25 h-81"
          src={"/images/home-redesign/sub-footer-b.webp"}
          width={300}
          height={300}
          alt="sub-footer"
        />
        <div
          className="absolute left-24.5 top-318.5 w-50.75 text-right z-10"
          style={{ fontFamily: montserrat.style.fontFamily }}
        >
          <h3 className={heading}>Delivery</h3>
          <p className={copy}>
            The finished uniforms are quality-checked, organized and delivered
            ready for your team to wear.
          </p>
        </div>

        {/* Bottom Quote & Line */}
        <div className="mt-20 absolute left-0 right-0 top-345 flex flex-col items-center justify-center px-4 w-full">
          <p
            className="text-[22px] text-center"
            style={{
              fontFamily: allura.style.fontFamily,
              color: "#8F8475",
            }}
          >
            Because first impressions begin with what your team wears.
          </p>
          <hr className="w-full border-t-2 border-[#8C8476] mt-4 block" />
        </div>
      </section>
    </div>
  );
};

export default JourneySectionMobile;
