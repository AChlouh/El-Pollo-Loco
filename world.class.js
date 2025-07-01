class World {
    lastBottleThrow = 0;
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    bottlebar = new Bottlebar();
    throwableObjects = [];
    coinsCollect = 0;
    collectedBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;

        // Setze World-Referenz für Endboss
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.world = this;
            console.log('Endboss World-Referenz gesetzt');
        }
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottle();

        }, 1000 / 60);
    }

    checkThrowObjects() {
        const now = Date.now();
        const cooldown = 1000;

        if (this.keyboard.D && this.character.bottles > 0 && (now - this.lastBottleThrow > cooldown)) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 1;
            this.bottlebar.setPercentage(this.character.bottles * 20);
            this.lastBottleThrow = now;

            console.log('Flasche geworfen! Verbleibende Flaschen:', this.character.bottles);
        }
    }

    // In world.class.js - Ersetze die checkCollisions() Methode:

    checkCollisions() {
        // Kollision mit Gegnern
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                // Prüfe ob Character auf Gegner springt (Y-Position und Geschwindigkeit prüfen)
                let characterBottom = this.character.y + this.character.height;
                let enemyTop = enemy.y;
                let isJumpingOnEnemy = characterBottom <= enemyTop + 50 && this.character.speedY <= 0;

                if (isJumpingOnEnemy && !(enemy instanceof Endboss)) {
                    // Character springt auf Gegner - Gegner stirbt, Character nimmt KEINEN Schaden
                    console.log('Gegner durch Sprung besiegt!');
                    enemy.die();
                    this.character.jump(); // Character springt nochmal hoch
                    // KEIN this.character.hit() hier!
                } else if (!isJumpingOnEnemy) {
                    // Normale seitliche Kollision - Character nimmt Schaden
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });

        // Kollision mit Münzen
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.coins * 10);
            }
        });

        // Kollision zwischen geworfenen Flaschen und Gegnern
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    this.throwableObjects.splice(bottleIndex, 1);
                    if (enemy instanceof Endboss) {
                        enemy.takeHit();
                    } else {
                        enemy.die();
                    }
                }
            });
        });
    }
    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.character.collectBottle();
                this.bottlebar.setPercentage(this.character.bottles * 20); // 5 bottles = 100%
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        // Fixed Objects (UI)
        this.addToMap(this.statusBar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0);

        // Game Objects
        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-mo.x, -mo.y);
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
            this.ctx.restore();
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }
}