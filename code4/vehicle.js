var coh_fac = 0.2;//0.5;
var sep_fac = 0.2;//1;
var flo_fac = 0;//1;
var ali_fac = 1;//1;


function Vehicle(x, y, dia) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.dia = dia;
  this.maxspeed = 1;// + random() * 0.5;
  this.maxforce = 0.1;

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

  this.applyBehaviour = function(vehicles, flow) {
    var steering = this.follow(flow).mult(flo_fac);
    steering.add(this.align(vehicles).mult(ali_fac));
    steering.add(this.seperate(vehicles).mult(sep_fac));
    steering.add(this.cohesion(vehicles).mult(coh_fac))
    steering.limit(this.maxforce);
    this.applyForce(steering);
  }

  this.follow = function(flow) {
    this.wrap();
    var desired = flow.get(this.pos.x, this.pos.y);
    desired.setMag(this.maxspeed);
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    return (steering);
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
    return (steering);
  }

  this.align = function(vehicles) {
    var desired = createVector(0, 0);
    var neighbourhood = this.dia * 10;
    var count = 0;
    var d;

    for (var i = 0; i < vehicles.length; i++) {
      d = p5.Vector.dist(this.pos, vehicles[i].pos);
      if (d > 0 && d < neighbourhood) {
        desired.add(vehicles[i].vel);
        count++;
      }
    }
    if (count) {
      desired.div(count);
      desired.limit(this.maxspeed);
      var steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxforce);
      return (steering);
    }
    else {
      return (desired);
    }
  }

  this.seperate = function(vehicles) {
    var sum = createVector(0, 0);
    var neighbourhood = this.dia * 5;
    var count = 0;
    var d;

    for (var i = 0; i < vehicles.length; i++) {
      d = p5.Vector.dist(this.pos, vehicles[i].pos);
      if (d > 0 && d < neighbourhood) {
        var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count) {
      sum.div(count).limit(this.maxspeed);
      return (p5.Vector.sub(sum, this.vel).limit(this.maxforce));
    }
    else {
      return (sum);
    }
  }

  this.cohesion = function(vehicles) {
    var sum = createVector(0, 0);
    var neighbourhood = this.dia * 10;
    var count = 0;
    var d;

    for (var i = 0; i < vehicles.length; i++) {
      d = p5.Vector.dist(this.pos, vehicles[i].pos);
      if (d > 0 && d < neighbourhood) {
        sum.add(vehicles[i].pos);
        count++;
      }
    }
    if (count) {
      sum.div(count);
      return (this.seek(sum));
    }
    else {
      return (sum);
    }
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    ellipse(this.pos.x, this.pos.y, this.dia);
  }
}
