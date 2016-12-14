/**
 * Created by ryan on 12/4/16.
 */

var express = require("express");
var router = express.Router();
var urlService = require("../service/urlService");
var path = require("path");


router.get("*", function(req, res) {
    var shortUrl = req.originalUrl.slice(1);
    urlService.getLongUrl(shortUrl, function (Url) {
        if(Url){
            res.redirect(Url.longUrl);
        }else{
            res.sendFile("404.html", {root: path.join(__dirname, "../public/views/")});
        }
    });

});

module.exports = router;
