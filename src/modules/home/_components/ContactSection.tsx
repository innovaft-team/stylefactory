import Image from "next/image";
import React from "react";
import { poppins, montserrat } from "@/fonts";

const ContactSection = () => {
  return (
    <>
      <section className="relative sm:px-6 xl:px-10 pt-2.5 min-[450px]:pt-4 md:pt-9.25 pb-5" style={{ fontFamily: poppins.style.fontFamily }}>
        <h3 className="sm:text-xl md:text-[33px] font-medium uppercase relative z-20 text-center">
          GET <span className="text-[#48443e]/58">IN TOUCH</span>
        </h3>
        <Image
          src={"/images/home-redesign/contact-bd.webp"}
          width={1000}
          height={1000}
          className="w-full h-full absolute top-0 left-0 object-cover"
          alt={"contact section banner"}
        />
        <div className="mt-6 md:mt-8 xl:mt-15.5 flex flex-col md:flex-row gap-2.5 relative z-10">
          <div className="grid grid-cols-2 w-full md:max-w-100 xl:max-w-116.75  gap-2.5">
            <input
              className="text-[13px] text-[#B0ABA7] placeholder-[#B0ABA7]  placeholder:text-[13px] px-[7px] py-[14px] outline-0"
              placeholder="Name"
              type="text"
            />
            <input
              className="text-[13px] text-[#B0ABA7] placeholder-[#B0ABA7]  placeholder:text-[13px] px-[7px] py-[14px] outline-0"
              placeholder="Phone"
              type="tel"
            />
            <input
              className="text-[13px] text-[#B0ABA7] placeholder-[#B0ABA7]  placeholder:text-[13px] px-[7px] py-[14px] outline-0"
              placeholder="Email adress*"
              type="email"
            />
            <input
              className="text-[13px] text-[#B0ABA7] placeholder-[#B0ABA7]  placeholder:text-[13px] px-[7px] py-[14px] outline-0"
              placeholder="Company*"
              type="text"
            />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full h-full text-[13px] text-[#B0ABA7] placeholder-[#B0ABA7]  placeholder:text-[13px] px-1.75 py-3.5 outline-0 resize-none"
              placeholder="Message*"
              name="Message*"
              id="Message*"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center md:justify-end md:mt-4.5 relative z-10">
          <button
            className="w-41.5 min-[450px]:w-50.5 h-10 min-[450px]:h-12 flex items-center justify-center text-[10px] font-bold uppercase bg-no-repeat bg-size-[100%_100%] bg-transparent hover:opacity-90 transition-opacity"
            style={{ backgroundImage: "url(/images/home-redesign/btn-bg.png)" }}
          >
            <span className="text-[#8C8476]">SEND</span>
          </button>
        </div>
        <div className="max-md:px-4">
          <h3 className="max-md:mt-5 text-center md:text-left text-[13px] min-[450px]:text-lg leading-[162%] md:text-[21px] font-medium uppercase relative z-20 text-[#8C8476]" style={{ fontFamily: montserrat.style.fontFamily }}>
            CONTACT:
          </h3>
          <div className="mt-3 sm:mt-4 relative z-20 text-black flex flex-row justify-between md:flex-col md:justify-start">
            <div className="flex flex-col text-left text-xs min-[450px]:text-base">
              <a href="tel:+385996666331">+385 99 6666 331</a>
              <a href="tel:+385991697357">+385 99 169 7357</a>
              <a className="md:mt-4" href="mailto:info@stylefactory.hr">
                info@stylefactory.hr
              </a>
            </div>
            <div className="flex flex-col text-right md:text-left md:mt-1.5 text-xs min-[450px]:text-base">
              <span>CROATIA</span>
              <span className="hidden md:inline">
                Vrisnička 18, 10 000 Zagreb
              </span>
              <span className="md:hidden">Vrisnička 18</span>
              <span className="md:hidden">10 000 Zagreb</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
