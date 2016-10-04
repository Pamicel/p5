var vehicle;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(200, 200);
  noStroke();
  background(0);
}

// steering = desired - velocity

function draw() {
  fill(0, 20);
  rect(0, 0, width, height);
  var target = createVector(mouseX, mouseY);
  vehicle.seek(target);
  vehicle.update();
  fill(255);
  vehicle.display();
}

function Vehicle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2;
  this.maxforce = 0.5;
  
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 100) {
      desired.setMag(map(d, 0, 100, 0, this.maxspeed));
    }
    else {
      desired.setMag(this.maxspeed);
    }
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  this.display = function() {
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}