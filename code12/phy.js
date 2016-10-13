function Vehicle(x, y, m) {
  this.pos = createVector(x, y);
  this.anker = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  var maxSpeed = 6;
  var maxForce = 0.4;
  var personnal_space = 100;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.friction = function() {
    this.applyForce(p5.Vector.mult(this.vel, -0.08));
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.applyBehaviour = function(others, anker) {
    // var g = createVector(0, this.mass);
    // var f = g;
    var f = createVector(0, 0);
    i = 0;
    while(i < others.length) {
      f.add(this.spring(others[i++].pos, 1, 0.1));
    }
    if (anker) {
      f.add(this.spring(anker, 1, 10));
    }
    this.applyForce(f.limit(maxForce));
    //this.friction();
  }

  this.calculate_steering = function(desired) {
    var steering = p5.Vector.sub(desired, this.vel);
    return (steering);
  }

  function printVector(vector, point, color) {
    stroke(color);
    strokeWeight(2);
    line(point.x, point.y, vector.x, vector.y);
    noStroke();
  }

  this.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < personnal_space) {
      desired.setMag(map(d, 0, personnal_space, 0, maxSpeed));
    }
    else {
      desired.setMag(maxSpeed);
    }
    return (this.calculate_steering(desired));
  }

  this.cohesion = function(vehicles) {
    var desired = createVector(0, 0);
    for(var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].pos.dist(this.pos) < personnal_space) {
        desired.add(vehicles[i].vel);
      }
    }
    desired.limit(maxSpeed);
    return (this.calculate_steering(desired));
  }

  this.spring = function(point, spring_l, spring_k) {
    var f = p5.Vector.sub(point, this.pos);
    var dist = f.mag();
    this.applyForce(f.setMag(0.01 * spring_k * (dist - spring_l)));
  }


}
