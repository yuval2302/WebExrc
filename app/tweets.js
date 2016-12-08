var dataManager = require('./dataManager');
var tweets = [];
dataManager.getTweets().then(function (response) {
   tweets = response;
});

function addTweetsRouts(app) {

    app.get('/tweets', function (req, res) {
        res.send(tweets);
    });

    app.get('/tweets/:userId', function (req, res) {
        res.send(tweets.filter(function (tweet){
            return tweet.user === req.params["userId"];
        }));
    });

    app.post('/tweets', function (req, res) {
        tweets.push({user: req.body.user,
            text: req.body.text});
    });


}

module.exports = {addTweetsRouts : addTweetsRouts};