import {
    EB_Garamond,
    Lato,
    Playfair,
    Antic,
    Poppins,
    Open_Sans,
    Allura,
    Cormorant_Garamond,
    Comforter_Brush,
    Mrs_Saint_Delafield,
    Qwitcher_Grypen
} from "next/font/google";

export const lato = Lato({
    subsets: ["latin"],
    weight: "300"
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "700", "900"]
});

export const open_sans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "700"]
});

export  const playfair = Playfair({
    subsets: ["latin"],
});

export  const allura = Allura({
    weight: "400",
    subsets: ["latin"]
});

export const cormorant_garamond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    style: ["italic", 'normal']
})

export const antic = Antic({
    subsets: ["latin"],
    weight: ["400"]
});

export const comforterBrush = Comforter_Brush({
    subsets: ["latin"],
    weight: ["400"]
})

export const mrsSaintDelafield = Mrs_Saint_Delafield({
    subsets: ["latin"],
    weight: ["400"]
})

export const qwitcherGrypen = Qwitcher_Grypen({
    subsets: ["latin"],
    weight: ["400"]
})