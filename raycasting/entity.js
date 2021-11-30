class Entity {
    constructor(x,y,width,height){
        this.pos = new Vector2D(x,y);
        this.width = width;
        this.height = height;
        this.forward = new Vector2D(1,0);

        this.hitbox = [
            [new Vector2D(this.pos.x-this.width/2,this.pos.y-this.height/2) , new Vector2D(this.pos.x+this.width/2,this.pos.y-this.height/2)],
            [new Vector2D(this.pos.x+this.width/2,this.pos.y-this.height/2) , new Vector2D(this.pos.x+this.width/2,this.pos.y+this.height/2)],
            [new Vector2D(this.pos.x+this.width/2,this.pos.y+this.height/2) , new Vector2D(this.pos.x-this.width/2,this.pos.y+this.height/2)],
            [new Vector2D(this.pos.x-this.width/2,this.pos.y+this.height/2) , new Vector2D(this.pos.x-this.width/2,this.pos.y-this.height/2)],
        ];


    }

    showHitbox(){
        for (let idx = 0 ; idx < this.hitbox.length;++idx){
            lineFromVector2D(this.hitbox[idx][0],this.hitbox[idx][1],'rgb(255,255,255)');
        }
    }

    rotated(angle){
        for (let idx1 = 0; idx1 < this.hitbox.length;++idx1){
            for (let idx2 = 0; idx2 < this.hitbox[0].length;++idx2){
                this.hitbox[idx1][idx2] = rotatedVector2D(this.hitbox[idx1][idx2],this.pos,angle);
            }
        }

        this.rotation += angle;
        this.forward = rotatedVector2D(this.forward,new Vector2D(0,0),angle);
    }

    update(x,y){
        this.pos.x = x;
        this.pos.y = y;
    }

    moveForward(amount){
        this.forward.multiplyWithNumber(amount);
        this.pos.addVector2D(this.forward);

        for (let idx1 = 0; idx1 < this.hitbox.length;++idx1){
            for (let idx2 = 0; idx2 < this.hitbox[0].length;++idx2){
                this.hitbox[idx1][idx2].addVector2D(this.forward);
            }
        }

        this.forward.divideByNumber(amount);
    }

    returnhitbox(){
        return this.hitbox;
    }


}