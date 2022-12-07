let balls = [];
let angle = 0;
let NUM_OF_BALLS = 10;
let colors = [
  "Aquamarine",
  "Coral",
  "Indigo",
  "MistyRose",
  "Aqua",
  "BlueViolet",
  "Crimson",
  "DarkMargenta",
  "DarkOrchid",
  "DarkSlateBlue",
  "DarkTurquoise",
  "DeepPink",
  "DeepSkyBlue",
  "GoldenRod",
  "LavenderBlush",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "Lime",
  "MediumBlue",
  "MediumVioletRed",
  "MediumTurquoise",
  "OrangeRed",
  "Orchid",
  "SpringGreen",
  "Teal",
  "Sienna",
  "Salmon",
];
let img1;
function preload() {
  img1 = loadImage("assets/special.jpg");
  // img2 = loadImage("assets/lightening1.jpg");
}
let randomColors = [];
let youxiu = [];
let crist = [];
let HEAD = 280;
let BOTTOM = 20;
let HEIGHT = 520;
let COUNT = 140;
let ITEM_HEIGHT = 5;
let colors2 = ["midnightblue", "cornflowerblue"];
let ITEM_SIN_DISTRIBUTION = 1;
let ITEM_SIN_SPEED = 0.05;
let ITEM_SWAY_AMT = 12;
// let img2;
let mode = 0;
let jiayou = [];
let dontgiveup = [];
let stars = [];

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasContainer");
  // image(img2, 0, 0, 600, 600);
  image(img1, 0, 0);
  for (let i = 0; i < NUM_OF_BALLS; i++) {
    let randomIndex = floor(random(colors.length));
    let colorName = colors[randomIndex];
    balls.push(new Ball(width / 2, height / 2, colorName));
  }
  for (let i = 0; i < 13; i++) {
    randomColors.push(random(colors));
  }
  console.log(randomColors);

  for (let i = 0; i < 5; i++) {
    youxiu.push(new Thanksgiving(random(width / 2), random(height / 2)));
    youxiu[i].randomizeColor();
  }

  for (let i = 0; i < 5; i++) {
    crist.push(new Ronaldo(random(width / 2), random(height / 2)));
    crist[i].randomizeColor();
  }
  for (let i = 0; i < 250; i++) {
    jiayou.push(new Leaves(600, 600));
    // jiayou.rotate();
  }
  for (let i = 0; i < 2; i++) {
    dontgiveup.push(
      new tornado(random(width * 0.2, width * 0.4) + 300 * i, height)
    );
    dontgiveup[i].randomizeColor();
    rectMode(CENTER);
    noStroke();
  }
  let starsNumber = 20;
  for (let i = 0; i < starsNumber; i++) {
    let temp = new Star();
    stars.push(temp);
  }
  let counter = 0;
}

function draw() {
  switch (mode) {
    case 0:
      image(img1, 0, 0);
      scene1();
      break;
    case 1:
      scene2();
      break;
    case 2:
      // image(img2, 0, 0, 600, 600);
      scene3();
      break;
    case 3:
      scene4();
      break;
    default:
      scene1();
      break;
  }
}

class tornado {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = { x, y };
    this.acc = { x: this.xAcceleration, y: 0 };
    this.flash = [];
    this.particles = [];
    this.particleTick = 0;
    this.particleGoal = random(30) + 15;
    this.randomColors = [];
  }
  randomizeColor() {
    for (let i = 0; i < 2; i++) {
      this.randomColors.push(random(colors2));
    }
  }
  update() {
    let verticalSpace = HEIGHT / COUNT;
    let sinVal = 0;
    for (let i = 0; i < COUNT; i++) {
      this.flash.push({
        x: 0,
        y: -i * verticalSpace,
        w: map(i, 0, COUNT - 1, BOTTOM, HEAD),
        s: (sinVal += ITEM_SIN_DISTRIBUTION),
      });
    }
    this.update = function () {
      this.particleTick++;
      if (this.particleTick > this.particleGoal) {
        this.particleTick = 0;
        this.particleGoal = random(30) + 15;
        this.particles.push(
          new Leaves(this.pos.x + HEAD * (random() < 0.5 ? -1 : 1), this.pos.y)
        );
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        if (!this.particles[i].update(this.pos.x, this.pos.y)) {
          this.particles.splice(i, 1);
        }
      }
    };
  }
  show() {
    this.show = function () {
      push();
      translate(this.pos.x, this.pos.y);
      fill(random(colors2));
      this.flash.forEach((item) => {
        push();
        scale(1 + random(0.05));
        ellipse(
          sin((item.s += ITEM_SIN_SPEED)) * ITEM_SWAY_AMT + item.x,
          item.y,
          item.w,
          ITEM_HEIGHT
        );
        pop();
      });
      pop();

      this.particles.forEach((item) => {
        item.show();
      });
    };
  }
}

