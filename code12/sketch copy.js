var one;
var two;
var three;

function setup() {
  createCanvas(600, 300);
  one = new Vehicle(200, 150, 30);
  two = new Vehicle(300, 150, 30);
  three = new Vehicle(400, 150, 30);
}

function ft_display( object ) {
  ellipse(object.pos.x, object.pos.y, object.mass);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  ft_display(one);
  ft_display(two);
  ft_display(three);
  one.applyBehaviour(one.anker, two.pos, one.anker);
  two.applyBehaviour(one.pos, three.pos, two.anker);
  three.applyBehaviour(two.pos, three.anker, three.anker);
  one.update();
  two.update();
  three.update();
}

function mouseClicked() {
  noLoop();
}
