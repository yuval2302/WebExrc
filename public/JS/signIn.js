function signIn(){
    var username = replaceXXS($("#username").value());
    var password = replaceXXS($("#password").value());

    var userToCheck = {
        username: username,
        password: password
    };

    axios.get('/login', userToAdd).then(function (response) {
        if(response.status != 200) {
            window.location = "../html/signIn.html"
            alert("wrong username or password");
        } else {
            window.location = "/";
        }
    });
}


var replaceXXS = function (data) {
    return data.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
}