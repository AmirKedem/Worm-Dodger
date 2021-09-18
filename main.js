const FPS = 60;
const SPACE_KEYCODE = 32;
const BG_COLOR = 50;

let worm;
let attractor;
let now;
let obsticles = [];
let shieldBar;
let isGameStarted = false;
let tempo = 160;
let startScoreTimer;
let scoreTimer = 0;
let scoreP;
let bestP;
const LIVES_AMOUNT = 3;
let lives = LIVES_AMOUNT;

let SHIELD_ACTIVE_TIME = 5 * FPS;
let SHIELD_COOLDOWN = 20 * FPS;
let shieldActivator = false;

let startShieldFrameCount = -1;
let startShieldCoolDownFrameCount = -1;

let fcCrashDeactivateBypass = 0;
let fcShieldDeactivate = SHIELD_COOLDOWN;
let fcCanUseShield = 0;

/*
One time setup.
Init objects once and call reset to init all the 
dynamic variables.
*/
function setup() {
  createCanvas(innerWidth, innerHeight);
  noCursor();
  scoreP = createP();
  bestP = createP();
  scoreP.html("Score: 0");
  bestP.html("Best: 0");
  
  shieldBar = new ShieldBar();
  attractor = createVector(width / 2, height / 2);

  reset();
}

/*
Reset the game variables.
Every new game this function should be called.
*/
function reset() {
  worm = new Worm(
    random(width / 4, width * 0.75),
    random(height / 4, height * 0.75)
  );
  obsticles = [];
  fcCrashDeactivateBypass = 0;
  fcShieldDeactivate = 0;
  fcCanUseShield = 0;

  startShieldFrameCount = -1;
  startShieldCoolDownFrameCount = -1;

  fcCrashDeactivateBypass = 0;
  fcShieldDeactivate = SHIELD_COOLDOWN;
  fcCanUseShield = 0;

  shieldActivator = false;
  lives = LIVES_AMOUNT;
  scoreTimer = 0;
  startScoreTimer = Math.round(new Date() / 10);
}


function draw() {
  background(BG_COLOR);
  DrawHearts();
  // Score
  now = Math.round(new Date() / 10);
  scoreTimer = (now - startScoreTimer) / 100;
  bestTime = Math.max(bestTime, scoreTimer);
  setCookie("bestTime", bestTime, 365);
  scoreP.html("<p class = score> Score: " + scoreTimer + "</p>");
  bestP.html("<p class = best> Best: " + bestTime + "</p>");
 
  if (shieldActivator) {
    shieldBar.update(fcShieldDeactivate, startShieldFrameCount, frameCount);
  } else {
    shieldBar.update(startShieldCoolDownFrameCount, fcCanUseShield, frameCount);
  }
  shieldBar.show();

  // Attractor
  if (mouseIsPressed || isGameStarted == true) {
    // The rate of the obsticles.
    //tempo = floor(random(250,300));
    if (frameCount % tempo == 0) {
      obsticles.push(new Obsticle(floor(random(4)), 100));
    }
    attractor = createVector(mouseX, mouseY);
    isGameStarted = true;
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

  renderMouseAttractor();

  worm.attracted(attractor);
  worm.update();

  if (shieldActivator) {
    worm.shield();
  } else {
    CheckCollisions();
  }

  if (frameCount >= fcShieldDeactivate && shieldActivator) {
    startShieldCoolDownFrameCount = frameCount;
    fcCanUseShield = frameCount + SHIELD_COOLDOWN;
    shieldActivator = false;
  } 

  worm.show();
}

function renderMouseAttractor() {
  strokeWeight(10);
  stroke(0, 25, 255);
  point(attractor.x, attractor.y);
  strokeWeight(6);
  stroke(250);
  point(attractor.x, attractor.y);
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
  if (frameCount < fcCrashDeactivateBypass) {
    return;
  }

  for (let i = obsticles.length - 1; i >= 0; i--) {
    if (worm.checkCrash(obsticles[i])) {
      lives--;
      if (lives > 0) {
        fcCrashDeactivateBypass = frameCount + 10;
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
  if (keyCode === SPACE_KEYCODE && frameCount >= fcCanUseShield) {
    startShieldFrameCount = frameCount;
    fcShieldDeactivate = frameCount + SHIELD_ACTIVE_TIME;
    shieldActivator = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
