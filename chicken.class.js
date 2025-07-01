/**
 * Diese Klasse repräsentiert ein normales Huhn (Gegner) im Spiel.
 * Hühner laufen von rechts nach links und können vom Spieler besiegt werden.
 * Erbt von MovableObject.
 */
class Chicken extends MovableObject {
    /**
     * Y-Position des Huhns
     * @type {number}
     */
    y = 360;
    /**
     * Höhe des Huhns
     * @type {number}
     */
    height = 70;
    /**
     * Breite des Huhns
     * @type {number}
     */
    width = 70;
    /**
     * Bildpfade für Laufanimation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); // Death Images laden

        this.x = 200 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.35;
        this.isDying = false; // Flag für Death Animation

        this.animate();
    }


    /**
     * Startet die Bewegungs- und Animationsintervalle des Huhns.
     */
    playDeathAnimation() {
        let deathAnimationIndex = 0;

        const deathInterval = setInterval(() => {
            if (deathAnimationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathAnimationIndex]];
                deathAnimationIndex++;
            } else {
                clearInterval(deathInterval);
                this.fallToBottom(); // Erst nach Animation fallen lassen
            }
        }, 200); // 200ms pro Frame
    }

    animate() {
        setInterval(() => {
            if (!this.isDying) { // Nur bewegen wenn nicht am Sterben
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

    fallToBottom() {
        let fallInterval = setInterval(() => {
            this.y += 20;
            if (this.y > 800) {
                clearInterval(fallInterval);
            }
        }, 30);
    }
}



/**
 * Lässt das Huhn nach unten fallen (z.B. nach dem Tod).
 */
