
/**
 * Created by Jbt on 11/30/2016.
 */

var usersList = [];
var loggedUser;
var following = [];
var filteredUserList;


window.addEventListener('load', onPageLoad, false);

function printUsers(usersList) {
    var userDiv = $("#users-list");

    userDiv.empty();
    for (curruser of usersList) {
        var userId = curruser._id;
        var isfollow = (curruser.isFollow) ? 'unfollow' : 'follow';
        var colorAttr = curruser.isFollow ? 'btn-danger' : 'btn-primary';
        userDiv.print('<div class="col-lg-2 col-md-2" id = divUser' + userId + '>' +
            '<div class="thumbnail followers" align="center">' +
            "<img src = '../images/useravatar.png'>" +
            '<div class="caption">' +
            '<p><button id = userId' + userId + ' class="btn ' + colorAttr + '" onclick="changeIsFollow(\'' + userId + '\')"> ' + isfollow + '</button></p>' +
        '<P><span>' + curruser.username + '</span></p> </div> </div> </div>');
    }
}


function printFollowingUsers() {
    var folowingDiv = $("#following-container");
    folowingDiv.empty();
    for(currFollowing of following) {
        var userId = currFollowing._id;
        var colorAttr = currFollowing.isFollow ? 'btn-danger' : 'btn-primary';
        folowingDiv.print('<div class="thumbnail my_thumb followers" align="center">' +
            '<img src= "../images/useravatar.png">' +
            '<div class="caption">' +
            '<p><button class="btn btn-danger" onclick="changeIsFollow(\'' + userId + '\')">unfollow</button></p>' +
            '<P><span>' + currFollowing.username + '</span></p>' +
            '</div>' +
            '</div>');
    }
}


function changeIsFollow(userId) {

    var currUser = usersList.filter(function (obj) {
        return obj._id === userId;
    })[0];

    axios.put('/users/' + loggedUser._id, currUser).then( function (response) {
        currUser.isFollow = !currUser.isFollow;
        if(currUser.isFollow) {
            following.push(currUser);
        }
        else {
            following = following.filter(function (obj) {
                return obj._id != userId;
            })
        }
        printUsers(filteredUserList);
        printFollowingUsers();
    });

}

function serachUser() {
    var search = $("#name-search");
    hiddenUsers = [];
    filteredUserList = [];
    usersList.forEach(function (obj) {
        $("#divUser" + obj._id).removeClass("hidden");
    });
    usersList.forEach(function (obj) {
        if (!(obj.username.includes(search.value()))){
            hiddenUsers.push(obj);
        } else {
            filteredUserList.push(obj)
        }
    })
    hiddenUsers.forEach(function (obj) {
        $("#divUser" + obj._id).addClass("hidden");
    });
}

// function testFollow() {
//     var input = $("#userId2");
//     beginValue = input.value;
//     changeIsFollow(2);
//     var result = beginValue === input.value;
//     changeIsFollow(2);
//     return result;
// }

function onPageLoad() {

    axios.get("/logged")
        .then(function (response) {
            if (response.data === "") {
                window.location = "/html/signIn.html";
            } else {
                loggedUser = response.data;
            }
        })
        .then(function () {
        axios.get("/users")
            .then(function (response) {

                usersList = response.data.filter(function(user) {
                    return user._id !== loggedUser._id;
                });
                filteredUserList = usersList;
            }).then(function () {
            following = usersList.filter(function (user) {
                user.isFollow = false;
                for (currFollow of loggedUser.following){
                    if(currFollow === user._id) {
                        user.isFollow = true;
                        break;
                    }
                }
                return user.isFollow;
            });
            printUsers(usersList);
            printFollowingUsers();
        });
    });

    // test_group("follow - unfollow test", function () {
    //     assert(testFollow(), "press follow on button");
    // });
}










