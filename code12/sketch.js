var veh;
var theta = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  veh = [];
  for (var i = 0; i < 4; i++) {
    veh[i] = new Vehicle(i * width / 40 + width / 4, 150, 10);
  }
  fill(255);
}

function ft_display( object ) {
  ellipse(object.pos.x, object.pos.y, object.mass);
}

function draw() {
  background(0);
  noStroke();
  i = - 1;
  while (++i < veh.length) {
    if (i == 0) {
      var prev_y = veh[i].pos.y;
      veh[i].pos.y += Math.sin(theta + i) * 0.2;
      veh[i].vel.y = veh[i].pos.y - prev_y;
    }
    //veh[i].spring(veh[i].anker, 1, 10);
    veh[i].cohesion(veh);
    veh[i].update();
    ft_display(veh[i]);
  }
  theta += random() * 0.05 + 0.05;
}

function mouseClicked() {
  noLoop();
}
