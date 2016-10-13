var off = 0;

function setup() {
  createCanvas(1200, 800);
  loadPixels();
}

function create_flow(off) {
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      set(x, y, 255 * noise(x * 0.05 + off, y * 0.05 + off));
    }
  }
  updatePixels();
}

function draw() {
  background(0);
  create_flow(off);
  off ++;
}
