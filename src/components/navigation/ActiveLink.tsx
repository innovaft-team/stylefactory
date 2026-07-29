import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const ActiveLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      as={NextLink}
      href={href}
      _hover={{ textDecoration: "none" }}
      className="
        relative
        font-bold
        px-0 
        pb-1 lg:pb-3
        after:content-['']
        after:absolute
        after:bottom-[10px]
        after:left-0
        after:w-full
        after:h-[2px]
        after:bg-current
        after:scale-x-0
        after:origin-left
        after:transition-transform
        after:duration-300
        after:ease-out
        hover:after:scale-x-100
      "
    >
      {children}
    </Link>
  );
};
