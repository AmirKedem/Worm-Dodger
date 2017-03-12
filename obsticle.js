 function Obsticle(dir) {
	this.dir = dir; 
	switch (dir) {	
		// pos is 1 frame left to the screen. vel is to the right. 	
		case 0:
			this.pos = createVector(-2, 0);
			this.vel = createVector(2, 0);
			break;
		// pos is 1 frame right to the screen. vel is to the left.	
		case 1:	
			this.pos = createVector(width + 2, 0);
			this.vel = createVector(-2, 0);
			break;
		// pos is 1 frame down to the screen. vel is to the up.		
		case 2:	
			this.pos = createVector(0, height + 2);
			this.vel = createVector(0, - 2);
			break;
		// pos is 1 frame up to the screen. vel is to the down.		
		case 3:	
			this.pos = createVector(0, -2);
			this.vel = createVector(0, 2);
			break;
	} 
	 
	// def the distance between the two rects.
	this.d = 100
	// some random color.
	this.color = 254/2;
	if (dir == 2 || dir == 3) {
		// calculates the width of the rect.
		this.xrange = random(0 , width-this.d);
		this.yrange = 10;
		// calculates the width of the rect by the other rect. 
		this.whatleftx = width - (this.xrange + this.d);
		this.whatlefty = this.yrange 
	} else {
		// calculates the width of the rect.
		this.xrange = 10;
		this.yrange = random(0 , height-this.d);
		// calculates the width of the rect by the other rect. 
		this.whatleftx = this.xrange;
		this.whatlefty = height - (this.yrange + this.d);
	} 
	 
	// functions
  this.update = function() {
    this.pos.add(this.vel);
	}
	
  this.show = function() { 
		fill(this.color, 255,this.color ,135);
		stroke(this.color + 20, 255 ,this.color + 20);
		strokeWeight(4);
		if (dir >= 2) {
			this.rect2posx = this.xrange + this.d;
			this.rect2posy = this.pos.y;
		} else {
			this.rect2posx = this.pos.x;
			this.rect2posy = this.yrange + this.d;
		}
 		rect(this.pos.x, this.pos.y,
				 this.xrange, this.yrange);
		rect(this.rect2posx, this.rect2posy, 
				 this.whatleftx, this.whatlefty);
  }
}