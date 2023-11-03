let resizeScaleX;
let resizeScaleY;
let resizeScale;

//there are two kinds of rings
//they are formed by the small shapes in the large circles
class ringCreater{
  constructor(targetCenterX, targetCenterY, targetSmallCircleR=15, targetLargeCircleR=200, targetRingNum=3, targetRingR=80){
    this.centerX = targetCenterX;
    this.centerY = targetCenterY;
    this.smallCircleR = targetSmallCircleR;
    this.largeCircleR = targetLargeCircleR;
    this.ringNum = targetRingNum;
    this.ringR = targetRingR;
    this.innerRingColorR = [0, 0, 0, 0, 0];
    this.innerRingColorG = [0, 0, 0, 0, 0];
    this.innerRingColorB = [0, 0, 0, 0, 0];
  }

  //outer rings are made up of small circles
  drawOuterRing(){
    for(let angleOffset = 0; angleOffset<=360; angleOffset+=15){
      for(let j = 1; j<=this.ringNum; j+=1){
        this.ringR = 80+j*30;
        circle((this.centerX+this.ringR*cos(angleOffset))*resizeScale, (this.centerY+this.ringR*sin(angleOffset))*resizeScale,this.smallCircleR*resizeScale);
      }
    }
  }

  //an inner ring is formed by nested circles
  //it contains five circles
  drawInnerRing(){
    this.innerRingColorR = [240, 210, 230, 190, 230];
    this.innerRingColorG = [160, 130, 180, 140, 180];
    this.innerRingColorB = [100, 60, 150, 140, 150];
    this.ringNum =5;
    this.ringR = 200;
    for(let k = 0; k<=this.ringR;k+=1){
      this.ringR -= 30;
      fill(this.innerRingColorR[k], this.innerRingColorG[k], this.innerRingColorB[k]);
      circle(this.centerX*resizeScale, this.centerY*resizeScale, this.ringR*resizeScale);
    }
  }
}

//The midpoint of two adjacent large circles can be the center of a chain
function drawChain(midPointX1, midPointY1, midPointX2, midPointY2, chainType){
  push();
  stroke(51,51,204);
  strokeWeight(3);
  fill(255, 130, 0);
  translate(((midPointX1+midPointX2)/2)*resizeScale, ((midPointY1+midPointY2)/2)*resizeScale);
  if(chainType == 1){
    rotate(70);
  }
  if(chainType == 2){
    rotate(10);
  }
  if(chainType == 3){
    rotate(130);
  }
  for(let k = -2; k <= 2; k++){
    circle((0+k*50)*resizeScale,0*resizeScale, 12*resizeScale);
    circle((-12+k*50)*resizeScale,0*resizeScale, 2*resizeScale);
    circle((12+k*50)*resizeScale,0*resizeScale, 2*resizeScale);
    circle((0+k*50)*resizeScale,-12*resizeScale, 2*resizeScale);
    circle((0+k*50)*resizeScale,12*resizeScale, 2*resizeScale);
  }
  //draw the basic shapes of a chain
  //There are five circles in a basic shape
  //while four of them surround the largest one
  pop();
}

function drawChains(){
  //draw a chain that is placed between
  //the first circle and the second circle in the first row
  drawChain(230, 230, 640, 80, 1);

  //draw a chain between
  //the second circle and the third circle in the first row
  drawChain(640, 80, 1050, -70, 1);

  drawChain(155, 660, 565, 510, 1);
  drawChain(565, 510, 975, 360, 1);
  drawChain(975, 360, 1385, 210, 1);
  drawChain(490, 940, 900, 790, 1);
  drawChain(900, 790, 1310, 640, 1);
  drawChain(1310, 640, 1720, 490, 1);
  drawChain(230, 230, 155, 660, 2);
  drawChain(640, 80, 565, 510, 2);
  drawChain(1050, -70, 975, 360, 2);
  drawChain(565, 510, 490, 940, 2);
  drawChain(975, 360, 900, 790, 2);
  drawChain(1385, 210, 1310, 640, 2);
  drawChain(230, 230, 565, 510, 3);
  drawChain(640, 80, 975, 360, 3);
  drawChain(1050, -70, 1385, 210, 3);
  drawChain(155, 660, 490, 940, 3);
  drawChain(565, 510, 900, 790, 3);
  drawChain(975, 360, 1310, 640, 3);
  drawChain(1385, 210, 1720, 490, 3);
}

