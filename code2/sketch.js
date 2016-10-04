var vehicle;
var flow;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(200, 200);
  flow = new Flow();
  noStroke();
  background(0);
}

// steering = desired - velocity

function draw() {
  fill(0, 20);
  rect(0, 0, width, height);
  
  //var target = createVector(mouseX, mouseY);
  //vehicle.seek(target);
  
  vehicle.follow(flow);
  vehicle.update();
  fill(255);
  vehicle.display();
}