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

var lightOrange = "#ffc571";
var orange = "#f99755";
var purple = "#858ce9";

//UI stuff
var stoneImages = [];
var metalImages = [];
var colors = [orange, purple, lightOrange, "#800000", "#FF0000"]; //TODO: replace with actual colors
var stonePairings = [];
var metalPairings = [];
var nums = generateArrayOfNums(25);
var nums1 = shuffleArray(nums.slice());
var nums2 = shuffleArray(nums.slice());


//Game variables
var budgetToAllocate = 20;
var stoneBudget = 10;
var metalBudget = 9;
var totalPotBudget = budgetToAllocate;
var level = 1;
var metalPrices = [];
var stonePrices = [];
var priceMultipliers = [];
var roundsLeft;

/*-----new level---------*/
function newLevel() {
    roundsLeft--;
    console.log("Rounds left after new level: " + roundsLeft)
    console.log("NEW LEVEL!")
    level++;
    clearScreen();
    initUIVariables();
    generateMetalsStones("metalsVendor", "stonesVendor", parseInt(data["Metals"]));
    createBudgetArea(data["startCondition"], data["unitCondition"]);
}

function initUIVariables() {
    metalCombinations = generateCombinations();
    stoneCombinations = generateCombinations();
    nums1 = shuffleArray(nums.slice());
    nums2 = shuffleArray(nums.slice());
    metalPairings = [];
    stonePairings = [];
}

function clearScreen() {
    $("#metalsVendor").empty();
    $("#stonesVendor").empty();
    $("#metalCoins").empty();
    $("#stoneCoins").empty();
    $("#metalsBudgetNum").empty();
    $("#stonesBudgetNum").empty();
}

/*----------randomize UI-----------*/

function generateArrayOfNums(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(i);
    }
    return arr;
}

//will there always be an equal amount of stones and metals?
function generateMetalsStones(metalDivID, stoneDivID, numMetals, numStones) {
    setInitialValues();
    console.log("number of stones: " + numStones + ", metals: " + numMetals)
    generateObjects(metalDivID, stoneDivID, numMetals);
    //generateObjects(stoneDivID, numStones /*stone image path*/ );

}

function setInitialValues() {
    if (roundsLeft == null) {
        roundsLeft = parseInt(data["Rounds"]);
    }
    console.log("Rounds left: " + roundsLeft)
    stoneBudget = parseInt(data["stonesBudget"])
    metalBudget = parseInt(data["metalsBudget"])
    console.log("BUdget: stone:" + stoneBudget + ", " + metalBudget)
    totalPotBudget = stoneBudget + metalBudget; //TODO: fix this, can't be the sum depending on initial conditions
    initPrices();
}

function initPrices() {
    metalPrices = shuffleArray(data["metalPrices"].split(","));
    stonePrices = shuffleArray(data["stonePrices"].split(","));
    priceMultipliers = shuffleArray(data["priceMultipliers"].split(","));
}

function generateObjects(metalDivID, stoneDivID, numObject) {
    for (var i = 0; i < numObject; i++) {
        var rand = nums1.pop();
        var rand1 = nums2.pop();

        metalIndices = metalCombinations[rand];
        stoneIndices = stoneCombinations[rand1];

        //add to pairings
        metalPairings.push(metalIndices);
        stonePairings.push(stoneIndices);

        //console.log("Indices: metal:" + metalIndices + ", stone: " + stoneIndices);

        var stone = stoneImages[stoneIndices[0]];
        var metal = metalImages[metalIndices[0]];
        var metalColor = colors[metalIndices[1]];
        var stoneColor = colors[stoneIndices[1]];

        createObjectImage("metal", metal, metalColor, i, metalDivID);
        createObjectImage("stone", stone, stoneColor, i, stoneDivID);
        delete metalCombinations[rand]
        delete stoneCombinations[rand1]
    }

}


/**
 * [createObjectImage description]
 * @param  {String} stoneOrMetal "stone" or "metal"
 * @param  {String} imageFile    image file name
 * @param  {String} color        hex color
 * @param  {integer} i            loop integer
 * @param  {String} divID        [description]
 * @return {null}              
 */
function createObjectImage(stoneOrMetal, imageFile, color, i, divID) {
    $("#" + divID).append("<div purchased='false' objectType='" + stoneOrMetal + "' class='" + stoneOrMetal + " object' id='" +
        stoneOrMetal + i + "'>" + "<img class = 'objectImage' src='/static/images/" + stoneOrMetal + "s/" + imageFile + "'>" + "<div class='price' id='" + stoneOrMetal + "Price" + i + "'> $" + (parseInt(priceMultipliers[roundsLeft - 1]) * parseInt(window[stoneOrMetal + "Prices"].pop())) + " </div>");
    $("#" + stoneOrMetal + i).css("background-color", color);
    setObjectClickAction("#" + stoneOrMetal + i);
}

function setObjectClickAction(divID) {
    //console.log("Set object click action div: " + divID)
    $(divID).click(function() {
        console.log("Click object!")
        if ($(this).attr("objectType") == "metal") {
            decrementBudget("metalBudget", this);
        } else if ($(this).attr("objectType") == "stone") {
            decrementBudget("stoneBudget", this);
        }
        updateBudgetNumUI();
        console.log("Budgets: stone: " + stoneBudget + ", metal: " + metalBudget)
    });

}

function decrementBudget(budgetName, divID) {
    if (window[budgetName] <= 0) {
        alert("Not enough money to buy more")
    } else if ($(divID).attr("purchased") == "true") {
        alert("Already purchased");
    } else {
        $(divID).css("background-color", "grey");
        $(divID).attr("purchased", "true");
        window[budgetName]--;
        updateCoins($(divID).attr("objectType") + "Coins", window[budgetName]);
    }
}

function updateBudgetNumUI() {
    $("#stonesBudgetNum").html(stoneBudget);
    $("#metalsBudgetNum").html(metalBudget);
    $("#unallocatedBudgetNum").html(totalPotBudget); //TODO: fix this, can't be the sum
}

function generateIndices() {
    var colorNum = getRandomArbitrary(0, 5);
    var objectNum = getRandomArbitrary(0, 5);
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


function randomizePrices(multiplier) {

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

function updateCoins(divID, numCoins) {
    $("#" + divID).empty();
    createCoins(divID, numCoins);
}

function createBudgetInput(unitCondition, totalPotBudget = 0, stoneBudget = 10, metalBudget = 10) {
    console.log("total budget: " + totalPotBudget)
    updateBudgetNumUI();
    if (unitCondition == units["total"]) {
        createDropDown("stonesBudget", "Stone Budget", stoneBudget);
        createDropDown("metalsBudget", "Metals Budget", metalBudget);
    } else if (unitCondition == units["marginal"]) {
        console.log("Marginal conditions!!!")
        createCoins("stoneCoins", stoneBudget);
        createCoins("metalCoins", metalBudget);
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
    if (roundsLeft > 1) {
        newLevel();
    } else {
        alert("Thank you for playing")
    }
}
