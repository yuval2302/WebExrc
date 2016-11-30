/**
 * Created by Jbt on 11/30/2016.
 */


var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

var tweetDiv = document.getElementById("tweets-show");
printTweets();

function printTweets() {
    tweetDiv.innerHTML = "" ;
    for (currTweet in tweets) {
        tweetDiv.innerHTML += '<div class="media">' +
            '<div class="media-left">' +
            '<img class="media-object" src="images/useravatar.png">' +
            '</div>' +
            '<div class="media-body">' +
            '<b class="media-heading">'+ tweets[currTweet].username +' says:</b>'+
            '<br/>'+
            '<span>' + tweets[currTweet].text +'</span>'+
            '</div>' +
            '</div>';
    }


}

function clickedOnPublish() {
    var newTweet = document.getElementById("new-tweet-text").value;
    tweets.push({username: "orenshlufluf",
        text: newTweet});
    printTweets();
}
