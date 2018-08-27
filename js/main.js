/**
 * Creates a new Grill if press the put food button
 */
document.getElementById("putFoodBtn").onclick = function() {
    areaNotUsed
    // Create a new grill
    let width = 20;
    let height = 15; 
    // Coords of the top left corner
    let topLeft = {"x": 0, "y":0}
    let foodData = `{"width":20,"height":15,"grillitems":{"grillitem":[{"width":5,"height":4,"count":6,"title":"Steak"},{"width":8,"height":2,"count":5,"title":"Sausage"},{"width":3,"height":3,"count":4,"title":"Tomato"},{"width":4,"height":3,"count":8,"title":"Veal"}]}}`;

    let grill  = new Grill(width, height, topLeft ,foodData);

    let strategy = document.getElementById("selectStrategy").options.selectedIndex;
    strategy = (strategy == 0 ) ? "BiggerFirst" : "SmallerFirst";
    
    //Load the data of the food we want to put on the grill
    grill.fillGrillWithFood(strategy);

    // Draw the grill and the food 
    grill.draw();

    document.getElementById("areaUsed").innerHTML = grill.areaUsed();
    document.getElementById("areaNotUsed").innerHTML =grill.area - grill.areaUsed();
    document.getElementById("foodNotPut").innerHTML =grill.foodNotPutOnGrill();
};


document.getElementById("clearBtn").onclick = function() {
    if(document.getElementById("grill") != null){
        // if the grill exists then clear it
        document.getElementById("grill").innerHTML ="";
        document.getElementById("areaUsed").innerHTML = "0";
        document.getElementById("areaNotUsed").innerHTML ="";
    }
};