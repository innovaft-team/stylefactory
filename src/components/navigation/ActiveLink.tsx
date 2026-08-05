import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const ActiveLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const router = useRouter();
  const isActive =
    router.pathname === href ||
    (href !== "/" && router.pathname.startsWith(href));

  return (
    <Link
      as={NextLink}
      href={href}
      _hover={{ textDecoration: "none" }}
      className={`
        relative
        font-bold
        px-0 
        after:content-['']
        after:absolute
        after:bottom-[-6px]
        after:left-0
        after:w-full
        after:h-[2px]
        after:bg-current
        after:origin-left
        after:transition-transform
        after:duration-300
        after:ease-out
        ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
      `}
    >
      {children}
    </Link>
  );
};
