

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

    readMicrophone();
}


let time;


let hwidth,hheight;

let inputAudio;
/*function lerp(a,b,t) {
    return a+(b-a)*t;
}*/

function readMicrophone() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
        .then(function(stream) {
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
      
          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
      
          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(audioContext.destination);
          scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            let average = arraySum / array.length;

            average = Math.max(average-15,0)*1.17;
            let v = bias(average/100,0.75)*1.5;

            if (!isNaN(v)) inputAudio = v;
            // colorPids(average);
          };
        })
        .catch(function(err) {
          /* handle the error */
          console.error(err);
        });

    
}




function draw() {







    time = Date.now()/1000;

    hwidth = width/2;
    hheight = height/2;
    //if (myCanvas.width != getWidth() || myCanvas.height != getHeight) {
    //    myCanvas.resize(getWidth(), getHeight());
    //}
    clear()
    

    drawParticles();

    
    
}
/*
function mouseClicked() {
    form = (form+1)%3;
}
*/