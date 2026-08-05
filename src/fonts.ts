import { Montserrat, Poppins, Open_Sans, Inter, Allura, Noto_Sans_JP } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
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

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export const lato = montserrat;
export const playfair = montserrat;
export const cormorant_garamond = montserrat;
