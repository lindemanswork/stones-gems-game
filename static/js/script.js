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
    for (var i = 0; i < numGames; i++) {
        var numStones = $("#stones" + i).val();
        var numGems = $("#gems" + i).val();
        var startCondition = $("#startingpt" + i).val();
        var unitCond = $("#units" + i).val();
        data["game_" + i] = { "Stones": numStones, "Gems": numGems, "startCondition": startCondition, "unitCondition": unitCond };
    }
    return data;
}

function setDefault(value, default) {
    if (value == null || value.length < 1) {
        value = default;
    }
    return value;
}

function submitSettings() {
    console.log(generateGameSettingsJson(6));

}
