"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Every scrolling container in the app is `<Scroll>`, which sets this. */
const SCROLL_CONTAINER_SELECTOR = '[aria-roledescription="scroll"]';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = (event?: Event) => {
      let currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Find active scrolled element (e.g. <Scroll> Chakra Box or custom containers)
      if (event && event.target && event.target !== document) {
        const target = event.target as HTMLElement;
        if (target.scrollTop !== undefined && target.scrollTop > 0) {
          currentScroll = target.scrollTop;
          maxScroll = target.scrollHeight - target.clientHeight;
        }
      }

      // Fallback scan for any scrolled container if target check wasn't
      // triggered. This used to walk every div/main/section in the document
      // reading scrollTop, forcing a full layout on each scroll event. Every
      // scrolling container in the app is <Scroll>, which tags itself with
      // this attribute, so the narrow selector finds the same elements.
      if (currentScroll === 0) {
        const scrollables = document.querySelectorAll<HTMLElement>(
          SCROLL_CONTAINER_SELECTOR,
        );
        for (let i = 0; i < scrollables.length; i++) {
          const el = scrollables[i];
          if (el.scrollTop > 0) {
            currentScroll = el.scrollTop;
            maxScroll = el.scrollHeight - el.clientHeight;
            break;
          }
        }
      }

      // Show after 100px scroll
      setIsVisible(currentScroll > 100);

      // Calculate progress percentage
      if (maxScroll > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScroll / maxScroll) * 100)
        );
        setScrollProgress(progress);
      }
    };

    // Coalesce to one measurement per frame; scroll events fire far faster
    // than the ring can meaningfully update.
    const handleScroll = (event: Event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure(event);
      });
    };

    // Capture true to catch scroll events from inner overflow containers (like Chakra <Scroll />)
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    // Initial check
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll window
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Scroll any inner scrollable containers
    const scrollables = document.querySelectorAll<HTMLElement>(SCROLL_CONTAINER_SELECTOR);
    scrollables.forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  };

  // Circular progress SVG calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[99999] flex items-center justify-center w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer border border-white/30"
        >
          {/* Circular Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-white/20"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-white transition-all duration-150 ease-out"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Up Arrow Icon */}
          <svg
            className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
