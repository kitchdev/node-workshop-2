var synonGetFunction = require('./synonyms.js');
var prompt = require('prompt');
require('longjohn')
var Table = require('cli-table');

var myApi = new synonGetFunction.SynonymAPI('0df2ffbba16f14b897153f375b7478bf');

function promptPromise(question) {
    return new Promise(function(resolve, reject) {
        prompt.get(question, function(err, answers) {
            if (err) {
                reject(err);
            }
            else {
                resolve(answers);
            }
        });
    });
}
var userWord;
var result;
function getSynon(table){
    promptPromise('Which word').then
    (function(answer) {
        var userWord = answer["Which word"];
        
   
        
        return myApi.getSynonyms(userWord, function(err, result){
            if(err)console.log("errr");
            else{
                console.log(result)
            }
        });
            
    });
}




                
getSynon();

