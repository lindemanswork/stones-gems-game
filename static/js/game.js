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

var maxStoneBudget = 10;
var maxMetalBudget = 10;

//UI stuff
var stoneImages = ["Stone1.png", "Stone2.png", "Stone3.png", "Stone4.png", "Stone5.png"];
var metalImages = ["Metal1.png", "Metal2.png", "Metal3.png", "Metal4.png", "Metal5.png"];
var stoneColors = ["#6c7180", "#4f5057", "#7390a0", "#8181a5", "#9ea3af"]; //stone colors
var metalColors = ["#80706c", "#b68a61", "#9c6a51", "#af9679", "#c9c4bc"]
var stonePairings = [];
var metalPairings = [];
var nums = generateArrayOfNums(25);
var nums1 = shuffleArray(nums.slice());
var nums2 = shuffleArray(nums.slice());


//Game variables
var budgetToAllocate = 20;
var stoneBudget = 10;
var metalBudget = 9;
//add conditions budget
var stoneAddBudget = 0;
var metalAddBudget = 0
var unallocatedBudget = budgetToAllocate;
var level = 0;
var roundsLeft;

//static
var metalPrices = [];
var stonePrices = [];
var priceMultipliers = [];
var unitCondition;
//only if total condition:
var totalConditionValue = "";
var totalConditionBudgetType = "";
var totalConditionBudgetobjectTo = "";

//user data storage
var stonePurchases = [];
var metalPurchases = [];

/*-----new level---------*/
function newLevel() {
    //roundsLeft--;
    console.log("Rounds left after new level: " + roundsLeft)
    console.log("NEW LEVEL!")
    clearScreen();
    initUIVariables();
    generateMetalsStones("metalsVendor", "stonesVendor", parseInt(data["Metals"]));
    createBudgetArea(data["startCondition"], unitCondition);
}

function initUIVariables() {
    metalCombinations = generateCombinations();
    stoneCombinations = generateCombinations();
    nums1 = shuffleArray(nums.slice());
    nums2 = shuffleArray(nums.slice());
    metalPairings = [];
    stonePairings = [];
    $("#payMoney").attr("payMoney", false);
}

function clearScreen() {
    $("#metalsVendor").empty();
    $("#stonesVendor").empty();
    $("#metalCoins").empty();
    $("#stoneCoins").empty();
    $("#metalsBudgetNum").empty();
    $("#stonesBudgetNum").empty();
    $(".budgetDropdown").remove();
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
    setGameBoardSettings()

}

function setInitialValues() {
    if (roundsLeft == null) {
        roundsLeft = parseInt(data["Rounds"]);
    }
    //console.log("Rounds left: " + roundsLeft)
    stoneBudget = parseInt(data["stonesBudget"])
    metalBudget = parseInt(data["metalsBudget"])
    totalUnallocatedBudget = stoneBudget + metalBudget;
    //console.log("BUdget: stone:" + stoneBudget + ", " + metalBudget)
    unallocatedBudget = totalUnallocatedBudget; //TODO: fix this, can't be the sum depending on initial conditions
    unitCondition = data["unitCondition"];
    initPrices();
}

function initPrices() {
    metalPrices = shuffleArray(data["metalPrices"].split(","));
    stonePrices = shuffleArray(data["stonePrices"].split(","));
    priceMultipliers = shuffleArray(data["priceMultipliers"].split(","));
}

function generateObjects(metalDivID, stoneDivID, numObject) {
    $("#" + metalDivID).append('<div id="' + metalDivID + 'ObjectRow" class="objectRow row"></div>')
    $("#" + stoneDivID).append('<div id="' + stoneDivID + 'ObjectRow" class="objectRow row"></div>')
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
        var metalColor = stoneColors[metalIndices[1]];
        var stoneColor = metalColors[stoneIndices[1]];

        createObjectImage("metal", metal, metalColor, i, metalDivID + "ObjectRow");
        createObjectImage("stone", stone, stoneColor, i, stoneDivID + "ObjectRow");
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
        stoneOrMetal + i + "'>" + "<img class = 'objectImage' src='/static/images/" + stoneOrMetal + "s/" + imageFile + "'>" + "<div class='price " + stoneOrMetal + "Price' id='" + stoneOrMetal + "Price" + i + "'> $" + (parseInt(priceMultipliers[roundsLeft - 1]) * parseInt(window[stoneOrMetal + "Prices"].pop())) + " </div>");
    $("#" + stoneOrMetal + i).css("background-color", color);
    setObjectClickAction("#" + stoneOrMetal + i);
}

