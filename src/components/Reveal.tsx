import { PropsWithChildren } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const softScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Users who ask for reduced motion still get the reveal, without the movement.
const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function useFadeUpVariants(): Variants {
  return useReducedMotion() ? fadeOnly : fadeUp;
}

export function useSoftScaleVariants(): Variants {
  return useReducedMotion() ? fadeOnly : softScale;
}

export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  className,
}: PropsWithChildren<{ delay?: number; amount?: number; className?: string }>) {
  const variants = useFadeUpVariants();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{
        duration: 0.78,
        delay,
        ease: REVEAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
