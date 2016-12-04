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
    var tweetDiv = document.getElementById("tweets-show");
    var docFrag = document.createDocumentFragment();

    docFrag = "";
    for (currTweet in tweets) {
        var textNode = document.createTextNode("");
        //TODO: this !
        textNode.appendData(tweets[currTweet].text);
        docFrag +=
            '<div class="media">' +
            '<div class="media-left">' +
            '<img class="media-object" src="images/useravatar.png">' +
            '</div>' +
            '<div class="media-body">' +
            '<b class="media-heading">'+ tweets[currTweet].username +' says:</b>'+
            '<br/>'+
            '<span>' + textNode.value + '</span>' +
            '</div>' +
            '</div>';
    }
    tweetDiv.innerHTML = docFrag;
}

function clickedOnPublish() {
    var newTweet = document.getElementById("new-tweet-text").value;
    if (newTweet !== "") {
        tweets.push({
            username: "orenshlufluf",
            text: newTweet
        });
        printTweets();
    }
}

function testPublish() {
    var input  = document.getElementById("new-tweet-text");
    input.value = "testing";
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
    var result = newTweets.length == tweets.length;
    tweets = newTweets;
    return result;
}

function onPageLoad() {

    test_group("tweet adding", function () {
        assert(testPublish(), "adding tweet test");
        assert(testNullTweet(), "adding null tweet test");
    });

    printTweets();
}