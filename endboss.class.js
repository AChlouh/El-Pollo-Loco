/**
 * Diese Klasse repräsentiert den Endgegner (Endboss) im Spiel.
 * Der Endboss hat mehrere Animationsphasen, kann Treffer einstecken und besiegt werden.
 * Erbt von MovableObject.
 */
class Endboss extends MovableObject {
    character;
    world;
    y = 55;
    height = 400;
    width = 250;
    animationEnded = false;
    energy = 4;
    hits = 0;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    constructor(world = null) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2000;
        this.isActive = false;
        this.speed = 3; // Angepasste Geschwindigkeit für den Endboss
        this.world = world;
        this.energy = 4;
        this.hits = 0;
        this.lastHit = 0;
        this.currentImage = 0;

        this.animate();
    }
   
     // Startet die Animationsintervalle des Endboss.
    animate() {
        if (this.movementInterval) clearInterval(this.movementInterval);
        if (this.animationInterval) clearInterval(this.animationInterval);
        if (this.reactionInterval) clearInterval(this.reactionInterval);
        if (this.walkingAnimationInterval) clearInterval(this.walkingAnimationInterval);

        // Bewegungsintervall (60 FPS für flüssige Bewegung)
        this.movementInterval = setInterval(() => {
            if (this.isActive && !this.endbossIsDead() && !this.animationEnded) {
                this.moveTowardsCharacter();
            }
        }, 1000 / 60);

        // Haupt-Animationsintervall 
        this.animationInterval = setInterval(() => {
            this.endbossAnimate();
        }, 150);

        // Separates Walking-Animationsintervall
        this.walkingAnimationInterval = setInterval(() => {
            if (this.isActive && !this.endbossIsDead() && !this.animationEnded && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200); // Kontinuierliche Walking-Animation

        // Zusätzliches Reaktions-Intervall für sofortige Zustandsänderungen
        this.reactionInterval = setInterval(() => {
            this.checkState();
        }, 50);

        console.log('Endboss Intervalle gestartet');
    }

    moveTowardsCharacter() {
        if (this.world && this.world.character) {
            let characterX = this.world.character.x;
            let distance = Math.abs(this.x - characterX);

            let currentSpeed = this.speed;
            if (distance > 300) {
                currentSpeed = this.speed * 2;
            } else if (distance < 150) {
                currentSpeed = this.speed * 1;
            }

            if (distance > 50) {
                if (characterX < this.x) {
                    this.x -= currentSpeed;
                    this.otherDirection = false;
                } else if (characterX > this.x) {
                    this.x += currentSpeed;
                    this.otherDirection = true;
                }
            }
        }
    }

    // Neue Methode für schnelle Zustandsprüfung:
    checkState() {
        if (this.animationEnded) return;

        if (!this.isActive && this.world && this.world.character) {
            let distance = Math.abs(this.x - this.world.character.x);
            if (distance < 600) {
                this.isActive = true;
            }
        }
    }

    endbossIsDead() {
        return this.energy <= 0;
    }
    
    playDeadAnimation() {
        this.animationEnded = true;
        clearInterval(this.endbossInterval);
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.reactionInterval);

        this.y = 120;

        // Spiele Death Animation Frame für Frame
        let deathFrame = 0;
        const deathAnimationInterval = setInterval(() => {
            if (deathFrame < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathFrame]];
                deathFrame++;
            } else {
                clearInterval(deathAnimationInterval);
                this.fallToBottom();

                // Winner Screen nach Animation
                setTimeout(() => {
                    this.showWinnerScreen();
                }, 1000);
            }
        }, 200); // 500ms pro Frame für deutlich sichtbare Animation
    }


    fallToBottom() {
        let fallInterval = setInterval(() => {
            this.y += 20;
            if (this.y > 800) {
                clearInterval(fallInterval);
            }
        }, 30);
    }

    seeCharacterThanAlert() {
        if (this.world && this.world.character) {
            let distance = Math.abs(this.x - this.world.character.x);
            return distance < 500;
        }
        return false;
    }

    seeCharacterAttack() {
        return true;
    }

    /**
     * Stoppt das Spiel (z.B. bei Game Over).
     */
    stopGame() {
        return true;
    }

    isHurt() {
        return Date.now() - this.lastHit < 500; // Verkürzt von 1000ms auf 500ms
    }

    endbossAnimate() {
        if (!this.isActive) return;

        if (this.endbossIsDead() && !this.animationEnded) {
            this.playDeadAnimation();
        } else if (!this.animationEnded) {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    update(characterX) {
        // Aktiviere Endboss wenn Character in Reichweite
        if (!this.isActive && Math.abs(characterX - this.x) < 500) {
            this.isActive = true;
            console.log('Endboss aktiviert!');
        }
    }


    takeHit() {
        if (!this.endbossIsDead()) {
            this.energy--;
            this.hits++;
            this.lastHit = Date.now();

            if (this.endbossIsDead()) {
                this.playDeadAnimation();
            }
        }
    }
    showWinnerScreen() {
        // Stoppe alle Spiel-Intervalle
        this.clearAllIntervals();

        // Zeige Winner Screen
        let winnerElement = document.getElementById("winner");
        if (winnerElement) {
            winnerElement.style.display = 'block';
        } else {
            // Falls das Winner Element nicht existiert, erstelle es
            this.createWinnerScreen();
        }
    }

    createWinnerScreen() {
        let winnerDiv = document.createElement('div');
        winnerDiv.id = 'winner';
        winnerDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 128, 0, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

        winnerDiv.innerHTML = `
        <h1 style="color: white; font-size: 48px; margin-bottom: 20px;">YOU WIN!</h1>
        <button onclick="location.reload()" style="padding: 10px 20px; font-size: 18px; margin: 10px;">Home</button>
        <button onclick="replay()" style="padding: 10px 20px; font-size: 18px; margin: 10px;">Replay</button>
    `;

        document.body.appendChild(winnerDiv);
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }
}
