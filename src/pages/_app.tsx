import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {Box, ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import theme from "@/theme/theme";
import {useRouter} from "next/router";
import {AbstractIntlMessages, NextIntlClientProvider} from "next-intl";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {useEffect, useMemo, useState} from "react";
import Head from "next/head";

const queryClient = new QueryClient();

type PageProps = {
    messages: AbstractIntlMessages;
    now: number;
};

type Props = Omit<AppProps<PageProps>, 'pageProps'> & {
    pageProps: PageProps;
};

export default function App({Component, pageProps}: Props) {
    const router = useRouter()
    const prefersReducedMotion = useReducedMotion();
    const [isRouteChanging, setIsRouteChanging] = useState(false);
    const routeTransitionKey = useMemo(
        () => router.asPath.split("#")[0],
        [router.asPath],
    );

    useEffect(() => {
        const handleStart = (url: string) => {
            if (url.split("#")[0] !== router.asPath.split("#")[0]) {
                setIsRouteChanging(true);
            }
        };
        const handleDone = () => setIsRouteChanging(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleDone);
        router.events.on("routeChangeError", handleDone);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleDone);
            router.events.off("routeChangeError", handleDone);
        };
    }, [router.asPath, router.events]);

    return (
        <NextIntlClientProvider locale={router.locale} messages={pageProps.messages} timeZone={"Europe/Zagreb"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#ffffff"/>
                <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32"/>
                <link rel="icon" href="/images/favicon-16x16.png" sizes="16x16"/>
                <link rel="apple-touch-icon" href="/images/favicon-32x32.png"/>
            </Head>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Box
                        aria-hidden="true"
                        bg="rgba(18, 18, 18, 0.72)"
                        h="2px"
                        left="0"
                        opacity={isRouteChanging ? 1 : 0}
                        position="fixed"
                        right="0"
                        top="0"
                        transform={isRouteChanging ? "scaleX(1)" : "scaleX(0)"}
                        transformOrigin="left center"
                        transition="transform 520ms ease, opacity 180ms ease"
                        zIndex="20000"
                    />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={routeTransitionKey}
                            initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: -8}}
                            style={{minHeight: "100vh", width: "100%"}}
                            transition={{duration: prefersReducedMotion ? 0.16 : 0.28, ease: [0.22, 1, 0.36, 1]}}
                        >
                            <Component {...pageProps} />
                        </motion.div>
                    </AnimatePresence>
                </QueryClientProvider>
            </ChakraProvider>
        </NextIntlClientProvider>
    )


}
