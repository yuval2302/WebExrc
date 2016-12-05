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

var filteredUserList = usersList;

window.addEventListener('load', onPageLoad, false);

function printUsers(usersList) {
    var userDiv = $("#users-list");

    userDiv.empty();
    for (curruser of usersList) {
        var userId = curruser.id;
        var isfollow = (curruser.isFollow) ? 'unfollow' : 'follow';
        var colorAttr = curruser.isFollow ? 'btn-danger' : 'btn-primary';
        userDiv.print('<div class="col-lg-2 col-md-2" id = divUser' + userId + '>' +
            '<div class="thumbnail followers" align="center">' +
            '<img src=' + curruser.img + '>' +
            '<div class="caption">' +
            '<p><button id = userId' + userId + ' class="btn ' + colorAttr + ' " onclick="changeIsFollow(' + userId + ')"> ' + isfollow + '</button></p>' +
        '<P><span>' + curruser.username + '</span></p> </div> </div> </div>');
    }
}


function printFollowingUsers() {
    var folowingDiv = $("#following-container");
    folowingDiv.empty()
    for(currFollowing in following) {
        var userId = following[currFollowing].id;
        var isfollow = (following[currFollowing].isFollow) ? 'unfollow' : 'follow';
        var colorAttr = following[currFollowing].isFollow ? 'btn-danger' : 'btn-primary';
        folowingDiv.print('<div class="thumbnail my_thumb followers" align="center">' +
            '<img src= ' + following[currFollowing].img + '>' +
            '<div class="caption">' +
            '<p><button class="btn ' + colorAttr + ' " onclick="changeIsFollow(' + userId + ')"> ' + isfollow + '</button></p>' +
            '<P><span>' + following[currFollowing].username + '</span></p>' +
            '</div>' +
            '</div>');
    }
}


function changeIsFollow(userId) {
    var currUser = usersList.filter(function (obj) {
        return obj.id === userId;
    })[0];

    currUser.isFollow = !currUser.isFollow;
    if(currUser.isFollow) {
        following.push(currUser);
    }
    else {
        following = following.filter(function (obj) {
            return obj.id != userId;
        })
    }
    printUsers(filteredUserList);
    printFollowingUsers();
}

function serachUser() {
    var search = $("#name-search");
    usersList.forEach(function (obj) {
        $("#divUser" + obj.id).removeClass("hidden");
    });
    filteredUserList = usersList.filter(function (obj) {
        return !(obj.username.includes(search.value()));
    }).forEach(function (obj) {
        $("#divUser" + obj.id).addClass("hidden");
    });
}

function testFollow() {
    var input = $("#userId2");
    beginValue = input.value;
    changeIsFollow(2);
    var result = beginValue === input.value;
    changeIsFollow(2);
    return result;
}

function onPageLoad() {

    printUsers(filteredUserList);
    printFollowingUsers();

    test_group("follow - unfollow test", function () {
        assert(testFollow(), "press follow on button");
    });
}










