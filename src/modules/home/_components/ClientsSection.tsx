import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { poppins } from "@/fonts";
import { Reveal, REVEAL_EASE, useSoftScaleVariants } from "@/components/Reveal";

const clients = [
  {
    name: "Adriatic",
    logo: "/images/homegrid/10.png",
    width: 494,
    height: 399,
  },
  {
    name: "Esplanade",
    logo: "/images/homegrid/1.png",
    width: 376,
    height: 363,
  },
  {
    name: "Mövenpick",
    logo: "/images/homegrid/2.png",
    width: 464,
    height: 208,
  },
  { name: "Havas", logo: "/images/homegrid/11.png", width: 529, height: 294 },
  { name: "Materra", logo: "/images/homegrid/12.png", width: 376, height: 260 },
  { name: "Molum", logo: "/images/homegrid/8.png", width: 486, height: 254 },
  {
    name: "Sunčani Hvar",
    logo: "/images/homegrid/3.png",
    width: 398,
    height: 224,
  },
  { name: "Liburnia", logo: "/images/homegrid/4.png", width: 402, height: 320 },
  { name: "RHG", logo: "/images/homegrid/5.png", width: 516, height: 88 },
  { name: "Pullman", logo: "/images/homegrid/6.png", width: 636, height: 257 },
  {
    name: "Sun Gardens",
    logo: "/images/homegrid/7.png",
    width: 474,
    height: 257,
  },
  {
    name: "Terme Čatež",
    logo: "/images/homegrid/9.png",
    width: 486,
    height: 369,
  },
];

export function ClientsSection() {
  const t = useTranslations("home.clients");
  const softScale = useSoftScaleVariants();

  return (
    <section className="relative bg-white pt-15 px-4 pb-10 md:py-20 xl:pb-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] items-center w-full mx-auto max-w-217">
        <Reveal>
          <div className="flex-col items-center lg:items-stretch w-full">
            <div className="flex items-center justify-center lg:justify-end gap-9.5 w-full">
              <p
                style={{ fontFamily: poppins.style.fontFamily }}
                className="md:text-xl lg:text-[25px] leading-[130%] font-medium text-center lg:text-right uppercase"
              >
                {/* Mobile Single Line Layout */}
                <span className="inline lg:hidden ">
                  <span className="text-black">{t("titleLine1")}</span>{" "}
                  <span className="text-[#8F8475]/58">{t("titleLine2")}</span>
                </span>
                {/* Desktop Split Line Layout */}
                <span className="hidden lg:inline">
                  <span className="text-[#181818]">{t("titleLine1")}</span>
                  <br />
                  <span className="text-[#48443e]/58">{t("titleLine2")}</span>
                </span>
              </p>
              <div className="hidden lg:block h-125.5 w-[2px] rounded-sm bg-[#B1ABA8] xl:mr-10.75" />
            </div>
            {/* Horizontal line under heading on mobile/tablet */}
            <div className="block lg:hidden w-20 h-[1.5px] bg-[#dfdccc] mx-auto mt-2" />
          </div>
        </Reveal>

        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055 } },
          }}
        >
          <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-x-5 sm:gap-y-5 xl:gap-y-12 w-full items-center justify-items-center mt-10 lg:mt-0">
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={softScale}
                transition={{ duration: 0.54, ease: REVEAL_EASE }}
                className="w-full flex justify-center items-center"
              >
                <div className="relative flex justify-center items-center overflow-hidden border-none bg-transparent h-12 min-[400px]:h-14 sm:h-16 w-full">
                  <Image
                    alt={t("logoAlt", { name: client.name })}
                    className="object-contain max-h-full max-w-full"
                    src={client.logo}
                    width={client.width}
                    height={client.height}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
