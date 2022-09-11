// variables
let points = [];
let noiseScale = 0.1;
let zValue = 0;
let edge = 50;
let numPoints;

let shapeColor;


function setup() {
  createCanvas(800, 800);

  numPoints = 25;

  for (let i = 0 ; i < numPoints ; i++) {
    points.push(new Point(random(edge, width - edge), random(edge, height - edge)));
  }

  shapeColor = color("#fee440");
}

function draw() {
  background("black");

  for (let i = edge ; i < width - edge ; i += 0.5) {
    for (let j = edge ; j < height - edge ; j += 0.5) {
/*       colorMode(HSB, 100);
      let colorValue = color(map(getPixelValue(i, j), 0, 717, 0, 100) + rNoise(i,j), 50, 50);
*/

      if (getPixelValue(i,j) < 100 && parseInt(getPixelValue(i,j) + rNoise(i,j)) % 5 == 0) {
        fill(shapeColor);
        noStroke();
        circle(i, j, 1);
      }

      if (getPixelValue(i,j) > 100 && parseInt(getPixelValue(i,j) + rNoise(i,j)) % 3 == 0) {
        fill("#003049");
        noStroke();
        circle(i, j, 0.5);
      }

    }
  }
  save("frame.jpg");
  /* points.forEach(p => {
    p.draw();
  }); */
  zValue += 0.05;
  frameRate(0);
}

class Point {
  constructor (x, y) {
    this.setX(x)
    this.setY(y)
  }

  setX (x) {
    if (x > 0 && x < width) {
      this.x = x
    }
  }

  setY (y) {
    if (y > 0 && y < height) {
      this.y = y;
    }
  }

  getDistance (x, y) {
    let distX = this.x - x;
    let distY = this.y - y;
    return Math.sqrt((distX * distX) + (distY * distY));
  }

  draw () {
    fill("black");
    noStroke();
    circle(this.x, this.y, 20)
  }


}


const rNoise = (x, y) => {
  return parseInt(map(noise(x * noiseScale, y * noiseScale, zValue) * 0.4, 0, 1, -15, 15));
};

const getPixelValue = (x, y) => {
  let distance = 10000;
  points.forEach(p => {
    if (p.getDistance(x, y) < distance) {
      distance = p.getDistance(x, y);
    }
  });
  return distance;
};

