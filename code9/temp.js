var n = 10;
var img_sten;
var img_name;
var margin = 10;
var line = [];

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
  var stop = false;
  var i = 0;

  while (h < max_height) {
    while (w < width && !stop) {
      if (!is_pixel_white(w, h)) {
        x1 = w;
        stop = true;
      }
      w++;
    }
    stop = false;
    if (x1 != -1) {
      w--;
      while (w < width && !stop) {
        if (is_pixel_white(w, h) || w == width - 1) {
          x2 = w;
          stop = true;
        }
        w++;
      }
      // console.log(x1);
      // console.log(x2);
      // console.log(h);
      line[i] = new ob_line(x1, h, x2, h, 0);
      i++;
      console.log(i);
      // console.log(line.length);
    }
    x1 = -1;
    stop = false;
    if (w == width) {
      w = 0;
      h++;
    }
  }
}

// function setup() {
//   var black = color(0);
//   createCanvas(50, 1);
//   background(255);
//   for (var x = 0; x < width; x++) {
//     if(5 < x && x < 45) {
//       set(x, 0, black)
//     }
//   }
//   updatePixels();
//   parse_lines(1);
//   line[0].display();
// }

function display_lines() {
  var i = -1;
  console.log(line.length);
  while (++i < line.length) {
    console.log("mais montre");
    if (line[i] != 0){
      console.log("montre");
      line[i].display();
    }
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
  parse_lines(img_sten.height + margin);
  line[0].display();
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);
  display_lines();
}
