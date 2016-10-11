
var request = require('request');


function requestJson(url, callBack) {

    request(url, function(err, result) {
        if (err) callBack(err);
        else {
            try {
                callBack(null, JSON.parse(result.body));
            }
            catch (error) {
                callBack(error);
            }
        }
    });

}

exports.requestJson = requestJson;