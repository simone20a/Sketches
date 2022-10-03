/* imports */

/* global variables */
let numStars = 2000;
let numCirclesPerStep = 300;
let noiseStartBound = 83;
let noiseScale = 0.0045;
let z1 = 1;
let circlesColor;

function setup() {
  createCanvas(600, 1056);
  circlesColor = 201;//map(random(), 0, 1, 1, 35);
}

function draw() {
  /* if (frameCount == 1) {
    capturer.start();
  } */
  background("#2F3E46");
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color("white");
/*   for (let i = 0 ; i < numStars ; i++) {
    fill("white");
    noStroke();
    circle(random() * width, random() * height, map(random(), 0, 1, 1, 4));
  } */
  drawingContext.shadowBlur = 0;

  console.log(drawLayers(noiseStartBound, circlesColor, z1)); 
  z1 += 0.05;
  //frameRate(0);
  /* if (frameCount === 140) {
    capturer.save();
    capturer.stop();
  } else {
    capturer.capture(document.getElementById('defaultCanvas0'));
  } */
  save("Sketch2.jpg");
  frameRate(0);
}



const drawLayers = (noiseBound, randomColor, z) => {
  let currentX;
  let currentY;
  let currentNoise;
  let circleColor;

  if (noiseBound < 1) {
    return "finish";
  }

  for (let i = 0 ; i < numCirclesPerStep ; i++) {
    currentX = random() * width;
    currentY = random() * height;
    currentNoise = map(noise(currentX * noiseScale, currentY * noiseScale, z) * 1.28, 0, 1, 0, 100);
    if (currentNoise < noiseBound) {
      colorMode(HSB, 100);
      circleColor = color(randomColor, map(noiseBound, 1, noiseStartBound, -20, 80), 125 - map(noiseBound, 1, noiseStartBound, 0, 60));
      /* console.log("alpha: " + (255 - map(noiseBound, 0, 60, 0, 254)) + ", circle dimension : " + map(noiseBound, 0, 60, 3, 200) + ", color: " + ( (16777215).toString(16) )); */
      circleColor.setAlpha(255 - map(noiseBound, 0, noiseStartBound, 250, 254.9));
      fill(circleColor);
      strokeWeight(15);
      stroke("rgba(0,0,0,0.00185)");
      circle(currentX, currentY, map(noiseBound, 0, noiseStartBound, 2, 95));
    }
  }

  return drawLayers(noiseBound / 1.005, randomColor, z);
};
