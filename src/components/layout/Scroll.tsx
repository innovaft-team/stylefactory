import {Box, BoxProps} from "@chakra-ui/react";

export const Scroll = ({children, ...rest}: BoxProps) => {
    return (
        <Box
            overflow={"auto"}
            sx={{
                "&::-webkit-scrollbar": {
                    base: {
                        width: 0,
                    },
                    lg: {
                        width: "4px",
                        bg: "gray.100",
                    }
                },
                "&::-webkit-scrollbar-thumb": {
                    background: 'rgb(128, 128, 128)',
                    borderRadius: "5px",
                },
            }}
            css={{
                direction: "rtl",
                '& > *': {
                    direction: 'ltr'
                }
            }}
            aria-roledescription={"scroll"}
            {...rest}
        >
            {children}
        </Box>
    );
};
