var worm;
var obs = [];
var onoff = false;
var tempo = 150;
var start = Math.round(new Date() / 10);
var lives = 5;
var score = 0;

function setup() {
  createCanvas(innerHeight, innerHeight);
  worm = new Player(random(width/4,width*0.75), random(height/4,height*0.75)); 
	obs.push(new Obsticle(floor(random(4))));	
  var attractor = createVector(width/2, height/2);  
	var now = Math.round(new Date() / 10);
}

function draw() {
  background(50);
	now = Math.round(new Date() / 10);
	score = now - start;
	console.log(score/100);
	
  // Attractor
  attractor = createVector(mouseX, mouseY);
	var onoff = false;
	if (mouseIsPressed || onoff == true) {
		attractor = createVector(mouseX, mouseY);
		onoff = true;	
	} else {
		attractor = createVector(width/2, height/2);
	}
	
	// obsticles	
	for(var i=0; i < obs.length; i++) {
		obs[i].update();
		obs[i].show();
		switch (obs[i].dir) {	
			// pos is 1 frame left to the screen. vel is to the right.
			case 0:
				if (obs[i].pos.x > width) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame right to the screen. vel is to the left.
			case 1:	
				if (obs[i].pos.x < -2) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame down to the screen. vel is to the up.	
			case 2:	
				if (obs[i].pos.y < -2) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame up to the screen. vel is to the down.	
			case 3:	
				if (obs[i].pos.y > height) {
					obs.splice(i, 1);
					i--;
				}
				break;
		} 	
	}		
	// The rate of the obs.
	//tempo = floor(random(250,300));
	if (frameCount % tempo == 0) {
		obs.push(new Obsticle(floor(random(4))));
	}		
	
	// Attractor
	// Draws the attractor.	
  strokeWeight(9);
  stroke(0, 25 , 255);
  point(attractor.x, attractor.y);
	strokeWeight(4);
  stroke(250);
	point(attractor.x, attractor.y);
	
	// worm
  worm.attracted(attractor);   
  worm.update();
	if (worm.checkCrash(obs)) {
		if (lives > 1) {
			lives--;
			console.log(lives);
		} else {
			reset();
		}
	}
  worm.show();
}
