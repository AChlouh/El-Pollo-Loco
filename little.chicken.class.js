class LittleChicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); // Death Images laden

        this.x = 200 + Math.random() * 2200;
        this.speed = 0.50 + Math.random() * 0.45;
        this.isDying = false; // Flag für Death Animation

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDying) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.isDying = true;
                this.playDeathAnimation();
            } else if (!this.isDead() && !this.isDying) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    die() {
        this.energy = 0;
        this.isDying = true;
        this.playDeathAnimation();
    }

    playDeathAnimation() {
        let deathAnimationIndex = 0;

        const deathInterval = setInterval(() => {
            if (deathAnimationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathAnimationIndex]];
                deathAnimationIndex++;
            } else {
                clearInterval(deathInterval);
                this.fallToBottom();
            }
        }, 200);
    }

    fallToBottom() {
        let fallInterval = setInterval(() => {
            this.y += 20;
            if (this.y > 800) {
                clearInterval(fallInterval);
            }
        }, 30);
    }

}