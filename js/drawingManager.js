// This ratio helps controlling how big is each element in the UI
var ratio = 20;

class DrawingManager {

    static draw(objectToDraw) {
        if (objectToDraw instanceof Grill) {
            this.drawGrill(objectToDraw);
        } else if (objectToDraw instanceof Food) {
            this.drawFood(objectToDraw);
        }
    }

    /**
     * Draw an empty grill
     */
    static drawGrill(objectToDraw) {
        // check if exists a grill 
        if(document.getElementById("grill") == null){
            // Get the grill
            let body = document.getElementsByTagName("body")[0]
            // Create a new grill
            let grill = document.createElement('div');
            grill.id = "grill";

            // Set the posistion and the size of the grill
            grill.setAttribute("style", `
                width:${this.calculateSizeInPixels(objectToDraw.width) + "px"};
                height:${this.calculateSizeInPixels(objectToDraw.height) + "px"};
            `);
            // Add the grill to the body
            body.appendChild(grill);
        }else{
            // if the grill exists then clear it
            document.getElementById("grill").innerHTML ="";
        }
    }

    /**
     * Draw food inside the grill
     */
    static drawFood(objectToDraw) {
        // Get the grill
        let grill = document.getElementById("grill");
        // Create a new food
        let food = document.createElement('div');
        food.className = objectToDraw.name + " food";
        // Set the posistion and the size of the food
        food.setAttribute("style", `
            width:${this.calculateSizeInPixels(objectToDraw.width) + "px"};
            height:${this.calculateSizeInPixels(objectToDraw.height) + "px"};
            left: ${this.calculateSizeInPixels(objectToDraw.coords.leftTop.x) + "px"};
            top: ${this.calculateSizeInPixels(objectToDraw.coords.leftTop.y) + "px"}
        `);
        // Add the food to the grill
        grill.appendChild(food)
    }

    /**
     * Calculates a size in pixels depending on the size
     */
    static calculateSizeInPixels(size) {
        let windowSize = this.checkWindowsSize();

        switch (windowSize) {
            case "Mobile-S":
                ratio = 12;
                break;
            case "Mobile-M":
                ratio = 12;
                break;
            case "Mobile-L":
                ratio = 12;
                break;
            case "Tablet":
                ratio = 20;
                break;
            case "Laptop":
                ratio = 25;
                break;
            case "Laptop-L":
                ratio = 25;
                break;
            case "4K":
                ratio = 40;
                break;
        }

        return size * ratio;
    }

    /**
     * Return the size of the screen.
     */
    static checkWindowsSize() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        let windowsSize = {
            "width": x,
            "height": y
        }

        if (windowsSize.width <= 320)
            return "Mobile-S";
        if (windowsSize.width <= 375)
            return "Mobile-M";
        if (windowsSize.width <= 425)
            return "Mobile-L";
        if (windowsSize.width <= 768)
            return "Tablet";
        if (windowsSize.width <= 1024)
            return "Laptop";
        if (windowsSize.width <= 1440)
            return "Laptop-L";
        if (windowsSize.width >= 2560)
            return "4K";

        return windowsSize;
    }


}