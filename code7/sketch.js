var boids;
var flow;
var n = 10;
var img_sten;
var img_name;

function preload() {
  img_sten = loadImage("libraries/stencil.png");
  img_name = loadImage("libraries/name_pixel.png");
}

function setup() {
  createCanvas(90, 160 + img_name.height);
  boids = [];
  var i = 0;
  while (i <= n) {
    boids[i++] = new Boid(random() * width, random() * height, 1);
  }
  noiseSeed(0);
  flow = new Flow();
  noStroke();
  //fill(0);
  //ellipse(width/2, height/2, width, height);
  background(100);
  image(img_name, 0, 160);
}

function draw() {
  // if (mouseX < width - 30   &&
  //     mouseX > 30           &&
  //     mouseY < height - 60  &&
  //     mouseY > 60) {
  //       flow.new();
  //     }
  fill(0, 5);
  rect(0, 0, width, height - img_name.height);
  // background(0);
  var i = 0;
  while (i <= n) {
    boids[i].applyBehaviour(boids, flow);
    boids[i].update();
    fill(100);
    boids[i++].display();
  }
  image(img_name, 0, 160);
  image(img_sten, 0, 0);
}

function mousePressed() {
  flow.new();
}
