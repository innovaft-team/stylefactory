import { useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";
import { useState, useEffect } from "react";

export const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (event: any) => {
      const target = event.target;
      const scrollTop = target
        ? (target.scrollTop ?? window.scrollY)
        : window.scrollY;
      if (scrollTop > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-4 py-2 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-[8px] shadow-sm  border-b border-gray-100"
            : "bg-transparent"
        }`}
        data-role="navigation"
      >
        {/* "STYLE FACTORY" text on the left */}
        <div
          className={`flex flex-col tracking-[0.14em] font-normal text-[25px] select-none transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-[#f4f1ee]"
          }`}
        >
          <span>STYLE</span>
          <span className="mt-1">FACTORY</span>
        </div>

        {/* Hamburger Menu Icon on the right */}
        <button
          onClick={onOpen}
          className="flex flex-col gap-[7px] items-end justify-center w-8 h-6 group focus:outline-none bg-transparent border-none p-0 cursor-pointer"
          aria-label="Toggle menu"
          style={{ display: isOpen ? "none" : "flex" }}
        >
          <span
            className={`w-8 h-[1.5px] transition-all duration-200 ${isScrolled ? "bg-black" : "bg-white"}`}
          />
          <span
            className={`w-6 h-[1.5px] transition-all duration-200 group-hover:w-8 ${isScrolled ? "bg-black" : "bg-white"}`}
          />
          <span
            className={`w-8 h-[1.5px] transition-all duration-200 ${isScrolled ? "bg-black" : "bg-white"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[10000]"
            />
            {/* Drawer */}
            <MobileNavigationDrawer onClose={onClose} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
