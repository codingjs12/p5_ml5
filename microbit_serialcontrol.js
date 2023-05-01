var modelUrl, video, flippedVideo, label, classifier;


modelUrl = "https://teachablemachine.withgoogle.com/models/NL7LjCK7G/";

let portName = 'COM6';
let serial;

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
    if (error) {
      console.error(error);
      return;
    }
    label = results[0].label;
    print("Result:", String(results[0].label))
    serial.write(String(results[0].label));
    classifyVideo();
}

function gotList(thelist) {
    console.log("List of Serial Ports:");
    for (let i = 0; i < thelist.length; i++) {
      console.log(i + " " + thelist[i]);
    }
}
function setup() {

  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifier = ml5.imageClassifier(modelUrl + 'model.json');

  classifyVideo();
}
function draw() {
  background(0);
  image(flippedVideo, 0, 0);
  textSize(16);
  fill(255);
  text("Result: " + label, width / 2, height - 4);

}
