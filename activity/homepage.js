const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio')

// request("https://www.espncricinfo.com/series/ipl-2020-21-1210595" , (err, res, body)=>{
//     fs.writeFileSync('./homepage.html', body);
// } );

let homepage = fs.readFileSync("./homepage.html");

let ch = cheerio.load(homepage);

let aTag = ch(".widget-items.cta-link a");
let allMatchesResults = "https://www.espncricinfo.com"+aTag['0'].attribs.href;
console.log(allMatchesResults);