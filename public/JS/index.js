/**
 * Created by Jbt on 11/30/2016.
 */


var tweets = [];
var loggedUser;
window.addEventListener('load', onPageLoad, false);


function printTweets() {
    var allTweets = "";
    tweetDiv.empty();
    for (currTweet of tweets) {
        allTweets += addTweetDiv(currTweet);
    }

    tweetDiv.print(allTweets);
}

function clickedOnPublish() {
    var textDiv = $("#new-tweet-text");
    var newTweet = textDiv.value().replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
    textDiv.value("");
    if (newTweet !== "") {
        axios.post('/tweets', {
            user: loggedUser._id,
            text: newTweet
        });

        var tweet = {
            username: loggedUser.username,
            text: newTweet
        };
        tweets.push(tweet);
        tweetDiv.print(addTweetDiv(tweet));
    }
}

function addTweetDiv(currTweet) {
    var textNode = document.createTextNode("");
    textNode.appendData(currTweet.text);
    return '<div class="media">' +
        '<div class="media-left">' +
        '<img class="media-object" src="../images/useravatar.png">' +
        '</div>' +
        '<div class="media-body">' +
        '<b class="media-heading">' + currTweet.username + ' says:</b>' +
        '<br/>' +
        '<span>' + textNode.data + '</span>' +
        '</div>' +
        '</div>';
}

function testPublish() {
    var input = document.getElementById("new-tweet-text");
    input.value = "testingsdfgdefr";
    clickedOnPublish();
    var newTweets = tweets.filter(function (item) {
        return item.text != "testing";
    });
    var result = newTweets.length != tweets.length;
    tweets = newTweets;
    return result;
}

function testNullTweet() {
    var input = document.getElementById("new-tweet-text");
    input.value = "";
    clickedOnPublish();
    var newTweets = tweets.filter(function (item) {
        return item.text != "";
    });
    var result = newTweets.length === tweets.length;
    tweets = newTweets;
    return result;
}

function onPageLoad() {
    tweetDiv = $('#tweets-show');
    var promises = [];
    // test_group("tweet adding", function () {
    //     assert(testPublish(), "adding tweet test");
    //     assert(testNullTweet(), "adding null tweet test");
    // });

    axios.get("/logged").then(function (response) {
        if (response.data === "") {
            window.location = "/html/signIn.html";
        } else {
            loggedUser = response.data;
        }
        axios.get("/tweets").then(function (tweetsObject) {
            tweets = getAllFollowedTweets(tweetsObject);
        }).then(function () {
            promises = findsAllTheUsernames(tweets);
        }).then(function () {
            axios.all(promises).then(function () {
                printTweets();
            });
        });
    });

    tweetDiv = $('#tweets-show');
    printTweets();
}

function isUserFollowId(user, userId) {
    return user.following.indexOf(userId) !== -1
}


var getAllFollowedTweets = function (tweetsObject) {
    tweets = tweetsObject.data;
    tweets = tweets.filter(function (tweet) {
        if (tweet.user === loggedUser._id) {
            return true;
        }

        return isUserFollowId(loggedUser, tweet.user);
    });
    return tweets;
};

var findsAllTheUsernames = function (tweets) {
    var promises = [];

    tweets.forEach(function (tweet) {
        promises.push(axios.get("/users/" + tweet.user).then(function (user) {
            tweet.username = user.data[0].username;
        }));
    });

    return promises;
};

var printAllTweets = function () {
    axios.all(promises)
        .then(function () {
            printTweets();
        });
}

describe("isUserFollowId", function() {

    it("not following ", function() {
        var tempUser = {_id:"1", username: "yuvi", password: "1234", following:[5,6,7]};
        expect(isUserFollowId(tempUser, "9")).toBe(false);
    });

    it("multiple following", function() {
        var tempUser = {_id:"1", username: "yuvi", password: "1234", following:[5,6,7]};
        expect(isUserFollowId(tempUser, "6")).toBe(false);
    });

    it("single follow", function() {
        var tempUser = {_id:"1", username: "yuvi", password: "1234", following:[5]};
        expect(isUserFollowId(tempUser, "5")).toBe(false);
    });
});

