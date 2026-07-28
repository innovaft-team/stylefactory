"use client";
import { chakra } from "@chakra-ui/react";
import type { SVGProps } from "react";
export const SvgKebab = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        stroke="currentColor"
        strokeDasharray="0,0"
        strokeLinecap="round"
        strokeWidth={2}
        d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </g>
  </svg>
);
export const ChakraSvgKebab = chakra(SvgKebab);
