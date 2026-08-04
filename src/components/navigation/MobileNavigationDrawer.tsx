"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { ActiveLink } from "./ActiveLink";
import {
  ChakraInfoIcon,
  ChakraInstagramIcon,
  ChakraPinterestIcon,
  ChakraLinkedInIcon,
} from "@/components/atoms/icons";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
} from "@chakra-ui/react";

interface MobileNavigationDrawerProps {
  onClose: () => void;
}

export const MobileNavigationDrawer = ({
  onClose,
}: MobileNavigationDrawerProps) => {
  const t = useTranslations("nav");
  const router = useRouter();
  const { isOpen, onOpen, onClose: onInfoClose } = useDisclosure();

  const handleLocaleChange = (newLocale: string) => {
    const { pathname, query, asPath } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale as any });
  };

  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="fixed top-0 right-0 h-full w-full max-w-77.5 bg-[#161616]/98 border-l border-[#8C8476]/15 backdrop-blur-lg shadow-[0_0_50px_rgba(0,0,0,0.3)] z-[10001] flex flex-col justify-between p-4 select-none text-[#F7F7F4]"
      >
        {/* Top Header Section */}
        <div>
          <div className="flex justify-between items-center pt-2 pb-12">
            <span className="text-xl whitespace-nowrap tracking-[0.3em] font-semibold text-white uppercase">
              Style <br /> Factory
            </span>
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-[#F7F7F4] transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                className="size-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Luxury Nav Links */}
          <nav className="flex flex-col gap-4">
            <div
              onClick={onClose}
              className="group text-base tracking-[0.2em] font-light text-[#EAE7E2]/85 hover:text-[#8C8476] transition-all duration-300 transform hover:-translate-x-1"
            >
              <ActiveLink href="/">{t("home")}</ActiveLink>
            </div>
            <div
              onClick={onClose}
              className="group text-base tracking-[0.2em] font-light text-[#EAE7E2]/85 hover:text-[#8C8476] transition-all duration-300 transform hover:-translate-x-1"
            >
              <ActiveLink href="/trends">{t("portfolio")}</ActiveLink>
            </div>
            <div
              onClick={onClose}
              className="group text-base tracking-[0.2em] font-light text-[#EAE7E2]/85 hover:text-[#8C8476] transition-all duration-300 transform hover:-translate-x-1"
            >
              <ActiveLink href="/blog">{t("projects")}</ActiveLink>
            </div>
          </nav>
        </div>

        {/* Footer Section inside Drawer */}
        <div className="flex flex-col gap-7 border-t border-[#8C8476]/15 pt-8 pb-4 pl-1">
          {/* Info and Social Icons Row */}
          <div className="flex items-center gap-5 text-white">
            <button
              onClick={onOpen}
              className="p-0 bg-transparent border-none cursor-pointer text-white hover:text-[#F7F7F4] transition-colors"
              aria-label="Contact info"
            >
              <ChakraInfoIcon w="6" h="6" />
            </button>
            <a
              href="https://www.instagram.com/stylefactory.uniforms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#F7F7F4] transition-colors"
            >
              <ChakraInstagramIcon w="6" h="6" />
            </a>
            <a
              href="https://www.pinterest.com/StyleFactoryUniforms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#F7F7F4] transition-colors"
            >
              <ChakraPinterestIcon w="6" h="6" />
            </a>
            <a
              href="https://www.linkedin.com/company/style-factory-professional-uniforms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#F7F7F4] transition-colors"
            >
              <ChakraLinkedInIcon w="6" h="6" />
            </a>
          </div>

          {/* Premium Language Picker */}
          <div className="flex items-center gap-4 text-xs tracking-[0.25em] font-medium text-[#8C8476]">
            <span
              onClick={() => handleLocaleChange("en")}
              className={`cursor-pointer transition-colors ${
                router.locale === "en"
                  ? "text-[#F7F7F4] border-b border-[#8C8476]/60 pb-0.5"
                  : "opacity-50 hover:text-[#F7F7F4]"
              }`}
            >
              EN
            </span>
            <span className="opacity-20 font-light">|</span>
            <span
              onClick={() => handleLocaleChange("hr")}
              className={`cursor-pointer transition-colors ${
                router.locale === "hr"
                  ? "text-[#F7F7F4] border-b border-[#8C8476]/60 pb-0.5"
                  : "opacity-50 hover:text-[#F7F7F4]"
              }`}
            >
              HR
            </span>
          </div>
        </div>
      </motion.div>

      {/* Info Modal */}
      <Modal isOpen={isOpen} onClose={onInfoClose} isCentered>
        <ModalOverlay backdropFilter="blur(12px)" bg="blackAlpha.800" />
        <ModalContent
          maxW="340px"
          m="5%"
          backgroundColor="#161616"
          color="#F7F7F4"
          border="1px solid rgba(140, 132, 118, 0.2)"
          borderRadius="md"
        >
          <ModalCloseButton color="#8C8476" _hover={{ color: "#F7F7F4" }} />
          <ModalBody m="auto" py={12} px={8}>
            <VStack
              spacing={5}
              className="text-center font-light tracking-wide"
            >
              <Text className="text-md font-medium text-[#8C8476] tracking-wider">
                info@stylefactory.hr
              </Text>
              <Text className="text-sm tracking-wide">00385 99 66 66 331</Text>
              <div className="w-6 h-px bg-[#8C8476]/30 my-1" />
              <Text className="text-[10px] uppercase tracking-widest text-[#8C8476] font-semibold">
                Office
              </Text>
              <Text className="text-xs leading-relaxed opacity-75">
                Style factory <br />
                Vrisnička 18 <br />
                10000 Zagreb <br />
                Croatia
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
