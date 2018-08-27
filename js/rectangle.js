/**
 * Class Rectangle which has a width, a heigth and the coords of his corners
 */
class Rectangle {
    constructor(leftTop, rightTop, leftBottom, rightBottom) {
        if (rightTop != undefined && leftTop != undefined && leftBottom != undefined) {
            this.leftTop = leftTop;
            this.rightTop = rightTop;
            this.leftBottom = leftBottom;
            this.rightBottom = rightBottom;

            this.width = rightTop.x - leftTop.x;
            this.height = leftBottom.y - leftTop.y;
        }
    }


}

class RectangleFactory {

    /**
     * Create a rectangle by giving the coords of his corners
     */
    static createFrom4Point(leftTop, rightTop, leftBottom, rightBottom) {
        let rect = new Rectangle(leftTop, rightTop, leftBottom, rightBottom);
        return rect;
    }

    /**
     * Create a rectangle by giving the coord of the top left and its width and height
     */
    static createFromLeftTopWidthAndHeight(leftTop, width, height) {
        let rect = new Rectangle();
        rect.leftTop = leftTop;
        rect.rightTop = {
            "x": leftTop.x + width,
            "y": leftTop.y
        };
        rect.leftBottom = {
            "x": leftTop.x,
            "y": leftTop.y + height
        };
        rect.rightBottom = {
            "x": leftTop.x + width,
            "y": leftTop.y + height
        };
        rect.width = width;
        rect.height = height;
        return rect;
    }


}