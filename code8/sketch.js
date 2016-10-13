var boids;
var flow;
var n = 10;
var img_sten;
var img_name;
var margin = 10;

function border() {
  push();
  translate(margin / 2, margin / 2);
  noFill();
  stroke(255);
  strokeWeight(margin);
  rect(0, 0, width - margin, height - margin);
  pop();
}

function preload() {
  img_sten = loadImage("libraries/new_stencil.png");
  img_name = loadImage("libraries/name_pixel_paris.png");
}

function setup() {
  createCanvas(90 + (2 * margin), 160 + img_name.height + (2 * margin));
  boids = [];
  var i = 0;
  while (i <= n) {
    boids[i++] = new Boid(random() * width, random() * height, 1);
  }
  noiseSeed(0);
  flow = new Flow();
  noStroke();
  background(100);
//  image(img_name, 0, 160);
}

function draw() {
  var i = 0;
  while (i <= n) {
    boids[i].applyBehaviour(boids, flow);
    boids[i].update();
    fill(100);
    boids[i++].display();
  }
  push();
  translate(margin, margin);
  // if (mouseX < width - 30   &&
  //     mouseX > 30           &&
  //     mouseY < height - 60  &&
  //     mouseY > 60) {
  //       flow.new();
  //     }
  fill(0, 5);
  rect(0, 0, width - margin, height - img_name.height - margin);
  image(img_name, 0, 160);
  image(img_sten, 0, 0);
  pop();
  border();
}

function mousePressed() {
  flow.new();
}
