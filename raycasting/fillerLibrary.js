//
// ---------- Classes ------------
//

class Vector2D {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    update(x,y){
        this.x = x;
        this.y = y;
    }

    updateWithVector2D(a){
        this.x = a.x;
        this.y = a.y;
    }

    translate(zero){
        this.x = this.x + zero.x;
        this.y = this.y + zero.y;
    }

    ntranslate(zero){
        this.x = this.x - zero.x;
        this.y = this.y - zero.y;
    }

    multiplyWithNumber(number){
        this.x = this.x * number;
        this.y = this.y * number;
    }

    fromAngle(angle){
        this.x = Math.sin(angle);
        this.y = Math.cos(angle);
    }

    addVector2D(a){
        this.x = this.x + a.x;
        this.y = this.y + a.y
    }

    divideByNumber(number){
        this.x = this.x / number;
        this.y = this.y / number;
    }

}



class GradientRect{
    constructor(){

        this.pos = new Vector2D(width/2,height/2);
    }
    show(){
        // Create gradient
        let grd = c.createRadialGradient(this.pos.x, this.pos.y, 1, this.pos.x, this.pos.y, 200);
        grd.addColorStop(0, 'rgb(255,255,255)');
        grd.addColorStop(1, 'rgb(0,0,0,0)');

        // Fill with gradient
        c.fillStyle = grd;
        c.fillRect(0,0,width,height);
    }
    update(x,y){
        this.pos.x = x;
        this.pos.y = y;
    }
}

//
// ---------- Functions ------------
//

function line(x1,y1,x2,y2){
    //c.fillRect(x1,y1,x2-x1,y2-y1+10);
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
}

function lineFromVector2D(a,b,color) {
    c.beginPath();
    c.moveTo(a.x,a.y);
    c.lineTo(b.x,b.y);
    c.strokeStyle = color;
    c.stroke();
}

function radians(degrees){
    let pi = Math.PI;
    return degrees * (pi/180);
}

function getMousePos(evt) {
    let obj = canvas;
    let objLeft = 0;
    let objTop = 0;
    while (obj.offsetParent)
    {
        objLeft += obj.offsetLeft;
        objTop += obj.offsetTop;
        obj = obj.offsetParent;
    }

    return new Vector2D(evt.clientX - objLeft, evt.clientY - objTop);
}

function dist(start,end) {
    return Math.sqrt(Math.pow(end.x - start.x,2)+ Math.pow(end.y-start.y,2));
}

function circle(x,y,radius,color) {
    c.beginPath();
    c.arc(x, y, radius, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
}

function fillrect(x,y,width,height,color) {
    c.fillStyle = color;
    c.fillRect(x,y,width,height);
}

function strokeRect(x,y,width,height,color) {
    c.beginPath();
    c.strokeStyle = color;
    c.rect(x, y, width, height);
    c.stroke();
}


function rotatedVector2D(a,zero,angle) {
    angle = radians(angle);
    a.ntranslate(zero);
    let r1 = new Vector2D(Math.cos(angle),Math.sin(angle));
    let r2 = new Vector2D(-Math.sin(angle),Math.cos(angle));
    r1.multiplyWithNumber(a.x);
    r2.multiplyWithNumber(a.y);
    r1.addVector2D(r2);
    r1.translate(zero);
    return r1;
}

function lineInLine(line1A,line1B,line2A,line2B) {
    const x1 = line1A.x;
    const y1 = line1A.y;
    const x2 = line1B.x;
    const y2 = line1B.y;

    const x3 = line2A.x;
    const y3 = line2A.y;
    const x4 = line2B.x;
    const y4 = line2B.y;

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
    
