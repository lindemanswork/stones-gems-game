var recordedData = {};

var sides = { "left": "stone", "right": "metal" }
var rSides = { "stone": "left", "metal": "right" }

recordedData["rounds"] = [];



function logInitialData() {
    var url = window.location.href;
    recordedData["url"] = url;
    recordedData["_id"] = url.split('?')[1];
    recordedData["time"] = timestamp();
}

function setGameBoardSettings() {
    var static = {
        "startingConditions": {
            "starting": startConditions[parseInt(data["startCondition"]) - 1],
            "unit": unitConditions[parseInt(data["unitCondition"]) - 1]
        },
        "left": staticSettings("left", "stone"),
        "right": staticSettings("right", "metal")
    }
    recordedData["rounds"].push(static)
    //console.log(recordedData)
}

function metalStaticSettings(side) {


}

function staticSettings(side, objectType) {
    var price = [];
    var position = [];
    var budget = initBudgetData(side);
    var purchase = initPurchaseData()
    $("." + objectType + "Price").each(function() {
        price.push($.trim($(this).html()).replace("$", ""))
        position.push($(this).attr("id").charAt($(this).attr("id").length - 1))
    })
    return { "item": objectType, "prices": price, "positions": position, "budget": budget, "purchases": purchase }
}

function initBudgetData(side) {
    var budget = {}
    //console.log("initBudgetData: " + sides[side] + "Budget: " + window[sides[side] + "Budget"])
    budget["start"] = window[sides[side] + "Budget"];
    budget["changes"] = [];
    budget["time"] = [];

    return budget;

}

function initPurchaseData() {
    var purchase = {}
    purchase["click_positions"] = [];
    purchase["time"] = [];
    purchase["purchased_prices"] = [];
    return purchase;
}


function updateBudgetChanges(newBudgetValue, side, round = 0) {
    
    /*console.log("Record budget data: " + newBudgetValue + " in " + recordedData["rounds"][round][side]["budget"]["changes"]);
    console.log('recordedData["rounds"][round][side]["budget"]["changes"]:');
    console.log(recordedData["rounds"][round][side]["budget"]["changes"]);
    console.log(typeof(recordedData["rounds"][round][side]["budget"]["changes"]));*/
    recordedData["rounds"][round][side]["budget"]["changes"].push(newBudgetValue);
    recordedData["rounds"][round][side]["budget"]["time"].push(timestamp());

    //console.log("Current recordedData: ")
    //console.log(recordedData)
}

function updatePurchase(purchasePosition, purchasePrice, side, round = 0) {
    recordedData["rounds"][round][side]["purchases"]["click_positions"].push(purchasePosition);
    recordedData["rounds"][round][side]["purchases"]["purchased_prices"].push($.trim(purchasePrice).replace("$", ""));
    recordedData["rounds"][round][side]["purchases"]["time"].push(timestamp());
}
