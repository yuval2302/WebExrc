var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var users = [{_id :'1'},{_id :'2'} ];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve('../public')));
app.use('/', express.static(path.resolve('../public/html/')));

app.listen(8000,function () {
    console.log("Listening on port 8000");
});

app.get('/users', function (req, res) {
   res.send(users);
});

app.get('/users/:id', function (req, res) {
    return users.filter(function (user) {

    })
});

