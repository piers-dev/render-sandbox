let particles = new Array();



let ribbonLength = 0;

let swarmVelocity = 0;

class particleTarget {
    constructor (x,y,size,lineWeight,coherence,snappiness,damping) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.lineWeight = lineWeight;
        this.coherence = coherence;
        this.snappiness = snappiness;
        this.damping = damping
    }
}


function circleFormation(index) {
    let fac = (3.14159/particles.length)*index;
    ribbonLength = particles.length;
    swarmVelocity = -40;
    return new particleTarget(Math.sin(fac+time*5)*100,Math.cos(fac+time*5)*100,20,0,1,0.2,0.5);

}

function VUFormation(index) {
    let row = Math.floor(index/(particles.length/4));

    let strength = (index%(particles.length/4))-(particles.length/8);

    if (Math.abs(row - 1.5) > 1) strength *= 0.4;

    ribbonLength = particles.length/4;

    return new particleTarget((row-1.5)*75,strength*20*inputAudio,30,0,1,0.2,0.6);
}

/*function lineFormation(index) {
    return new particleTarget(index*30,0);
}*/

function defaultFormation(index) {

    let x = particles[index].startingX;
    let rx = particles[index].randX;

    let y = particles[index].startingY;
    let ry = particles[index].randY;


    x += (noise(rx,ry+time*0.05)-0.5)*200;


    y += (noise(rx+time*0.05,ry+time*0.1)-0.5)*200;

    ribbonLength = particles.length;


    return new particleTarget(x,y,particles[index].startingSize,1,0,0.03,0.8);
}


let form = 0;

function formation(index) {
    switch (form) {
        case 0:
            return defaultFormation(index);
        case 1:
            return circleFormation(index);
        case 2:
            return VUFormation(index);
    }
    //return  form ? defaultFormation(index) : VUFormation(index);
}

class particle {
    constructor (x,y,size) {
        this.x = x;
        this.y = y;
        this.xvel = 0;
        this.yvel = 0;

        this.lineWeight = 1;
        this.coherence = 0;
        

        this.startingX = x;
        this.startingY = y;

        this.randX = x;
        this.randY = y;




        this.size = size;
        this.startingSize = size;

        this.index = particles.length;
        particles.push(this);
    }

    draw() {
        fill('white');
        stroke('white');

        let target = formation(this.index);

        this.xvel += (target.x - this.x)*(target.snappiness);
        this.yvel += (target.y - this.y)*(target.snappiness);

        this.xvel *= target.damping
        this.yvel *= target.damping


        //this.x = lerp(this.x,target.x,0.03);
        //this.y = lerp(this.y,target.y,0.03);
        this.lineWeight = Math.max(lerp(this.lineWeight,target.lineWeight,0.2),0);
        this.size = lerp(this.size,target.size,0.05);
        this.coherence = lerp(this.coherence,target.coherence,target.coherence > this.coherence ? 0.05 : 0.6);


        this.x += this.xvel*0.5;
        this.y += this.yvel*0.5;

        
        if (this.lineWeight > 0.01) {
            particles.forEach((p) => {
                ribbonLength != 0
                if ((p.index > this.index)) {
                    let dst = Math.sqrt(Math.pow(this.x-p.x,2)+Math.pow(this.y-p.y,2));

                    strokeWeight((Math.max(1-(dst/150),0)*2)*this.lineWeight);
                    line(this.x+hwidth,this.y+hheight,p.x+hwidth,p.y+hheight);
                }
            })
        }


        
        strokeWeight(this.size);
        let next = this;
        if (particles.length != this.index+1) {
            next = particles[this.index+1];
            if ((next.index % ribbonLength < this.index % ribbonLength) && (ribbonLength != 0)) this.coherence = 0; 
        }

        

        line(this.x+hwidth,this.y+hheight,lerp(this.x,next.x,this.coherence)+hwidth,lerp(this.y,next.y,this.coherence)+hheight);

        //transformedCircle(this.x,this.y,this.size);
    }
}

function transformedCircle(x,y,diameter) {
    circle(x+hwidth,y+hheight,diameter);
}


function drawParticles() {

    swarmVelocity *= 0.9;

    particles.forEach((p) => {
        let nx = p.startingX*Math.cos(swarmVelocity*0.01)-p.startingY*Math.sin(swarmVelocity*0.01);
        let ny = p.startingY*Math.cos(swarmVelocity*0.01)+p.startingX*Math.sin(swarmVelocity*0.01);

        p.startingX = nx;
        p.startingY = ny;

        p.draw();
    });
}

function initParticles() {
    for (let i = 0; i < 32; i++) {
        new particle((Math.random()-0.5)*400,(Math.random()-0.5)*400,Math.random()*30+5);
    }
}