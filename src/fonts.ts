import { Montserrat, Poppins, Open_Sans, Allura } from "next/font/google";
import localFont from "next/font/local";

/**
 * Inter, self-hosted as a four-glyph subset.
 *
 * It is applied to exactly four characters on the whole site: the ghost step
 * numerals 2, 3, 4 and 5 in the Journey section. Via `next/font/google` that
 * pulled the full Latin variable file — 47.5 KB — plus seven @font-face rules
 * into the homepage's render-blocking stylesheet.
 *
 * This file is Google's own `&text=2345` subset of the same variable font, so
 * the outlines are identical. The weight range stays 100-900 because the
 * numerals render at `font-black` (900).
 */
export const inter = localFont({
  src: "./assets/fonts/inter-var-digits-2345.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});




// Montserrat and Open Sans ship variable files, so omitting `weight` gets the
// whole 100-900 range in a single woff2 instead of one file per weight.
// Only Montserrat is preloaded — it's the body font and renders above the fold;
// the other two are below-the-fold only and would otherwise compete with the
// LCP image for bandwidth.
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

// Poppins has no variable file on Google Fonts, so weights stay explicit.
// 300-700 covers every weight actually used inside a Poppins container.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export const beautifullyDelicious = localFont({
  src: "./assets/fonts/BDScript-Regular.ttf",
  display: "swap",
  preload: false,
});

/**
 * Noto Sans JP, self-hosted as a single-glyph subset.
 *
 * It renders exactly one character on the whole site — the ghost "1" in the
 * Journey section. Loaded through `next/font/google` it cost 93 KB of the
 * homepage's *render-blocking* stylesheet, because Google splits the family
 * into ~120 unicode-range blocks and `subsets` only narrows which files get
 * preloaded, never which @font-face rules are emitted (Next 14 has no `text`
 * option). That single stylesheet was 87% Japanese glyph declarations the site
 * can never use.
 *
 * This file is Google's own `&text=1` subset of the same family and weight, so
 * the glyph is identical — 828 bytes instead of a 13 KB block, and one
 * @font-face rule instead of 124.
 */
export const notoSansJP = localFont({
  src: "./assets/fonts/noto-sans-jp-700-digit-1.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});

export const lato = montserrat;
export const playfair = montserrat;
export const cormorant_garamond = montserrat;
export const comforterBrush = montserrat;
export const mrsSaintDelafield = montserrat;
export const qwitcherGrypen = montserrat;
