class Hero {
    constructor(x,y) {
        this.color = 'rgb(0,0,0)';
        this.forward = new Vector2D(1,0);

        this.pos = new Vector2D(x,y);
        this.head = new Vector2D(this.pos.x-40/2+10,this.pos.y-20/2+10);
        this.nose = new Vector2D(this.head.x +9,this.head.y );
        this.handstart = new Vector2D(this.head.x,this.head.y -5);
        this.handend = new Vector2D(this.handstart.x + 15,this.handstart.y);
        this.lanternbottemright = new Vector2D(this.handend.x +10,this.handend.y+10);
        this.lanternbottemleft = new Vector2D(this.lanternbottemright.x - 10,this.lanternbottemright.y);
        this.lanterntopright = new Vector2D(this.lanternbottemright.x,this.handend.y);
    }

    show(){
        circle(this.head.x,this.head.y,7,this.color);
        lineFromVector2D(this.head,this.nose,this.color);
        lineFromVector2D(this.handstart,this.handend,this.color);
        //wdstrokeRect(this.handend.x,this.handend.y,this.lanternbottemright.x - this.handend.x,this.lanternbottemright.y - this.handend.y,this.color);
        lineFromVector2D(this.handend,this.lanternbottemright,this.color);
        lineFromVector2D(this.lanterntopright,this.lanternbottemleft,this.color);
    }

    moveForward(amount){
        this.forward.multiplyWithNumber(amount);
        this.pos.addVector2D(this.forward);

        this.head.addVector2D(this.forward);
        this.nose.addVector2D(this.forward);
        this.handstart.addVector2D(this.forward);
        this.handend.addVector2D(this.forward);
        this.lanternbottemright.addVector2D(this.forward);
        this.lanternbottemleft.addVector2D(this.forward);
        this.lanterntopright.addVector2D(this.forward);

        this.forward.divideByNumber(amount);
    }

    rotated(angle){
        this.head = rotatedVector2D(this.head,this.pos,angle);
        this.nose = rotatedVector2D(this.nose,this.pos,angle);
        this.handstart = rotatedVector2D(this.handstart,this.pos,angle);
        this.handend = rotatedVector2D(this.handend,this.pos,angle);
        this.lanternbottemright = rotatedVector2D(this.lanternbottemright,this.pos,angle);
        this.lanternbottemleft = rotatedVector2D(this.lanternbottemleft,this.pos,angle);
        this.lanterntopright = rotatedVector2D(this.lanterntopright,this.pos,angle);

        this.forward = rotatedVector2D(this.forward,new Vector2D(0,0),angle);
    }

}