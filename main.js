function setup(){
canvas = createCanvas(300, 300);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function preload(){
classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
strokeWeight(10);
stroke(0);
if(mouseIsPressed){
line(pmouseX, pmouseY, mouseX, mouseY);
}
}

function classifyCanvas(){
classifier.classify(canvas, gotResults);    
}

function gotResults(error, results){
if(error){
console.log(error);
}
console.log(results);
document.getElementById("sketch-label").innerHTML = "Label: " + results[0].label;
document.getElementById("sketch-confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}

function clearCanvas(){
background("white");
}