class Leaves {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = { x: x, y: y };
    this.acc = { x: 0, y: -random(1.5) };
    this.radius = random(10) + 5;
    this.alpha = random(200) + 55;
    this.xAcceleration = random(20);
    this.rotAngle = random(TWO_PI);
    this.rotSpd = random(2, 4);
  }
  rotate() {
    this.rotAngle += this.rotSpd;
  }
  update() {
    this.update = function (x, y) {
      if (this.pos.x < 300) {
        this.acc.x += this.xAcceleration;
      } else {
        this.acc.x += -this.xAcceleration;
      }

      this.pos.x += this.acc.x;
      this.pos.y += this.acc.y;

      return this.pos.y > -this.radius;
    };
  }
  show() {
    this.show = function () {
      fill(0, 255, 0, this.alpha);
      push();
      translate(this.pos.x, this.pos.y);
       rotate(this.rotAngle);
      ellipse(0, 0, 24, 12);
      stroke(58, 55, 11);
      line(-12, 0, 12, 0);
      line(4, 0, 8, -5);
      line(-1, 0, 4, 6);
      line(-11, 0, -2, -7);
      pop();
    };
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    mode--;
  }
  if (keyCode === DOWN_ARROW) {
    for (let i = 0; i < 20; i++) {
    let kun = new Star();
    stars.push(kun);
  }
  }
  else if (keyCode === RIGHT_ARROW) {
    mode++;
  }
}
// function mousePressed() {
//   let starsNumber = 50;
//   for (let i = 0; i < starsNumber; i++) {
//     let kun = new Star();
//     stars.push(kun);
//   }
// }
class Star {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-width / 2, width / 2);
    this.z = random(0, width);

    this.r = 25 + random(-2, 3);
    this.isMiss = false;
  }

  update(speed) {
    this.z -= speed;
    if (this.z <= 1) {
      this.x = random(-width / 2, width / 2);
      this.y = random(-width / 2, width / 2);
      this.z = width;
      this.isMiss = false;
    }
  }

  show() {
    fill(0, 0, 100);
    noStroke();
    const nowX = map(this.x / this.z, -1, 1, -width / 2, width / 2);
    const nowY = map(this.y / this.z, -1, 1, -width / 2, width / 2);
    if (!this.isMiss) {
      this.sx = nowX;
      this.sy = nowY;
      this.isMiss = true;
    }
    const nowR = map(this.z, 0, width, this.r, 0);
    ellipse(nowX, nowY, nowR, nowR);

    stroke(15, 120, 255);
    triangle(
      nowX + nowR / 3,
      nowY + nowR / 3,
      nowX - nowR / 3,
      nowY - nowR / 3,
      this.sx,
      this.sy
    );
  }
}
class Thanksgiving {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.randomColors = [];
    this.xSpd = random(-4, 4);
    this.ySpd = random(-5, 5);
  }
  randomizeColor() {
    for (let i = 0; i < 15; i++) {
      this.randomColors.push(random(colors));
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpd = this.ySpd * -1;
    }
  }
  display() {
    beginShape();
    noFill();
    stroke(this.randomColors[9]);
    strokeWeight(3);
    //STARTING POINT
    fill(this.randomColors[10]);
    push();
    translate(this.x / 2, this.y / 2);

    fill(this.randomColors[11]);
    ellipse(300, 300, 60, 20);
    fill(0);
    circle(330, 300, 8);
    fill(this.randomColors[12]);
    curveVertex(322, 293);
    curveVertex(322, 293);
    //MID POINT
    curveVertex(319, 235 - sin(frameCount * 0.1) * 15);
    curveVertex(251, 263 - sin(frameCount * 0.1) * 15);
    //ENDING POINT
    curveVertex(279, 292);
    curveVertex(279, 292);
    endShape();

    beginShape();
    noFill();
    stroke(this.randomColors[13]);
    strokeWeight(3);
    //STARTING POINT
    fill(this.randomColors[14]);
    curveVertex(322, 307);
    curveVertex(322, 307);
    //MID POINT
    curveVertex(319, 365 + sin(frameCount * 0.1) * 15);
    curveVertex(251, 337 + sin(frameCount * 0.1) * 15);
    //ENDING POINT
    curveVertex(279, 308);
    curveVertex(279, 308);
    endShape();
    pop();
  }
}
class Ronaldo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-2, 2);
    this.ySpd = random(-5, 5);
    this.randomColors = [];
  }
  randomizeColor() {
    for (let i = 0; i < 15; i++) {
      this.randomColors.push(random(colors));
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpd = this.ySpd * -1;
    }
  }
  display() {
    push();
    translate(this.x / 3, this.y / 2);
    fill(this.randomColors[0]);
    ellipse(100, 100, 60, 20);
    fill(0);
    circle(130, 100, 8);
    beginShape();
    noFill();
    stroke(this.randomColors[1]);
    strokeWeight(3);
    //STARTING POINT
    fill(this.randomColors[2]);
    curveVertex(100, 110);
    curveVertex(100, 110);

    //MID POINT
    curveVertex(108, 135 - sin(frameCount * 0.1) * 10);
    curveVertex(144, 140 - sin(frameCount * 0.1) * 10);
    curveVertex(120, 113);
    //ENDING POINT
    curveVertex(100, 110);
    curveVertex(100, 110);
    endShape();

    beginShape();
    noFill();
    stroke(this.randomColors[3]);
    strokeWeight(3);
    //STARTING POINT
    fill(this.randomColors[4]);
    curveVertex(100, 110);
    curveVertex(100, 110);
    //MID POINT
    curveVertex(92, 130 + sin(frameCount * 0.1) * 2);
    curveVertex(66, 125 + sin(frameCount * 0.1) * 2);
    curveVertex(80, 113);
    //ENDING POINT
    curveVertex(100, 110);
    curveVertex(100, 110);
    endShape();

    beginShape();
    noFill();
    stroke(this.randomColors[5]);
    strokeWeight(3);
    //STARTING POINT
    fill(this.randomColors[6]);
    curveVertex(100, 90);
    curveVertex(100, 90);
    //MID POINT
    curveVertex(108, 65 + sin(frameCount * 0.1) * 10);
    curveVertex(144, 60 + sin(frameCount * 0.1) * 10);
    curveVertex(120, 87);
    //ENDING POINT
    curveVertex(100, 90);
    curveVertex(100, 90);
    endShape();

    beginShape();
    noFill();
    stroke(this.randomColors[7]);
    strokeWeight(3);
    //STARTING POINT

    curveVertex(100, 90);
    curveVertex(100, 90);
    //MID POINT
    fill(this.randomColors[8]);
    curveVertex(92, 70 - sin(frameCount * 0.1) * 2);
    curveVertex(66, 75 - sin(frameCount * 0.1) * 2);
    curveVertex(80, 87);
    //ENDING POINT
    curveVertex(100, 90);
    curveVertex(100, 90);
    endShape();
    pop();
  }
}
class Ball {
  //property
  constructor(x, y, clr) {
    this.x = x;
    this.y = y;
    this.dia = 50;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-3, 3);
    this.color = clr;
    this.rotAngle = random(TWO_PI);
    this.rotSpd = random(0.1, 0.2);
  }

  attractedTo(targetX, targetY) {
    let xAcc = (targetX - this.x) * 0.0002;
    let yAcc = (targetY - this.y) * 0.0002;
    this.ySpd += yAcc;
    this.xSpd += xAcc;
  }

  fall() {
    this.ySpd += 0.1;
  }

  explode() {
    this.xSpd = random(-10, 10);
    this.ySpd = random(-10, 10);
  }

  rotate() {
    this.rotAngle += this.rotSpd;
  }

  speedUp() {
    this.xSpd = this.xSpd * 1.000001;
    this.ySpd = this.ySpd * 1.000001;
  }

  slowDown() {
    this.xSpd = this.xSpd * 0.999999;
    this.ySpd = this.ySpd * 0.999999;
  }

  //how does it move, behaviors
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  bounce() {
    if (this.x < 150 || this.x > width-150) {
      this.xSpd = this.xSpd * -1.5;
    }
    if (this.y < 150 || this.y > height-150) {
      this.ySpd = this.ySpd * -1.5;
    }
  }
  display() {
    push();
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.rotAngle);
    triangle(90, 60, 63, 58, 40, 15);
    triangle(140, 10, 90, 60, 93, 36);
    triangle(90, 60, 117, 65, 140, 110);
    triangle(90, 60, 80, 88, 35, 110);
    pop();
  }
}
function scene1() {
  image(img1,0,0)
  for (let i = 0; i < 5; i++) {
    youxiu[i].display();
    youxiu[i].move();
    youxiu[i].bounce();
  }
  for (let i = 0; i < 5; i++) {
    crist[i].display();
    crist[i].move();
    crist[i].bounce();
  }
}
function scene2() {
  noStroke()
  background(0,10);
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    //balls[i].fall();
    //balls[i].enlarge();
     //balls[i].speedUp();
    //balls[i].slowDown();
    balls[i].bounce();
    balls[i].rotate();
    balls[i].attractedTo(200, 200);
  }
}
function scene3() {
   background(0);
   translate(140,0)
   // image(img2, 0, 0, 600, 600);
  // console.log(mouseX,mouseY)
  noStroke();
  for (let i = 0; i < 1; i++) {
    dontgiveup[i].update();
    dontgiveup[i].show();
  }
  translate(-110,0)
  for (let i = 0; i < 250; i++) {
    jiayou[i].update();
    jiayou[i].show();
    jiayou[i].rotate();
  }
}
function scene4() {
  let width = document.body.offsetWidth;
let height = document.body.offsetHeight;
  translate(width / 2, height / 2);
  background("#088B9C");
  for (let i = 0; i < stars.length/3; i++) {
    stars[i].update(25);
    stars[i].show();
  }
}
