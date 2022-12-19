let balls = [];
let clocks = [];
let angle = 0;
let NUM_OF_BALLS = 10;
let myObject;
let colors = [
  "Aquamarine",
  "Coral",
  "Indigo",
  "MistyRose",
  "Auqa",
  "BlueViolet",
  "Crimson",
  "DarkMargenta",
  "DarkOrchid",
  "DarkSlateBlue",
  "DarkTurquoise",
  "DeepPink",
  "DeepSkyBlue",
  "GoldenRod",
  "Ivory",
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
  "WhiteSmoke",
  "Sienna",
  "Salmon",
];
let mode = 0;
function setup() {
  let canvas = createCanvas(600,600);
  canvas.parent("thiscanvas");
  for (let i = 0; i < NUM_OF_BALLS; i++) {
    let randomIndex = floor(random(colors.length));
    let colorName = colors[randomIndex];
    balls.push(new Ball(width / 2, height / 2, colorName));
  }
  myObject = new ObjectWithClock(random(width) * 1.5, random(height) * 1.5);
}

function draw() {
  switch (mode) {
    case 0:
      scene1();
      break;
    case 1:
      scene3();
      break;
    case 2:
      scene2();
      break;
    case 3:
      scene4();
      break;
    case 4:
      scene5();
      break;
      case 5:
      scene6();
      break;
    default:
      scene6();
      break;
    //
  }
}
class ObjectWithClock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.clock = 0;
    this.timeAtBirth = millis();
    this.lifetime = 10000; // 10000 milliseconds are ten seconds
    this.alive = true;
  }
  display() {
    let ColorChange = map(this.clock, 0, this.lifetime, 255, 0);
    fill(random(255), random(255), random(255), ColorChange);
    noStroke();
    circle(this.x - 300, this.y - 300, 20);
  }

  update() {
    let shakeExtent = map(this.clock, 0, this.lifetime, 0, 2);
    this.x += 1;
    this.y += 1;
    this.clock = millis() - this.timeAtBirth;
  }
}

function mousePressed() {
  mode++;
}


  if (balls.length > 0) {
    let index = 0; // the first index = the oldest object
    // remove the oldest object
    balls.splice(index, 1);
  }
 
class Ball {
  //property
  constructor(x, y, clr) {
    this.x = x;
    this.y = y;
    this.dia = 50;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-5, -3);
    this.color = clr;
    this.rotAngle = random(TWO_PI);
    this.rotSpd = random(0.1, 0.2);
  }

  attractedTo(targetX, targetY) {
    let xAcc = (targetX - this.x) * 0.002;
    let yAcc = (targetY - this.y) * 0.002;
    this.ySpd += yAcc;
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

  enlarge() {
    // case 1: enlarge range between 10 -100
    // this.dia += 0.5;
    // this.dia = constrain(this.dia, 10,100);
    // case 2: enlarge+shrink based on osc, breathing dot
    this.dia = map(sin(this.angle), -1, 1, 15, 25);
    this.angle = this.angle + this.angleV;
    this.angleV = this.angleV + 0.0001;
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
    if (this.x < 0 || this.x > width) {
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpd = this.ySpd * -1;
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
  background(250);
  textSize(20)
  fill(0)
  text('click the mouse',10,20)
  line(350, 240, 350, 180);
  fill(255);
  circle(350, 340, 200);
  textSize(50);
  fill(random(colors));
  text("little big bang", 200, 350);
  fill(255, 0, 0);
  circle(350, 180, 5);
}

function scene2() {
  background(150, 25);
textSize(20)
  fill(0)
  text('click the mouse',10,20)
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    balls[i].fall();
    balls[i].enlarge();
    balls[i].speedUp();
    balls[i].slowDown();
    balls[i].bounce();
    //balls[i].rotate();
  }
}

function scene3() {
  background(200, 20);

  textSize(20)
  fill(0)
  text('click the mouse',10,20)
  for (let i = 0; i < balls.length; i++) {
    //balls[i].move();
    balls[i].display();
    //balls[i].fall();
    //balls[i].enlarge();
    balls[i].speedUp();
    balls[i].slowDown();
    //balls[i].bounce();
    balls[i].rotate();
    strokeWeight(1.2);
  }
}

function scene4() {
  background(100, 10);
  textSize(20)
  fill(255)
  text('click the mouse',10,20)
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    //balls[i].fall();
    //balls[i].enlarge();
    // balls[i].speedUp();
    balls[i].slowDown();
    //balls[i].bounce();
    balls[i].rotate();
    balls[i].attractedTo(random(600), random(600));
  }
}
function scene5() {
  background(50, 10);
textSize(20)
  fill(255)
  text('click the mouse',10,20)
  text('wait meteors disappear',10,40)
  for (let i = 0; i < 130; i++) {
    clocks.push(
      new ObjectWithClock(
        random(width) * 1.5,
        random(height) * 1.5,
        random(colors)
      )
    );
  }

  for (let i = 0; i < 130; i++) {
    clocks[i].update();
    clocks[i].display();
  }

  let ColorChange = map(clocks[0].clock, 0, clocks[0].lifetime, 255, 0);
  fill(colors, ColorChange);
  noStroke();
  myObject.update();
  myObject.display();
}
function scene6(){
  let x =200
  let y =350
   if (x > 400) {
     x -= 200;
   } else if (x < 0) {
     x += 200;
   }
   if (y > 500) {
     x -= 250;
   } else if (y < 0) {
     x += 250;
   }
   x += floor(movedX);
  y += floor(movedY);
   rectMode(CENTER);
  background(0)
  fill(random(colors))
  textSize(100)
   text("END", x , y );
  describe(`text moves left and right according to mouse movement
     then slowly back towards the center`);
textSize(20)
  fill(255,255,255)
  text("move the mouse",10,20 );

}
