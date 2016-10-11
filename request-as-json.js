require("longjohn")

var request = require('request');


function requestJson(url , callBack){
    
    request("https://www.reddit.com/", function(err, result){
        if(err){
            console.log("Something has gone wrong")
        }
        else{
            try{
                callBack(null, JSON.parse(result.body));
            }
            catch(error){
                callBack(error);
            }
        }
    })
    
    
    requestJson(function(err, val){
        if(err){
            console.log("Something has gone wrong")
        }
        else{
            console.log("The value is " + val);
        }
    })
    
}