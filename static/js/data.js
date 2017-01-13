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
    $("." + objectType + "Price").each(function() {
        price.push($.trim($(this).html()).replace("$", ""))
        position.push($(this).attr("id").charAt($(this).attr("id").length - 1))
    })
    return { "item": objectType, "prices": price, "positions": position, "budget": budget }
}

function initBudgetData(side) {
    var budget = {}
    console.log("initBudgetData: " + sides[side] + "Budget: " + window[sides[side] + "Budget"])
    budget["start"] = window[sides[side] + "Budget"];

    return budget;

}

function logBudget(round, side) {
    recordedData["rounds"][round][side]["budget"] = {};
}
