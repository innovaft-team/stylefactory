import {extendTheme} from "@chakra-ui/react";
import {textStyles} from "./textStyles";


const theme = extendTheme({
    textStyles: {
        ...textStyles
    },
    styles: {
        global: {
            html: {
                blockSize: '100%',
                inlineSize: '100%',
            },
            body: {
                blockSize: '100%',
                inlineSize: '100%',

            },
            '#__next': {
                display: 'grid',
                inlineSize: '100%',
                minBlockSize: '100vh'
            }
        }
    },
    initialColorMode: "light",
    useSystemColorMode: false,
})


export default theme;
