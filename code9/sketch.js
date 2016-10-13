var img_sten;
var img_name;
var margin = 10;
var line = [];
var line_length;
var color_seed = 0;


function border() {
  push();
  translate(margin / 2, margin / 2);
  noFill();
  stroke(255);
  strokeWeight(margin);
  rect(0, 0, width - margin, height - margin);
  pop();
}


function is_pixel_white(x, y) {
  var col = get(x, y);
  return (col[0] == 255 &&
          col[1] == 255 &&
          col[2] == 255 &&
          col[3] == 255);
}

function parse_lines(max_height) {
  var h   = 0;
  var w   = 0;
  var x1  = -1;
  var x2  = 0;
  var flag = true;
  var i = 0;

  while (h < max_height) {
    while (w < width && flag) {
      if (!is_pixel_white(w, h)) { x1 = w; flag = false; }
      w++;
    }
    flag = true;
    if (x1 != -1) {
      w--;
      while (w < width && flag) {
        if (is_pixel_white(w, h) || w == width - 1) { x2 = w; flag = false; }
        w++;
      }
      line[i++] = new ob_line(x1, h, x2, h, 0);
    }
    if (flag) { w = 0; h++; }
    flag = true;
    x1 = -1;
  }
  return (i);
}

function display_lines(length, seed) {
  var i = -1;
  var color = 0;
  while (++i < length) {
    stroke((color + seed) % 255);
    color = (color + 1) % 255;
    line[i].display();
  }
}

//function update_lines(theta) {

//}

function preload() {
  img_sten = loadImage("libraries/new_stencil.png");
  img_name = loadImage("libraries/name_pixel_paris.png");
}

function setup() {
  createCanvas(90 + (2 * margin), img_sten.height + img_name.height + (2 * margin));
  noStroke();
  background(100);
//  image(img_name, 0, 160);
  push();
  translate(margin, margin);
  fill(0);
  rect(0, 0, width - margin, height - img_name.height - margin);
  image(img_name, 0, 160);
  image(img_sten, 0, 0);
  pop();
  border();
  line_length = parse_lines(img_sten.height + margin);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);
  display_lines(line_length, color_seed);
  color_seed = (color_seed + 1) % line_length;
  console.log(color_seed);
}