function setObjectClickAction(divID) {
    //console.log("Set object click action div: " + divID)
    $(divID).click(function() {
        if ($("#payMoney").attr("payMoney") == "true") {
            var pos = $(this).attr("id").slice(-1);
            var round = data["Rounds"] - roundsLeft;
            //console.log("ROUND: " + round)
            if ($(this).attr("objectType") == "metal") {
                decrementBudget("metalBudget", this);
                updateBudgetChanges(metalBudget, rSides["metal"], round)

                //console.log("UPDATE PURCHASE WITH PRICE: " + $("#metalPrice" + pos).html());
                updatePurchase(pos, $("#metalPrice" + pos).html(), rSides["metal"], round)
            } else if ($(this).attr("objectType") == "stone") {
                decrementBudget("stoneBudget", this);
                updateBudgetChanges(stoneBudget, rSides["stone"], round)
                updatePurchase(pos, $("#stonePrice" + pos).html(), rSides["stone"], round)
            }

            updateBudgetNumUI();
        } else {
            alert("Please finalize your budget first");
            //console.log("Budgets: stone: " + stoneBudget + ", metal: " + metalBudget)
        }
    });

}

function decrementBudget(budgetName, divID) {
    if (window[budgetName] <= 0 && ($(divID).attr("purchased") == "false")) {
        alert("Not enough money to buy more")
    } else if ($(divID).attr("purchased") == "true") { //return the object
        $(divID).attr("purchased", "false");
        $(divID).css("box-shadow", "");
        window[budgetName]++;
        updateCoins($(divID).attr("objectType") + "Coins", window[budgetName]);
        updateCoins("unallocatedCoins", unallocatedBudget);
    } else { //purchase it
        //$(divID).css("background-color", "grey");
        $(divID).css("box-shadow", "inset 0 0 0 1000px rgba(0,0,0,.5)");
        $(divID).attr("purchased", "true");
        window[budgetName]--;
        updateCoins($(divID).attr("objectType") + "Coins", window[budgetName]);
        updateCoins("unallocatedCoins", unallocatedBudget);
    }
}

function updateBudgetNumUI(stoneBudget1 = stoneBudget, metalBudget1 = metalBudget, unallocatedBudget1 = unallocatedBudget) {
    $("#stonesBudgetNum").html(stoneBudget1);
    $("#metalsBudgetNum").html(metalBudget1);
    $("#unallocatedBudgetNum").html(unallocatedBudget1); //TODO: fix this, can't be the sum
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
    if (startCondition == startingpt["add"]) { //IN PROGRESS
        unallocatedBudget = 0;
        console.log("Add condition")
        setTransferButtons(unitCondition, "Add")
        createBudgetInput(unitCondition, unallocatedBudget, 0, 0);
    } else if (startCondition == startingpt["transfer"]) { //from side to side
        unallocatedBudget = 0;
        console.log("transfer condition");
        setTransferButtons(unitCondition);
        createBudgetInput(unitCondition, 0, data["stonesBudget"], data["metalsBudget"]);
    } else if (startCondition == startingpt["cut"]) {
        //TODO
        console.log("Cut condition");
        setTransferButtons(unitCondition)
        createBudgetInput(unitCondition, 0, maxStoneBudget, maxMetalBudget);
    }
    setFinalizeBudgetAction();

}

function setTransferButtonUI(unitCondition) {
    var i = 1;
    $(".transferButton").each(function() {
        if (unitCondition == units["marginal"]) {
            if (i == 2 || i == 3) {
                $(this).attr("src", "/static/images/RightArrow.png");
            } else {
                $(this).attr("src", "/static/images/LeftArrow.png")
            }
            i++;
        } else if (unitCondition == units["total"]) {
            //$(this).css("display", "none");
            $(".transfer").css("display", "none");
        }
    })
}

