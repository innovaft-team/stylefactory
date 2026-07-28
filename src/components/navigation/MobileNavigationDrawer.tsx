'use client';
import {Button, HStack, StackProps, VStack, CloseButton} from "@chakra-ui/react";
import {ChakraCloseIcon} from "../atoms/icons";
import {MobileContact} from "../Contact bar/MobileContact";
import {ActiveLink} from "./ActiveLink";
import {LanguagePicker} from "@/components/LanguagePicker";
import {useTranslations} from "next-intl";


interface MobileNavigationDrawerProps extends StackProps {
    onClose: () => void;
}

export const MobileNavigationDrawer = ({onClose, ...rest}: MobileNavigationDrawerProps) => {
    const t = useTranslations("nav")

    return <VStack
        spacing={3}
        h={'full'}
        w={'40vw'}
        justifyContent={"start"}
        align={'right'}
        as={"header"}
        zIndex={"1000"}
        position={"fixed"}
        right={0}
        backgroundColor='white'
        opacity={0.8}
        fontSize={18}
        {...rest}
    >

        <HStack justifyContent={"space-between"}  pt={6} pb={10} position={'relative'}>
            <ChakraCloseIcon onClick={onClose} background={'transparent'}  boxSize={{base: 10, md: 16}} position={'absolute'} right={8} top='6' >
            </ChakraCloseIcon>
        </HStack>


        <VStack as={"nav"} spacing={"6"} py={'5'} alignItems={"end"} pr={4} >
        <Button onClick={onClose} fontSize={{base: '14', sm: '16', md: '20'}} background={'transparent'}  p={0} h={'fit-content'} color={'rgb(128, 128, 128)'}><ActiveLink 
                href={"/"}>{t("home")}</ActiveLink>
            </Button>

            <Button onClick={onClose} fontSize={{base: '14', sm: '16', md: '20'}} background={'transparent'}  p={0} h={'fit-content'} color={'rgb(128, 128, 128)'}><ActiveLink 
                href={"/trends"}>{t("portfolio")}</ActiveLink>
            </Button>
            <Button p={0} onClick={onClose} fontSize={{base: '14', sm: '16', md: '20'}} background={'transparent'}  h={'fit-content'} color={'rgb(128, 128, 128)'}><ActiveLink
                href={"/blog"}>{t("projects")}</ActiveLink>
            </Button>

            
            <MobileContact/>
        </VStack>
        
        <LanguagePicker alignSelf={"end"} color={'rgb(128, 128, 128)'} />
    </VStack>
}
