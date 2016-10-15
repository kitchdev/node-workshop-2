var request = require('request');
var requestAsJson = require('./request-as-json.js').requestAsJson;
require('longjohn')


function requestPromise(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    });
}

function SynonymAPI(api){
    this.api = api;
};


SynonymAPI.prototype.getSynonyms = function(word, callback){
  return requestPromise('http://words.bighugelabs.com/api/2/' + this.api + '/' + word + '/json').then
    (function(response){
        var actualResponse = JSON.parse(response.body);
      console.log(actualResponse);
    }).catch(function(err) {
    console.log('something went wrong with one of the cock requests:', err);
    });
};



module.exports = {
    SynonymAPI: SynonymAPI,
    requestPromise: requestPromise
};