function setTransferButtons(unitCondition, add = "") {
    setTransferButtonUI(unitCondition);
    var round = data["Rounds"] - roundsLeft;
    if (unitCondition == units["marginal"]) {
        $("#toStone").click(function() {
            allocateBudget('#stoneCoins', '#unallocatedCoins', add);
            updateBudgetChanges(stoneBudget, rSides["stone"], round)
        });
        $("#fromStone").click(function() {
            allocateBudget('#unallocatedCoins', '#stoneCoins', add);
            updateBudgetChanges(stoneBudget, rSides["stone"], round)
        });
        $("#toMetal").click(function() {
            allocateBudget('#metalCoins', '#unallocatedCoins', add);
            updateBudgetChanges(metalBudget, rSides["metal"], round);
        });
        $("#fromMetal").click(function() {
            allocateBudget('#unallocatedCoins', '#metalCoins', add);
            updateBudgetChanges(metalBudget, rSides["metal"], round);
        });
    }
}


//for add condition
function allocateBudget(budgetToDiv, budgetFromDiv, add) {
    console.log("allocate budget clicked!")
    var objectFrom = $(budgetFromDiv).attr("objectType");
    var objectTo = $(budgetToDiv).attr("objectType");
    var updateCondition = true;
    var updateCondition2 = false;
    var fromBudgetString;
    /*if (unitCondition == units["total"]) {
        if (totalConditionBudgetobjectTo == "unallocatedBudget") {
            fromBudgetString = totalConditionBudgetobjectTo.substring(0, 11) + "Budget";
        } else {
            fromBudgetString = totalConditionBudgetobjectTo.substring(0, 5) + "Budget";
        }
    }else{*/
    fromBudgetString = objectFrom + "Budget";
    // }
    //console.log("fromBudgetString: " + fromBudgetString)

    if (add == "add") {
        //console.log("MARGINAL CONDITION add")
        updateCondition = (window[objectFrom + "Budget"] > 0 && window[objectTo + add + "Budget"] < window[objectTo + "Budget"])
        updateCondition2 = (window[objectTo + add + "Budget"] >= window[objectTo + "Budget"]);
    } else {

        //console.log("MARGINAL CONDITION not add")
        updateCondition = (window[fromBudgetString] > 0)
            //console.log("window[" + fromBudgetString + "]: " + window[fromBudgetString]);
        updateCondition2 = (window[objectTo + add + "Budget"] > window[objectTo + "Budget"]);
    }

    /*
        if (unitCondition == units["total"]) {
            console.log("TOTAL CONDITION")
            if (objectFrom == "unallocated") {
                budgetString = "Budget";
            } else {
                budgetString = "sBudget"
            }
            updateCondition = ((totalConditionBudgetobjectTo == (objectFrom + budgetString)) && (window[fromBudgetString] >= totalConditionValue))
            console.log("Total updateCondition: " + updateCondition)
        }
    */
    if (updateCondition) {
        if (unitCondition == units["marginal"]) {
            window[objectFrom + "Budget"]--;
            window[objectTo + add + "Budget"]++;
            updateCoins(objectTo + "Coins", window[objectTo + add + "Budget"]);
            console.log('objectTo + add + "Budget": ' + objectTo + add + "Budget")
            updateCoins(objectFrom + "Coins", window[objectFrom + add + "Budget"]);
            console.log("unallocated budget: " + unallocatedBudget)
        } else if (unitCondition == units["total"]) {

            window[fromBudgetString] = window[fromBudgetString] - totalConditionValue;
            window[objectTo + add + "Budget"] = window[objectTo + add + "Budget"] + totalConditionValue;
        }
        updateBudgetNumUI();
    } else if (updateCondition2) {
        alert("You cannot allocate any more to " + objectTo + ", maximum budget for " + objectTo + " reached");
    } else {
        alert("You have no more coins to allocate from " + objectFrom);
    }

}

