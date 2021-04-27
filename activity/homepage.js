const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio')

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595" , (err, res, body)=>{
    fs.writeFileSync('./homepage.html', body);
} );