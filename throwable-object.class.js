class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); // ✅ Korrigiert!
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.world = world;

        // Status Flags
        this.isExploding = false;
        this.isRemoved = false;

        // Starte Wurf
        this.throw();
    }


    throw() {
        this.speedY = 15;
        this.applyGravity();

        this.movementInterval = setInterval(() => {
            this.x += 6; // Erhöht von 4 auf 6 für weitere Wurfweite
            this.checkGroundCollision();
            this.checkEnemyCollision();
        }, 25);

        // Rotation Animation während Flug
        this.animationInterval = setInterval(() => {
            if (!this.isExploding) {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 100); // Schnellere Rotation für besseren Effekt
    }

    checkGroundCollision() {
        let splashHeight = 340;
        if (this.y >= splashHeight) {
            this.explode();
        }
    }

    checkEnemyCollision() {
        if (this.isExploding || this.isRemoved) return;

        if (this.world && this.world.level && this.world.level.enemies) {
            this.world.level.enemies.forEach((enemy) => {
                if (this.isColliding(enemy)) {
                    this.explode();

                    if (enemy instanceof Endboss) {
                        enemy.takeHit();
                    } else {
                        enemy.die();
                    }
                }
            });
        }
    }

    explode() {
        if (this.isExploding) return;

        this.isExploding = true;
        this.speedY = 0; // Stoppe Bewegung

        // Stoppe Movement und Rotation
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        // Spiele Splash Animation
        this.playSplashAnimation();
    }

    playSplashAnimation() {
        let splashFrame = 0;

        const splashInterval = setInterval(() => {
            if (splashFrame < this.IMAGES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_SPLASH[splashFrame]];
                splashFrame++;
            } else {
                clearInterval(splashInterval);
                this.removeBottle(); // Entferne nach Animation
            }
        }, 150); // 150ms pro Splash-Frame
    }

    removeBottle() {
        if (this.world && this.world.throwableObjects) {
            const index = this.world.throwableObjects.indexOf(this);
            if (index > -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }
    }

    isColliding(mo) {
        // Großzügigere Kollision für Bottles
        let thisLeft = this.x + 10;
        let thisRight = this.x + this.width - 10;
        let thisTop = this.y + 10;
        let thisBottom = this.y + this.height - 10;

        let moLeft = mo.x + (mo.offset ? mo.offset.left : 0);
        let moRight = mo.x + mo.width - (mo.offset ? mo.offset.right : 0);
        let moTop = mo.y + (mo.offset ? mo.offset.top : 0);
        let moBottom = mo.y + mo.height - (mo.offset ? mo.offset.bottom : 0);

        return thisRight > moLeft &&
            thisLeft < moRight &&
            thisBottom > moTop &&
            thisTop < moBottom;
    }

}