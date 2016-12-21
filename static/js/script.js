function login(username) {
    console.log(username);
    $.ajax({
        type: 'POST',
        url: '/login',
        data: JSON.stringify({ "username": username }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(msg, status, jqXHR) {
            window.location = "/home"
            console.log('in ajax login user');
            console.log(msg);
            var headerdata = callback.getResponseHeader();
            console.log(headerdata);

        }
    });

}
