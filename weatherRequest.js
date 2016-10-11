require('longjohn')
var prompt = require('prompt');
var requestJson = require('./lib/request-json.js').requestJson;

function weatherCheck(cb){
        prompt.get("What location", function(err, userInput){
            if(err){
                console.log("something went wrong");
            }
            else{
                var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput;
                requestJson(url["What location"], function(err, result){
                    if(err) cb(err);
                    else {
                        cb(null, result);
                    }
                })
            }
        })
};

weatherCheck(function(err,data){
    if(err) {console.log("somthing went wrong")};
    console.log(data)
})