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
    //data["data"] = {};
    for (var i = 0; i < numGames; i++) {
        var rounds = $("#rounds"+i).val();
        var numStones = $("#stones" + i).val();
        var numMetals = $("#gems" + i).val();
        var startCondition = $("#startingpt" + i).val();
        var unitCond = $("#units" + i).val();
        var metalsBudget = $("#metalsBudget" + i).val();
        var stonesBudget = $("#stonesBudget" + i).val();
        var metalPrices = $("#metalPrices" + i).val();
        var stonePrices = $("#stonePrices" + i).val();
        var priceMultipliers = $("#priceMultipliers"+i).val();
        console.log($('#switch' + i).prop('checked'))
        if ($('#switch' + i).prop('checked')) {
            console.log("switch" + i + " checked");
            data/*["data"]*/["game_" + i] = {"Rounds":rounds, "Stones": numStones, "Metals": numMetals, "metalsBudget": metalsBudget, "stonesBudget": stonesBudget, "startCondition": startCondition, "unitCondition": unitCond, "stonePrices": stonePrices, "metalPrices": metalPrices,"priceMultipliers":priceMultipliers };
        } else {
            data/*["data"]*/["game_" + i] = "None";
            alert("Game " + i + " was not checked to be created.")
        }
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

function logUserData(userDat) {
    $.ajax({
        type: 'POST',
        url: '/logUserData',
        data: JSON.stringify(userDat),
        contentType: 'application/json; charset=utf-8',
        dataType: 'text',
        success: function(msg, status, jqXHR) {
            console.log('Logged user data')

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        }
    });
}

var data = {};

function getSettings(gameVersion, callback) {
    $.ajax({
        type: 'GET',
        url: '/getSettings',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
            console.log("Got settings");
            var newdata = eval("(" + response["result"] + ")");
            console.log("old data:")
            console.log(newdata)
            //console.log(newdata["data"]["game_"+gameVersion]);
            data = newdata["game_" + gameVersion];
            console.log("Does the data exist? ");
            console.log(data);
            callback();

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        }
    });

}



function initGame(gameVersion) {
    console.log("game version: " + gameVersion)
    logInitialData();
    getSettings(gameVersion, function() {
        console.log(data);
        randomizeConditions();
        generateMetalsStones("metalsVendor", "stonesVendor", parseInt(data["Metals"]));
        //console.log("actual conditions? : "+data["startCondition"]+","+ data["unitCondition"]);
        createBudgetArea(data["startCondition"], data["unitCondition"]);
    });

}

function timestamp() {
    var d = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = hr < 12 ? "am" : "pm";
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var seconds = d.getSeconds();

    var timestamp = hr + ":" + min + ":" + seconds +" "+ ampm + " " + date + "-" + month + "-" + year;

    return timestamp;
}
