function getGameBoardSettings() {
    console.log(staticSettings("left", "stone"));
    console.log(staticSettings("right", "metal"));

}

function metalStaticSettings(side) {


}

function staticSettings(side, objectType) {
    var price = [];
    var position = [];
    $("."+objectType+"Price").each(function() {
        price.push($.trim($(this).html()).replace("$", ""))
        position.push($(this).attr("id").charAt($(this).attr("id").length-1))
    })
    var priceName = objectType+"Price";
    var pricePositionName = objectType+"Position"
    return { priceName: price, pricePositionName: position }

}

