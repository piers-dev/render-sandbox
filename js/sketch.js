

let myCanvas;
let bgdiv


function getWidth() {
    return bgdiv.clientWidth;
}

function getHeight() {
    return bgdiv.clientHeight;
}

const DEFAULT = 0;
const LOADING = 1; 
const VUMETER = 2;

function setState(state) {
	form = state;
}

function setInputLevel(level) {
	inputAudio = level;
}

function setOutputLevel(level) {
	outputAudio = level;
}


//setState(DEFAULT); //Switches to default state
//
//setState(LOADING); //Switches to loading state
//
//setState(VUMETER); //Switches to VU Meter state
//
//setInputLevel(0.5); //Sets input (microphone) level (0-1 range)
//
//setOutputLevel(0.5); //Sets output (AI voice) level (0-1 range)


function setup() {

    bgdiv = document.getElementById("canvas")
    myCanvas = createCanvas(getWidth(), getHeight());

    myCanvas.parent("canvas");

    //let dbutton = createButton('Default');
    //dbutton.position(0, 0);
    //dbutton.mousePressed(()=>{form = 0});
//
    //let lbutton = createButton('Loading');
    //lbutton.position(100, 0);
    //lbutton.mousePressed(()=>{form = 1});
//
    //let vbutton = createButton('VU Meter');
    //vbutton.position(200, 0);
    //vbutton.mousePressed(()=>{form = 2});
//
	//slider = createSlider(0, 1,0,0);
	//slider.position(10, 40);
	//slider.size(80);
  
    initParticles();

}


let time;


let hwidth,hheight,smin;

let inputAudio = 0;
let outputAudio = 0;

/*function lerp(a,b,t) {
    return a+(b-a)*t;
}*/

//function readMicrophone() {
//    navigator.mediaDevices.getUserMedia({
//        audio: true,
//        video: false
//      })
//        .then(function(stream) {
//          const audioContext = new AudioContext();
//          const analyser = audioContext.createAnalyser();
//          const microphone = audioContext.createMediaStreamSource(stream);
//          const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
//      
//          analyser.smoothingTimeConstant = 0.8;
//          analyser.fftSize = 1024;
//      
//          microphone.connect(analyser);
//          analyser.connect(scriptProcessor);
//          scriptProcessor.connect(audioContext.destination);
//          scriptProcessor.onaudioprocess = function() {
//            const array = new Uint8Array(analyser.frequencyBinCount);
//            analyser.getByteFrequencyData(array);
//            const arraySum = array.reduce((a, value) => a + value, 0);
//            let average = arraySum / array.length;
//
//            average = Math.max(average-15,0)*1.17;
//            let v = bias(average/100,0.75)*1.5;
//
//            if (!isNaN(v)) inputAudio = v;
//            // colorPids(average);
//          };
//        })
//        .catch(function(err) {
//          /* handle the error */
//          console.error(err);
//        });
//
//    
//}




function draw() {
    time = Date.now()/1000;

		//inputAudio = slider.value();
    

    if (width != getWidth() || height != getHeight) {
        resizeCanvas(getWidth(), getHeight());
		
		
    }
    clear()
    hwidth = width/2;
    hheight = height/2;
	smin = Math.min(width,height);


    drawParticles();

    
    
}