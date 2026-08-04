import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { NavigationLayout } from "@/components/layout/NavigationLayout";
import { Scroll } from "@/components/layout/Scroll";
import { allura, open_sans, poppins } from "@/fonts";
import styles from "@/styles/HomeRedesign.module.css";
import { SeoHead } from "@/components/SeoHead";
import {
  createOrganizationJsonLd,
  createWebPageJsonLd,
  createWebsiteJsonLd,
} from "@/utils/seo";
import { useRouter } from "next/router";
import Image from "next/image";
import { HeroSection } from "@/modules/home/_components/HeroSection";
import { Navigation } from "@/components/navigation/Navigation";
import { WhatWeDoSection } from "@/modules/home/_components/WhatWeDoSection";
import { ClientsSection } from "@/modules/home/_components/ClientsSection";
import ContactSection from "@/modules/home/_components/ContactSection";
import JourneySection from "@/modules/home/_components/JourneySection";

function Home() {
  const { locale } = useRouter();
  const t = useTranslations("home");
  const title = t("meta.title");
  const description = t("meta.description");

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path="/"
        image="/images/home-redesign/hero-model.jpg"
        imageAlt={t("meta.imageAlt")}
        keywords={t.raw("meta.keywords") as string[]}
        jsonLd={[
          createOrganizationJsonLd(),
          createWebsiteJsonLd(locale),
          createWebPageJsonLd({
            path: "/",
            title,
            description,
            locale,
            image: "/images/home-redesign/hero-model.jpg",
          }),
        ]}
      />
      <NavigationLayout>
        <Scroll h="100vh">
          <Box className={styles.pageFrame}>
            <Box
              className={styles.homeShell}
              style={
                { "--sf-script-font": allura.style.fontFamily } as CSSProperties
              }
            >
              <Box as="main">
                <HeroSection />
                <WhatWeDoSection />
                <ClientsSection />
                <ContactSection />
                <JourneySection />
              </Box>
            </Box>
          </Box>
        </Scroll>
      </NavigationLayout>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/locales/${locale}.json`)).default,
    },
  };
}

export default Home;
