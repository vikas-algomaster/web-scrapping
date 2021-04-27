const fs = require('fs');
const cheerio = require('cheerio');
// console.log(cheerio);
let htmldata = fs.readFileSync('./index.html');
let ch = cheerio.load(htmldata);
// console.log(ch.text());
let h1data = ch('h1');
// console.log(h1data.text());

// How to extract data from a particular p tag
let ptag = ch('p');
let ptag2 = ptag[2];
// console.log(ptag2);

let ptag2data = ch(ptag2).text();
let lastPTagdata = ch(ptag["3"]).text();

// console.log(ptag2data);
// console.log(lastPTagdata);

// how to find a particular element in the html ?????
// i want to find the content of all p tags which is inside ul !!!
// for descendents use "<space>"
let pInsideUl = ch("ul p").text();
// console.log(pInsideUl);

// For direct childrens use ">"
let pChildUl = ch("ul>p").text();
// console.log(pChildUl);

// classes => multiple elements pe same classes => to style same set of elements 
// ids => unique on the page !!!

// select elements on the basis of class
// use dot in case of class
// let pTags = ch("p").length; => to find length of the cheerio object

let pTagClass = ch(".text.main").text();
// console.log(pTagClass);

// ids => #
console.log(ch("#unique").text());