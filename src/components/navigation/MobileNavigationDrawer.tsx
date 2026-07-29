import { motion } from "framer-motion";
import { MobileContact } from "../Contact bar/MobileContact";
import { ActiveLink } from "./ActiveLink";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useTranslations } from "next-intl";

interface MobileNavigationDrawerProps {
  onClose: () => void;
}

export const MobileNavigationDrawer = ({ onClose }: MobileNavigationDrawerProps) => {
  const t = useTranslations("nav");

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-md shadow-2xl z-[10001] flex flex-col justify-start p-6 select-none"
    >
      {/* Close Button wrapper */}
      <div className="flex justify-end pt-4 pb-8 pr-2">
        <button
          onClick={onClose}
          className="p-2 text-neutral-500 hover:text-neutral-800 transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Close menu"
        >
          <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6 items-end pr-4">
        <div onClick={onClose} className="text-xl font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
          <ActiveLink href="/">{t("home")}</ActiveLink>
        </div>
        <div onClick={onClose} className="text-xl font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
          <ActiveLink href="/trends">{t("portfolio")}</ActiveLink>
        </div>
        <div onClick={onClose} className="text-xl font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
          <ActiveLink href="/blog">{t("projects")}</ActiveLink>
        </div>
      </nav>

      {/* Contact and Social info */}
      <div className="flex flex-col items-end mt-10 pr-4">
        <MobileContact />
      </div>

      {/* Language Picker */}
      <div className="flex justify-end mt-auto pr-4 pb-8">
        <LanguagePicker alignSelf="end" color="rgb(128, 128, 128)" />
      </div>
    </motion.div>
  );
};
