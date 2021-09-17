class Player {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector();
		this.acc = createVector();
		this.history = [];
		this.rad = 4;
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(5);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.pos.x = constrain(this.pos.x, this.rad, width - this.rad);
		this.pos.y = constrain(this.pos.y, this.rad, height - this.rad);
		this.history.push(createVector(this.pos.x, this.pos.y));
		if (this.history.length > 40) {
			this.history.shift();
		}
	};

	checkCrash(obsticle) {
		if (obsticle === undefined) {
			return;
		}

		if (obsticle.dir === UP_DIR || obsticle.dir === DOWN_DIR) {
			if ((this.pos.x <= obsticle.xrange || this.pos.x >= obsticle.rect2posx) &&
				this.pos.y >= obsticle.pos.y &&
				this.pos.y <= obsticle.pos.y + 10) {
				return true;
			}
		} else {
			if ((this.pos.y <= obsticle.yrange || this.pos.y >= obsticle.rect2posy) &&
				this.pos.x >= obsticle.pos.x &&
				this.pos.x <= obsticle.pos.x + 10) {
				return true;
			}
		}
	};

	show() {
		for (var i = 0; i < this.history.length; i++) {
			var trailpos = this.history[i];
			var r = i / 5.0 + 3;
			stroke(255, 0, 100);
			strokeWeight(1);
			fill(0, 25, 255, i * 8);
			ellipse(trailpos.x, trailpos.y, r, r);
		}
	}

	attracted(target) {
		// var dir = target - this.pos
		var force = p5.Vector.sub(target, this.pos);
		var d = force.mag();
		d = constrain(d, 5, 15);
		var G = 50;
		var strength = G / (d * d);
		force.setMag(strength);
		this.acc.add(force);
	}

	shield() {
		noFill();
		strokeWeight(1);
		stroke(240);
		ellipse(this.pos.x, this.pos.y, 25, 25);
		strokeWeight(1);
		stroke(190);
		ellipse(this.pos.x, this.pos.y, 23, 23);
		ellipse(this.pos.x, this.pos.y, 27, 27);
	}
}
