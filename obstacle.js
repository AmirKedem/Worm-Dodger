const RIGHT_DIR = 0;
const LEFT_DIR = 1;
const UP_DIR = 2;
const DOWN_DIR = 3;

const THICKNESS = 10;

class Obsticle {
  constructor(dir) {
    this.dir = dir;
    switch (dir) {
      // pos is 1 frame left to the screen.
      case RIGHT_DIR:
        this.pos = createVector(-2, 0);
        this.vel = createVector(2, 0);
        break;
      // pos is 1 frame right to the screen.
      case LEFT_DIR:
        this.pos = createVector(width + 2, 0);
        this.vel = createVector(-2, 0);
        break;
      // pos is 1 frame down to the screen.
      case UP_DIR:
        this.pos = createVector(0, height + 2);
        this.vel = createVector(0, -2);
        break;
      // pos is 1 frame up to the screen.
      case DOWN_DIR:
        this.pos = createVector(0, -2);
        this.vel = createVector(0, 2);
        break;
    }

    // def the distance between the two rects.
    this.d = 100;
    // some random color.
    this.rand = random(1);
    if (this.rand > 0.5) {
      // green
      this.color1 = 128;
      this.color2 = 255;
      this.color3 = 78;
      this.colFill1 = 10;
      this.colFill2 = 128;
      this.colFill3 = 50;
    } else {
      // orange
      this.color1 = 255;
      this.color2 = 89;
      this.color3 = 0;
      this.colFill1 = 235;
      this.colFill2 = 79;
      this.colFill3 = 0;
    }

    if (dir === UP_DIR || dir === DOWN_DIR) {
      // calculates the width of the rect.
      this.xrange = random(0, width - this.d);
      this.yrange = THICKNESS;
      // calculates the width of the rect by the other rect.
      this.whatleftx = width - (this.xrange + this.d);
      this.whatlefty = this.yrange;
    } else {
      // calculates the width of the rect.
      this.xrange = THICKNESS;
      this.yrange = random(0, height - this.d);
      // calculates the width of the rect by the other rect.
      this.whatleftx = this.xrange;
      this.whatlefty = height - (this.yrange + this.d);
    }
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    fill(this.colFill1, this.colFill2, this.colFill3, 135);
    stroke(this.color1, this.color2, this.color3);
    strokeWeight(4);
    if (this.dir === UP_DIR || this.dir === DOWN_DIR) {
      this.rect2posx = this.xrange + this.d;
      this.rect2posy = this.pos.y;
    } else {
      this.rect2posx = this.pos.x;
      this.rect2posy = this.yrange + this.d;
    }
    rect(this.pos.x, this.pos.y, this.xrange, this.yrange);
    rect(this.rect2posx, this.rect2posy, this.whatleftx, this.whatlefty);
  }

  isOutOfScreen() {
    switch (this.dir) {
      // pos is 1 frame left to the screen.
      case RIGHT_DIR:
        if (this.pos.x > width + THICKNESS) {
          return true;
        }
        break;
      // pos is 1 frame right to the screen.
      case LEFT_DIR:
        if (this.pos.x < -THICKNESS) {
          return true;
        }
        break;
      // pos is 1 frame down to the screen.
      case UP_DIR:
        if (this.pos.y < -THICKNESS) {
          return true;
        }
        break;
      // pos is 1 frame up to the screen.
      case DOWN_DIR:
        if (this.pos.y > height + THICKNESS) {
          return true;
        }
        break;
    }
    return false;
  }
}
