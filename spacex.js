function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(); 
  this.acc = createVector();
  this.history = [];
	this.rad = 4;
	
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0); 
		this.pos.x = constrain(this.pos.x, this.rad, width - this.rad);
    this.pos.y = constrain(this.pos.y, this.rad, height - this.rad);
		this.history.push(createVector(this.pos.x, this.pos.y));
		if (this.history.length > 50) {
			this.history.shift();
		}
	}
	
	this.checkCrash = function(Obsticle) {
		for (var i=0; i < Obsticle.length; i++) {
			if (Obsticle[i].dir >= 2) {
				// obs dir is up or down.
				if((this.pos.x <= Obsticle[i].xrange ||
					 this.pos.x >= Obsticle[i].rect2posx)&&
					this.pos.y >= Obsticle[i].pos.y &&
					this.pos.y <= Obsticle[i].pos.y + 10) {
					return true;
				}
			} else {
				// obs dir is right or left.
				if((this.pos.y <= Obsticle[i].yrange ||
					 this.pos.y >= Obsticle[i].rect2posy)&&
					this.pos.x >= Obsticle[i].pos.x &&
					this.pos.x <= Obsticle[i].pos.x + 10) {
					return true;
				}
			}
		}
	}
	
  this.show = function() {
		for (var i = 0; i < this.history.length ;i++) {
			var trailpos = this.history[i];
			var r = i / 5.0 + 3;	
			stroke(255, 0 ,100);		
			strokeWeight(1);
			fill(0, 25 , 255, i*8);	  
			ellipse(trailpos.x, trailpos.y, r, r);
		}		
  }

  this.attracted = function(target) {
    // var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var d = force.mag();
    d = constrain(d, 5, 15);
    var G = 50;
    var strength = G / (d * d);
    force.setMag(strength);
    this.acc.add(force);
  }
}
