const FPS = 60;
const SPACE_KEYCODE = 32;
const BG_COLOR = 50;

let worm;
let attractor;
let now;
let obsticles = [];
let trackMouse = false;
let tempo = 160;
let anotherfps1 = 0;
let anotherfps2 = 0;
let anotherfps3 = 0;
let start = Math.round(new Date() / 10);
let time = 0;
let scoreP;
let bestP;
const LIVES_AMOUNT = 3;
let lives = LIVES_AMOUNT;

let SHIELD_ACTIVE_TIME = 5 * FPS;
let SHIELD_COOLDOWN = 20 * FPS;
let shieldActivator = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noCursor();
  scoreP = createP();
  bestP = createP();
  scoreP.html("Score: 0");
  bestP.html("Best: 0");
  worm = new Player(
    random(width / 4, width * 0.75),
    random(height / 4, height * 0.75)
  );
  obsticles.push(new Obsticle(floor(random(4))));

  attractor = createVector(width / 2, height / 2);
  now = Math.round(new Date() / 10);
}

function reset() {
  worm.history = [];
  worm.pos.x = random(width / 4, width * 0.75);
  worm.pos.y = random(height / 4, height * 0.75);
  obsticles = [];
  anotherfps1 = 0;
  anotherfps2 = 0;
  anotherfps3 = 0;
  shieldActivator = false;
  lives = LIVES_AMOUNT;
  time = 0;
  start = Math.round(new Date() / 10);
}


function draw() {
  background(BG_COLOR);
  DrawHearts();
  // Score
  now = Math.round(new Date() / 10);
  time = (now - start) / 100;
  bestTime = Math.max(bestTime, time);
  setCookie("bestTime", bestTime, 365);
  scoreP.html("<p class = score> Score: " + time + "</p>");
  bestP.html("<p class = best> Best: " + bestTime + "</p>");

  // Attractor
  if (mouseIsPressed || trackMouse == true) {
    // The rate of the obsticles.
    //tempo = floor(random(250,300));
    if (frameCount % tempo == 0) {
      obsticles.push(new Obsticle(floor(random(4))));
    }
    attractor = createVector(mouseX, mouseY);
    trackMouse = true;
  } else {
    attractor = createVector(width / 2, height / 2);
  }

  // Obsticles
  for (let i = obsticles.length - 1; i >= 0; i--) {
    let obsticle = obsticles[i];
    obsticle.update();
    obsticle.show();
    if (obsticle.isOutOfScreen()) {
      obsticles.splice(i, 1);
    }
  }

  // Draws the attractor.
  strokeWeight(10);
  stroke(0, 25, 255);
  point(attractor.x, attractor.y);
  strokeWeight(6);
  stroke(250);
  point(attractor.x, attractor.y);

  worm.attracted(attractor);
  worm.update();

  // releases obsticles over time.
  if (frameCount >= anotherfps2) {
    shieldActivator = false;
  } else {
    worm.shield();
  }
  if (!shieldActivator) {
    CheckCollisions();
  }
  worm.show();
}

function DrawHearts() {
  push();
  translate(width - 90, height - 60);
  for (let heartIndex = 0; heartIndex < LIVES_AMOUNT; heartIndex++) {
    heart(lives, heartIndex);
    translate(0, -60);
  }
  pop();
}

function CheckCollisions() {
  for (let i = obsticles.length - 1; i >= 0; i--) {
    if (worm.checkCrash(obsticles[i]) && frameCount >= anotherfps1) {
      lives--;
      if (lives > 0) {
        anotherfps1 = frameCount + 10;
        obsticles.splice(i, 1);
      } else {
        reset();
      }
      // There is no need to keep check for collisions 
      // since we have a crash safety timer. (After hit we have a shield for a second).
      break;
    }
  }
}

function keyPressed() {
  if (keyCode === SPACE_KEYCODE && frameCount >= anotherfps3) {
    anotherfps2 = frameCount + SHIELD_ACTIVE_TIME;
    anotherfps3 = frameCount + SHIELD_COOLDOWN;
    shieldActivator = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
