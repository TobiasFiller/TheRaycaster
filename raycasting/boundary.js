class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = new Vector2D(x1,y1);
        this.b = new Vector2D(x2,y2);
    }
    show() {
        line(this.a.x,this.a.y,this.b.x,this.b.y);
        c.strokeStyle = 'rgb(255,255,255)';
        c.stroke();
    }
}
