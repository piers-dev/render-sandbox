let particles = new Array();



let ribbonLength = 0;

let swarmVelocity = 0;

let swarmPosition = 0;

class particleTarget {
    constructor(x, y, size, lineWeight, coherence, snappiness, damping) {
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
    let fac = (3.14159 / particles.length) * index;
    ribbonLength = particles.length;
    swarmVelocity = -15;
    swarmPosition = (stateTime * 5 - 1)
    return new particleTarget(Math.sin(fac + stateTime * 5) * 150, Math.cos(fac + stateTime * 5) * 150, 20, 0, 1, 0.2, 0.5);

}

function VUFormation(index) {
    let row = Math.floor(index / (particles.length / 4));

    let strength = (index % (particles.length / 4)) - (particles.length / 8);

    if (Math.abs(row - 1.5) > 1) strength *= 0.4;

    ribbonLength = particles.length / 4;

    return new particleTarget((row - 1.5) * 75, strength * 10 * inputAudio, 30, 0, 1, 0.2+Math.max(Math.min(stateTime-0.5,0.7),0), 0.6);
}

/*function lineFormation(index) {
    return new particleTarget(index*30,0);
}*/

function defaultFormation(index) {


    let sx = particles[index].startingX;
    let sy = particles[index].startingY;

    let nx = sx * Math.cos(swarmPosition) - sy * Math.sin(swarmPosition);
    let ny = sy * Math.cos(swarmPosition) + sx * Math.sin(swarmPosition); //Optimise this ew


    let x = nx;
    let rx = particles[index].randX*2;

    let y = ny;
    let ry = particles[index].randY*2;


    x += (noise(rx, ry + time * 0.05) - 0.5) * 200;


    y += (noise(rx + time * 0.05, ry + time * 0.1) - 0.5) * 200;

    ribbonLength = particles.length;


    let size =particles[index].startingSize;

    let nsize = 1-(size / 41);


    return new particleTarget(x*(1+(outputAudio/5)*nsize), y*(1+(outputAudio/5)/nsize), size*(1+outputAudio/2), (1+outputAudio*3), 0, 0.03*(1+outputAudio*2), 0.8);
}


let form = 0;
let lastForm = 0;


function formation(index, state) {
    switch (state) {
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
    constructor(x, y, size) {
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

        this.state = 0;




        this.size = size;
        this.startingSize = size;

        this.index = particles.length;
        particles.push(this);
    }

    draw() {
        fill('white');

        let target = formation(this.index, this.state);

        this.xvel += (target.x - this.x) * (target.snappiness);
        this.yvel += (target.y - this.y) * (target.snappiness);

        this.xvel *= target.damping
        this.yvel *= target.damping


        //this.x = lerp(this.x,target.x,0.03);
        //this.y = lerp(this.y,target.y,0.03);
        this.lineWeight = Math.max(lerp(this.lineWeight, target.lineWeight, 0.2), 0);
        this.size = lerp(this.size, target.size, 0.05);
        this.coherence = lerp(this.coherence, target.coherence, target.coherence > this.coherence ? 0.05 : 0.6);


        this.x += this.xvel * 0.5;
        this.y += this.yvel * 0.5;


        if (this.lineWeight > 0.01) {
            particles.forEach((p) => {
                ribbonLength != 0
                if ((p.index > this.index)) {
                    let dst = Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));

                    stroke(color(255,255,255,128))

                    scaledStrokeWeight((Math.max(1 - (dst / 100), 0) * 2) * this.lineWeight);
                    transformedLine(this.x, this.y, p.x, p.y);
                }
            })
        }

        stroke('white');


        scaledStrokeWeight(this.size);
        let next = this;
        if (particles.length != this.index + 1) {
            next = particles[this.index + 1];
            if ((next.index % ribbonLength < this.index % ribbonLength) && (ribbonLength != 0)) this.coherence = 0;
        }



        transformedLine(this.x, this.y, lerp(this.x, next.x, this.coherence), lerp(this.y, next.y, this.coherence));

        //transformedCircle(this.x,this.y,this.size);
    }
}

function transformedCircle(x, y, diameter) {
    circle((x/800)*smin + hwidth, (y/800)*smin + hheight, diameter);
}

function scaledStrokeWeight(weight) {
    strokeWeight((weight/800)*smin)
}

function transformedLine(x1,y1,x2,y2) {
    line((x1/800)*smin+hwidth, (y1/800)*smin+hheight, (x2/800)*smin + hwidth, (y2/800)*smin + hheight);
}

let stateTime;
let stateChangeTime;


function drawParticles() {

    if (form != lastForm) {
        stateChangeTime = time;
        //if (form == 0) swarmPosition = 0;
    }

    stateTime = time - stateChangeTime;
    lastForm = form;
    

    swarmVelocity *= 0.9;

    swarmPosition += swarmVelocity*0.01;

    particles[particles.length - 1].state = form;

    let propagationSpeed = 5;

    switch (form) {
        case 0:
            propagationSpeed = 8;
            break;
        case 1:
            propagationSpeed = 4;
            break;
        case 2:
            propagationSpeed = 20;
            break;
    }


    for (let j = 0; j < propagationSpeed; j++) {
        for (let i = 0; i < particles.length - 1; i++) {//propagate states
            particles[i].state = particles[i + 1].state;
        }
    }

    particles.forEach((p) => {

        //let nx = p.startingX*Math.cos(swarmVelocity*0.01)-p.startingY*Math.sin(swarmVelocity*0.01);
        //let ny = p.startingY*Math.cos(swarmVelocity*0.01)+p.startingX*Math.sin(swarmVelocity*0.01);

        //p.startingX = nx;
        //p.startingY = ny;
        p.draw();
    });

}


function bias(x, b) {
    b = -Math.log2(1 - b);
    return 1 - Math.pow(1 - Math.pow(x, 1/b), b);
}

function initParticles() {
    for (let i = 0; i < 64; i++) {
        let theta = ((Math.PI * 4) / 32) * i + Math.PI*0.75;
        let x = Math.cos(theta) * 150
        let y = Math.sin(theta) * 150

       x += (Math.random()-0.5)*100;
       y += (Math.random()-0.5)*100;


        new particle(x, y, pow(bias(Math.random(),0.3)*10+2,1.5));
    }
}