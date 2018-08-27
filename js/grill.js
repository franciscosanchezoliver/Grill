class Grill {

    /**
     * @param {*} width : Grill's width
     * @param {*} height : Grill's height
     * @param {*} topLeft : Grill's coords of top left corner
     * @param {*} foodData : The food that is going to be put onto the grill
     */
    constructor(width, height, topLeft, foodData) {
        // Food left to put on to the grill
        if (foodData != undefined)
            this.foods = JSON.parse(foodData).grillitems.grillitem.map(food => FoodFactory.createFood(food));
        // Food already put on the grill
        this.foodsOnGrill = [];
        // the area of the grill
        this.rectangle = RectangleFactory.createFromLeftTopWidthAndHeight(topLeft, width, height);
    }

    /**
     * Order the foods by area.
     * Optional parameter: descending = true, 
     */
    _sortFoodsByArea(descending = true) {
        if (descending)
            this.foods.sort((f1, f2) => f1.area > f2.area ? -1 : 1);
        else
            this.foods.sort((f1, f2) => f1.area < f2.area ? -1 : 1);
    }

    /**
     * @returns the area used in the grill
     */
    areaUsed() {
        return this.foodsOnGrill.reduce((total, food) => total + food.area, 0);
    }

    foodNotPutOnGrill() {
        let result = "";
        for (let eachFood of this.foods)
            result += `${eachFood.name}:${eachFood.count}\n`;
        return result;
    }




    /**
     * Put all the food (if possible) onto the grill
     * @param {*} strategy : choose the way of getting the next food that is going on the grill
     */
    fillGrillWithFood(strategy = "BiggerFirst") {
        // Sort the food by its area following the given strategy
        (strategy == "BiggerFirst") ? this._sortFoodsByArea() : this._sortFoodsByArea(false);

        // Recursive call to put all the food in the grill
        this._putFoodOnGrill(this, this.foods, this.foodsOnGrill);
    }

    /**
     * Place some food on the grill if there is enough space
     */
    _putFoodOnGrill(grill, foods, foodsOnGrill) {
        let food = this.getNextFood(grill, foods);
        if (food != undefined) {
            // Try to put the food horizontally on the grill, if it doesn't fit then put it vertically
            if (!grill._foodFitsHorizontally(food)) {
                food.turn();
            }
            // Calculate the coords of the food inside the grill
            // The point Top Left is going to be the same
            food.setCoords(grill.rectangle.leftTop);
            // Add a new food to the grill
            this.foodsOnGrill.push(food);

            // The remaining space leave 2 rectangles and we can create another 2 grills.
            // Remaining rectangle 1
            let widthGrill1 = food.width;
            let heightGrill1 = grill.height - food.height;
            let topLeftGrill1 = food.coords.leftBottom;
            let remainingGrill1 = new Grill(widthGrill1, heightGrill1, topLeftGrill1);

            // Remaining rectangle 2
            let widthGrill2 = grill.width - food.width;
            let heightGrill2 = grill.height;
            let topLeftGrill2 = food.coords.rightTop;
            let remainingGrill2 = new Grill(widthGrill2, heightGrill2, topLeftGrill2);

            // Left Rectangle 
            this._putFoodOnGrill(remainingGrill1, foods, foodsOnGrill);

            // Right Rectangle
            if (remainingGrill2.area != 0)
                this._putFoodOnGrill(remainingGrill2, foods, foodsOnGrill);
        }
        return null;
    }

    /**
     * Select the next food that fits on to the grill
     */
    getNextFood(grill, foods) {
        if (grill.height == 0 || grill.width == 0) return undefined;
        let i = 0;
        while (i < foods.length) {
            if (grill._foodFitsIntoGrill(foods[i])) {
                let returnedFood = Object.assign({ __proto__: foods[i].__proto__ }, foods[i]);
                if (returnedFood.count >= 0) {
                    foods[i].count--;
                    if (foods[i].count == 0) {
                        foods.splice(i, 1);
                    }
                    returnedFood.count = 1;
                    return returnedFood;
                }
            }
            i++;
        }
        return undefined;
    }

    /**
     * Check if the area of the given food is less than the area of the grill
     */
    _foodFitsIntoGrill(food) {
        if (food == undefined) return false;
        if (this.area < food.area) return false;
        let largerSideOfFood = (food.width > food.height) ? food.width : food.height;
        let largerSideOfGrill = (this.width > this.height) ? this.width : this.height;
        if (largerSideOfFood > largerSideOfGrill) return false;
        return true;
    }

    /**
     * Check if the food fits into the grill in a vertical position
     */
    _foodFitsHorizontally(food) {
        return (food !== undefined) && (food.width <= this.width);
    }

    /**
     * Return the area of the grill
     */
    get area() {
        return this.width * this.height;
    }

    /**
     * Return width of the grill
     */
    get width() {
        return this.rectangle.width;
    }

    /**
      * Return height of the grill
      */
    get height() {
        return this.rectangle.height;
    }

    /**
     * Draw an empty grill in the UI
     */
    draw() {
        // Draw the grill
        DrawingManager.draw(this);
        // Draw the food put on the grill
        for (let eachFood of this.foodsOnGrill)
            eachFood.draw();
    }

}

