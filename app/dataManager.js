var fs = require('fs');
const USERS_FILE = "users.json";
const TWEETS_FILE = "tweets.json";

function getUsers() {
    return new Promise(function (resolve, reject) {
        resolve(getFileData(USERS_FILE));
    });
}

function setUsers(usersData) {
    writeToFile(USERS_FILE, usersData);
}

function getTweets() {
    return new Promise(function (resolve, reject) {
        resolve(getFileData(TWEETS_FILE));
    });
}

function setTweets(tweetsData) {
    writeToFile (TWEETS_FILE, tweetsData);
}

function getFileData (fileName) {
    return new Promise(function (resolve, reject) {
        var fileData = [];
        fs.readFile(fileName, 'utf8' , function (err, data) {
            if (err) throw err;
            fileData = JSON.parse(data);
            resolve(fileData);
        });
    });
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data));
}

module.exports = { getUsers : getUsers, setUsers : setUsers, getTweets :getTweets, setTweets : setTweets};

