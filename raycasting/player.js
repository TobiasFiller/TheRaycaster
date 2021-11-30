class Player {
    constructor (x,y,color){
        this.pos = new Vector2D(x,y);
        this.color = color;
        this.rotation = 0;
        this.forward = new Vector2D(1,0);
        /*this.img = new Image();
        this.img.src = "/img/raycaster_Demo.png";*/

        this.player = new Entity(this.pos.x,this.pos.y,30,15);
        this.light = new Particle(this.pos.x+10,this.pos.y,this.color)
        this.model = new Hero(this.pos.x,this.pos.y);
    }


    rotated(angle){
        this.player.rotated(angle);
        this.model.rotated(angle);
        this.light.updateWithVector2D(rotatedVector2D(this.light.pos,this.pos,angle));
        this.rotation += angle;
        this.forward = rotatedVector2D(this.forward,new Vector2D(0,0),angle);
    }

    updateLightRange(range){this.light.updateLightRange(range);}

    show(walls){
        this.light.look(walls);
        this.model.show();
        //c.drawImage(this.img,this.pos.x,this.pos.y);
        if (showHitbox){
            this.player.showHitbox();
            }
    }
    moveForward(amount){
        this.forward.multiplyWithNumber(amount);
        this.player.moveForward(amount);
        this.model.moveForward(amount);

        this.pos.addVector2D(this.forward);
        this.light.pos.addVector2D(this.forward);

        this.forward.divideByNumber(amount);
    }

    collide(walls){
        this.hitbox = this.player.returnhitbox();

        let hitfront = false;
        let hitback = false;

        for (let wall of walls) {

            const x1 = wall.a.x;
            const y1 = wall.a.y;
            const x2 = wall.b.x;
            const y2 = wall.b.y;

            let x3 = this.hitbox[1][0].x;
            let y3 = this.hitbox[1][0].y;
            let x4 = this.hitbox[1][1].x;
            let y4 = this.hitbox[1][1].y;

            let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) {

            }   else {

                const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

                if (t <= 1 && 0 <= t && u > 0) {
                    let intersectX = x1 + t * (x2 - x1);
                    let intersectY = y1 + t * (y2 - y1);
                    let rx0 = (intersectX - x3)/(x4 - x3);
                    let ry0 = (intersectY - y3)/(y4 - y3);

                    if((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)){
                        hitfront = true;
                    }


                }
            }


            x3 = this.hitbox[3][0].x;
            y3 = this.hitbox[3][0].y;
            x4 = this.hitbox[3][1].x;
            y4 = this.hitbox[3][1].y;

            den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) {


            }   else {

                const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

                if (t <= 1 && 0 <= t && u > 0) {
                    let intersectX = x1 + t * (x2 - x1);
                    let intersectY = y1 + t * (y2 - y1);
                    let rx0 = (intersectX - x3) / (x4 - x3);
                    let ry0 = (intersectY - y3) / (y4 - y3);

                    if ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) {
                        hitback = true;
                    }
                }
            }
        }
        if(moveForward){
            moveForward = !hitfront;
        }

        if(moveBackward){
            moveBackward = !hitback;
        }

        if (showHitbox) {
            if (hitfront){
                lineFromVector2D(this.hitbox[1][0],this.hitbox[1][1],'rgb(255,0,0)')
            }
            if (hitback){
                lineFromVector2D(this.hitbox[3][0],this.hitbox[3][1],'rgb(255,0,0)')
            }
        }
    }


}