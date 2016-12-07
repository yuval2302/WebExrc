/**
 * Created by Jbt on 11/30/2016.
 */


var tweets = [];

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
        var tweet = {
            username: "orenshlufluf",
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
        '<b class="media-heading">'+ currTweet.username +' says:</b>'+
        '<br/>'+
        '<span>' + textNode.data + '</span>' +
        '</div>' +
        '</div>';
}



function testPublish() {
    var input  = document.getElementById("new-tweet-text");
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
    var input  = document.getElementById("new-tweet-text");
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

    tweetDiv = $("#tweets-show");
    var promises = [];
    test_group("tweet adding", function () {
        assert(testPublish(), "adding tweet test");
        assert(testNullTweet(), "adding null tweet test");
    });

    axios.get("http://10.103.50.193:8080/users/10c06b27-d8ee-4435-9cee-0a2a838ca14a")
        .then(function (response) {
            myRandomUesr = response.data[0];
            axios.get("http://10.103.50.193:8080/tweets").then(function (tweetsObject) {
                tweets = tweetsObject.data;
                tweets = tweets.filter(function (tweet) {
                    var isFollowing = false
                    for (followingUsers of myRandomUesr.following){
                        if(followingUsers === tweet.user){
                            isFollowing = true;
                            break;
                        }
                    }
                    return isFollowing;
                })
            }).then(function () {
                tweets.forEach(function (tweet) {
                    promises.push(axios.get("http://10.103.50.193:8080/users/" + tweet.user).then(function (user) {
                        tweet.username = user.data[0].username;
                    }));
                })
            }).then(function () {
                axios.all(promises)
                    .then(function () {
                        printTweets();
                    });
            });
        });


    tweetDiv = $("#tweets-show");
    printTweets();
}
