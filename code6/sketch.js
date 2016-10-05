var boids;
var flow;
var n = 120;

function setup() {
  createCanvas(90, 160);
  boids = [];
  var i = 0;
  while (i <= n) {
    boids[i++] = new Boid(random() * width, random() * height, 1);
  }
  flow = new Flow();
  noStroke();
  //fill(0);
  //ellipse(width/2, height/2, width, height);
  background(0);
}

// steering = desired - velocity

function draw() {
  fill(0, 5);
  //ellipse(width/2, height/2, width, height);
  rect(0, 0, width, height);

  //var target = createVector(mouseX, mouseY);
  //boid.seek(target);
  var i = 0;
  while (i <= n) {
    boids[i].applyBehaviour(boids, flow);
    boids[i].update();
    fill(255);
    boids[i++].display();
  }
}
