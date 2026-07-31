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
import { Reveal, REVEAL_EASE, useFadeUpVariants } from "@/components/Reveal";
import ContactSection from "@/modules/home/_components/ContactSection";

const journeySteps = [
  { number: "1", key: "brief" },
  { number: "2", key: "design" },
  { number: "3", key: "sampling" },
  { number: "4", key: "production" },
  { number: "5", key: "delivery" },
] as const;

function Visual({
  className,
  minH,
  label,
}: {
  className: string;
  minH?: string | { base?: string; md?: string; lg?: string };
  label: string;
}) {
  return (
    <Box
      className={`${styles.placeholderFrame} ${className}`}
      minH={minH}
      role="img"
      aria-label={label}
    />
  );
}

function JourneyCard({
  step,
  index,
}: {
  step: (typeof journeySteps)[number];
  index: number;
}) {
  const t = useTranslations("home.journey");
  const fadeUp = useFadeUpVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{
        duration: 0.78,
        delay: (index % 2) * 0.1,
        ease: REVEAL_EASE,
      }}
      style={{ position: "relative" }}
    >
      <Box
        className={styles.journeyCard}
        position="relative"
        minH={{ base: "188px", md: "520px" }}
        pl={{ base: "0", md: "0" }}
      >
        <Text
          className={styles.ghostNumber}
          left={{ base: "-8px", md: "-24px" }}
          top={{ base: "-16px", md: "-30px" }}
        >
          {step.number}
        </Text>
        <VStack
          className={styles.journeyCardCopy}
          position="relative"
          zIndex="1"
          align="start"
          maxW="340px"
          spacing="3"
          pt={{ base: "36px", md: "0" }}
        >
          <Text
            as="h3"
            fontFamily={open_sans.style.fontFamily}
            fontSize={{ base: "14px", md: "25px" }}
            fontWeight="700"
            lineHeight="1.18"
          >
            {t(`steps.${step.key}.title`)}
          </Text>
          <Text
            color="rgba(20, 20, 20, 0.75)"
            fontFamily={open_sans.style.fontFamily}
            fontSize={{ base: "12px", md: "25px" }}
            lineHeight={{ base: "1.65", md: "1.28" }}
          >
            {t(`steps.${step.key}.copy`)}
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
}

function JourneySection() {
  const t = useTranslations("home.journey");

  return (
    <Box as="section" className={styles.journeySection} position="relative">
      <Text
        className={styles.scriptBackdrop}
        fontFamily={allura.style.fontFamily}
      >
        {t("backdrop")}
      </Text>
      <Grid
        className={styles.journeyLayout}
        position="relative"
        zIndex="1"
        alignItems="start"
        columnGap={{ base: "8", xl: "14" }}
        rowGap={{ base: "8", lg: "12" }}
        templateColumns={{ base: "1fr 1.05fr", lg: "1fr 1.05fr" }}
      >
        <Grid className={styles.journeyLeftColumn} gap={{ base: "7", md: "8" }}>
          <Reveal>
            <Text
              as="h2"
              className={styles.journeyTitle}
              fontFamily={open_sans.style.fontFamily}
              textTransform="uppercase"
            >
              <Box as="span" className={styles.journeyTitleStrong}>
                {t("titleStrong")}
              </Box>{" "}
              <Box as="span" className={styles.journeyTitleLight}>
                {t("titleLight")}
              </Box>
            </Text>
          </Reveal>

          <Grid
            className={styles.journeyIntroRow}
            alignItems="start"
            gap={{ base: "6", md: "8" }}
            templateColumns={{ base: "0.86fr 1fr", md: "0.86fr 1fr" }}
          >
            <Reveal delay={0.06} className={styles.journeyPhotoSlot}>
              <Visual
                className={styles.photoPlaceholder}
                label={t("visuals.consultation")}
                minH={{ base: "280px", md: "615px" }}
              />
            </Reveal>
            <JourneyCard step={journeySteps[0]} index={0} />
          </Grid>

          <Grid
            className={styles.journeyFabricRow}
            alignItems="center"
            gap={{ base: "6", md: "8" }}
            templateColumns={{ base: "1fr 0.72fr", md: "1fr 0.72fr" }}
          >
            <JourneyCard step={journeySteps[1]} index={1} />
            <Reveal delay={0.08} className={styles.journeyFabricSlot}>
              <Visual
                className={styles.fabricBoard}
                label={t("visuals.fabric")}
                minH={{ base: "340px", md: "860px" }}
              />
            </Reveal>
          </Grid>

          <Grid
            className={styles.journeyProductionRow}
            gap={{ base: "6", md: "8" }}
            templateColumns={{ base: "1fr 0.78fr", md: "1fr 0.78fr" }}
          >
            <JourneyCard step={journeySteps[3]} index={3} />
            <Reveal delay={0.12} className={styles.journeyPantsSlot}>
              <Visual
                className={styles.pantsPlaceholder}
                label={t("visuals.pants")}
                minH={{ base: "360px", md: "520px" }}
              />
            </Reveal>
          </Grid>
        </Grid>

        <Grid
          className={styles.journeyRightColumn}
          gap={{ base: "7", md: "8" }}
        >
          <Reveal delay={0.1} className={styles.journeySketchSlot}>
            <Box
              className={styles.journeySketch}
              role="img"
              aria-label={t("visuals.sketch")}
            />
          </Reveal>
          <Grid
            className={styles.journeyFinalCards}
            gap={{ base: "6", md: "8" }}
            templateColumns={{ base: "1fr 1fr", md: "1fr 1fr" }}
          >
            <JourneyCard step={journeySteps[2]} index={2} />
            <JourneyCard step={journeySteps[4]} index={4} />
          </Grid>
        </Grid>
      </Grid>

      <Flex
        className={styles.journeyQuote}
        borderBottom="1px solid rgba(20,20,20,0.22)"
        justify="center"
        mt={{ base: "14", md: "44" }}
        pb={{ base: "7", md: "9" }}
      >
        <Text
          className={styles.journeyQuoteText}
          color="rgba(40,40,40,0.48)"
          fontFamily={allura.style.fontFamily}
          fontSize={{ base: "36px", md: "54px" }}
          lineHeight="1"
          textAlign="center"
        >
          {t("quote")}
        </Text>
      </Flex>
    </Box>
  );
}

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
      <NavigationLayout showDesktopNavigation={false}>
        <Scroll h="100vh">
          <Box className={styles.pageFrame}>
            <Box
              className={styles.homeShell}
              style={
                { "--sf-script-font": allura.style.fontFamily } as CSSProperties
              }
            >
              {/* Anchored to the shell, so it stays out of <main>. */}
              <div className="hidden md:block absolute top-0 left-0 w-full z-999">
                <Navigation />
              </div>
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
