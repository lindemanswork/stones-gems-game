var startingpt = { "add": "1", "transfer": "2", "cut": "3" };

//total: directly input in textbox
//marginal: one by one with the arrows
var units = { "total": "1", "marginal": "2" }
var budgetToAllocate = 20;
var stoneBudget = 10;
var metalBudget = 9;
/**
 * [generateMetalsStones description]
 * @param  {integer} numMetals   [description]
 * @param  {integer} numStones [description]
 * @return {[type]}           [description]
 */
function generateMetalsStones(numMetals, numStones) {

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
        //createBudgetInput(unitCondition, budgetToAllocate, 0, 0)
    } else if (startCondition == startingpt["transfer"]) {
    	console.log("transfer condition");
        createBudgetInput(unitCondition, 0, data["stonesBudget"],data["metalsBudget"]);
    } else if (startCondition == startingpt["cut"]) {
        console.log("Cut condition");
    }

}

function createBudgetInput(unitCondition, totalPotBudget = 0, stoneBudget = 10, metalBudget = 10) {
    if (unitCondition == units["total"]) {
        createDropDown("stonesBudget", "Stone Budget", stoneBudget);
        createDropDown("metalsBudget", "Metals Budget", metalBudget);
    } else if (unitCondition == units["marginal"]) {

    }

}

function createDropDown(divID, name, numOptions = 10) {
    $("#" + divID).append('<div class="input-field col s4 offset-s4 budgetDropdown">' +
        '<select id = "'+divID+'dropDown">' +
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
userData["stonesBudget"]=[];
userData["metalsBudget"]=[];
function payMoney(){
	var stonesBudget = $("#stonesBudgetdropDown").val();
	var metalsBudget = $("#metalsBudgetdropDown").val();
	userData["stonesBudget"]= [{"budget":stonesBudget, "time":timestamp()}];
	userData["metalsBudget"]=[{"budget":metalsBudget, "time":timestamp()}];
	console.log("User data: ");
	console.log(userData);
	logUserData(userData);
}