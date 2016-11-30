/**
 * Created by Jbt on 11/30/2016.
 */

var usersList = [
    {
        id: 1,
        img: "images/useravatar.png",
        username: "Marty McFly",
        isFollow: false
    },
    {
        id: 2,
        img: "images/useravatar.png",
        username: "Janis Joplin",
        isFollow: false
    },
    {
        id: 3,
        img: "images/useravatar.png",
        username: "Albert Einstein",
        isFollow: false
    },
    {
        id: 4,
        img: "images/useravatar.png",
        username: "Genghis Khan",
        isFollow: false
    },
    {
        id: 5,
        img: "images/useravatar.png",
        username: "Dracula",
        isFollow: true
    },
    {
        id: 6,
        img: "images/useravatar.png",
        username: "Forest Gump",
        isFollow: false
    },
    {
        id: 7,
        img: "images/useravatar.png",
        username: "Caligula",
        isFollow: false
    },
    {
        id: 8,
        img: "images/useravatar.png",
        username: "Winnie the Pooh",
        isFollow: false
    },
    {
        id: 9,
        img: "images/useravatar.png",
        username: "Obama",
        isFollow: false
    },
    {
        id: 10,
        img: "images/useravatar.png",
        username: "Henry the 8th",
        isFollow: true
    }
];
var following = [
    {
        id: 5,
        img: "images/useravatar.png",
        username: "Dracula",
        isFollow: true
    },
    {
        id: 10,
        img: "images/useravatar.png",
        username: "Henry the 8th",
        isFollow: true
    }
];


var userDiv = document.getElementById("users-list");
var folowingDiv = document.getElementById("following-container");
var filteredUserList = usersList
printUsers(filteredUserList);
printFollowingUsers();

function printUsers(usersList) {
    userDiv.innerHTML = "";
    for (curruser in usersList) {
        var userId = usersList[curruser].id;
        var isfollow = (usersList[curruser].isFollow) ? 'unfollow' : 'follow';
        var colorAttr = usersList[curruser].isFollow ? 'btn-danger' : 'btn-primary';
        userDiv.innerHTML += '<div class="col-lg-2 col-md-2">' +
            '<div class="thumbnail followers" align="center">' +
            '<img src=' + usersList[curruser].img + '>' +
            '<div class="caption">' +
            '<p><button  class="btn ' + colorAttr + ' " onclick="changeIsFollow(' + userId + ')"> ' + isfollow + '</button></p>' +
        '<P><span>' + usersList[curruser].username + '</span></p> </div> </div> </div>'
    }
}

function printFollowingUsers() {
    folowingDiv.innerHTML = "";
    for(currFollowing in following) {
        var userId = following[currFollowing].id;
        var isfollow = (following[currFollowing].isFollow) ? 'unfollow' : 'follow';
        var colorAttr = following[currFollowing].isFollow ? 'btn-danger' : 'btn-primary';
        folowingDiv.innerHTML += '<div class="thumbnail my_thumb followers" align="center">' +
            '<img src= ' + following[currFollowing].img + '>' +
            '<div class="caption">' +
            '<p><button class="btn ' + colorAttr + ' " onclick="changeIsFollow(' + userId + ')"> ' + isfollow + '</button></p>' +
            '<P><span>' + following[currFollowing].username + '</span></p>' +
            '</div>' +
            '</div>';
    }
}

function changeIsFollow(userId) {
    var currUser = usersList.filter(function (obj) {
        return obj.id === userId;
    });
    currUser[0].isFollow = !currUser[0].isFollow;
    if(currUser[0].isFollow) {
        following.push(currUser[0]);
    }
    else {
        //following.pop(currUser[0]);
        following = following.filter(function (obj) {
            return obj.id != userId;
        })
    }
    printUsers(filteredUserList);
    printFollowingUsers();
}

function serachUser() {
    var search = document.getElementById("name-search");
    filteredUserList = usersList.filter(function (obj) {
        //TODO: check
        return obj.username.includes(search);
    });
    printUsers(filteredUserList);
}












