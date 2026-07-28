"use client";
import { chakra } from "@chakra-ui/react";
import type { SVGProps } from "react";
export const SvgMenuLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3 4h18v2H3zm6 7h12v2H9zm-6 7h18v2H3z" />
  </svg>
);
export const ChakraSvgMenuLine = chakra(SvgMenuLine);
