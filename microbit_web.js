var modelUrl, video, flippedVideo, label, classifier;

port = new p5.WebSerial();
modelUrl = "https://teachablemachine.withgoogle.com/models/NL7LjCK7G/";

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
    port.write(String(results[0].label));
    classifyVideo();
}

function gotList(thelist) {
    console.log("List of Serial Ports:");
    for (let i = 0; i < thelist.length; i++) {
      console.log(i + " " + thelist[i]);
    }
}
function setup() {

port.getPorts();
  port.on('noport', () => {
    let portButton = createButton('포트선택');
    portButton.mousePressed(() => {
      port.requestPort();
    });
  });
  port.on('portavailable', () => {
    port.open().then(() => {
      console.log('[포트 오픈]');
    });
  });
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
