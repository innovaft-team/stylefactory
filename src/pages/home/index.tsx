import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { motion } from "framer-motion";
import { useState, type CSSProperties, type FormEvent } from "react";
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
import {
  Reveal,
  REVEAL_EASE,
  useFadeUpVariants,
  useSoftScaleVariants,
} from "@/components/Reveal";

const clients = [
  {
    name: "Adriatic",
    logo: "/images/home-redesign/logo-adriatic.jpg",
    width: 327,
    height: 260,
  },
  {
    name: "Esplanade",
    logo: "/images/home-redesign/logo-esplanade.jpg",
    width: 273,
    height: 260,
  },
  {
    name: "Movenpick",
    logo: "/images/home-redesign/logo-movenpick.jpg",
    width: 557,
    height: 260,
  },
  {
    name: "Havas",
    logo: "/images/home-redesign/logo-havas.jpg",
    width: 488,
    height: 260,
  },
  {
    name: "Materra",
    logo: "/images/home-redesign/logo-materra.jpg",
    width: 376,
    height: 260,
  },
  {
    name: "Molum",
    logo: "/images/home-redesign/logo-molum.jpg",
    width: 455,
    height: 260,
  },
  {
    name: "Suncani Hvar",
    logo: "/images/home-redesign/logo-suncani-hvar.jpg",
    width: 471,
    height: 260,
  },
  {
    name: "Liburnia",
    logo: "/images/home-redesign/logo-liburnia.jpg",
    width: 402,
    height: 260,
  },
  {
    name: "RHG",
    logo: "/images/home-redesign/logo-rhg.jpg",
    width: 482,
    height: 260,
  },
  {
    name: "Pullman",
    logo: "/images/home-redesign/logo-pullman.jpg",
    width: 519,
    height: 260,
  },
  {
    name: "Sun Gardens",
    logo: "/images/home-redesign/logo-sun-gardens.jpg",
    width: 469,
    height: 260,
  },
  {
    name: "Terme Catez",
    logo: "/images/home-redesign/logo-terme-catez.jpg",
    width: 415,
    height: 260,
  },
];

const journeySteps = [
  { number: "1", key: "brief" },
  { number: "2", key: "design" },
  { number: "3", key: "sampling" },
  { number: "4", key: "production" },
  { number: "5", key: "delivery" },
] as const;

const contactPhonePrimary = "+385 99 6666 331";
const contactPhoneSecondary = "+385 99 169 7537";
const contactEmail = "info@stylefactory.hr";

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

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

function ClientsSection() {
  const t = useTranslations("home.clients");
  const softScale = useSoftScaleVariants();

  return (
    <Box as="section" className={styles.clientsSection} position="relative">
      <Grid
        className={styles.clientsLayout}
        alignItems="center"
        templateColumns={{ base: "1fr", lg: "220px minmax(0, 1fr)" }}
      >
        <Reveal>
          <HStack
            align="center"
            justify={{ base: "center", lg: "start" }}
            spacing="5"
          >
            <Box
              display={{ base: "none", lg: "block" }}
              h="180px"
              w="1px"
              bg="rgba(0,0,0,0.24)"
            />
            <Text
              fontFamily={poppins.style.fontFamily}
              fontSize={{ base: "18px", md: "21px" }}
              fontWeight="700"
              lineHeight="1.05"
              textAlign={{ base: "center", lg: "left" }}
              textTransform="uppercase"
            >
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </Text>
          </HStack>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055 } },
          }}
        >
          <SimpleGrid
            className={styles.clientsGrid}
            columns={{ base: 4, md: 6 }}
            spacing={{ base: "3", md: "4" }}
          >
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={softScale}
                transition={{ duration: 0.54, ease: REVEAL_EASE }}
              >
                <Box className={styles.clientLogo}>
                  <Image
                    alt={t("logoAlt", { name: client.name })}
                    className={styles.clientLogoImage}
                    src={client.logo}
                    width={client.width}
                    height={client.height}
                  />
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Grid>
    </Box>
  );
}

type ContactStatus = "idle" | "submitting" | "success" | "error";

