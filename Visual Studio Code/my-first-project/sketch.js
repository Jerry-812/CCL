let ballA
function setup() {
  createCanvas(600, 600);

  ballA = new Ball(100, 100);
}

function draw() {
  background(220);
  ballA.display();
  ballA.move();
  ballA.bounce();
  ballA.changeColor();
}

//________________Classs: Ball
class Ball {
  //constructor
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(50, 100);
    this.xSpd = random(-20, 20);
    this.ySpd = random(-2, 2);
  }
  move(){
    this.x += this.xSpd
    this.y += this.ySpd
    
  }
  bounce(){
   if(this.x<0|| this.x>width) {
     this.xSpd = this.xSpd * -1
   }
     if(this.y<0|| this.y>width) {
     this.ySpd = this.ySpd * -1
   }
  }
changeColor(){
  if(this.x<0|| this.x>width){
    fill(random(255),random(255),random(255))
  }
}
  display() {
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
