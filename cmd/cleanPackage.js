import { readFileSync, writeFileSync } from 'fs';

const primitiveText = readFileSync('package.json');

const objectText = JSON.parse(primitiveText);

delete objectText.devDependencies;
delete objectText.scripts;
delete objectText.type;

writeFileSync('./dist/package.json', JSON.stringify(objectText, null, 2));
