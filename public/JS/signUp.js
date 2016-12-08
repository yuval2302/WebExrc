function signUp() {

    var username = replaceXXS($("#username").value());
    var password = replaceXXS($("#password").value());

    var userToAdd = {
        username: username,
        password: password
    };

    axios.post('/users', userToAdd).then(function (response) {
       if(response.status != 200) {
           console.log("Error add user state");
       } else {
           window.location = "/";
       }
    });
}

var replaceXXS = function (data) {
    return data.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
}