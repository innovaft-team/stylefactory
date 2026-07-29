import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { motion } from "framer-motion";
import type { CSSProperties, PropsWithChildren } from "react";
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

const services = [
  {
    title: "Design",
    copy: "From uniform concepts to complete brand guidelines, we help companies build a consistent and recognizable team image.",
  },
  {
    title: "Development",
    copy: "From sourcing and production coordination to final delivery, we manage the complete development process for each project.",
  },
  {
    title: "Production",
    copy: "Through our manufacturing network, we support hospitality brands and corporate teams with sourcing, production, and project coordination.",
  },
];

const serviceMedallionClasses = [
  "serviceMedallionDesign",
  "serviceMedallionDevelopment",
  "serviceMedallionProduction",
] as const;

const serviceItemClasses = [
  "serviceItemDesign",
  "serviceItemDevelopment",
  "serviceItemProduction",
] as const;

const clients = [
  { name: "Adriatic", logo: "/images/home-redesign/logo-adriatic.jpg" },
  { name: "Esplanade", logo: "/images/home-redesign/logo-esplanade.jpg" },
  { name: "Movenpick", logo: "/images/home-redesign/logo-movenpick.jpg" },
  { name: "Havas", logo: "/images/home-redesign/logo-havas.jpg" },
  { name: "Materra", logo: "/images/home-redesign/logo-materra.jpg" },
  { name: "Molum", logo: "/images/home-redesign/logo-molum.jpg" },
  { name: "Suncani Hvar", logo: "/images/home-redesign/logo-suncani-hvar.jpg" },
  { name: "Liburnia", logo: "/images/home-redesign/logo-liburnia.jpg" },
  { name: "RHG", logo: "/images/home-redesign/logo-rhg.jpg" },
  { name: "Pullman", logo: "/images/home-redesign/logo-pullman.jpg" },
  { name: "Sun Gardens", logo: "/images/home-redesign/logo-sun-gardens.jpg" },
  { name: "Terme Catez", logo: "/images/home-redesign/logo-terme-catez.jpg" },
];

