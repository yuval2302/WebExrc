/**
 * Created by Jbt on 11/30/2016.
 */


var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

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
        '<img class="media-object" src="images/useravatar.png">' +
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
    test_group("tweet adding", function () {
        assert(testPublish(), "adding tweet test");
        assert(testNullTweet(), "adding null tweet test");
    });
    tweetDiv = $("#tweets-show");
    printTweets();
}
