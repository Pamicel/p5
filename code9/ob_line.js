
function ob_line(x1, y1, x2, y2, off) {
  this.a    = createVector(x1, y1);
  this.b    = createVector(x2, y2);
  this.off  = off;
  this.amp  = 1;
  console.log("cree");

  this.display = function() {
    push();
    translate(0, this.amp * Math.sin(off));
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    pop();
  }

  this.update = function(theta) {
    this.off += theta;
  }

  this.set_amp = function(amp) {
    this.amp = amp;
  }

  this.reset_to = function(off) {
    this.off = off;
  }

}
