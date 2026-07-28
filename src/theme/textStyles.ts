import type {SystemStyleObjectRecord} from '@chakra-ui/react';


export const textStyles = {
    display1: {
        fontFamily: 'heading',
        fontSize: '8rem',
        lineHeight: 'none',
        letterSpacing: '-0.24rem',
        fontWeight: 'normal',
    },
    heading1: {
        fontFamily: 'heading',
        fontSize: {
            base: '3rem',
            md: '4rem',
        },
        lineHeight: 'none',
        letterSpacing: {
            base: '-0.06rem',
            md: '-0.12rem',
        },
        fontWeight: 'normal',
    },
    heading2: {
        fontFamily: 'heading',
        fontSize: {
            base: '2.25rem',
            md: '3rem',
        },
        lineHeight: {
            base: '3rem',
            md: 'none',
        },
        letterSpacing: {
            base: '-0.045rem',
            md: '-0.06rem',
        },
        fontWeight: 'normal',
    },
    heading3: {
        fontFamily: 'heading',
        fontSize: {
            base: '1.75rem',
            md: '2.25rem',
        },
        lineHeight: {
            base: '2rem',
            md: '3rem',
        },
        letterSpacing: {
            base: '-0.035rem',
            md: '-0.045rem',
        },
        fontWeight: 'normal',
    },
    heading4: {
        fontFamily: 'heading',
        fontSize: {
            base: '1.375rem',
            md: '1.75rem',
        },
        lineHeight: {
            base: 6,
            md: 8,
        },
        letterSpacing: {
            base: '-0.0275rem',
            md: '-0.035rem',
        },
        fontWeight: {
            md: 'normal',
        },
    },
    heading5: {
        fontFamily: 'heading',
        fontSize: {
            base: '1.125rem',
            md: '1.375rem',
        },
        lineHeight: 6,
        letterSpacing: {
            base: '-0.0225rem',
            md: '-0.0275rem',
        },
        fontWeight: 'normal',
    },
    heading6: {
        fontFamily: 'heading',
        fontSize: {
            base: '1rem',
            md: '1.125rem',
        },
        lineHeight: 6,
        letterSpacing: {
            base: '-0.02rem',
            md: '-0.0225rem',
        },
        fontWeight: 'normal',
    },
    title1: {
        fontSize: {
            base: '1.125rem',
            md: '1.375rem',
        },
        lineHeight: 6,
        letterSpacing: {
            base: '-0.03375rem',
            md: '-0.04125rem',
        },
        fontWeight: 'bold',
    },
    title2: {
        fontSize: {
            base: '1rem',
            md: '1.125rem',
        },
        lineHeight: 6,
        letterSpacing: {base: '-0.03rem', md: '-0.03375rem'},
        fontWeight: 'bold',
    },
    title3: {
        fontSize: {
            base: '0.875rem',
            md: '0.9375rem',
        },
        lineHeight: {
            base: 4,
            md: 5,
        },
        letterSpacing: {
            base: '0.0175rem',
            md: '-0.01875rem',
        },
        fontWeight: 'bold',
    },
    body1: {
        fontSize: '1.125rem',
        lineHeight: 6,
        letterSpacing: {
            base: '-0.03375rem',
            md: '-0.0225rem',
        },
        fontWeight: 'normal',
    },
    body2: {
        fontSize: {
            base: '0.9375rem',
            md: '1rem',
        },
        lineHeight: 6,
        letterSpacing: {
            base: '-0.01875rem',
            md: '-0.02rem',
        },
        fontWeight: 'normal',
    },
    body3: {
        fontSize: {
            base: '0.6875rem',
            md: '0.875rem',
        },
        lineHeight: {
            base: 4,
            md: 6,
        },
        letterSpacing: {
            base: '-0.01375rem',
            md: '-0.0175rem',
        },
        fontWeight: 'normal',
    },
    body4: {
        fontSize: '0.6875rem',
        lineHeight: 4,
        letterSpacing: '-0.02rem',
        fontWeight: 'normal',
    },
    buttonLarge: {
        fontSize: '1.125rem',
        lineHeight: 'calc(4 / 3)',
        letterSpacing: '-0.03375rem',
        fontWeight: 'bold',
    },
    buttonRegular: {
        fontSize: {
            base: '1rem',
            md: '0.875rem',
        },
        lineHeight: 6,
        letterSpacing: {base: '-0.03rem', md: '-0.02625rem'},
        fontWeight: 'bold',
    },
    buttonSmall: {
        fontSize: '0.75rem',
        lineHeight: 4,
        letterSpacing: '-0.015rem',
        fontWeight: 'bold',
    },
    caption: {
        fontSize: {
            base: '0.6875rem',
            md: '0.75rem',
        },
        lineHeight: 3,
        letterSpacing: {
            base: '-0.01375rem',
            md: '-0.015rem',
        },
        fontWeight: 'medium',
    },
} satisfies SystemStyleObjectRecord;
