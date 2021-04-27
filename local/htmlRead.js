const fs = require('fs');
const cheerio = require('cheerio');
// console.log(ch);
let htmldata = fs.readFileSync('./index.html');
let ch = cheerio.load(htmldata);
let h1 = ch('h1').text();
console.log(h1);