const journeySteps = [
  {
    number: "1",
    title: "Brief & Consultation",
    copy: "We begin by understanding your brand, operational needs, and team requirements. Through a detailed briefing process, we define the standards, functionality, and visual direction of your uniform collection.",
  },
  {
    number: "2",
    title: "Design Development",
    copy: "Every uniform concept is thoughtfully designed to reflect your brand identity. From sketches and fabric selection to styling and functionality, every detail is carefully considered.",
  },
  {
    number: "3",
    title: "Sampling & Approval",
    copy: "Once the design concept is confirmed, we develop prototypes and samples to ensure the perfect fit, comfort, and final appearance before production begins.",
  },
  {
    number: "4",
    title: "Sizing & Production",
    copy: "After sample approval, we collect sizing information for all team members and coordinate the full production process with our manufacturing partners.",
  },
  {
    number: "5",
    title: "Delivery",
    copy: "The finished uniforms are quality-checked, organized, and delivered ready for your team to wear.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const softScale = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  className,
}: PropsWithChildren<{ delay?: number; amount?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUp}
      transition={{
        duration: 0.78,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow?: string;
  title?: string;
  align?: "left" | "center";
}) {
  return (
    <VStack
      align={align === "center" ? "center" : "start"}
      spacing="2"
      textAlign={align}
    >
      {eyebrow ? (
        <Text
          color="rgba(20, 20, 20, 0.62)"
          fontFamily={open_sans.style.fontFamily}
          fontSize={{ base: "11px", md: "28px" }}
          fontWeight="400"
          textTransform="uppercase"
        >
          {eyebrow}
        </Text>
      ) : null}
      {title ? (
        <Text
          as="h2"
          fontFamily={poppins.style.fontFamily}
          fontSize={{ base: "28px", md: "42px" }}
          fontWeight="700"
          lineHeight="1"
        >
          {title}
        </Text>
      ) : null}
    </VStack>
  );
}

function PlaceholderVisual({
  label,
  className,
  minH,
}: {
  label: string;
  className: string;
  minH?: string | { base?: string; md?: string; lg?: string };
}) {
  return (
    <Box className={`${styles.placeholderFrame} ${className}`} minH={minH}>
      <Text className={styles.visualLabel}>{label}</Text>
    </Box>
  );
}

function WhatWeDoSection() {
  return (
    <Box
      as="section"
      className={styles.whatSection}
      position="relative"
      overflow="hidden"
    >
      <Box className={styles.seamGrid} />
      <Box className={styles.whatHeading}>
        <Text
          as="h2"
          className={styles.whatHeadingText}
          fontFamily={open_sans.style.fontFamily}
        >
          <Box as="span" className={styles.whatHeadingStrong}>
            WHAT
          </Box>{" "}
          <Box as="span" className={styles.whatHeadingSoft}>
            WE DO
          </Box>
        </Text>
      </Box>

      <Grid
        className={styles.whatLayout}
        position="relative"
        zIndex="1"
        alignItems="start"
        templateColumns={{
          base: "1fr",
          md: "minmax(120px, 1fr) minmax(400px, 660px) minmax(120px, 1fr)",
          lg: "minmax(300px, 1fr) minmax(580px, 660px) minmax(300px, 1fr)",
        }}
      >
        <Reveal amount={0.28} className={styles.whatSuitSlot}>
          <PlaceholderVisual
            className={`${styles.suitPlaceholder} ${styles.whatSuit}`}
            label="jacket placeholder"
          />
        </Reveal>

        <VStack className={styles.whatContent} position="relative" spacing="0">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`${styles.serviceItem} ${styles[serviceItemClasses[index]]}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={softScale}
              transition={{
                duration: 0.72,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: "100%" }}
            >
              <VStack
                className={styles.serviceBlock}
                position="relative"
                spacing="0"
                textAlign="center"
              >
                <Box
                  className={`${styles.serviceMedallion} ${styles[serviceMedallionClasses[index]]}`}
                />
                <Text
                  as="h3"
                  className={styles.serviceTitle}
                  position="relative"
                  zIndex="1"
                  fontFamily={open_sans.style.fontFamily}
                >
                  {service.title}
                </Text>
                <Text
                  className={styles.serviceCopy}
                  position="relative"
                  zIndex="1"
                  fontFamily={open_sans.style.fontFamily}
                >
                  {service.copy}
                </Text>
              </VStack>
            </motion.div>
          ))}
        </VStack>

        <Reveal delay={0.15} amount={0.28} className={styles.whatSketchSlot}>
          <PlaceholderVisual
            className={`${styles.sketchPlaceholder} ${styles.whatSketch}`}
            label="sketch placeholder"
          />
        </Reveal>
      </Grid>
    </Box>
  );
}

function ClientsSection() {
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
              Selected
              <br />
              Clients
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
                transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
              >
                <Box className={styles.clientLogo}>
                  <Box
                    as="img"
                    alt={`${client.name} logo`}
                    className={styles.clientLogoImage}
                    src={client.logo}
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

function ContactSection() {
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
          <Box className={styles.contactTitle}>
            <Text
              as="h2"
              className={styles.contactTitleText}
              fontFamily={open_sans.style.fontFamily}
              textTransform="uppercase"
            >
              <Box as="span" className={styles.contactTitleStrong}>
                Get
              </Box>{" "}
              <Box as="span" className={styles.contactTitleLight}>
                in touch
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
            <Text className={styles.contactPhonePrimary}>+385 99 6666 331</Text>
            <Text className={styles.contactPhoneSecondary}>
              +385 99 169 7537
            </Text>
            <Text className={styles.contactEmail}>info@stylefactory.hr</Text>
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
            <Text fontWeight="700">CROATIA</Text>
            <Text>Vrisnička 18</Text>
            <Text>10 000 Zagreb</Text>
          </VStack>
        </Reveal>

        <Reveal delay={0.12} className={styles.contactFormItem}>
          <Grid
            as="form"
            action="mailto:info@stylefactory.hr"
            method="post"
            encType="text/plain"
            className={styles.contactForm}
            gap="3"
            templateColumns={{ base: "1fr 1fr 1fr", md: "1fr 1fr 1fr" }}
          >
            <Input
              name="name"
              placeholder="Name"
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="phone"
              placeholder="Phone"
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email address*"
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Input
              name="company"
              placeholder="Company*"
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              h="52px"
            />
            <Textarea
              name="message"
              placeholder="Message*"
              bg="rgba(255,255,255,0.78)"
              border="0"
              borderRadius="6px"
              gridColumn={{ base: "3", md: "3" }}
              gridRow={{ base: "auto", md: "1 / 3" }}
              minH="116px"
              resize="none"
            />
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
              <Box as="span">Send</Box>
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{
        duration: 0.78,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
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
            {step.title}
          </Text>
          <Text
            color="rgba(20, 20, 20, 0.75)"
            fontFamily={open_sans.style.fontFamily}
            fontSize={{ base: "12px", md: "25px" }}
            lineHeight={{ base: "1.65", md: "1.28" }}
          >
            {step.copy}
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
}

function JourneySection() {
  return (
    <Box as="section" className={styles.journeySection} position="relative">
      <Text
        className={styles.scriptBackdrop}
        fontFamily={allura.style.fontFamily}
      >
        process
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
                The Uniform
              </Box>{" "}
              <Box as="span" className={styles.journeyTitleLight}>
                Journey
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
              <PlaceholderVisual
                className={styles.photoPlaceholder}
                label="photo placeholder"
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
              <PlaceholderVisual
                className={styles.fabricBoard}
                label="fabric placeholder"
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
              <PlaceholderVisual
                className={styles.pantsPlaceholder}
                label="pants placeholder"
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
            <Box className={styles.journeySketch}>
              <Text className={styles.visualLabel}>technical sketch</Text>
            </Box>
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
          Because first impressions begin with what your team wears
        </Text>
      </Flex>
    </Box>
  );
}

function Home() {
  const { locale } = useRouter();
  const title = "Style Factory Uniforms";
  const description =
    "Custom uniform design, development, and production for hospitality, hotel, restaurant, and corporate teams in Croatia and Europe.";

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path="/"
        image="/images/home-redesign/hero-model.jpg"
        imageAlt="Style Factory custom uniforms for modern hospitality and corporate brands"
        keywords={[
          "custom uniforms",
          "hospitality uniforms",
          "hotel uniforms",
          "corporate workwear",
          "uniform design Croatia",
          "Style Factory Uniforms",
        ]}
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

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`@/locales/${locale}.json`)).default,
    },
  };
}

export default Home;