function ContactSection() {
  const t = useTranslations("home.contact");
  const [status, setStatus] = useState<ContactStatus>("idle");

  const submitLabels: Record<ContactStatus, string> = {
    idle: t("form.send"),
    submitting: t("form.sending"),
    success: t("form.sent"),
    error: t("form.retry"),
  };

  const statusMessages: Record<ContactStatus, string> = {
    idle: "",
    submitting: t("form.statusSending"),
    success: t("form.statusSuccess"),
    error: t("form.statusError"),
  };

  // Chakra types `Grid as="form"` handlers against HTMLDivElement, hence the cast.
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (status === "submitting") return;

    const form = event.currentTarget as HTMLFormElement;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Box as="section" id="contact" className={styles.contactBand}>
      <Grid
        className={styles.contactLayout}
        position="relative"
        zIndex="1"
        alignItems="end"
        templateColumns={{ base: "1fr", lg: "0.82fr 1.18fr" }}
      >
        <Reveal className={styles.contactTitleItem}>
          <Box>
            <Text
              as="h2"
              className={styles.contactTitleText}
              fontFamily={open_sans.style.fontFamily}
              textTransform="uppercase"
            >
              <Box as="span" className={styles.contactTitleStrong}>
                {t("titleStrong")}
              </Box>{" "}
              <Box as="span" className={styles.contactTitleLight}>
                {t("titleLight")}
              </Box>
            </Text>
          </Box>
        </Reveal>

        <Reveal delay={0.08} className={styles.contactDetailsItem}>
          <VStack
            className={styles.contactDetails}
            align={{ base: "start", lg: "start" }}
            color="#272727"
            fontFamily={open_sans.style.fontFamily}
            fontSize={{ base: "12px", md: "14px" }}
            fontWeight="700"
            spacing="1"
            textAlign="left"
          >
            <Text className={styles.contactPhonePrimary}>
              <Box as="a" href={telHref(contactPhonePrimary)}>
                {contactPhonePrimary}
              </Box>
            </Text>
            <Text className={styles.contactPhoneSecondary}>
              <Box as="a" href={telHref(contactPhoneSecondary)}>
                {contactPhoneSecondary}
              </Box>
            </Text>
            <Text className={styles.contactEmail}>
              <Box as="a" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </Box>
            </Text>
          </VStack>
        </Reveal>

        <Reveal delay={0.1} className={styles.contactAddressItem}>
          <VStack
            className={styles.contactAddress}
            align={{ base: "end", lg: "start" }}
            color="#343434"
            fontFamily={open_sans.style.fontFamily}
            fontSize={{ base: "12px", md: "14px" }}
            spacing="1"
            textAlign={{ base: "right", lg: "left" }}
          >
            <Text fontWeight="700">{t("country")}</Text>
            <Text>{t("street")}</Text>
            <Text>{t("city")}</Text>
          </VStack>
        </Reveal>

        <Reveal delay={0.12} className={styles.contactFormItem}>
          <Grid
            as="form"
            onSubmit={handleSubmit}
            className={styles.contactForm}
            gap="3"
            templateColumns={{ base: "1fr 1fr 1fr", md: "1fr 1fr 1fr" }}
          >
            <Input
              name="name"
              aria-label={t("form.name")}
              placeholder={t("form.name")}
              autoComplete="name"
              maxLength={120}
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="phone"
              type="tel"
              aria-label={t("form.phone")}
              placeholder={t("form.phone")}
              autoComplete="tel"
              maxLength={40}
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="email"
              type="email"
              required
              aria-label={t("form.email")}
              placeholder={t("form.email")}
              autoComplete="email"
              maxLength={160}
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="company"
              required
              aria-label={t("form.company")}
              placeholder={t("form.company")}
              autoComplete="organization"
              maxLength={120}
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Textarea
              name="message"
              required
              aria-label={t("form.message")}
              placeholder={t("form.message")}
              maxLength={4000}
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              gridColumn={{ base: "3", md: "3" }}
              gridRow={{ base: "auto", md: "1 / 3" }}
              minH="116px"
              resize="none"
            />
            {/* Absolutely positioned, so it never becomes a grid item. */}
            <VisuallyHidden role="status" aria-live="polite">
              {statusMessages[status]}
            </VisuallyHidden>
            <Button
              type="submit"
              className={styles.formRail}
              gridColumn={{ base: "2", md: "3" }}
              justifySelf="center"
              variant="unstyled"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="180px"
              h="34px"
              border="1px solid rgba(20,20,20,0.42)"
              borderRadius="999px"
              color="#1b1b1b"
              fontFamily={open_sans.style.fontFamily}
              fontSize="10px"
              fontWeight="700"
              textTransform="uppercase"
            >
              <Box as="span">{submitLabels[status]}</Box>
              <Box
                as="span"
                className={styles.contactSendArrow}
                aria-hidden="true"
              >
                &rarr;
              </Box>
            </Button>
          </Grid>
        </Reveal>
      </Grid>
    </Box>
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
