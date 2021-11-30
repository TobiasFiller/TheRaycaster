class Ray {
    constructor(pos,angle){
        this.pos = pos;

        this.angle = angle;
        this.dir = new Vector2D();
        this.dir.fromAngle(angle);
        this.dir.multiplyWithNumber(1);

    }

    show() {
        this.dir.translate(this.pos);
        line(this.pos.x ,this.pos.y ,this.dir.x,this.dir.y);
        c.strokeStyle = 'rgb(255,255,255)';
        c.stroke();

    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t <= 1 && 0 <= t && u > 0) {
            const pt = new Vector2D();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
    }
}