//draw the first large circle in the first row
function drawCircle1Row1(){
  noStroke();
  fill(255, 230, 180);
  circle(230*resizeScale, 230*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(230, 230);
  ringCreater1.drawInnerRing();

  stroke(255, 0, 0);
  let innerRadius = 100*resizeScale;
  let outerRadius = 200*resizeScale;
  let centerX = 230*resizeScale;
  let centerY = 230*resizeScale;
  for(let angle = 0; angle < 360; angle += 5){
    let startX = centerX + innerRadius*cos(angle);
    let startY = centerY + innerRadius*sin(angle);
    let endX = centerX + outerRadius*cos(angle);
    let endY = centerY + outerRadius*sin(angle);
    line(startX, startY, endX, endY);
  }
}

function drawCircle2Row1(){
  noStroke();
  fill(255, 240, 210);
  circle(640*resizeScale, 80*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(640, 80);
  //determine the color of the small circles in the outer rings
  fill(200, 160, 200);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle3Row1(){
  noStroke();
  fill(210, 130, 60);
  circle(1050*resizeScale, -70*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(1050, -70);
  fill(220, 180, 140);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle1Row2(){
  noStroke();
  fill(230, 150, 120);
  //coordinates need to be multiplied with resizeScale
  //so as to let the sizes of the shapes change automatically
  //based on the size of window browser
  circle(155*resizeScale, 660*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(155, 660);
  fill(140, 70, 70);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle2Row2(){
  noStroke();
  fill(210, 90, 90);
  circle(565*resizeScale, 510*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(565, 510);
  fill(210, 110, 30);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle3Row2(){
  //200,200,250
  noStroke();
  fill(210, 110, 30);
  circle(975*resizeScale, 360*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(975, 360);
  ringCreater1.drawInnerRing();

  stroke(51, 0, 102);
  let innerRadius = 100*resizeScale;
  let outerRadius = 200*resizeScale;
  let centerX = 975*resizeScale;
  let centerY = 360*resizeScale;
  for(let angle = 0; angle < 360; angle += 5){
    let startX = centerX + innerRadius*cos(angle);
    let startY = centerY + innerRadius*sin(angle);
    let endX = centerX + outerRadius*cos(angle);
    let endY = centerY + outerRadius*sin(angle);
    line(startX, startY, endX, endY);
  }
}

function drawCircle4Row2(){
  noStroke();
  fill(220, 170, 30);
  circle(1385*resizeScale, 210*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(1385, 210);
  fill(190, 140, 140);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle1Row3(){
  noStroke();
  fill(255, 230, 180);
  circle(490*resizeScale, 940*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(490, 940);
  ringCreater1.drawInnerRing();

  stroke(255, 0, 0);
  strokeWeight(2);
  let innerRadius = 100*resizeScale;
  let outerRadius = 200*resizeScale;
  let centerX = 490*resizeScale;
  let centerY = 940*resizeScale;
  for(let angle = 0; angle < 360; angle += 5){
    let startX = centerX + innerRadius*cos(angle);
    let startY = centerY + innerRadius*sin(angle);
    let endX = centerX + outerRadius*cos(angle);
    let endY = centerY + outerRadius*sin(angle);
    line(startX, startY, endX, endY);
  }
}

function drawCircle2Row3(){
  noStroke();
  fill(210, 130, 60);
  circle(900*resizeScale, 790*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(900, 790);
  fill(230, 180, 150);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle3Row3(){
  noStroke();
  fill(230, 150, 120);  
  circle(1310*resizeScale, 640*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(1310, 640);
  fill(140, 70, 70);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}

function drawCircle4Row3(){
  noStroke();
  fill(190, 140, 140);
  circle(1720*resizeScale, 490*resizeScale, 400*resizeScale);
  let ringCreater1 = new ringCreater(1720, 490);
  fill(220, 170, 30);
  ringCreater1.drawOuterRing();
  ringCreater1.drawInnerRing();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //createCanvas(1665, 900);
}

function draw() {
  resizeScaleX = windowWidth/1665;
  resizeScaleY = windowHeight/900;
  resizeScale = min(resizeScaleX, resizeScaleY);

  background(250, 220, 180);

  drawCircle1Row1();
  drawCircle2Row1();
  drawCircle3Row1();

  drawCircle1Row2();
  drawCircle2Row2();
  drawCircle3Row2();
  drawCircle4Row2();

  drawCircle1Row3();
  drawCircle2Row3();
  drawCircle3Row3();
  drawCircle4Row3();

  drawChains();
}

function windowResized(){
  //resizeCanvas(1665*resizeScale, 900*resizeScale);
  resizeCanvas(windowWidth, windowHeight);
}
