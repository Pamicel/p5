var vehicles;
var flow;
var n = 120;

function setup() {
  createCanvas(90, 160);
  vehicles = [];
  var i = 0;
  while (i <= n) {
    vehicles[i++] = new Vehicle(random() * width, random() * height);
  }
  flow = new Flow();
  noStroke();
  fill(0);
  ellipse(width/2, height/2, width, height);
  //background(0);
}

// steering = desired - velocity

function draw() {
  fill(0, 20);
  //ellipse(width/2, height/2, width, height);
  rect(0, 0, width, height);

  //var target = createVector(mouseX, mouseY);
  //vehicle.seek(target);
  var i = 0;
  while (i <= n) {
    vehicles[i].follow(flow);
    vehicles[i].update();
    fill(255);
    vehicles[i++].display();
  }
}