function createCoins(divID, numCoins) {
    console.log("createCoins divID: " + divID)
    var totalStoneBudget = data["stonesBudget"];
    var totalMetalBudget = data["metalsBudget"];
    var percent;
    var height;
    $("#" + divID).empty();
    var c = $("#" + divID).get(0);
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    if (divID.charAt(0) == 's') {
        percent = stoneBudget / totalStoneBudget;
        height = c.height / totalStoneBudget;
    } else if (divID.charAt(0) == 'm') {
        percent = metalBudget / totalMetalBudget;
        height = c.height / totalMetalBudget;
    } else if (divID.charAt(0) == 'u') {
        percent = unallocatedBudget / totalUnallocatedBudget;
        height = c.height / totalUnallocatedBudget;
    }

    ctx.fillStyle = lightOrange;
    //x,y,width, height
    ctx.fillRect(50, (1 - percent) * c.height, 50, percent * c.height);
    /*
        for (var i = 0; i < numCoins; i++) {
            $("#" + divID).html("<div class='coin'></div>" + $("#" + divID).html());
            if ((i + 1) % 5 == 0 && i != 0) {
                $("#" + divID).html("<br>" + $("#" + divID).html());
            }
        }
        */
}

function updateCoins(divID, numCoins) {
    $("#" + divID).empty();
    createCoins(divID, numCoins);
}

function createBudgetInput(unitCondition, unallocatedBudget = 0, stoneBudget = 10, metalBudget = 10) {
    //console.log("total budget: " + unallocatedBudget)
    if (unitCondition == units["total"]) {
        updateBudgetNumUI(0, "", 0);
        createDropDown("stonesBudget", "Stone Budget", stoneBudget);
        createDropDown("metalsBudget", "Metals Budget", metalBudget);
        //createDropDown("unallocatedBudget", "Unallocated Budget", stoneBudget + metalBudget);
    } else if (unitCondition == units["marginal"]) {
        updateBudgetNumUI();
        //console.log("Marginal conditions!!!")
        createCoins("stoneCoins", stoneBudget);
        createCoins("metalCoins", metalBudget);
        createCoins("unallocatedCoins", unallocatedBudget);
    }

}


function createDropDown(divID, name, numOptions = 10) {
    //console.log("CreateDropdown divid: " + divID)
    $("#" + divID).append('<div class="input-field col s4 offset-s4 budgetDropdown">' +
        '<select onchange="selectedBudget(this,\'' + divID + '\')" id = "' + divID + 'dropDown">' +
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
    //console.log(result);
    return result;
}

function selectedBudget(sel, budgetType) {

    var value = sel.options[sel.selectedIndex].value;
    totalConditionValue = parseInt(value);
    totalConditionBudgetobjectTo = budgetType;
    //console.log("selectedBudget: " + totalConditionBudgetobjectTo + ", " + value)

    //update budget variables
    var budgetName = budgetType.substring(0, 5) + "Budget";
    //console.log("BUDGETNAME: " + budgetName)
    window[budgetName] = totalConditionValue;
    //updateCoins(budgetToAllocate+ "Coins", window[budgetName]);
    updateBudgetNumUI();
    //console.log("CREATE COINS in div: " + budgetName + "Coins")

    createCoins(budgetName.substring(0, 5) + "Coins", window[budgetName]);
}


function finalizeBudget() {
    console.log("FINALIZE BUDGET, DISABLE SELECT")

    $('select').material_select('destroy');

    $("#payMoney").text("Make purchase");
    setPayMoneyAction();
}

function payMoney() {
    console.log("------CAll PAY MONEY-------")
        /*
        var stonesBudget = $("#stonesBudgetdropDown").val();
        var metalsBudget = $("#metalsBudgetdropDown").val();
        userData["stonesBudget"] = [{ "budget": stonesBudget, "time": timestamp() }];
        userData["metalsBudget"] = [{ "budget": metalsBudget, "time": timestamp() }];
        console.log("User data: ");
        console.log(userData);
        */
    console.log("Level: " + level)
    console.log("Data rounds: " + parseInt(data["Rounds"]))
    level++;
    roundsLeft--;
    if (level < parseInt(data["Rounds"])) {
        alert("New level: " + level);
        newLevel();
    } else {
        logUserData(recordedData);
        console.log("FINAL RECORDED DATA: ")
        console.log(recordedData);
        $("#payMoney").prop("disabled", true);
        alert("Thank you for playing");
        return false;

    }


}

function setPayMoneyAction() {
    $("#payMoney").attr("payMoney", true);
    $("#payMoney").click(function() {
        payMoney();
    })
}

function setFinalizeBudgetAction() {
    $("#payMoney").text("Finalize my budget");
    $("#payMoney").click(function() {
        finalizeBudget();
    })
}
