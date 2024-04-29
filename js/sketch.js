

let myCanvas;
let bgdiv


function getWidth() {
    return 800//bgdiv.clientWidth;
}

function getHeight() {
    return 800//bgdiv.clientHeight;
}
// The statements in the setup() function
// execute once when the program begins
function setup() {

    bgdiv = document.getElementById("canvas")
    myCanvas = createCanvas(getWidth(), getHeight());

    myCanvas.parent("canvas");

    let dbutton = createButton('Default');
    dbutton.position(0, 0);
    dbutton.mousePressed(()=>{form = 0});
    let lbutton = createButton('Loading');
    lbutton.position(100, 0);
    lbutton.mousePressed(()=>{form = 1});
    let vbutton = createButton('VU Meter');
    vbutton.position(200, 0);
    vbutton.mousePressed(()=>{form = 2});
  
    // Call repaint() when the button is pressed.
    initParticles();
}


let time;

let hwidth,hheight;

let inputAudio;
/*function lerp(a,b,t) {
    return a+(b-a)*t;
}*/

function draw() {
    time = Date.now()/1000;

    hwidth = width/2;
    hheight = height/2;
    //if (myCanvas.width != getWidth() || myCanvas.height != getHeight) {
    //    myCanvas.resize(getWidth(), getHeight());
    //}
    background(0)
    
    inputAudio = pow(noise(time*3)*3,3)/8;

    drawParticles();

    
    
}
/*
function mouseClicked() {
    form = (form+1)%3;
}
*/