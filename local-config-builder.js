// @ts-ignore
/* eslint-disable @typescript-eslint/quotes */
const env = process.argv[2];

const fs = require("fs");

const filepath = "./public/env-config.js";
const filepathCypress = "./cypress/env-config.js";
const data = fs.readFileSync(`./.config-${env}`);

const variables = data.toString().split("\n")
  .map((str) => {
    const regex = /^([^:]+):(.+)/gm;
    const m = regex.exec(str);
    return `${m[1].trim()}: "${m[2].trim()}",`;
  })
  .reduce((res, x) => res.concat(x), "");

fs.writeFileSync(filepath, `window.__ENV__ = { ${variables} }`);
fs.writeFileSync(filepathCypress, `window.__ENV__ = { ${variables} }`);
