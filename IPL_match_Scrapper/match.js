const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getMatchDetails(link){
    request( link , function(err , response , data){
        processData(data);
    });
}

function processData(html){
    let ch = cheerio.load(html);
    // get team names of both the teams !!!
    let bothInnings = ch('.Collapsible');
    // {  <div class="Collapsible"> </div> , <div class="Collapsible"> </div>   };
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);
        
        // batsman table => Delhi Capitals
        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
        // { <tr></tr> , <tr></tr> ,<tr></tr> ,<tr></tr> , <tr></tr>, <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr>  };
        for(let j=0 ; j<allTrs.length-1 ;j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                // { <td> </td> , <td> </td> , <td> </td>  };
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();

                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes}`);

                processDetails(teamName, batsmanName, runs, balls, fours, sixes);

            }
        }
    }
    console.log("###################################");
}

function checkTeamFolder(teamName){
    let teamPath = `./IPL_teams/${teamName}`;
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName, batsman){
    let batsmanPath = `./IPL_teams/${teamName}/${batsman}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName, batsman, runs, balls, fours, sixes){
    let batsmanFilePath = `./IPL_teams/${teamName}/${batsman}.json`;
    let batsmanFile = fs.readFileSync(batsmanFilePath);
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes
    };
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName, batsman, runs, balls, fours, sixes){

    let batsmanFilePath = `./IPL_teams/${teamName}/${batsman}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours, 
        Sixes : sixes
    };
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(batsmanFile));
}

function createTeamFolder(teamName){
    let teamPath = `IPL_teams/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processDetails(teamName, batsman, runs, balls, fours, sixes){

    let teamFolderExist = checkTeamFolder(teamName);

    if(teamFolderExist){
        let batsmanFileExist = checkBatsmanFile(teamName, batsman);
        if(batsmanFileExist){
            updateBatsmanFile(teamName, batsman, runs, balls, fours, sixes);
        }
        else{
            createBatsmanFile(teamName, batsman, runs, balls, fours, sixes);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsman, runs, balls, fours, sixes);
    }

}

module.exports = getMatchDetails;