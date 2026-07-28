'use client';
import {usePathname} from "next/navigation";
import {Link} from "@chakra-ui/react";
import NextLink from "next/link";

export const ActiveLink = ({children, href}: { children: React.ReactNode; href: string }) => {
    const pathname = usePathname()


    const isSelected = pathname === href;

    return (
        <Link as={NextLink} pb={{base: 1, lg: 3}} px={{base: 0, lg: 6}} href={href} aria-selected={isSelected} fontWeight={700}
              _hover={{textDecoration: "none", cursor: 'pointer', color: 'gray.500'}}
              _selected={{
                  borderBottomWidth: '1px',
                  borderColor: 'gray.300',
              }}
              >
            {children}
        </Link>
    );
}
