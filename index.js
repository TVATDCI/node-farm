// CommonJs recap
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `Do you know? \n${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync(`./txt/output.text`, textOut);
console.log(`File written`);
