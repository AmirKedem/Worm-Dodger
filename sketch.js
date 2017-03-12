var ship;
var obs = [];
var onoff = false;
var tempo = 150;

function setup() {
  createCanvas(innerHeight, innerHeight);
  ship = new Particle(random(width), random(height)); 
	obs.push(new Obsticle(floor(random(4))));	
  var attractor = createVector(width/2, height/2);  
}

function draw() {
  background(51);
		
  // Attractor
  //attractor = createVector(mouseX, mouseY);
	// var switch = false;
	if (mouseIsPressed || onoff == true) {
		attractor = createVector(mouseX, mouseY);
		onoff = true;	
	} else {
		attractor = createVector(width/2, height/2);
	}
  stroke(255);
  strokeWeight(8);
  stroke(0, 255, 0);
  point(attractor.x, attractor.y);
	
	// obsticles	
	
	for(var i=0; i < obs.length; i++) {
		obs[i].update();
		obs[i].show();
		switch (obs[i].dir) {	
			// pos is 1 frame left to the screen. vel is to the right.
			case 0:
				if (obs[i].pos.x > width) {
					obs.shift(i);
					i--;
				}
				break;
			// pos is 1 frame right to the screen. vel is to the left.
			case 1:	
				if (obs[i].pos.x < -2) {
					obs.shift(i);
					i--;
				}
				break;
			// pos is 1 frame down to the screen. vel is to the up.	
			case 2:	
				if (obs[i].pos.y < -2) {
					obs.shift(i);
					i--;
				}
				break;
			// pos is 1 frame up to the screen. vel is to the down.	
			case 3:	
				if (obs[i].pos.y > height) {
					obs.shift(i);
					i--;
				}
				break;
		} 	
	}		
	
	//tempo = floor(random(250,300));
	if (frameCount % tempo == 0) {
		obs.push(new Obsticle(floor(random(4))));
	}		
	
	// ship	
  ship.attracted(attractor);   
  ship.update();
	ship.checkCrash(obs);
	if (ship.checkCrash) {
		//need to do reset fn.
		//reset();
	}
  ship.show();
}
