// cookies start.
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var bestTime;
if (getCookie('bestTime') == "") {
	bestTime = 0;
	setCookie('bestTime', 0, 365);
}
bestTime = getCookie('bestTime');

// coolies end.

// hearts start.
var shiftx = 1782;
var shifty1 = 970;
var shifty2 = 920;
var shifty3 = 870;
var shifty4 = 820;
var shifty5 = 770;

var rad = 30;

var points1 = {
	x1: shiftx + 2*(rad/(Math.pow(2, 0.5))),
	y1: shifty1,
	x2: shiftx + (rad/(Math.pow(2, 0.5))),
	y2: shifty1 - (rad/(Math.pow(2, 0.5))),
	x3: shiftx, 
	y3: shifty1,
	x4: shiftx + (rad/(Math.pow(2, 0.5))),
	y4: shifty1+ (rad/(Math.pow(2, 0.5)))
};

var points2 = {
	x1: shiftx + 2*(rad/(Math.pow(2, 0.5))),
	y1: shifty2,
	x2: shiftx + (rad/(Math.pow(2, 0.5))),
	y2: shifty2 - (rad/(Math.pow(2, 0.5))),
	x3: shiftx, 
	y3: shifty2,
	x4: shiftx + (rad/(Math.pow(2, 0.5))),
	y4: shifty2 + (rad/(Math.pow(2, 0.5)))
};

var points3 = {
	x1: shiftx + 2*(rad/(Math.pow(2, 0.5))),
	y1: shifty3,
	x2: shiftx + (rad/(Math.pow(2, 0.5))),
	y2: shifty3 - (rad/(Math.pow(2, 0.5))),
	x3: shiftx, 
	y3: shifty3,
	x4: shiftx + (rad/(Math.pow(2, 0.5))),
	y4: shifty3 + (rad/(Math.pow(2, 0.5)))
};

var points4 = {
	x1: shiftx + 2*(rad/(Math.pow(2, 0.5))),
	y1: shifty4,
	x2: shiftx + (rad/(Math.pow(2, 0.5))),
	y2: shifty4 - (rad/(Math.pow(2, 0.5))),
	x3: shiftx, 
	y3: shifty4,
	x4: shiftx + (rad/(Math.pow(2, 0.5))),
	y4: shifty4 + (rad/(Math.pow(2, 0.5)))
};

var points5 = {
	x1: shiftx + 2*(rad/(Math.pow(2, 0.5))),
	y1: shifty5,
	x2: shiftx + (rad/(Math.pow(2, 0.5))),
	y2: shifty5 - (rad/(Math.pow(2, 0.5))),
	x3: shiftx, 
	y3: shifty5,
	x4: shiftx + (rad/(Math.pow(2, 0.5))),
	y4: shifty5 + (rad/(Math.pow(2, 0.5)))
};

function heart (point,boolean) {
	strokeJoin(ROUND);
	if (boolean) {
		fill(50);
	} else {
		fill(255,0,0);
	}
	stroke(5);
	
	arc((point.x3 + point.x2) / 2, (point.y3 + point.y2) / 2
			,rad,rad,0,0);
	arc((point.x2 + point.x1) / 2, (point.y2 + point.y1) / 2
			,rad,rad,0,0);
	
	stroke(1);
	beginShape(TRIANGLE_FAN);
	vertex(point.x1, point.y1);
	vertex(point.x4, point.y4);
	vertex(point.x3, point.y3);
	endShape();
	
	noStroke();
	beginShape(TRIANGLE_FAN);
	vertex(point.x1, point.y1);
	vertex(point.x2, point.y2);
	vertex(point.x3, point.y3);
	vertex(point.x4, point.y4);
	endShape();
}

//hearts end.

var worm;
var obs = [];
var onoff = false;
var tempo = 160;
var anotherfps1 = 0;
var anotherfps2 = 0;
var anotherfps3 = 0;
var start = Math.round(new Date() / 10);
var time = 0;
var lives = 5;
var livesBool1 = false;
var livesBool2 = false;
var livesBool3 = false;
var livesBool4 = false;
var livesBool5 = false;
var scoreP;
var bestP;
// sets the shield to 5 secs.
var	shield = 5 * 60
var shieldActivator= false;

function setup() {
  createCanvas(1858, 1014);
	scoreP = createP();
	bestP = createP();
	scoreP.html("Score: 0");
	bestP.html("Best: 0");
  worm = new Player(random(width/4,width*0.75), random(height/4,height*0.75)); 
	obs.push(new Obsticle(floor(random(4))));	
  var attractor = createVector(width/2, height/2);  
	var now = Math.round(new Date() / 10);
}

function reset() {
	worm.history = [];
	worm.pos.x = random(width/4,width*0.75);
	worm.pos.y = random(height/4,height*0.75);
	obs = [];
	anotherfps1 = 0;
  anotherfps2 = 0;
	shieldActivator= false;
	lives = 5;
	time = 0;
	start = Math.round(new Date() / 10);
	livesBool1 = false;
	livesBool2 = false;
	livesBool3 = false;
  livesBool4 = false;
	livesBool5 = false;
}

function draw() {
	
	// resets the background (updates the screen).
  background(50);
	// draws the hearts.
	heart(points1,livesBool1);
	heart(points2,livesBool2);
	heart(points3,livesBool3);
	heart(points4,livesBool4);
	heart(points5,livesBool5);
	// Score
	now = Math.round(new Date() / 10);
	time = (now - start) / 100;
	bestTime = Math.max(bestTime, time);
	setCookie('bestTime', bestTime, 365);
	scoreP.html("<p class = score> Score: " + time + "</p>");
	bestP.html("<p class = best> Best: " + bestTime + "</p>");
	
  // Attractor
	/* cool mod
  attractor = createVector(mouseX, mouseY);
	var onoff = false;
	*/
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
				if (obs[i].pos.x > width + 10) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame right to the screen. vel is to the left.
			case 1:	
				if (obs[i].pos.x < -10) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame down to the screen. vel is to the up.	
			case 2:	
				if (obs[i].pos.y < -10) {
					obs.splice(i, 1);
					i--;
				}
				break;
			// pos is 1 frame up to the screen. vel is to the down.	
			case 3:	
				if (obs[i].pos.y > height + 10) {
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
  strokeWeight(10);
  stroke(0, 25 , 255);
  point(attractor.x, attractor.y);
	strokeWeight(6);
  stroke(250);
	point(attractor.x, attractor.y);
	
	// worm
  worm.attracted(attractor);   
  worm.update();
	
	// releases obstacles over time.
	if (frameCount >= anotherfps2) { 
		shieldActivator = false;
	}
	if (!shieldActivator) {
		if (worm.checkCrash(obs) && frameCount >= anotherfps1) {
			if (lives > 1) {
				anotherfps1 = frameCount + 10;
				lives--;
				switch (lives) {
					case 4:
						livesBool5 = true;
						break;
					case 3:
						livesBool4 = true;
						break;
					case 2:
						livesBool3 = true;
						break;
					case 1:
						livesBool2 = true;
						break;
				}
				console.log(lives);
			} else {
				livesBool1 = true;
				reset();
			}
		}
	}
  worm.show();
}

function keyPressed() {
	if (keyCode === 32 && frameCount >= anotherfps3) {
		anotherfps2 = frameCount + shield;
		anotherfps3 = frameCount + (20 * 60);
		shieldActivator = true;
	}
}
