
class ShieldBar {
    constructor() {
        this.value = 100;
        this.minValue = 0;
        this.maxValue = 100;
    }

    show() {
        if (this.value < 0.5) { 
            return;
        }

        push();
        fill(255);
        stroke(255);
        strokeWeight(4);
        let rectWidth = this.value * 4;
        rect(width/2 - rectWidth/2, height - 80, rectWidth, 10);
        pop();
    }

    update(start, end, current) {
        if (start < end) {
            current = constrain(current, start, end);
        } else {
            current = constrain(current, end, start);
        }
        this.value = map(current, start, end, this.minValue, this.maxValue);
    }
}