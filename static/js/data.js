var recordedData = {};

var sides = { "left": "stone", "right": "metal" }

function getGameBoardSettings() {
    recordedData["rounds"] = [];
    var static = { "left": staticSettings("left", "stone"), "right": staticSettings("right", "metal") }
    recordedData["rounds"].push(static)
    console.log(recordedData)
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
    console.log("initBudgetData: " + sides[side] + "Budget: " + window[sides[side] + "Budget"])
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

/*	
"purchases": {
                			"clicks_positions": [3,5,5,4,7,10],
                			"time": ["2011-07-14T19:43:37+0100", "2011-07-14T19:43:37+0100", "2011-07-14T19:43:37+0100", "2011-07-14T19:43:37+0100"],
                			"purchased_prices": [8,8,6,6,4]
                			}
                			*/

function updateBudgetChanges(newBudgetValue, side, round = roundsLeft) {
    recordedData["rounds"][round][side]["budget"]["changes"].push(newBudgetValue);
    recordedData["rounds"][round][side]["budget"]["time"].push(timestamp());
}

function updatePurchase(purchasePosition, purchasePrice, side, round = roundsLeft) {
    recordedData["rounds"][round][side]["purchases"]["click_positions"].push(purchasePosition);
    recordedData["rounds"][round][side]["purchases"]["purchased_prices"].push(purchasePrice);
    recordedData["rounds"][round][side]["purchases"]["time"].push(timestamp());
}
