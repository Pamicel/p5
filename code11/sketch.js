var veh;

function setup() {
  createCanvas(windowWidth, windowHeight);
  veh = [];
  for (var i = 0; i <= 20; i++) {
    veh[i] = new Vehicle((i * width / 40) + 10, - (i * height / 40) + width / 3, 1);
  }
  background(0);
}

function ft_display( object ) {
  ellipse(object.pos.x, object.pos.y, object.mass);
}

function draw() {
  noStroke();
  push()
  translate(150, 80);
  for(var i = 0; i < veh.length; i++) {
    ft_display(veh[i]);
    if (i == 0) {
      veh[i].applyBehaviour(veh[i + 1].pos, 0, veh[i].anker);
    }
    else if (i == veh.length - 1) {
      veh[i].applyBehaviour(0, veh[i - 1].pos, veh[i].anker);
    }
    else {
      veh[i].applyBehaviour(veh[i + 1].pos, veh[i - 1].pos, 0);
    }
    fill(color(veh[i].vel.x * 100 % 255, veh[i].vel.y * 100 % 255, veh[i].vel.mag() * 100 % 255));
    ft_display(veh[i]);
    veh[i].update();
  }
  pop()
}

function mouseClicked() {
  noLoop();
}
