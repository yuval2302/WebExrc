var dataManager = require('./dataManager');
var session = require('express-session');
var users = [];
dataManager.getUsers().then(function (response) {
    users = response;
});

function addTweetsRouts(app) {


    app.get('/users', function (req, res) {
        res.send(users);
    });

    app.get('/users/:id', function (req, res) {
        res.send(users.filter(function (user) {
            return user._id === req.params.id;
        }));
    });

    app.get('/users/following/:id', function (req, res) {
        res.send(users.filter(function (user) {
            return user.following.indexOf(req.params.id) != -1;
        }));
    });


    app.put('/users/:id', function (req, res) {
        users.forEach(function (myUser) {
            if(myUser._id === req.params.id) {
                var userToChange = req.body;
                if (!userToChange.isFollow) {
                    console.log(myUser.username + " follows" + userToChange.username);
                    myUser.following.push(userToChange._id);
                } else {
                    console.log(myUser.username + " unfollows" + userToChange.username);
                    myUser.following.splice(myUser.following.indexOf(userToChange._id), 1);
                }

                req.session.loginUser = myUser;
            }
        });
        res.send();
    });

    app.post('/login', function (req, res) {
       var username = req.body.username;
       var password = req.body.password;
       var user = users.filter(function (currUser) {
           return (currUser.username === username && currUser.password === password);
       });
       if (user.length > 0) {
           req.session.loginUser = user[0];
           res.send(user[0]);
       } else {
           res.sendStatus(500);
       }
    });

    app.get('/logged', function (req, res) {
        res.send(req.session.loginUser);
    });

    app.post('/users', function (req, res) {
        var newUser = {
            _id: getNextId(),
            username: req.body.username,
            password: req.body.password,
            following: []
        };
        users.push(newUser);
        req.session.loginUser = newUser;
        dataManager.setUsers(users);
        res.end();
    })
}

var currId = 1;
var getNextId = function () {
  return (currId++).toString();
};

module.exports = {addTweetsRouts : addTweetsRouts};