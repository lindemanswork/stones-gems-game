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

function generateGameSettingsJson(numGames) {
    var data = {};
    data["data"] = {};
    for (var i = 0; i < numGames; i++) {
        var numStones = $("#stones" + i).val();
        var numGems = $("#gems" + i).val();
        var startCondition = $("#startingpt" + i).val();
        var unitCond = $("#units" + i).val();
        data["data"]["game_" + i] = { "Stones": numStones, "Gems": numGems, "startCondition": startCondition, "unitCondition": unitCond };
    }
    return data;
}



function submitSettings() {
    var data = generateGameSettingsJson(6);
    console.log("submitted settings")
    $.ajax({
        type: 'POST',
        url: '/logSettings',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'text',
        success: function(msg, status, jqXHR) {
            console.log("Success submitSettings");
            alert("Submitted settings");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        }
    });

}


function getSettings() {
    $.ajax({
        type: 'GET',
        url: '/getSettings',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
            console.log("Got settings");
            var newdata = eval("(" + response["result"] + ")");
            console.log(newdata);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        }
    });

}

//getSettings();
