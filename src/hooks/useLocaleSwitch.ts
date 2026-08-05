import { useRouter } from "next/router";
import { useCallback } from "react";
import type { Locale } from "nextjs-routes";
import { writeLocaleCookie } from "@/hooks/usePersistLocaleCookie";

/**
 * Single source of truth for switching locale. Both the desktop picker and the
 * mobile drawer use it so a switch behaves the same everywhere - including on
 * dynamic routes such as /blog/[id], where the current params have to be
 * carried over or Next cannot rebuild the URL for the other locale.
 */
export function useLocaleSwitch() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const switchLocale = useCallback(
    (nextLocale: string) => {
      if (nextLocale === locale) return;

      // Written up front rather than in an effect: the mobile drawer unmounts
      // right after the switch, so an effect there would never run.
      writeLocaleCookie(nextLocale);

      router.push({ pathname, query }, asPath, {
        locale: nextLocale as Locale,
        scroll: false,
      });
    },
    [asPath, locale, pathname, query, router],
  );

  return { locale, switchLocale };
}
