function signIn(){
    var username = replaceXXS($("#username").value());
    var password = replaceXXS($("#password").value());

    var userToCheck = {
        username: username,
        password: password
    };

    axios.post('/login', userToCheck).then(function (response) {
        window.location = "/";
    }).catch(function (response) {
        console.log("wrong username or password");
        alert("wrong username or password");
    });
}


var replaceXXS = function (data) {
    return data.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
}