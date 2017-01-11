var startingpt = { "add": "1", "transfer": "2", "cut": "3" };
//add: nothing in either budgets all in "to be allocated"
//transfer: spread over 2 budges
//Cut: cut from two budgets

//total: directly input in textbox
//marginal: one by one with the arrows
var units = { "total": "1", "marginal": "2" }

var metalCombinations = generateCombinations();
var stoneCombinations = generateCombinations();

console.log(metalCombinations)
console.log(stoneCombinations)

var stoneImages = [];
var metalImages = [];
var colors = [];
var stonePairings = [];
var metalPairings = [];
var budgetToAllocate = 20;
var stoneBudget = 10;
var metalBudget = 9;

var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var nums1 = shuffleArray(nums);
var nums2 = shuffleArray(nums);

var lightOrange = "#ffc571";
var orange = "#f99755";
var purple = "#858ce9";


function generateMetalsStones(metalDivID, stoneDivID, numMetals, numStones) {
    generateObjects(metalDivID, stoneDivID, numMetals);
    //generateObjects(stoneDivID, numStones /*stone image path*/ );

}

function generateObjects(metalDivID, stoneDivID, numObject) {
    for (var i = 0; i < numObject; i++) {
        var rand = nums1.pop();
        var rand1 = nums2.pop();

        console.log("rands: " + rand + ", " + rand1)
        metalIndices = metalCombinations[rand];
        stoneIndices = stoneCombinations[rand1];

        //add to pairings
        metalPairings.push(metalIndices);
        stonePairings.push(stoneIndices);

        var stone = stoneImages[stoneIndices[0]];
        var metal = metalImages[metalIndices[0]];
        var metalColor = colors[metalIndices[1]];
        var stoneColor = colors[stoneIndices[1]];

        $("#" + metalDivID).append("<div class='metal object' id='metal" + i + "'>" + "<img class = 'objectImage' src='/static/images/metals/" + metal + "'>" + " </div>");
        $("#metal" + i).css("background-color", metalColor);
        $("#" + stoneDivID).append("<div class='stone object' id='stone" + i + "'>" + "<img class = 'objectImage' src='/static/images/stones/" + stone + "'>" + " </div>");
        $("#stone" + i).css("background-color", stoneColor);
        delete metalCombinations[rand]
        delete stoneCombinations[rand1]
    }
    console.log("Pairings: ")
    console.log(metalPairings)
    console.log(stonePairings)
    console.log(metalCombinations)
    console.log(stoneCombinations)
}

function generateIndices() {
    var colorNum = getRandomArbitrary(0, 5);
    var objectNum = getRandomArbitrary(0, 5);
    //var stoneNum = getRandomArbitrary(0, 5);
    //var metalNum = getRandomArbitrary(0, 5);
    return [colorNum, objectNum];
}

function generateCombinations() {
    var count = 0;
    var combinations = {};
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            combinations[count.toString()] = [i, j];
            count++;
        }
    }
    return combinations;
}
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * [createBudgetArea description]
 * @param  {String} startCondition numerical value as string
 * @param  {String} unitCondition  numerical value as string
 * @return {[type]}                [description]
 */
function createBudgetArea(startCondition, unitCondition) {
    if (startCondition == startingpt["add"]) {
        console.log("Add condition")
        createBudgetInput(unitCondition, parseInt(data["stonesBudget"]) + parseInt(data["metalsBudget"]), 0, 0);
    } else if (startCondition == startingpt["transfer"]) {
        console.log("transfer condition");
        createBudgetInput(unitCondition, 0, data["stonesBudget"], data["metalsBudget"]);
    } else if (startCondition == startingpt["cut"]) {
        console.log("Cut condition");
    }

}

function createCoins(divID, numCoins) {
    for (var i = 0; i < numCoins; i++) {
        $("#" + divID).html("<div class='coin'></div>" + $("#" + divID).html());
        if ((i + 1) % 5 == 0 && i != 0) {
            $("#" + divID).html("<br>" + $("#" + divID).html());
        }
    }
}

function createBudgetInput(unitCondition, totalPotBudget = 0, stoneBudget = 10, metalBudget = 10) {
    console.log("total budget: " + totalPotBudget)
    $("#stonesBudgetNum").html(stoneBudget);
    $("#metalsBudgetNum").html(metalBudget);
    $("#unallocatedBudgetNum").html(totalPotBudget);
    if (unitCondition == units["total"]) {
        createDropDown("stonesBudget", "Stone Budget", stoneBudget);
        createDropDown("metalsBudget", "Metals Budget", metalBudget);
    } else if (unitCondition == units["marginal"]) {
        console.log("Marginal conditions!!!")
        createCoins("stonesBudget", stoneBudget);
        createCoins("metalsBudget", metalBudget);
        createCoins("unallocatedBudget", totalPotBudget);
    }

}

function createDropDown(divID, name, numOptions = 10) {
    $("#" + divID).append('<div class="input-field col s4 offset-s4 budgetDropdown">' +
        '<select id = "' + divID + 'dropDown">' +
        createDropDownOptions(numOptions) +
        '</select>' +
        '<label></label>' +
        '</div>');
    $('select').material_select();
}

function createDropDownOptions(numOptions) {
    var result = '';
    for (var i = 0; i <= numOptions; i++) {
        result = result + '<option value="' + i + '">' + i + '</option>';
    }
    console.log(result)
    return result;
}


userData["stonesBudget"] = [];
userData["metalsBudget"] = [];

function payMoney() {
    var stonesBudget = $("#stonesBudgetdropDown").val();
    var metalsBudget = $("#metalsBudgetdropDown").val();
    userData["stonesBudget"] = [{ "budget": stonesBudget, "time": timestamp() }];
    userData["metalsBudget"] = [{ "budget": metalsBudget, "time": timestamp() }];
    console.log("User data: ");
    console.log(userData);
    logUserData(userData);
}
