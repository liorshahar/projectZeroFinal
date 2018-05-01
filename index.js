var vote    = require('./vote'),
    http    = require('http'),
    fs      = require('fs'),
    express = require('express'),
    app     = express();
    systemPath  = require('./config').path;

// Array that holding the current voting
var votingArray = [];

// Log file
var logfile = fs.createWriteStream(systemPath.ROOT_DIR + systemPath.TEXT_FILE , {encoding: 'utf8'});

// Get all data function about the voting that in the server 
function getAllData(votingArray){
    console.log('*****Prinring all current voting data*****');
    votingArray.forEach((element) => {
        element.getAllData();
    });
}

// Create Pub Vote object 
var goToPubSubjects = { yes : 0  , no : 0 };
var maxVote = 10;
var goToPub = vote('Go To Pub' , goToPubSubjects , maxVote , logfile);
votingArray.push(goToPub);

// Create Prime Minister vote object 
var primeMinisterSubject = {Bibi : 0 , Lapid : 0 , Buji : 0};
maxVote = 10;
var primeMinister = vote('Prime Minster' , primeMinisterSubject , maxVote , logfile);
votingArray.push(primeMinister);

// Create smoke vote object
var smokers = { good : 0 , bad : 0};
maxVote = 10;
var smokersVote = vote('Smokers Vote' , smokers , maxVote , logfile);
votingArray.push(smokersVote);


// Go To Pub run

goToPub.addVote('yes');
goToPub.addVote('no');
goToPub.addVote('no');
goToPub.addVote('no');
goToPub.addVote('no');
goToPub.addVote('yes');
goToPub.addVote('no');
goToPub.addVote('no');
goToPub.addVote('no');
goToPub.addVote('no');


// Prime minister run

primeMinister.addVote('Bibi');
primeMinister.addVote('Lapid');
primeMinister.addVote('Buji');
primeMinister.addVote('Bibi');
primeMinister.addVote('Lapid');
primeMinister.addVote('Buji');
primeMinister.addVote('Bibi');
primeMinister.addVote('Lapid');
primeMinister.addVote('Buji');
primeMinister.addVote('Bibi');
primeMinister.addVote('Bibi');

// smokers vote run
smokersVote.addVote('good');
smokersVote.addVote('good');
smokersVote.addVote('bad');

// Create server with express
app.get('/' , function(req , res){
    var rstream = fs.createReadStream(systemPath.ROOT_DIR + systemPath.TEXT_FILE , {encoding: 'utf8'});
    rstream.pipe(res);
});
http.createServer(app).listen(3000);
console.log('Listening on port 3000');


getAllData(votingArray);

// Zero all  object vote
console.log('*****Zeroing the Vote*****');
logfile.write('*****Zeroing the Vote***** \n');
goToPub.zeroVote();
primeMinister.zeroVote();
smokersVote.zeroVote();
getAllData(votingArray);
logfile.end();
