import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { poppins } from "@/fonts";
import { Reveal, REVEAL_EASE, useSoftScaleVariants } from "@/components/Reveal";

const clients = [
  {
    name: "Adriatic",
    logo: "/images/home-redesign/logo-adriatic.jpg",
    width: 327,
    height: 260,
  },
  {
    name: "Esplanade",
    logo: "/images/home-redesign/logo-esplanade.jpg",
    width: 273,
    height: 260,
  },
  {
    name: "Movenpick",
    logo: "/images/home-redesign/logo-movenpick.jpg",
    width: 557,
    height: 260,
  },
  {
    name: "Havas",
    logo: "/images/home-redesign/logo-havas.jpg",
    width: 488,
    height: 260,
  },
  {
    name: "Suncani Hvar",
    logo: "/images/home-redesign/logo-suncani-hvar.jpg",
    width: 471,
    height: 260,
  },
  {
    name: "Liburnia",
    logo: "/images/home-redesign/logo-liburnia.jpg",
    width: 402,
    height: 260,
  },
  {
    name: "RHG",
    logo: "/images/home-redesign/logo-rhg.jpg",
    width: 482,
    height: 260,
  },
  {
    name: "Pullman",
    logo: "/images/home-redesign/logo-pullman.jpg",
    width: 519,
    height: 260,
  },
  {
    name: "Materra",
    logo: "/images/home-redesign/logo-materra.jpg",
    width: 376,
    height: 260,
  },
  {
    name: "Sun Gardens",
    logo: "/images/home-redesign/logo-sun-gardens.jpg",
    width: 469,
    height: 260,
  },
  {
    name: "Molum",
    logo: "/images/home-redesign/logo-molum.jpg",
    width: 455,
    height: 260,
  },
  {
    name: "Terme Catez",
    logo: "/images/home-redesign/logo-terme-catez.jpg",
    width: 415,
    height: 260,
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
              <div className="hidden lg:block h-125.5 w-0.5 bg-[#B1ABA8] xl:mr-21.75" />
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
          <div className="grid grid-cols-6 sm:grid-cols-4 w-full items-center">
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={softScale}
                transition={{ duration: 0.54, ease: REVEAL_EASE }}
              >
                <div className="relative grid place-items-center overflow-hidden border-none bg-transparent w-full">
                  <Image
                    alt={t("logoAlt", { name: client.name })}
                    className="relative z-1 block object-contain mix-blend-multiply max-w-full"
                    src={client.logo}
                    width={client.width}
                    height={client.height}
                    style={{
                      width: `${client.width * 0.28}px`,
                      height: `${client.height * 0.28}px`,
                    }}
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
