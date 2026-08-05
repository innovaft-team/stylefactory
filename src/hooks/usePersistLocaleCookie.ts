import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EXPIRY_MS = 100 * 24 * 60 * 60 * 1000; // 100 days

/**
 * Next reads NEXT_LOCALE to decide which locale an unprefixed URL belongs to,
 * so the chosen language only sticks across visits once this is written.
 */
export function writeLocaleCookie(locale?: string | null) {
    if (!locale || typeof document === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + EXPIRY_MS);
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
}

export function usePersistLocaleCookie() {
    const { locale } = useRouter();

    useEffect(() => {
        writeLocaleCookie(locale);
    }, [locale]);
}
