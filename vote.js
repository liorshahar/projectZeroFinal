var events      = require('events') ,
    fs          = require('fs'),
    eventConfig = require('./config').events,
    systemPath  = require('./config').path;

class VotingObj extends events.EventEmitter{

    // Class constructor , get voiting subject
    constructor(voteSubject , subjectArray , maxVote , logFile){
        super();
        this.voteSubject = voteSubject;
        this.voteCounter = 0;
        this.subjects = subjectArray;
        this.maxVote = maxVote;
        this.logFile = logFile;
        
        // Print 
        console.log(`New vote was created : ${voteSubject}`);
        this.logFile.write(`New vote was created : ${voteSubject} \n`);        
        }

        // Return the Vote subject and current count
        getAllData(){
            console.log(`The current count of ${this.voteSubject} is: ${this.voteCounter}`);
            this.logFile.write(`The current count of ${this.voteSubject} is: ${this.voteCounter} \n`);
            this.printeVoteCount();
        }

        // Update the vote specified vote + 1 by the key
        addVote(key){
            if(this.voteCounter <= this.maxVote - 1){
                this.subjects[key]++;
                this.voteCounter += 1;
                this.emit(eventConfig.ADDCOUNT);
            }else{
                console.log('MAX VOTE SIZE');
                this.logFile.write('MAX VOTE SIZE\n');
            } 
           
        }

        // Set the vote count to zero
        zeroVote(){
            this.voteCounter = 0;
            for(var key in  this.subjects){
                this.subjects[key] = 0;
            }
            this.emit(eventConfig.ADDCOUNT);
        }

        // Printing the object current vote
        printeVoteCount(){
           for(var key in  this.subjects){
                console.log(`${key}  :  ${this.subjects[key]}`);
                this.logFile.write(`${key}  :  ${this.subjects[key]} \n`);
            } 
        }

};

// Export the module
module.exports = (voteSubject , subjectArray , maxVote , logFile) =>{
    var voteInstace = new VotingObj(voteSubject , subjectArray , maxVote , logFile);
   voteInstace.on(eventConfig.ADDCOUNT , voteInstace.getAllData)
    return voteInstace;
}