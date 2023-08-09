import { readFile, writeFile } from 'fs';
import path from 'path';

const inputPath = path.join(__dirname, './apidoc.sample.json');
const outputPath = path.join(__dirname, '../apidoc.json');

const replaceAll = (str, find, replace) => {
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

readFile(inputPath, 'utf8', function (err, fileContent) {
  if (err) return console.log(err);
  const result = replaceAll(fileContent, '${DOMAIN}', `${process.env.DOMAIN}:${process.env.APP_PORT}`);

  writeFile(outputPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
