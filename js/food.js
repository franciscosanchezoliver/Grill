
/**
 * Class that represents a food
 */
class Food {
    constructor(name, width, height, count = 1) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.count = count;
        //coords of the four point that compose the rectangle
        this.coords = {};
    }

    /**
     * @return Calculates the area of this food
     */
    get area() {
        return this.width * this.height;
    }

    /**
     * Turn the food 90º
     */
    turn() {
        // Swap width and height
        let aux = this.height;
        this.height = this.width;
        this.width = aux;
    }

    /**
     * Draw the food on the UI
     */
    draw(){
        DrawingManager.draw(this);
    }

    /**
     * Set the coords of the four point of the rectangle
     */
    setCoords(leftTopPoint) {
        this.coords = {
            "leftTop": {
                "x": leftTopPoint.x,
                "y": leftTopPoint.y
            },
            "rightTop": {
                "x": leftTopPoint.x + this.width,
                "y": leftTopPoint.y
            },
            "leftBottom": {
                "x": leftTopPoint.x ,
                "y": leftTopPoint.y + this.height
            },
            "rightBottom": {
                "x": leftTopPoint.x + this.width, 
                "y": leftTopPoint.y + this.height
            }
        }
    }

}

/**
 * Construct a food object by specyfing the type of food
 */
class FoodFactory {

    static createFood(food) {
        return new Food(food.title, food.width, food.height, food.count);
    }

}