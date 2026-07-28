module.exports = {
    jsxRuntime: 'automatic',
    icon: false,
    // native
    typescript: true,
    dimensions: true,
    expandProps: 'end',
    prettier: true,
    svgo: true,
    template: (variables, { tpl }) => {
        return tpl`
'use client';
import { chakra } from "@chakra-ui/react";
import type { SVGProps } from 'react';

${variables.interfaces};

export const ${variables.componentName} = (${variables.props}) => (
	${variables.jsx}
);

export const ${'Chakra' + variables.componentName} = chakra(${variables.componentName});
`;
    },
    outDir: './src/components/atoms/icons',
    index: true,
    ignoreExisting: false,
    filenameCase: 'pascal',
    ext: 'tsx',
};
