function Boid(x, y, dia) {
  var coh_fac = 0.1;//0.5;
  var sep_fac = 0.1;//1;
  var flo_fac = - 0.1;//1;
  var ali_fac = 0.1;//1;
  var boid_personal_space = dia * 3;

  this.pos = createVector(x, y);
  this.init_pos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.dia = dia;
  this.maxspeed = 1 + random() * 0.1;
  this.maxforce = 1;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.friction = function() {
    this.applyForce(p5.Vector.mult(this.vel, -0.08));
  }

  this.gravity = function(intensity) {
    this.applyForce(createVector(0, intensity));
  }

  this.calculate_steering = function(desired) {
    var steering = p5.Vector.sub(desired, this.vel);
    return (steering);
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

  this.applyBehaviour = function(boids, flow) {
    this.wrap();
    var steering = this.follow(flow).mult(flo_fac);
    steering.add(this.align(boids).mult(ali_fac));
    steering.add(this.seperate(boids).mult(sep_fac));
    steering.add(this.cohesion(boids).mult(coh_fac))
    steering.limit(this.maxforce);
    this.applyForce(steering);
  }

  this.follow_this = function(i) {
    var desired = flow.get(i);
    desired.setMag(this.maxspeed);
    return (this.calculate_steering(desired));
  }

  this.follow = function(flow) {
    //this.wrap();
    var desired = flow.get(this.pos.x, this.pos.y);
    desired.setMag(this.maxspeed);
    return (this.calculate_steering(desired));
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
    return (this.calculate_steering(desired));
  }

  this.align = function(boids) {
    var desired = createVector(0, 0);
    var neighbourhood = this.dia * boid_personal_space;
    var count = 0;
    var d;

    for (var i = 0; i < boids.length; i++) {
      d = p5.Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < neighbourhood) {
        desired.add(boids[i].vel);
        count++;
      }
    }
    if (count) {
      desired.div(count);
      desired.limit(this.maxspeed);
      return (this.calculate_steering(desired));
    }
    else {
      return (desired);
    }
  }

  this.seperate = function(boids) {
    var desired = createVector(0, 0);
    var neighbourhood = this.dia * boid_personal_space;
    var count = 0;
    var d;

    for (var i = 0; i < boids.length; i++) {
      d = p5.Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < neighbourhood) {
        var diff = p5.Vector.sub(this.pos, boids[i].pos);
        diff.normalize();
        diff.div(d);
        desired.add(diff);
        count++;
      }
    }
    if (count) {
      desired.div(count).limit(this.maxspeed);
      return (this.calculate_steering(desired));
    }
    else {
      return (desired);
    }
  }

  this.cohesion = function(boids) {
    var desired = createVector(0, 0);
    var neighbourhood = this.dia * boid_personal_space;
    var count = 0;
    var d;

    for (var i = 0; i < boids.length; i++) {
      d = p5.Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < neighbourhood) {
        desired.add(boids[i].pos);
        count++;
      }
    }
    if (count) {
      desired.div(count);
      return (this.seek(desired));
    }
    else {
      return (desired);
    }
  }



this.spring = function(anker, spring_l, spring_k) {
  var f = p5.Vector.sub(anker, this.pos);
  var dist = f.mag();
  this.applyForce(f.setMag(0.01 * spring_k * (dist - spring_l)));
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
