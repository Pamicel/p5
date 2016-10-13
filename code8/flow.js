function Flow() {

  this.flow = [];
  var space = 10;

  this.make = function() {
    for (var x = 0; x <= width/space; x++) {
      this.flow[x] = [];
      for (var y = 0; y <= height/space; y++){
        theta = map(noise(x * space / 100, y * space / 100), 0, 1, 0, TWO_PI);
        this.flow[x][y] = p5.Vector.fromAngle(theta);
      }
    }
  }

  this.make();

  this.get = function(x, y) {
    return(this.flow[int(x/space)][int(y/space)]);
  }

  this.new = function() {
    var seed = int(random() * 1000);
    noiseSeed(seed);
    console.log(seed);
    this.make();
  }
}
