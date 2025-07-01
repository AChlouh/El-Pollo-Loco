class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 217;
        }
    }

    // Improved collision detection with offset support
    isColliding(mo) {
        // Check if objects have offset properties for precise collision
        let thisLeft = this.x + (this.offset ? this.offset.left : 0);
        let thisRight = this.x + this.width - (this.offset ? this.offset.right : 0);
        let thisTop = this.y + (this.offset ? this.offset.top : 0);
        let thisBottom = this.y + this.height - (this.offset ? this.offset.bottom : 0);

        let moLeft = mo.x + (mo.offset ? mo.offset.left : 0);
        let moRight = mo.x + mo.width - (mo.offset ? mo.offset.right : 0);
        let moTop = mo.y + (mo.offset ? mo.offset.top : 0);
        let moBottom = mo.y + mo.height - (mo.offset ? mo.offset.bottom : 0);

        return thisRight > moLeft &&
            thisLeft < moRight &&
            thisBottom > moTop &&
            thisTop < moBottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;

        if (this.currentImage === undefined) {
            this.currentImage = 0;
        }

        let i = this.currentImage % images.length;
        let path = images[i];

        if (this.imageCache && this.imageCache[path]) {
            this.img = this.imageCache[path];
        }

        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        if (this.walking_sound && this.walking_sound.playbackRate) {
            this.walking_sound.playbackRate = Math.abs(this.speed) / 4;
        }
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}