/**
 * Created by ryan on 12/4/16.
 */


var UrlModel = require("../models/urlModel");

var exec = require('child_process').exec;

var count = 0;





var encode =[];
var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for(;i <= j; i++){
        arr.push(String.fromCharCode(i));
    }
    return arr;
};


encode = encode.concat(genCharArray("A","Z"));
encode = encode.concat(genCharArray("a","z"));
encode = encode.concat(genCharArray("0","9"));

var getShortUrl = function (longUrl, callback) {
      if(longUrl.indexOf("http") === -1){
          longUrl ="http://" + longUrl;
      }


      UrlModel.findOne({longUrl : longUrl}, function (err, data) {

                generateShortUrl(longUrl,function (shortUrl) {
                      var url = new UrlModel({
                          shortUrl:shortUrl,
                          longUrl : longUrl
                      });
                       url.save();
                      callback(url);
                });

      });

};




// private function
var generateShortUrl = function (longUrl, callback) {

        convertTo62(longUrl, function (data) {
            callback(data);
            console.log("level1")
            console.log(data + "i am at gnerate");
            console.log("level2");
        });


};



var convertTo62 = function (num, callback) {

    var cmd = "th test.lua -url "+num;

    exec(cmd, function(error, stdout, stderr) {
        // command output is in stdout

        var result = String(stdout);
        var trimmedStr = result.trim();
        trimmedStr = trimmedStr +" " + count;
        count ++;
        callback(trimmedStr);

    });


};


var getLongUrl  = function (shortUrl, callback) {
    UrlModel.findOne({shortUrl : shortUrl}, function (err, data) {
        callback(data);
    });
};


// return type, can not call the generateShortUrl

module.exports = {
    getShortUrl :getShortUrl,
    getLongUrl : getLongUrl
};