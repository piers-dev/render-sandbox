

let myCanvas;
let bgdiv


function getWidth() {
    return bgdiv.clientWidth;
}

function getHeight() {
    return bgdiv.clientHeight;
}
// The statements in the setup() function
// execute once when the program begins
function setup() {

    bgdiv = document.getElementById("canvas")
    myCanvas = createCanvas(getWidth(), getHeight());

    myCanvas.parent("canvas");

}


let time;


function lerp(a,b,t) {
    return a+(b-a)*t;
}

function draw() {
    time = Date.now()/1000;
    //if (myCanvas.width != getWidth() || myCanvas.height != getHeight) {
    //    myCanvas.resize(getWidth(), getHeight());
    //}
    background(0)
    fill(200);

    let dark = color('#8c26ad');
    let light = color('#ffb41f');
    circle(mouseX,mouseY,5)

    for (let i = 0; i < (myCanvas.width)/16; i++) {
        let x = i*16;
        for (let j = 0; j < (myCanvas.height)/16; j++) {
            let y = j*16;
            //circle(x,y,8);

            //circle(x+sin(x+time*2)*5,y,8)
            strokeWeight(5)//max(2-sqrt(pow(x-mouseX,2)+pow(y-mouseY,2))/100,0)*3);

            let d = sqrt(pow(x-mouseX,2)+pow(y-mouseY,2));

            d = max(1-d/200,0)
            stroke(lerpColor(dark, light, d));

            strokeWeight(d*12+2)

            nx = (noise(0.01*x+time*0.3,0.01*y+time*0.3)-0.5)*50;

            ny = (noise(0.01*y-time*0.3,0.01*x+time*0.3)-0.5)*50;

            //d += noise(0.005*x+0.1*time,0.005*y-0.2*time)*0.1;

            line(x+nx,y+ny,lerp(x+nx,mouseX,0.3*d),lerp(y+ny,mouseY,0.3*d));
        }
    }

    /*
    if (myCanvas.width != getWidth() || myCanvas.height != getHeight) {
        myCanvas.resize(getWidth(), getHeight());
    }


    background(50);

    noStroke();

    rect(mouseX,mouseY,50)

    console.log("still drawin'");*/
}
