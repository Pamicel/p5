function Vehicle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 0.5 + random() * 0.5;
  this.maxforce = 0.01;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.wrap = function() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  this.follow = function(flow) {
    this.wrap();
    var desired = flow.get(this.pos.x, this.pos.y);
    desired.setMag(this.maxspeed);
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);
    //this.applyForce(flow.get(this.pos.x, this.pos.y));
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
    ellipse(this.pos.x, this.pos.y, 2);
  }
}
