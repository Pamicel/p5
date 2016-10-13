var flow;
var boids;
var n = 10;
var margin = 10;
var img_sten;
var img_name = [];
var boi_name = [];

function display_name(boids) {
  for (var i = 0; i < img_name.length; i++) {
    push();
    translate(boids[i].pos.x, boids[i].pos.y);
    //console.log(boids[i].pos.x);
    //console.log(boids[i].pos.y);
    fill(color(255, 0, 0));
    rect(0, 0, img_name[i].width, img_name[i].height);
    //image(img_name[i], 0, 0);
    pop();
  }
}

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
  //img_name = loadImage("libraries/name_pixel_paris.png");
  var i = -1;
  while (++i < 10) {
    img_name[i] = loadImage("libraries/images/name_pixel_paris_" + (i < 9 ? "0" : "") + str(i + 1) + ".gif");
  }
}

function setup() {
  createCanvas(90 + (2 * margin), 160 + 2 * img_name[0].height + (2 * margin));
  noStroke();
  background(100);
  noiseSeed(0);
  flow = new Flow();

  boids = [];
  var i = 0;
  while (i <= n) {
    var y = random() * height;
    boids[i++] = new Boid(random() * width, y, 1);
  }
  i = -1;
  while (++i < 10) {
    var x = ((width - (2 * margin)) / 5) * (i < 5 ? i : (i - 5));
    var y = img_sten.height + (i < 5 ? 0 : img_name[0].height);
    boi_name[i] = new Boid(x, y, 0);
  }
}

function draw() {

  var i = 0;
  while (i <= n) {
    boids[i].applyBehaviour(boids, flow);
    boids[i].update();
    fill(100);
    boids[i++].display();
  }

  var off;
  push();
  translate(margin, margin);
  fill(0, 5);
  rect(0, 0, width - 2 * margin, height - 2 * img_name[0].height - margin * 2);
  image(img_sten, 0, 0);
  translate(0, img_sten.height);
  //image(img_name, 0, 0);
  display_name(boi_name);
  pop();
  border();
}

function mousePressed() {
  flow.new();
}
