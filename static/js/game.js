var startingpt = { "add": "1", "transfer": "2", "cut": "3" };
//add: nothing in either budgets all in "to be allocated"
//transfer: spread over 2 budges
//Cut: cut from two budgets

//total: directly input in textbox
//marginal: one by one with the arrows
var units = { "total": "1", "marginal": "2" }
var budgetToAllocate = 20;
var stoneBudget = 10;
var metalBudget = 9;

var lightOrange = "#ffc571";
var orange = "#f99755";
var purple = "#858ce9";

function generateMetalsStones(metalDivID, stoneDivID, numMetals, numStones){
	generateObjects(metalDivID, numMetals,/*metal image path*/);
	generateObjects(stoneDivID, numStones, /*stone image path*/);

}

function generateObjects(divID, numObject, toAppend){
	for (var i=0; i<numObject; i++){
		$("#"+divID).append(toAppend);
	}
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
        createBudgetInput(unitCondition, parseInt(data["stonesBudget"])+parseInt(data["metalsBudget"]), 0, 0);
    } else if (startCondition == startingpt["transfer"]) {
    	console.log("transfer condition");
        createBudgetInput(unitCondition, 0, data["stonesBudget"],data["metalsBudget"]);
    } else if (startCondition == startingpt["cut"]) {
        console.log("Cut condition");
    }

}

function createCoins(divID, numCoins){
	for (var i=0; i<numCoins; i++){
		$("#"+divID).html("<div class='coin'></div>"+$("#"+divID).html());
		if ((i+1)%5==0 && i!=0){
			$("#"+divID).html("<br>"+$("#"+divID).html());
		}
	}
}

function createBudgetInput(unitCondition, totalPotBudget = 0, stoneBudget = 10, metalBudget = 10) {
	console.log("total budget: "+totalPotBudget)
	$("#stonesBudgetNum").html(stoneBudget);
	$("#metalsBudgetNum").html(metalBudget);
	$("#unallocatedBudgetNum").html(totalPotBudget);
    if (unitCondition == units["total"]) {
        createDropDown("stonesBudget", "Stone Budget", stoneBudget);
        createDropDown("metalsBudget", "Metals Budget", metalBudget);
    } else if (unitCondition == units["marginal"]) {
    	console.log("Marginal conditions!!!")
    	createCoins("stonesBudget", stoneBudget);
    	createCoins("metalsBudget",metalBudget);
    	createCoins("unallocatedBudget",totalPotBudget);
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