import React from "react";
import { motion } from "framer-motion";
import { open_sans } from "@/fonts";

const services = [
  {
    title: "Design",
    copy: "From uniform concepts to complete brand guidelines, we help companies build a consistent and recognizable team image.",
  },
  {
    title: "Development",
    copy: "From sourcing and production coordination to final delivery, we manage the complete development process for each project.",
  },
  {
    title: "Production",
    copy: "Through our manufacturing network, we support hospitality brands and corporate teams with sourcing, production, and project coordination.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const softScale = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}

function Reveal({ children, delay = 0, amount = 0.2, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUp}
      transition={{
        duration: 0.78,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function WhatWeDoSection() {
  return (
    <section className="relative overflow-hidden bg-white min-h-auto py-[10px] px-0 pb-[28px] md:min-h-auto md:p-0 xl:min-h-[1180px]">
      {/* Seam Grid background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: 'linear-gradient(38deg, transparent 0 48.5%, rgba(44, 44, 44, 0.04) 49%, transparent 50%), linear-gradient(142deg, transparent 0 48.5%, rgba(44, 44, 44, 0.035) 49%, transparent 50%)',
          backgroundSize: '168px 168px'
        }}
      />

      {/* Top Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#f6f6f2d1] via-[#fffffff0] via-[86px] to-[#ffffff00] to-[230px]" />
      
      {/* Section Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 z-[3] pointer-events-none top-[21px] md:top-[58px]">
        <h2 className={`text-[11px] md:text-[30px] font-normal tracking-normal leading-none uppercase whitespace-nowrap ${open_sans.className}`}>
          <span className="text-[#181818]">WHAT</span>{" "}
          <span className="text-[#48443e]/58">WE DO</span>
        </h2>
      </div>

      {/* Main Layout Grid */}
      <div className="block md:grid relative z-[1] items-start overflow-visible min-h-auto md:min-h-auto xl:min-h-[1160px] md:pt-[140px] xl:pt-0 gap-0 grid-cols-1 md:grid-cols-[minmax(120px,1fr)_minmax(400px,660px)_minmax(120px,1fr)] lg:grid-cols-[minmax(300px,1fr)_minmax(580px,660px)_minmax(300px,1fr)]">
        
        {/* Left Visual: Jacket */}
        <Reveal amount={0.28} className="block relative min-w-0 overflow-visible self-start justify-self-start absolute left-[-110px] top-[20px] z-[1] w-[200px] h-[280px] md:relative md:left-auto md:top-auto md:z-[2] md:w-full md:h-[420px] md:m-0 xl:h-[780px]">
          <div
            className="w-full h-full min-h-full m-0 bg-contain bg-center bg-no-repeat md:w-[240px] md:min-h-[400px] md:mt-[50px] md:ml-[-80px] xl:w-[520px] xl:min-h-[735px] xl:mt-[74px] xl:ml-[-160px] xl:bg-[position:84%_-48px] xl:bg-[length:790px_auto] shadow-none mix-blend-multiply"
            style={{
              backgroundImage: "url('/images/home-redesign/jacket.jpg')",
            }}
          />
        </Reveal>

        {/* Center Services list */}
        <div className="relative md:static z-[2] self-start justify-self-center w-full flex flex-col justify-start pt-[72px] px-[16px] pb-0 mt-0 min-h-auto md:pt-[60px] md:p-0 md:min-h-auto md:max-w-[580px] md:self-center md:justify-self-center xl:pt-[248px] xl:max-w-[660px] xl:min-h-[1060px] xl:self-start space-y-0">
          {services.map((service, index) => {
            // Dynamic classes based on index
            let itemHeightClass = "";
            let copySpacingClass = "";
            let medallionClass = "";
            let medallionSizeClass = "";
            let medallionBg = "";
            let medallionRotate = "";

            if (index === 0) {
              // Design
              itemHeightClass = "min-h-[146px] md:min-h-[286px]";
              copySpacingClass = "mt-[16px] xl:mt-[58px] max-w-[260px] md:max-w-[420px] xl:max-w-[590px]";
              medallionClass = "top-[30px] md:top-[2px]";
              medallionSizeClass = "w-[132px] h-[112px] md:w-[260px] md:h-[220px]";
              medallionBg = "url('/images/home-redesign/timeline-contour.png')";
            } else if (index === 1) {
              // Development
              itemHeightClass = "min-h-[146px] md:min-h-[314px]";
              copySpacingClass = "mt-[16px] xl:mt-[104px] max-w-[260px] md:max-w-[420px] xl:max-w-[650px]";
              medallionClass = "top-[30px] md:top-[16px]";
              medallionSizeClass = "w-[92px] h-[126px] md:w-[172px] md:h-[236px]";
              medallionBg = "url('/images/home-redesign/timeline-flower.png')";
            } else {
              // Production
              itemHeightClass = "min-h-[142px] md:min-h-[250px]";
              copySpacingClass = "mt-[16px] xl:mt-[84px] max-w-[260px] md:max-w-[420px] xl:max-w-[640px]";
              medallionClass = "top-[30px] md:top-[16px]";
              medallionSizeClass = "w-[104px] h-[104px] md:w-[214px] md:h-[214px]";
              medallionBg = "url('/images/home-redesign/timeline-ring.png')";
              medallionRotate = "rotate-[-12deg]";
            }

            return (
              <motion.div
                key={service.title}
                className={`w-full ${itemHeightClass}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={softScale}
                transition={{
                  duration: 0.72,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-full flex flex-col items-center relative text-center">
                  {/* Medallion decoration background */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-center bg-no-repeat bg-contain mix-blend-multiply pointer-events-none opacity-1 ${medallionClass} ${medallionSizeClass} ${medallionRotate}`}
                    style={{ backgroundImage: medallionBg }}
                  />
                  {/* Title */}
                  <h3 className={`text-[#050505] font-normal tracking-normal relative z-[1] text-[26px] leading-[1.08] md:text-[48px] md:leading-[1.04] [text-shadow:0_1px_24px_rgba(255,255,255,0.82)] md:[text-shadow:none] ${open_sans.className}`}>
                    {service.title}
                  </h3>
                  {/* Copy */}
                  <p className={`mx-auto text-[rgba(18,18,18,0.88)] font-normal tracking-normal relative z-[1] text-[12px] leading-[1.7] md:text-[20px] md:leading-[1.36] md:[text-shadow:none] [text-shadow:0_1px_24px_rgba(255,255,255,0.82)] ${copySpacingClass} ${open_sans.className}`}>
                    {service.copy}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Visual: Sketch */}
        <Reveal delay={0.15} amount={0.28} className="block relative min-w-0 overflow-visible self-start justify-self-end absolute right-[-110px] bottom-[20px] top-auto z-[1] w-[220px] h-[300px] md:relative md:right-auto md:bottom-auto md:top-auto md:z-[1] md:w-full md:h-[420px] md:m-0 md:self-end xl:h-[900px] xl:self-start">
          <div
            className="w-full h-full min-h-full m-0 bg-contain bg-center bg-no-repeat md:w-[300px] md:min-h-[420px] md:mt-auto md:mb-[50px] md:mr-[-120px] xl:w-[650px] xl:min-h-[760px] xl:mt-[286px] xl:mb-0 xl:mr-[-246px] xl:bg-[position:left_top] xl:bg-[length:705px_auto] shadow-none mix-blend-multiply opacity-[0.86]"
            style={{
              backgroundImage: "url('/images/home-redesign/shirt-sketch.jpg')",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
