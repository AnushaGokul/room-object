
img = "";
status = "";
objects = [];
function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectdetector = ml5.objectDetector("cocossd", modelloaded);
  document.getElementById("status").innerHTML = "status: detecting objects";
}
function preload() {
  img = loadImage("study table.jpg");
}
function draw() {
  image(img, 0, 0, 640, 420);
  if (status != "") {
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "status: Object detected";

      fill("#ff0000");
      percent = floor(objects[i].confidence * 100);
      text(
        objects[i].label + "" + percent + "%",
        objects[i].x + 10,
        objects[i].y + 20
      );
      noFill();
      stroke("#ff0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
function modelloaded() {
  console.log("Model loaded");
  status = true;
  objectdetector.detect(img, gotresult);
}
function gotresult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}
