class Particle{
    constructor(x,y,color){
        this.pos = new Vector2D(x,y);
        this.rays = [];
        this.range = 100;
        this.color = color;
        for (let idx = 0; idx < 360 ; idx += 0.1){
            this.rays.push(new Ray(this.pos,radians(idx)));
        }
    }

    update(x,y){
        this.pos.x = x;
        this.pos.y = y;
    }

    updateWithVector2D(a){
        this.pos.x = a.x;
        this.pos.y = a.y;
    }

    show(degree) {
        for (let idx = 0 ; idx < degree ; ++idx){
            this.rays[idx].show();
        }
    }

    updateLightRange(range){
        this.range = range;
    }

    look(walls) {
        for (let i = 0; i < this.rays.length ; i++) {
            let ray = this.rays[i];
            let closest = new Vector2D();
            let record = Infinity;
            for (let idx = 0; idx < walls.length ;++idx) {
                const pt = ray.cast(walls[idx]);
                if (pt) {
                    const d = dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest.x) {

                // Create gradient
                let grd = c.createRadialGradient(this.pos.x, this.pos.y, 1, this.pos.x, this.pos.y, this.range);
                grd.addColorStop(0, this.color);
                grd.addColorStop(1, 'rgb(0,0,0,0)');

                line(this.pos.x, this.pos.y, closest.x, closest.y);
                c.strokeStyle = grd;
                c.stroke();


            }
        }
    }
}