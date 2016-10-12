var emoji = require('node-emoji');

var sunny = emoji.get('sunny');
var cloudy = emoji.get('cloud');
var rainy = emoji.get('umbrella');

var Table = require('cli-table');
require('longjohn')
var prompt = require('prompt');
var requestJson = require('./lib/request-json.js').requestJson;



function weatherCheck(cb) {
    prompt.get("What location", function(err, userInput) {
        if (err) {
            console.log("something went wrong in the mofo prompt");
        }
        else {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput["What location"];
            requestJson(url, function(err, data) {
                if (err) cb(err);
                else {
                    
                    var lat = data.results[0].geometry['location'].lat
                    var long = data.results[0].geometry['location'].lng
                    var weatUrl = "https://api.darksky.net/forecast/a58d0fe346a101bb5825a76cf4ba6766/" + lat + "," + long;
                    requestJson(weatUrl, function(err, result) {
                        if (err) cb(err);
                        else {
                            var currentWeatherSum = result.daily.data[0].summary;

                            var next5 = result.daily.data;
                            var next5Split = next5.slice(0, 5);
                            var next5daysSum = next5Split.map(function(a) {
                                return a.summary;
                            });
                            var next5daysTemp = next5Split.map(function(a) {
                                return a.temperatureMax;
                            });
                            
                            
                            
                            var table = new Table();
 
                                table.push(
                                    { '': 'Next five day forcast' } , { " ": result.timezone}
                                  , { 'Tuesday': next5daysSum[0] + cloudy}, {"High":next5daysTemp[0]}
                                  , { 'Wednesday': next5daysSum[1] + cloudy}, {"High":next5daysTemp[1]}
                                  , { 'Thursday': next5daysSum[2] + rainy}, {"High":next5daysTemp[2]}
                                  , { 'Friday': next5daysSum[3] + sunny}, {"High" :next5daysTemp[3]}
                                  , { 'Saturday': next5daysSum[4] + cloudy}, {"High":next5daysTemp[4]}
                                );
                                 
                                console.log(table.toString());

                        }
                    })
                }
            })
        }
    })
};




weatherCheck(function(err, data) {
    if (err) console.log(err, "somthing went wrong in the weather");

    console.log(data)
})