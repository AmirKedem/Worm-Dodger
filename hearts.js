let rad = 30;
let length = rad / Math.sqrt(2);
let points = {
	x1: 2 * length,
	y1: 0,
	x2: length,
	y2: 0 - length,
	x3: 0, 
	y3: 0,
	x4: length,
	y4: length
};
/*
animation to the fallen heart
function heartsAnimation(heartNum) {
	this.pos1 = createVector(0,0);
	this.pos2 = createVector(0,0);
	this.vel1 = createVector(0.5,random(2,3));
	this.vel2 = createVector(-0.5,random(2,3));
	
	this.update = function() {
		this.pos1.add(this.vel1);
		this.pos2.add(this.vel2);
	}
	
	this.show = function() {
		
	}
}
*/
function heart(lives, index) {
	if (index < lives) {
		//stroke(BG_COLOR);
		stroke(0);
		fill(255,0,0);
	} else {
		//noStroke();
		//noFill();
		//stroke(BG_COLOR);
		stroke(0);
		fill(BG_COLOR);
		//heartsAnimation(point.num);
	}
	strokeJoin(ROUND);
	arc((points.x3 + points.x2) / 2, (points.y3 + points.y2) / 2
			,rad,rad,0,0);
	arc((points.x2 + points.x1) / 2, (points.y2 + points.y1) / 2
			,rad,rad,135,360-45);
	
	beginShape(TRIANGLE_FAN);
	vertex(points.x1, points.y1);
	vertex(points.x4, points.y4);
	vertex(points.x3, points.y3);
	endShape();
	
	noStroke();
	beginShape(TRIANGLE_FAN);
	vertex(points.x1, points.y1);
	vertex(points.x2, points.y2);
	vertex(points.x3, points.y3);
	vertex(points.x4, points.y4);
	endShape();
}
