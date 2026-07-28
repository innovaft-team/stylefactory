"use client";
import { chakra } from "@chakra-ui/react";
import type { SVGProps } from "react";
export const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-3 4h2v8H9v2h6v-2h-2V8H9z" />
  </svg>
);
export const ChakraSvgInfo = chakra(SvgInfo);
