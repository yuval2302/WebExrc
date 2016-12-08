var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require('fs');
var tweetsModule = require('./tweets');
var usersModule = require('./users');

var users = [];
var tweets = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve('../public/')));

app.listen(8000,function () {
    console.log("Listening on port 8000");
});

// fs.readFile('./users.json','utf8' , function (err, data) {
//     if (err) throw err;
//    users = JSON.parse(data);
// });
//
// fs.readFile("./tweets.json",'utf8' , function (err, data) {
//     if (err) throw err;
//     tweets = JSON.parse(data);
// });


usersModule.addTweetsRouts(app);
tweetsModule.addTweetsRouts(app);
