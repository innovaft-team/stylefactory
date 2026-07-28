import {useState} from "react";
import {Box, Flex, HTMLChakraProps, Image, useBreakpointValue} from "@chakra-ui/react";
import {useInterval} from "ahooks";

interface CarouselProps extends HTMLChakraProps<"div"> {
    items: string[];
    imageAlt?: string;
}

export const Carousel = ({items, imageAlt = "Style Factory uniform gallery image", ...rest}: CarouselProps) => {
    const [count, setCount] = useState(0)

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

    const imageWith = useBreakpointValue({
        base: 100,
        md: 50,
    })


    const scrollSnap = count * -(imageWith ?? 50)

    return (
        <Box overflowY={"hidden"} {...rest}>
            <Flex
                transitionProperty={"transform"}
                willChange={"transform"}
                transitionTimingFunction={"cubic-bezier(0.4, 0, 0.2, 1)"}
                transform={`translate3d(${scrollSnap}vw, 0, 0)`}
                transitionDuration={"0.3s"}
                w={{
                    base: `${items.length * 100}vw`,
                    md: `${items.length * 50}vw`
                }}
                h={"full"}
                overflowY={"hidden"}
                alignItems={"center"}
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
                                    w={{
                                        base: '100vw',
                                        md: "50vw",
                                    }}
                                    h={"auto"}
                                />
                        )
                    })
                }
            </Flex>
        </Box>
    )
}
