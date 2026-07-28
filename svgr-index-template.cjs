const path = require('path');

function defaultIndexTemplate(filePaths) {
    console.log('filePaths', filePaths)
    const exportEntries = filePaths.map((filePath) => {
        const basename = path.basename(filePath.path, path.extname(filePath.path));
        const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
        const presentationName = exportName.toLocaleLowerCase().endsWith('icon')
            ? exportName
            : `${exportName}Icon`;

        return `export { Svg${exportName} as ${presentationName}, ChakraSvg${exportName} as Chakra${presentationName}  } from './${basename}'`;
    });

    return exportEntries.join('\n');
}

module.exports = defaultIndexTemplate;
