import {useState} from "react";
import {Box, HTMLChakraProps, Image} from "@chakra-ui/react";
import {useInterval} from "ahooks";

interface CarouselProps extends HTMLChakraProps<"div"> {
    items: string[];
    imageAlt?: string;
    /** "contain" keeps the full image visible, "cover" fills and crops */
    fit?: "cover" | "contain";
    /** aspect ratio used until the first image reports its natural size */
    fallbackRatio?: number;
}

export const Carousel = ({
                             items,
                             imageAlt = "Style Factory uniform gallery image",
                             fit = "cover",
                             fallbackRatio = 3 / 2,
                             ...rest
                         }: CarouselProps) => {
    const [count, setCount] = useState(0)
    const [ratio, setRatio] = useState<number | null>(null)

    function goNext() {
        if (count === items.length - 1) {
            setCount(0)
            return
        }
        setCount(prev => prev + 1)
    }

    useInterval(() => {
        goNext()
    }, 5000)

    return (
        <Box
            position={"relative"}
            overflow={"hidden"}
            w={"100%"}
            aspectRatio={fit === "contain" ? `${ratio ?? fallbackRatio}` : undefined}
            {...rest}
        >
            {
                items.map((item, index) => {
                    return (
                        <Image
                            src={item}
                            key={`img-${index}`}
                            alt={`${imageAlt} ${index + 1}`}
                            decoding="async"
                            loading={index === 0 ? "eager" : "lazy"}
                            onLoad={index === 0 ? (event) => {
                                const {naturalWidth, naturalHeight} = event.currentTarget;
                                if (naturalWidth && naturalHeight) {
                                    setRatio(naturalWidth / naturalHeight)
                                }
                            } : undefined}
                            position={"absolute"}
                            top={0}
                            left={0}
                            w={"100%"}
                            h={"100%"}
                            objectFit={fit}
                            // When max-height clamps the ratio box, `contain`
                            // would centre the artwork and open a gap under the
                            // heading — keep it pinned to the top instead.
                            objectPosition={fit === "contain" ? "center top" : "center"}
                            opacity={index === count ? 1 : 0}
                            transition={"opacity 0.6s ease-in-out"}
                        />
                    )
                })
            }
        </Box>
    )
}
