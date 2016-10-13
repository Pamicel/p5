var flow;
var boids;
var n = 10;
var margin = 10;
var img_sten;
var sten_height = 160;

var img_name = [];
var boi_name = [];

var sten_dir = "libraries/new_stencil.png";
var name_dir = "libraries/images/name_pixel_paris_"


function display_name(images, boids) {
  for (var i = 0; i < images.length; i++) {
    push();
    translate(boids[i].pos.x, boids[i].pos.y);
    image(images[i], 0, 0);
    pop();
  }
}

function animate_name(boids, flag) {
  for (var i = 0; i < boids.length; i++) {
    //var diff = createVector(0, -10);
    //var steering = boids[i].seek(p5.Vector.sub(boids[i].anker, diff));
    //steering.add(boids[i].seperate(boids));
    //boids[i].applySteering(steering);
    boids[i].friction();
    boids[i].update();
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
  img_sten = (sten_dir ? loadImage(sten_dir) : 0);
  //img_name = loadImage("libraries/name_pixel_paris.png");
  var i = -1;
  while (++i < 10) {
    img_name[i] = loadImage(name_dir + (i < 9 ? "0" : "") + str(i + 1) + ".gif");
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
    var y = sten_height + (i < 5 ? 0 : img_name[0].height);
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
  if (img_sten) {image(img_sten, 0, 0);}
  fill(255);
  rect(0, sten_height, width - 2 * margin, img_name[0].height * 2);
  display_name(img_name, boi_name);
  animate_name(boi_name);
  pop();
  border();
}

function mousePressed() {
  flow.new();
}
