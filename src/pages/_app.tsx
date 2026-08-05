import "@/styles/globals.css";
import type {AppProps} from "next/app";
import type {NextPage} from "next";
import type {ReactElement, ReactNode} from "react";
import {Box, ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import theme from "@/theme/theme";
import {useRouter} from "next/router";
import {AbstractIntlMessages, NextIntlClientProvider} from "next-intl";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {useEffect, useMemo, useState} from "react";
import Head from "next/head";
import { montserrat } from "@/fonts";
import { NavigationLayout } from "@/components/layout/NavigationLayout";
import { BackToTop } from "@/components/BackToTop";
import NextTopLoader from "nextjs-toploader";
import { usePersistLocaleCookie } from "@/hooks/usePersistLocaleCookie";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const router = useRouter()
    usePersistLocaleCookie();
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

    const getLayout = Component.getLayout ?? ((page: ReactElement) => (
        <NavigationLayout darkHero={false}>{page}</NavigationLayout>
    ));

    return (
        <NextIntlClientProvider locale={router.locale} messages={pageProps.messages} timeZone={"Europe/Zagreb"}>
            <div className={montserrat.className}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32"/>
                    <link rel="icon" href="/images/favicon-16x16.png" sizes="16x16"/>
                    <link rel="shortcut icon" href="/images/favicon-32x32.png"/>
                    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
                </Head>
                <ChakraProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <NextTopLoader
                            color="#8C8476"
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={false}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #8C8476,0 0 5px #8C8476"
                            zIndex={999999}
                        />
                        {getLayout(
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
                        )}
                        <BackToTop />
                    </QueryClientProvider>
                </ChakraProvider>
            </div>
        </NextIntlClientProvider>
    )
}
