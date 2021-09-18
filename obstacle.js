const COLOR_AMOUNT = 10;

const RIGHT_DIR = 0;
const LEFT_DIR = 1;
const UP_DIR = 2;
const DOWN_DIR = 3;

const THICKNESS = 10;

class Obsticle {
  constructor(dir, gapSize) {
    this.dir = dir;
    // The distance between the two rects.
    this.gapSize = gapSize;

    // Some random color.
    let hue = int((random(COLOR_AMOUNT) * 360) / COLOR_AMOUNT);
    let colorFill = color("hsl(" + hue + ", 100%, 15.3%)");
    let colorBorder = color("hsla(" + hue + ", 100%, 55.3%, 0.52)");
    this.colorFill = colorFill;
    this.colorBorder = colorBorder;

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

    if (dir === UP_DIR || dir === DOWN_DIR) {
      // calculates the width of the rect.
      this.xrange = random(0, width - this.gapSize);
      this.yrange = THICKNESS;
      // calculates the width of the rect by the other rect.
      this.whatleftx = width - (this.xrange + this.gapSize);
      this.whatlefty = this.yrange;
    } else {
      // calculates the width of the rect.
      this.xrange = THICKNESS;
      this.yrange = random(0, height - this.gapSize);
      // calculates the width of the rect by the other rect.
      this.whatleftx = this.xrange;
      this.whatlefty = height - (this.yrange + this.gapSize);
    }
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    fill(this.colorFill);
    stroke(this.colorBorder);
    strokeWeight(4);
    if (this.dir === UP_DIR || this.dir === DOWN_DIR) {
      this.rect2posx = this.xrange + this.gapSize;
      this.rect2posy = this.pos.y;
    } else {
      this.rect2posx = this.pos.x;
      this.rect2posy = this.yrange + this.gapSize;
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
